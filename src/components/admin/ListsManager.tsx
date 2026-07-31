'use client';

import { useState, useEffect } from 'react';
import { 
  getAllListsForAdmin,
  createList,
  updateList,
  deleteList,
  getAllListItemsForAdmin,
  addItemsToList,
  removeItemFromList,
} from '@/actions/lists';
import { uploadListImage, deleteListImage, type UploadedImage } from '@/lib/supabase/storage';
import ImageUpload from './ImageUpload';
import { 
  type List, 
  type ListCategory, 
  type ListItem,
  LIST_CATEGORIES,
  LIST_CATEGORY_NAMES,
} from '@/types';
import { Pencil, Trash2, Plus, X, Link2, Unlink } from 'lucide-react';

export default function ListsManager() {
  const [lists, setLists] = useState<List[]>([]);
  const [allItems, setAllItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<List | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [form, setForm] = useState<{
    title: string;
    slug: string;
    description: string;
    content: string;
    cover_image: string;
    category: ListCategory;
    published: boolean;
  }>({
    title: '',
    slug: '',
    description: '',
    content: '',
    cover_image: '',
    category: 'shopping',
    published: false,
  });

  const fetchData = async () => {
    setLoading(true);
    const [listsData, itemsData] = await Promise.all([
      getAllListsForAdmin(),
      getAllListItemsForAdmin(),
    ]);
    setLists(listsData);
    setAllItems(itemsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCoverImageUpload = async (files: File[]) => {
    if (files.length === 0) return;
    setUploadingImages(true);
    try {
      const uploaded = await uploadListImage(files[0]);
      setForm({ ...form, cover_image: uploaded.url });
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
      const path = urlParts.slice(urlParts.indexOf('list-images') + 1).join('/');
      await deleteListImage(path);
      setForm({ ...form, cover_image: '' });
    } catch (error) {
      console.error('Error removing cover image:', error);
      alert('Failed to remove cover image. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        description: form.description || null,
        content: form.content || null,
        cover_image: form.cover_image || null,
        category: form.category,
        published: form.published,
      };

      let result;
      if (editing) {
        result = await updateList(editing.id, payload);
      } else {
        result = await createList(payload);
      }

      if (result.success) {
        resetForm();
        await fetchData();
        setShowForm(false);
        alert(editing ? 'List updated successfully!' : 'List created successfully!');
      } else {
        alert(`Failed to save list: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving list:', error);
      alert('Failed to save list. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this list? This action cannot be undone.')) return;

    try {
      const result = await deleteList(id);
      if (result.success) {
        await fetchData();
        alert('List deleted successfully!');
      } else {
        alert(`Failed to delete list: ${result.error}`);
      }
    } catch (error) {
      console.error('Error deleting list:', error);
      alert('Failed to delete list. Please try again.');
    }
  };

  const handleAddItemToList = async (itemId: string) => {
    if (!selectedListId) return;
    try {
      const result = await addItemsToList(selectedListId, [itemId]);
      if (result.success) {
        await fetchData();
        alert('Item added to list successfully!');
      } else {
        alert(`Failed to add item: ${result.error}`);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  const handleRemoveItemFromList = async (itemId: string) => {
    try {
      const result = await removeItemFromList(itemId);
      if (result.success) {
        await fetchData();
        alert('Item removed from list successfully!');
      } else {
        alert(`Failed to remove item: ${result.error}`);
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({
      title: '',
      slug: '',
      description: '',
      content: '',
      cover_image: '',
      category: 'shopping',
      published: false,
    });
  };

  const startEdit = (list: List) => {
    setEditing(list);
    setShowForm(true);
    setForm({
      title: list.title,
      slug: list.slug,
      description: list.description || '',
      content: list.content || '',
      cover_image: list.cover_image || '',
      category: list.category as ListCategory,
      published: list.published || false,
    });
  };

  const cancelEdit = () => {
    resetForm();
    setShowForm(false);
  };

  const getListItems = (listId: string) => {
    return allItems.filter(item => item.list_id === listId);
  };

  const getUnassignedItems = () => {
    return allItems.filter(item => !item.list_id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-light">Lists</h2>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-[#1a1a1a] text-white px-4 py-2 text-sm hover:bg-[#3a3a3a] transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> New List
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 border border-[#e0e0e0] rounded">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-light">{editing ? 'Edit List' : 'Create New List'}</h3>
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
            <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border-b border-[#d0d0d0] py-1 focus:outline-none focus:border-[#1a1a1a]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Content (optional)</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={4}
              className="w-full border border-[#e0e0e0] p-3 focus:outline-none focus:border-[#1a1a1a] font-mono text-sm rounded"
              placeholder="Additional content for the list page..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as ListCategory })}
              className="w-full border-b border-[#d0d0d0] py-1 focus:outline-none focus:border-[#1a1a1a]"
            >
              {LIST_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {LIST_CATEGORY_NAMES[cat]}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Published
            </label>
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
              {uploadingImages ? 'Saving...' : (editing ? 'Update List' : 'Create List')}
            </button>
          </div>
        </form>
      )}

      {/* Lists Table */}
      {loading ? (
        <p className="text-[#6b6b6b] text-center py-12">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e0e0e0]">
                <th className="py-2 text-sm font-light uppercase tracking-wider">Title</th>
                <th className="py-2 text-sm font-light uppercase tracking-wider">Category</th>
                <th className="py-2 text-sm font-light uppercase tracking-wider">Published</th>
                <th className="py-2 text-sm font-light uppercase tracking-wider">Items</th>
                <th className="py-2 text-sm font-light uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((list) => {
                const listItems = getListItems(list.id);
                return (
                  <tr key={list.id} className="border-b border-[#eaeaea] hover:bg-[#fafafa] transition-colors">
                    <td className="py-3">
                      <div>
                        <div className="font-medium">{list.title}</div>
                        <div className="text-xs text-[#6b6b6b]">/{list.slug}</div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-xs px-2 py-1 rounded bg-gray-100">
                        {LIST_CATEGORY_NAMES[list.category as ListCategory] || list.category}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        list.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {list.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm">{listItems.length} items</span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedListId(selectedListId === list.id ? null : list.id)}
                          className="p-1.5 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
                          title={selectedListId === list.id ? 'Hide Items' : 'Manage Items'}
                        >
                          <Link2 size={16} />
                        </button>
                        <button
                          onClick={() => startEdit(list)}
                          className="p-1.5 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(list.id)}
                          className="p-1.5 text-[#6b6b6b] hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Item Management Section */}
      {selectedListId && (
        <div className="mt-8 border-t border-[#e0e0e0] pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-light">
              Items for: {lists.find(l => l.id === selectedListId)?.title}
            </h3>
            <button
              onClick={() => setSelectedListId(null)}
              className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a]"
            >
              <X size={16} /> Close
            </button>
          </div>

          {/* Current Items */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-[#6b6b6b] mb-2">Items in this list</h4>
            {getListItems(selectedListId).length === 0 ? (
              <p className="text-sm text-[#6b6b6b]">No items in this list yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {getListItems(selectedListId).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 border p-2 rounded">
                    {item.image_url && (
                      <img src={item.image_url} alt="" className="w-12 h-12 object-cover rounded" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.image_description || 'Untitled'}</p>
                      {item.price && <p className="text-xs text-[#6b6b6b]">${item.price}</p>}
                    </div>
                    <button
                      onClick={() => handleRemoveItemFromList(item.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Remove from list"
                    >
                      <Unlink size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Available Items to Add */}
          <div>
            <h4 className="text-sm font-medium text-[#6b6b6b] mb-2">Available items (not in any list)</h4>
            {getUnassignedItems().length === 0 ? (
              <p className="text-sm text-[#6b6b6b]">No unassigned items available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {getUnassignedItems().map((item) => (
                  <div key={item.id} className="flex items-center gap-3 border p-2 rounded">
                    {item.image_url && (
                      <img src={item.image_url} alt="" className="w-12 h-12 object-cover rounded" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.image_description || 'Untitled'}</p>
                      {item.price && <p className="text-xs text-[#6b6b6b]">${item.price}</p>}
                    </div>
                    <button
                      onClick={() => handleAddItemToList(item.id)}
                      className="p-1 text-green-500 hover:text-green-700"
                      title="Add to list"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}