// hooks/useWishlist.ts
'use client';

import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } from '@/lib/features/wishlist/wishlistSlice';
import toast from 'react-hot-toast';

interface WishlistItemType {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  sold: number;
  category: string;
  badge: string;
  image: string | null;
}

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist);
  
  // উইশলিস্টে আইটেম যোগ করুন
  const addItem = (item: WishlistItemType, showToast: boolean = true) => {
    dispatch(addToWishlist(item));
    if (showToast) {
      toast.success(`${item.name} উইশলিস্টে যোগ হয়েছে!`, {
        icon: '❤️',
        duration: 2000,
      });
    }
  };
  
  // উইশলিস্ট থেকে আইটেম রিমুভ করুন
  const removeItem = (id: number, showToast: boolean = true) => {
    dispatch(removeFromWishlist(id));
    if (showToast) {
      toast.error('পণ্য উইশলিস্ট থেকে সরানো হয়েছে', {
        duration: 2000,
      });
    }
  };
  
  // উইশলিস্ট টগল করুন
  const toggleItem = (item: WishlistItemType, showToast: boolean = true) => {
    const isInWishlist = wishlist.items.some(i => i.id === item.id);
    dispatch(toggleWishlist(item));
    
    if (showToast) {
      if (isInWishlist) {
        toast.error(`${item.name} উইশলিস্ট থেকে সরানো হয়েছে`);
      } else {
        toast.success(`${item.name} উইশলিস্টে যোগ হয়েছে!`, { icon: '❤️' });
      }
    }
  };
  
  // চেক করুন আইটেমটি উইশলিস্টে আছে কিনা
  const isInWishlist = (id: number): boolean => {
    return wishlist.items.some(item => item.id === id);
  };
  
  // পুরো উইশলিস্ট ক্লিয়ার করুন
  const clearAll = (showToast: boolean = true) => {
    dispatch(clearWishlist());
    if (showToast) {
      toast.error('উইশলিস্ট খালি করা হয়েছে');
    }
  };
  
  // উইশলিস্টের আইটেম সংখ্যা
  const totalItems = wishlist.totalItems;
  
  // উইশলিস্টের সব আইটেম
  const wishlistItems = wishlist.items;
  
  // উইশলিস্ট খালি কিনা
  const isEmpty = wishlist.items.length === 0;

  return {
    wishlist,
    wishlistItems,
    totalItems,
    isEmpty,
    addItem,
    removeItem,
    toggleItem,
    clearAll,
    isInWishlist,
  };
};