'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1a1a1a] tracking-tight mb-4">
        Let's <span className="font-medium">collaborate</span>
      </h1>
      <p className="text-[#6b6b6b] mb-8">
        Tell me about your project or idea. I'll get back to you within 48 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border-b border-[#d0d0d0] py-2 focus:outline-none focus:border-[#1a1a1a] transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border-b border-[#d0d0d0] py-2 focus:outline-none focus:border-[#1a1a1a] transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full border-b border-[#d0d0d0] py-2 focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-[#1a1a1a] text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#3a3a3a] transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="text-sm text-[#1a1a1a]">Message sent! I'll get back to you soon.</p>
        )}
      </form>
    </div>
  );
}