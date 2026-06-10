// store/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// উইশলিস্ট আইটেমের টাইপ
export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  sold: number;
  category: string;
  badge: string;
  image: string | null;
  inStock?: boolean;
  addedAt?: number; // টাইমস্ট্যাম্প যখন আইটেম যোগ করা হয়েছে
}

interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

// লোকাল স্টোরেজ থেকে উইশলিস্ট লোড করা
const loadWishlistFromLocalStorage = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('wishlist');
    if (!saved) return [];
    
    const parsed = JSON.parse(saved);
    // Validate that parsed data is an array
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
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

// হাইড্রেশন এর জন্য ক্লায়েন্ট সাইড চেক
const isClient = typeof window !== 'undefined';

const getInitialState = (): WishlistState => {
  const items = loadWishlistFromLocalStorage();
  return {
    items,
    totalItems: items.length,
    loading: false,
    error: null,
    lastUpdated: items.length > 0 ? Date.now() : null,
  };
};

const initialState: WishlistState = getInitialState();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // উইশলিস্টে আইটেম যোগ করুন
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        const newItem = {
          ...action.payload,
          addedAt: Date.now(),
          inStock: action.payload.inStock ?? true,
        };
        state.items.unshift(newItem); // নতুন আইটেম প্রথমে যোগ করুন
        state.totalItems = state.items.length;
        state.lastUpdated = Date.now();
        saveWishlistToLocalStorage(state.items);
      }
    },
    
    // উইশলিস্ট থেকে আইটেম রিমুভ করুন
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItems = state.items.length;
      state.lastUpdated = Date.now();
      saveWishlistToLocalStorage(state.items);
    },
    
    // উইশলিস্ট টগল করুন (যদি থাকে রিমুভ, না থাকলে যোগ)
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingIndex !== -1) {
        // আইটেম exists, সরিয়ে ফেলুন
        state.items.splice(existingIndex, 1);
      } else {
        // নতুন আইটেম যোগ করুন
        const newItem = {
          ...action.payload,
          addedAt: Date.now(),
          inStock: action.payload.inStock ?? true,
        };
        state.items.unshift(newItem);
      }
      
      state.totalItems = state.items.length;
      state.lastUpdated = Date.now();
      saveWishlistToLocalStorage(state.items);
    },
    
    // পুরো উইশলিস্ট ক্লিয়ার করুন
    clearWishlist: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.lastUpdated = Date.now();
      saveWishlistToLocalStorage(state.items);
    },
    
    // উইশলিস্ট আপডেট করুন (একাধিক আইটেম)
    updateWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
      state.totalItems = action.payload.length;
      state.lastUpdated = Date.now();
      saveWishlistToLocalStorage(state.items);
    },
    
    // নির্দিষ্ট আইটেম আপডেট করুন
    updateWishlistItem: (state, action: PayloadAction<{ id: number; updates: Partial<WishlistItem> }>) => {
      const { id, updates } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        Object.assign(item, updates);
        state.lastUpdated = Date.now();
        saveWishlistToLocalStorage(state.items);
      }
    },
    
    // স্টোর রিস্টোর করুন (হাইড্রেশনের জন্য)
    restoreWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
      state.totalItems = action.payload.length;
      state.lastUpdated = Date.now();
      saveWishlistToLocalStorage(state.items);
    },
    
    // লোডিং স্টেট সেট করুন
    setWishlistLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // এরর সেট করুন
    setWishlistError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Selectors
export const selectWishlistItems = (state: { wishlist: WishlistState }) => state.wishlist.items;
export const selectWishlistTotalItems = (state: { wishlist: WishlistState }) => state.wishlist.totalItems;
export const selectIsInWishlist = (state: { wishlist: WishlistState }, id: number) => 
  state.wishlist.items.some(item => item.id === id);
export const selectWishlistLoading = (state: { wishlist: WishlistState }) => state.wishlist.loading;
export const selectWishlistError = (state: { wishlist: WishlistState }) => state.wishlist.error;
export const selectWishlistLastUpdated = (state: { wishlist: WishlistState }) => state.wishlist.lastUpdated;

// Helper functions for components
export const getWishlistCount = (state: { wishlist: WishlistState }) => state.wishlist.totalItems;
export const getWishlistItems = (state: { wishlist: WishlistState }) => state.wishlist.items;

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  updateWishlist,
  updateWishlistItem,
  restoreWishlist,
  setWishlistLoading,
  setWishlistError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;