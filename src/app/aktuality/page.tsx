import { supabase } from '@/lib/supabase';
import NewsFeed from '@/components/NewsFeed';
import styles from './Aktuality.module.css';

async function getNews() {
  const { data } = await supabase
    .from('announcements')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });
  return data || [];
}

async function getDates() {
  const { data } = await supabase
    .from('important_dates')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

export default async function NewsPage() {
  const [announcements, dates] = await Promise.all([getNews(), getDates()]);

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
              {dates.map((date, i) => (
                <div key={i} className={styles.termItem}>
                  <span className={styles.termDate}>{date.date_label}</span>
                  <p className={styles.termText}>{date.event_description}</p>
                </div>
              ))}
              {dates.length === 0 && <p className={styles.infoText}>Aktuálne nie sú k dispozícii žiadne termíny.</p>}
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
