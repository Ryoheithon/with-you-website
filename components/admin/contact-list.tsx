'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/utils/date';
import { Contact } from '@/types/contact';
import { markContactAsRead, deleteContact } from '@/lib/utils/contact-client';
import { useRouter } from 'next/navigation';

interface ContactListProps {
  contacts: Contact[];
}

const ContactList = ({ contacts }: ContactListProps) => {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleMarkAsRead = async (id: string) => {
    setProcessing(id);
    setError(null);
    
    try {
      const success = await markContactAsRead(id);
      
      if (success) {
        router.refresh();
      } else {
        setError('既読にできませんでした。もう一度お試しください。');
      }
    } catch (err) {
      console.error('Error marking contact as read:', err);
      setError('エラーが発生しました。もう一度お試しください。');
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('このお問い合わせを削除してもよろしいですか？')) {
      return;
    }
    
    setProcessing(id);
    setError(null);
    
    try {
      const success = await deleteContact(id);
      
      if (success) {
        router.refresh();
      } else {
        setError('削除できませんでした。もう一度お試しください。');
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
      setError('エラーが発生しました。もう一度お試しください。');
    } finally {
      setProcessing(null);
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-700">
        お問い合わせはありません
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 p-4 rounded-md mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                名前
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                メールアドレス
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                ステータス
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                日時
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">アクション</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {contact.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">
                    {contact.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    contact.read
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {contact.read ? '既読' : '未読'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(contact.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleToggleExpand(contact.id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    {expandedId === contact.id ? '閉じる' : '詳細'}
                  </button>
                  {!contact.read && (
                    <button
                      onClick={() => handleMarkAsRead(contact.id)}
                      disabled={processing === contact.id}
                      className="text-green-600 hover:text-green-900 mr-3 disabled:opacity-50"
                    >
                      既読にする
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(contact.id)}
                    disabled={processing === contact.id}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {expandedId && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          {contacts.find(c => c.id === expandedId)?.message.split('\n').map((line, i) => (
            <p key={i} className="mb-2">{line}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
