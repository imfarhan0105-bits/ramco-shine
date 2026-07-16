import React, { useState, useRef } from 'react';
import { Link, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';

export default function UploadModal({ isOpen, onClose, zone, month, year, onSuccess }) {
  const { user } = useAuth();
  const [driveLink, setDriveLink] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleLinkChange = (e) => {
    setDriveLink(e.target.value);
    setError('');
  };

  const handleUpload = async () => {
    if (!driveLink || !driveLink.trim()) {
      setError('Please provide a valid Google Drive link.');
      return;
    }

    if (!driveLink.includes('drive.google.com') && !driveLink.includes('docs.google.com')) {
      setError('Please ensure the link is a valid Google Drive or Google Docs link.');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const sheetId = `${zone.zoneId}_${year}_${month.id}`;
      const sheetDocRef = doc(db, 'sheets', sheetId);
      
      const sheetData = {
        sheetId,
        zoneId: zone.zoneId,
        unitId: zone.unitId,
        month: month.id,
        year: year,
        fileName: `Drive Link (${month.name} ${year})`,
        fileUrl: driveLink.trim(),
        uploadedBy: user.uid,
        uploaderName: user.displayName || user.email.split('@')[0],
        uploadedAt: serverTimestamp(),
        fileType: 'drive-link'
      };

      await setDoc(sheetDocRef, sheetData);
      
      onSuccess({ ...sheetData, uploadedAt: { toDate: () => new Date() } });
      
      setIsUploading(false);
      resetAndClose();
    } catch (err) {
      console.error(err);
      setError(`Error: ${err.message || 'An unexpected error occurred while saving the link.'}`);
      setIsUploading(false);
    }
  };

  const resetAndClose = () => {
    setDriveLink('');
    setError('');
    setIsUploading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
          <h3 className="text-lg font-bold text-brand-navy flex items-center">
            <Link className="w-5 h-5 mr-2 text-brand-gold" />
            Add Google Drive Link
          </h3>
          <button 
            onClick={resetAndClose}
            disabled={isUploading}
            className="text-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-brand-mid/5 rounded-lg p-3 mb-6 border border-brand-mid/10">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-gray-500 block text-xs uppercase tracking-wider">Zone</span> <span className="font-semibold text-brand-navy">{zone.name || `Zone ${zone.num}`}</span></div>
              <div><span className="text-gray-500 block text-xs uppercase tracking-wider">Period</span> <span className="font-semibold text-brand-navy">{month.name} {year}</span></div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-danger-red/10 border border-danger-red/20 rounded-md flex items-start text-danger-red text-sm">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">Google Drive Link</label>
            <input
              type="url"
              value={driveLink}
              onChange={handleLinkChange}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
              disabled={isUploading}
            />
            <p className="text-xs text-gray-500 mt-2">
              Ensure the link sharing settings in Google Drive are set to "Anyone with the link can view".
            </p>
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={resetAndClose}
            disabled={isUploading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpload}
            disabled={!driveLink.trim() || isUploading}
            className="px-4 py-2 text-sm font-medium text-brand-navy bg-brand-gold border border-transparent rounded-md hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-sm"
          >
            {isUploading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
            ) : (
              'Save Link'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
