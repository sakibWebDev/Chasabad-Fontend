// API Response Wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Seed API Response
export interface SeedListResponse {
  success: boolean;
  data: Seed[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SingleSeedResponse {
  success: boolean;
  data: Seed;
}

export interface StatisticsResponse {
  success: boolean;
  data: {
    total: number;
    organic: number;
    export: number;
    byCategory: Array<{ category: string; _count: number }>;
    byDifficulty: Array<{ difficulty: string; _count: number }>;
  };
}