import React from 'react';
import { Hand } from 'lucide-react';

export default function PledgeSection() {
  return (
    <div className="py-24 bg-brand-gold text-brand-navy relative overflow-hidden">
      {/* Decorative rays */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="w-full h-full border-t border-brand-navy absolute top-1/2 left-0 transform rotate-45"></div>
        <div className="w-full h-full border-t border-brand-navy absolute top-1/2 left-0 transform -rotate-45"></div>
        <div className="w-full h-full border-t border-brand-navy absolute top-1/2 left-0 transform rotate-12"></div>
        <div className="w-full h-full border-t border-brand-navy absolute top-1/2 left-0 transform -rotate-12"></div>
        <div className="w-full h-full border-t border-brand-navy absolute top-1/2 left-0 transform rotate-75"></div>
        <div className="w-full h-full border-t border-brand-navy absolute top-1/2 left-0 transform -rotate-75"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center p-4 bg-brand-navy rounded-full mb-8 shadow-xl">
          <Hand className="w-10 h-10 text-brand-gold" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black mb-12 uppercase tracking-widest text-shadow-sm">
          5S Pledge
        </h2>

        <div className="space-y-10">
          <p className="text-2xl md:text-4xl font-bold leading-tight drop-shadow-sm">
            "I Promise to make Ramco Steels Pvt. Limited, a national 5S Model company"
          </p>
          
          <div className="w-24 h-1 bg-brand-navy/30 mx-auto rounded-full"></div>
          
          <p className="text-2xl md:text-4xl font-bold leading-tight drop-shadow-sm font-sans">
            "मैं Ramco Steels Pvt. Limited को एक राष्ट्रीय 5S मॉडल कंपनी बनाने के लिए प्रतिबद्ध हूँ"
          </p>
        </div>
      </div>
    </div>
  );
}
