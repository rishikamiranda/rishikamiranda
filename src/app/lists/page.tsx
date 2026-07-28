import Link from 'next/link';
import { lists } from '@/lib/dummy-data';

export default function ListsIndexPage() {
  // Group lists by category
  const groupedLists = lists.reduce((acc, list) => {
    if (!acc[list.category]) acc[list.category] = [];
    acc[list.category].push(list);
    return acc;
  }, {} as Record<string, typeof lists>);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1a1a1a] tracking-tight mb-8">
        Curated <span className="font-medium">Lists</span>
      </h1>

      {Object.entries(groupedLists).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-light text-[#1a1a1a] mb-4 capitalize">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((list) => (
              <Link
                key={list.id}
                href={`/lists/${list.category}/${list.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] bg-[#f5f5f5] overflow-hidden">
                  <img
                    src={list.image}
                    alt={list.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-light text-[#1a1a1a] group-hover:text-[#6b6b6b] transition-colors mt-3">
                  {list.title}
                </h3>
                <p className="text-sm text-[#6b6b6b] font-light">{list.content}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}