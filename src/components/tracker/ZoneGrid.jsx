import React from 'react';
import ZoneCard from './ZoneCard';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function ZoneGrid({ zones, latestSheets, loading, onZoneClick }) {
  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <LoadingSpinner size="lg" text="Loading zones..." />
      </div>
    );
  }

  if (!zones || zones.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500">No zones found for this unit.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {zones.map(zone => (
        <ZoneCard 
          key={zone.zoneId} 
          zone={zone} 
          latestSheet={latestSheets[zone.zoneId]} 
          onClick={onZoneClick} 
        />
      ))}
    </div>
  );
}
