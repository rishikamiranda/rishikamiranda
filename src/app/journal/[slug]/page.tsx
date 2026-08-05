import { notFound } from 'next/navigation';
import { 
  getJournalEntryBySlug, 
  getJournalSlugs, 
} from '@/actions/journal-entries';
import { categoryDisplayNames } from '@/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import PageHeader from '@/components/PageHeader';


// Generate all static paths at build time
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

  // Get cover image or first image from gallery
  const coverImage = entry.cover_image || (entry.images?.[0] as any)?.url || null;
  const galleryImages = entry.images || [];
  const hasGallery = galleryImages.length > 0;

  // Format date
  const formattedDate = new Date(entry.created_at || '').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article>
      {/* Page Header with Cover Image */}
      <PageHeader
        title={entry.title}
        coverImage={coverImage}
        date={formattedDate}
        categories={entry.categories || []}
        readingTime={entry.reading_time}
        backLink="/journal"
        backLabel="Back to Journal"
        height="medium"
      />

      {/* Content Section - Constrained container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Description */}
        {entry.description && (
          <p className="text-base sm:text-lg text-[#4a4a4a] font-light leading-relaxed mb-8 border-l-4 border-[#1a1a1a] pl-4">
            {entry.description}
          </p>
        )}

        {/* Gallery Images */}
        {hasGallery && (
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {galleryImages.map((image, index) => {
                const img = image as { url: string; title?: string; alt?: string };
                return (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg bg-[#f5f5f5] group cursor-pointer"
                  >
                    <img
                      src={img.url}
                      alt={img.alt || img.title || `Image ${index + 1}`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                    />
                    {img.title && (
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-xs text-white font-light truncate">{img.title}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Content */}
        <MarkdownRenderer content={entry.content || '# This entry is in progress.'} />

        {/* Tags */}
        {entry.tags && entry.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#eaeaea]">
            <h3 className="text-xs uppercase tracking-wider text-[#6b6b6b] mb-3">Tags</h3>
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

        {/* LinkedIn Link */}
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
      </div>
    </article>
  );
}