import { useEffect, useRef } from 'react';

export default function ConstellationCursor() {
  const cursorRef = useRef(null);
  const pointsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = cursorRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const maxPoints = 8;
    const maxDistance = 120;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        timestamp: Date.now()
      };

      pointsRef.current.push(newPoint);
      if (pointsRef.current.length > maxPoints) {
        pointsRef.current.shift();
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentTime = Date.now();
      
      // Update opacity based on age
      pointsRef.current = pointsRef.current.filter(point => {
        const age = currentTime - point.timestamp;
        point.opacity = Math.max(0, 1 - age / 2000); // Fade over 2 seconds
        return point.opacity > 0;
      });

      // Draw constellation lines
      if (pointsRef.current.length > 1) {
        for (let i = 0; i < pointsRef.current.length - 1; i++) {
          const point1 = pointsRef.current[i];
          const point2 = pointsRef.current[i + 1];
          
          const distance = Math.sqrt(
            Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
          );
          
          if (distance < maxDistance) {
            const opacity = Math.min(point1.opacity, point2.opacity) * (1 - distance / maxDistance);
            
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.strokeStyle = `rgba(135, 206, 235, ${opacity * 0.6})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw stars at points
      pointsRef.current.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${point.opacity})`;
        ctx.fill();
        
        // Add glow effect
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(135, 206, 235, ${point.opacity * 0.3})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={cursorRef}
      className="constellation-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  );
}