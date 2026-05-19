// store/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// 🔹 ইউজার ইন্টারফেস
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'seller';
  image?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  savedAddresses?: string[];
  status?: 'active' | 'inactive' | 'banned';
  createdAt?: string;
  updatedAt?: string;
}

// 🔹 অথ স্টেট ইন্টারফেস
interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isAuthenticated: boolean;
}

// 🔹 লগইন ক্রেডেনশিয়াল ইন্টারফেস
interface LoginCredentials {
  email: string;
  password: string;
}

// 🔹 রেজিস্ট্রেশন ক্রেডেনশিয়াল ইন্টারফেস
interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// 🔹 আপডেট প্রোফাইল ইন্টারফেস
interface UpdateProfileData {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

// 🔹 অ্যাপি রেসপন্স ইন্টারফেস
interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  message?: string;
}

// 🔹 প্রাথমিক স্টেট
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  status: 'idle',
  isAuthenticated: false,
};

// ============================================
// 🔹 Async Thunks (API Calls)
// ============================================

// 🟢 লগইন ইউজার
export const loginUser = createAsyncThunk<
  IUser,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<ApiResponse<IUser>>('/api/v1/auth/login', credentials);
      
      if (response.data.data) {
        return response.data.data;
      }
      throw new Error('No data returned');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// 🟢 রেজিস্ট্রেশন ইউজার
export const registerUser = createAsyncThunk<
  IUser,
  RegisterCredentials,
  { rejectValue: string }
>(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<ApiResponse<IUser>>('/api/v1/auth/register', credentials);
      
      if (response.data.data) {
        return response.data.data;
      }
      throw new Error('No data returned');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// 🟢 কারেন্ট ইউজার ফেচ করুন
export const fetchCurrentUser = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string }
>(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<ApiResponse<IUser> | IUser>('/api/v1/user/me');
      
      // বিভিন্ন রেসপন্স স্ট্রাকচার হ্যান্ডেল করা
      let userData: IUser;
      
      if (response.data && typeof response.data === 'object') {
        if ('success' in response.data && response.data.success && response.data.data) {
          userData = response.data.data;
        } else if ('data' in response.data && response.data.data) {
          userData = response.data.data;
        } else if ('id' in response.data) {
          userData = response.data as IUser;
        } else {
          throw new Error('Invalid response structure');
        }
      } else {
        throw new Error('Invalid response');
      }
      
      return userData;
    } catch (error: any) {
      console.error('Fetch user error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

// 🟢 লগআউট ইউজার
export const logoutUser = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/api/v1/auth/logout');
      // লোকাল স্টোরেজ থেকে কার্ট ক্লিয়ার করুন
      localStorage.removeItem('localCart');
      localStorage.removeItem('wishlist');
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

// 🟢 প্রোফাইল আপডেট করুন
export const updateProfile = createAsyncThunk<
  IUser,
  UpdateProfileData,
  { rejectValue: string }
>(
  'auth/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch<ApiResponse<IUser>>('/api/v1/user/update', userData);
      
      if (response.data.data) {
        return response.data.data;
      }
      throw new Error('No data returned');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
);

// ============================================
// 🔹 Slice
// ============================================

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // লোকাল লগআউট (API কল ছাড়া)
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      localStorage.removeItem('localCart');
      localStorage.removeItem('wishlist');
    },
    
    // এরর ক্লিয়ার করুন
    clearError: (state) => {
      state.error = null;
    },
    
    // ম্যানুয়ালি ইউজার সেট করুন
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    
    // অথ স্টেট রিসেট করুন
    resetAuth: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.status = 'idle';
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== লগইন ==========
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      
      // ========== রেজিস্ট্রেশন ==========
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      
      // ========== ফেচ ইউজার ==========
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      
      // ========== লগআউট ==========
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.status = 'succeeded';
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // ========== আপডেট প্রোফাইল ==========
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ============================================
// 🔹 Selectors
// ============================================

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.status;
export const selectUserRole = (state: { auth: AuthState }) => state.auth.user?.role;
export const selectUserName = (state: { auth: AuthState }) => state.auth.user?.name;
export const selectUserEmail = (state: { auth: AuthState }) => state.auth.user?.email;
export const selectUserPhone = (state: { auth: AuthState }) => state.auth.user?.phone;
export const selectUserAddress = (state: { auth: AuthState }) => state.auth.user?.address;

// ============================================
// 🔹 Actions Export
// ============================================

export const { logout, clearError, setUser, resetAuth } = authSlice.actions;

// ============================================
// 🔹 Reducer Export
// ============================================

export default authSlice.reducer;