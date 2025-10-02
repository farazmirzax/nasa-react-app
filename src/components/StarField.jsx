import { useEffect, useRef } from 'react';

export default function StarField() {
  const starsRef = useRef(null);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;

    // Create multiple stars
    const createStars = () => {
      const numStars = 100;
      
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random opacity for twinkling effect
        star.style.opacity = Math.random() * 0.8 + 0.2;
        
        // Random animation delay
        star.style.animationDelay = Math.random() * 3 + 's';
        
        // Random drift speed
        star.style.animationDuration = (Math.random() * 20 + 15) + 's';
        
        container.appendChild(star);
      }
    };

    createStars();

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={starsRef} className="star-field"></div>;
}