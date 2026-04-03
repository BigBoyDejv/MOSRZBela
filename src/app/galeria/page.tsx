import styles from './Galeria.module.css';

export default function GalleryPage() {
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
          <h1 className={styles.title}>Fotogaléria</h1>
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
