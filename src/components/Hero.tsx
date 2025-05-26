"use client";

import React from 'react';
import Logo from './Logo';
import ScrollAnimation from './ScrollAnimation';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen pt-28 pb-16 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Abstract grid lines - more subtle with space background */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={`h-${i}`} 
            className="absolute left-0 right-0 h-px bg-white/10" 
            style={{ top: `${(i + 1) * 10}%` }}
          ></div>
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={`v-${i}`} 
            className="absolute top-0 bottom-0 w-px bg-white/10" 
            style={{ left: `${(i + 1) * 10}%` }}
          ></div>
        ))}
      </div>
      
      <ScrollAnimation direction="down" delay={300}>
        <div className="mb-12 float-animation">
          <Logo size="lg" className="scale-[3.5] mb-6" />
        </div>
      </ScrollAnimation>

      <div className="container px-4 mx-auto">
        <ScrollAnimation direction="up" delay={500}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
            <span className="text-accent">CTRL</span> Everything. Code Optional
          </h1>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={700}>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            The first bi-directional no-code/low-code application builder that seamlessly integrates Design, Logic, and Code.
          </p>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={900}>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <span className="px-3 py-1 rounded-full bg-white/10 text-accent border border-accent/30 text-sm font-medium">Design Mode</span>
            <span className="flex items-center px-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-accent border border-accent/30 text-sm font-medium">Logic Mode</span>
            <span className="flex items-center px-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-accent border border-accent/30 text-sm font-medium">Code Mode</span>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={1100}>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#download" 
              className="px-6 py-3 bg-accent text-black font-medium rounded-lg hover:bg-accent-dark transition-colors neon-border"
            >
              Get Early Access
            </a>
            <a 
              href="#features" 
              className="px-6 py-3 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              Explore Features
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Hero; 