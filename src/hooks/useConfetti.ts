import confetti from 'canvas-confetti';

export function showConfetti() {
  const end = Date.now() + 5 * 1000; 
  const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];

  const frame = () => {
    if (Date.now() > end) return;

    void confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    void confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    requestAnimationFrame(frame);
  };

  frame();
}
