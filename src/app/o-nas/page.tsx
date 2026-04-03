'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './About.module.css';
import { useAuth } from '@/context/AuthContext';
import { useEditor } from '@/context/EditorContext';

export default function AboutPage() {
  const { user } = useAuth();
  const { openEditor } = useEditor();
  const [content, setContent] = useState({
    title: 'O nás',
    subtitle: 'Bohatá história a rybárska tradícia v srdci Spiša',
    info: 'Miestna organizácia Slovenského rybárskeho zväzu v Spišskej Belej je dôležitým pilierom...',
    historyTitle: 'História'
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from('site_content').select('*').in('id', ['o-nas-info', 'o-nas-subtitle']);
    if (data) {
      const info = data.find(c => c.id === 'o-nas-info')?.text;
      const sub = data.find(c => c.id === 'o-nas-subtitle')?.text;
      setContent(prev => ({
        ...prev,
        info: info || prev.info,
        subtitle: sub || prev.subtitle
      }));
    }
  };

  const handleEdit = (id: string, currentText: string) => {
    openEditor({
      type: 'content',
      id: id,
      initialData: { text: currentText }
    });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.overlay} />
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.sectionHeader} style={{ justifyContent: 'center', gap: '1rem', border: 'none' }}>
            <h1 className={styles.title}>{content.title}</h1>
            {user && (
              <button className={styles.adminEditBtn} onClick={() => handleEdit('o-nas-title', content.title)} style={{ position: 'absolute', right: -40, top: 10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/></svg>
              </button>
            )}
          </div>
          <p className={styles.subtitle}>{content.subtitle}</p>
          {user && (
            <button className={styles.adminEditBtn} onClick={() => handleEdit('o-nas-subtitle', content.subtitle)} style={{ margin: '0.5rem auto' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/></svg>
            </button>
          )}
        </motion.div>
      </header>

      <section className={styles.container}>
        <div className={styles.grid}>
          {/* Main info */}
          <div className={styles.mainInfo}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Naša Organizácia</h2>
              {user && (
                <button className={styles.adminEditBtn} onClick={() => handleEdit('o-nas-info', content.info)} title="Upraviť informácie">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/></svg>
                </button>
              )}
            </div>
            <div className={styles.text}>
              <p>Miestna organizácia Slovenského rybárskeho zväzu v Spišskej Belej je neziskovým občianskym združením, ktorého poslaním je hospodárenie v rybárskych revíroch, ochrana životného prostredia a rozvoj rybárskeho športu pod Belianskymi Tatrami.</p>
              
              <h3 className={styles.subTitle}>Vedenie organizácie</h3>
              <ul className={styles.boardList}>
                <li><strong>Predseda:</strong> Patrik Kaňuk</li>
                <li><strong>Podpredseda:</strong> Vladimír Fudaly</li>
                <li><strong>Tajomník:</strong> Ing. Jakub Lenkavský</li>
                <li><strong>Hospodár:</strong> Rudolf Frindt</li>
              </ul>

              <h3 className={styles.subTitle}>Členovia výboru</h3>
              <ul className={styles.boardList}>
                <li>Jaroslav Orenčák, Stanislav Bekeš, Miloš Jacenko</li>
              </ul>

              <h3 className={styles.subTitle}>Kontrolná komisia</h3>
              <ul className={styles.boardList}>
                <li>Ladislav Smrek, Jozef Lorenčík, Jozef Šterbák</li>
              </ul>

              <p className={styles.slogan}>Petrov zdar!</p>
            </div>
          </div>

          {/* History */}
          <div className={styles.historyCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>História</h2>
            </div>
            <div className={styles.timeline}>
              <div className={styles.item}>
                <span className={styles.year}>1889</span>
                <p className={styles.event}><strong>Založenie:</strong> Rybársky spolok v Spišskej Belej vznikol už v roku 1889. Prvým predsedom bol Georg Koromzay a pokladníkom mestský lekár MUDr. Michal Greisiger.</p>
              </div>
              <div className={styles.item}>
                <span className={styles.year}>1890</span>
                <p className={styles.event}><strong>Prvé zarybnenie:</strong> Do obecného potoka bolo vypustených 5 000 lososov a 5 000 pstruhov.</p>
              </div>
              <div className={styles.item}>
                <span className={styles.year}>1912</span>
                <p className={styles.event}><strong>Stanovy:</strong> Boli spísané prvé zachované stanovy spolku, ktoré určovali spôsoby lovu a ochranu rýb.</p>
              </div>
              <div className={styles.item}>
                <span className={styles.year}>1926</span>
                <p className={styles.event}><strong>Názov:</strong> Založenie "Zväzu rybárskych spolkov" v Bratislave a oficiálne prijatie názvu "Rybársky spolok Spišská Belá".</p>
              </div>
              <div className={styles.item}>
                <span className={styles.year}>1960</span>
                <p className={styles.event}><strong>Zlúčenie:</strong> V rámci reorganizácie okresov došlo k 12-ročnému zlúčeniu s rybárskou organizáciou Stará Ľubovňa.</p>
              </div>
              <div className={styles.item}>
                <span className={styles.year}>1973</span>
                <p className={styles.event}><strong>Samostatnosť:</strong> Obnovenie samostatnej Miestnej organizácie SRZ Spišská Belá pod vedením MVDr. Vladimíra Ďuriša.</p>
              </div>
              <div className={styles.item}>
                <span className={styles.year}>1980</span>
                <p className={styles.event}><strong>Rozkvet:</strong> Otvorenie lovného rybníka a dosiahnutie historicky najvyššej členskej základne (169 členov).</p>
              </div>
              <div className={styles.item}>
                <span className={styles.year}>Dnes</span>
                <p className={styles.event}>Pokračujeme v tradícii ochrany vôd pod Belianskymi Tatrami pre stovky našich členov.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { motion } from 'framer-motion';
