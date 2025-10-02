import { useEffect, useRef } from 'react';

export default function ShootingStars() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createShootingStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      
      // Random starting position (from off-screen top)
      const startX = Math.random() * 120 - 10; // -10% to 110%
      const startY = -10;
      const endX = startX + (Math.random() * 60 + 30) * (Math.random() > 0.5 ? 1 : -1); // Move 30-90% in random direction
      const endY = 110;
      
      // Set starting position
      star.style.left = startX + '%';
      star.style.top = startY + '%';
      
      // Calculate trajectory
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      // Calculate angle for the tail
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      
      // Set CSS custom properties for animation
      star.style.setProperty('--delta-x', deltaX + '%');
      star.style.setProperty('--delta-y', deltaY + '%');
      star.style.setProperty('--tail-angle', angle + 'deg');
      
      // Random size
      const size = Math.random() * 2 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      
      // Random speed
      const duration = Math.random() * 1.5 + 1;
      star.style.animationDuration = duration + 's';
      
      container.appendChild(star);
      
      // Remove the star after animation
      setTimeout(() => {
        if (container.contains(star)) {
          container.removeChild(star);
        }
      }, duration * 1000);
    };

    // Create shooting stars at random intervals
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every interval
        createShootingStar();
      }
    }, 2000); // Check every 2 seconds

    return () => {
      clearInterval(interval);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className="shooting-stars-container"></div>;
}