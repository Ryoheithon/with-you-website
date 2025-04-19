import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

import { transformBlogPost } from '@/lib/utils/blog-server';

export async function GET(request: NextRequest) {
  try {
    // URLからクエリパラメータを取得
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    if (!query || query.trim() === '') {
      return NextResponse.json({ 
        error: 'Search query is required' 
      }, { status: 400 });
    }
    
    const supabase = createServerClient();
    
    // Supabaseでフルテキスト検索を実行
    // titleとcontentのどちらかに検索語句が含まれる記事を取得
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Search error:', error);
      return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
    
    // 検索結果を変換
    const results = data.map(transformBlogPost);
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Unexpected search error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}
