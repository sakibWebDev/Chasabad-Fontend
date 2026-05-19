// data/crops/crop.types.ts

// বৃদ্ধির ধাপের টাইপ
export interface GrowthStage {
  week: number | string;
  stageName: string;
  description: string;
  careTasks: string[];
}

// মাসভিত্তিক তথ্যের টাইপ
export interface MonthlyDetail {
  month: string;
  activities: string[];
  growthStage: string;
  waterRequirement: string;
  pestRisks: string[];
}

// ফসল তোলা সংক্রান্ত তথ্যের টাইপ
export interface HarvestData {
  expectedYield: string;
  harvestMethod: string;
  storageDays: string;
  marketPrice: string;
  bestSellingTime: string;
}

// সার প্রয়োগের টাইপ
export interface FertilizerItem {
  stage: string;
  fertilizer: string;
  quantity: string;
}

// রোগের টাইপ
export interface DiseaseItem {
  name: string;
  symptom: string;
  solution: string;
}

// সেচের টাইপ
export interface IrrigationItem {
  stage: string;
  frequency: string;
  method: string;
}

// প্রধান ফসল ডাটা টাইপ
export interface CropData {
  id: number;
  name: string;
  icon: React.ElementType;
  season: string;
  seasonIcon?: React.ElementType;
  month: string;
  sowingWindow: string;
  harvestWindow: string;
  totalDays: number;
  variety: string;
  climate: string;
  soilType: string;
  seedRate: string;
  spacing: string;
  monthlyTimeline: MonthlyDetail[];
  growthStages: GrowthStage[];
  harvestInfo: HarvestData;
  fertilizerSchedule: FertilizerItem[];
  diseaseList: DiseaseItem[];
  irrigationSchedule: IrrigationItem[];
}

// মৌসুমের ধরন
export type SeasonType = 'kharif' | 'rabi' | 'summer';

// মৌসুমের তথ্য
export interface SeasonInfo {
  id: SeasonType;
  name: string;
  nameBn: string;
  months: string;
  icon: React.ElementType;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}