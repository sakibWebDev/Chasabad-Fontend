import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  category: string;
  season_id: string[];
  difficulty: string[];
  minPrice: number;
  maxPrice: number;
  organic: boolean;
  exportPotential: boolean;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
  viewMode: 'grid' | 'list';
}

const initialState: FilterState = {
  category: '',
  season_id: [],
  difficulty: [],
  minPrice: 0,
  maxPrice: 100000,
  organic: false,
  exportPotential: false,
  search: '',
  sortBy: 'created_at',
  sortOrder: 'desc',
  page: 1,
  limit: 12,
  viewMode: 'grid',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      state.page = 1;
    },
    toggleSeason: (state, action: PayloadAction<string>) => {
      if (state.season_id.includes(action.payload)) {
        state.season_id = state.season_id.filter(id => id !== action.payload);
      } else {
        state.season_id.push(action.payload);
      }
      state.page = 1;
    },
    toggleDifficulty: (state, action: PayloadAction<string>) => {
      if (state.difficulty.includes(action.payload)) {
        state.difficulty = state.difficulty.filter(d => d !== action.payload);
      } else {
        state.difficulty.push(action.payload);
      }
      state.page = 1;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
      state.page = 1;
    },
    toggleOrganic: (state) => {
      state.organic = !state.organic;
      state.page = 1;
    },
    toggleExport: (state) => {
      state.exportPotential = !state.exportPotential;
      state.page = 1;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.page = 1;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    resetFilters: (state) => {
      state.category = '';
      state.season_id = [];
      state.difficulty = [];
      state.minPrice = 0;
      state.maxPrice = 100000;
      state.organic = false;
      state.exportPotential = false;
      state.search = '';
      state.page = 1;
      state.limit = 12;
    },
  },
});

export const {
  setCategory,
  toggleSeason,
  toggleDifficulty,
  setPriceRange,
  toggleOrganic,
  toggleExport,
  setSearch,
  setSortBy,
  setPage,
  setLimit,
  setViewMode,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;