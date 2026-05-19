// lib/features/cart/cartSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// TypeScript ইন্টারফেস
interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
  isSynced: boolean;
}

// লোকাল স্টোরেজ থেকে কার্ট লোড করার ফাংশন
const loadCartFromLocalStorage = (): CartState | null => {
  try {
    const serializedCart = localStorage.getItem('localCart');
    if (serializedCart === null) return null;
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Could not load cart from localStorage', err);
    return null;
  }
};

// লোকাল স্টোরেজে কার্ট সেভ করার ফাংশন
const saveCartToLocalStorage = (cart: CartState) => {
  try {
    const serializedCart = JSON.stringify({
      items: cart.items,
      totalQuantity: cart.totalQuantity,
      totalPrice: cart.totalPrice,
    });
    localStorage.setItem('localCart', serializedCart);
  } catch (err) {
    console.error('Could not save cart to localStorage', err);
  }
};

// লোকাল কার্ট ক্লিয়ার করার ফাংশন
const clearLocalCart = () => {
  localStorage.removeItem('localCart');
};

// 🔹 সার্ভারে কার্ট সেভ করার থাংক
export const saveCartToServer = createAsyncThunk(
  'cart/saveToServer',
  async (cart: CartState, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/cart/sync', {
        items: cart.items,
        totalQuantity: cart.totalQuantity,
        totalPrice: cart.totalPrice,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to save cart');
    }
  }
);

// 🔹 সার্ভার থেকে কার্ট লোড করার থাংক
export const loadCartFromServer = createAsyncThunk(
  'cart/loadFromServer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/v1/cart');
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load cart');
    }
  }
);

// 🔹 মার্জ কার্ট (লোকাল + সার্ভার)
export const mergeCarts = createAsyncThunk(
  'cart/mergeCarts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const localCart = state.cart;
      const response = await axiosInstance.post('/api/v1/cart/merge', {
        localCart: {
          items: localCart.items,
          totalQuantity: localCart.totalQuantity,
          totalPrice: localCart.totalPrice,
        },
      });
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to merge carts');
    }
  }
);

// প্রাথমিক স্টেট (লোকাল স্টোরেজ থেকে লোড)
const getInitialState = (): CartState => {
  const localCart = loadCartFromLocalStorage();
  if (localCart) {
    return {
      ...localCart,
      loading: false,
      error: null,
      isSynced: false,
    };
  }
  return {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    error: null,
    isSynced: false,
  };
};

const initialState: CartState = getInitialState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // আইটেম যোগ করুন
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity' | 'totalPrice'>>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item: CartItem) => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
        state.totalQuantity++;
      }
      state.totalPrice += newItem.price;
      state.isSynced = false;
      
      // লোকাল স্টোরেজে সেভ করুন
      saveCartToLocalStorage(state);
    },
    
    // আইটেম রিমুভ করুন
    removeItem: (state, action: PayloadAction<number | string>) => {
      const id = action.payload;
      const existingItem = state.items.find((item: CartItem) => item.id === id);
      
      if (existingItem) {
        state.totalQuantity--;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter((item: CartItem) => item.id !== id);
        state.isSynced = false;
        
        // লোকাল স্টোরেজে সেভ করুন
        saveCartToLocalStorage(state);
      }
    },
    
    // কোয়ান্টিটি বাড়ান
    increaseQuantity: (state, action: PayloadAction<number | string>) => {
      const id = action.payload;
      const item = state.items.find((item: CartItem) => item.id === id);
      
      if (item) {
        item.quantity++;
        item.totalPrice += item.price;
        state.totalPrice += item.price;
        state.isSynced = false;
        
        // লোকাল স্টোরেজে সেভ করুন
        saveCartToLocalStorage(state);
      }
    },
    
    // কোয়ান্টিটি কমান
    decreaseQuantity: (state, action: PayloadAction<number | string>) => {
      const id = action.payload;
      const item = state.items.find((item: CartItem) => item.id === id);
      
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice -= item.price;
        state.totalPrice -= item.price;
        state.isSynced = false;
        
        // লোকাল স্টোরেজে সেভ করুন
        saveCartToLocalStorage(state);
      } else if (item && item.quantity === 1) {
        state.totalQuantity--;
        state.totalPrice -= item.price;
        state.items = state.items.filter((item: CartItem) => item.id !== id);
        state.isSynced = false;
        
        // লোকাল স্টোরেজে সেভ করুন
        saveCartToLocalStorage(state);
      }
    },
    
    // কার্ট ক্লিয়ার করুন
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.isSynced = false;
      
      // লোকাল স্টোরেজ ক্লিয়ার করুন
      clearLocalCart();
    },
    
    // কার্ট সিঙ্ক করা হয়েছে মার্ক করুন
    setCartSynced: (state) => {
      state.isSynced = true;
    },
    
    // লোকাল কার্ট রিস্টোর করুন
    restoreLocalCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      saveCartToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // সার্ভারে কার্ট সেভ করা
      .addCase(saveCartToServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCartToServer.fulfilled, (state) => {
        state.loading = false;
        state.isSynced = true;
        state.error = null;
      })
      .addCase(saveCartToServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // সার্ভার থেকে কার্ট লোড করা
      .addCase(loadCartFromServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCartFromServer.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.totalQuantity = action.payload.totalQuantity || 0;
        state.totalPrice = action.payload.totalPrice || 0;
        state.isSynced = true;
        state.error = null;
        
        // লোকাল স্টোরেজও আপডেট করুন
        saveCartToLocalStorage(state);
      })
      .addCase(loadCartFromServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // কার্ট মার্জ করা
      .addCase(mergeCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(mergeCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.totalQuantity = action.payload.totalQuantity || 0;
        state.totalPrice = action.payload.totalPrice || 0;
        state.isSynced = true;
        
        // লোকাল স্টোরেজ আপডেট করুন
        saveCartToLocalStorage(state);
      })
      .addCase(mergeCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setCartSynced,
  restoreLocalCart,
} = cartSlice.actions;

export default cartSlice.reducer;