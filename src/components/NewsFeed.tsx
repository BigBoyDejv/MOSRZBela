import NewsCard from './NewsCard';
import styles from './NewsFeed.module.css';
import { Announcement } from '@/lib/types';

interface NewsFeedProps {
  announcements: Announcement[];
}

export default function NewsFeed({ announcements }: NewsFeedProps) {
  return (
    <section id="oznamy" className={styles.section}>
      {/* Background image overlay */}
      <div className={styles.bgImage} />
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Najnovšie aktuality</span>
          <h2 className={styles.title}>Aktuálne informácie z revíru</h2>
          <p className={styles.subtitle}>
            Dôležité oznamy, termíny brigád a novinky od vody
          </p>
        </div>

        {announcements.length > 0 ? (
          <div className={styles.grid}>
            {announcements.map((item, index) => (
              <NewsCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🐟</span>
            <p>Momentálne nie sú k dispozícii žiadne nové oznamy.</p>
            <p className={styles.emptyHint}>Navštívte nás opäť neskôr.</p>
          </div>
        )}
      </div>
    </section>
  );
}
