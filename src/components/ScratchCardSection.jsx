import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Award } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/animations';

const SCRATCH_COUPONS = [
  {
    id: 'promise1',
    category: 'Vow 01',
    title: 'Hamesha Izzat Aur Mohabbat',
    subtitle: 'Main hamesha tumhari izzat karunga aur tumhe apni zindagi ki sabse badi kismat samjhunga.',
    icon: Heart,
    code: 'NIKAH-MAHABBAT',
    hint: 'Scratch to reveal my first vow',
  },
  {
    id: 'promise2',
    category: 'Vow 02',
    title: 'Duaon Ka Saath',
    subtitle: 'Har namaz mein tumhari khushi aur hamari aakhirat ke liye dua karunga.',
    icon: Sparkles,
    code: 'DUA-FOR-US',
    hint: 'Scratch to reveal our future dua',
  },
  {
    id: 'promise3',
    category: 'Vow 03',
    title: 'Har Qadam Par Sahara',
    subtitle: 'Mushkil waqt mein tumhara sahara banunga aur tumhare chehre par hamesha muskaan launga.',
    icon: Heart,
    code: 'FOREVER-SAHARA',
    hint: 'Scratch to redeem my promise',
  },
];

function SingleScratchCard({ coupon, onComplete }) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);
  const totalPixels = useRef(0);
  const clearedPixels = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    const height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    totalPixels.current = w * h;
    clearedPixels.current = 0;

    // Draw realistic Gold Foil Scratch Surface
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#EBD292');
    grad.addColorStop(0.3, '#C59B3F');
    grad.addColorStop(0.6, '#F7E7B8');
    grad.addColorStop(0.85, '#B3862A');
    grad.addColorStop(1, '#D9B458');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Add subtle gold flecks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 2 + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Centered Scratch Hint text
    ctx.font = '600 13px Montserrat, sans-serif';
    ctx.fillStyle = '#4A3212';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch with finger or mouse ✨', w / 2, h / 2 - 8);

    ctx.font = 'italic 12px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#6E4D20';
    ctx.fillText(coupon.hint, w / 2, h / 2 + 14);
  }, [coupon]);

  const scratch = (clientX, clientY) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    clearedPixels.current += 1;
    if (clearedPixels.current > 28 && !isRevealed) {
      setIsRevealed(true);
      if (onComplete) onComplete(coupon.id);
    }
  };

  const handlePointerDown = (e) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  const IconComp = coupon.icon;

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF6EE 100%)',
        border: '1px solid #EBDCC8',
        boxShadow: '0 8px 24px -4px rgba(60, 35, 15, 0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
        minHeight: 140,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px 18px',
      }}
    >
      {/* Underlying revealed content */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FAF1E2 0%, #F4E2CA 100%)',
            border: '1px solid #DFCEB7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          }}
        >
          <IconComp size={22} color="#8A1521" />
        </div>

        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#C59B3F', textTransform: 'uppercase' }}>
            {coupon.category}
          </span>
          <h4 className="font-serif" style={{ fontSize: 17, fontWeight: 700, color: '#1C120E', marginTop: 2, lineHeight: 1.2 }}>
            {coupon.title}
          </h4>
          <p className="font-garamond" style={{ fontSize: 14, color: '#6E5145', marginTop: 4, fontStyle: 'italic' }}>
            {coupon.subtitle}
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8, padding: '3px 8px', borderRadius: 4, background: '#F5EFE6', border: '1px dashed #D5C2AD', fontSize: 10, fontWeight: 600, color: '#8A1521', letterSpacing: '0.08em' }}>
            <Award size={11} />
            <span>VOW CODE: {coupon.code}</span>
          </div>
        </div>
      </div>

      {/* Gold Scratch-Off Overlay Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          cursor: isRevealed ? 'default' : 'crosshair',
          touchAction: 'none',
          transition: 'opacity 0.6s ease',
          opacity: isRevealed ? 0 : 1,
          pointerEvents: isRevealed ? 'none' : 'auto',
          borderRadius: 16,
        }}
      />
    </div>
  );
}

export default function ScratchCardSection() {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleReveal = () => {
    setRevealedCount((c) => {
      const next = c + 1;
      if (next === 1 || next === SCRATCH_COUPONS.length) {
        triggerHeartConfetti();
      }
      return next;
    });
  };

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      style={{ marginBottom: 40 }}
    >
      <div className="storybook-card">
        {/* Inner decorative border */}
        <div
          style={{
            position: 'absolute',
            inset: 6,
            border: '1px solid rgba(197, 155, 63, 0.25)',
            borderRadius: 15,
            pointerEvents: 'none',
          }}
        />

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 20, position: 'relative', zIndex: 2 }}>
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', marginBottom: 6 }}>
            <span className="luxury-pill-badge">
              <Sparkles size={12} color="#C59B3F" style={{ strokeWidth: 2.2 }} />
              <span>SACRED PROMISES</span>
            </span>
          </motion.div>

          <motion.h3
            variants={fadeUp}
            className="font-serif"
            style={{ fontSize: 'clamp(22px, 5.5vw, 28px)', fontWeight: 700, color: '#1C120E', marginBottom: 4 }}
          >
            Scratch &amp; Reveal Our Sacred Vows
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="font-garamond"
            style={{ fontStyle: 'italic', fontSize: 15, color: '#6E5145' }}
          >
            {revealedCount === SCRATCH_COUPONS.length
              ? '🎉 All 3 sacred promises unlocked!'
              : `Scratch the gold foil below to unveil ${SCRATCH_COUPONS.length - revealedCount} heartfelt promises`}
          </motion.p>
        </div>

        {/* Coupons list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 2 }}>
          {SCRATCH_COUPONS.map((coupon) => (
            <SingleScratchCard key={coupon.id} coupon={coupon} onComplete={handleReveal} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}