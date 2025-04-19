'use client';

import { useState, useEffect } from 'react';
import { createClientClient } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClientClient();
  
  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setContacts(data || []);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('お問い合わせの取得に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };
  
  const markAsRead = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ read: !currentStatus })
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, read: !currentStatus } : contact
      ));
    } catch (err) {
      console.error('Error updating contact:', err);
      alert('更新に失敗しました。');
    }
  };
  
  useEffect(() => {
    fetchContacts();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#ED765E] to-[#FEA858] text-transparent bg-clip-text">お問い合わせ管理</h1>
      
      {contacts.length === 0 ? (
        <p className="text-gray-500">お問い合わせはまだありません。</p>
      ) : (
        <div className="space-y-6">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              className={`border rounded-lg p-4 ${contact.read ? 'bg-white' : 'bg-blue-50'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{contact.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {format(new Date(contact.created_at), 'yyyy年MM月dd日 HH:mm', { locale: ja })}
                  </span>
                  <button
                    onClick={() => markAsRead(contact.id, contact.read)}
                    className={`px-2 py-1 text-xs rounded ${
                      contact.read 
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    {contact.read ? '未読にする' : '既読にする'}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                <div>
                  <span className="text-sm text-gray-500">メールアドレス:</span>{' '}
                  <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                    {contact.email}
                  </a>
                </div>
                
                {contact.phone && (
                  <div>
                    <span className="text-sm text-gray-500">電話番号:</span>{' '}
                    <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>
              
              <div className="mt-2 border-t pt-2">
                <p className="whitespace-pre-wrap text-gray-700">{contact.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
