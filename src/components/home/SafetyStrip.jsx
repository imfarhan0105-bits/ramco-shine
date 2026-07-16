import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function SafetyStrip() {
  const points = [
    "A clean and organized workplace reduces risks of slips, trips, and falls",
    "Proper storage prevents injuries and equipment damage",
    "Clear pathways allow safe movement of people and materials",
    "Correct labelling prevents misuse of tools and chemicals",
    "Regular inspections identify hazards early",
    "Following PPE rules and safety standards is mandatory"
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-brand-navy via-danger-red/90 to-brand-navy text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F5C518 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 flex flex-col items-center">
          <ShieldCheck className="w-16 h-16 text-brand-gold mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Safety is Non-Negotiable</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {points.map((point, idx) => (
            <div key={idx} className="flex items-start bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10 hover:bg-black/30 transition-colors">
              <ShieldCheck className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5 mr-3" />
              <p className="text-lg font-medium leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
