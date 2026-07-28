import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getJournalEntryBySlug, 
  getJournalSlugs, 
  categoryDisplayNames 
} from '@/lib/content/journal-entries';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Generate all static paths at build time
export async function generateStaticParams() {
  const slugs = await getJournalSlugs();
  return slugs.map(({ slug }) => ({
    slug,
  }));
}

// This page is statically generated at build time
export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getJournalEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const heroImage = entry.images?.[0] || null;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      <Link
        href="/journal"
        className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
      >
        ← Back to Journal
      </Link>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] mt-6 mb-2">
        {entry.title}
      </h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-[#6b6b6b] mb-6">
        <span>
          {new Date(entry.created_at || '').toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        {entry.categories && entry.categories.length > 0 && (
          <>
            <span className="text-[#d0d0d0]">•</span>
            <div className="flex flex-wrap gap-2">
              {entry.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] tracking-[0.1em] uppercase border border-[#e0e0e0] px-2 py-0.5 rounded"
                >
                  {categoryDisplayNames[cat] || cat}
                </span>
              ))}
            </div>
          </>
        )}
        {entry.reading_time && (
          <>
            <span className="text-[#d0d0d0]">•</span>
            <span className="text-[10px] tracking-[0.1em] uppercase">
              {entry.reading_time} min read
            </span>
          </>
        )}
        {entry.author && (
          <>
            <span className="text-[#d0d0d0]">•</span>
            <span className="text-[10px] tracking-[0.1em] uppercase">
              {entry.author}
            </span>
          </>
        )}
      </div>

      {entry.description && (
        <p className="text-base text-[#4a4a4a] font-light leading-relaxed mb-8 border-l-4 border-[#1a1a1a] pl-4">
          {entry.description}
        </p>
      )}

      {heroImage && (
        <div className="mb-8">
          <img
            src={heroImage}
            alt={entry.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      <MarkdownRenderer content={entry.content || '# This entry is in progress.'} />

      {entry.tags && entry.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[#eaeaea]">
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.1em] uppercase text-[#6b6b6b] border border-[#e0e0e0] px-3 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {entry.linkedin_link_url && (
        <div className="mt-6">
          <a
            href={entry.linkedin_link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
          >
            Discuss on LinkedIn →
          </a>
        </div>
      )}
    </article>
  );
}