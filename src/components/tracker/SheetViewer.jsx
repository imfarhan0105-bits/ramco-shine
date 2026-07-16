import React, { useState } from 'react';
import { FileSpreadsheet, ExternalLink, RefreshCw, Trash2, X, Clock, User, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { format } from 'date-fns';

export default function SheetViewer({ sheet, onClose, onReplace, onDelete }) {
  const { isAdmin } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!sheet) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'sheets', sheet.sheetId));
      
      onDelete(sheet.sheetId);
      onClose();
    } catch (error) {
      console.error("Error deleting sheet:", error);
      alert("Failed to delete the sheet. It might have already been removed.");
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleDownload = () => {
    window.open(sheet.fileUrl, '_blank');
  };

  const formattedDate = sheet.uploadedAt?.toDate 
    ? format(sheet.uploadedAt.toDate(), 'PPP p') 
    : 'Recently';

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-brand-navy/60 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-brand-navy text-white">
          <h2 className="text-xl font-bold flex items-center">
            <FileSpreadsheet className="w-6 h-6 mr-3 text-brand-gold" />
            Audit Sheet Details
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto">
          {/* File Info Card */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-6">
            <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 border border-gray-100">
              <FileSpreadsheet className="w-8 h-8 text-success-green" />
            </div>
            <h3 className="font-bold text-lg text-brand-navy mb-1 break-words leading-tight">
              {sheet.fileName}
            </h3>
            <p className="text-sm text-text-secondary uppercase tracking-wider font-semibold">
              {sheet.month} {sheet.year}
            </p>
          </div>

          {/* Metadata */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <User className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-brand-navy">Uploaded By</p>
                <p className="text-sm text-text-secondary">{sheet.uploaderName}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-brand-navy">Last Updated</p>
                <p className="text-sm text-text-secondary">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button 
              onClick={handleDownload}
              className="w-full flex items-center justify-center py-3 px-4 bg-brand-gold text-brand-navy rounded-lg font-bold hover:bg-yellow-400 transition-colors shadow-sm"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Open in Google Drive
            </button>

            {isAdmin && (
              <>
                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium uppercase">Admin Actions</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <button 
                  onClick={() => onReplace()}
                  disabled={isDeleting}
                  className="w-full flex items-center justify-center py-2.5 px-4 bg-white text-brand-navy border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Replace Link
                </button>

                {showDeleteConfirm ? (
                  <div className="p-4 bg-danger-red/10 border border-danger-red/20 rounded-lg animate-in slide-in-from-bottom-2">
                    <p className="text-sm text-danger-red font-medium mb-3 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1.5" />
                      Are you sure? This cannot be undone.
                    </p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 bg-danger-red text-white py-2 rounded-md text-sm font-bold hover:bg-red-600 disabled:opacity-50"
                      >
                        {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                      </button>
                      <button 
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={isDeleting}
                        className="flex-1 bg-white text-gray-700 border border-gray-300 py-2 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full flex items-center justify-center py-2.5 px-4 bg-white text-danger-red border border-danger-red/30 rounded-lg font-medium hover:bg-danger-red/5 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Link
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Click outside to close overlay area */}
      <div className="absolute inset-0 z-[-1]" onClick={onClose}></div>
    </div>
  );
}
