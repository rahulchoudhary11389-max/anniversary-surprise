import confetti from 'canvas-confetti';

export const triggerHeartConfetti = () => {
  // Fire romantic rose and gold confetti
  const count = 70;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#E63946', '#F4A261', '#E76F51', '#D4AF37', '#FFCCD5', '#C9184A']
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 30,
    startVelocity: 45,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
