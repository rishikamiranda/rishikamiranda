import Link from 'next/link';
import { journalEntries } from '@/lib/dummy-data';

export default function JournalIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="mb-12">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b]">Journal</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1a1a1a] tracking-tight mt-2">
          Observations on<br />
          <span className="font-medium">mindful living</span>
        </h1>
      </div>

      <div className="space-y-4">
        {journalEntries.map((entry) => (
          <Link
            key={entry.id}
            href={`/journal/${entry.slug}`}
            className="group block border-b border-[#eaeaea] py-4 px-2 hover:border-[#d0d0d0] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <span className="text-[10px] tracking-[0.1em] uppercase text-[#6b6b6b] font-light">
                  {new Date(entry.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <h2 className="text-base md:text-lg font-light text-[#1a1a1a] group-hover:text-[#6b6b6b] transition-colors mt-1">
                  {entry.title}
                </h2>
              </div>
              <span className="text-[10px] tracking-[0.1em] uppercase text-[#6b6b6b] font-light whitespace-nowrap">
                {entry.categories}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}