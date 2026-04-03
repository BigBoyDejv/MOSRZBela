'use client';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import styles from './Uspech.module.css';

export default function SuccessPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const savedOrder = sessionStorage.getItem('last_order');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) return <div className={styles.loading}>Načítavam detaily objednávky...</div>;

  // Generate SEPA QR Data String (Simplified European Standard)
  const iban = 'SK5302000000001262985553';
  const name = 'SRZ MO Spisska Bela';
  const amount = order.total.toFixed(2);
  const vs = order.orderId.replace(/\D/g, ''); // Extract numbers for Variable Symbol if possible
  const message = `Objednavka ${order.orderId}`;

  // SEPA QR standard (EPC069-12)
  // BCD \n 002 \n 1 \n SCT \n BIC \n Name \n IBAN \n EUR{Amount} \n {Ref} \n {Remittance} \n {Info}
  const sepaData = `BCD\n002\n1\nSCT\n\n${name}\n${iban}\nEUR${amount}\n\n\n${message}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} skopírovaný!`);
  };

  return (
    <div className={styles.successPage}>
      <header className={styles.header}>
        <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className={styles.checkWrapper}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
        </motion.div>
        <h1 className={styles.title}>Objednávka prijatá!</h1>
        <p className={styles.subtitle}>Vaša objednávka <strong>{order.orderId}</strong> čaká na zaplatenie.</p>
      </header>

      <div className={styles.container}>
        {/* Payment QR Section */}
        <section className={styles.qrSection}>
          <div className={styles.qrInfo}>
            <h2 className={styles.sectionTitle}>Platba bankovým prevodom</h2>
            <p className={styles.qrDesc}>Naskenujte tento QR kód vo vašej bankovej aplikácii alebo zadajte údaje manuálne.</p>
            
            <div className={styles.detailsGrid}>
              <div className={styles.detail}>
                <label>Suma k úhrade:</label>
                <div className={styles.copyRow}>
                  <strong>{amount} €</strong>
                  <button onClick={() => copyToClipboard(amount, 'Suma')} className={styles.copyBtn}>📋</button>
                </div>
              </div>
              <div className={styles.detail}>
                <label>Číslo účtu (IBAN):</label>
                <div className={styles.copyRow}>
                  <strong>{iban}</strong>
                  <button onClick={() => copyToClipboard(iban, 'IBAN')} className={styles.copyBtn}>📋</button>
                </div>
              </div>
              <div className={styles.detail}>
                <label>Správa pre prijímateľa / VS:</label>
                <div className={styles.copyRow}>
                  <strong>{message}</strong>
                  <button onClick={() => copyToClipboard(message, 'Správa pre prijímateľa')} className={styles.copyBtn}>📋</button>
                </div>
              </div>
               <div className={styles.detail}>
                <label>Banka:</label>
                <strong>Všeobecná úverová banka</strong>
              </div>
            </div>
          </div>

          <div className={styles.qrCodeBox}>
            <div className={styles.qrFrame}>
              <QRCodeSVG 
                value={sepaData} 
                size={220} 
                level="M" 
                includeMargin={true}
              />
            </div>
            <span className={styles.qrLabel}>Tento kód použite pre platbu</span>
          </div>
        </section>

        {/* Order Details */}
        <section className={styles.detailsSection}>
          <h2 className={styles.sectionTitle}>Zhrnutie objednávky</h2>
          <div className={styles.itemList}>
            {order.items?.map((item: any) => (
              <div key={item.id} className={styles.item}>
                <span>{item.name} x {item.quantity}</span>
                <span>{(item.price * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
          </div>
          <div className={styles.totalRow}>
            <span>Celková suma:</span>
            <span>{amount} €</span>
          </div>
        </section>

        <p className={styles.notice}>
          Dôležité: Pokyny k platbe sme vám zaslali aj na adresu <strong>{order.customer?.email}</strong>. 
          Povolenie vám doručíme elektronicky ihneď po pripísaní platby na náš účet.
        </p>

        <div className={styles.actions}>
          <button onClick={() => window.print()} className={styles.printBtn}>
            Vytlačiť inštrukcie
          </button>
          <a href="/obchod" className={styles.homeBtn}>
            Späť do obchodu
          </a>
        </div>
      </div>
    </div>
  );
}
