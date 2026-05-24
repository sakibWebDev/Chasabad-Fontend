// store/slices/seasonSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '@/lib/axios';

import { 
  SeasonsState, 
  SeasonSummary, 
  SeasonDetail, 
  CreateSeasonPayload 
} from './season.types';

// Base API URL - adjust based on your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Initial state
const initialState: SeasonsState = {
  list: [],
  selectedSeason: null,
  selectedSeasonIds: [], // Add this line
  loading: {
    list: false,
    detail: false,
    create: false,
  },
  error: {
    list: null,
    detail: null,
    create: null,
  },
};

// ============ Async Thunks ============

// Get all seasons
export const fetchAllSeasons = createAsyncThunk<
  SeasonSummary[],
  void,
  { rejectValue: string }
>('seasons/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/v1/season/get-all');
    // Ensure each season has an id field
    const seasons = response.data.data.map((season: any) => ({
      ...season,
      id: season.id || season.seasonId // Fallback to seasonId if id is missing
    }));
    return seasons;
  } catch (error: unknown) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : error instanceof Error
      ? error.message
      : 'Failed to fetch seasons';
    return rejectWithValue(message || 'Failed to fetch seasons');
  }
});

// Get season by ID
export const fetchSeasonById = createAsyncThunk<
  SeasonDetail,
  string,
  { rejectValue: string }
>('seasons/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/api/v1/season/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : error instanceof Error
      ? error.message
      : 'Failed to fetch season details';
    return rejectWithValue(message || 'Failed to fetch season details');
  }
});

// Create new season (Admin only)
export const createNewSeason = createAsyncThunk<
  SeasonDetail,
  CreateSeasonPayload,
  { rejectValue: string }
>('seasons/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/api/v1/season/create', payload);
    // Ensure the created season has an id
    const newSeason = {
      ...response.data.data,
      id: response.data.data.id || response.data.data.seasonId
    };
    return newSeason;
  } catch (error: unknown) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : error instanceof Error
      ? error.message
      : 'Failed to create season';
    return rejectWithValue(message || 'Failed to create season');
  }
});

// Update season (Admin only)
export const updateSeason = createAsyncThunk<
  SeasonDetail,
  { id: string; data: Partial<CreateSeasonPayload> },
  { rejectValue: string }
>('seasons/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/api/v1/season/${id}`, data);
    return response.data.data;
  } catch (error: unknown) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : error instanceof Error
      ? error.message
      : 'Failed to update season';
    return rejectWithValue(message || 'Failed to update season');
  }
});

// Delete season (Admin only)
export const deleteSeason = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('seasons/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/api/v1/season/${id}`);
    return id;
  } catch (error: unknown) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : error instanceof Error
      ? error.message
      : 'Failed to delete season';
    return rejectWithValue(message || 'Failed to delete season');
  }
});

// ============ Slice ============

const seasonSlice = createSlice({
  name: 'seasons',
  initialState,
  reducers: {
    clearSelectedSeason: (state) => {
      state.selectedSeason = null;
      state.error.detail = null;
    },
    clearErrors: (state) => {
      state.error = {
        list: null,
        detail: null,
        create: null,
      };
    },
    clearAllSeasons: (state) => {
      state.list = [];
      state.selectedSeason = null;
      state.selectedSeasonIds = []; // Clear selected IDs too
    },
    toggleSeason: (state, action: PayloadAction<string>) => {
      const seasonId = action.payload;
      const index = state.selectedSeasonIds.indexOf(seasonId);
      if (index === -1) {
        state.selectedSeasonIds.push(seasonId);
      } else {
        state.selectedSeasonIds.splice(index, 1);
      }
    },
    setSelectedSeasons: (state, action: PayloadAction<string[]>) => {
      state.selectedSeasonIds = action.payload;
    },
    clearSelectedSeasons: (state) => {
      state.selectedSeasonIds = [];
    },
    selectAllSeasons: (state) => {
      state.selectedSeasonIds = state.list.map(season => season.id);
    },
    deselectAllSeasons: (state) => {
      state.selectedSeasonIds = [];
    },
  },
  extraReducers: (builder) => {
    // ===== Fetch All Seasons =====
    builder
      .addCase(fetchAllSeasons.pending, (state) => {
        state.loading.list = true;
        state.error.list = null;
      })
      .addCase(fetchAllSeasons.fulfilled, (state, action: PayloadAction<SeasonSummary[]>) => {
        state.loading.list = false;
        state.list = action.payload;
      })
      .addCase(fetchAllSeasons.rejected, (state, action) => {
        state.loading.list = false;
        state.error.list = action.payload || 'Failed to fetch seasons';
      });

    // ===== Fetch Season By ID =====
    builder
      .addCase(fetchSeasonById.pending, (state) => {
        state.loading.detail = true;
        state.error.detail = null;
      })
      .addCase(fetchSeasonById.fulfilled, (state, action: PayloadAction<SeasonDetail>) => {
        state.loading.detail = false;
        state.selectedSeason = action.payload;
      })
      .addCase(fetchSeasonById.rejected, (state, action) => {
        state.loading.detail = false;
        state.error.detail = action.payload || 'Failed to fetch season details';
      });

    // ===== Create Season =====
    builder
      .addCase(createNewSeason.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createNewSeason.fulfilled, (state, action: PayloadAction<SeasonDetail>) => {
        state.loading.create = false;
        // Add the new season to the list
        state.list.unshift({
          id: action.payload.id,
          seasonId: action.payload.seasonId,
          title: action.payload.title,
          seasonCode: action.payload.seasonCode,
          icon: action.payload.icon,
          color: action.payload.color,
        });
      })
      .addCase(createNewSeason.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload || 'Failed to create season';
      });

    // ===== Update Season =====
    builder
      .addCase(updateSeason.pending, (state) => {
        state.loading.detail = true;
        state.error.detail = null;
      })
      .addCase(updateSeason.fulfilled, (state, action: PayloadAction<SeasonDetail>) => {
        state.loading.detail = false;
        state.selectedSeason = action.payload;
        // Update the season in the list
        const index = state.list.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = {
            id: action.payload.id,
            seasonId: action.payload.seasonId,
            title: action.payload.title,
            seasonCode: action.payload.seasonCode,
            icon: action.payload.icon,
            color: action.payload.color,
          };
        }
      })
      .addCase(updateSeason.rejected, (state, action) => {
        state.loading.detail = false;
        state.error.detail = action.payload || 'Failed to update season';
      });

    // ===== Delete Season =====
    builder
      .addCase(deleteSeason.pending, (state) => {
        state.loading.list = true;
      })
      .addCase(deleteSeason.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.list = false;
        state.list = state.list.filter(season => season.id !== action.payload);
        if (state.selectedSeason?.id === action.payload) {
          state.selectedSeason = null;
        }
        state.selectedSeasonIds = state.selectedSeasonIds.filter(id => id !== action.payload);
      })
      .addCase(deleteSeason.rejected, (state, action) => {
        state.loading.list = false;
        state.error.list = action.payload || 'Failed to delete season';
      });
  },
});

export const { 
  clearSelectedSeason, 
  clearErrors, 
  clearAllSeasons,
  toggleSeason,
  setSelectedSeasons,
  clearSelectedSeasons,
  selectAllSeasons,
  deselectAllSeasons
} = seasonSlice.actions;

export default seasonSlice.reducer;