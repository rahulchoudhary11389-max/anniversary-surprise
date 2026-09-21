import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Realistic animated background with sunlight shadows, drifting rose petals, and gold sparkle dust
export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Drifting realistic rose petals
    const petalColors = [
      { fill: '#8A1521', shadow: 'rgba(60, 10, 15, 0.25)', edge: '#A82230' }, // Deep Crimson
      { fill: '#9C1E2B', shadow: 'rgba(70, 10, 20, 0.22)', edge: '#BF2C3C' }, // Ruby Red
      { fill: '#730E17', shadow: 'rgba(45, 5, 10, 0.3)', edge: '#8A1521' },   // Wine Velvet
      { fill: '#D97A88', shadow: 'rgba(100, 30, 40, 0.15)', edge: '#E5929E' }, // Soft Blush Rose
    ];

    const petals = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height * 0.5,
      size: 14 + Math.random() * 16,
      aspect: 0.55 + Math.random() * 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      vx: -0.2 + Math.random() * 0.6,
      vy: 0.35 + Math.random() * 0.55,
      flutterSpeed: 0.018 + Math.random() * 0.02,
      flutterOffset: Math.random() * Math.PI * 2,
      flutterAmp: 0.2 + Math.random() * 0.35,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: 0.55 + Math.random() * 0.4,
    }));

    // Floating gold dust sparkles
    const sparkles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.6,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      pulseOffset: Math.random() * Math.PI * 2,
      vy: -0.15 - Math.random() * 0.25,
    }));

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle swaying diagonal sunlight beams
      const sunBeamGrad = ctx.createLinearGradient(0, 0, width, height);
      const sway = Math.sin(time * 0.5) * 20;
      sunBeamGrad.addColorStop(0, 'rgba(255, 253, 247, 0.4)');
      sunBeamGrad.addColorStop(0.35 + Math.sin(time * 0.3) * 0.03, 'rgba(255, 250, 240, 0.15)');
      sunBeamGrad.addColorStop(0.65 + Math.cos(time * 0.25) * 0.03, 'rgba(235, 220, 200, 0.18)');
      sunBeamGrad.addColorStop(1, 'rgba(220, 200, 180, 0.28)');

      ctx.save();
      ctx.fillStyle = sunBeamGrad;
      ctx.fillRect(0, 0, width, height);

      // Diagonal window shadows (soft stripes)
      ctx.rotate((-25 * Math.PI) / 180);
      const shadowSpacing = 280;
      for (let i = -width; i < width * 2; i += shadowSpacing) {
        const shadowGrad = ctx.createLinearGradient(i + sway, 0, i + 90 + sway, 0);
        shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.035)');
        shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.0)');
        shadowGrad.addColorStop(1, 'rgba(255, 255, 255, 0.04)');
        ctx.fillStyle = shadowGrad;
        ctx.fillRect(i + sway, -height * 2, 110, height * 4);
      }
      ctx.restore();

      // 2. Draw gold sparkles
      sparkles.forEach((s) => {
        s.y += s.vy;
        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        const currentOpacity = s.opacity * (0.5 + 0.5 * Math.sin(time * 2 + s.pulseOffset));

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity})`;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      // 3. Draw realistic drifting rose petals
      petals.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(time * p.flutterSpeed + p.flutterOffset) * 0.4;
        p.rotation += p.rotSpeed;

        if (p.y > height + 40) {
          p.y = -30;
          p.x = Math.random() * width;
        }

        const flutterScale = 1 - Math.abs(Math.sin(time * 1.5 + p.flutterOffset)) * p.flutterAmp;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(flutterScale, 1);

        // Soft drop shadow
        ctx.shadowColor = p.color.shadow;
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 6;

        // Realistic petal curved shape (Bezier curves)
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.7);
        ctx.bezierCurveTo(
          p.size * p.aspect, -p.size * 0.6,
          p.size * p.aspect * 1.1, p.size * 0.4,
          0, p.size * 0.8
        );
        ctx.bezierCurveTo(
          -p.size * p.aspect * 1.1, p.size * 0.4,
          -p.size * p.aspect, -p.size * 0.6,
          0, -p.size * 0.7
        );
        ctx.closePath();

        // Shading gradient on petal
        const grad = ctx.createRadialGradient(-p.size * 0.2, -p.size * 0.2, 2, 0, 0, p.size);
        grad.addColorStop(0, p.color.edge);
        grad.addColorStop(0.6, p.color.fill);
        grad.addColorStop(1, '#4A080E');

        ctx.fillStyle = grad;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Delicate inner spine highlight
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.5);
        ctx.quadraticCurveTo(p.size * 0.08, 0, 0, p.size * 0.6);
        ctx.strokeStyle = 'rgba(255, 200, 210, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <>
      {/* 60fps Canvas for sunlight shadows & drifting petals */}
      <canvas ref={canvasRef} className="sunlight-canvas" />

      {/* Layered paper noise texture */}
      <div className="sunlight-overlay" />

      {/* Top Left Realistic Floral & Baby's Breath Frame */}
      <motion.div
        className="floral-corner-tl"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(2px 4px 10px rgba(50,25,15,0.12))' }}>
          {/* Soft baby's breath sprigs */}
          <g opacity="0.95">
            {/* Stems */}
            <path d="M-10 -10 C 20 25, 45 40, 85 55" stroke="#7A8B63" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M25 28 C 40 15, 65 20, 95 25" stroke="#879970" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M45 40 C 60 65, 80 85, 110 95" stroke="#7A8B63" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M10 50 C 35 75, 55 110, 75 140" stroke="#879970" strokeWidth="1.6" strokeLinecap="round" />
            
            {/* White delicate blossom clusters */}
            {[
              [85, 55, 4], [95, 25, 3.5], [110, 95, 4], [75, 140, 3.8],
              [60, 30, 3], [75, 45, 3.2], [50, 70, 3.5], [68, 85, 3.2],
              [100, 60, 2.8], [90, 80, 3.4], [115, 85, 2.9], [40, 110, 3.2],
              [30, 90, 3], [85, 125, 3.5], [105, 35, 3.2]
            ].map(([cx, cy, r], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r} fill="#FFFDF8" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))" />
                <circle cx={cx} cy={cy} r={r * 0.4} fill="#EBD89F" opacity="0.8" />
              </g>
            ))}
          </g>

          {/* Flowing soft satin pink ribbon curl */}
          <path
            d="M-15 40 C 20 45, 15 90, 35 115 C 50 135, 30 155, 10 170"
            fill="none"
            stroke="url(#pinkRibbonGrad1)"
            strokeWidth="10"
            strokeLinecap="round"
            filter="drop-shadow(2px 3px 6px rgba(90,40,40,0.2))"
          />
          <defs>
            <linearGradient id="pinkRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7CAD0" />
              <stop offset="50%" stopColor="#EEA3B0" />
              <stop offset="100%" stopColor="#D97A88" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Bottom Right Realistic Roses & Floral Frame */}
      <motion.div
        className="floral-corner-br"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
      >
        <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(-2px -4px 12px rgba(50,25,15,0.15))' }}>
          {/* Baby's breath stems */}
          <g opacity="0.95">
            <path d="M190 190 C 150 140, 110 110, 60 90" stroke="#7A8B63" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M140 150 C 110 160, 80 145, 50 135" stroke="#879970" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M110 110 C 95 80, 80 60, 55 45" stroke="#7A8B63" strokeWidth="1.4" strokeLinecap="round" />

            {/* White flower puffs */}
            {[
              [60, 90, 4.2], [50, 135, 3.8], [55, 45, 3.5], [85, 100, 3],
              [95, 130, 3.4], [75, 70, 3.2], [110, 85, 3.5], [40, 110, 3],
              [70, 120, 3.6], [90, 60, 2.9]
            ].map(([cx, cy, r], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r} fill="#FFFDF8" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))" />
                <circle cx={cx} cy={cy} r={r * 0.35} fill="#EBD89F" opacity="0.8" />
              </g>
            ))}
          </g>

          {/* Deep Velvet Rose Blossom at bottom-right */}
          <g transform="translate(115, 115)">
            {/* Outer Rose Petals */}
            <circle cx="0" cy="0" r="32" fill="#6A0D15" filter="drop-shadow(0 4px 10px rgba(40,10,15,0.4))" />
            <path d="M-22 -15 C -28 5, -15 25, 10 28 C 30 15, 30 -10, 10 -26 C -8 -26, -18 -20, -22 -15 Z" fill="#871520" />
            <path d="M-15 15 C 5 28, 25 20, 24 -2 C 22 -20, 0 -22, -14 -12 C -24 0, -20 12, -15 15 Z" fill="#A8202E" />
            {/* Inner Spiral Petals */}
            <path d="M-8 -8 C -14 2, -5 14, 8 12 C 16 6, 12 -8, 2 -12 C -6 -12, -8 -8, -8 -8 Z" fill="#C42A39" />
            <ellipse cx="1" cy="-1" rx="6" ry="5" fill="#8A1521" />
            <ellipse cx="1" cy="-1" rx="3" ry="2.5" fill="#E67380" opacity="0.6" />
          </g>

          {/* Soft Pink Satin Ribbon Curl */}
          <path
            d="M190 120 C 150 110, 140 70, 110 50 C 90 35, 75 10, 80 -10"
            fill="none"
            stroke="url(#pinkRibbonGrad2)"
            strokeWidth="11"
            strokeLinecap="round"
            filter="drop-shadow(-2px 3px 6px rgba(90,40,40,0.2))"
          />
          <defs>
            <linearGradient id="pinkRibbonGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#F9D4D9" />
              <stop offset="50%" stopColor="#EEA3B0" />
              <stop offset="100%" stopColor="#D97A88" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </>
  );
}
