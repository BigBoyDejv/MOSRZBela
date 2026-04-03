'use client';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Kosik.module.css';

export default function CartPage() {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Váš košík je prázdny</h2>
        <p>Vyberte si z našej ponuky známok a povolení.</p>
        <button onClick={() => router.push('/obchod')} className={styles.backBtn}>
          Späť do obchodu
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Váš Košík</h1>
      </header>

      <div className={styles.container}>
        <div className={styles.itemsList}>
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.id} 
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={styles.cartItem}
              >
                <div className={styles.itemImage}>
                   <img src={item.image || '/images/nature-bg.png'} alt={item.name} />
                </div>
                <div className={styles.itemInfo}>
                  <h3>{item.name}</h3>
                  <span className={styles.category}>{item.price.toFixed(2)} € / ks</span>
                </div>
                <div className={styles.quantity}>
                  <span>Množstvo: {item.quantity}</span>
                </div>
                <div className={styles.itemTotal}>
                  {(item.price * item.quantity).toFixed(2)} €
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeBtn}
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <aside className={styles.summary}>
          <h3>Zhrnutie objednávky</h3>
          <div className={styles.summaryRow}>
            <span>Medzisúčet:</span>
            <span>{total.toFixed(2)} €</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Doprava (Elektronicky):</span>
            <span>0.00 €</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.grandTotal}`}>
            <span>Celkom k úhrade:</span>
            <span>{total.toFixed(2)} €</span>
          </div>
          
          <Link href="/obchod/pokladna" style={{ textDecoration: 'none' }}>
            <button className={styles.checkoutBtn}>
              Prejsť k platbe
            </button>
          </Link>
          
          <button className={styles.clearBtn} onClick={clearCart}>
            Vyprázdniť košík
          </button>
        </aside>
      </div>
    </div>
  );
}
