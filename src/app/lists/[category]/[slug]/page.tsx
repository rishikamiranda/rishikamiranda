import { notFound } from 'next/navigation';
import Link from 'next/link';
import { lists, listItems } from '@/lib/dummy-data';

export async function generateStaticParams() {
  return lists.map((list) => ({
    category: list.category,
    slug: list.slug,
  }));
}

export default function ListDetailPage({ params }: { params: { category: string; slug: string } }) {
  const list = lists.find((l) => l.slug === params.slug);

  if (!list) {
    notFound();
  }

  const items = listItems.filter((item) => item.list_id === list.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <Link
        href="/lists"
        className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
      >
        ← All Lists
      </Link>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] mt-4 mb-2">
        {list.title}
      </h1>
      <p className="text-[#6b6b6b] mb-8">{list.content}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border border-[#e0e0e0] rounded overflow-hidden">
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.image_description}
                className="w-full h-48 object-cover grayscale"
              />
            )}
            <div className="p-4">
              <p className="font-medium text-[#1a1a1a]">{item.image_description}</p>
              {item.price && <p className="text-sm text-[#6b6b6b]">${item.price}</p>}
              <div className="flex space-x-4 mt-2">
                {item.view_url && (
                  <a
                    href={item.view_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1a1a1a] underline hover:text-[#6b6b6b] transition-colors"
                  >
                    View
                  </a>
                )}
                {item.buy_url && (
                  <a
                    href={item.buy_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1a1a1a] underline hover:text-[#6b6b6b] transition-colors"
                  >
                    Buy
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}