'use client';

import React from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { motion } from 'framer-motion';

const GlobalLoading = () => {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
      >
        {/* Animated Background Glow */}
        <div 
          className="absolute inset-0 blur-[100px] rounded-full animate-pulse -z-10" 
          style={{ backgroundColor: 'rgba(202, 138, 4, 0.15)' }}
        />
        
        <DotLottiePlayer
          src="/images/Fishing.lottie"
          autoplay
          loop
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-12 text-center px-6"
      >
        <h2 
          className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase"
          style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}
        >
          Nahadzujeme udice
        </h2>
        <div 
          className="mt-4 h-[2px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#CA8A04] to-transparent opacity-50"
        />
        <p 
          className="mt-4 text-sm md:text-base font-medium opacity-60 uppercase tracking-[0.3em]"
          style={{ color: 'var(--text-white)' }}
        >
          Pripravujeme web pre váš úlovok
        </p>
      </motion.div>

      {/* Subtle Bottom Accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }}
      />
    </div>
  );
};

export default GlobalLoading;
