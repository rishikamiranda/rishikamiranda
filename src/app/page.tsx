import Link from 'next/link';
import { journalEntries, lists } from '@/lib/dummy-data';

export default function HomePage() {
  const recentJournal = journalEntries.slice(0, 3);
  const recentLists = lists.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      {/* Hero Section */}
      <section className="mb-16">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-4">est. 2020 – 2026</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#1a1a1a] leading-[1.1] tracking-tight">
          Making sense of the<br />
          <span className="font-medium">world through design</span>
        </h1>
        <p className="text-sm md:text-base text-[#4a4a4a] max-w-xl leading-relaxed mt-6 font-light">
          Through buildings, objects, travel, art, craftsmanship and culture, I&apos;m constantly collecting ideas about how people live, gather and create meaning. This is where I document them.
        </p>
        <div className="flex flex-wrap gap-6 mt-8">
          <Link
            href="/journal"
            className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
          >
            Featured Stories →
          </Link>
          <Link
            href="/about"
            className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors"
          >
            About | Inquire
          </Link>
        </div>
      </section>

      <hr className="border-[#e0e0e0] mb-12" />

      {/* About Section */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          {/* Portrait */}
          <div className="md:w-[35%] flex justify-center md:justify-start">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-[#e0e0e0] flex-shrink-0">
              <img
                src="/images/rishika-portrait.jpg"
                alt="Rishika Miranda"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>

          {/* About Text */}
          <div className="md:w-[65%]">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b]">About</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] leading-tight mt-2 mb-4">
              Hi, I am Rishika
            </h2>
            <div className="space-y-4 text-sm md:text-base text-[#3a3a3a] leading-relaxed font-light">
              <p>
                I&apos;m a Bangalore-based architect and creative lead working across architecture, interiors, storytelling and experiential design. Architecture is how I make sense of the world.
              </p>
              <p>
                Over the years, that has led me far beyond buildings. Into interiors, furniture, travel, art, craft, culture and the many ways people shape the spaces around them. Much of my work takes shape through Kyrah Design Studio, while other interests find their way into writing, events, collaborations and the occasional side project. This website is a collection of projects, places and ideas that continue to inform how I think, design and create.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/about"
                className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
              >
                How I Got Here →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-[#e0e0e0] mb-12" />

      {/* What I Do Section */}
      <section className="mb-16">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b]">What I do</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {[
            {
              id: '01',
              title: 'Architecture & Interiors',
              description: 'Comprehensive architectural and interior frameworks developed from deep site context, artisanal heritage, and spatial clarity.',
            },
            {
              id: '02',
              title: 'Furniture & Product Design',
              description: 'Intuitively crafted physical items engineered to complement the physical behaviors, textures, and daily spatial rituals of the end user.',
            },
            {
              id: '03',
              title: 'Experience Curation',
              description: 'Designing premium, cross-disciplinary events that weave together layout design, material culture, food, music, and raw community conversations.',
            },
          ].map((item) => (
            <div key={item.id} className="border-t border-[#e0e0e0] pt-4">
              <span className="text-[10px] tracking-[0.2em] text-[#6b6b6b] font-medium">{item.id}</span>
              <h3 className="text-xl font-light text-[#1a1a1a] mt-2 mb-3">{item.title}</h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed font-light">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-[#e0e0e0] mb-12" />

      {/* Journal Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b]">Journal</span>
          <Link
            href="/journal"
            className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
          >
            All Entries →
          </Link>
        </div>
        <div className="space-y-4">
          {recentJournal.map((entry) => (
            <Link
              key={entry.id}
              href={`/journal/${entry.slug}`}
              className="group block border-b border-[#eaeaea] py-3 hover:border-[#d0d0d0] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-base md:text-lg font-light text-[#1a1a1a] group-hover:text-[#6b6b6b] transition-colors">
                  {entry.title}
                </span>
                <span className="text-[10px] tracking-[0.1em] uppercase text-[#6b6b6b] font-light">
                  {entry.categories}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="border-[#e0e0e0] mb-12" />

      {/* Lists Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b]">Lists</span>
          <Link
            href="/lists"
            className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
          >
            All Lists →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {recentLists.map((list) => (
            <Link
              key={list.id}
              href={`/lists/${list.category}/${list.slug}`}
              className="group block"
            >
              <div className="aspect-[4/3] bg-[#f5f5f5] overflow-hidden">
                <img
                  src={list.image}
                  alt={list.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-base md:text-lg font-light text-[#1a1a1a] group-hover:text-[#6b6b6b] transition-colors">
                    {list.title}
                  </h3>
                  <p className="text-sm text-[#6b6b6b] font-light">{list.content}</p>
                </div>
                <span className="text-[10px] tracking-[0.1em] uppercase text-[#6b6b6b] font-light whitespace-nowrap mt-1">
                  {list.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}