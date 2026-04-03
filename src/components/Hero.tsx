'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax layers at different speeds
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.8]);

  return (
    <section ref={ref} className={styles.hero}>
      {/* Background Layer — Authentic Tatra Lake Photo */}
      <motion.div className={styles.bgLayer} style={{ y: bgY }}>
        <img
          src="/images/belarybnik.jpg"
          alt="Beliansky Rybník pod Tatrami"
          className={styles.bgImage}
        />
      </motion.div>

      {/* SVG Mountain Silhouette for depth */}
      <motion.div className={styles.mountainLayer} style={{ y: midY }}>
        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          className={styles.mountainSvg}
        >
          <path
            d="M0,400 L0,280 Q80,200 160,250 Q240,300 320,220 Q400,140 480,200 Q560,260 640,180 Q720,100 800,160 Q880,220 960,150 Q1040,80 1120,140 Q1200,200 1280,130 Q1360,60 1440,120 L1440,400 Z"
            fill="rgba(6, 13, 9, 0.6)"
          />
        </svg>
      </motion.div>

      {/* Dark Overlay */}
      <motion.div className={styles.overlay} style={{ opacity: overlayOpacity }} />

      {/* Gradient Fade */}
      <div className={styles.gradientBottom} />

      {/* Content */}
      <motion.div className={styles.content} style={{ y: contentY }}>
        <motion.span
          className={styles.overline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Objavte krajinu Tatrickej prírody
        </motion.span>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Rybársky spolok
          <br />
          <span className={styles.titleAccent}>MO SRZ Spišská Belá</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Rybolov v srdci Spiša — miesto, kde ožívajú legendy
        </motion.p>

        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a href="/povolenky" className={styles.btnPrimary}>
            Kúpiť Povolenku Online
          </a>
          <a href="#o-nas" className={styles.btnSecondary}>
            Viac o nás
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className={styles.scrollHint}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
