'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useEditor } from '@/context/EditorContext';
import { motion } from 'framer-motion';
import styles from './AboutSection.module.css';

const stats = [
  { value: '135+', label: 'Rokov tradície' },
  { value: '400+', label: 'Členov' },
  { value: '8', label: 'Revírov' },
  { value: '25+', label: 'km tokov' },
];

export default function AboutSection() {
  const { user } = useAuth();
  const { openEditor } = useEditor();
  const [text, setText] = useState('Miestna organizácia Slovenského rybárskeho zväzu Spišská Belá má bohatú tradíciu siahajúcu hlboko do minulosti...');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from('site_content').select('text').eq('id', 'home-about-text').single();
    if (data) setText(data.text);
  };

  const handleEdit = () => {
    openEditor({
      type: 'content',
      id: 'home-about-text',
      initialData: { text }
    });
  };

  return (
    <section id="o-nas" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Left: Text */}
          <motion.div
            className={styles.textSide}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span className={styles.badge}>O nás</span>
              {user && (
                <button 
                  onClick={handleEdit}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', opacity: 0.7 }}
                  title="Upraviť text"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/></svg>
                </button>
              )}
            </div>
            <h2 className={styles.title}>Naša História & Poslanie</h2>
            <div className={styles.desc} style={{ whiteSpace: 'pre-wrap' }}>
              {text}
            </div>

            <a href="#kontakt" className={styles.link}>
              Kontaktujte nás
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            className={styles.statsGrid}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={styles.statCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
