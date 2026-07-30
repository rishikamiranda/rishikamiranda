'use client';

import { useState } from 'react';
import { signOut } from '@/actions/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import JournalManager from '@/components/admin/JournalManager';
import { toast } from 'sonner';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('journal');

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div>
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
        <TabsList>
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
          <TabsTrigger value="lists">Lists & Items</TabsTrigger>
        </TabsList>

        <TabsContent value="journal">
          <JournalManager />
        </TabsContent>

        <TabsContent value="lists">
          <div className="text-center py-12 text-[#6b6b6b] border rounded-lg">
            <p>Lists manager coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}