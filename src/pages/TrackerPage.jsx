import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { db, isDbConfigured } from '../firebase/config';
import { getDocsWithTimeout } from '../utils/firebaseUtils';
import UnitTabs from '../components/team/UnitTabs';
import ZoneGrid from '../components/tracker/ZoneGrid';
import MonthGrid from '../components/tracker/MonthGrid';
import SheetViewer from '../components/tracker/SheetViewer';
import UploadModal from '../components/tracker/UploadModal';
import { initialZonesData } from '../data/zonesData';
import { useAuth } from '../context/AuthContext';

export default function TrackerPage() {
  const { user } = useAuth();
  const [activeUnit, setActiveUnit] = useState('unit-782');
  const [zones, setZones] = useState([]);
  const [activeZone, setActiveZone] = useState(null);
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  
  // Data states
  const [unitSheets, setUnitSheets] = useState({}); // mapped by zoneId for latest
  const [zoneSheets, setZoneSheets] = useState([]); // array for active zone
  
  // UI states
  const [loadingZones, setLoadingZones] = useState(true);
  const [loadingSheets, setLoadingSheets] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState(null);
  
  // Modal states
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadMonth, setUploadMonth] = useState(null);

  // 1. Fetch zones for active unit
  useEffect(() => {
    const fetchZones = async () => {
      setLoadingZones(true);
      try {
        if (!isDbConfigured) {
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
        setZones(initialZonesData.filter(z => z.unitId === activeUnit));
      } finally {
        setLoadingZones(false);
      }
    };

    fetchZones();
    setActiveZone(null); // Reset zone selection when unit changes
  }, [activeUnit]);

  // 2. Fetch latest sheets for the entire unit (for ZoneGrid badges)
  useEffect(() => {
    const fetchUnitSheets = async () => {
      if (!activeUnit) return;
      try {
        if (!isDbConfigured) return;

        // Fetching all sheets for unit, sorting by uploadedAt locally since complex queries might require indexes
        const q = query(collection(db, 'sheets'), where('unitId', '==', activeUnit));
        const snapshot = await getDocsWithTimeout(q);
        
        const latestByZone = {};
        snapshot.forEach(doc => {
          const data = doc.data();
          if (!latestByZone[data.zoneId] || 
              (data.uploadedAt && latestByZone[data.zoneId].uploadedAt && data.uploadedAt.toMillis() > latestByZone[data.zoneId].uploadedAt.toMillis())) {
            latestByZone[data.zoneId] = data;
          }
        });
        
        setUnitSheets(latestByZone);
      } catch (error) {
        console.error("Error fetching unit sheets:", error);
      }
    };

    fetchUnitSheets();
  }, [activeUnit]);

  // 3. Fetch sheets for specific zone and year (for MonthGrid)
  useEffect(() => {
    const fetchZoneSheets = async () => {
      if (!activeZone) return;
      
      setLoadingSheets(true);
      try {
        if (!isDbConfigured) {
          setZoneSheets([]);
          return;
        }

        const q = query(
          collection(db, 'sheets'), 
          where('zoneId', '==', activeZone.zoneId),
          where('year', '==', activeYear)
        );
        const snapshot = await getDocsWithTimeout(q);
        
        const sheets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setZoneSheets(sheets);
      } catch (error) {
        console.error("Error fetching zone sheets:", error);
      } finally {
        setLoadingSheets(false);
      }
    };

    fetchZoneSheets();
  }, [activeZone, activeYear]);

  // Handlers
  const handleZoneClick = (zone) => {
    setActiveZone(zone);
  };

  const handleBackToZones = () => {
    setActiveZone(null);
    setZoneSheets([]);
  };

  const handleSheetClick = (sheet) => {
    setSelectedSheet(sheet);
  };

  const handleUploadClick = (month) => {
    setUploadMonth(month);
    setIsUploadModalOpen(true);
  };

  const handleReplaceClick = () => {
    if (!selectedSheet) return;
    
    // Find month object
    const monthObj = {
      id: selectedSheet.month,
      name: new Date(`${selectedSheet.year}-${selectedSheet.month}-01`).toLocaleString('default', { month: 'long' })
    };
    
    setUploadMonth(monthObj);
    setIsUploadModalOpen(true);
    setSelectedSheet(null); // Close viewer to show modal clearly
  };

  const handleUploadSuccess = (newSheet) => {
    // Update zone sheets list
    setZoneSheets(prev => {
      const existingIdx = prev.findIndex(s => s.month === newSheet.month);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = newSheet;
        return updated;
      }
      return [...prev, newSheet];
    });
    
    // Update unit sheets map (for badge)
    setUnitSheets(prev => ({
      ...prev,
      [newSheet.zoneId]: newSheet
    }));
  };

  const handleDeleteSuccess = (sheetId) => {
    setZoneSheets(prev => prev.filter(s => s.sheetId !== sheetId));
    
    // Recalculate latest sheet for unit (approximated by just removing it from map if it was there)
    // A proper implementation would refetch or find the next latest, but this is fine for UI optimism
    setUnitSheets(prev => {
      const updated = { ...prev };
      if (updated[activeZone.zoneId]?.sheetId === sheetId) {
        delete updated[activeZone.zoneId];
      }
      return updated;
    });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-background min-h-screen">
      
      {!activeZone ? (
        <>
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">5S Tracker</h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Monitor monthly 5S audit scores and sheets across all units and zones.
            </p>
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-4 delay-100">
            <UnitTabs activeUnit={activeUnit} setActiveUnit={setActiveUnit} />
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-4 delay-200">
            <ZoneGrid 
              zones={zones} 
              latestSheets={unitSheets} 
              loading={loadingZones} 
              onZoneClick={handleZoneClick} 
            />
          </div>
        </>
      ) : (
        <div className="animate-in slide-in-from-right-8 duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <button 
                onClick={handleBackToZones}
                className="flex items-center text-text-secondary hover:text-brand-navy transition-colors mb-2 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Zones
              </button>
              <h2 className="text-3xl font-bold text-brand-navy">
                Zone {activeZone.num}: {activeZone.leaderName}
              </h2>
              <p className="text-text-secondary mt-1">{activeZone.area}</p>
            </div>
            
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
              <CalendarIcon className="w-5 h-5 text-gray-400 ml-3 mr-2" />
              <select 
                value={activeYear}
                onChange={(e) => setActiveYear(parseInt(e.target.value))}
                className="bg-transparent border-none text-brand-navy font-bold focus:ring-0 cursor-pointer pr-8 py-2"
              >
                {[...Array(5)].map((_, i) => {
                  const y = new Date().getFullYear() - i;
                  return <option key={y} value={y}>{y}</option>;
                })}
              </select>
            </div>
          </div>

          <MonthGrid 
            zone={activeZone}
            sheets={zoneSheets} 
            loading={loadingSheets}
            onSheetClick={handleSheetClick}
            onUploadClick={handleUploadClick}
          />
        </div>
      )}

      {/* Modals */}
      {selectedSheet && (
        <SheetViewer 
          sheet={selectedSheet} 
          onClose={() => setSelectedSheet(null)} 
          onReplace={handleReplaceClick}
          onDelete={handleDeleteSuccess}
        />
      )}

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        zone={activeZone} 
        month={uploadMonth} 
        year={activeYear} 
        onSuccess={handleUploadSuccess} 
      />
    </div>
  );
}
