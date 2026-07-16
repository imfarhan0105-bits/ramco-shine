import React from 'react';
import { TrendingUp, Trash2, ShieldAlert, Award, Leaf, RefreshCw } from 'lucide-react';

export default function WhyFiveS() {
  const reasons = [
    { icon: TrendingUp, text: "Improves productivity and work efficiency" },
    { icon: Trash2, text: "Reduces waste and unnecessary movement" },
    { icon: ShieldAlert, text: "Prevents accidents and improves safety" },
    { icon: Award, text: "Enhances workplace quality and reduces defects" },
    { icon: Leaf, text: "Creates a professional, organized environment" },
    { icon: RefreshCw, text: "Supports continuous improvement culture" }
  ];

  return (
    <div className="py-20 bg-card-background border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">Why 5S Matters</h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 group hover:border-brand-gold/30"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center group-hover:bg-brand-gold transition-colors duration-300">
                  <Icon className="w-7 h-7 text-brand-gold group-hover:text-brand-navy transition-colors duration-300" />
                </div>
                <div className="ml-5">
                  <p className="text-lg font-medium text-brand-navy leading-snug">
                    {reason.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
