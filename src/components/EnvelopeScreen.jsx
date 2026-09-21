import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerHeartConfetti } from '../utils/confetti';

export default function EnvelopeScreen({ config, onOpenComplete }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    triggerHeartConfetti();
    setTimeout(() => {
      onOpenComplete();
    }, 2400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Texts */}
      <div style={{ textAlign: 'center', marginBottom: 20, zIndex: 10, maxWidth: '100%' }}>
        <div className="luxury-pill-badge" style={{ marginBottom: 12 }}>
          <span>🎁</span> A SURPRISE AWAITS
        </div>
        <h1 className="font-serif font-semibold" style={{ fontSize: 'clamp(28px, 6vw, 38px)', color: 'var(--ink-primary)' }}>
          For My Dearest
        </h1>
        <div className="relative inline-block mt-1">
          <h2 className="font-cursive" style={{ fontSize: 'clamp(48px, 10vw, 68px)', color: 'var(--crimson-main)', lineHeight: 1.1 }}>
            Wife
          </h2>
        </div>
        <p className="font-garamond italic" style={{ fontSize: '16px', color: 'var(--ink-secondary)', marginTop: 6 }}>
          Celebrating {config?.milestoneTitle || '2nd Month'} with you
        </p>
      </div>

      {/* Photorealistic Envelope Container */}
      <div
        className="envelope-3d-scene"
        style={{
          margin: '10px 0 20px 0',
          width: '100%',
          maxWidth: 380,
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div className="envelope-card" style={{ position: 'relative', overflow: 'visible' }}>
          
          {/* Popup Letter Card floating nicely on top after opening */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: -90 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  left: '5%',
                  right: '5%',
                  top: '20%',
                  background: '#FFFDF9',
                  borderRadius: '16px',
                  padding: '20px 16px',
                  boxShadow: '0 16px 40px rgba(60, 35, 15, 0.2)',
                  border: '1px solid #DFCEB7',
                  textAlign: 'center',
                  zIndex: 100,
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>❤️</div>
                <h3 className="font-cursive text-2xl mb-1" style={{ color: 'var(--crimson-main)' }}>
                  {config?.husbandName || 'Farhan'} &amp; {config?.wifeName || 'Saniya'}
                </h3>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--ink-muted)' }}>
                  Forever Begins Here
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="envelope-flap-left-side" style={{ zIndex: 20 }}></div>
          <div className="envelope-flap-right-side" style={{ zIndex: 20 }}></div>
          <div className="envelope-bottom-pocket" style={{ zIndex: 25 }}></div>

          <motion.div
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="velvet-ribbon-vertical"
            style={{ zIndex: 30 }}
          ></motion.div>

          {/* Top Flap with 3D Rotation */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 40 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
            className="envelope-top-triangle"
          >
            <motion.div
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              onClick={handleOpen}
              className="glossy-wax-seal"
              style={{ zIndex: 45 }}
            >
              <div className="wax-seal-inner-emboss">
                <span className="text-white/90 text-2xl font-serif">♡</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="envelope-handwritten-note" style={{ zIndex: 15 }}>
            With all<br />my love ♡
          </div>
        </div>
      </div>

      {/* Bottom Action Button */}
      <motion.div
        animate={isOpen ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        style={{ zIndex: 10, textAlign: 'center' }}
      >
        <button onClick={handleOpen} className="glass-pill-btn" style={{ padding: '12px 28px', fontSize: '14px' }}>
          <span style={{ color: 'var(--crimson-main)' }}>♥</span> Tap the wax seal to open <span style={{ color: 'var(--crimson-main)' }}>♥</span>
        </button>
      </motion.div>
    </div>
  );
}