import { useAuth } from '@/context/AuthContext';
import { useEditor } from '@/context/EditorContext';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Announcement } from '@/lib/types';
import styles from './NewsCard.module.css';

interface NewsProps {
  item: Announcement & { author_name?: string; tags?: string[]; importance?: string };
  index: number;
}

export default function NewsCard({ item, index }: NewsProps) {
  const { user } = useAuth();
  const { openEditor } = useEditor();

  const handleEdit = () => {
    openEditor({
      type: 'news',
      id: item.id,
      initialData: item
    });
  };

  const handleDelete = async () => {
    if (confirm('Naozaj chcete zmazať tento oznam?')) {
      const { error } = await supabase.from('announcements').delete().eq('id', item.id);
      if (!error) window.location.reload();
    }
  };

  const getTimeSince = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'práve teraz';
    if (hours < 24) return `pred ${hours} h`;
    return `pred ${Math.floor(hours / 24)} dňami`;
  };

  return (
    <motion.article
      className={`${styles.card} ${item.importance === 'urgent' ? styles.urgent : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top row: author + time + actions */}
      <div className={styles.topRow}>
        <div className={styles.meta}>
          <div className={styles.authorIcon}>{item.author_name?.charAt(0) || 'M'}</div>
          <div className={styles.metaText}>
            <span className={styles.author}>{item.author_name || 'MO SRZ Spišská Belá'}</span>
            <span className={styles.time}>{getTimeSince(item.created_at)}</span>
          </div>
        </div>
        
        {user && (
          <div className={styles.adminActions}>
            <button className={styles.adminEdit} onClick={handleEdit} title="Upraviť">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/></svg>
            </button>
            <button className={styles.adminDelete} onClick={handleDelete} title="Zmazať">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0-2 14H7L5 6m12 0V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2"/></svg>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.excerpt}>{item.excerpt}</p>
        
        {/* Tags */}
        <div className={styles.tags}>
          <span className={`${styles.importanceTag} ${styles[item.importance || 'normal']}`}>
            {item.importance === 'urgent' ? 'Naliehavé' : item.importance === 'important' ? 'Dôležité' : 'Bežné'}
          </span>
          {item.tags?.map((tag: string) => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      </div>

      {/* Interaction Footer */}
      <footer className={styles.footer}>
        <button className={styles.actionBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>Komentovať</span>
        </button>
        <button className={styles.actionBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          <span>Zdieľať</span>
        </button>
      </footer>

      {/* Decorative glow line */}
      <div className={styles.glowLine} />
    </motion.article>
  );
}
