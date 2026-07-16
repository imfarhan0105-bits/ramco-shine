import React, { useState, useEffect } from 'react';
import UnitTabs from '../components/team/UnitTabs';
import HierarchyCard from '../components/team/HierarchyCard';
import ZoneLeaderCard from '../components/team/ZoneLeaderCard';
import { teamData } from '../data/teamData';
import { initialZonesData } from '../data/zonesData';
import { collection, query, where } from 'firebase/firestore';
import { db, isDbConfigured } from '../firebase/config';
import { getDocsWithTimeout } from '../utils/firebaseUtils';
import LoadingSpinner from '../components/shared/LoadingSpinner';

export default function TeamPage() {
  const [activeUnit, setActiveUnit] = useState('unit-782');
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load zones for the active unit from Firestore
  // If Firestore is empty, we fall back to initial data. 
  // Admin first login handles actual seeding.
  useEffect(() => {
    const fetchZones = async () => {
      setLoading(true);
      try {
        if (!isDbConfigured) {
          console.warn("Firebase is not configured. Falling back to local data.");
          setZones(initialZonesData.filter(z => z.unitId === activeUnit));
          return;
        }
        
        const q = query(collection(db, 'zones'), where('unitId', '==', activeUnit));
        const snapshot = await getDocsWithTimeout(q);
        
        const localZones = initialZonesData.filter(z => z.unitId === activeUnit);
        
        if (!snapshot.empty) {
          const fetchedZones = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          // Merge fetched overrides with local baseline data
          const mergedZones = localZones.map(localZone => {
            // Find if this zone has an override in Firestore
            // Using reverse() to get the latest edit if duplicates exist
            const fetchedMatch = [...fetchedZones].reverse().find(fz => fz.zoneId === localZone.zoneId);
            return fetchedMatch ? { ...localZone, ...fetchedMatch } : localZone;
          });
          
          mergedZones.sort((a, b) => a.num - b.num);
          setZones(mergedZones);
        } else {
          setZones(localZones);
        }
      } catch (error) {
        console.error("Error fetching zones:", error);
        // Fallback on error
        setZones(initialZonesData.filter(z => z.unitId === activeUnit));
      } finally {
        setLoading(false);
      }
    };

    fetchZones();
  }, [activeUnit]);

  const activeTeam = teamData[activeUnit];

  const handleZoneUpdate = (updatedZone) => {
    setZones(prev => prev.map(z => z.zoneId === updatedZone.zoneId ? updatedZone : z));
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-background min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">Our Team</h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Meet the dedicated team driving 5S excellence across our manufacturing units.
        </p>
      </div>

      <UnitTabs activeUnit={activeUnit} setActiveUnit={setActiveUnit} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-12">
        <h2 className="text-2xl font-bold text-center text-brand-navy mb-12">Leadership Structure</h2>
        
        {/* Hierarchy Tree */}
        <div className="flex flex-col items-center">
          {/* Champion */}
          <div className="relative mb-12 w-full flex justify-center">
            <HierarchyCard member={activeTeam.champion} isChampion={true} />
            {/* Vertical Line down */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gray-300"></div>
          </div>

          {/* Coordinators */}
          <div className="relative mb-12 w-full max-w-3xl">
            {/* Horizontal Line connecting coordinators */}
            <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gray-300"></div>
            
            <div className="flex justify-between w-full relative pt-6">
              {/* Vertical connector lines down to cards */}
              <div className="absolute top-0 left-1/4 w-0.5 h-6 bg-gray-300"></div>
              <div className="absolute top-0 right-1/4 w-0.5 h-6 bg-gray-300"></div>

              {activeTeam.coordinators.map((coord, idx) => (
                <div key={idx} className="w-1/2 px-2 flex justify-center relative">
                  <HierarchyCard member={coord} isCoordinator={true} />
                  {/* Vertical Line down from each coordinator */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Deputy Coordinators */}
          <div className="relative mb-12 w-full max-w-4xl">
             <div className="flex justify-around w-full relative pt-6">
              {activeTeam.dyCoordinators.map((dyCoord, idx) => (
                <div key={idx} className="flex-1 px-2 flex justify-center relative">
                  <HierarchyCard member={dyCoord} isDyCoordinator={true} />
                  {/* Only draw lines down if there are cluster officers below them */}
                  {activeTeam.clusterOfficers && activeTeam.clusterOfficers.length > 0 && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cluster Officers (if any) */}
          {activeTeam.clusterOfficers && activeTeam.clusterOfficers.length > 0 && (
            <div className="relative w-full max-w-4xl">
              <div className="flex justify-around w-full relative pt-6">
                {activeTeam.clusterOfficers.map((officer, idx) => (
                  <div key={idx} className="flex-1 px-2 flex justify-center">
                    <HierarchyCard member={officer} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-brand-navy mb-8 pl-2 border-l-4 border-brand-gold">
          Zone Leaders ({zones.length} Zones)
        </h2>
        
        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner size="lg" text="Loading zones..." />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone) => (
              <ZoneLeaderCard key={zone.zoneId} zone={zone} onUpdate={handleZoneUpdate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
