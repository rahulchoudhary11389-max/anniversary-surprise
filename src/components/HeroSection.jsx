import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { fadeUp, fadeUpDelayed, staggerContainer, viewportOnce, scaleIn } from '../utils/animations';

export default function HeroSection({ config }) {
  // Format the milestone date display
  const formatDateDisplay = (dateString) => {
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return 'JULY 21, 2026';
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
    } catch {
      return 'JULY 21, 2026';
    }
  };

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      style={{
        textAlign: 'center',
        paddingTop: 12,
        paddingBottom: 28,
        position: 'relative',
      }}
    >
      {/* Top Floating Pink Heart Doodle */}
      <div
        style={{
          position: 'absolute',
          right: 8,
          top: 30,
          opacity: 0.8,
          pointerEvents: 'none',
        }}
      >
        <svg viewBox="0 0 35 30" width="28" height="24" fill="none" stroke="#D4717F" strokeWidth="1.6" strokeLinecap="round">
          <path d="M4 18 C 2 8, 10 2, 18 8 C 22 12, 28 8, 31 16 C 33 24, 20 28, 12 24 C 8 20, 4 25, 2 27" />
        </svg>
      </div>

      {/* 1. Date Milestone Badge: 📅 SINCE JULY 21, 2026 • Our Forever */}
      <motion.div variants={fadeUp} style={{ display: 'inline-flex', marginBottom: 18 }}>
        <span className="luxury-pill-badge">
          <Calendar size={13} color="#C59B3F" style={{ strokeWidth: 2.2 }} />
          <span>SINCE {formatDateDisplay(config.anniversaryDate)}</span>
          <span style={{ color: '#C59B3F', margin: '0 2px' }}>•</span>
          <span style={{ fontFamily: 'var(--font-garamond)', fontStyle: 'italic', textTransform: 'none', fontSize: 13, color: '#8A1521' }}>
            Our Forever
          </span>
        </span>
      </motion.div>

      {/* 2. Bold Headline: Happy 2nd Month of Forever */}
      <motion.div variants={fadeUp} style={{ position: 'relative', marginBottom: 12 }}>
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(28px, 6.5vw, 42px)',
            fontWeight: 800,
            lineHeight: 1.12,
            color: '#1C120E',
            letterSpacing: '-0.02em',
          }}
        >
          Happy {config.milestoneTitle} of<br />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
            <span style={{ height: 1, width: 28, background: '#D9C6AF', display: 'inline-block' }} />
            <span>Forever</span>
            <span style={{ height: 1, width: 28, background: '#D9C6AF', display: 'inline-block' }} />
          </span>
        </h1>
      </motion.div>

      {/* Golden Heart Divider */}
      <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', margin: '6px 0 10px' }}>
        <svg viewBox="0 0 20 20" width="12" height="12" fill="#C59B3F">
          <path d="M10 17 L2 9 C -1 6, 1 1, 6 2 C 8 3, 10 5, 10 5 C 10 5, 12 3, 14 2 C 19 1, 21 6, 18 9 Z" />
        </svg>
      </motion.div>

      {/* 3. Sweeping Calligraphy Names: Aditya & Sanjana with underline flourish */}
      <motion.div variants={scaleIn} style={{ position: 'relative', marginBottom: 16 }}>
        <div className="calligraphy-names">
          <span>{config.husbandName}</span>
          <span className="calligraphy-ampersand">&amp;</span>
          <span>{config.wifeName}</span>
        </div>
        {/* Calligraphy decorative swoosh / swash */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: -6 }}>
          <svg viewBox="0 0 280 24" width="220" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 12 C 60 2, 110 22, 140 12 C 170 2, 220 22, 270 12"
              stroke="#C59B3F"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.75"
            />
          </svg>
        </div>
      </motion.div>

      {/* 4. Elegant Serif Italic Quote */}
      <motion.div variants={fadeUpDelayed} style={{ maxWidth: 420, margin: '0 auto', padding: '0 8px' }}>
        <blockquote
          className="font-garamond"
          style={{
            fontStyle: 'italic',
            fontSize: 'clamp(16px, 4vw, 19px)',
            lineHeight: 1.45,
            color: '#4A352C',
            letterSpacing: '0.01em',
          }}
        >
          &ldquo;{config.heroQuote}&rdquo;
        </blockquote>

        {/* Small Heart Ornament below quote */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 14 }}>
          <span style={{ height: 1, width: 24, background: '#D9C6AF', display: 'inline-block' }} />
          <svg viewBox="0 0 20 20" width="10" height="10" fill="#8A1521">
            <path d="M10 17 L2 9 C -1 6, 1 1, 6 2 C 8 3, 10 5, 10 5 C 10 5, 12 3, 14 2 C 19 1, 21 6, 18 9 Z" />
          </svg>
          <span style={{ height: 1, width: 24, background: '#D9C6AF', display: 'inline-block' }} />
        </div>
      </motion.div>
    </motion.section>
  );
}
