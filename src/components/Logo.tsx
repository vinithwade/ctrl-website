"use client";

import React from 'react';
import Image from 'next/image';

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
      <Image
        src="/images/ctrllogo.png"
        alt="CTRL Logo"
        width={width}
        height={height}
        className="ctrl-logo"
        priority
      />
    </div>
  );
};

export default Logo; 