// src/app/page.tsx
import Link from 'next/link';
import Hero from '@/components/Hero';
import { getAllJournalEntries } from '@/actions/journal-entries';
import { getAllLists } from '@/actions/lists';
import { 
  getJournalCategoryDisplayName, 
  getListCategoryDisplayName,
  type List 
} from '@/types';

// ISR - Revalidate every 30 days
export const revalidate = 2592000;

const heroImages: string[] = [
  "/hero/1.jpeg",
  "/hero/2.jpeg",
  "/hero/3.jpeg",
  "/hero/4.jpeg"
]

export default async function HomePage() {
  const allEntries = await getAllJournalEntries();
  const journalEntries = allEntries.slice(0, 5);
  
  const allLists = await getAllLists();
  const recentLists = allLists.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <Hero
        images={heroImages}
        title='Making sense of the world through design'
        subtitle="Through buildings, objects, travel, art, craftsmanship and culture, I'm constantly collecting ideas about how people live, gather and create meaning. This is where I document them."
      />

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <hr className="border-[#e0e0e0]" />
      </div>

      {/* ABOUT SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 md:py-20 w-full">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* LEFT: Circular Portrait */}
          <div className="md:w-[40%] flex justify-center md:justify-start">
            <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-[#e0e0e0] flex-shrink-0">
              <img
                src="/rishika.jpeg"
                alt="Rishika Miranda"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="md:w-[60%] flex flex-col">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-4">About</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] leading-tight mb-6">
              Hi, I am Rishika
            </h2>
            <div className="space-y-4 text-[15px] text-[#3a3a3a] leading-relaxed font-light">
              <p>
                I'm a Bangalore-based architect and creative lead working across architecture, interiors, storytelling and experiential design. Architecture is how I make sense of the world.
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

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <hr className="border-[#e0e0e0]" />
      </div>

      {/* WHAT I DO SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 md:py-20 w-full">
        <div className="mb-12">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b]">What I do</span>
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
            <button
              className="mt-6 text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
            >
              Enquire about this →
            </button>
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
            <button
              className="mt-6 text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
            >
              Enquire about this →
            </button>
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
            <button
              className="mt-6 text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
            >
              Enquire about this →
            </button>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <hr className="border-[#e0e0e0]" />
      </div>

      {/* JOURNAL SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 md:py-20 w-full">
        <div className="flex items-end justify-between mb-10">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b]">Journal</span>
        </div>
        <div className="space-y-4">
          {journalEntries.map((entry) => {
            // Get the first image from images array or use a placeholder
            const heroImage = entry.images?.[0] || '';
            const displayCategories = entry.categories || [];

            return (
              <Link
                key={entry.id}
                href={`/journal/${entry.slug}`}
                className="group relative block w-full transition-all duration-300"
              >
                {/* Background image – hidden by default, appears on hover */}
                {heroImage && (
                  <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 grayscale"
                    style={{ backgroundImage: `url('${heroImage}')` }}
                  />
                )}

                {/* Content – stays on top */}
                <div className="relative z-10 border-b border-[#eaeaea] py-5 px-4 group-hover:border-[#d0d0d0] transition-colors duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex-1">
                      <span className="text-[10px] tracking-[0.1em] uppercase text-[#6b6b6b] font-light">
                        {new Date(entry.created_at || '').toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <h2 className="text-lg md:text-xl font-light text-[#1a1a1a] group-hover:text-[#6b6b6b] transition-colors duration-300 mt-1">
                        {entry.title}
                      </h2>
                      {entry.description && (
                        <p className="text-sm text-[#6b6b6b] font-light mt-1 line-clamp-2">
                          {entry.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {displayCategories.map((cat: string) => (
                        <span
                          key={cat}
                          className="text-[10px] tracking-[0.1em] uppercase text-[#6b6b6b] font-light border border-[#e0e0e0] px-2 py-0.5 rounded"
                        >
                          {getJournalCategoryDisplayName(cat)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="text-left mt-8">
          <Link
            href="/journal"
            className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
          >
            All Entries →
          </Link>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <hr className="border-[#e0e0e0]" />
      </div>

      {/* LISTS SECTION – Gallery Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 md:py-20 w-full">
        <div className="flex items-end justify-between mb-10">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b]">Lists</span>
          <Link
            href="/lists"
            className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
          >
            All Lists →
          </Link>
        </div>

        {recentLists.length === 0 ? (
          <p className="text-[#6b6b6b]">No lists available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {recentLists.map((list: List) => (
              <Link
                key={list.id}
                href={`/lists/${list.category}/${list.slug}`}
                className="group block transition-all duration-300"
              >
                <div className="overflow-hidden bg-[#f5f5f5] aspect-[4/3]">
                  {list.cover_image ? (
                    <img
                      src={list.cover_image}
                      alt={list.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#6b6b6b] text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div>
                    <h3 className="text-lg font-light text-[#1a1a1a] group-hover:text-[#6b6b6b] transition-colors duration-300 tracking-wide">
                      {list.title}
                    </h3>
                    {list.description && (
                      <p className="text-sm text-[#6b6b6b] font-light leading-relaxed mt-1 line-clamp-2">
                        {list.description}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-[#6b6b6b] font-light whitespace-nowrap mt-1 sm:mt-0.5">
                    {getListCategoryDisplayName(list.category)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CONTACT DIALOG */}
      <dialog
        id="contactDialog"
        className="rounded-none border border-[#d0d0d0] shadow-2xl p-10 max-w-md w-full backdrop:bg-black/30 open:flex open:flex-col open:gap-6 bg-white"
      >
        <form method="dialog" className="flex flex-col gap-6">
          <div>
            <h3 className="text-2xl font-light text-[#1a1a1a] tracking-wide">Let's collaborate</h3>
            <p className="text-sm text-[#4a4a4a] font-light mt-1">Tell me about your project or idea.</p>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full border-b border-[#d0d0d0] bg-transparent py-2 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#a0a0a0] font-light"
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full border-b border-[#d0d0d0] bg-transparent py-2 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#a0a0a0] font-light"
            />
            <textarea
              rows={3}
              placeholder="Brief description..."
              className="w-full border-b border-[#d0d0d0] bg-transparent py-2 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#a0a0a0] font-light resize-none"
            />
          </div>
          <div className="flex justify-end gap-4 mt-2">
            <button
              type="button"
              className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors font-light"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-[10px] tracking-[0.2em] uppercase text-white bg-[#1a1a1a] px-6 py-2 hover:bg-[#3a3a3a] transition-colors font-light"
            >
              Send Message
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}