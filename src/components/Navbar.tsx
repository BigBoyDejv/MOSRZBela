'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Domov', href: '/' },
  { label: 'Aktuality', href: '/aktuality' },
  { label: 'O nás', href: '/o-nas' },
  { label: 'Galéria', href: '/galeria' },
  { label: 'Kontakt', href: '/kontakty' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <img 
              src="/images/logo.jpg" 
              alt="MO SRZ Spišská Belá" 
              className={styles.officialLogo} 
            />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>MO SRZ</span>
            <span className={styles.logoSub}>Spišská Belá</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
          <a href="/povolenky" className={styles.ctaButton}>
            Kúpiť Povolenku
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="/povolenky" className={styles.ctaButton} onClick={() => setMobileOpen(false)}>
              Kúpiť Povolenku
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
