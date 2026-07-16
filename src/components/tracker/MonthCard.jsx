import React from 'react';
import { Check, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { zoneColors } from '../../data/zonesData';

export default function MonthCard({ month, sheet, zone, onClick, onUploadClick }) {
  const { isAdmin } = useAuth();
  const hasSheet = !!sheet;
  const colorHex = zoneColors[(zone.num - 1) % zoneColors.length];

  return (
    <div className="relative group">
      <div 
        onClick={() => hasSheet ? onClick(sheet) : null}
        className={`
          aspect-square rounded-full flex flex-col items-center justify-center transition-all duration-300 relative
          ${hasSheet ? 'cursor-pointer hover:scale-105 shadow-md hover:shadow-lg' : 'border-2 border-dashed border-gray-200 bg-gray-50'}
        `}
        style={hasSheet ? { backgroundColor: colorHex } : {}}
      >
        <span className={`text-lg sm:text-xl font-bold ${hasSheet ? 'text-white' : 'text-gray-400'}`}>
          {month.short}
        </span>
        
        {hasSheet && (
          <div className="absolute bottom-4 bg-white rounded-full p-1 shadow-sm animate-in zoom-in duration-300">
            <Check className="w-4 h-4" style={{ color: colorHex }} />
          </div>
        )}
      </div>

      {/* Admin Upload Button for Empty Months */}
      {isAdmin && !hasSheet && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUploadClick(month);
          }}
          className="absolute inset-0 m-auto w-10 h-10 bg-brand-navy text-brand-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-200 shadow-lg z-10"
          title={`Upload sheet for ${month.name}`}
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
