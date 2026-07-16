import React from 'react';
import { Factory, Calendar, ChevronRight } from 'lucide-react';
import { zoneColors } from '../../data/zonesData';
import { format } from 'date-fns';

export default function ZoneCard({ zone, latestSheet, onClick }) {
  const colorHex = zoneColors[(zone.num - 1) % zoneColors.length];
  
  let lastUpdatedText = "No data yet";
  let lastUpdatedColor = "text-gray-400";
  let lastUpdatedBg = "bg-gray-100";
  
  if (latestSheet && latestSheet.uploadedAt) {
    // Check if it's a Firestore Timestamp or normal Date
    const date = latestSheet.uploadedAt.toDate ? latestSheet.uploadedAt.toDate() : new Date(latestSheet.uploadedAt);
    lastUpdatedText = `Updated: ${format(date, 'MMM d, yyyy')}`;
    lastUpdatedColor = "text-success-green";
    lastUpdatedBg = "bg-success-green/10";
  }

  return (
    <div 
      onClick={() => onClick(zone)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="h-1.5 w-full transition-all duration-300 group-hover:h-2" style={{ backgroundColor: colorHex }}></div>
      
      <div className="p-5 flex-grow flex flex-col relative">
        <div className="absolute top-5 right-5 text-gray-300 group-hover:text-brand-gold transition-colors transform group-hover:translate-x-1">
          <ChevronRight className="w-5 h-5" />
        </div>

        <div className="flex items-center mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-opacity-10 mr-4 group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: `${colorHex}15`, color: colorHex }}
          >
            <Factory className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-2xl text-brand-navy leading-none mb-1">
              Zone {zone.num}
            </h3>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              {zone.leaderName}
            </p>
          </div>
        </div>

        <div className="flex-grow">
          <p className="text-sm text-text-primary line-clamp-2 leading-relaxed" title={zone.area}>
            {zone.area}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${lastUpdatedBg} ${lastUpdatedColor}`}>
            <Calendar className="w-3 h-3 mr-1.5" />
            {lastUpdatedText}
          </div>
        </div>
      </div>
    </div>
  );
}
