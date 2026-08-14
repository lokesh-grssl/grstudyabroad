import React, { useState } from 'react';
import { Shield, GraduationCap, Award, Landmark, Building2, CheckCircle2 } from 'lucide-react';
import { 
  getUniversityLogoUrls, 
  getUniversityInitials, 
  getUniversityCrestTheme 
} from '../utils/universityLogos';

interface UniversityLogoProps {
  name: string;
  countryCode?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'card-header' | 'modal-header';
  className?: string;
  customLogoUrl?: string;
  showName?: boolean;
}

// Custom Heraldic Seal Component for guaranteed crisp fallback
export const HeraldicCrestSeal: React.FC<{ name: string; size?: string; theme?: any }> = ({ name, theme, size = 'md' }) => {
  const initials = getUniversityInitials(name);
  const activeTheme = theme || getUniversityCrestTheme(name);

  return (
    <div className={`relative flex flex-col items-center justify-center w-full h-full rounded-xl bg-gradient-to-br ${activeTheme.bg} text-white font-black border ${activeTheme.border} shadow-sm select-none overflow-hidden shrink-0 p-1`}>
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:6px_6px] opacity-20 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <GraduationCap className="w-3.5 h-3.5 text-amber-300 drop-shadow-xs mb-0.5" />
        <span className="font-heading font-black tracking-widest text-amber-100 text-[11px] sm:text-xs leading-none drop-shadow-xs">
          {initials}
        </span>
      </div>
    </div>
  );
};

export const UniversityLogo: React.FC<UniversityLogoProps> = ({
  name,
  countryCode,
  size = 'md',
  className = '',
  showName = false
}) => {
  const theme = getUniversityCrestTheme(name);
  const initials = getUniversityInitials(name);

  // Size styling maps
  if (size === 'card-header') {
    return (
      <div className={`relative w-full h-32 overflow-hidden rounded-t-3xl bg-gradient-to-br ${theme.bg} p-4 flex flex-col justify-between select-none ${className}`}>
        {/* Subtle Background Watermark */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/5 rounded-full blur-xl pointer-events-none" />
        
        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="bg-black/30 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-white/20">
            {countryCode || 'INT'}
          </span>
        </div>

        {/* Prominent Logo Tile Box */}
        <div className="relative z-10 flex items-center justify-center my-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border-2 border-white/90 flex items-center gap-3 transition-all duration-300 group-hover:scale-105 group-hover:bg-white max-w-[92%] w-full">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.bg} text-white font-black flex items-center justify-center shrink-0 shadow-sm border ${theme.border}`}>
              <span className="font-heading font-black tracking-wider text-xs text-amber-200">
                {initials}
              </span>
            </div>

            <div className="text-left overflow-hidden flex-1">
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-gray-900 leading-snug line-clamp-1 group-hover:text-[#E31B23] transition-colors">
                {name}
              </h4>
              <p className="text-[10px] text-gray-500 font-medium line-clamp-1">
                {countryCode ? `${countryCode} University` : 'Higher Education'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (size === 'modal-header') {
    return (
      <div className={`relative w-full h-36 sm:h-44 overflow-hidden rounded-t-3xl bg-gradient-to-br ${theme.bg} p-6 flex flex-col justify-between ${className}`}>
        {/* Subtle Watermark */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Big Centered Official Crest Header */}
        <div className="relative z-10 flex items-center justify-center my-auto">
          <div className="bg-white rounded-2xl p-3.5 shadow-2xl border-2 border-white/90 flex items-center gap-4 max-w-md w-full justify-center">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.bg} text-white font-black flex flex-col items-center justify-center shrink-0 shadow-md border ${theme.border}`}>
              <GraduationCap className="w-4 h-4 text-amber-300 mb-0.5" />
              <span className="font-heading font-black tracking-widest text-xs text-amber-100">
                {initials}
              </span>
            </div>

            <div className="text-left space-y-0.5">
              <h3 className="font-heading font-black text-base sm:text-lg text-gray-900 leading-tight line-clamp-2">
                {name}
              </h3>
              <p className="text-xs text-gray-500 font-bold">
                {countryCode ? `Global Institution (${countryCode})` : 'Global Institution'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard sizes (xs, sm, md, lg, xl)
  const sizeClasses = {
    xs: 'w-7 h-7 rounded-lg text-[10px]',
    sm: 'w-9 h-9 rounded-xl text-xs',
    md: 'w-11 h-11 rounded-xl text-xs sm:text-sm',
    lg: 'w-14 h-14 rounded-2xl text-base',
    xl: 'w-16 h-16 rounded-2xl text-lg'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className={`bg-gradient-to-br ${theme.bg} text-white border ${theme.border} shadow-sm p-1 flex flex-col items-center justify-center shrink-0 overflow-hidden font-black ${sizeClasses[size]}`}>
        <GraduationCap className="w-3.5 h-3.5 text-amber-300 mb-0.5" />
        <span className="font-heading font-black tracking-wider text-amber-100 leading-none">
          {initials}
        </span>
      </div>

      {showName && (
        <span className="font-heading font-bold text-gray-900 text-sm line-clamp-1">
          {name}
        </span>
      )}
    </div>
  );
};

