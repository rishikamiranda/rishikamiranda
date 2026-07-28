'use client';

import { useState, useEffect } from 'react';

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
            className="absolute inset-0 bg-cover bg-center grayscale transition-opacity duration-1000"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-end">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.1] tracking-tight">
                {title}
              </h1>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md lg:ml-auto">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Bottom row: social icons only */}
          <div className="flex justify-end mt-12">
            <div className="flex gap-4 sm:gap-6">
              <a
                href="https://kyrah.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Website"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/rishika-miranda-163260329/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/rishikamiranda/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}