'use client';
import { motion } from 'framer-motion';
import styles from './AboutSection.module.css';

const stats = [
  { value: '70+', label: 'Rokov tradície' },
  { value: '500+', label: 'Aktívnych členov' },
  { value: '12', label: 'Revírov' },
  { value: '2000+', label: 'kg ryby/rok' },
];

export default function AboutSection() {
  return (
    <section id="o-nas" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Left: Text */}
          <motion.div
            className={styles.textSide}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.badge}>O nás</span>
            <h2 className={styles.title}>Naša História & Poslanie</h2>
            <p className={styles.desc}>
              Miestna organizácia Slovenského rybárskeho zväzu Spišská Belá má bohatú tradíciu
              siahajúcu hlboko do minulosti. Naše revíry, na čele s Belianskym rybníkom, sú
              domovom pre mnohé druhy rýb a miestom pokoja pre každého rybára.
            </p>
            <p className={styles.desc}>
              Staráme sa o prírodné bohatstvo pod Belianskymi Tatrami, organizujeme zarybňovania,
              brigády a súťaže. Naším cieľom je udržateľný rybolov a zachovanie krásy tohto
              jedinečného prostredia pre budúce generácie.
            </p>

            <a href="#kontakt" className={styles.link}>
              Kontaktujte nás
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            className={styles.statsGrid}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={styles.statCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
