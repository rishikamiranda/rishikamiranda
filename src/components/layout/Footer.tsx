import { WebsiteIcon, LinkedinIcon, InstagramIcon } from '@/components/icons';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#e5e0db] px-4 sm:px-8 md:px-16 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-auto">
      <div className="text-xs text-[#6b5f58] tracking-widest">
        &copy; {new Date().getFullYear()} — Rishika Miranda. All rights reserved.
      </div>
      <div className="flex items-center gap-6">
        <a
          href="https://kyrah.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6b5f58] hover:text-[#1a1a1a] transition-colors"
          aria-label="Website"
        >
          <WebsiteIcon size={16} />
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
    </footer>
  );
}