import React from 'react';
import { Quote } from 'lucide-react';

export default function KeyMessages() {
  const messages = [
    "5S is not extra work — it is a smarter way to work",
    "A clean workplace is a safe workplace",
    "Everyone is responsible for maintaining 5S every day",
    "Small improvements every day lead to big results"
  ];

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Our Commitment</h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {messages.map((message, idx) => (
            <div 
              key={idx} 
              className="bg-brand-navy rounded-r-xl border-l-8 border-brand-gold p-8 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <Quote className="absolute top-4 right-4 w-24 h-24 text-white/5 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative z-10">
                <Quote className="w-10 h-10 text-brand-gold mb-6" />
                <p className="text-2xl font-medium italic text-white leading-relaxed">
                  "{message}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
