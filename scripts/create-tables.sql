-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
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

CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs (slug);
CREATE INDEX IF NOT EXISTS blogs_published_idx ON blogs (published);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contacts_read_idx ON contacts (read);

-- Set up row-level security policies
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy for blogs (only authenticated users can insert/update/delete)
CREATE POLICY "Allow public read access" ON blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Allow authenticated users full access" ON blogs
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policy for contacts (only authenticated users can read/update/delete)
CREATE POLICY "Allow public insert access" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users read/update/delete" ON contacts
  FOR ALL USING (auth.role() = 'authenticated');
