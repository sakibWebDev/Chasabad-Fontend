import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// Types
export interface Seed {
  id: string;
  seedId: string;
  name: string;
  name_en: string;
  scientific_name: string;
  category: string;
  sub_category: string;
  season_id: string;
  season?: {
    id: string;
    title: string;
    seasonCode: string;
  };
  image: string;
  image_gallery: string[];
  video_url?: string;
  icon: string;
  variety_type: string;
  origin_country: string;
  origin_region: string;
  year_of_introduction: number;
  germination_time: string;
  germination_days: number;
  maturity_time: string;
  maturity_days: number;
  spacing: string;
  depth: string;
  depth_cm: number;
  sunlight: string;
  watering: string;
  difficulty: string;
  soil_type: string;
  soil_type_enum: string;
  temperature: string;
  temperature_min: number;
  temperature_max: number;
  rainfall: string;
  rainfall_min_mm: number;
  rainfall_max_mm: number;
  ph_range: string;
  ph_min: number;
  ph_max: number;
  altitude_range?: string;
  wind_tolerance?: string;
  yield_per_hectare: string;
  yield_min_kg: number;
  yield_max_kg: number;
  harvest_method: string;
  storage: string;
  storage_days: number;
  benefits: string[];
  benefits_bn: string[];
  precautions: string[];
  precautions_bn: string[];
  special_notes: string;
  special_notes_bn?: string;
  nutritional_value?: any;
  medicinal_uses: string[];
  commercial_uses: string[];
  export_potential: boolean;
  organic_certified: boolean;
  market_price: number;
  seed_cost: number;
  expected_profit: number;
  carbon_footprint?: number;
  water_footprint?: number;
  sustainable_practices: string[];
  created_at: string;
  updated_at: string;
}

export interface FilterParams {
  category?: string;
  season_id?: string;
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
  organic?: boolean;
  export?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

interface SeedState {
  items: Seed[];
  total: number;
  loading: boolean;
  error: string | null;
  selectedSeed: Seed | null;
  featuredSeeds: Seed[];
  statistics: {
    total: number;
    organic: number;
    export: number;
    byCategory: Array<{ category: string; _count: number }>;
    byDifficulty: Array<{ difficulty: string; _count: number }>;
  } | null;
}

const initialState: SeedState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  selectedSeed: null,
  featuredSeeds: [],
  statistics: null,
};

// ============================================
// Async Thunks (Backend Routes অনুযায়ী)
// ============================================

// GET /seeds/get-all - সব বীজ পাওয়ার জন্য
export const fetchSeeds = createAsyncThunk(
  'seeds/fetchAll',
  async (params: FilterParams, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.category) queryParams.append('category', params.category);
    //   if (params.season_id) queryParams.append('season_id', params.season_id);
    //   if (params.difficulty) queryParams.append('difficulty', params.difficulty);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
      if (params.organic) queryParams.append('organic', 'true');
      if (params.export) queryParams.append('export', 'true');
      if (params.search) queryParams.append('search', params.search);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      
      const response = await axiosInstance.get(`/api/v1/seeds/get-all?${queryParams.toString()}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch seeds');
    }
  }
);

// GET /seeds/featured - ফিচার্ড বীজ পাওয়ার জন্য
export const fetchFeaturedSeeds = createAsyncThunk(
  'seeds/fetchFeatured',
  async (limit: number = 10, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/seeds/featured?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured seeds');
    }
  }
);

// GET /seeds/search - সার্চ করার জন্য
export const searchSeeds = createAsyncThunk(
  'seeds/search',
  async ({ query, limit }: { query: string; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/seeds/search?q=${query}&limit=${limit || 20}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search seeds');
    }
  }
);

// GET /seeds/statistics - স্ট্যাটিস্টিক্স পাওয়ার জন্য
export const fetchSeedStatistics = createAsyncThunk(
  'seeds/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/seeds/statistics`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch statistics');
    }
  }
);

// GET /seeds/category/:category - ক্যাটাগরি অনুযায়ী বীজ পাওয়ার জন্য
export const fetchSeedsByCategory = createAsyncThunk(
  'seeds/fetchByCategory',
  async ({ category, limit }: { category: string; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/seeds/category/${category}?limit=${limit || 20}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch seeds by category');
    }
  }
);

