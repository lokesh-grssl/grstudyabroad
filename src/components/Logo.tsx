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
    sm: 'h-6 sm:h-7',
    md: 'h-9 sm:h-11',
    lg: 'h-12 sm:h-16'
  };

  return (
    <div className={`inline-flex items-center shrink-0 select-none ${className}`}>
      <img 
        src="/tasa-logo.png" 
        alt="TASA grassroots Study Abroad" 
        className={`${logoHeights[size]} w-auto object-contain block drop-shadow-sm`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};





