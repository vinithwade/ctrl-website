"use client";

import React, { useEffect, useRef } from 'react';

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Stars data
    const stars: {x: number, y: number, radius: number, opacity: number, speed: number}[] = [];
    
    // Nebula data
    const nebulae: {x: number, y: number, radius: number, color: string, opacity: number}[] = [];
    
    // Create stars
    const createStars = () => {
      stars.length = 0;
      const starCount = Math.floor(canvas.width * canvas.height / 1500); // Increased density
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2, // Slightly larger stars
          opacity: Math.random() * 0.8 + 0.2, // Between 0.2 and 1
          speed: Math.random() * 0.05 + 0.01 // Subtle twinkling speed
        });
      }
    };

    // Create nebulae
    const createNebulae = () => {
      nebulae.length = 0;
      const nebulaCount = 3 + Math.floor(canvas.width / 500); // 3-6 nebulae depending on screen size
      
      const colors = [
        'rgba(0, 240, 255, %opacity%)', // Cyan (CTRL accent color)
        'rgba(100, 100, 255, %opacity%)', // Blue
        'rgba(255, 100, 255, %opacity%)', // Magenta
        'rgba(100, 200, 255, %opacity%)' // Light blue
      ];
      
      for (let i = 0; i < nebulaCount; i++) {
        const opacity = 0.05 + Math.random() * 0.09; // Increased opacity
        const colorTemplate = colors[Math.floor(Math.random() * colors.length)];
        const color = colorTemplate.replace('%opacity%', opacity.toString());
        
        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 150 + Math.random() * 300,
          color: color,
          opacity: opacity
        });
      }
    };

    createStars();
    createNebulae();
    window.addEventListener('resize', createStars);
    window.addEventListener('resize', createNebulae);

    // Animation
    let animationFrameId: number;
    let lastFrameTime = Date.now();
    
    // For star movement
    const starMovement = {
      speed: 0.05,
      direction: { x: 1, y: 0.2 } // Moving right and slightly down
    };
    
    const animate = () => {
      const now = Date.now();
      const deltaTime = now - lastFrameTime;
      lastFrameTime = now;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(8, 8, 12, 1)');
      gradient.addColorStop(1, 'rgba(5, 5, 20, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebulae
      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw and move stars
      stars.forEach(star => {
        // Move stars
        star.x += starMovement.direction.x * starMovement.speed * deltaTime;
        star.y += starMovement.direction.y * starMovement.speed * deltaTime;
        
        // Wrap around screen edges
        if (star.x > canvas.width) star.x = 0;
        if (star.y > canvas.height) star.y = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y < 0) star.y = canvas.height;
        
        // Update star opacity for twinkling effect
        star.opacity += Math.sin(Date.now() * star.speed) * 0.01;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // Add occasional shooting star (rare)
      if (Math.random() < 0.008) { // Increased chance
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height/3;
        const length = 50 + Math.random() * 100;
        const angle = Math.PI/4 + Math.random() * Math.PI/4; // Downward angle
        
        const shootingStar = ctx.createLinearGradient(
          startX, 
          startY, 
          startX + Math.cos(angle) * length,
          startY + Math.sin(angle) * length
        );
        
        shootingStar.addColorStop(0, 'rgba(255, 255, 255, 0)');
        shootingStar.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
        shootingStar.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
        ctx.strokeStyle = shootingStar;
        ctx.lineWidth = 1.5; // Slightly thicker
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', createStars);
      window.removeEventListener('resize', createNebulae);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-20 opacity-100"
    />
  );
};

export default SpaceBackground; 