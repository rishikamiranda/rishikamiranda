'use client';

import { useState, useEffect } from 'react';
import { 
  getAllEntriesForAdmin,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from '@/actions/journal-entries';
import { 
  ALL_CATEGORIES, 
  categoryDisplayNames,
  type JournalEntry,
  type JournalCategory,
} from '@/types';
import { uploadJournalImages, deleteJournalImage, type UploadedImage } from '@/lib/supabase/storage';
import ImageUpload from './ImageUpload';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

type JournalImage = {
  url: string;
  title: string;
  alt: string;
};

export default function JournalManager() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<JournalEntry | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{
    title: string;
    slug: string;
    content: string;
    categories: JournalCategory[];
    published: boolean;
    cover_image: string;
    images: JournalImage[];
    description: string;
    author: string;
    reading_time: number;
    tags: string[];
    linkedin_link_url: string;
    featured: boolean;
    created_at: string; // new field
  }>({
    title: '',
    slug: '',
    content: '',
    categories: [],
    published: false,
    cover_image: '',
    images: [],
    description: '',
    author: '',
    reading_time: 5,
    tags: [],
    linkedin_link_url: '',
    featured: false,
    created_at: '', // new field
  });

  const fetchEntries = async () => {
    setLoading(true);
    const data = await getAllEntriesForAdmin();
    setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleImageUpload = async (files: File[]) => {
    setUploadingImages(true);
    try {
      const uploaded = await uploadJournalImages(files);
      const newImages: JournalImage[] = uploaded.map((img: UploadedImage) => ({
        url: img.url,
        title: '',
        alt: '',
      }));
      setForm({ ...form, images: [...form.images, ...newImages] });
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleImageRemove = async (index: number) => {
    const imageToRemove = form.images[index];
    if (imageToRemove) {
      try {
        const urlParts = imageToRemove.url.split('/');
        const path = urlParts.slice(urlParts.indexOf('journal-images') + 1).join('/');
        await deleteJournalImage(path);
        const newImages = form.images.filter((_, i) => i !== index);
        setForm({ ...form, images: newImages });
      } catch (error) {
        console.error('Error removing image:', error);
        alert('Failed to remove image. Please try again.');
      }
    }
  };

  const handleCoverImageUpload = async (files: File[]) => {
    if (files.length === 0) return;
    setUploadingImages(true);
    try {
      const uploaded = await uploadJournalImages(files);
      if (uploaded.length > 0) {
        setForm({ ...form, cover_image: uploaded[0].url });
      }
    } catch (error) {
      console.error('Error uploading cover image:', error);
      alert('Failed to upload cover image. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleCoverImageRemove = async () => {
    if (!form.cover_image) return;
    try {
      const urlParts = form.cover_image.split('/');
      const path = urlParts.slice(urlParts.indexOf('journal-images') + 1).join('/');
      await deleteJournalImage(path);
      setForm({ ...form, cover_image: '' });
    } catch (error) {
      console.error('Error removing cover image:', error);
      alert('Failed to remove cover image. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingImages(true);

    try {
      const payload = {
      title: form.title,
      slug: form.slug,
      content: form.content,
      categories: form.categories.length > 0 ? form.categories : null,
      published: form.published,
      cover_image: form.cover_image || null,
      images: form.images.length > 0 ? form.images : null,
      description: form.description || null,
      author: form.author || null,
      reading_time: form.reading_time || null,
      tags: form.tags.filter(t => t.trim() !== ''),
      linkedin_link_url: form.linkedin_link_url || null,
      featured: form.featured || false,
      created_at: form.created_at || undefined, // 👈 change null to undefined
    };

      let result;
      if (editing) {
        result = await updateJournalEntry(editing.id, payload);
      } else {
        result = await createJournalEntry(payload);
      }

      if (result.success) {
        resetForm();
        await fetchEntries();
        setShowForm(false);
        alert(editing ? 'Entry updated successfully!' : 'Entry created successfully!');
      } else {
        alert(`Failed to save entry: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry? This action cannot be undone.')) return;

    try {
      const result = await deleteJournalEntry(id);
      if (result.success) {
        await fetchEntries();
        alert('Entry deleted successfully!');
      } else {
        alert(`Failed to delete entry: ${result.error}`);
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry. Please try again.');
    }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({
      title: '',
      slug: '',
      content: '',
      categories: [],
      published: false,
      cover_image: '',
      images: [],
      description: '',
      author: '',
      reading_time: 5,
      tags: [],
      linkedin_link_url: '',
      featured: false,
      created_at: '', // reset
    });
  };

  const startEdit = (entry: JournalEntry) => {
    setEditing(entry);
    setShowForm(true);
    const images = entry.images as JournalImage[] | null;
    setForm({
      title: entry.title,
      slug: entry.slug,
      content: entry.content || '',
      categories: entry.categories || [],
      published: entry.published || false,
      cover_image: entry.cover_image || '',
      images: images || [],
      description: entry.description || '',
      author: entry.author || '',
      reading_time: entry.reading_time || 5,
      tags: entry.tags || [],
      linkedin_link_url: entry.linkedin_link_url || '',
      featured: entry.featured || false,
      created_at: entry.created_at || '', // set from entry
    });
  };

  const cancelEdit = () => {
    resetForm();
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-light">Journal Entries</h2>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-[#1a1a1a] text-white px-4 py-2 text-sm hover:bg-[#3a3a3a] transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> New Entry
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 border border-[#e0e0e0] rounded">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-light">{editing ? 'Edit Entry' : 'Create New Entry'}</h3>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-[#6b6b6b] hover:text-[#1a1a1a]"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border-b border-[#d0d0d0] py-1 focus:outline-none focus:border-[#1a1a1a]"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Slug *</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full border-b border-[#d0d0d0] py-1 focus:outline-none focus:border-[#1a1a1a]"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Content (Markdown)</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={10}
              className="w-full border border-[#e0e0e0] p-3 focus:outline-none focus:border-[#1a1a1a] font-mono text-sm rounded"
              placeholder="Write your content in markdown..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Description</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border-b border-[#d0d0d0] py-1 focus:outline-none focus:border-[#1a1a1a]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full border-b border-[#d0d0d0] py-1 focus:outline-none focus:border-[#1a1a1a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Reading Time (minutes)</label>
              <input
                type="number"
                min="1"
                value={form.reading_time}
                onChange={(e) => setForm({ ...form, reading_time: parseInt(e.target.value) || 5 })}
                className="w-full border-b border-[#d0d0d0] py-1 focus:outline-none focus:border-[#1a1a1a]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">LinkedIn Link URL</label>
              <input
                type="url"
                value={form.linkedin_link_url}
                onChange={(e) => setForm({ ...form, linkedin_link_url: e.target.value })}
                className="w-full border-b border-[#d0d0d0] py-1 focus:outline-none focus:border-[#1a1a1a]"
                placeholder="https://linkedin.com/..."
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={form.tags.join(', ')}
              onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
              className="w-full border-b border-[#d0d0d0] py-1 focus:outline-none focus:border-[#1a1a1a]"
              placeholder="design, architecture, minimalism"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Categories</label>
            <div className="flex flex-wrap gap-4">
              {ALL_CATEGORIES.map((cat: JournalCategory) => (
                <label key={cat} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.categories.includes(cat)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({ ...form, categories: [...form.categories, cat] });
                      } else {
                        setForm({ ...form, categories: form.categories.filter((c) => c !== cat) });
                      }
                    }}
                  />
                  {categoryDisplayNames[cat]}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Featured
            </label>
          </div>

          {/* New: Created At input */}
          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Created At</label>
            <input
              type="datetime-local"
              value={form.created_at ? new Date(form.created_at).toISOString().slice(0, 16) : ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  created_at: e.target.value ? new Date(e.target.value).toISOString() : '',
                })
              }
              className="w-full border-b border-[#d0d0d0] py-1 focus:outline-none focus:border-[#1a1a1a]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Cover Image</label>
            {form.cover_image ? (
              <div className="relative inline-block">
                <img
                  src={form.cover_image}
                  alt="Cover"
                  className="w-32 h-32 object-cover rounded border border-[#e0e0e0]"
                />
                <button
                  type="button"
                  onClick={handleCoverImageRemove}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <ImageUpload
                images={[]}
                onUpload={handleCoverImageUpload}
                onRemove={async () => {}}
                multiple={false}
                maxFiles={1}
                label="Upload Cover Image"
                uploading={uploadingImages}
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Gallery Images</label>
            <ImageUpload
              images={form.images.map(img => img.url)}
              onUpload={handleImageUpload}
              onRemove={handleImageRemove}
              multiple={true}
              maxFiles={10}
              label="Upload Gallery Images"
              uploading={uploadingImages}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploadingImages}
              className="bg-[#1a1a1a] text-white px-6 py-2 text-sm hover:bg-[#3a3a3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingImages ? 'Saving...' : (editing ? 'Update Entry' : 'Create Entry')}
            </button>
          </div>
        </form>
      )}

      {/* Entries Table */}
      {loading ? (
        <p className="text-[#6b6b6b] text-center py-12">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e0e0e0]">
                <th className="py-2 text-sm font-light uppercase tracking-wider">Title</th>
                <th className="py-2 text-sm font-light uppercase tracking-wider">Categories</th>
                <th className="py-2 text-sm font-light uppercase tracking-wider">Published</th>
                <th className="py-2 text-sm font-light uppercase tracking-wider">Images</th>
                <th className="py-2 text-sm font-light uppercase tracking-wider">Created</th> {/* new column */}
                <th className="py-2 text-sm font-light uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-[#eaeaea] hover:bg-[#fafafa] transition-colors">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">{entry.title}</div>
                      <div className="text-xs text-[#6b6b6b]">/{entry.slug}</div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-1">
                      {entry.categories?.map((cat: JournalCategory) => (
                        <span key={cat} className="text-[10px] uppercase border border-[#e0e0e0] px-2 py-0.5 rounded">
                          {categoryDisplayNames[cat] || cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      entry.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {entry.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      {entry.cover_image && (
                        <img src={entry.cover_image} alt="" className="w-8 h-8 object-cover rounded border border-[#e0e0e0]" />
                      )}
                      {entry.images && entry.images.length > 0 && (
                        <span className="text-xs text-[#6b6b6b]">+{entry.images.length}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 text-sm">
                    {entry.created_at ? new Date(entry.created_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(entry)}
                        className="p-1.5 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="p-1.5 text-[#6b6b6b] hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}