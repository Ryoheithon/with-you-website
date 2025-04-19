'use client';

import { useState } from 'react';
import ContactForm from '@/components/contact/contact-form';
import { ContactFormValues } from '@/lib/validators/contact';
import { toast } from 'sonner';

export default function ContactFormWrapper() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // より長いタイムアウトを設定して接続問題を軽減
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // レスポンスのステータスコードを確認
      if (!response.ok) {
        let errorMessage = 'お問い合わせの送信に失敗しました';
        
        try {
          // JSONとしてパースを試みる
          const result = await response.json();
          if (result && result.message) {
            errorMessage = result.message;
          }
        } catch (parseError) {
          // JSONパースエラーの場合はデフォルトメッセージを使用
          console.error('Response parsing error:', parseError);
        }
        
        throw new Error(errorMessage);
      }
      
      // 成功レスポンスの処理
      let successMessage = 'お問い合わせを受け付けました。担当者より2営業日以内にご連絡いたします。';
      
      try {
        const result = await response.json();
        if (result && result.message) {
          successMessage = result.message;
        }
      } catch (parseError) {
        // JSONパースエラーの場合はデフォルトメッセージを使用
        console.error('Success response parsing error:', parseError);
      }
      
      toast.success(successMessage);
      return true;
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error(error instanceof Error ? error.message : 'お問い合わせの送信に失敗しました。後ほど再度お試しください。');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
