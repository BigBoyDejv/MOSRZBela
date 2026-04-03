'use client';
import styles from './Galeria.module.css';
import { useAuth } from '@/context/AuthContext';

export default function GalleryPage() {
  const { user } = useAuth();
  
  const handleAdd = () => {
    window.location.href = '/admin?tab=gallery';
  };

  const albums = [
    { title: 'Preteky na rybníku', count: 24, category: 'Competition', image: '/images/nature-lake.png' },
    { title: '125. výročie MO', count: 48, category: 'Celebration', image: '/images/belarybnik.jpg' },
    { title: 'Belakapor 2025', count: 16, category: 'Trophy', image: '/images/hero-tatry.png' },
    { title: 'Zarybňovanie pstruhom', count: 12, category: 'Nature', image: '/images/nature-lake.png' },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div className={styles.headerRow}>
            <h1 className={styles.title}>Fotogaléria</h1>
            {user && (
              <button className={styles.adminAddBtn} onClick={handleAdd} title="Pridať album">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14"/></svg>
              </button>
            )}
          </div>
          <p className={styles.subtitle}>Momenty z našich revírov a podujatí</p>
        </div>
      </header>

      <section className={styles.container}>
        <div className={styles.grid}>
          {albums.map((album, i) => (
            <div key={i} className={styles.albumCard}>
              <div className={styles.imageWrapper}>
                <img src={album.image} alt={album.title} className={styles.image} />
                <div className={styles.badge}>{album.count} fotiek</div>
              </div>
              <div className={styles.info}>
                <span className={styles.category}>{album.category}</span>
                <h3 className={styles.albumTitle}>{album.title}</h3>
                <button className={styles.viewBtn}>Otvoriť album</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
