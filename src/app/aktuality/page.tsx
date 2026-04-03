import { supabase } from '@/lib/supabase';
import NewsFeed from '@/components/NewsFeed';
import styles from './Aktuality.module.css';

async function getAnnouncements() {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }

  return data || [];
}

export default async function NewsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1 className={styles.title}>Aktuality</h1>
          <p className={styles.subtitle}>Najnovšie informácie pre členov MO SRZ Spišská Belá</p>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.newsGrid}>
          <div className={styles.mainNews}>
            <NewsFeed announcements={announcements} />
          </div>
          
          <aside className={styles.sidebar}>
            <div className={styles.termCard}>
              <h3 className={styles.sidebarTitle}>Dôležité termíny 2026</h3>
              <div className={styles.termItem}>
                <span className={styles.termDate}>31. marec</span>
                <p className={styles.termText}>Termín na zaplatenie členských príspevkov.</p>
              </div>
              <div className={styles.termItem}>
                <span className={styles.termDate}>28. marec</span>
                <p className={styles.termText}>Prvá brigáda sezóny (8:00 pri Rybárskom dome).</p>
              </div>
              <div className={styles.termItem}>
                <span className={styles.termDate}>1. apríl</span>
                <p className={styles.termText}>Otvorenie pstruhovej sezóny.</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.sidebarTitle}>Upozornenie</h3>
              <p className={styles.infoText}>
                Nezabudnite na povinnú známku 100. výročia SRZ (5 €).
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
