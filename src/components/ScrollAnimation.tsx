"use client";

import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
  direction = 'up',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-16';
      case 'down':
        return '-translate-y-16';
      case 'left':
        return 'translate-x-16';
      case 'right':
        return '-translate-x-16';
      default:
        return '';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : undefined,
        transitionDelay: `${delay}ms`,
      }}
      data-animate={direction !== 'none' ? getDirectionClass() : undefined}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation; 