import { LinkedinIcon, InstagramIcon } from '@/components/icons';

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-[#e5e0db] px-6 sm:px-10 md:px-20 py-20 mt-auto overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/footerImage.webp')" }}
        aria-hidden="true"
      />
      
      {/* Subtle Overlay for Text Readability */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none" aria-hidden="true" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="text-xs text-[#6b5f58] tracking-widest">
          &copy; {new Date().getFullYear()} — Rishika Miranda. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://kyrah.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b5f58] hover:text-[#1a1a1a] transition-colors flex items-center"
            aria-label="Kyrah Studio"
          >
            <img
              src="/kyrahlogo.png"
              alt="Kyrah Studio"
              className="w-4 h-auto object-contain"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/rishika-miranda-163260329/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b5f58] hover:text-[#1a1a1a] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href="https://www.instagram.com/rishikamiranda/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b5f58] hover:text-[#1a1a1a] transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}