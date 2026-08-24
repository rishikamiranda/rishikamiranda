import Link from 'next/link';
import Image from 'next/image';

export default function Work() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 md:py-20 w-full">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] leading-tight mt-2">
          Things I Work On
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* 01. Architecture & Interiors */}
        <div className="pt-6">
          <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
            <Image
              src="/services/interior.webp"
              alt="Architecture & Interiors"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] tracking-[0.2em] text-[#6b6b6b] font-medium">01</span>
          </div>
          <h3 className="text-xl font-light text-[#1a1a1a] mb-3 tracking-wide">Architecture &amp; Interiors</h3>
          <p className="text-[14px] text-[#4a4a4a] leading-relaxed font-light">
            Residential and commercial spaces shaped around the people who live in them and the context they belong to.
          </p>
        </div>

        {/* 02. Furniture & Product Design */}
        <div className="pt-6">
          <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
            <Image
              src="/services/furniture.webp"
              alt="Furniture & Product Design"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] tracking-[0.2em] text-[#6b6b6b] font-medium">02</span>
          </div>
          <h3 className="text-xl font-light text-[#1a1a1a] mb-3 tracking-wide">Furniture &amp; Product Design</h3>
          <p className="text-[14px] text-[#4a4a4a] leading-relaxed font-light">
            Furniture and objects designed around how they are used, made and lived with.
          </p>
        </div>

        {/* 03. Experience Curation */}
        <div className="pt-6">
          <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
            <Image
              src="/services/experience.webp"
              alt="Experience Curation"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] tracking-[0.2em] text-[#6b6b6b] font-medium">03</span>
          </div>
          <h3 className="text-xl font-light text-[#1a1a1a] mb-3 tracking-wide">Experience Curation</h3>
          <p className="text-[14px] text-[#4a4a4a] leading-relaxed font-light">
            Curating spatial experiences that bring together people, design and culture.
          </p>
        </div>
      </div>

      {/* Contact Link Below Cards */}
      <div className="mt-12 flex justify-end">
        <Link
          href="/contact"
          className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
        >
          Get in Touch →
        </Link>
      </div>
    </section>
  );
}