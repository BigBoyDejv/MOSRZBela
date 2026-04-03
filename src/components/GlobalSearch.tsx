'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GlobalSearch.module.css';

const staticPages = [
  { title: 'Aktuality & Oznamy', url: '/aktuality', category: 'Stránka' },
  { title: 'Rybolovné revíry', url: '/reviry', category: 'Stránka' },
  { title: 'O nás & História', url: '/o-nas', category: 'Stránka' },
  { title: 'Fotogaléria', url: '/galeria', category: 'Stránka' },
  { title: 'Kontakt & Poloha', url: '/kontakty', category: 'Stránka' },
  { title: 'Kúpiť povolenku', url: '/povolenky', category: 'Služba' },
];

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.length > 1) {
        performSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const performSearch = async () => {
    const q = query.toLowerCase();
    
    // 1. Filter static pages
    const filteredPages = staticPages.filter(p => 
      p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );

    // 2. Fetch from Supabase (Announcements)
    const { data: news } = await supabase
      .from('announcements')
      .select('id, title')
      .ilike('title', `%${q}%`)
      .limit(5);

    const formattedNews = (news || []).map(n => ({
      title: n.title,
      url: `/aktuality?id=${n.id}`,
      category: 'Aktualita'
    }));

    setResults([...filteredPages, ...formattedNews]);
    setIsOpen(true);
  };

  return (
    <div className={styles.searchWrapper} ref={searchRef}>
      <div className={styles.inputBox}>
        <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          className={styles.input}
          placeholder="Hľadať na stránke..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
        />
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {results.map((res, i) => (
              <a 
                key={i} 
                href={res.url} 
                className={styles.resultItem}
                onClick={() => { setIsOpen(false); setQuery(''); }}
              >
                <div className={styles.resIcon}>{res.category[0]}</div>
                <div className={styles.resText}>
                  <span className={styles.resCategory}>{res.category}</span>
                  <span className={styles.resTitle}>{res.title}</span>
                </div>
                <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
