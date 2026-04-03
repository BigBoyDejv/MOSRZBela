import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Wave divider */}
      <div className={styles.waveDivider}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <div className={styles.logoWrapper}>
                <img src="/images/logo.jpg" alt="Logo MO SRZ" className={styles.footerLogoImg} />
              </div>
              <div>
                <h3 className={styles.brandName}>MO SRZ</h3>
                <p className={styles.brandSub}>Spišská Belá</p>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Miestna organizácia Slovenského rybárskeho zväzu v Spišskej Belej. 
              Združujeme rybárov a milovníkov prírody v našom regióne.
            </p>
          </div>

          {/* Links */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Navigácia</h4>
            <a href="/" className={styles.footerLink}>Domov</a>
            <a href="/aktuality" className={styles.footerLink}>Aktuality</a>
            <a href="/o-nas" className={styles.footerLink}>O nás</a>
            <a href="/povolenky" className={styles.footerLink}>Povolenky</a>
          </div>

          {/* Contact */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Kontakt</h4>
            <p className={styles.contactLine}>
              <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Spišská Belá, 059 01
            </p>
            <p className={styles.contactLine}>
              <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              info@rybkyspiskabela.sk
            </p>
            <p className={styles.contactLine}>
              <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +421 9xx xxx xxx
            </p>
          </div>

          {/* Social */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Sociálne siete</h4>
            <div className={styles.socialRow}>
              <a href="https://www.facebook.com/profile.php?id=100064209120182" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p>© 2026 MO SRZ Spišská Belá. Všetky práva vyhradené.</p>
          <p className={styles.motto}>Petrov Zdar!</p>
        </div>
      </div>
    </footer>
  );
}
