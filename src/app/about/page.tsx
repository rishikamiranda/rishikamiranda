import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-8">
      {/* HERO HEADER SECTION */}
      <section className="pt-20 pb-12 md:pt-10 md:pb-10 w-full ">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-light leading-none tracking-tight">
          More<br />
          <span className="font-medium">about me.</span>
        </h1>
      </section>

      {/* BIOGRAPHY NARRATIVE CORE */}
      <section className="py-12 md:py-16 w-full">
        <div className="space-y-6 text-sm text-[#1a1a1a] leading-relaxed font-light">
          <p>
            I'm the founder of{' '}
            <a
              href="https://kyrah.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a67c52] font-medium border-b border-[#a67c52]/40 pb-0.5 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors duration-300"
            >
              Kyrah Design Studio
            </a>
            , a Bangalore-based interior design practice focused on creating thoughtfully crafted residential spaces.
          </p>
          
          <p>
            Over the past five years, my practice has evolved around a hands-on approach to spatial coordination, deep material exploration, and structural execution. I bridge the gap between abstract design vision and physical reality by working closely on-site alongside master craftsmen, contractors, and technical vendors.
          </p>

          <p>
            Being intimately involved in the build phase has fundamentally anchored my philosophy: spaces must be visually inspiring, but they must also be inherently buildable. I focus on creating personal, layered environments that pull intentionally from traditional Indian craftsmanship while remaining sensitively adapted for contemporary utility.
          </p>

          <p>
            Five years into this journey, what continues to drive my work is the endless opportunity to keep learning—translating architectural theory into tangible, human-centric forms.
          </p>

          {/* Core Focus Section */}
          <div className="pt-8">
            <div className="mb-4">
              <span className="step-line w-6 mb-3 ml-auto" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#6b5f58]">Core Focus</h2>
            </div>
            <ul className="grid grid-cols-2 gap-2 text-xs text-[#6b5f58]">
              <li className="">• Built Environment</li>
              <li className="">• Interior Design</li>
              <li className="">• Product Design</li>
              <li className="">• Artisanal Collaboration</li>
            </ul>
          </div>

          {/* Chronological Timeline Modules */}
          <div className="pt-8 space-y-12 border-t border-[#e5e0db] mt-8">
            
            {/* Education Section */}
            <div>
              <div className="mb-4">
                <span className="step-line w-6 mb-3 ml-auto" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#6b5f58]">Education</h2>
              </div>
              <div className="flex justify-between items-baseline gap-4 border-b border-[#e5e0db] pb-3">
                <div className=" flex-1">
                  <span className="block text-xs font-bold text-[#1a1a1a]">Ramaiah Institute of Technology</span>
                  <span className="text-[11px] text-[#6b5f58]">Bachelor of Architecture (B.Arch)</span>
                </div>
                <span className="text-xs text-[#6b5f58]">Bangalore</span>
              </div>
            </div>

            {/* Recognition Section */}
            <div>
              <div className="mb-4">
                <span className="step-line w-6 mb-3 ml-auto" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#6b5f58]">Recognition</h2>
              </div>
              <ul className="space-y-4 text-xs leading-relaxed">
                <li className="border-b border-[#e5e0db] pb-3">
                  <span className="block font-bold text-[#6b5f58]">Awards Tier</span>
                  National Architecture and Interior Design Awards citation.
                  <a
                    href="https://kyrah.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a67c52] inline-block ml-1 hover:underline"
                  >
                    Artifact View →
                  </a>
                </li>
                <li className="border-b border-[#e5e0db] pb-3">
                  <span className="block font-bold text-[#6b5f58]">Press Feature</span>
                  Business Connect India — Architectural Profile focus feature.
                </li>
                <li className="border-b border-[#e5e0db] pb-3">
                  <span className="block font-bold text-[#6b5f58]">Public Speaking</span>
                  Kanara Entrepreneurs Bangalore Members Meet panel outline.
                </li>
                <li className="border-b border-[#e5e0db] pb-3">
                  <span className="block font-bold text-[#6b5f58]">Symposium</span>
                  KE Konnect Summit citation review coverage index.
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* COLLABORATION GRID */}
      <section className="py-16 md:py-20 w-full border-t border-[#e5e0db]">
        <div className="mb-12">
          <span className="step-line w-8 mb-6 ml-auto" />
          <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a]">Ways to <span className="font-medium">Collaborate</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e5e0db] border border-[#e5e0db]">
          
          {/* 01. Hire the Studio */}
          <div className="bg-white p-8 group transition-colors duration-300 hover:bg-[#fafafa]">
            <div className="flex items-center gap-4 mb-6 justify-end">
              <span className="text-xs tracking-widest uppercase text-[#6b5f58] font-bold">01</span>
              <span className="step-line w-10 group-hover:w-16 transition-all duration-300" />
            </div>
            <h3 className="text-xl font-light text-[#1a1a1a] mb-4">Hire the Studio</h3>
            <p className="text-xs leading-relaxed text-[#6b5f58]">
              Available for full-service architecture, residential master planning, and premium custom interior studio projects.
            </p>
          </div>
          
          {/* 02. Creative Collaborations */}
          <div className="bg-white p-8 group transition-colors duration-300 hover:bg-[#fafafa]">
            <div className="flex items-center gap-4 mb-6 justify-end">
              <span className="text-xs tracking-widest uppercase text-[#6b5f58] font-bold">02</span>
              <span className="step-line w-10 group-hover:w-16 transition-all duration-300" />
            </div>
            <h3 className="text-xl font-light text-[#1a1a1a] mb-4">Creative Collaborations</h3>
            <p className="text-xs leading-relaxed text-[#6b5f58]">
              Partnering with independent artists, design houses, creative consulting requests, or curated physical experiences on a personal level.
            </p>
          </div>
          
          {/* 03. Resources */}
          <div className="bg-white p-8 group transition-colors duration-300 hover:bg-[#fafafa]">
            <div className="flex items-center gap-4 mb-6 justify-end">
              <span className="text-xs tracking-widest uppercase text-[#6b5f58] font-bold">03</span>
              <span className="step-line w-10 group-hover:w-16 transition-all duration-300" />
            </div>
            <h3 className="text-xl font-light text-[#1a1a1a] mb-4">Resources</h3>
            <p className="text-xs leading-relaxed text-[#6b5f58]">
              Interior architectural blueprints, technical documentation checklists, mood boards, and open-source knowledge frameworks.
            </p>
          </div>

          {/* 04. Shop */}
          <div className="bg-white p-8 group transition-colors duration-300 hover:bg-[#fafafa]">
            <div className="flex items-center gap-4 mb-6 justify-end">
              <span className="text-xs tracking-widest uppercase text-[#6b5f58] font-bold">04</span>
              <span className="step-line w-10 group-hover:w-16 transition-all duration-300" />
            </div>
            <h3 className="text-xl font-light text-[#1a1a1a] mb-4">Shop</h3>
            <p className="text-xs leading-relaxed text-[#6b5f58]">
              A curated collection of intentionally designed furniture items, functional objects, graphics, and custom studio artifacts.
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
    </main>
  );
}