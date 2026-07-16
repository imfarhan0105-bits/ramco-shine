import React from 'react';

export default function FivePillars() {
  const pillars = [
    { num: "1", ja: "Seiri", en: "Sort", desc: "Remove unnecessary items from the workplace" },
    { num: "2", ja: "Seiton", en: "Set in Order", desc: "A place for everything, everything in its place" },
    { num: "3", ja: "Seiso", en: "Shine", desc: "Clean your workspace daily and inspect while cleaning" },
    { num: "4", ja: "Seiketsu", en: "Standardize", desc: "Create standards to maintain the first 3 S's" },
    { num: "5", ja: "Shitsuke", en: "Sustain", desc: "Make 5S a habit and part of the work culture" },
  ];

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">The 5S Framework</h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {pillars.map((pillar, idx) => (
            <div 
              key={pillar.num}
              className="bg-card-background border-t-4 border-brand-gold rounded-b-xl shadow-md p-6 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(20%-20px)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-gold/10 group relative overflow-hidden"
            >
              {/* Subtle background number */}
              <div className="absolute -right-4 -bottom-8 text-9xl font-black text-gray-50 opacity-50 transition-transform duration-300 group-hover:scale-110 pointer-events-none">
                {pillar.num}
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-brand-navy text-brand-gold rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-sm">
                  {pillar.num}S
                </div>
                
                <h3 className="text-2xl font-bold text-text-primary mb-1">
                  {pillar.ja}
                </h3>
                <h4 className="text-lg font-semibold text-brand-mid mb-4">
                  {pillar.en}
                </h4>
                
                <p className="text-text-secondary leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
