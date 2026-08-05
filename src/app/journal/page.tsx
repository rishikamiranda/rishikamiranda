import Link from 'next/link';
import { getAllJournalEntries } from '@/actions/journal-entries';
import { categoryDisplayNames } from '@/types';

export default async function JournalIndexPage() {
  const entries = await getAllJournalEntries();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1a1a1a] tracking-tight mt-2">
          Journal
        </h1>
      </div>

      {entries.length === 0 ? (
        <p className="text-[#6b6b6b] text-center py-12">A collection of useful things is taking shape. More soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/journal/${entry.slug}`}
              className="group block border border-[#eaeaea] rounded-lg overflow-hidden hover:border-[#d0d0d0] transition-colors duration-300 hover:shadow-sm bg-white"
            >
              {/* Cover Image */}
              <div className="aspect-[4/3] overflow-hidden bg-[#f5f5f5]">
                {entry.cover_image ? (
                  <img
                    src={entry.cover_image}
                    alt={entry.title}
                    className="w-full h-full object-cover  transition-all duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#6b6b6b] text-sm">
                    No image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-[10px] tracking-[0.1em] uppercase text-[#6b6b6b] font-light">
                  {new Date(entry.created_at || '').toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <h2 className="text-base md:text-lg font-light text-[#1a1a1a] group-hover:text-[#6b6b6b] transition-colors mt-1 leading-snug">
                  {entry.title}
                </h2>
                {entry.description && (
                  <p className="text-sm text-[#6b6b6b] font-light mt-2 line-clamp-3">
                    {entry.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  {entry.categories?.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] tracking-[0.1em] uppercase text-[#6b6b6b] font-light border border-[#e0e0e0] px-2 py-0.5 rounded"
                    >
                      {categoryDisplayNames[cat] || cat}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}