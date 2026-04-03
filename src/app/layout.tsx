import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { EditorProvider } from '@/context/EditorContext';
import UniversalEditor from '@/components/UniversalEditor';

export const metadata: Metadata = {
  title: 'Rybky Spišská Belá | Rybolov v srdci Tatier',
  description:
    'Portál pre rybárov v Spišskej Belej. Aktuálne oznamy, povolenia na rybolov a informácie o revíroch pod Tatoami.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <AuthProvider>
          <EditorProvider>
            <Navbar />
            <main style={{ minHeight: '100vh' }}>{children}</main>
            <Footer />
            <UniversalEditor />
          </EditorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
