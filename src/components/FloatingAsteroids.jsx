import { useEffect, useRef } from 'react';

export default function FloatingAsteroids() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createAsteroids = () => {
      const numAsteroids = 6;
      
      for (let i = 0; i < numAsteroids; i++) {
        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';
        
        // Random starting position
        asteroid.style.left = Math.random() * 100 + '%';
        asteroid.style.top = Math.random() * 100 + '%';
        
        // Random size (small asteroids)
        const size = Math.random() * 8 + 4;
        asteroid.style.width = size + 'px';
        asteroid.style.height = size + 'px';
        
        // Random rotation speed
        const rotationDuration = Math.random() * 20 + 15;
        asteroid.style.setProperty('--rotation-duration', rotationDuration + 's');
        
        // Random drift speed and direction
        const driftDuration = Math.random() * 30 + 40;
        asteroid.style.setProperty('--drift-duration', driftDuration + 's');
        
        // Random animation delay
        asteroid.style.animationDelay = Math.random() * 10 + 's';
        
        // Random asteroid shape variation
        const shapes = [
          'polygon(20% 0%, 80% 0%, 100% 30%, 90% 70%, 60% 100%, 30% 95%, 0% 70%, 10% 30%)',
          'polygon(30% 0%, 70% 0%, 100% 25%, 85% 65%, 70% 100%, 25% 90%, 0% 60%, 15% 25%)',
          'polygon(25% 0%, 75% 5%, 95% 35%, 80% 75%, 55% 100%, 20% 85%, 5% 55%, 20% 20%)',
          'polygon(15% 10%, 85% 0%, 100% 40%, 90% 80%, 50% 100%, 10% 90%, 0% 50%, 25% 15%)',
          'polygon(35% 0%, 65% 10%, 100% 35%, 75% 70%, 60% 100%, 30% 80%, 0% 45%, 25% 20%)'
        ];
        
        asteroid.style.clipPath = shapes[Math.floor(Math.random() * shapes.length)];
        
        container.appendChild(asteroid);
      }
    };

    createAsteroids();

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className="floating-asteroids"></div>;
}