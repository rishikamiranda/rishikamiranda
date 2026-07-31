'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import JournalManager from '@/components/admin/JournalManager';
import ListsManager from '@/components/admin/ListsManager';
import ContactsManager from '@/components/admin/ContactsManager';
import { toast } from 'sonner';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('journal');

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light">Admin Dashboard</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a]"
        >
          Sign Out
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
          <TabsTrigger value="lists">Lists & Items</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="journal">
          <JournalManager />
        </TabsContent>

        <TabsContent value="lists">
          <ListsManager />
        </TabsContent>

        <TabsContent value="contacts">
          <ContactsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}