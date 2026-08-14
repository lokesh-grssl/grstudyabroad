import React from 'react';

interface CountryFlagProps {
  code?: string;
  country?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const COUNTRY_CODE_MAP: Record<string, string> = {
  'uk': 'gb',
  'gb': 'gb',
  'united kingdom': 'gb',
  'england': 'gb',
  'scotland': 'gb',
  'wales': 'gb',
  'us': 'us',
  'usa': 'us',
  'united states': 'us',
  'ca': 'ca',
  'canada': 'ca',
  'au': 'au',
  'australia': 'au',
  'de': 'de',
  'germany': 'de',
  'ie': 'ie',
  'ireland': 'ie',
  'fr': 'fr',
  'france': 'fr',
  'nz': 'nz',
  'new zealand': 'nz',
  'sg': 'sg',
  'singapore': 'sg',
  'ch': 'ch',
  'switzerland': 'ch',
  'ae': 'ae',
  'uae': 'ae',
  'united arab emirates': 'ae',
  'nl': 'nl',
  'netherlands': 'nl',
  'dutch': 'nl',
  'se': 'se',
  'sweden': 'se',
  'fi': 'fi',
  'finland': 'fi',
  'it': 'it',
  'italy': 'it',
  'jp': 'jp',
  'japan': 'jp',
  'kr': 'kr',
  'korea': 'kr',
  'south korea': 'kr',
  'my': 'my',
  'malaysia': 'my',
  'hk': 'hk',
  'hong kong': 'hk',
  'es': 'es',
  'spain': 'es',
  'cn': 'cn',
  'china': 'cn',
  'bg': 'bg',
  'bulgaria': 'bg',
  'in': 'in',
  'india': 'in',
};

export const getCountry2LetterCode = (input?: string): string => {
  if (!input) return 'gb';
  const clean = input.trim().toLowerCase();
  if (COUNTRY_CODE_MAP[clean]) return COUNTRY_CODE_MAP[clean];
  
  // Try substring checks
  if (clean.includes('uk') || clean.includes('kingdom') || clean.includes('britain')) return 'gb';
  if (clean.includes('us') || clean.includes('states') || clean.includes('america')) return 'us';
  if (clean.includes('canada')) return 'ca';
  if (clean.includes('australia')) return 'au';
  if (clean.includes('germany')) return 'de';
  if (clean.includes('ireland')) return 'ie';
  if (clean.includes('france')) return 'fr';
  if (clean.includes('zealand')) return 'nz';
  if (clean.includes('singapore')) return 'sg';
  if (clean.includes('switzerland') || clean.includes('swiss')) return 'ch';
  if (clean.includes('uae') || clean.includes('emirates') || clean.includes('dubai')) return 'ae';
  if (clean.includes('netherlands') || clean.includes('dutch')) return 'nl';
  if (clean.includes('sweden')) return 'se';
  if (clean.includes('finland')) return 'fi';
  if (clean.includes('italy')) return 'it';
  if (clean.includes('japan')) return 'jp';
  if (clean.includes('korea')) return 'kr';
  if (clean.includes('malaysia')) return 'my';
  if (clean.includes('hong kong')) return 'hk';
  if (clean.includes('spain')) return 'es';
  if (clean.includes('china')) return 'cn';
  if (clean.includes('bulgaria')) return 'bg';
  if (clean.includes('india')) return 'in';

  if (clean.length === 2) return clean;
  return 'gb';
};

export const CountryFlag: React.FC<CountryFlagProps> = ({ 
  code, 
  country, 
  className = '', 
  size = 'md' 
}) => {
  const iso = getCountry2LetterCode(code || country);
  
  const sizeClasses = {
    xs: 'w-4 h-3 rounded-[2px]',
    sm: 'w-5 h-3.5 rounded-[2px]',
    md: 'w-6 h-4 rounded-xs',
    lg: 'w-8 h-5.5 rounded-sm',
    xl: 'w-10 h-7 rounded-md'
  };

  const finalClass = `${sizeClasses[size]} object-cover shadow-xs border border-slate-300/60 inline-block shrink-0 align-middle ${className}`;

  return (
    <img 
      src={`https://flagcdn.com/w80/${iso}.png`} 
      alt={country || code || 'Flag'} 
      className={finalClass}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        // Fallback display if flag fails to load
        e.currentTarget.style.display = 'none';
      }}
    />
  );
};
