import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { blogSchema } from '@/lib/validators/blog';
import { generateSlug } from '@/lib/utils/blog-server';
import { getServerSession } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { message: '認証が必要です' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate request body
    const validationResult = blogSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: '入力内容に誤りがあります', errors: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Extract validated data
    const { title, content, excerpt, featured_image, published } = validationResult.data;
    
    // Generate slug from title
    const slug = generateSlug(title);
    
    // Create Supabase client
    const supabase = createServerClient();
    
    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .single();
    
    if (existingPost) {
      return NextResponse.json(
        { message: '同じタイトルの記事が既に存在します' },
        { status: 400 }
      );
    }
    
    // Insert new blog post
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          title,
          slug,
          content,
          excerpt,
          featured_image,
          published,
        },
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating blog post:', error);
      return NextResponse.json(
        { message: 'ブログ記事の作成に失敗しました' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Unexpected error creating blog post:', error);
    return NextResponse.json(
      { message: '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Create Supabase client
    const supabase = createServerClient();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    
    // Build query
    let query = supabase.from('blogs').select('*');
    
    // Filter by published status if specified
    if (published === 'true') {
      query = query.eq('published', true);
    } else if (published === 'false') {
      query = query.eq('published', false);
    }
    
    // Order by created_at descending
    query = query.order('created_at', { ascending: false });
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return NextResponse.json(
        { message: 'ブログ記事の取得に失敗しました' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error fetching blog posts:', error);
    return NextResponse.json(
      { message: '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}
