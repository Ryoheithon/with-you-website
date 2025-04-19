import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { blogSchema } from '@/lib/validators/blog';
import { generateSlug } from '@/lib/utils/blog-server';
import { getServerSession } from '@/lib/auth/session';

export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  try {
    const id = context.params.id;
    
    // Create Supabase client
    const supabase = createServerClient();
    
    // Fetch blog post by ID
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      return NextResponse.json(
        { message: 'ブログ記事が見つかりません' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error fetching blog post:', error);
    return NextResponse.json(
      { message: '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { message: '認証が必要です' },
        { status: 401 }
      );
    }
    
    const id = context.params.id;
    
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
    
    // Check if blog post exists
    const { data: existingPost, error: fetchError } = await supabase
      .from('blogs')
      .select('id')
      .eq('id', id)
      .single();
    
    if (fetchError || !existingPost) {
      return NextResponse.json(
        { message: 'ブログ記事が見つかりません' },
        { status: 404 }
      );
    }
    
    // Check if slug already exists for a different post
    const { data: slugExists } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .neq('id', id)
      .single();
    
    if (slugExists) {
      return NextResponse.json(
        { message: '同じタイトルの記事が既に存在します' },
        { status: 400 }
      );
    }
    
    // Update blog post
    const { data, error } = await supabase
      .from('blogs')
      .update({
        title,
        slug,
        content,
        excerpt,
        featured_image,
        published,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating blog post:', error);
      return NextResponse.json(
        { message: 'ブログ記事の更新に失敗しました' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error updating blog post:', error);
    return NextResponse.json(
      { message: '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { message: '認証が必要です' },
        { status: 401 }
      );
    }
    
    const id = context.params.id;
    
    // Create Supabase client
    const supabase = createServerClient();
    
    // Delete blog post
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting blog post:', error);
      return NextResponse.json(
        { message: 'ブログ記事の削除に失敗しました' },
        { status: 500 }
      );
    }
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Unexpected error deleting blog post:', error);
    return NextResponse.json(
      { message: '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}
