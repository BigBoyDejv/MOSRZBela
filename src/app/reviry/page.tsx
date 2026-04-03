'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { TableSkeleton } from '@/components/common/Skeleton';
import styles from './Reviry.module.css';

const allReviry = [
  {
    name: 'Poprad č.5',
    id: '4-1980-6-1',
    type: 'lipňový',
    status: 'lovný',
    image: '/images/riekapopradč5.jpg',
    desc: 'Úsek od ústia potoka Biela č.1. v Bušovciach, po ústie Čierneho potoka v Spišskej Belej - Strážky.'
  },
  {
    name: 'VN Beliansky č.1',
    id: '4-3190-5-2',
    type: 'lipňový',
    status: 'chovný',
    desc: 'Chovný revír pre produkciu násadových rýb.'
  },
  {
    name: 'VN Beliansky č.2',
    id: '4-3200-4-2',
    type: 'pstruhový',
    status: 'chovný',
    desc: 'Pstruhová vodná nádrž určená na odchov násad.'
  },
  {
    name: 'VN Beliansky č.3',
    id: '4-3210-4-1',
    type: 'pstruhový',
    status: 'lovný',
    desc: 'Revír so špeciálnym režimom lovu pstruha.'
  },
  {
    name: 'Biela č.1',
    id: '4-0090-4-1',
    type: 'pstruhový',
    status: 'lovný',
    image: '/images/potokbielač1.jpg',
    desc: 'Úsek od ústia v Bušovciach po hranice TANAP-u.'
  },
  {
    name: 'Beliansky potok',
    id: '4-0070-4-1',
    type: 'pstruhový',
    status: 'lovný',
    desc: 'Úsek od ústia po hranice TANAP-u s prítokmi.'
  },
  {
    name: 'Potok Hučava',
    id: '4-0740-4-1',
    type: 'pstruhový',
    status: 'chovný',
    desc: 'Prítok Hučava od druhého cestného mosta pod Šarpancom po hranice TANAPu je po celý rok hájený.'
  },
  {
    name: 'VN Spišská Belá',
    id: '4-3800-1-1',
    type: 'kaprový',
    status: 'lovný',
    image: '/images/SpišskaBela.jpg',
    desc: 'Hlavný rybník v meste, ideálny na rekreačný rybolov na kaprové povolenky.'
  }
];

export default function ReviryPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h1 className={styles.title}>Rybárske Revíry</h1>
          </div>
        </header>
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.tableWrapper}>
              <TableSkeleton />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Rybárske Revíry
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Prehľad vodných plôch obhospodarovaných MO SRZ Spišská Belá
          </motion.p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Náhľad</th>
                  <th>Názov revíru</th>
                  <th>Číslo revíru</th>
                  <th>Charakteristika</th>
                  <th>Status</th>
                  <th>Popis</th>
                </tr>
              </thead>
              <tbody>
                {allReviry.map((revir, i) => (
                  <motion.tr 
                    key={revir.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <td>
                      {revir.image ? (
                        <div className={styles.thumbnailWrapper}>
                          <Image
                            src={revir.image}
                            alt={revir.name}
                            width={100}
                            height={60}
                            className={styles.thumbnail}
                          />
                        </div>
                      ) : null}
                    </td>
                    <td className={styles.nameCell}>{revir.name}</td>
                    <td className={styles.idCell}>{revir.id}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[revir.type]}`}>
                        {revir.type}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.status} ${styles[revir.status]}`}>
                        {revir.status}
                      </span>
                    </td>
                    <td className={styles.descCell}>{revir.desc}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
