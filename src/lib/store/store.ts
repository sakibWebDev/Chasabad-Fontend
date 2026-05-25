import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import seedReducer from "../features/seeds/seedSlice";
import filterReducer from "../features/seeds/filterSlice";
import  countReducer from "../features/seeds/countSlice";
import seasonReducer from "../features/season/seasonSlice";
import orderReducer from "../features/order/orderSlice";
import reviewReducer from "../features/review/reviewSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    seeds: seedReducer,
    filters: filterReducer,
    counts: countReducer,
    seasons: seasonReducer,
    order: orderReducer,
    review: reviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        // Increase warning threshold to 100ms
        warnAfter: 100,
        // Ignore specific actions
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'seeds/fetchAll/fulfilled',
          'seeds/fetchFeatured/fulfilled',
          'seeds/search/fulfilled',
          'seeds/fetchByCategory/fulfilled',
          'seeds/fetchByDifficulty/fulfilled',
          'seeds/fetchById/fulfilled',
        ],
        // Ignore specific paths
        ignoredPaths: [
          'register',
          'rehydrate',
          'seeds.items',
          'seeds.featuredSeeds',
          'seeds.selectedSeed',
          'seeds.statistics',
        ],
      },
      immutableCheck: true,
      actionCreatorCheck: true,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;