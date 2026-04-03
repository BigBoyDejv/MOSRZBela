'use client';
import styles from './Galeria.module.css';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useEditor } from '@/context/EditorContext';

export default function GalleryPage() {
  const { user } = useAuth();
  const { openEditor } = useEditor();
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_albums')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAlbums(data || []);
    } catch (err) {
      console.error('Error fetching albums:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAdd = () => {
    openEditor({
        type: 'album',
        initialData: {
            title: '',
            category: 'Organizácia',
            description: '',
            cover_image_url: ''
        }
    });
  };

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
        {loading ? (
             <div className={styles.loading}>Načítavam albumy...</div>
        ) : (
          <div className={styles.grid}>
            {/* Add Card for Admin */}
            {user && (
              <div className={styles.addCard} onClick={handleAdd}>
                <div className={styles.addContent}>
                  <div className={styles.plusIcon}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14"/></svg>
                  </div>
                  <span>Vytvoriť nový album</span>
                </div>
              </div>
            )}

            {albums.map((album, i) => (
              <Link key={album.id || i} href={`/galeria/${album.id}`} className={styles.albumCard}>
                <div className={styles.imageWrapper}>
                  <img src={album.cover_image_url || '/images/nature-bg.png'} alt={album.title} className={styles.image} />
                  <div className={styles.badge}>{album.category}</div>
                </div>
                <div className={styles.info}>
                  <span className={styles.date}>{new Date(album.created_at).toLocaleDateString('sk-SK')}</span>
                  <h3 className={styles.albumTitle}>{album.title}</h3>
                  <p className={styles.albumDesc}>{album.description}</p>
                  <span className={styles.viewBtn}>Otvoriť album</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {!loading && albums.length === 0 && !user && (
          <div className={styles.empty}>
            <p>Zatiaľ tu nie sú žiadne zverejnené albumy.</p>
          </div>
        )}
      </section>
    </div>
  );
}
