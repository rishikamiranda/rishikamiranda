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