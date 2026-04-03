'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './WaterBodiesSection.module.css';

const waterBodies = [
  {
    title: 'VN Spišská Belá',
    type: 'Kaprový revír (Lovný)',
    desc: 'Najobľúbenejší revír s rozlohou 3,5 ha. Lov rýb povolený na kaprové povolenky. Bohaté zarybnenie a moderné zázemie.',
    image: '/images/SpišskaBela.jpg',
  },
  {
    title: 'Rieka Poprad č. 5',
    type: 'Lipňový revír (Lovný)',
    desc: 'Úsek od ústia potoka Biela v Bušovciach, po ústie Čierneho potoka v Strážkach. Ideálne pre priaznivcov lipňa.',
    image: '/images/riekapopradč5.jpg',
  },
  {
    title: 'Potok Biela č. 1',
    type: 'Pstruhový revír (Lovný)',
    desc: 'Úsek od ústia v Bušovciach po hranice TANAP-u. Krištáľovo čistá voda domovom pstruha potočného.',
    image: '/images/potokbielač1.jpg',
  },
];

export default function WaterBodiesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.badge}>Naše Revíry</span>
          <h2 className={styles.title}>Kde môžete loviť?</h2>
          <p className={styles.subtitle}>
            MO SRZ Spišská Belá obhospodaruje rozmanité vodné plochy pod Belianskymi Tatrami
          </p>
        </motion.div>

        <div className={styles.grid}>
          {waterBodies.map((item, i) => (
            <motion.div
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <span className={styles.typeTag}>{item.type}</span>
                </div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
                <div className={styles.divider} />
                <button className={styles.exploreBtn}>
                  Zobraziť detaily
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className={styles.bgGlow} />
    </section>
  );
}
