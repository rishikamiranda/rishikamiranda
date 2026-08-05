'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Measure the real header height instead of guessing with a fixed
  // padding value — py-6 + logo/icon size can render at different
  // heights depending on font loading, so we read the actual box.
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (headerRef.current) resizeObserver.observe(headerRef.current);

    window.addEventListener('resize', updateHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="w-full flex items-center justify-between px-4 sm:px-8 md:px-16 py-6 border-b border-[#e5e0db] sticky top-0 bg-white/90 backdrop-blur-md z-50"
      >
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
            Journal
          </Link>
          <Link href="/lists" className="hover:text-[#1a1a1a] transition">
            Resources
          </Link>
          <Link href="/contact" className="hover:text-[#1a1a1a] transition">
            Contact
          </Link>
          <Link href="/about" className="hover:text-[#1a1a1a] transition">
            About
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
      </header>

      {/* Mobile Menu Overlay
          - Rendered as a sibling of <header>, not a child, so the header's
            backdrop-blur never creates a new containing block for this
            fixed element (which was causing the transparency bug).
          - Uses `hidden` when closed (not opacity/visibility) so the panel
            is fully removed from the render/paint path on mount — this
            guarantees it can never appear open by default, even during
            hydration or a stale-cache load.
          - `top` is set to the *measured* header height, not a guessed
            padding value, so the first nav item is never hidden behind
            the sticky header. */}
      <div
        className={`fixed inset-x-0 bottom-0 isolate bg-white z-40 flex-col px-8 pt-10 space-y-8 md:hidden overflow-y-auto ${
          isOpen ? 'flex' : 'hidden'
        }`}
        style={{ top: headerHeight, backgroundColor: '#ffffff' }}
        onClick={closeMenu}
      >
        <span className="step-line w-8 mb-2" />
        <nav className="flex flex-col gap-y-6 text-lg tracking-widest uppercase text-[#6b5f58] font-bold">
          <Link href="/journal" className="hover:text-[#1a1a1a] transition block py-2" onClick={closeMenu}>
            Journal
          </Link>
          <Link href="/lists" className="hover:text-[#1a1a1a] transition block py-2" onClick={closeMenu}>
            Resources
          </Link>
          <Link href="/contact" className="hover:text-[#1a1a1a] transition block py-2" onClick={closeMenu}>
            Contact
          </Link>
          <Link href="/about" className="hover:text-[#1a1a1a] transition block py-2" onClick={closeMenu}>
            About
          </Link>
        </nav>
      </div>
    </>
  );
}