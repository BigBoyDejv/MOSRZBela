'use client';
import { useEditor } from '@/context/EditorContext';
import styles from './UniversalEditor.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { uploadToCloudinary } from '@/lib/cloudinary';

export default function UniversalEditor() {
  const { activeEditor, closeEditor, saveData, isSaving } = useEditor();
  const [formData, setFormData] = useState<any>({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (activeEditor) {
      setFormData(activeEditor.initialData || {});
    }
  }, [activeEditor]);

  if (!activeEditor) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const field = activeEditor?.type === 'album' ? 'cover_image_url' : 'image_url';

    try {
      setIsUploading(true);
      const url = await uploadToCloudinary(file);
      setFormData((prev: any) => ({ ...prev, [field]: url }));
      setIsUploading(false);
    } catch (err) {
      alert('Chyba pri nahrávaní obrázka: ' + err);
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // Exclude tag_input from the payload as it's not a valid column in Supabase
    const { tag_input, ...dataToSave } = formData;
    await saveData(dataToSave);
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
            <h2>Upraviť {activeEditor.type === 'news' ? 'aktualitu' : activeEditor.type === 'date' ? 'termín' : activeEditor.type === 'album' ? 'album' : 'obsah'}</h2>
            <button className={styles.closeBtn} onClick={closeEditor}>✕</button>
          </header>

          <form onSubmit={handleSave} className={styles.form}>
            {activeEditor.type === 'news' && (
              <>
                <div className={styles.inputGroup}>
                  <label>Titulok</label>
                  <input name="title" value={formData.title || ''} onChange={handleChange} required />
                </div>
                
                <div className={styles.imageSelector}>
                  <label>Obrázok aktuality</label>
                  <div className={styles.imageConfig}>
                    {formData.image_url && (
                      <img src={formData.image_url} alt="Náhľad" className={styles.preview} />
                    )}
                    <div className={styles.uploadBox}>
                      <input 
                        type="file" 
                        id="image_upload" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className={styles.hiddenInput} 
                      />
                      <label htmlFor="image_upload" className={styles.uploadBtn}>
                        {isUploading ? 'Nahrávam...' : formData.image_url ? 'Zmeniť obrázok' : 'Nahrať obrázok'}
                      </label>
                    </div>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Krátky popis (excerpt)</label>
                  <textarea name="excerpt" value={formData.excerpt || ''} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Celý obsah</label>
                  <textarea name="content" value={formData.content || ''} onChange={handleChange} required className={styles.tall} />
                </div>
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label>Autor</label>
                    <input name="author_name" value={formData.author_name || 'MO SRZ Spišská Belá'} onChange={handleChange} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Dôležitosť</label>
                    <select name="importance" value={formData.importance || 'normal'} onChange={(e) => setFormData({...formData, importance: e.target.value})} className={styles.select}>
                      <option value="normal">Bežná</option>
                      <option value="important">Dôležitá</option>
                      <option value="urgent">Naliehavá</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {activeEditor.type === 'album' && (
              <>
                <div className={styles.inputGroup}>
                  <label>Názov albumu</label>
                  <input name="title" value={formData.title || ''} onChange={handleChange} required placeholder="napr. Brigáda na rybníku 2026" />
                </div>
                
                <div className={styles.imageSelector}>
                  <label>Titulná fotka (obálka)</label>
                  <div className={styles.imageConfig}>
                    {(formData.cover_image_url) && (
                      <img src={formData.cover_image_url} alt="Náhľad" className={styles.preview} />
                    )}
                    <div className={styles.uploadBox}>
                      <input 
                        type="file" 
                        id="cover_upload" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className={styles.hiddenInput} 
                      />
                      <label htmlFor="cover_upload" className={styles.uploadBtn}>
                        {isUploading ? 'Nahrávam...' : formData.cover_image_url ? 'Zmeniť obálku' : 'Nahrať obálku'}
                      </label>
                    </div>
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label>Kategória</label>
                    <select name="category" value={formData.category || 'Organizácia'} onChange={handleChange} className={styles.select}>
                      <option value="Organizácia">Organizácia</option>
                      <option value="Súťaž">Súťaž</option>
                      <option value="Príroda">Príroda</option>
                      <option value="Brigáda">Brigáda</option>
                    </select>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Stručný popis</label>
                  <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Pár slov o albume..." />
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

            {activeEditor.type === 'product' && (
              <>
                <div className={styles.inputGroup}>
                  <label>Názov produktu</label>
                  <input name="name" value={formData.name || ''} onChange={handleChange} required placeholder="napr. Členská známka 2026..." />
                </div>
                
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label>Cena (€)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      name="price" 
                      value={formData.price || ''} 
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} 
                      required 
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Kategória</label>
                    <select name="category" value={formData.category || 'Známky'} onChange={handleChange} className={styles.select}>
                      <option value="Známky">Známky</option>
                      <option value="Povolenky">Povolenky</option>
                      <option value="Iné">Iné</option>
                    </select>
                  </div>
                </div>

                <div className={styles.imageSelector}>
                  <label>Obrázok produktu</label>
                  <div className={styles.imageConfig}>
                    {formData.image_url && (
                      <img src={formData.image_url} alt="Náhľad" className={styles.preview} />
                    )}
                    <div className={styles.uploadBox}>
                      <input 
                        type="file" 
                        id="prod_upload" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className={styles.hiddenInput} 
                      />
                      <label htmlFor="prod_upload" className={styles.uploadBtn}>
                        {isUploading ? 'Nahrávam...' : formData.image_url ? 'Zmeniť obrázok' : 'Nahrať obrázok'}
                      </label>
                    </div>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Popis produktu</label>
                  <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Stručný popis položky..." />
                </div>
              </>
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
