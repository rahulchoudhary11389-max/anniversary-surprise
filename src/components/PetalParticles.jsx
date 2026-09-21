import React, { useEffect, useRef } from 'react';

export default function PetalParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Rose petals and golden sparkle particles
    const petalColors = [
      'rgba(215, 95, 105, 0.45)', // Rose soft
      'rgba(184, 55, 65, 0.4)',   // Deep rose
      'rgba(240, 160, 168, 0.35)',// Light blush
      'rgba(218, 175, 80, 0.35)', // Golden dust
      'rgba(255, 230, 235, 0.3)'  // Pale petal
    ];

    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.9 + 0.6,
      speedX: Math.random() * 0.6 - 0.3,
      angle: Math.random() * 360,
      spin: Math.random() * 1.5 - 0.75,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      swayOffset: Math.random() * Math.PI * 2,
      isSparkle: Math.random() > 0.7
    }));

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.015;

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(tick + p.swayOffset) * 0.6 + p.speedX;
        p.angle += p.spin;

        // Reset if moved past bottom
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);

        if (p.isSparkle) {
          // Golden sparkle diamond
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 0.5);
          ctx.lineTo(p.size * 0.5, 0);
          ctx.lineTo(0, p.size * 0.5);
          ctx.lineTo(-p.size * 0.5, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          // Romantic curved petal shape
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.4, p.size, p.size * 0.7, 0, p.size);
          ctx.bezierCurveTo(-p.size, p.size * 0.7, -p.size * 0.7, -p.size * 0.4, 0, 0);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.8 }}
    />
  );
}
