'use client';
import { motion } from 'framer-motion';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  return (
    <section id="kontakt" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.badge}>Kontakt</span>
          <h2 className={styles.title}>Navštívte nás</h2>
          <p className={styles.subtitle}>
            Sídlime v krásnom prostredí pod Belianskymi Tatrami
          </p>
        </motion.div>

        <div className={styles.grid}>
          {/* Info Cards */}
          <motion.div
            className={styles.infoCards}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <div>
                <h4 className={styles.infoTitle}>Adresa</h4>
                <p className={styles.infoText}>Spišská Belá, 059 01</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <div>
                <h4 className={styles.infoTitle}>E-mail</h4>
                <p className={styles.infoText}>info@rybkyspiskabela.sk</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <div>
                <h4 className={styles.infoTitle}>Telefón</h4>
                <p className={styles.infoText}>+421 9xx xxx xxx</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </span>
              <div>
                <h4 className={styles.infoTitle}>Úradné hodiny</h4>
                <p className={styles.infoText}>Po – Pi: 8:00 – 16:00</p>
              </div>
            </div>
          </motion.div>

          {/* Map placeholder with glass effect */}
          <motion.div
            className={styles.mapCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className={styles.mapInner}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42000!2d20.45!3d49.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473e3f5b2f8e42ab%3A0x400f7d1c6978e10!2sSpi%C5%A1sk%C3%A1%20Bel%C3%A1!5e0!3m2!1ssk!2ssk!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa - Spišská Belá"
              />
            </div>
            <p className={styles.mapCaption}>Belianske rybníky, Spišská Belá</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
