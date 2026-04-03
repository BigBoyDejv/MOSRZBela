'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './Pokladna.module.css';

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    company: '',
    taxId: '',
    dic: '',
    address: '',
    addressExtra: '',
    city: '',
    zip: '',
    country: 'Slovensko',
    note: '',
    gdpr: false,
    terms: false,
  });

  const [saving, setSaving] = useState(false);

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
        nextStep();
        return;
    }

    if (!formData.gdpr || !formData.terms) {
      alert('Prosím potvrďte súhlas s podmienkami a spracovaním údajov.');
      return;
    }

    setSaving(true);
    const orderId = 'RYB-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    
    setTimeout(() => {
        sessionStorage.setItem('last_order', JSON.stringify({
            orderId,
            total,
            items: cart,
            customer: formData
        }));
        clearCart();
        router.push(`/obchod/uspech`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Košík je prázdny</h2>
        <button onClick={() => router.push('/obchod')} className={styles.backBtn}>Späť do obchodu</button>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <header className={styles.header}>
        <div className={styles.progress}>
            <div className={`${styles.dot} ${step >= 1 ? styles.activeDot : ''}`}>1</div>
            <div className={styles.line}></div>
            <div className={`${styles.dot} ${step >= 2 ? styles.activeDot : ''}`}>2</div>
        </div>
        <h1 className={styles.title}>{step === 1 ? 'Údaje objednávky' : 'Skontrolujte si údaje'}</h1>
      </header>

      <form className={styles.container} onSubmit={handleSubmit}>
        {step === 1 ? (
          <div className={styles.formContent}>
            {/* Osobné údaje */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Osobné údaje</h2>
              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Meno *</label>
                  <input type="text" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div className={styles.group}>
                  <label>Priezvisko *</label>
                  <input type="text" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <div className={styles.group}>
                  <label>Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className={styles.group}>
                  <label>Telefón</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+421" />
                </div>
              </div>
            </section>

            {/* Fakturačné údaje */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Fakturačná adresa</h2>
              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Ulica a číslo *</label>
                  <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className={styles.group}>
                  <label>Doplnok adresy</label>
                  <input type="text" value={formData.addressExtra} onChange={(e) => setFormData({...formData, addressExtra: e.target.value})} />
                </div>
                <div className={styles.group}>
                  <label>Mesto *</label>
                  <input type="text" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
                <div className={styles.group}>
                  <label>PSČ *</label>
                  <input type="text" required value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} />
                </div>
              </div>

              {/* Firemné údaje */}
              <div className={styles.companyToggle}>
                 <h3 className={styles.subTitle}>Firemné údaje (voliteľné)</h3>
                 <div className={styles.grid}>
                    <div className={styles.group}>
                        <label>Názov firmy</label>
                        <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                    </div>
                    <div className={styles.group}>
                        <label>IČO</label>
                        <input type="text" value={formData.taxId} onChange={(e) => setFormData({...formData, taxId: e.target.value})} />
                    </div>
                 </div>
              </div>
            </section>

            {/* Doprava */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Spôsob doručenia</h2>
              <div className={styles.method}>
                 <div className={styles.methodInfo}>
                    <strong>Elektronicky / Osobne</strong>
                    <span>Zadarmo</span>
                 </div>
              </div>
            </section>

            {/* Poznámka */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Poznámka</h2>
              <textarea 
                className={styles.textarea}
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                placeholder="Máte nejakú požiadavku k objednávke?"
              />
            </section>
          </div>
        ) : (
          <div className={styles.formContent}>
            <section className={styles.section}>
               <h2 className={styles.sectionTitle}>Súhrn údajov</h2>
               <div className={styles.reviewGrid}>
                  <div className={styles.reviewItem}>
                    <label>Meno a email:</label>
                    <p>{formData.firstName} {formData.lastName}, {formData.email}</p>
                  </div>
                  <div className={styles.reviewItem}>
                    <label>Adresa:</label>
                    <p>{formData.address}, {formData.zip} {formData.city}</p>
                  </div>
                  {formData.company && (
                    <div className={styles.reviewItem}>
                        <label>Firma:</label>
                        <p>{formData.company} (IČO: {formData.taxId})</p>
                    </div>
                  )}
               </div>
            </section>

            <section className={styles.section}>
               <h2 className={styles.sectionTitle}>Dôležité súhlasy</h2>
               <div className={styles.checkboxes}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" required checked={formData.gdpr} onChange={(e) => setFormData({...formData, gdpr: e.target.checked})} />
                    <span>Súhlasím so <a href="#">spracovaním údajov</a> predmetom GDPR.</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" required checked={formData.terms} onChange={(e) => setFormData({...formData, terms: e.target.checked})} />
                    <span>Súhlasím s <a href="#">obchodnými podmienkami</a> MO SRZ.</span>
                  </label>
               </div>
            </section>
            
            <button type="button" onClick={prevStep} className={styles.backToEdit}>
              ← Späť na editáciu údajov
            </button>
          </div>
        )}

        <aside className={styles.summary}>
          <h3>Vaša objednávka</h3>
          <div className={styles.cartMini}>
              {cart.map(item => (
                  <div key={item.id} className={styles.miniItem}>
                      <span>{item.name} x {item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} €</span>
                  </div>
              ))}
          </div>
          <div className={styles.totalRow}>
            <span>Celkom:</span>
            <span>{total.toFixed(2)} €</span>
          </div>
          <button type="submit" className={styles.finishBtn} disabled={saving}>
            {step === 1 ? 'Pokračovať na zhrnutie' : (saving ? 'Odosielam...' : 'Zaplatiť bankovým prevodom')}
          </button>
        </aside>
      </form>
    </div>
  );
}
