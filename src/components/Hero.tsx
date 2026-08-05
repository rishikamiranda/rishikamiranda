'use client';

import { useState, useEffect } from 'react';
import { LinkedinIcon, InstagramIcon } from '@/components/icons';

interface HeroProps {
  images: string[];
  title: string;
  subtitle: string;
}

export default function Hero({ images, title, subtitle }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${image}')`,
              opacity: index === currentIndex ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen px-4 sm:px-8 md:px-16 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto w-full">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16">
            <div className="flex flex-col justify-end">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.1] tracking-tight">
                {title}
              </h1>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-sm md:text-base text-white/80 font-light leading-relaxed max-w-lg">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Divider + Social Icons */}
          <div className="mt-12 pt-6 border-t border-white/20">
            <div className="flex justify-end">
              <div className="flex gap-4 sm:gap-6">
                <a
                  href="https://kyrah.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors flex items-center"
                  aria-label="Kyrah Studio"
                >
                  <img
                    src="/kyrahlogo.png"
                    alt="Kyrah Studio"
                    className="w-5 h-auto object-contain"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/rishika-miranda-163260329/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={20} color="currentColor" />
                </a>
                <a
                  href="https://www.instagram.com/rishikamiranda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={20} color="currentColor" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}