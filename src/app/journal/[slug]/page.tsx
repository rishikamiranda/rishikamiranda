import { notFound } from 'next/navigation';
import Link from 'next/link';
import { journalEntries } from '@/lib/dummy-data';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export async function generateStaticParams() {
  return journalEntries.map((entry) => ({
    slug: entry.slug,
  }));
}

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = journalEntries.find((e) => e.slug === slug);

  if (!entry) {
    notFound();
  }

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
      <p className="text-sm text-[#6b6b6b] mb-8">
        {entry.date} • {entry.category}
      </p>

      <MarkdownRenderer content={entry.content || '# This entry is in progress.'} />
    </article>
  );
}