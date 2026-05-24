import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

export interface CountData {
  categories: {
    ধান: number;
    সবজি: number;
    ফল: number;
    ফুল: number;
    মসলা: number;
    তেলবীজ: number;
    ডাল: number;
    ঔষধি: number;
  };
  difficulties: {
    EASY: number;
    MEDIUM: number;
    HARD: number;
  };
  seasons: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  sidebar: {
    allProducts: number;
    seeds: number;
    plants: number;
    tools: number;
  };
}

interface CountState {
  data: CountData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CountState = {
  data: null,
  loading: false,
  error: null,
};

// Fetch all counts
export const fetchAllCounts = createAsyncThunk(
  'counts/fetchAllCounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/v1/seeds/counts/all');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch counts');
    }
  }
);

const countSlice = createSlice({
  name: 'counts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default countSlice.reducer;