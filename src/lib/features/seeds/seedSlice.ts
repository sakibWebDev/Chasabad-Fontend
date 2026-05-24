import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

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
  season_id?: string[];
  difficulty?: string[];
  minPrice?: number;
  maxPrice?: number;
  organic?: boolean;
  export?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface SeedState {
  items: Seed[];
  total: number;
  loading: boolean;
  error: string | null;
  selectedSeed: Seed | null;
  featuredSeeds: Seed[];
  pagination: PaginationInfo;
}

const initialState: SeedState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  selectedSeed: null,
  featuredSeeds: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

// Fetch all seeds with filters
export const fetchSeeds = createAsyncThunk(
  'seeds/fetchAll',
  async (params: FilterParams, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.category && params.category !== '') {
        queryParams.append('category', params.category);
      }
      
      if (params.season_id && params.season_id.length > 0) {
        queryParams.append('season_id', params.season_id.join(','));
      }
      
      if (params.difficulty && params.difficulty.length > 0) {
        queryParams.append('difficulty', params.difficulty.join(','));
      }
      
      if (params.minPrice !== undefined && params.minPrice !== null && params.minPrice > 0) {
        queryParams.append('minPrice', params.minPrice.toString());
      }
      
      if (params.maxPrice !== undefined && params.maxPrice !== null && params.maxPrice < 100000) {
        queryParams.append('maxPrice', params.maxPrice.toString());
      }
      
      if (params.organic) {
        queryParams.append('organic', 'true');
      }
      
      if (params.export) {
        queryParams.append('export', 'true');
      }
      
      if (params.search && params.search !== '') {
        queryParams.append('search', params.search);
      }
      
      if (params.page) {
        queryParams.append('page', params.page.toString());
      }
      
      if (params.limit) {
        queryParams.append('limit', params.limit.toString());
      }
      
      const url = `/api/v1/seeds/get-all?${queryParams.toString()}`;
      console.log('Fetching seeds from:', url);
      
      const response = await axiosInstance.get(url);
      console.log('API Response:', response.data);
      
      return response.data;
    } catch (error: unknown) {
      console.error('Fetch seeds error:', error);
      return rejectWithValue((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to fetch seeds');
    }
  }
);

// Fetch featured seeds
export const fetchFeaturedSeeds = createAsyncThunk(
  'seeds/fetchFeatured',
  async (limit: number = 10, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/seeds/featured?limit=${limit}`);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to fetch featured seeds');
    }
  }
);

// Fetch single seed by ID
export const fetchSeedById = createAsyncThunk(
  'seeds/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/seeds/${id}`);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to fetch seed');
    }
  }
);

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
      state.pagination = initialState.pagination;
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
        
        const responseData = action.payload;
        
        // Handle response from your API
        if (responseData.success) {
          // Get items from response
          if (responseData.data && Array.isArray(responseData.data)) {
            state.items = responseData.data;
          } else {
            state.items = [];
          }
          
          // Get total from meta
          if (responseData.meta) {
            state.total = responseData.meta.total;
            state.pagination = {
              currentPage: responseData.meta.page,
              totalPages: responseData.meta.totalPages,
              totalItems: responseData.meta.total,
              itemsPerPage: responseData.meta.limit,
              hasNextPage: responseData.meta.hasNextPage,
              hasPrevPage: responseData.meta.hasPrevPage
            };
          } else {
            state.total = state.items.length;
            state.pagination = {
              currentPage: 1,
              totalPages: Math.ceil(state.items.length / 12),
              totalItems: state.items.length,
              itemsPerPage: 12,
              hasNextPage: false,
              hasPrevPage: false
            };
          }
        } else {
          state.items = [];
          state.total = 0;
          state.error = responseData.message || 'Failed to fetch seeds';
        }
        
        console.log('Seeds loaded:', {
          itemsCount: state.items.length,
          total: state.total,
          pagination: state.pagination
        });
      })
      .addCase(fetchSeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error('Fetch seeds rejected:', action.payload);
      })
      
      // Fetch featured seeds
      .addCase(fetchFeaturedSeeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedSeeds.fulfilled, (state, action) => {
        state.loading = false;
        const responseData = action.payload;
        if (responseData.data && Array.isArray(responseData.data)) {
          state.featuredSeeds = responseData.data;
        } else if (responseData.seeds && Array.isArray(responseData.seeds)) {
          state.featuredSeeds = responseData.seeds;
        } else if (Array.isArray(responseData)) {
          state.featuredSeeds = responseData;
        } else {
          state.featuredSeeds = [];
        }
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
        const responseData = action.payload;
        if (responseData.data) {
          state.selectedSeed = responseData.data;
        } else if (responseData.seed) {
          state.selectedSeed = responseData.seed;
        } else {
          state.selectedSeed = responseData;
        }
      })
      .addCase(fetchSeedById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedSeed, clearError, clearSeeds } = seedSlice.actions;
export default seedSlice.reducer;