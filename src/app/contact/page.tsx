'use client';

import { useState } from 'react';
import { submitContactForm } from '@/actions/contacts';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      <div className="mb-12">
        <span className="step-line w-12 mb-6" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1a1a1a] tracking-tight">
          Let's <span className="font-medium">collaborate</span>
        </h1>
        <p className="text-[#6b6b6b] mt-4 max-w-xl">
          Have a project in mind? Looking to collaborate? I'd love to hear from you.
        </p>
      </div>

      {status === 'success' ? (
        <div className="border border-green-200 bg-green-50 p-6 rounded-lg text-center">
          <p className="text-green-700">Thank you for your message! I'll get back to you within 48 hours.</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 text-sm text-[#1a1a1a] underline hover:text-[#6b6b6b] transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-wider text-[#6b6b6b] mb-1">
              Name *
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
              Email *
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
              Message *
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

          {status === 'error' && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-[#1a1a1a] text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#3a3a3a] transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}