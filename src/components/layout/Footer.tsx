import Link from 'next/link';
import { Globe, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#e0e0e0] py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[#6b6b6b] tracking-widest">
          © {new Date().getFullYear()} — Rishika Miranda. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="https://kyrah.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
            aria-label="Website"
          >
            <Globe size={18} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/rishika-miranda-163260329/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </Link>
          <Link
            href="https://www.instagram.com/rishikamiranda/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}