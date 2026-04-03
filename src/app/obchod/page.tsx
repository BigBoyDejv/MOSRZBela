'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Obchod.module.css';
import Link from 'next/link';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Všetko');
  const { cart, addToCart } = useCart();

  const filters = ['Všetko', 'Kaprové', 'Pstruhové', 'Lipňové'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('shop_products')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching shop:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = activeFilter === 'Všetko' 
    ? products 
    : products.filter(p => p.name.toLowerCase().includes(activeFilter.toLowerCase().replace('é', 'e')));

  return (
    <div className={styles.shopPage}>
      {/* Cinematic Hero */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className={styles.title}
          >
            Ponuka povolení 2026
          </motion.h1>
          <p className={styles.subtitle}>Vyberte si svoje povolenie na rybolov v Spišskej Belej</p>
        </div>
      </header>

      <section className={styles.container}>
        {/* Filtering Tabs */}
        <div className={styles.tabs}>
          {filters.map((filter) => (
            <button 
              key={filter} 
              className={`${styles.tab} ${activeFilter === filter ? styles.activeTab : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className={styles.grid}>
          {loading ? (
             <div className={styles.loading}>Načítavam produkty...</div>
          ) : (
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={styles.productCard}
                >
                  <div className={styles.imageBox}>
                    <img src={product.image_url || '/images/nature-bg.png'} alt={product.name} />
                  </div>
                  <div className={styles.info}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productDesc}>{product.description}</p>
                    <div className={styles.footer}>
                      <span className={styles.price}>{product.price.toFixed(2)} €</span>
                      <button 
                        className={styles.buyBtn}
                        onClick={() => addToCart(product)}
                      >
                        Pridať do košíka
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Cart Summary Floating Button (Simple concept) */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={styles.cartFloating}
          >
            <div className={styles.cartInfo}>
              <span>{cart.length} položky v košíku</span>
              <strong>Spolu: {cart.reduce((s,i) => s + (i.price * i.quantity), 0).toFixed(2)} €</strong>
            </div>
            <Link href="/obchod/kosik" style={{ textDecoration: 'none' }}>
              <button className={styles.checkoutBtn}>K objednávke</button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
