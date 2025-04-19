import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';
import { contactSchema } from '@/lib/validators/contact';
import { sendContactNotificationEmail } from '@/lib/email/notifications';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate request body
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: '入力内容に誤りがあります', errors: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Extract validated data
    const { name, email, phone, message } = validationResult.data;
    
    // Create Supabase client with service role key for API routes
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    // Insert contact submission
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone,
          message,
          read: false,
        },
      ])
      .select()
      .single();
    
    if (error) {
      // 詳細なエラーログ
      console.error('Error creating contact submission:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      return NextResponse.json(
        { 
          message: 'データベースへの保存に失敗しました', 
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code 
        },
        { status: 500 }
      );
    }
    
    // Send notification email - エラーをキャッチして処理を継続
    try {
      await sendContactNotificationEmail({
        name,
        email,
        phone,
        message,
      });
      console.log('Notification email sent successfully');
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // ログにのみ記録し、処理を継続
    }
    
    return NextResponse.json(
      { message: 'お問い合わせを受け付けました', success: true, id: data?.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error processing contact submission:', error);
    return NextResponse.json(
      { 
        message: '予期せぬエラーが発生しました', 
        error: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if request is authenticated (implement your auth check here)
    // For example:
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json(
    //     { message: '認証が必要です' },
    //     { status: 401 }
    //   );
    // }
    
    // Create Supabase client with service role key for admin access
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const read = searchParams.get('read');
    
    // Build query
    let query = supabase.from('contacts').select('*');
    
    // Filter by read status if specified
    if (read === 'true') {
      query = query.eq('read', true);
    } else if (read === 'false') {
      query = query.eq('read', false);
    }
    
    // Order by created_at descending
    query = query.order('created_at', { ascending: false });
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching contacts:', error);
      return NextResponse.json(
        { message: 'お問い合わせの取得に失敗しました', error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error fetching contacts:', error);
    return NextResponse.json(
      { message: '予期せぬエラーが発生しました', error: error instanceof Error ? error.message : '不明なエラー' },
      { status: 500 }
    );
  }
}
