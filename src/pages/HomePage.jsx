import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FivePillars from '../components/home/FivePillars';
import WhyFiveS from '../components/home/WhyFiveS';
import SafetyStrip from '../components/home/SafetyStrip';
import KeyMessages from '../components/home/KeyMessages';
import PledgeSection from '../components/home/PledgeSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FivePillars />
      <WhyFiveS />
      <SafetyStrip />
      <KeyMessages />
      <PledgeSection />
    </div>
  );
}
