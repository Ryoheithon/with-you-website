'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormValues } from '@/lib/validators/contact';
import { Button } from '@/components/ui/button';

interface ContactFormProps {
  onSubmit: (data: ContactFormValues) => Promise<boolean>;
  isSubmitting?: boolean;
}

const ContactForm = ({ onSubmit, isSubmitting = false }: ContactFormProps) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const handleFormSubmit = async (data: ContactFormValues) => {
    const success = await onSubmit(data);
    
    if (success) {
      setSubmitSuccess(true);
      reset();
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      {submitSuccess ? (
        <div className="text-center py-8 animate-fade-in">
          <svg
            className="mx-auto h-12 w-12 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            お問い合わせありがとうございます
          </h3>
          <p className="mt-2 text-gray-600">
            内容を確認次第、担当者よりご連絡いたします。
          </p>
          <Button
            onClick={() => setSubmitSuccess(false)}
            className="mt-6"
            variant="gradient"
          >
            新しいお問い合わせ
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              お名前 <span className="text-primary-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-black"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              メールアドレス <span className="text-primary-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-black"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              電話番号
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-black"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              お問い合わせ内容 <span className="text-primary-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              {...register('message')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-black"
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="gradient"
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  送信中...
                </>
              ) : (
                '送信する'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
