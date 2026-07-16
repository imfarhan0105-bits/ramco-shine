import React from 'react';
import { unitOptions } from '../../data/teamData';

export default function UnitTabs({ activeUnit, setActiveUnit }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white p-1 rounded-lg inline-flex shadow-sm border border-gray-200">
        {unitOptions.map((unit) => (
          <button
            key={unit.id}
            onClick={() => setActiveUnit(unit.id)}
            className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ${
              activeUnit === unit.id
                ? 'bg-brand-gold text-brand-navy shadow'
                : 'text-text-secondary hover:text-brand-navy hover:bg-gray-50'
            }`}
          >
            {unit.name}
          </button>
        ))}
      </div>
    </div>
  );
}
