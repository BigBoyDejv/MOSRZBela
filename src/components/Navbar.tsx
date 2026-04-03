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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8c0 4.5-4.5 9-9 9-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c4.5 0 9 4.5 9 9Z" />
              <path d="M12 12c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1Z" />
              <path d="M16 12s-2-2-4-2" />
              <path d="M7 12s2-2 4-2" />
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Rybky</span>
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
