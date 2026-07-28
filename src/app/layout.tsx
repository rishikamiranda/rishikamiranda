import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geist = Geist({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'Rishika Miranda | Spatial Design, Architecture & Curation',
  description: 'Founder, Kyrah Design Studio | Architect & Interior Designer crafting thoughtful luxury homes in Bengaluru.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

