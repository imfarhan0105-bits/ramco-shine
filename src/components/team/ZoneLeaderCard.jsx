import React, { useState } from 'react';
import { MapPin, Users, Edit2, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { zoneColors } from '../../data/zonesData';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function ZoneLeaderCard({ zone, onUpdate }) {
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ leaderName: zone.leaderName, area: zone.area });
  const [isSaving, setIsSaving] = useState(false);

  const colorHex = zoneColors[(zone.num - 1) % zoneColors.length];

  const handleSave = async () => {
    setIsSaving(true);
    
    // 1. Optimistic UI Update (Instant)
    const newZoneData = { ...zone, ...editData };
    onUpdate(newZoneData);
    setIsEditing(false);
    
    // 2. Background Save to Firebase (Doesn't block UI)
    try {
      // Use zoneId as the document ID to prevent duplicates
      const zoneRef = doc(db, 'zones', zone.zoneId);
      setDoc(zoneRef, newZoneData, { merge: true }).catch(console.error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow relative flex flex-col h-full group">
      {/* Top Color Bar */}
      <div className="h-2 w-full" style={{ backgroundColor: colorHex }}></div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div 
            className="flex items-center justify-center w-10 h-10 rounded-lg text-white font-bold text-lg"
            style={{ backgroundColor: colorHex }}
          >
            {zone.num}
          </div>
          
          {isAdmin && !isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-brand-gold p-1 rounded-md hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Edit Zone Details"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-3 mb-4 flex-grow">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Leader Name</label>
              <input
                type="text"
                value={editData.leaderName}
                onChange={(e) => setEditData({...editData, leaderName: e.target.value})}
                className="w-full text-sm border-gray-300 rounded-md focus:ring-brand-gold focus:border-brand-gold shadow-sm py-1.5 px-2 border"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Area Description</label>
              <textarea
                value={editData.area}
                onChange={(e) => setEditData({...editData, area: e.target.value})}
                rows={3}
                className="w-full text-sm border-gray-300 rounded-md focus:ring-brand-gold focus:border-brand-gold shadow-sm py-1.5 px-2 border resize-none"
              />
            </div>
            <div className="flex space-x-2 pt-2">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center justify-center flex-1 bg-brand-gold text-brand-navy py-1.5 rounded-md text-sm font-semibold hover:bg-yellow-400 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : <><Check className="w-4 h-4 mr-1" /> Save</>}
              </button>
              <button 
                onClick={() => {
                  setEditData({ leaderName: zone.leaderName, area: zone.area });
                  setIsEditing(false);
                }}
                disabled={isSaving}
                className="flex items-center justify-center p-1.5 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-grow">
            <h3 className="font-bold text-lg text-text-primary mb-2 line-clamp-1" title={zone.leaderName}>
              {zone.leaderName}
            </h3>
            
            <div className="flex items-start text-sm text-text-secondary mb-4">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
              <p className="line-clamp-3" title={zone.area}>{zone.area}</p>
            </div>
          </div>
        )}

        {/* Deputies */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            <Users className="w-3 h-3 mr-1.5" />
            Deputies
          </div>
          <div className="flex flex-wrap gap-1.5">
            {zone.deputies && zone.deputies.length > 0 ? (
              zone.deputies.map((deputy, idx) => (
                <span 
                  key={idx} 
                  className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700"
                >
                  {deputy}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400 italic">None</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
