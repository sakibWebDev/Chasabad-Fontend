// hooks/useCart.ts
'use client';

import {  useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { 
  addItem, 
  removeItem, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart,
  saveCartToServer,
  loadCartFromServer,
  mergeCarts
} from '@/lib/features/cart/cartSlice';
import { selectIsAuthenticated } from '@/lib/features/auth/authSlice';
import { toast } from 'react-hot-toast';

// প্রোডাক্টের টাইপ (আপনার কম্পোনেন্টের সাথে মানিয়ে নিতে)
interface ProductType {
  id: number | string;
  name: string;
  price: number;
}

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  // কার্টে প্রোডাক্ট যোগ করুন
  const addToCart = async (product: ProductType, showToast: boolean = true) => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
    }));
    
    // অথেন্টিকেটেড ইউজার হলে সরাসরি সার্ভারে সেভ করুন
    if (isAuthenticated) {
      const updatedCart = {
        ...cart,
        items: [...cart.items, { 
          id: product.id, 
          name: product.name, 
          price: product.price, 
          quantity: 1, 
          totalPrice: product.price 
        }],
        totalQuantity: cart.totalQuantity + 1,
        totalPrice: cart.totalPrice + product.price,
      };
      await dispatch(saveCartToServer(updatedCart));
    }
    
    if (showToast) {
      toast.success(`${product.name} কার্টে যোগ হয়েছে!`, {
        duration: 2000,
        position: 'bottom-right',
        icon: '🛒',
      });
    }
  };
  
  // কার্ট থেকে প্রোডাক্ট রিমুভ করুন
  const removeFromCart = async (id: number | string, showToast: boolean = true) => {
    dispatch(removeItem(id));
    
    if (isAuthenticated) {
      await dispatch(saveCartToServer(cart));
    }
    
    if (showToast) {
      toast.error('পণ্য কার্ট থেকে সরানো হয়েছে', {
        duration: 2000,
        position: 'bottom-right',
      });
    }
  };
  
  // কোয়ান্টিটি বাড়ান
  const increaseQuantityItem = async (id: number | string) => {
    dispatch(increaseQuantity(id));
    
    if (isAuthenticated) {
      // একটু delay দিয়ে সেভ করুন যাতে একাধিক কল না হয়
      setTimeout(async () => {
        await dispatch(saveCartToServer(cart));
      }, 500);
    }
  };
  
  // কোয়ান্টিটি কমান
  const decreaseQuantityItem = async (id: number | string) => {
    dispatch(decreaseQuantity(id));
    
    if (isAuthenticated) {
      setTimeout(async () => {
        await dispatch(saveCartToServer(cart));
      }, 500);
    }
  };
  
  // পুরো কার্ট ক্লিয়ার করুন
  const clearAllCart = async (showToast: boolean = true) => {
    dispatch(clearCart());
    
    if (isAuthenticated) {
      await dispatch(saveCartToServer(cart));
    }
    
    if (showToast) {
      toast.error('কার্ট খালি করা হয়েছে', {
        duration: 2000,
        position: 'bottom-right',
      });
    }
  };
  
  // চেক করুন প্রোডাক্ট কার্টে আছে কিনা
  const isInCart = (id: number | string): boolean => {
    return cart.items.some(item => item.id === id);
  };
  
  // কার্টে প্রোডাক্টের কোয়ান্টিটি বের করুন
  const getItemQuantity = (id: number | string): number => {
    const item = cart.items.find(item => item.id === id);
    return item ? item.quantity : 0;
  };
  
  // নির্দিষ্ট আইটেমের ডিটেইলস পাওয়া
  const getCartItem = (id: number | string) => {
    return cart.items.find(item => item.id === id);
  };
  
  // সার্ভারের সাথে কার্ট সিঙ্ক করা
  const syncCartWithServer = async () => {
    if (isAuthenticated) {
      try {
        await dispatch(mergeCarts()).unwrap();
        toast.success('কার্ট সিঙ্ক হয়েছে!', {
          duration: 2000,
          position: 'bottom-right',
        });
      } catch (error) {
        console.error('Cart sync failed:', error);
      }
    }
  };
  
  // সার্ভার থেকে কার্ট লোড করা
  const loadCart = async () => {
    if (isAuthenticated) {
      try {
        await dispatch(loadCartFromServer()).unwrap();
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  };
  
  // মোট আইটেম সংখ্যা
  const totalItems = cart.totalQuantity;
  
  // মোট দাম
  const totalPrice = cart.totalPrice;
  
  // কার্টের সব আইটেম
  const cartItems = cart.items;
  
  // কার্ট খালি কিনা চেক করা
  const isCartEmpty = cart.items.length === 0;
  
  // কার্ট লোড হচ্ছে কিনা
  const isLoading = cart.loading;
  
  // কার্ট এরর
  const cartError = cart.error;
  
  // কার্ট সিঙ্কড কিনা
  const isSynced = cart.isSynced;

  return {
    // ডাটা
    cart,
    cartItems,
    totalItems,
    totalPrice,
    isCartEmpty,
    isLoading,
    cartError,
    isSynced,
    isAuthenticated,
    
    // ফাংশন
    addToCart,
    removeFromCart,
    increaseQuantityItem,
    decreaseQuantityItem,
    clearAllCart,
    isInCart,
    getItemQuantity,
    getCartItem,
    syncCartWithServer,
    loadCart,
  };
};