'use client';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import WaterBodiesSection from '@/components/WaterBodiesSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div className="landing-page-wrapper">
      {/* 1. Cinematic Parallax Hero */}
      <Hero />

      {/* 2. Premium About & Stats Section */}
      <AboutSection />

      {/* 3. Visual Water Bodies Showcase */}
      <WaterBodiesSection />

      {/* 4. Contact & Interactive Map Section */}
      <ContactSection />
    </div>
  );
}
