import { notFound } from 'next/navigation';
import Link from 'next/link';
import { journalEntries } from '@/lib/dummy-data';

export async function generateStaticParams() {
  return journalEntries.map((entry) => ({
    slug: entry.slug,
  }));
}

export default function JournalDetailPage({ params }: { params: { slug: string } }) {
  const entry = journalEntries.find((e) => e.slug === params.slug);

  if (!entry) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      <Link
        href="/journal"
        className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
      >
        ← Back
      </Link>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] mt-6 mb-2">
        {entry.title}
      </h1>
      <p className="text-sm text-[#6b6b6b] mb-8">
        {new Date(entry.created_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}{' '}
        • {entry.categories}
      </p>

      <div className="prose prose-lg max-w-none">
        {entry.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-light mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
          }
          if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-light mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('> ')) {
            return <blockquote key={index} className="border-l-4 border-[#1a1a1a] pl-4 my-4 text-[#6b6b6b] italic">{paragraph.replace('> ', '')}</blockquote>;
          }
          return <p key={index} className="mb-4">{paragraph}</p>;
        })}
      </div>
    </article>
  );
}