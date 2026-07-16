import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-navy text-white h-[60px] flex items-center mt-auto border-t border-brand-mid/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="text-gray-400 mb-2 sm:mb-0">
            Ramco<span className="text-brand-gold font-semibold">Shine</span> &copy; {currentYear} Ramco Steels Pvt. Ltd.
          </div>
          
          <div className="hidden md:block text-brand-gold font-medium italic">
            Organize. Clean. Sustain.
          </div>
          
          <div className="text-gray-400">
            Change for <span className="text-brand-gold font-semibold">Better</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
