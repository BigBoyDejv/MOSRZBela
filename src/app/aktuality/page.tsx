'use client';
import { supabase } from '@/lib/supabase';
import NewsFeed from '@/components/NewsFeed';
import styles from './Aktuality.module.css';
import { useState, useEffect } from 'react';
import { NewsSkeleton } from '@/components/common/Skeleton';

export default function NewsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('Všetky');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [newsRes, docRes] = await Promise.all([
      supabase.from('announcements').select('*').order('created_at', { ascending: false }),
      supabase.from('site_documents').select('*').order('category', { ascending: true })
    ]);
    setAnnouncements(newsRes.data || []);
    setDocuments(docRes.data || []);
    setLoading(false);
  };

  const filteredNews = filter === 'Všetky' 
    ? announcements 
    : announcements.filter(item => {
        const query = filter.toLowerCase();
        return (
          item.importance?.toLowerCase() === query || 
          (item.tags && item.tags.some((t: string) => t.toLowerCase() === query)) ||
          item.title?.toLowerCase().includes(query) ||
          item.content?.toLowerCase().includes(query)
        );
      });

  const tags = ['Všetky', 'Brigády', 'Oznamy', 'Preteky'];

  if (loading) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
           <div className={styles.overlay} />
           <div className={styles.content}>
             <h1 className={styles.title}>Aktuality & Oznamy</h1>
           </div>
        </header>
        <div className={styles.container}>
          <div className={styles.blogLayout}>
            <div className="flex flex-col gap-6 w-full max-w-4xl">
              <NewsSkeleton />
              <NewsSkeleton />
              <NewsSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1 className={styles.title}>Aktuality & Oznamy</h1>
          <p className={styles.subtitle}>Oficiálny informačný kanál MO SRZ Spišská Belá</p>
        </div>
      </header>
      

      <div className={styles.container}>
        <div className={styles.blogLayout}>
          {/* Main Feed */}
          <main className={styles.mainFeed}>
            <NewsFeed announcements={filteredNews} showAdminControls={true} />
          </main>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Filter */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Filtrovať podľa obsahu</h3>
              <div className={styles.tagCloud}>
                {tags.map(tag => (
                  <button 
                    key={tag} 
                    className={`${styles.tagBtn} ${filter === tag ? styles.activeTag : ''}`}
                    onClick={() => setFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Legislatíva & Dokumenty</h3>
              <div className={styles.documentList}>
                {documents.map(doc => (
                  <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer" className={styles.docLink}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span>{doc.title}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Dôležité termíny fallback (from previous version) */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Dôležité termíny</h3>
              <p className={styles.infoText}>Termíny brigád a poplatkov nájdete v príspevkoch so štítkom "important".</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
