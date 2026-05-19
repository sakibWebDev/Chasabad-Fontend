// data/crops/crop.utils.ts

import { CloudRain, Snowflake, Sun } from 'lucide-react';
import { CropData, SeasonType } from './crop.types';
import { SEASONS, MONTH_MAPPING } from './crop.constants';

// মৌসুম অনুযায়ী আইকন পাওয়া
export const getSeasonIcon = (seasonName: string) => {
  if (seasonName.includes('খরিফ') || seasonName.includes('বর্ষা')) return CloudRain;
  if (seasonName.includes('রবি') || seasonName.includes('শীত')) return Snowflake;
  return Sun;
};

// মৌসুম অনুযায়ী গ্রেডিয়েন্ট কালার পাওয়া
export const getSeasonGradient = (seasonName: string): string => {
  if (seasonName.includes('খরিফ') || seasonName.includes('বর্ষा')) {
    return 'from-blue-700 to-cyan-600';
  }
  if (seasonName.includes('রবি') || seasonName.includes('শীত')) {
    return 'from-indigo-600 to-purple-600';
  }
  return 'from-orange-500 to-amber-600';
};

// মৌসুমের আইডি অনুযায়ী তথ্য পাওয়া
export const getSeasonById = (id: SeasonType) => {
  return SEASONS[id];
};

// মৌসুমের নাম অনুযায়ী তথ্য পাওয়া
export const getSeasonByName = (nameBn: string) => {
  return Object.values(SEASONS).find(season => season.nameBn === nameBn);
};

// ফসলসমূহ মৌসুম ও মাস অনুযায়ী গ্রুপ করা
export const groupCropsBySeasonAndMonth = (cropsData: CropData[]) => {
  const grouped: { [season: string]: { [month: string]: CropData[] } } = {};
  
  cropsData.forEach(crop => {
    if (!grouped[crop.season]) {
      grouped[crop.season] = {};
    }
    if (!grouped[crop.season][crop.month]) {
      grouped[crop.season][crop.month] = [];
    }
    grouped[crop.season][crop.month].push(crop);
  });
  
  return grouped;
};

// মাসের নাম ইংরেজি থেকে বাংলায় কনভার্ট
export const convertToBanglaMonth = (englishMonth: string): string => {
  return MONTH_MAPPING[englishMonth] || englishMonth;
};

// সার্চ টার্ম অনুযায়ী ফসল ফিল্টার করা
export const filterCropsBySearchTerm = (crops: CropData[], searchTerm: string): CropData[] => {
  if (!searchTerm) return crops;
  const term = searchTerm.toLowerCase();
  return crops.filter(crop => 
    crop.name.toLowerCase().includes(term) ||
    crop.season.toLowerCase().includes(term) ||
    crop.variety.toLowerCase().includes(term)
  );
};

// আইডি অনুযায়ী ফসল পাওয়া
export const getCropById = (cropsData: CropData[], id: number): CropData | undefined => {
  return cropsData.find(crop => crop.id === id);
};

// সব মৌসুমের তালিকা পাওয়া
export const getAllSeasons = () => {
  return Object.values(SEASONS);
};

// নির্দিষ্ট মৌসুমের সব ফসল পাওয়া
export const getCropsBySeason = (cropsData: CropData[], seasonName: string): CropData[] => {
  return cropsData.filter(crop => crop.season === seasonName);
};

// নির্দিষ্ট মাসের সব ফসল পাওয়া
export const getCropsByMonth = (cropsData: CropData[], month: string): CropData[] => {
  return cropsData.filter(crop => crop.month === month);
};

// ফসলের মোট সংখ্যা
export const getTotalCropsCount = (cropsData: CropData[]): number => {
  return cropsData.length;
};

// মৌসুম ভিত্তিক ফসলের সংখ্যা
export const getCropsCountBySeason = (cropsData: CropData[]): Record<string, number> => {
  const count: Record<string, number> = {};
  cropsData.forEach(crop => {
    count[crop.season] = (count[crop.season] || 0) + 1;
  });
  return count;
};