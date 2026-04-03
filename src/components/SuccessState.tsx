'use client';
import { motion } from 'framer-motion';
import styles from './SuccessState.module.css';

interface SuccessStateProps {
  onBack: () => void;
}

export default function SuccessState({ onBack }: SuccessStateProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bgOverlay} />

      <motion.div
        className={styles.card}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Visual Side */}
        <div className={styles.visualSide}>
          <motion.div
            className={styles.bigVisual}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, delay: 0.3 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.trophySvg}>
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.45 1-1 1H7.11c-.43 0-.81-.27-.95-.68l-1.14-3.42c-.19-.58.24-1.15.85-1.15H10" />
              <path d="M14 14.66V17c0 .55.45 1 1 1h1.89c.43 0 .81-.27.95-.68l1.14-3.42c.19-.58-.24-1.15-.85-1.15H14" />
              <path d="M15 2H9v12c0 2 1 3 3 3s3-1 3-3V2Z" />
            </svg>
          </motion.div>
          <motion.div
            className={styles.confettiRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.confettiItem}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div className={styles.confettiItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8c0 4.5-4.5 9-9 9-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c4.5 0 9 4.5 9 9Z"/><path d="M12 12c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1Z"/></svg>
            </div>
            <div className={styles.confettiItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            </div>
          </motion.div>
          <div className={styles.waterWave} />
        </div>

        {/* Info Side */}
        <div className={styles.infoSide}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Petrov zdar!
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Vaša žiadosť o povolenku bola úspešne odoslaná.
          </motion.p>

          <motion.div
            className={styles.paymentBox}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className={styles.payLabel}>Pre dokončenie prosím uhraďte:</p>

            <div className={styles.payRow}>
              <span className={styles.payKey}>IBAN</span>
              <span className={styles.payValue}>SK12 0200 0000 0012 3456 7890</span>
            </div>

            <div className={styles.payRow}>
              <span className={styles.payKey}>Suma</span>
              <span className={styles.payValue}>Podľa cenníka (napr. 50 €)</span>
            </div>

            <div className={styles.payRow}>
              <span className={styles.payKey}>Variabilný symbol</span>
              <span className={styles.payValue}>Vaše tel. číslo</span>
            </div>
          </motion.div>

          <motion.p
            className={styles.notice}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Potvrdenie o prijatí platby vám zašleme e-mailom do 48 hodín.
            Povolenku si budete môcť vyzdvihnúť v rybárskom dome v Spišskej Belej.
          </motion.p>

          <motion.button
            onClick={onBack}
            className={styles.homeBtn}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Späť na hlavnú stránku
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
