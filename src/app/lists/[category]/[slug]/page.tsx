import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getListWithItems } from '@/actions/lists';
import { type ListItem, getListCategoryDisplayName } from '@/types';

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

  // Optionally verify the category matches the slug to avoid mismatched URLs
  if (list.category !== category) {
    notFound();
  }

  const displayName = getListCategoryDisplayName(category);

  // Shared header/cover/tags for both internal and external
  const Header = () => (
    <>
      <Link
        href={`/lists/${category}`}
        className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
      >
        ← Back to {displayName}
      </Link>

      {list.cover_image && (
        <div className="mt-6 aspect-[16/9] bg-[#f5f5f5] overflow-hidden rounded-lg">
          <img
            src={list.cover_image}
            alt={list.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] mt-4 mb-2">
        {list.title}
      </h1>

      {list.tags && list.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {list.tags.map((tag: string, idx: number) => (
            <span
              key={idx}
              className="text-xs uppercase tracking-wider text-[#6b6b6b] bg-[#f0f0f0] px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {list.description && (
        <p className="text-[#6b6b6b] text-lg font-light mt-4">{list.description}</p>
      )}

      {list.content && (
        <div
          className="prose prose-sm sm:prose-base max-w-none mt-6 text-[#1a1a1a]"
          dangerouslySetInnerHTML={{ __html: list.content }}
        />
      )}
    </>
  );

  // External list: show header and a call-to-action button
  if (list.type === 'external') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <Header />
        <div className="mt-8">
          <a
            href={list.external_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1a1a1a] text-white px-6 py-3 text-sm hover:bg-[#3a3a3a] transition-colors"
          >
            Visit External Resource ↗
          </a>
        </div>
      </div>
    );
  }

  // Internal list: show items
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <Header />

      {list.items && list.items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
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
        <p className="text-[#6b6b6b] text-center py-12 mt-8">No items in this list yet.</p>
      )}
    </div>
  );
}