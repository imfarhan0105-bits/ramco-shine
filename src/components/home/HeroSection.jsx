import React from 'react';
import { ArrowDown } from 'lucide-react';
import bgImage from '../../assets/bg.png';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-brand-navy text-white min-h-[70vh] flex flex-col justify-center animate-in fade-in duration-1000">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-brand-mid/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          Change for <span className="text-brand-gold">Better</span>
        </h1>

        <div className="max-w-3xl mx-auto mt-4 relative animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
          {/* Quote marks */}
          <span className="text-brand-gold/20 text-8xl absolute -top-8 -left-8 font-serif leading-none hidden md:block">"</span>

          <p className="text-xl md:text-3xl font-medium leading-tight mb-4 italic text-gray-200">
            "A place for everything, and everything in its place" <br className="hidden md:block" />
            <span className="text-brand-gold not-italic">—</span> A Step Towards Best in the Nation
          </p>
          <p className="text-sm md:text-base text-gray-400 uppercase tracking-widest font-semibold">
            Vision 2026-27
          </p>
        </div>

        <div className="mt-12 text-gray-300 font-medium tracking-wide animate-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
          <p>Ramco Steels Pvt. Ltd., Faridabad</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70">
        <ArrowDown className="w-6 h-6 text-brand-gold" />
      </div>
    </div>
  );
}
