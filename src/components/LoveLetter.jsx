import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Feather } from 'lucide-react';
import { fadeUp, fadeUpDelayed, scaleIn, staggerContainer, viewportOnce } from '../utils/animations';
import { triggerHeartConfetti } from '../utils/confetti';

export default function LoveLetter({ config }) {
  const customShayari = `Tujhko paana meri duaon ka sabse haseen sila hai,
Khuda ne jaise mere dil ki har maangi hui duaa ko qubool kiya hai.

Waqt koi bhi ho, halat kaisi bhi ho,
Mera har saans tumhare saath jeene ka irada hai.
Sath rahenge is duniya mein bhi,
Aur Jannat tak ka yeh hamara safar sabse pyaara hai.`;

  const paragraphs = customShayari.split('\n\n').filter(Boolean);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      style={{ marginBottom: 32 }}
    >
      <div
        style={{
          background: 'linear-gradient(180deg, #FAF7F2 0%, #F5EDE0 100%)',
          borderRadius: 20,
          border: '1px solid #E8D9C5',
          boxShadow: '0 18px 40px -10px rgba(60, 35, 15, 0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
          padding: '30px 24px',
          position: 'relative',
        }}
      >
        {/* Inner delicate border */}
        <div
          style={{
            position: 'absolute',
            inset: 8,
            border: '1px solid rgba(197, 155, 63, 0.3)',
            borderRadius: 14,
            pointerEvents: 'none',
          }}
        />

        {/* Top Letter Header */}
        <div style={{ textAlign: 'center', marginBottom: 22, position: 'relative', zIndex: 2 }}>
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', marginBottom: 8 }}>
            <span className="luxury-pill-badge">
              <Feather size={12} color="#C59B3F" style={{ strokeWidth: 2.2 }} />
              <span>FROM MY HEART TO YOURS</span>
            </span>
          </motion.div>

          <motion.h3
            variants={fadeUp}
            className="font-serif"
            style={{ fontSize: 'clamp(24px, 6vw, 30px)', fontWeight: 700, color: '#1C120E', marginBottom: 4 }}
          >
            A Letter for Our 2nd Month
          </motion.h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '8px 0 16px' }}>
            <span style={{ height: 1, width: 30, background: '#D9C6AF', display: 'inline-block' }} />
            <svg viewBox="0 0 20 20" width="9" height="9" fill="#8A1521">
              <path d="M10 17 L2 9 C -1 6, 1 1, 6 2 C 8 3, 10 5, 10 5 C 10 5, 12 3, 14 2 C 19 1, 21 6, 18 9 Z" />
            </svg>
            <span style={{ height: 1, width: 30, background: '#D9C6AF', display: 'inline-block' }} />
          </div>
        </div>

        {/* Letter Paragraphs */}
        <div style={{ position: 'relative', zIndex: 2, padding: '0 6px' }}>
          {paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              variants={fadeUp}
              className="font-garamond"
              style={{
                fontSize: 'clamp(16px, 4vw, 18px)',
                lineHeight: 1.7,
                color: '#3D2A22',
                marginBottom: 16,
                letterSpacing: '0.01em',
                whiteSpace: 'pre-line',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              {p}
            </motion.p>
          ))}

          {/* Letter Calligraphy Signoff */}
          <motion.div variants={scaleIn} style={{ marginTop: 24, textAlign: 'right', paddingRight: 10 }}>
            <p className="font-garamond" style={{ fontStyle: 'italic', fontSize: 16, color: '#6E5145' }}>
              Yours always &amp; forever,
            </p>
            <div
              className="font-cursive"
              style={{
                fontSize: 38,
                color: '#8A1521',
                lineHeight: 1.2,
                marginTop: 2,
              }}
            >
              {config.husbandName}
            </div>
          </motion.div>

          {/* Interactive "Send Hearts" button */}
          <motion.div variants={fadeUpDelayed} style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
            <motion.button
              onClick={triggerHeartConfetti}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-pill-btn"
            >
              <Heart size={15} color="#8A1521" fill="#8A1521" />
              <span>Send Hearts Back</span>
              <Heart size={15} color="#8A1521" fill="#8A1521" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}