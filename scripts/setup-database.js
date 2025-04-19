const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('Setting up database...');

  try {
    // Check if tables exist by querying them
    console.log('Checking if tables exist...');
    
    // Try to query the blogs table
    const { error: blogsError } = await supabase
      .from('blogs')
      .select('id')
      .limit(1);
    
    if (blogsError && blogsError.code === '42P01') {
      console.log('Blogs table does not exist. Please create it in the Supabase dashboard with the following SQL:');
      console.log(`
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX blogs_slug_idx ON blogs (slug);
CREATE INDEX blogs_published_idx ON blogs (published);
      `);
    } else {
      console.log('Blogs table exists');
    }
    
    // Try to query the contacts table
    const { error: contactsError } = await supabase
      .from('contacts')
      .select('id')
      .limit(1);
    
    if (contactsError && contactsError.code === '42P01') {
      console.log('Contacts table does not exist. Please create it in the Supabase dashboard with the following SQL:');
      console.log(`
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX contacts_read_idx ON contacts (read);
      `);
    } else {
      console.log('Contacts table exists');
    }

    // Create storage bucket for blog images if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();
    const blogImagesBucket = buckets?.find(bucket => bucket.name === 'blog-images');
    
    if (!blogImagesBucket) {
      console.log('Creating blog-images storage bucket...');
      const { error: createBucketError } = await supabase.storage.createBucket('blog-images', {
        public: true
      });
      
      if (createBucketError) {
        console.error('Error creating blog-images bucket:', createBucketError);
      } else {
        console.log('Blog-images bucket created successfully');
      }
    } else {
      console.log('Blog-images bucket already exists');
    }

    console.log('Database check complete!');
  } catch (error) {
    console.error('Error checking database:', error);
  }
}

setupDatabase()
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
