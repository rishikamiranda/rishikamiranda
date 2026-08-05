// src/app/lists/page.tsx
import Link from 'next/link';
import { getAllLists } from '@/actions/lists';
import { type List, type ListCategory, getListCategoryDisplayName } from '@/types';


export default async function ListsIndexPage() {
  const lists = await getAllLists();

  // Group lists by category
  const groupedLists = lists.reduce((acc: Record<string, List[]>, list: List) => {
    if (!acc[list.category]) acc[list.category] = [];
    acc[list.category].push(list);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1a1a1a] tracking-tight mb-8">
        Resources
      </h1>

      {Object.keys(groupedLists).length === 0 ? (
        <p className="text-[#6b6b6b] text-center py-12">A collection of useful things is taking shape. More soon.</p>
      ) : (
        Object.entries(groupedLists).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-light text-[#1a1a1a] mb-4 capitalize">
              {getListCategoryDisplayName(category as ListCategory)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(items as List[]).map((list: List) => (
                <Link
                  key={list.id}
                  href={`/lists/${list.category}/${list.slug}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] bg-[#f5f5f5] overflow-hidden">
                    {list.cover_image ? (
                      <img
                        src={list.cover_image}
                        alt={list.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#6b6b6b] text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <h3 className="text-lg font-light text-[#1a1a1a] group-hover:text-[#6b6b6b] transition-colors">
                      {list.title}
                    </h3>
                    {list.description && (
                      <p className="text-sm text-[#6b6b6b] font-light">{list.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}