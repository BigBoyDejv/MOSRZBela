'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Fisherman.module.css';

const phases = [
  { emoji: '🚣', label: 'Vítajte v Belej!', bg: 'boat' },
  { emoji: '🚶', label: 'Poďte na prechádzku...', bg: 'walking' },
  { emoji: '🎣', label: 'Čas na rybolov!', bg: 'fishing' },
  { emoji: '🏆', label: 'Petrov zdar!', bg: 'success' },
];

export default function TravelingFisherman() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  const x = useTransform(smoothProgress, [0, 0.25, 0.55, 0.85, 1], ['5vw', '75vw', '10vw', '70vw', '45vw']);
  const y = useTransform(smoothProgress, [0, 0.25, 0.55, 0.85, 1], ['70vh', '72vh', '75vh', '78vh', '82vh']);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.9, 1, 1.15]);

  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v < 0.25) setPhase(0);
      else if (v < 0.55) setPhase(1);
      else if (v < 0.85) setPhase(2);
      else setPhase(3);

      // Hide when at very top (hero fully visible) to avoid overlap
      setVisible(v > 0.05);
    });
    return () => unsub();
  }, [scrollYProgress]);

  if (!visible) return null;

  return (
    <motion.div
      className={styles.wrapper}
      style={{ left: x, top: y, scale }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.character}>
        <motion.div
          className={styles.emojiChar}
          key={phase}
          initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {phases[phase].emoji}
        </motion.div>

        <motion.div
          className={styles.tooltip}
          key={`tip-${phase}`}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {phases[phase].label}
        </motion.div>
      </div>
    </motion.div>
  );
}
