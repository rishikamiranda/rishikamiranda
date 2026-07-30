import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getListsByCategory } from '@/actions/lists';
import { 
  type List, 
  type ListCategory, 
  LIST_CATEGORIES,
  getListCategoryDisplayName 
} from '@/types';

export const revalidate = 3600;

export async function generateStaticParams() {
  return LIST_CATEGORIES.map((category) => ({
    category,
  }));
}

export default async function ListCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!LIST_CATEGORIES.includes(category as ListCategory)) {
    notFound();
  }

  const lists = await getListsByCategory(category as ListCategory);
  const displayName = getListCategoryDisplayName(category as ListCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      <Link
        href="/lists"
        className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
      >
        ← All Lists
      </Link>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1a1a1a] tracking-tight mt-4 mb-2">
        <span className="font-medium capitalize">{displayName}</span>
      </h1>
      <p className="text-[#6b6b6b] mb-8">
        {lists.length} {lists.length === 1 ? 'list' : 'lists'}
      </p>

      {lists.length === 0 ? (
        <p className="text-[#6b6b6b] text-center py-12">No lists in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((list: List) => (
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
      )}
    </div>
  );
}