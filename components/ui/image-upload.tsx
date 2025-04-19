'use client';

import { useState, useRef } from 'react';
import { uploadBlogImage, deleteBlogImage } from '@/lib/utils/blog-admin-client';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // ファイルのバリデーション
    if (!file.type.startsWith('image/')) {
      setError('画像ファイルを選択してください');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('ファイルサイズは5MB以下にしてください');
      return;
    }
    
    setError(null);
    setIsUploading(true);
    
    try {
      // ローカルプレビュー用のURL作成
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      
      // Supabaseにアップロード
      const imageUrl = await uploadBlogImage(file, file.name);
      
      if (imageUrl) {
        onChange(imageUrl);
        console.log('Image uploaded successfully:', imageUrl);
      } else {
        setError('画像のアップロードに失敗しました。管理者にお問い合わせください。');
        setPreview(value || null);
      }
    } catch (err) {
      console.error('Image upload error:', err);
      setError('画像のアップロード中にエラーが発生しました。別の画像をお試しください。');
      setPreview(value || null);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveImage = async () => {
    try {
      // クライアント側のプレビューをクリア
      setPreview(null);
      
      // Supabase Storageから画像を削除
      if (value) {
        await deleteBlogImage(value);
      }
      
      // 親コンポーネントに空の値を返す
      onChange('');
      
      // ファイル入力をリセット
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Error removing image:', err);
      setError('画像の削除中にエラーが発生しました');
    }
  };
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="mt-1 flex flex-col space-y-4">
        {preview && (
          <div className="relative rounded-lg overflow-hidden w-full h-56">
            <Image
              src={preview}
              alt="プレビュー"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              title="画像を削除"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={isUploading}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ED765E] disabled:opacity-50 transition-colors"
          >
            {isUploading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#ED765E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                アップロード中...
              </div>
            ) : (
              '画像を選択'
            )}
          </button>
          
          {/* URL直接入力フィールドを非表示にし、値だけ保持 */}
          <input
            type="hidden"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setPreview(e.target.value);
            }}
          />
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
