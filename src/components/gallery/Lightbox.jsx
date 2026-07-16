import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';

export default function Lightbox({ photos, currentIndex, onClose, onNavigate }) {
  if (currentIndex === null || !photos || photos.length === 0) return null;

  const photo = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling behind lightbox
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onNavigate]);

  const formattedDate = photo.eventDate 
    ? format(new Date(photo.eventDate), 'PPP') 
    : format(photo.createdAt?.toDate ? photo.createdAt.toDate() : new Date(), 'PPP');

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="absolute top-0 w-full p-4 flex justify-end z-10">
        <button 
          onClick={onClose}
          className="text-white/70 hover:text-white p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center relative px-12 md:px-24">
        {/* Navigation Arrows */}
        <button 
          onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 bg-black/20 hover:bg-black/50 rounded-full transition-all hover:scale-110"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 bg-black/20 hover:bg-black/50 rounded-full transition-all hover:scale-110"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Image Container */}
        <div className="w-full h-full max-h-[80vh] flex items-center justify-center animate-in zoom-in-95 duration-300">
          <img 
            src={photo.imageUrl} 
            alt={photo.caption} 
            className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
          />
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6 pb-8 z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              {photo.caption}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <span className="flex items-center">
                <Tag className="w-4 h-4 mr-1.5 text-brand-gold" />
                {photo.category}
              </span>
              {photo.zone && (
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1.5 text-brand-gold" />
                  {photo.zone}
                </span>
              )}
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5 text-brand-gold" />
                {formattedDate}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-400 shrink-0">
            {currentIndex + 1} of {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
}
