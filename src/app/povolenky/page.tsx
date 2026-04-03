'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import SuccessState from '@/components/SuccessState';
import styles from './Permits.module.css';

export default function PermitOrder() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const dataToInsert = {
      full_name: formData.get('full_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      permit_type: formData.get('permit_type'),
      status: 'nová',
    };

    const { error: supabaseError } = await supabase
      .from('permit_orders')
      .insert([dataToInsert]);

    if (supabaseError) {
      console.error('Error submitting permit request:', supabaseError);
      setError('Nastala chyba pri odosielaní žiadosti. Skúste to prosím znova.');
      setLoading(false);
    } else {
      setSubmitted(true);
      setLoading(false);
    }
  };

  if (submitted) {
    return <SuccessState onBack={() => (window.location.href = '/')} />;
  }

  const prices = [
    { type: 'Lipňové Miestne (Adult)', price: '40 €' },
    { type: 'Lipňové Zväzové (Adult)', price: '70 €' },
    { type: 'Pstruhové Miestne (Adult)', price: '40 €' },
    { type: 'Kaprové Miestne (Adult)', price: '50 €' },
    { type: 'Kaprové Zväzové (Adult)', price: '75 €' },
    { type: 'Hlavátka (Order via SMS)', price: '80 €' },
  ];

  return (
    <main className={styles.pageWrapper}>
      {/* Background */}
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />

      <div className={styles.contentLayout}>
        {/* Info Column */}
        <motion.div 
          className={styles.infoCol}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.glowCard}>
            <h2 className={styles.titleGlow}>Cenník povolení 2026</h2>
            <div className={styles.priceList}>
              {prices.map((p, i) => (
                <div key={i} className={styles.priceItem}>
                  <span>{p.type}</span>
                  <strong>{p.price}</strong>
                </div>
              ))}
            </div>
            <p className={styles.infoNote}>
              Povolenky je možné zakúpiť aj v predajni <strong>TATRAFISH Spišská Belá</strong>.
            </p>
          </div>

          <div className={styles.idCard}>
            <h3>Dôležité upozornenie</h3>
            <p>Od sezóny 2026 je pre nákup cez e-shop vyžadovaný digitálny hash-ID kód člena.</p>
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div
          className={styles.formContainer}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.formHeader}>
            <span className={styles.badge}>🎣 Online formulár</span>
            <h1 className={styles.formTitle}>Žiadosť o povolenie</h1>
            <p className={styles.formSubtitle}>
              Vyplňte formulár a pošlite nám žiadosť. Inštrukcie k platbe sa zobrazia po odoslaní.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="full_name">Meno a priezvisko</label>
              <input
                name="full_name"
                id="full_name"
                type="text"
                required
                placeholder="Ján Rybár"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                name="email"
                id="email"
                type="email"
                required
                placeholder="jan.rybar@email.sk"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Telefónne číslo</label>
              <input
                name="phone"
                id="phone"
                type="tel"
                required
                placeholder="+421 9xx xxx xxx"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="permit_type">Typ povolenky</label>
              <select name="permit_type" id="permit_type" required>
                <option value="Lipňové Miestne">Lipňové Miestne</option>
                <option value="Kaprové Miestne">Kaprové Miestne</option>
                <option value="Pstruhové Miestne">Pstruhové Miestne</option>
                <option value="Kaprové Zväzové">Kaprové Zväzové</option>
              </select>
            </div>

            {error && (
              <motion.p
                className={styles.errorMessage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? (
                <>
                  <span className={styles.spinner} />
                  Odosielam...
                </>
              ) : (
                'Odoslať žiadosť'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
