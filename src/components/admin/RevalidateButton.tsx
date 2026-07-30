'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function RevalidateButton() {
  const [loading, setLoading] = useState(false);

  const handleRevalidate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/revalidate?secret=' + process.env.NEXT_PUBLIC_REVALIDATE_SECRET, {
        method: 'POST',
      });
      
      if (response.ok) {
        toast.success('Cache revalidated successfully!');
      } else {
        toast.error('Failed to revalidate cache');
      }
    } catch (error) {
      toast.error('Error revalidating cache');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRevalidate}
      disabled={loading}
    >
      {loading ? 'Revalidating...' : 'Revalidate Cache'}
    </Button>
  );
}