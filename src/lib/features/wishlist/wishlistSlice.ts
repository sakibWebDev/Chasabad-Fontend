// store/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// উইশলিস্ট আইটেমের টাইপ
interface WishlistItem {
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

interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
}

// লোকাল স্টোরেজ থেকে উইশলিস্ট লোড করা
const loadWishlistFromLocalStorage = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load wishlist:', error);
    return [];
  }
};

// লোকাল স্টোরেজে উইশলিস্ট সেভ করা
const saveWishlistToLocalStorage = (items: WishlistItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('wishlist', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save wishlist:', error);
  }
};

const initialState: WishlistState = {
  items: loadWishlistFromLocalStorage(),
  totalItems: loadWishlistFromLocalStorage().length,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // উইশলিস্টে আইটেম যোগ করুন
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        state.totalItems = state.items.length;
        saveWishlistToLocalStorage(state.items);
      }
    },
    
    // উইশলিস্ট থেকে আইটেম রিমুভ করুন
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItems = state.items.length;
      saveWishlistToLocalStorage(state.items);
    },
    
    // উইশলিস্ট টগল করুন (যদি থাকে রিমুভ, না থাকলে যোগ)
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      state.totalItems = state.items.length;
      saveWishlistToLocalStorage(state.items);
    },
    
    // পুরো উইশলিস্ট ক্লিয়ার করুন
    clearWishlist: (state) => {
      state.items = [];
      state.totalItems = 0;
      saveWishlistToLocalStorage(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;