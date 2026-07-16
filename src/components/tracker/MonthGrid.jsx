import React from 'react';
import MonthCard from './MonthCard';
import LoadingSpinner from '../shared/LoadingSpinner';

const months = [
  { id: '01', name: 'January', short: 'Jan' },
  { id: '02', name: 'February', short: 'Feb' },
  { id: '03', name: 'March', short: 'Mar' },
  { id: '04', name: 'April', short: 'Apr' },
  { id: '05', name: 'May', short: 'May' },
  { id: '06', name: 'June', short: 'Jun' },
  { id: '07', name: 'July', short: 'Jul' },
  { id: '08', name: 'August', short: 'Aug' },
  { id: '09', name: 'September', short: 'Sep' },
  { id: '10', name: 'October', short: 'Oct' },
  { id: '11', name: 'November', short: 'Nov' },
  { id: '12', name: 'December', short: 'Dec' },
];

export default function MonthGrid({ zone, sheets, loading, onSheetClick, onUploadClick }) {
  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <LoadingSpinner size="lg" text="Loading sheets..." />
      </div>
    );
  }

  // Convert array of sheets to map for easy lookup by month
  const sheetsMap = {};
  sheets.forEach(sheet => {
    sheetsMap[sheet.month] = sheet;
  });

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
        {months.map(month => (
          <MonthCard 
            key={month.id} 
            month={month} 
            zone={zone}
            sheet={sheetsMap[month.id]} 
            onClick={onSheetClick}
            onUploadClick={onUploadClick}
          />
        ))}
      </div>
    </div>
  );
}
