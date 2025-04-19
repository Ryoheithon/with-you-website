'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-600',
        outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50',
        secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
        ghost: 'bg-transparent hover:bg-primary-50 text-primary-500',
        link: 'underline-offset-4 hover:underline text-primary-500 bg-transparent',
        gradient: 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600',
        white: 'bg-white text-primary-600 hover:bg-white/90',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  href?: string;
  className?: string;
}

const Button = ({
  children,
  className,
  variant,
  size,
  href,
  ...props
}: ButtonProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button, buttonVariants };
