import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getJournalEntriesByCategory, 
  getAvailableCategories, 
  categoryDisplayNames,
  ALL_CATEGORIES,
  type JournalCategory 
} from '@/lib/content/journal-entries';

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getAvailableCategories();
  return categories.map((category) => ({
    category,
  }));
}

export default async function JournalCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!ALL_CATEGORIES.includes(category as JournalCategory)) {
    notFound();
  }

  const entries = await getJournalEntriesByCategory(category as JournalCategory);
  const displayName = categoryDisplayNames[category as JournalCategory] || category;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="mb-12">
        <Link
          href="/journal"
          className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
        >
          ← All Journal Entries
        </Link>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1a1a1a] tracking-tight mt-4">
          <span className="font-medium capitalize">{displayName}</span>
        </h1>
        <p className="text-[#6b6b6b] mt-2">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </p>
      </div>

      {entries.length === 0 ? (
        <p className="text-[#6b6b6b] text-center py-12">No entries in this category yet.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/journal/${entry.slug}`}
              className="group block border-b border-[#eaeaea] py-4 px-2 hover:border-[#d0d0d0] transition-colors"
            >
              <div>
                <span className="text-[10px] tracking-[0.1em] uppercase text-[#6b6b6b] font-light">
                  {new Date(entry.created_at || '').toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <h2 className="text-base md:text-lg font-light text-[#1a1a1a] group-hover:text-[#6b6b6b] transition-colors mt-1">
                  {entry.title}
                </h2>
                {entry.description && (
                  <p className="text-sm text-[#6b6b6b] font-light mt-1 line-clamp-2">
                    {entry.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}