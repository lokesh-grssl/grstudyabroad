import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'light',
  size = 'md' 
}) => {
  const isDark = variant === 'dark';

  const logoHeights = {
    sm: 'h-4 sm:h-5',
    md: 'h-6 sm:h-7',
    lg: 'h-8 sm:h-10'
  };

  const logoSrc = isDark ? '/logo-white.svg' : '/logo.svg';

  return (
    <div className={`inline-flex items-center shrink-0 select-none ${className}`}>
      <img 
        src={logoSrc} 
        alt="TASA | grassroots" 
        className={`${logoHeights[size]} w-auto object-contain block`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};



