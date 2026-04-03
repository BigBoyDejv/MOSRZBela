'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AlbumDetails.module.css';

export default function AlbumDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [album, setAlbum] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchAlbumData();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, photos]);

  const fetchAlbumData = async () => {
    try {
      setLoading(true);
      // 1. Fetch Album Info
      const { data: albumData, error: albumErr } = await supabase
        .from('gallery_albums')
        .select('*')
        .eq('id', id)
        .single();
      
      if (albumErr) throw albumErr;
      setAlbum(albumData);

      // 2. Fetch Photos
      const { data: photoData, error: photoErr } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('album_id', id)
        .order('created_at', { ascending: true });
      
      if (photoErr) throw photoErr;
      setPhotos(photoData || []);
    } catch (err) {
      console.error('Error fetching album:', err);
    } finally {
      setLoading(false);
    }
  };

  const nextPhoto = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await uploadToCloudinary(files[i]);
        // Save to Supabase
        const { error } = await supabase.from('gallery_photos').insert([{
          album_id: id,
          url: url
        }]);
        if (error) throw error;
      }
      fetchAlbumData(); // Refresh photos
    } catch (err) {
      alert('Chyba pri nahrávaní: ' + err);
    } finally {
      setIsUploading(false);
    }
  };

  const deletePhoto = async (photoId: string) => {
    if (!confirm('Naozaj chcete zmazať túto fotku?')) return;
    try {
      const { error } = await supabase.from('gallery_photos').delete().eq('id', photoId);
      if (error) throw error;
      setPhotos(photos.filter(p => p.id !== photoId));
    } catch (err) {
      alert('Chyba: ' + err);
    }
  };

  if (loading) return <div className={styles.loading}>Načítavam album...</div>;
  if (!album) return <div className={styles.error}>Album nebol nájdený.</div>;

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <button onClick={() => router.push('/galeria')} className={styles.backBtn}>
          ← Späť do galérie
        </button>
        <h1 className={styles.title}>{album.title}</h1>
        <p className={styles.desc}>{album.description}</p>
        <span className={styles.category}>{album.category}</span>
      </header>

      {/* Grid */}
      <section className={styles.content}>
        <div className={styles.photoGrid}>
          {/* Admin Upload Card */}
          {user && (
            <div className={styles.uploadCard}>
              <input 
                type="file" 
                multiple 
                id="photo-upload" 
                onChange={handleUpload} 
                className={styles.hiddenInput} 
                accept="image/*"
              />
              <label htmlFor="photo-upload" className={styles.uploadLabel}>
                {isUploading ? (
                  <div className={styles.loader}></div>
                ) : (
                  <>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5v14"/></svg>
                    <span>Pridať fotky</span>
                  </>
                )}
              </label>
            </div>
          )}

          {photos.map((photo, index) => (
            <div key={photo.id} className={styles.photoCard} onClick={() => setSelectedIndex(index)}>
              <img 
                src={photo.url} 
                alt="Foto" 
              />
              {user && (
                <button 
                  className={styles.deleteBtn} 
                  onClick={(e) => { e.stopPropagation(); deletePhoto(photo.id); }}
                  title="Zmazať fotku"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox / Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Arrows */}
            {photos.length > 1 && (
              <>
                <button 
                  className={styles.arrowLeft} 
                  onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button 
                  className={styles.arrowRight} 
                  onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </>
            )}

            <motion.img 
              key={photos[selectedIndex].url}
              src={photos[selectedIndex].url} 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />

            <div className={styles.photoCounter}>
              {selectedIndex + 1} / {photos.length}
            </div>

            <button className={styles.closeBtn} onClick={() => setSelectedIndex(null)}>Zatvoriť</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
