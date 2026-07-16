import React from 'react';
import { Crown, Users, User, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function HierarchyCard({ member, isChampion, isCoordinator, isDyCoordinator }) {
  const { isAdmin } = useAuth();
  
  // Choose icon and styling based on role
  let Icon = User;
  let bgClass = "bg-white";
  let borderClass = "border-gray-200";
  let textClass = "text-text-primary";
  let roleTextClass = "text-text-secondary";

  if (isChampion) {
    Icon = Crown;
    bgClass = "bg-brand-navy";
    borderClass = "border-brand-gold border-2";
    textClass = "text-white";
    roleTextClass = "text-brand-gold";
  } else if (isCoordinator) {
    Icon = Users;
    bgClass = "bg-brand-mid/10";
    borderClass = "border-brand-mid/30";
    textClass = "text-brand-navy";
    roleTextClass = "text-brand-mid font-semibold";
  } else if (isDyCoordinator) {
    Icon = User;
    bgClass = "bg-gray-50";
    borderClass = "border-gray-300";
    textClass = "text-brand-navy text-sm";
    roleTextClass = "text-gray-500 text-xs";
  } else {
    // Cluster officer
    Icon = User;
    bgClass = "bg-white";
    borderClass = "border-gray-200";
    textClass = "text-text-primary text-sm";
    roleTextClass = "text-text-secondary text-xs";
  }

  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-sm relative ${bgClass} ${borderClass} w-full max-w-[240px] mx-auto z-10 transition-transform hover:-translate-y-1 hover:shadow-md`}>
      <div className={`flex-shrink-0 flex items-center justify-center mb-3 shadow-inner overflow-hidden ${member.image ? 'rounded-2xl' : 'rounded-full'} ${isChampion ? 'w-28 h-28 bg-brand-gold text-brand-navy' : 'w-20 h-20 bg-white text-brand-mid border border-gray-100'}`}>
        {member.image ? (
          <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
        ) : (
          <Icon className={isChampion ? "w-12 h-12" : "w-10 h-10"} />
        )}
      </div>
      <h3 className={`font-bold text-center leading-tight mb-1 ${textClass} ${isChampion ? 'text-xl' : 'text-base'}`}>
        {member.name}
      </h3>
      <p className={`text-center font-medium ${roleTextClass} ${isChampion ? 'text-sm tracking-widest uppercase' : ''}`}>
        {member.role}
      </p>
      
      {member.reportsTo && (
        <div className="mt-3 pt-3 border-t border-gray-200/50 w-full text-center">
          <p className="text-[10px] text-gray-400 uppercase font-semibold">Reports to</p>
          <p className={`text-xs font-medium truncate ${isChampion ? 'text-gray-300' : 'text-gray-600'}`}>
            {member.reportsTo}
          </p>
        </div>
      )}
      
      {/* Admin edit indicator (visual only for now) */}
      {isAdmin && !isChampion && (
        <button className="absolute top-2 right-2 text-gray-400 hover:text-brand-gold transition-colors opacity-0 group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        </button>
      )}
    </div>
  );
}
