'use client';
import { useEditor } from '@/context/EditorContext';
import styles from './UniversalEditor.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function UniversalEditor() {
  const { activeEditor, closeEditor, saveData, isSaving } = useEditor();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (activeEditor) {
      setFormData(activeEditor.initialData || {});
    }
  }, [activeEditor]);

  if (!activeEditor) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveData(formData);
  };

  return (
    <AnimatePresence>
      <div className={styles.overlay} onClick={closeEditor}>
        <motion.div 
          className={styles.modal} 
          initial={{ opacity: 0, scale: 0.9, y: 100 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.9, y: 100 }}
          onClick={(e) => e.stopPropagation()}
        >
          <header className={styles.header}>
            <h2>Upraviť {activeEditor.type === 'news' ? 'aktualitu' : activeEditor.type === 'date' ? 'termín' : 'obsah'}</h2>
            <button className={styles.closeBtn} onClick={closeEditor}>✕</button>
          </header>

          <form onSubmit={handleSave} className={styles.form}>
            {activeEditor.type === 'news' && (
              <>
                <div className={styles.inputGroup}>
                  <label>Titulok</label>
                  <input name="title" value={formData.title || ''} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Krátky popis (excerpt)</label>
                  <textarea name="excerpt" value={formData.excerpt || ''} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Celý obsah</label>
                  <textarea name="content" value={formData.content || ''} onChange={handleChange} required className={styles.tall} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Kategória</label>
                  <input name="category" value={formData.category || ''} onChange={handleChange} />
                </div>
              </>
            )}

            {activeEditor.type === 'date' && (
              <>
                <div className={styles.inputGroup}>
                  <label>Dátum (napr. 31. marec)</label>
                  <input name="date_label" value={formData.date_label || ''} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Popis udalosti</label>
                  <textarea name="event_description" value={formData.event_description || ''} onChange={handleChange} required />
                </div>
              </>
            )}

            {activeEditor.type === 'content' && (
                <div className={styles.inputGroup}>
                  <label>Text sekcie</label>
                  <textarea name="text" value={formData.text || ''} onChange={handleChange} className={styles.tall} required />
                </div>
            )}

            <footer className={styles.footer}>
              <button type="button" className={styles.cancelBtn} onClick={closeEditor}>Zrušiť</button>
              <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                {isSaving ? 'Ukladám...' : 'Uložiť zmeny'}
              </button>
            </footer>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
