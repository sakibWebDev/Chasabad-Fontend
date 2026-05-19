// components/common/CartCounter.tsx
'use client';

import { useCart } from '@/lib/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartCounter() {
  const { totalItems, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="relative">
        <ShoppingCart className="h-6 w-6 text-gray-600" />
      </div>
    );
  }

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-emerald-600 transition" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}