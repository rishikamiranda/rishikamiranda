'use client';

import { useState, useEffect } from 'react';
import { getContacts, updateContactStatus, deleteContact } from '@/actions/contacts';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye, CheckCircle, Archive } from 'lucide-react';

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
};

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-gray-100 text-gray-700',
  replied: 'bg-green-100 text-green-700',
  archived: 'bg-gray-200 text-gray-500',
};

export default function ContactsManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    const data = await getContacts();
    setContacts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleStatusUpdate = async (id: string, status: 'new' | 'read' | 'replied' | 'archived') => {
    await updateContactStatus(id, status);
    await fetchContacts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this contact message?')) return;
    await deleteContact(id);
    await fetchContacts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-light">Contact Submissions</h2>
        <span className="text-sm text-[#6b6b6b]">
          {contacts.filter(c => c.status === 'new').length} new
        </span>
      </div>

      {loading ? (
        <p className="text-[#6b6b6b] text-center py-12">Loading...</p>
      ) : contacts.length === 0 ? (
        <p className="text-[#6b6b6b] text-center py-12">No contact submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e0e0e0]">
                <th className="py-2 text-sm font-light uppercase tracking-wider">Name</th>
                <th className="py-2 text-sm font-light uppercase tracking-wider">Email</th>
                <th className="py-2 text-sm font-light uppercase tracking-wider">Message</th>
                <th className="py-2 text-sm font-light uppercase tracking-wider">Status</th>
                <th className="py-2 text-sm font-light uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b border-[#eaeaea] hover:bg-[#fafafa] transition-colors">
                  <td className="py-3 font-medium">{contact.name}</td>
                  <td className="py-3">
                    <a href={`mailto:${contact.email}`} className="text-[#a67c52] hover:underline">
                      {contact.email}
                    </a>
                  </td>
                  <td className="py-3 max-w-xs truncate">{contact.message}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded ${statusColors[contact.status]}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="p-1.5 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
                        title="View Message"
                      >
                        <Eye size={16} />
                      </button>
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusUpdate(contact.id, e.target.value as any)}
                        className="text-xs border border-[#e0e0e0] rounded px-1 py-0.5 focus:outline-none focus:border-[#1a1a1a]"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                      <button
                        onClick={() => handleDelete(contact.id)}
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

      {/* View Message Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-2xl w-full p-6 rounded-lg shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-light">{selectedContact.name}</h3>
                <p className="text-sm text-[#6b6b6b]">{selectedContact.email}</p>
                <p className="text-xs text-[#6b6b6b] mt-1">
                  {new Date(selectedContact.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-[#6b6b6b] hover:text-[#1a1a1a]"
              >
                ✕
              </button>
            </div>
            <div className="border-t border-[#e0e0e0] pt-4">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{selectedContact.message}</p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedContact(null)}
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  window.location.href = `mailto:${selectedContact.email}`;
                  handleStatusUpdate(selectedContact.id, 'replied');
                  setSelectedContact(null);
                }}
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}