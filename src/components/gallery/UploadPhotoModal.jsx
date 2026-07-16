import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { initialZonesData } from '../../data/zonesData';

const categories = [
  'Training Sessions',
  'Audit Activities',
  'Workplace Improvements',
  'Recognition Events'
];

export default function UploadPhotoModal({ isOpen, onClose, onSuccess }) {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [zone, setZone] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setError('');
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Check size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('Image size exceeds 5MB limit.');
      resetFile();
      return;
    }

    // Check type
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WEBP).');
      resetFile();
      return;
    }

    setFile(selectedFile);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const resetFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an image to upload.');
      return;
    }
    if (!caption.trim()) {
      setError('Please provide a caption.');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Create an image element to draw to canvas
      const img = new Image();
      img.onload = async () => {
        try {
          // Calculate new dimensions (max 800px width/height to keep size under 500KB)
          const MAX_SIZE = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          // Draw to canvas
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to highly compressed JPEG base64
          const base64String = canvas.toDataURL('image/jpeg', 0.6); // 60% quality

          setProgress(50); // Artificial progress since it's instant

          const photoData = {
            imageUrl: base64String,
            storagePath: 'firestore-base64', // Placeholder to prevent errors
            caption: caption.trim(),
            category,
            zone: zone || null,
            eventDate,
            uploadedBy: user.uid,
            uploaderName: user.displayName || user.email.split('@')[0],
            createdAt: serverTimestamp()
          };

          const docRef = await addDoc(collection(db, 'gallery'), photoData);
          setProgress(100);
          
          onSuccess({ id: docRef.id, ...photoData, createdAt: { toDate: () => new Date() } });
          
          setIsUploading(false);
          resetAndClose();
        } catch (err) {
          console.error(err);
          setError('Failed to compress and save image.');
          setIsUploading(false);
        }
      };

      img.onerror = () => {
        setError('Invalid image file.');
        setIsUploading(false);
      };

      // Start the process
      img.src = preview;
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred during upload.');
      setIsUploading(false);
    }
  };

  const resetAndClose = () => {
    resetFile();
    setCaption('');
    setCategory(categories[0]);
    setZone('');
    setEventDate(new Date().toISOString().split('T')[0]);
    setError('');
    setProgress(0);
    setIsUploading(false);
    onClose();
  };

  // Get unique zones for dropdown
  const allZonesList = initialZonesData.map(z => `Unit ${z.unitId.replace('unit-', '')} - Zone ${z.num}`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50 flex-shrink-0">
          <h3 className="text-lg font-bold text-brand-navy flex items-center">
            <ImageIcon className="w-5 h-5 mr-2 text-brand-gold" />
            Upload Gallery Photo
          </h3>
          <button 
            onClick={resetAndClose}
            disabled={isUploading}
            className="text-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-3 bg-danger-red/10 border border-danger-red/20 rounded-md flex items-start text-danger-red text-sm">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-5">
            {/* Image Picker */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Photo</label>
              {!preview ? (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-brand-gold hover:bg-brand-gold/5 transition-colors cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-brand-gold" />
                  </div>
                  <p className="text-sm font-medium text-brand-navy mb-1">Click to browse image</p>
                  <p className="text-xs text-gray-500">JPG, PNG, WEBP (Max 5MB)</p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
                  <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={resetFile}
                      className="bg-white text-danger-red p-2 rounded-full hover:bg-red-50 hover:scale-110 transition-all shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>

            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Caption *</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Brief description of the photo"
                className="w-full text-sm border-gray-300 rounded-md focus:ring-brand-gold focus:border-brand-gold shadow-sm py-2 px-3 border"
                maxLength={100}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-sm border-gray-300 rounded-md focus:ring-brand-gold focus:border-brand-gold shadow-sm py-2 px-3 border bg-white"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Event Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full text-sm border-gray-300 rounded-md focus:ring-brand-gold focus:border-brand-gold shadow-sm py-2 px-3 border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Zone (Optional)</label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full text-sm border-gray-300 rounded-md focus:ring-brand-gold focus:border-brand-gold shadow-sm py-2 px-3 border bg-white"
              >
                <option value="">-- None --</option>
                {allZonesList.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
          </div>

          {isUploading && (
            <div className="mt-6">
              <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                <span>Uploading image...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-brand-gold h-2 rounded-full transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 flex-shrink-0">
          <button 
            onClick={resetAndClose}
            disabled={isUploading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpload}
            disabled={!file || !caption.trim() || isUploading}
            className="px-6 py-2 text-sm font-medium text-brand-navy bg-brand-gold border border-transparent rounded-md hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-sm"
          >
            {isUploading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
            ) : (
              'Upload Photo'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
