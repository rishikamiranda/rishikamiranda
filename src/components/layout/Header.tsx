'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { WebsiteIcon, LinkedinIcon, InstagramIcon } from '@/components/icons';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-8 md:px-16 py-6 border-b border-[#e5e0db] sticky top-0 bg-white/90 backdrop-blur-md z-50">
      {/* Logo */}
      <Link
        href="/"
        className="text-xl font-light tracking-tight text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors duration-200 z-50"
      >
        RishikaMiranda
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 md:gap-10 text-xs tracking-widest uppercase text-[#6b5f58] font-bold">
        <Link href="/journal" className="hover:text-[#1a1a1a] transition">
          Reflections
        </Link>
        <Link href="/lists" className="hover:text-[#1a1a1a] transition">
          Lists
        </Link>
        <Link href="/contact" className="hover:text-[#1a1a1a] transition">
          Contact
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="flex md:hidden text-[#1a1a1a] hover:text-[#6b6b6b] focus:outline-none p-2 z-50 cursor-pointer transition-colors duration-300"
        aria-label="Toggle Navigation Tray"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col justify-start pt-10 px-8 space-y-8 md:hidden transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMenu}
      >
        <span className="step-line w-8 mb-2" />
        <nav className="flex flex-col gap-y-6 text-lg tracking-widest uppercase text-[#6b5f58] font-bold">
          <Link href="/journal" className="hover:text-[#1a1a1a] transition block py-2" onClick={closeMenu}>
            Reflections
          </Link>
          <Link href="/lists" className="hover:text-[#1a1a1a] transition block py-2" onClick={closeMenu}>
            Lists
          </Link>
          <Link href="/contact" className="hover:text-[#1a1a1a] transition block py-2" onClick={closeMenu}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}