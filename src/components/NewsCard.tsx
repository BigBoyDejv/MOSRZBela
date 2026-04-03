'use client';
import { motion } from 'framer-motion';
import { Announcement } from '@/lib/types';
import styles from './NewsCard.module.css';

interface NewsProps {
  item: Announcement;
  index: number;
}

export default function NewsCard({ item, index }: NewsProps) {
  const formattedDate = new Date(item.created_at).toLocaleDateString('sk-SK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.article
      className={`${styles.card} ${item.is_pinned ? styles.pinned : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top row: badge + date */}
      <div className={styles.topRow}>
        <div className={styles.badges}>
          <span className={styles.categoryBadge}>{item.category}</span>
          {item.is_pinned && (
            <span className={styles.pinnedBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.pinIcon}><path d="M12 2v8"/><path d="m16 4-4 4-4-4"/><path d="M4 12v8h16v-8h-4.5l-1.5-2h-4l-1.5 2Z"/></svg>
              Pripnuté
            </span>
          )}
        </div>
        <time className={styles.date}>{formattedDate}</time>
      </div>

      {/* Content */}
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.excerpt}>{item.excerpt}</p>

      {/* Read more */}
      <button className={styles.readMore}>
        <span>Čítať viac</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>

      {/* Decorative glow line */}
      <div className={styles.glowLine} />
    </motion.article>
  );
}
