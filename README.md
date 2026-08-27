# List pages
## 1. src/app/lists/page.tsx
```tsx
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

```

## 2. src/app/lists/[category]/page.tsx
```tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getListsByCategory } from '@/actions/lists';
import { 
  type List, 
  type ListCategory, 
  LIST_CATEGORIES,
  getListCategoryDisplayName 
} from '@/types';



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
  const displayName = getListCategoryDisplayName(category);

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

```

## 3. src/app/lists/[category]/[slug]/page.tsx
```tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getListWithItems, getListSlugs } from '@/actions/lists';
import { type ListItem } from '@/types';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getListSlugs();
  return slugs.map(({ slug, category }) => ({
    category: category,
    slug: slug,
  }));
}

export default async function ListDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const list = await getListWithItems(slug);

  if (!list) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <Link
        href={`/lists/${category}`}
        className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
      >
        ← Back to {category.replace('-', ' ')}
      </Link>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] mt-4 mb-2">
        {list.title}
      </h1>
      {list.description && (
        <p className="text-[#6b6b6b] text-lg font-light mb-8">{list.description}</p>
      )}

      {list.items && list.items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {list.items.map((item: ListItem) => (
            <div key={item.id} className="border border-[#e0e0e0] rounded overflow-hidden group">
              {item.image_url && (
                <div className="aspect-[4/3] overflow-hidden bg-[#f5f5f5]">
                  <img
                    src={item.image_url}
                    alt={item.image_description || ''}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                {item.image_description && (
                  <p className="font-medium text-[#1a1a1a]">{item.image_description}</p>
                )}
                {item.price && (
                  <p className="text-sm text-[#6b6b6b]">${Number(item.price).toFixed(2)}</p>
                )}
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
      ) : (
        <p className="text-[#6b6b6b] text-center py-12">No items in this list yet.</p>
      )}
    </div>
  );
}

```
