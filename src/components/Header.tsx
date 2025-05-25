"use client";

import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine which section is in view
      const sections = ['features', 'reviews', 'download'];
      const current = sections
        .map(sectionId => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id: sectionId,
              visible: rect.top <= 100 && rect.bottom >= 100
            };
          }
          return { id: sectionId, visible: false };
        })
        .find(section => section.visible);

      if (current) {
        setActiveSection(current.id);
      } else if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClassName = (sectionId: string) => {
    return `transition-colors px-3 py-1 rounded-full ${
      activeSection === sectionId
        ? 'bg-accent/80 text-black neon-border'
        : 'text-white hover:bg-white/10'
    }`;
  };

  return (
    <header className={`w-full py-4 fixed top-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-effect border-b border-border shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Logo size="md" />
          <span className="text-2xl font-bold tracking-tighter">CTRL</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/" className={activeSection === '' ? 'text-accent' : 'text-white hover:text-accent transition-colors'}>
            Home
          </Link>
          <Link href="#features" className={getLinkClassName('features')}>
            Features
          </Link>
          <Link href="#reviews" className={getLinkClassName('reviews')}>
            Reviews
          </Link>
          <Link href="#download" className={getLinkClassName('download')}>
            Get Access
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full glass-effect border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              href="/" 
              className={activeSection === '' ? 'text-accent p-2' : 'text-white hover:text-accent transition-colors p-2'}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="#features" 
              className={activeSection === 'features' ? 'text-accent p-2' : 'text-white hover:text-accent transition-colors p-2'}
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#reviews" 
              className={activeSection === 'reviews' ? 'text-accent p-2' : 'text-white hover:text-accent transition-colors p-2'}
              onClick={() => setIsMenuOpen(false)}
            >
              Reviews
            </Link>
            <Link 
              href="#download" 
              className={activeSection === 'download' ? 'text-accent p-2' : 'text-white hover:text-accent transition-colors p-2'}
              onClick={() => setIsMenuOpen(false)}
            >
              Get Access
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 