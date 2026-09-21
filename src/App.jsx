import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnvelopeScreen from './components/EnvelopeScreen';
import HeroSection from './components/HeroSection';
import CountUpTimer from './components/CountUpTimer';
import ScratchCardSection from './components/ScratchCardSection';
import PolaroidGallery from './components/PolaroidGallery';
import LoveLetter from './components/LoveLetter';
import AudioPlayer from './components/AudioPlayer';
import AnimatedBackground from './components/AnimatedBackground';
import { Mail, ArrowUp } from 'lucide-react';

const STORAGE_KEY = 'anniversary_surprise_config_v6';

const DEFAULT_CONFIG = {
  husbandName: 'Farhan',
  wifeName: 'Saniya',
  milestoneTitle: '2nd Month',
  anniversaryDate: '2026-07-21',
  heroQuote: 'Two months of laughter, infinite memories, and a lifetime to go with my wonderful wife Saniya.',
  loveLetterText: `Meri Pyaari Saniya,

They say time flies when you're truly happy, but these past two months have felt both like a single sweet breath and a beautiful eternity. Waking up each day knowing I get to call you my wife, support you, and build our world together is the greatest blessing of my life.

Thank you for your gentle smile, your effortless warmth, and the way your hand fits perfectly in mine. If our first sixty days are any preview of our forever, I know we are on the most extraordinary journey.

I loved you yesterday, I love you today, and I will love you through all our tomorrows.`,
};

// Advanced Page transition variants with spring physics
const mainPageVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -30,
    transition: { duration: 0.5, ease: [0.4, 0, 1, 1] },
  },
};

const envelopePageVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8 } },
  exit: { opacity: 0, scale: 1.05, filter: 'blur(8px)', transition: { duration: 0.6 } },
};

export default function App() {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: 'var(--font-sans)',
        backgroundColor: '#FAF7F2',
      }}
    >
      {/* 1. Photorealistic Animated Looping Background (Sunlight + Rose Petals + Floral Frames) */}
      <AnimatedBackground />

      {/* 2. Top-Right Audio Player Pill */}
      <AudioPlayer />

      {/* 3. Screen Switch: Photorealistic Envelope vs Storytelling Main Page */}
      <AnimatePresence mode="wait">
        {!hasOpenedEnvelope ? (
          <motion.div
            key="envelope-page"
            variants={envelopePageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ position: 'relative', zIndex: 20 }}
          >
            <EnvelopeScreen
              config={{ ...config, husbandName: 'Farhan', wifeName: 'Saniya', milestoneTitle: '2nd Month' }}
              onOpenComplete={() => setHasOpenedEnvelope(true)}
            />
          </motion.div>
        ) : (
          <motion.main
            key="main-story-content"
            variants={mainPageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'relative',
              zIndex: 20,
              paddingBottom: 90,
              maxWidth: 520,
              margin: '0 auto',
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            {/* Top Bar with "✉ Replay Envelope" button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingTop: 16,
                paddingBottom: 10,
              }}
            >
              <motion.button
                onClick={() => setHasOpenedEnvelope(false)}
                whileHover={{ scale: 1.05, borderColor: '#C59B3F' }}
                whileTap={{ scale: 0.95 }}
                className="glass-pill-btn"
                style={{ padding: '6px 16px', fontSize: 12 }}
                title="Replay Envelope Opening"
              >
                <Mail size={13} color="#8A1521" />
                <span>Replay Envelope</span>
              </motion.button>
            </div>

            {/* Storybook Sections */}
            <HeroSection config={config} />
            <CountUpTimer startDateString={config.anniversaryDate} />
            <ScratchCardSection />
            <PolaroidGallery />
            <LoveLetter config={config} />

            {/* Peeking Opened Envelope at Bottom */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <motion.div
                whileHover={{ y: -4 }}
                style={{
                  width: 220,
                  height: 48,
                  background: 'linear-gradient(180deg, #F5EDE0 0%, #EDE0CE 100%)',
                  borderRadius: '12px 12px 0 0',
                  border: '1px solid #DFCEB7',
                  borderBottom: 'none',
                  boxShadow: '0 -6px 16px rgba(60,35,15,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#8A1521" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            </div>

            {/* Back to Top button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass-pill-btn"
                style={{ padding: '8px 18px', fontSize: 12 }}
              >
                <ArrowUp size={12} color="#8A1521" />
                <span>Back to Top</span>
              </motion.button>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}