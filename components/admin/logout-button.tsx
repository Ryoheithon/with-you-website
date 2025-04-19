'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientClient } from '@/lib/supabase/client';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      const supabase = createClientClient();
      await supabase.auth.signOut();
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 11a1 1 0 01-1-1v-1H5a1 1 0 110-2h4V9a1 1 0 012 0v1h4a1 1 0 110 2h-4v1a1 1 0 01-1 1z" clipRule="evenodd" />
      </svg>
      {isLoading ? 'ログアウト中...' : 'ログアウト'}
    </button>
  );
}
