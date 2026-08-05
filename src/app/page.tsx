// src/app/page.tsx
import Link from 'next/link';
import Hero from '@/components/Hero';
import About from '@/components/home/About';
import Work from '@/components/home/Work';
import { getAllJournalEntries } from '@/actions/journal-entries';
import { getAllLists } from '@/actions/lists';
import {
  getJournalCategoryDisplayName,
  getListCategoryDisplayName,
  type List
} from '@/types';


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
      <About />

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <hr className="border-[#e0e0e0]" />
      </div>

      {/* WHAT I DO SECTION */}
      <Work />

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <hr className="border-[#e0e0e0]" />
      </div>

      {/* JOURNAL SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 md:py-20 w-full">
        <div className="mb-12">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b]"></span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] leading-tight mt-2">
            Journal
          </h2>
        </div>
        <div className="space-y-4">
          {journalEntries.map((entry) => {
            // Get the first image from images array or use a placeholder
            const heroImage = entry.cover_image || '';
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
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700"
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
        <div className="text-right mt-8">
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
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] leading-tight mt-2">
Resources
          </h2>
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
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
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

        <div className="text-right mt-8">
          <Link
            href="/lists"
            className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
          >
            All Resources →
          </Link>
        </div>
      </section>

      
    </>
  );
}