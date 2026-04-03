import styles from './Kontakty.module.css';

export default function ContactsPage() {
  const contacts = [
    { role: 'Predseda', name: 'Patrik Kaňuk', phone: '0944 163 868' },
    { role: 'Podpredseda', name: 'Vladimír Fudaly', phone: '0907 407 542' },
    { role: 'Tajomník', name: 'Ing. Jakub Lenkavský', phone: '0950 714 600' },
    { role: 'Hospodár', name: 'Rudolf Frindt', phone: '0915 901 986' },
  ];

  const committee = [
    { name: 'Jaroslav Orenčák', phone: '0944 967 533' },
    { name: 'Stanislav Bekeš', phone: '0907 099 101' },
    { name: 'Miloš Jacenko', phone: '0903 389 722' },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1 className={styles.title}>Kontakt</h1>
          <p className={styles.subtitle}>Členovia výboru a kontrolnej komisie</p>
        </div>
      </header>

      <section className={styles.container}>
        <div className={styles.grid}>
          {/* Main Info */}
          <div className={styles.infoCol}>
            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Sídlo organizácie</h2>
              <p className={styles.text}><strong>Rybársky dom</strong></p>
              <p className={styles.text}>Beliansky rybník, Spišská Belá</p>
              <p className={styles.email}>📧 mosrzbelas@gmail.com</p>
            </div>

            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Výbor a komisia</h2>
              <div className={styles.contactList}>
                {contacts.map((c, i) => (
                  <div key={i} className={styles.contactItem}>
                    <span className={styles.role}>{c.role}</span>
                    <span className={styles.name}>{c.name}</span>
                    <a href={`tel:${c.phone.replace(/ /g, '')}`} className={styles.phone}>{c.phone}</a>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Ďalší členovia výboru</h2>
              <div className={styles.contactList}>
                {committee.map((c, i) => (
                  <div key={i} className={styles.contactItem}>
                    <span className={styles.name}>{c.name}</span>
                    <a href={`tel:${c.phone.replace(/ /g, '')}`} className={styles.phone}>{c.phone}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map and Office Hours */}
          <div className={styles.mapCol}>
             <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Kde nás nájdete</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21000!2d20.45!3d49.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473e3f5b2f8e42ab%3A0x400f7d1c6978e10!2sSpi%C5%A1sk%C3%A1%20Bel%C3%A1!5e0!3m2!1ssk!2ssk!4v1"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                allowFullScreen
                loading="lazy"
                title="Mapa - Spišská Belá"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
