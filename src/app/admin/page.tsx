'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import styles from './Admin.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalLoading from '@/components/common/GlobalLoading';

export default function AdminPage() {
  const { user, loading, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'news' | 'dates' | 'orders'>('news');

  const [news, setNews] = useState<any[]>([]);
  const [dates, setDates] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Form states
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    const { data: newsData } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
    const { data: datesData } = await supabase.from('important_dates').select('*').order('created_at', { ascending: false });
    const { data: ordersData } = await supabase.from('permit_orders').select('*').order('created_at', { ascending: false });
    setNews(newsData || []);
    setDates(datesData || []);
    setOrders(ordersData || []);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError('Nesprávny email alebo heslo.');
  };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm('Naozaj chcete zmazať túto položku?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) fetchData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const table = activeTab === 'news' ? 'announcements' : 'important_dates';
    
    const payload: any = {};
    formData.forEach((value, key) => { payload[key] = value; });

    let error;
    if (editingItem) {
      const { error: err } = await supabase.from(table).update(payload).eq('id', editingItem.id);
      error = err;
    } else {
      const { error: err } = await supabase.from(table).insert([payload]);
      error = err;
    }

    if (!error) {
      setShowModal(false);
      setEditingItem(null);
      fetchData();
    }
  };

  if (loading) return <GlobalLoading />;

  if (!user) {
    return (
      <div className={styles.loginWrapper}>
        <motion.div className={styles.loginCard} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <h1 className={styles.loginTitle}>Admin Prístup</h1>
          <form onSubmit={handleLogin} className={styles.form}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Heslo" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {authError && <p className={styles.error}>{authError}</p>}
            <button type="submit" className={styles.loginBtn}>Prihlásiť sa</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashHeader}>
        <div>
          <h1>Správa Rybky.sk</h1>
          <p>Prihlásený ako: {user.email}</p>
        </div>
        <button onClick={signOut} className={styles.logoutBtn}>Odhlásiť sa</button>
      </header>

      <nav className={styles.dashNav}>
        <button className={activeTab === 'news' ? styles.active : ''} onClick={() => setActiveTab('news')}>Aktuality</button>
        <button className={activeTab === 'dates' ? styles.active : ''} onClick={() => setActiveTab('dates')}>Termíny</button>
        <button className={activeTab === 'orders' ? styles.active : ''} onClick={() => setActiveTab('orders')}>Objednávky</button>
      </nav>

      <main className={styles.dashMain}>
        <div className={styles.sectionHeader}>
          <h2>{activeTab === 'news' ? 'Aktuality' : activeTab === 'dates' ? 'Dôležité termíny' : 'Objednávky povolení'}</h2>
          {activeTab !== 'orders' && (
            <button className={styles.addBtn} onClick={() => { setEditingItem(null); setShowModal(true); }}>
              + Pridať položku
            </button>
          )}
        </div>

        <div className={styles.list}>
          {activeTab === 'news' && news.map(item => (
            <div key={item.id} className={styles.listItem}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </div>
              <div className={styles.actions}>
                <button onClick={() => { setEditingItem(item); setShowModal(true); }}>Upraviť</button>
                <button className={styles.delete} onClick={() => handleDelete('announcements', item.id)}>Zmazať</button>
              </div>
            </div>
          ))}

          {activeTab === 'dates' && dates.map(item => (
            <div key={item.id} className={styles.listItem}>
              <div>
                <h3>{item.date_label}</h3>
                <p>{item.event_description}</p>
              </div>
              <div className={styles.actions}>
                <button onClick={() => { setEditingItem(item); setShowModal(true); }}>Upraviť</button>
                <button className={styles.delete} onClick={() => handleDelete('important_dates', item.id)}>Zmazať</button>
              </div>
            </div>
          ))}

          {activeTab === 'orders' && orders.map(item => (
            <div key={item.id} className={styles.listItem}>
              <div>
                <h3>{item.full_name}</h3>
                <p>{item.permit_type} | {item.phone}</p>
                <span className={styles.statusBadge}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Form */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <motion.div className={styles.modal} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className={styles.modalTitle}>{editingItem ? 'Upraviť položku' : 'Pridať položku'}</h2>
            <form onSubmit={handleSave} className={styles.modalForm}>
              {activeTab === 'news' ? (
                <>
                  <input name="title" placeholder="Titulok" defaultValue={editingItem?.title} required />
                  <textarea name="excerpt" placeholder="Krátky popis" defaultValue={editingItem?.excerpt} required />
                  <textarea name="content" placeholder="Celý text" defaultValue={editingItem?.content} required />
                </>
              ) : (
                <>
                  <input name="date_label" placeholder="Dátum (napr. 15. máj)" defaultValue={editingItem?.date_label} required />
                  <input name="event_description" placeholder="Popis udalosti" defaultValue={editingItem?.event_description} required />
                </>
              )}
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)}>Zrušiť</button>
                <button type="submit" className={styles.saveBtn}>Uložiť</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
