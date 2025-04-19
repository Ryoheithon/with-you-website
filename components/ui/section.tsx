'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'gradient' | 'hero';
}

const Section = ({ 
  children, 
  className, 
  id, 
  variant = 'default' 
}: SectionProps) => {
  const variantStyles = {
    default: 'bg-white',
    primary: 'bg-primary-50',
    secondary: 'bg-secondary-50',
    gradient: 'relative bg-gradient-to-r from-purple-600 to-blue-500',
    hero: 'relative bg-gradient-to-r from-primary-600 to-primary-500',
  };

  return (
    <section
      id={id}
      className={cn(
        'py-16',
        variantStyles[variant],
        className
      )}
    >
      {(variant === 'gradient' || variant === 'hero') && (
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
      )}
      <div className="container mx-auto px-4 relative">
        {children}
      </div>
    </section>
  );
};

export { Section };
