import React, { useState } from 'react';
import { Trash2, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PhotoCard({ photo, index, onClick, onDelete }) {
  const { isAdmin } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative mb-6 break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(index)}
    >
      <img 
        src={photo.imageUrl} 
        alt={photo.caption} 
        className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Center icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Search className="w-10 h-10 text-white/50" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-4 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          <p className="text-white font-bold text-lg mb-1 leading-tight line-clamp-2">
            {photo.caption}
          </p>
          <div className="flex flex-wrap items-center text-xs text-gray-300 gap-2">
            <span className="bg-brand-gold text-brand-navy px-2 py-0.5 rounded font-semibold">
              {photo.category}
            </span>
            {photo.zone && <span>{photo.zone}</span>}
          </div>
        </div>

        {/* Admin Delete */}
        {isAdmin && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(photo);
            }}
            className="absolute top-3 right-3 p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100 hover:scale-110"
            title="Delete Photo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
