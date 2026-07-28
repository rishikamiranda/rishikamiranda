'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-light tracking-tight hover:text-[#6b6b6b] transition-colors"
          >
            RishikaMiranda
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/journal" className="text-xs uppercase tracking-widest text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors">
              Reflections
            </Link>
            <Link href="/lists" className="text-xs uppercase tracking-widest text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors">
              Lists
            </Link>
            <Link href="/contact" className="text-xs uppercase tracking-widest text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-6 space-y-4 border-t border-[#e0e0e0] bg-white">
          <Link
            href="/journal"
            className="block text-sm uppercase tracking-widest text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
            onClick={closeMenu}
          >
            Reflections
          </Link>
          <Link
            href="/lists"
            className="block text-sm uppercase tracking-widest text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
            onClick={closeMenu}
          >
            Lists
          </Link>
          <Link
            href="/contact"
            className="block text-sm uppercase tracking-widest text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}