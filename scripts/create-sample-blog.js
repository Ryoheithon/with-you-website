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

// Sample blog post data
const sampleBlogPost = {
  title: 'With-youへようこそ',
  slug: 'welcome-to-with-you',
  content: `
# With-youへようこそ

これは、With-youの最初のブログ記事です。このブログでは、教育サービスに関する情報や、学習のヒント、イベント情報などを定期的に更新していきます。

## 私たちのサービスについて

With-youは、生徒一人ひとりに合わせた教育サービスを提供しています。個別指導から集団授業まで、様々なニーズに対応しています。

## 今後の予定

今後も定期的にブログを更新していきますので、ぜひチェックしてください。また、お問い合わせフォームからのご質問も受け付けています。

皆様のご利用をお待ちしております。
  `,
  excerpt: 'With-youの最初のブログ記事です。このブログでは、教育サービスに関する情報や、学習のヒント、イベント情報などを定期的に更新していきます。',
  featured_image: '',
  published: true,
  created_at: new Date(),
  updated_at: new Date()
};

async function createSampleBlogPost() {
  console.log('Creating sample blog post...');
  
  try {
    // Check if the blog post already exists
    const { data: existingPost, error: checkError } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', sampleBlogPost.slug)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking if blog post exists:', checkError);
    }
    
    if (existingPost) {
      console.log('Sample blog post already exists');
      return;
    }
    
    // Create the blog post
    const { data, error } = await supabase
      .from('blogs')
      .insert([sampleBlogPost])
      .select();
    
    if (error) {
      console.error('Error creating sample blog post:', error);
      process.exit(1);
    }
    
    console.log('Sample blog post created successfully!');
    console.log('ID:', data[0].id);
    console.log('Title:', data[0].title);
    console.log('Slug:', data[0].slug);
  } catch (error) {
    console.error('Unexpected error creating sample blog post:', error);
    process.exit(1);
  }
}

createSampleBlogPost();
