import React from 'react';
import PhotoCard from './PhotoCard';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function GalleryGrid({ photos, loading, onPhotoClick, onDeleteClick }) {
  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <LoadingSpinner size="lg" text="Loading gallery..." />
      </div>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-32 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
          <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-brand-navy mb-1">No photos found</h3>
        <p className="text-gray-500">There are no photos in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {photos.map((photo, index) => (
        <PhotoCard 
          key={photo.id} 
          photo={photo} 
          index={index} 
          onClick={onPhotoClick}
          onDelete={onDeleteClick}
        />
      ))}
    </div>
  );
}
