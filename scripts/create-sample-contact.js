require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample contact data
const sampleContacts = [
  {
    name: '山田 太郎',
    email: 'taro.yamada@example.com',
    phone: '090-1234-5678',
    message: '高校受験対策の個別指導について詳しく知りたいです。料金や時間帯など、詳細を教えていただけますか？',
    read: false,
    created_at: new Date()
  },
  {
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    phone: '080-8765-4321',
    message: '小学3年生の子供の学習サポートを探しています。特に算数が苦手なので、その点を重点的に教えていただける先生はいらっしゃいますか？',
    read: true,
    created_at: new Date(Date.now() - 86400000) // 1 day ago
  }
];

async function createSampleContacts() {
  console.log('Creating sample contacts...');
  
  try {
    // Create the contacts
    const { data, error } = await supabase
      .from('contacts')
      .insert(sampleContacts)
      .select();
    
    if (error) {
      console.error('Error creating sample contacts:', error);
      process.exit(1);
    }
    
    console.log('Sample contacts created successfully!');
    console.log(`Created ${data.length} sample contacts`);
  } catch (error) {
    console.error('Unexpected error creating sample contacts:', error);
    process.exit(1);
  }
}

createSampleContacts();
