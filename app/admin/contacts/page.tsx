import { Metadata } from 'next';
import ContactList from '@/components/admin/contact-list';
import { getAllContacts } from '@/lib/utils/contact';

export const metadata: Metadata = {
  title: 'お問い合わせ管理 | With-you 管理画面',
  description: 'With-you お問い合わせの管理',
};

export default async function AdminContactsPage() {
  const contacts = await getAllContacts();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">お問い合わせ管理</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <ContactList contacts={contacts} />
      </div>
    </div>
  );
}
