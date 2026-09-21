import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/animations';

// Animated single digit or unit with micro-bounce on tick
function CounterCard({ value, label }) {
  const formatted = String(value).padStart(2, '0');

  return (
    <motion.div
      className="counter-box"
      whileHover={{ y: -2, borderColor: '#C59B3F' }}
      transition={{ duration: 0.2 }}
    >
      {/* Number with subtle bounce animation when changing */}
      <motion.span
        key={formatted}
        initial={{ y: -4, opacity: 0.8 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="counter-number"
      >
        {formatted}
      </motion.span>

      {/* Label (Days, Hours, Minutes, Seconds) */}
      <span className="counter-label">{label}</span>

      {/* Tiny Gold Heart Accent under each box */}
      <div style={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
        <svg viewBox="0 0 20 20" width="8" height="8" fill="#C59B3F" opacity="0.85">
          <path d="M10 17 L2 9 C -1 6, 1 1, 6 2 C 8 3, 10 5, 10 5 C 10 5, 12 3, 14 2 C 19 1, 21 6, 18 9 Z" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function CountUpTimer({ startDateString = '2026-07-21' }) {
  const [elapsed, setElapsed] = useState({ days: 59, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDateString).getTime();
      const now = Date.now();
      const diff = Math.max(0, now - start);

      // Calculate total elapsed days, but keep days at 59 until midnight (12 AM) rolls over to 60
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const days = totalDays >= 60 ? 60 : 59;
      
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDateString]);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      style={{ marginBottom: 36 }}
    >
      <motion.div variants={fadeUp} className="storybook-card">
        {/* Subtle decorative inner border */}
        <div
          style={{
            position: 'absolute',
            inset: 6,
            border: '1px solid rgba(197, 155, 63, 0.25)',
            borderRadius: 15,
            pointerEvents: 'none',
          }}
        />

        {/* Top Header Label: — 🕒 OUR JOURNEY IN EVERY SECOND — */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 8,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <span style={{ height: 1, width: 22, background: '#D9C6AF', display: 'inline-block' }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#6A4F42', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            <Clock size={12} color="#C59B3F" style={{ strokeWidth: 2.2 }} />
            <span>OUR JOURNEY IN EVERY SECOND</span>
          </div>
          <span style={{ height: 1, width: 22, background: '#D9C6AF', display: 'inline-block' }} />
        </div>

        {/* Headline: Every Moment With You */}
        <h2
          className="font-serif"
          style={{
            textAlign: 'center',
            fontSize: 'clamp(22px, 5.5vw, 30px)',
            fontWeight: 700,
            color: '#1C120E',
            marginBottom: 6,
            position: 'relative',
            zIndex: 2,
          }}
        >
          Every Moment With You
        </h2>

        {/* Golden Heart Divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }}>
          <span style={{ height: 1, width: 32, background: '#D9C6AF', display: 'inline-block' }} />
          <svg viewBox="0 0 20 20" width="9" height="9" fill="#C59B3F">
            <path d="M10 17 L2 9 C -1 6, 1 1, 6 2 C 8 3, 10 5, 10 5 C 10 5, 12 3, 14 2 C 19 1, 21 6, 18 9 Z" />
          </svg>
          <span style={{ height: 1, width: 32, background: '#D9C6AF', display: 'inline-block' }} />
        </div>

        {/* 4 Counter Tiles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(6px, 2vw, 12px)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <CounterCard value={elapsed.days} label="Days" />
          <CounterCard value={elapsed.hours} label="Hours" />
          <CounterCard value={elapsed.minutes} label="Minutes" />
          <CounterCard value={elapsed.seconds} label="Seconds" />
        </div>
      </motion.div>
    </motion.section>
  );
}