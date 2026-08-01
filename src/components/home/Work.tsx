import Link from 'next/link';

export default function Work() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 md:py-20 w-full">
      <div className="mb-12">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b]">What I do</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] leading-tight mt-2">
          My <span className="font-medium">Work</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* 01. Architecture & Interiors */}
        <div className="border-t border-[#e0e0e0] pt-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] tracking-[0.2em] text-[#6b6b6b] font-medium">01</span>
          </div>
          <h3 className="text-xl font-light text-[#1a1a1a] mb-3 tracking-wide">Architecture &amp; Interiors</h3>
          <p className="text-[14px] text-[#4a4a4a] leading-relaxed font-light">
            Comprehensive architectural and interior frameworks developed from deep site context, artisanal heritage, and spatial clarity.
          </p>
        </div>

        {/* 02. Furniture & Product Design */}
        <div className="border-t border-[#e0e0e0] pt-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] tracking-[0.2em] text-[#6b6b6b] font-medium">02</span>
          </div>
          <h3 className="text-xl font-light text-[#1a1a1a] mb-3 tracking-wide">Furniture &amp; Product Design</h3>
          <p className="text-[14px] text-[#4a4a4a] leading-relaxed font-light">
            Intuitively crafted physical items engineered to complement the physical behaviors, textures, and daily spatial rituals of the end user.
          </p>
        </div>

        {/* 03. Experience Curation */}
        <div className="border-t border-[#e0e0e0] pt-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] tracking-[0.2em] text-[#6b6b6b] font-medium">03</span>
          </div>
          <h3 className="text-xl font-light text-[#1a1a1a] mb-3 tracking-wide">Experience Curation</h3>
          <p className="text-[14px] text-[#4a4a4a] leading-relaxed font-light">
            Designing premium, cross-disciplinary events that weave together layout design, material culture, food, music, and raw community conversations.
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