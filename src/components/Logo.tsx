"use client";

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
  };

  const { width, height } = sizes[size];

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="ctrl-logo"
      >
        <circle cx="50" cy="50" r="50" fill="black" />
        <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="8" fill="black" />
        <circle cx="50" cy="50" r="18" stroke="white" strokeWidth="8" fill="black" />
      </svg>
    </div>
  );
};

export default Logo; 