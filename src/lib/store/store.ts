import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import seedReducer from "../features/seeds/seedSlice";
import filterReducer from "../features/seeds/filterSlice";



// রুট রিডিউসার টাইপ
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    seeds: seedReducer,
    filters: filterReducer,
  },
  // ডেভেলপমেন্টে শুধু লোকাল স্টোরেজ মিডলওয়্যার যোগ করা
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ইগনোর করার নির্দিষ্ট পাথ (প্রয়োজন হলে)
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register', 'rehydrate'],
      },
      // থাঙ্ক মিডলওয়্যার ডিফল্টভাবে থাকে
      thunk: true,
    }),
  // ডেভেলপমেন্ট টুলস এনাবল (প্রোডাকশনে ডিজেবল করা যায়)
  devTools: process.env.NODE_ENV !== 'production',
});

// রুট স্টেট ও ডিসপ্যাচ টাইপ এক্সপোর্ট
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// কাস্টম হুকের জন্য টাইপ
export type AppStore = typeof store;