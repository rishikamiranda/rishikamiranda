import Link from 'next/link';
import { getJournalCategoryDisplayName } from '@/types';

interface PageHeaderProps {
  title: string;
  coverImage?: string | null;
  date?: string;
  categories?: string[];
  readingTime?: number | null;
  backLink?: string;
  backLabel?: string;
  height?: 'small' | 'medium' | 'large' | 'full';
}

export default function PageHeader({
  title,
  coverImage,
  date,
  categories,
  readingTime,
  backLink = '/journal',
  backLabel = 'Back to Journal',
  height = 'medium',
}: PageHeaderProps) {
  const heightClasses = {
    small: 'h-[25vh] md:h-[30vh]',
    medium: 'h-[40vh] md:h-[50vh]',
    large: 'h-[60vh] md:h-[70vh]',
    full: 'h-screen',
  };

  return (
    <div className={`relative w-full ${heightClasses[height]} overflow-hidden bg-[#f5f5f5]`}>
      {/* Cover Image with Grayscale */}
      {coverImage ? (
        <>
          <div className="absolute inset-0 grayscale">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/30" />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[#6b6b6b] bg-[#f5f5f5]">
          No cover image
        </div>
      )}

      {/* Back button overlay */}
      <div className="absolute top-6 left-4 sm:left-8 z-10">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          ← {backLabel}
        </Link>
      </div>

      {/* Bottom-aligned Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-8 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto w-full">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-4">
            {title}
          </h1>

          {/* Meta info below title */}
          {(date || categories?.length || readingTime) && (
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/80">
              {date && <span>{date}</span>}
              {categories && categories.length > 0 && (
                <>
                  <span className="text-white/40">•</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-[10px] tracking-[0.1em] uppercase border border-white/40 px-2 py-0.5 rounded"
                      >
                        {getJournalCategoryDisplayName(cat)}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {readingTime && (
                <>
                  <span className="text-white/40">•</span>
                  <span className="text-[10px] tracking-[0.1em] uppercase">
                    {readingTime} min read
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}