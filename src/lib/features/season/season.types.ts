// types/season.types.ts

export interface SeasonSummary {
  id: string;
  seasonId: string;
  title: string;
  seasonCode: string;
  icon: string | null;
  color: string | null;
}

export interface SeasonDetail extends SeasonSummary {
  title_en: string | null;
  description: string | null;
  description_en: string | null;
  season: string | null;
  bengali_months: any;
  bangla_months_details: any;
  planting_months: any;
  harvesting_period: any;
  soil_type: string | null;
  soil_type_enum: string | null;
  water_requirements: string | null;
  irrigation_type: string | null;
  temperature_min: number | null;
  temperature_max: number | null;
  humidity_range: string | null;
  rainfall_range: string | null;
  wind_speed_range: string | null;
  average_daylight: string | null;
  suitable_crops_count: number | null;
  challenges: any[];
  tips: any[];
  festivals: any[];
  government_schemes: any[];
  seeds: {
    id: string;
    name: string;
    image: string | null;
  }[];
}

export interface CreateSeasonPayload {
  seasonId: string;
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  season?: string;
  seasonCode: string;
  bengali_months?: any;
  bangla_months_details?: any;
  planting_months?: any;
  harvesting_period?: any;
  soil_type?: string;
  soil_type_enum?: string;
  water_requirements?: string;
  irrigation_type?: string;
  icon?: string;
  color?: string;
  temperature_min?: number;
  temperature_max?: number;
  humidity_range?: string;
  rainfall_range?: string;
  wind_speed_range?: string;
  average_daylight?: string;
  suitable_crops_count?: number;
  challenges?: any[];
  tips?: any[];
  festivals?: any[];
  government_schemes?: any[];
}

export interface SeasonsState {
  list: SeasonSummary[];
  selectedSeason: SeasonDetail | null;
  selectedSeasonIds: string[]; // Add this line
  loading: {
    list: boolean;
    detail: boolean;
    create: boolean;
  };
  error: {
    list: string | null;
    detail: string | null;
    create: string | null;
  };
}