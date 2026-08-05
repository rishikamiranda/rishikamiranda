import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geist = Geist({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] 
});

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

        {/* Persistent Contact Button - Fixed at 80% from top, right edge */}
        <Link
          href="/contact"
          className="fixed right-0 top-[80%] -translate-y-1/2 z-50 flex items-center gap-2 bg-white border border-[#e0e0e0] rounded-l-lg shadow-md px-4 py-3 text-sm text-[#1a1a1a] hover:bg-[#f5f5f5] hover:text-[#a67c52] hover:border-[#a67c52] transition-colors duration-300"
          aria-label="Get in touch"
        >
          <Mail className="w-4 h-4" />
          <span className="font-light tracking-wide">Get in touch</span>
        </Link>
      </body>
    </html>
  );
}