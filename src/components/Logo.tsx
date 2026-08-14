import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const logoHeights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12 md:h-13',
    lg: 'h-14 sm:h-16 md:h-20'
  };

  return (
    <div className={`inline-flex items-center shrink-0 select-none ${className}`}>
      <img 
        src="/logo.svg" 
        alt="Grassroots Study Abroad" 
        decoding="async"
        className={`${logoHeights[size]} w-auto max-w-[220px] sm:max-w-[280px] object-contain block`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};






