'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  items: {
    name: string;
    href: string;
  }[];
  className?: string;
}

const Navigation = ({ items, className = '' }: NavigationProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className={`flex space-x-4 ${className}`}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium transition-colors hover:text-blue-600 ${
            isActive(item.href)
              ? 'text-blue-600 font-bold'
              : 'text-gray-700'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
