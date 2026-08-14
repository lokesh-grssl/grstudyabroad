import React, { useState, useRef } from 'react';

interface StudentPortraitProps {
  className?: string;
}

export const StudentPortraitIllustration: React.FC<StudentPortraitProps> = ({ className = '' }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const attemptRef = useRef(0);

  // Exact Google Drive File ID: 1_97zBdW0Jzn6qvDJ0W3rLqfv_WNJJa4r
  const fileId = '1_97zBdW0Jzn6qvDJ0W3rLqfv_WNJJa4r';
  const urls = [
    `https://lh3.googleusercontent.com/d/${fileId}=w1200`,
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`,
    `https://drive.google.com/uc?export=view&id=${fileId}`
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    attemptRef.current += 1;
    if (attemptRef.current < urls.length) {
      e.currentTarget.src = urls[attemptRef.current];
    } else {
      setImgError(true);
    }
  };

  return (
    <div className={`relative flex items-end justify-center select-none ${className}`}>
      {!imgError ? (
        <img
          src={urls[0]}
          onError={handleImageError}
          onLoad={() => setImgLoaded(true)}
          alt="Grassroots Study Abroad Student"
          className={`w-full h-auto object-contain object-bottom pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] filter transition-all duration-500 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
          loading="eager"
        />
      ) : null}

      {!imgLoaded && !imgError && (
        <div className="w-full h-72 sm:h-96 animate-pulse" />
      )}
    </div>
  );
};
