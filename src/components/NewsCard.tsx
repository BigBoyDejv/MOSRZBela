import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useEditor } from '@/context/EditorContext';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Announcement } from '@/lib/types';
import styles from './NewsCard.module.css';

interface NewsProps {
  item: Announcement & { 
    author_name?: string; 
    tags?: string[]; 
    importance?: string;
    likes?: number;
    dislikes?: number;
  };
  index: number;
}

export default function NewsCard({ item, index }: NewsProps) {
  const { user } = useAuth();
  const { openEditor } = useEditor();
  
  const [likes, setLikes] = useState(item.likes || 0);
  const [dislikes, setDislikes] = useState(item.dislikes || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState({ name: '', text: '' });
  const [submitting, setSubmitting] = useState(false);
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);
  const [myComments, setMyComments] = useState<string[]>([]);
  const [expandedComments, setExpandedComments] = useState(false);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('news_comments')
      .select('*')
      .eq('announcement_id', item.id)
      .order('created_at', { ascending: false });
    if (data) setComments(data);
  };

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

  useEffect(() => {
    const reactions = JSON.parse(localStorage.getItem('news_reactions') || '{}');
    if (reactions[item.id]) setUserReaction(reactions[item.id]);

    const mine = JSON.parse(localStorage.getItem('my_comments') || '[]');
    setMyComments(mine);

    if (showComments) {
      fetchComments();
    }
  }, [showComments, item.id]);

  const updateReaction = async (type: 'like' | 'dislike' | null) => {
    const reactions = JSON.parse(localStorage.getItem('news_reactions') || '{}');
    const prev = userReaction;
    
    let nL = likes;
    let nD = dislikes;

    if (prev === 'like') nL--;
    if (prev === 'dislike') nD--;
    if (type === 'like') nL++;
    if (type === 'dislike') nD++;

    setUserReaction(type);
    setLikes(nL);
    setDislikes(nD);

    if (type) reactions[item.id] = type;
    else delete reactions[item.id];
    localStorage.setItem('news_reactions', JSON.stringify(reactions));

    await supabase.from('announcements').update({ likes: nL, dislikes: nD }).eq('id', item.id);
  };

  const handleLike = () => updateReaction(userReaction === 'like' ? null : 'like');
  const handleDislike = () => updateReaction(userReaction === 'dislike' ? null : 'dislike');

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name || !newComment.text) return;
    
    setSubmitting(true);
    const { data, error } = await supabase.from('news_comments').insert({
      announcement_id: item.id,
      author_name: newComment.name,
      content: newComment.text
    }).select();

    if (!error && data) {
      const createdId = data[0].id;
      setComments([data[0], ...comments]);
      const mine = [...myComments, createdId];
      setMyComments(mine);
      localStorage.setItem('my_comments', JSON.stringify(mine));
      setNewComment({ name: '', text: '' });
    }
    setSubmitting(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    const isMine = myComments.includes(commentId);
    if (!user && !isMine) return;
    if (!confirm('Zmazať tento komentár?')) return;
    const { error } = await supabase.from('news_comments').delete().eq('id', commentId);
    if (!error) {
      setComments(comments.filter(c => c.id !== commentId));
      if (isMine) {
        const remaining = myComments.filter(id => id !== commentId);
        setMyComments(remaining);
        localStorage.setItem('my_comments', JSON.stringify(remaining));
      }
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

  const visibleComments = expandedComments ? comments : comments.slice(0, 4);

  return (
    <motion.article
      className={`${styles.card} ${item.importance === 'urgent' ? styles.urgent : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
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

      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.excerpt}>{item.excerpt || item.content?.substring(0, 150) + '...'}</p>
        
        <div className={styles.tags}>
          <span className={`${styles.importanceTag} ${styles[item.importance || 'normal']}`}>
            {item.importance === 'urgent' ? 'Naliehavé' : item.importance === 'important' ? 'Dôležité' : 'Bežné'}
          </span>
          {item.tags?.map((tag: string) => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.group}>
            <button className={styles.actionBtn} onClick={() => setShowComments(!showComments)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>{comments.length || ''} Komentáre</span>
            </button>
        </div>
        
        <div className={styles.group}>
            <button className={`${styles.voteBtn} ${userReaction === 'like' ? styles.activeLike : ''}`} onClick={handleLike}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.thumbIcon}><path d="M7 10v12M2 10.5a2 2 0 0 1 2-2h3V22H4a2 2 0 0 1-2-2v-9.5zM7 8.5c.5-1 1-2 1-3.5 0-2.5-3-4.5-5-4.5S9 4 9 6.5s.5 4 1.5 5.5l-2.5 9h8c1 0 2-1 2.5-2.5l2-6.5c0-1-1-2-2.5-2h-3.5z"/></svg>
                <span>{likes}</span>
            </button>
            <button className={`${styles.voteBtn} ${userReaction === 'dislike' ? styles.activeDislike : ''}`} onClick={handleDislike}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.thumbIcon} style={{ transform: 'scaleY(-1)' }}><path d="M7 10v12M2 10.5a2 2 0 0 1 2-2h3V22H4a2 2 0 0 1-2-2v-9.5zM7 8.5c.5-1 1-2 1-3.5 0-2.5-3-4.5-5-4.5S9 4 9 6.5s.5 4 1.5 5.5l-2.5 9h8c1 0 2-1 2.5-2.5l2-6.5c0-1-1-2-2.5-2h-3.5z"/></svg>
                <span>{dislikes}</span>
            </button>
        </div>
      </footer>

      <AnimatePresence>
        {showComments && (
          <motion.div 
            className={styles.commentSection}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className={styles.commentList}>
                {visibleComments.map(c => (
                    <div key={c.id} className={styles.comment}>
                        <div className={styles.commentHeader}>
                            <span className={styles.cAuthor}>{c.author_name || 'Rybár'}</span>
                            <span className={styles.cTime}>{getTimeSince(c.created_at)}</span>
                            {(user || myComments.includes(c.id)) && (
                                <button className={styles.cDelete} onClick={() => handleDeleteComment(c.id)}>×</button>
                            )}
                        </div>
                        <p className={styles.cText}>{c.content}</p>
                    </div>
                ))}

                {comments.length > 4 && !expandedComments && (
                  <button className={styles.showMoreBtn} onClick={() => setExpandedComments(true)}>
                    Zobraziť ďalšie komentáre ({comments.length - 4})
                  </button>
                )}
            </div>

            <form onSubmit={handleAddComment} className={styles.commentForm}>
                <input 
                    type="text" 
                    placeholder="Vaše meno" 
                    className={styles.cInput} 
                    value={newComment.name}
                    onChange={e => setNewComment({...newComment, name: e.target.value})}
                    required
                />
                <div className={styles.formRow}>
                    <textarea 
                        placeholder="Napíšte komentár..." 
                        className={styles.cTextarea}
                        value={newComment.text}
                        onChange={e => setNewComment({...newComment, text: e.target.value})}
                        required
                    />
                    <button type="submit" className={styles.cSubmit} disabled={submitting}>
                        {submitting ? '...' : 'Odoslať'}
                    </button>
                </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.glowLine} />
    </motion.article>
  );
}
