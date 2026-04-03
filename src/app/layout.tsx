import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { EditorProvider } from '@/context/EditorContext';
import UniversalEditor from '@/components/UniversalEditor';

export const metadata: Metadata = {
  title: 'MO SRZ Spišská Belá | Rybolov v srdci Tatier',
  description:
    'Oficiálny portál MO SRZ Spišská Belá. Aktuálne oznamy, povolenia na rybolov a informácie o revíroch pod Tatrami.',
};

import { CartProvider } from '@/context/CartContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <AuthProvider>
          <CartProvider>
            <EditorProvider>
              <Navbar />
              <main style={{ minHeight: '100vh' }}>{children}</main>
              <Footer />
              <UniversalEditor />
            </EditorProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
