"use client";

import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, features = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <div 
      className={`glass-effect rounded-xl p-6 border h-full flex flex-col transition-all duration-300 transform ${
        isHovered 
          ? 'border-accent shadow-lg shadow-accent/20 scale-[1.02] -translate-y-1 feature-card-glow' 
          : 'border-white/10 hover:border-accent/30'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveFeature(null);
      }}
    >
      <div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 ${
        isHovered ? 'bg-accent text-black' : 'bg-accent/10 text-accent'
      }`}>
        {icon}
      </div>
      <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
        isHovered ? 'text-accent' : 'text-white'
      }`}>{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <ul className="mt-auto space-y-2">
        {features.map((feature, index) => (
          <li 
            key={index} 
            className={`flex items-start p-2 rounded-lg transition-all duration-200 ${
              activeFeature === index 
                ? 'bg-accent/10 -translate-x-1 feature-item-active' 
                : 'hover:bg-white/5'
            }`}
            onMouseEnter={() => setActiveFeature(index)}
            onMouseLeave={() => setActiveFeature(null)}
          >
            <svg 
              className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 transition-transform duration-300 ${
                activeFeature === index ? 'text-accent scale-125' : 'text-accent'
              }`} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className={`transition-colors duration-200 ${
              activeFeature === index ? 'text-white' : 'text-gray-400'
            }`}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Features: React.FC = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const features = [
    {
      title: "Design Mode",
      category: "design",
      description: "Drag-and-drop UI editor with powerful design capabilities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
          <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
          <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
        </svg>
      ),
      features: [
        "Drag-and-drop canvas like Figma or Framer",
        "Rich component library (buttons, forms, cards, modals)",
        "Layout tools with grids, stacks, and spacing",
        "Tailwind-like styling properties",
        "Responsive design support",
        "Reusable component creation"
      ]
    },
    {
      title: "Logic Mode",
      category: "logic",
      description: "Node-based visual programming interface for creating application logic.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
        </svg>
      ),
      features: [
        "Node-based interface for logic creation",
        "API call nodes (GET, POST, etc.)",
        "State management nodes",
        "Control flow (loops, conditions, if/else)",
        "Authentication integrations",
        "Database interaction nodes"
      ]
    },
    {
      title: "Code Mode",
      category: "code",
      description: "Directly edit and view the code that's automatically generated and synced.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm-10.28-.53a.75.75 0 000 1.06l2.25 2.25a.75.75 0 101.06-1.06L8.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-2.25 2.25z" clipRule="evenodd" />
        </svg>
      ),
      features: [
        "View and edit code in real-time",
        "Automatic code updates from UI or logic changes",
        "Support for multiple languages",
        "Export or download codebase anytime",
        "Syntax highlighting and IntelliSense",
        "Version control integration"
      ]
    },
    {
      title: "Database & API Integration",
      category: "data",
      description: "Connect and manage databases and APIs through a visual interface.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
          <path d="M12 12.75s11.25-3.75 11.25-6.375V18c0 2.625-10.125 6-11.25 6S1.875 20.625 1.875 18V6.375C1.875 9 12 12.75 12 12.75z" />
        </svg>
      ),
      features: [
        "Connect and manage databases and APIs",
        "Visual database schema designer",
        "Automatic CRUD operations",
        "API integration with popular services",
        "Custom endpoint creation",
        "OAuth and authentication handling"
      ]
    },
    {
      title: "Deploy & Export",
      category: "deploy",
      description: "Deploy your applications to various platforms with just a few clicks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
          <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
        </svg>
      ),
      features: [
        "Deploy to various platforms with a few clicks",
        "Export clean, production-ready code",
        "Vercel, Netlify, and AWS integration",
        "Docker container generation",
        "CI/CD pipeline setup",
        "Custom domain configuration"
      ]
    },
    {
      title: "Collaboration & Plugins",
      category: "collab",
      description: "Work together on projects and extend functionality with plugins.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z" clipRule="evenodd" />
        </svg>
      ),
      features: [
        "Real-time collaboration tools",
        "Team member roles and permissions",
        "Comment and feedback system",
        "Version history and rollbacks",
        "Extensible plugin architecture",
        "Integration with popular dev tools"
      ]
    },
  ];

  const categories = [
    { id: null, name: "All", count: features.length },
    { id: "design", name: "Design", count: features.filter(f => f.category === "design").length },
    { id: "logic", name: "Logic", count: features.filter(f => f.category === "logic").length },
    { id: "code", name: "Code", count: features.filter(f => f.category === "code").length },
    { id: "data", name: "Data & API", count: features.filter(f => f.category === "data").length },
    { id: "deploy", name: "Deploy", count: features.filter(f => f.category === "deploy").length },
    { id: "collab", name: "Collaboration", count: features.filter(f => f.category === "collab").length }
  ];

  const filteredFeatures = selectedCategory 
    ? features.filter(feature => feature.category === selectedCategory)
    : features;

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful <span className="text-accent">Features</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              CTRL combines the best aspects of visual design tools, node-based programming, and traditional coding
              into one seamless experience.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map(category => (
                <button
                  key={category.id || 'all'}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-accent text-black neon-border' 
                      : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  {category.name} <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-black/30">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature, index) => (
            <ScrollAnimation 
              key={index}
              direction="up"
              delay={index * 200}
            >
              <div 
                onMouseEnter={() => setActiveFeatureIndex(index)}
                onMouseLeave={() => setActiveFeatureIndex(null)}
                className={`transition-all duration-500 ${
                  activeFeatureIndex !== null && activeFeatureIndex !== index 
                    ? 'opacity-50 scale-[0.98]' 
                    : ''
                }`}
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  features={feature.features}
                />
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 