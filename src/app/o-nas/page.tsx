'use client';
import styles from './About.module.css';
import { useAuth } from '@/context/AuthContext';
import { useEditor } from '@/context/EditorContext';

export default function AboutPage() {
  const { user } = useAuth();
  const { openEditor } = useEditor();

  const handleEditInfo = () => {
    openEditor({
      type: 'content',
      id: 'o-nas-info',
      initialData: { text: 'Miestna organizácia Slovenského rybárskeho zväzu v Spišskej Belej je dôležitým pilierom...' }
    });
  };

  const handleEditHistory = () => {
    openEditor({
      type: 'content',
      id: 'o-nas-history',
      initialData: { text: 'Založenie organizácie starostom mesta Georgom Koromzaym...' }
    });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1 className={styles.title}>O nás</h1>
          <p className={styles.subtitle}>Bohatá história a rybárska tradícia v srdci Spiša</p>
        </div>
      </header>

      <section className={styles.container}>
        <div className={styles.grid}>
          {/* Main info */}
          <div className={styles.mainInfo}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Naša Organizácia</h2>
              {user && (
                <button className={styles.adminEditBtn} onClick={handleEditInfo} title="Upraviť informácie">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/></svg>
                </button>
              )}
            </div>
            <p className={styles.text}>
              Miestna organizácia Slovenského rybárskeho zväzu v Spišskej Belej je dôležitým pilierom 
              miestnej komunity rybárov a milovníkov prírody. Spravujeme viacero revírov 
              pod Belianskymi Tatrami, s hlavným zameraním na pstruhové a lipňové vody, 
              ako aj obľúbený Beliansky rybník.
            </p>
            <p className={styles.text}>
              Naším cieľom nie je len rybolov, ale predovšetkým ochrana prírody, 
              zarybňovanie a zveľaďovanie revírov, aby aj budúce generácie mohli 
              zažívať radosť z tohto ušľachtilého koníčka v krásnom prostredí našich hôr.
            </p>
          </div>

          {/* History */}
          <div className={styles.historyCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>História</h2>
              {user && (
                <button className={styles.adminEditBtn} onClick={handleEditHistory} title="Upraviť históriu">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/></svg>
                </button>
              )}
            </div>
            <div className={styles.timeline}>
              <div className={styles.item}>
                <span className={styles.year}>1889</span>
                <p className={styles.event}>Založenie organizácie starostom mesta Georgom Koromzaym.</p>
              </div>
              <div className={styles.item}>
                <span className={styles.year}>1952</span>
                <p className={styles.event}>Moderná etapa po druhej svetovej vojne a stabilizácia revírov.</p>
              </div>
              <div className={styles.item}>
                <span className={styles.year}>1968</span>
                <p className={styles.event}>Rozsiahla rekonštrukcia "Rybárskeho domu" na Belianskom rybníku.</p>
              </div>
              <div className={styles.item}>
                <span className={styles.year}>Dnes</span>
                <p className={styles.event}>Aktívna organizácia so stovkami členov a silnou tradíciou zarybňovania.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
