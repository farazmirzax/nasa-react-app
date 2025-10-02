import { useEffect, useRef } from 'react';

export default function NebulaBackground() {
  const nebulaRef = useRef(null);

  useEffect(() => {
    const container = nebulaRef.current;
    if (!container) return;

    // Create multiple nebula layers for depth
    const createNebulae = () => {
      const numClouds = 5;
      
      for (let i = 0; i < numClouds; i++) {
        const nebula = document.createElement('div');
        nebula.className = 'nebula-cloud';
        
        // Random position
        nebula.style.left = Math.random() * 120 - 10 + '%';
        nebula.style.top = Math.random() * 120 - 10 + '%';
        
        // Random size
        const size = Math.random() * 300 + 200;
        nebula.style.width = size + 'px';
        nebula.style.height = size + 'px';
        
        // Random color variation (purple/blue/pink space colors)
        const colors = [
          'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.05) 50%, transparent 100%)',
          'radial-gradient(circle, rgba(219, 39, 119, 0.08) 0%, rgba(147, 51, 234, 0.04) 50%, transparent 100%)',
          'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, rgba(147, 51, 234, 0.03) 50%, transparent 100%)',
          'radial-gradient(circle, rgba(168, 85, 247, 0.09) 0%, rgba(219, 39, 119, 0.04) 50%, transparent 100%)',
          'radial-gradient(circle, rgba(139, 92, 246, 0.07) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)'
        ];
        
        nebula.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation delay and duration
        nebula.style.animationDelay = Math.random() * 10 + 's';
        nebula.style.animationDuration = (Math.random() * 15 + 20) + 's';
        
        container.appendChild(nebula);
      }
    };

    createNebulae();

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={nebulaRef} className="nebula-background"></div>;
}