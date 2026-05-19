// lib/features/users/usersSlice.ts - Complete working version
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  image?: string;
  createdAt: string;
  updatedAt?: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

// Fetch all users with pagination and filters
export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }, { rejectWithValue }) => {
    try {
      // Build query params - only include valid filters
      const queryParams: string[] = [];
      
      queryParams.push(`page=${params.page || 1}`);
      queryParams.push(`limit=${params.limit || 10}`);
      
      if (params.search && params.search.trim()) {
        queryParams.push(`search=${encodeURIComponent(params.search.trim())}`);
      }
      
      if (params.role && params.role !== 'all' && params.role !== '') {
        queryParams.push(`role=${params.role}`);
      }
      
      if (params.status && params.status !== 'all' && params.status !== '') {
        queryParams.push(`status=${params.status}`);
      }
      
      if (params.startDate && params.startDate !== '') {
        queryParams.push(`startDate=${params.startDate}`);
      }
      
      if (params.endDate && params.endDate !== '') {
        queryParams.push(`endDate=${params.endDate}`);
      }
      
      const url = `/api/v1/admin/all-users?${queryParams.join('&')}`;
      console.log('Fetching users URL:', url);
      
      const response = await axiosInstance.get(url);
      console.log('API Response:', response.data);
      
      const result = response.data;
      
      // Handle different response structures
      if (result?.success) {
        const usersData = result.data?.data || result.data || [];
        const meta = result.data?.meta || {
          page: params.page || 1,
          limit: params.limit || 10,
          total: Array.isArray(usersData) ? usersData.length : 0,
          totalPages: 1,
        };
        
        return {
          users: Array.isArray(usersData) ? usersData : [],
          meta,
        };
      }
      
      // Fallback for direct array response
      if (Array.isArray(result)) {
        return {
          users: result,
          meta: {
            page: params.page || 1,
            limit: params.limit || 10,
            total: result.length,
            totalPages: 1,
          },
        };
      }
      
      return rejectWithValue('Invalid response format from server');
    } catch (error: any) {
      console.error('Fetch users error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/admin/users/${userId}`);
      
      if (response.data?.success) {
        return userId;
      }
      
      return rejectWithValue(response.data?.message || 'Failed to delete user');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
    },
    resetPagination: (state) => {
      state.pagination.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = {
          page: action.payload.meta.page,
          limit: action.payload.meta.limit,
          total: action.payload.meta.total,
          totalPages: action.payload.meta.totalPages,
        };
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.pagination.total -= 1;
        state.pagination.totalPages = Math.ceil(state.pagination.total / state.pagination.limit);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setPage, setLimit, resetPagination } = usersSlice.actions;
export default usersSlice.reducer;