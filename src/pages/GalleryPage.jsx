import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Lightbox from '../components/gallery/Lightbox';
import { galleryData } from '../data/galleryData';

const tabs = ['All', 'Training Sessions', 'Audit Activities', 'Workplace Improvements', 'Recognition Events'];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    // Load static data
    setPhotos(galleryData || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (activeTab === 'All') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter(p => p.category === activeTab));
    }
  }, [activeTab, photos]);

  const handlePhotoClick = (index) => {
    setLightboxIndex(index);
  };

  const handleLightboxNavigate = (direction) => {
    if (direction === 'prev') {
      setLightboxIndex(prev => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
    } else {
      setLightboxIndex(prev => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
    }
  };
  // Static gallery cannot delete
  const handleDelete = (photoId) => {
    console.log("Delete disabled for static gallery");
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 flex items-center justify-center">
          <Camera className="w-8 h-8 mr-3 text-brand-gold" />
          Excellence Gallery
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Showcasing our commitment to 5S through continuous improvements and team efforts.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-hide animate-in fade-in slide-in-from-bottom-4 delay-100">
        <div className="flex space-x-2 bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 min-w-max">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'text-gray-600 hover:text-brand-navy hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 delay-200">
        <GalleryGrid 
          photos={filteredPhotos} 
          loading={loading} 
          onPhotoClick={handlePhotoClick}
          onDeleteClick={(photo) => handleDelete(photo.id)}
        />
      </div>

      {/* Lightbox */}
      <Lightbox 
        photos={filteredPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={handleLightboxNavigate}
      />

      {/* Upload Modal and Admin Buttons removed for Static Gallery */}
    </div>
  );
}
