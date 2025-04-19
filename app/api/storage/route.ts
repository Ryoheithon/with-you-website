import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

export async function GET() {
  try {
    // 管理者権限でSupabaseクライアントを作成
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    // Storageバケットの一覧を取得
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets();
    
    if (bucketsError) {
      console.error('Error fetching buckets:', bucketsError);
      return NextResponse.json(
        { message: 'バケット情報の取得に失敗しました', error: bucketsError.message },
        { status: 500 }
      );
    }
    
    // blog-imagesバケットがなければ作成
    const blogImagesBucket = buckets?.find(bucket => bucket.name === 'blog-images');
    
    if (!blogImagesBucket) {
      // blog-imagesバケットの作成
      const { data: newBucket, error: createError } = await supabase
        .storage
        .createBucket('blog-images', {
          public: true,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
          fileSizeLimit: 5 * 1024 * 1024, // 5MB
        });
      
      if (createError) {
        console.error('Error creating blog-images bucket:', createError);
        return NextResponse.json(
          { message: 'ブログ画像用バケットの作成に失敗しました', error: createError.message },
          { status: 500 }
        );
      }
      
      // バケットを公開設定として作成
      const { data: newBucket, error: createError } = await supabase
        .storage
        .createBucket('blog-images', {
          public: true,
        });
      
      if (createError) {
        console.error('Error creating blog-images bucket:', createError);
        return NextResponse.json(
          { message: 'ブログ画像用バケットの作成に失敗しました', error: createError.message },
          { status: 500 }
        );
      }
      
      // テスト用のファイルを作成してバケットが機能しているか確認
      const testFile = new Uint8Array([0, 1, 2, 3, 4]);
      const { error: uploadError } = await supabase
        .storage
        .from('blog-images')
        .upload('test.txt', testFile);
      
      if (uploadError) {
        console.warn('Error uploading test file:', uploadError);
      } else {
        // テストファイルをクリーンアップ
        await supabase
          .storage
          .from('blog-images')
          .remove(['test.txt']);
      }
      
      return NextResponse.json(
        { 
          message: 'ブログ画像用バケットを作成しました', 
          bucket: newBucket,
          testResult: uploadError ? 'Failed' : 'Success'
        },
        { status: 201 }
      );
    }
    
    return NextResponse.json(
      { message: 'ブログ画像用バケットは既に存在します', bucket: blogImagesBucket },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in storage API:', error);
    return NextResponse.json(
      { message: '予期せぬエラーが発生しました', error: error instanceof Error ? error.message : '不明なエラー' },
      { status: 500 }
    );
  }
}