// GET /seeds/difficulty/:difficulty - অসুবিধা অনুযায়ী বীজ পাওয়ার জন্য
export const fetchSeedsByDifficulty = createAsyncThunk(
  'seeds/fetchByDifficulty',
  async ({ difficulty, limit }: { difficulty: string; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/seeds/difficulty/${difficulty}?limit=${limit || 20}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch seeds by difficulty');
    }
  }
);

// GET /seeds/season/:seasonId - মৌসুম অনুযায়ী বীজ পাওয়ার জন্য
export const fetchSeedsBySeason = createAsyncThunk(
  'seeds/fetchBySeason',
  async ({ seasonId, limit }: { seasonId: string; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/seeds/season/${seasonId}?limit=${limit || 20}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch seeds by season');
    }
  }
);

// GET /seeds/:id - সিঙ্গেল বীজ পাওয়ার জন্য
export const fetchSeedById = createAsyncThunk(
  'seeds/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/seeds/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch seed');
    }
  }
);

// POST /seeds/create - নতুন বীজ তৈরি করার জন্য (Admin only)
export const createSeed = createAsyncThunk(
  'seeds/create',
  async (seedData: Partial<Seed>, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/v1/seeds/create`, seedData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create seed');
    }
  }
);

// PUT /seeds/:id - বীজ আপডেট করার জন্য (Admin only)
export const updateSeed = createAsyncThunk(
  'seeds/update',
  async ({ id, data }: { id: string; data: Partial<Seed> }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/v1/seeds/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update seed');
    }
  }
);

// DELETE /seeds/:id - বীজ ডিলিট করার জন্য (Admin only)
export const deleteSeed = createAsyncThunk(
  'seeds/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/seeds/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete seed');
    }
  }
);

// ============================================
// Slice
// ============================================
const seedSlice = createSlice({
  name: 'seeds',
  initialState,
  reducers: {
    clearSelectedSeed: (state) => {
      state.selectedSeed = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSeeds: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all seeds
      .addCase(fetchSeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || action.payload;
        state.total = action.payload.pagination?.total || action.payload.data?.length || 0;
      })
      .addCase(fetchSeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch featured seeds
      .addCase(fetchFeaturedSeeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedSeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredSeeds = action.payload.data || action.payload;
      })
      .addCase(fetchFeaturedSeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch seed by id
      .addCase(fetchSeedById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeedById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSeed = action.payload.data || action.payload;
      })
      .addCase(fetchSeedById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch statistics
      .addCase(fetchSeedStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload.data || action.payload;
      })
      
      // Search seeds
      .addCase(searchSeeds.fulfilled, (state, action) => {
        state.items = action.payload.data || action.payload;
        state.total = action.payload.data?.length || 0;
      })
      
      // Fetch by category
      .addCase(fetchSeedsByCategory.fulfilled, (state, action) => {
        state.items = action.payload.data || action.payload;
        state.total = action.payload.data?.length || 0;
      })
      
      // Create seed
      .addCase(createSeed.fulfilled, (state, action) => {
        state.items.unshift(action.payload.data || action.payload);
        state.total += 1;
      })
      
      // Update seed
      .addCase(updateSeed.fulfilled, (state, action) => {
        const updatedSeed = action.payload.data || action.payload;
        const index = state.items.findIndex((item) => item.id === updatedSeed.id);
        if (index !== -1) {
          state.items[index] = updatedSeed;
        }
        if (state.selectedSeed?.id === updatedSeed.id) {
          state.selectedSeed = updatedSeed;
        }
      })
      
      // Delete seed
      .addCase(deleteSeed.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.items = state.items.filter((item) => item.id !== deletedId);
        state.total -= 1;
        if (state.selectedSeed?.id === deletedId) {
          state.selectedSeed = null;
        }
      });
  },
});

export const { clearSelectedSeed, clearError, clearSeeds } = seedSlice.actions;
export default seedSlice.reducer;