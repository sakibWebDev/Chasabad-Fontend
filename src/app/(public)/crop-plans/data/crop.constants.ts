// data/crops/crop.constants.ts

import { CloudRain, Snowflake, Sun } from 'lucide-react';
import { SeasonInfo, SeasonType } from './crop.types';

// মৌসুমের কনস্ট্যান্ট তথ্য
export const SEASONS: Record<SeasonType, SeasonInfo> = {
  kharif: {
    id: 'kharif',
    name: 'Kharif',
    nameBn: 'খরিফ (বর্ষা)',
    months: 'জুন – নভেম্বর',
    icon: CloudRain,
    color: 'blue',
    gradientFrom: 'from-blue-700',
    gradientTo: 'to-cyan-600'
  },
  rabi: {
    id: 'rabi',
    name: 'Rabi',
    nameBn: 'রবি (শীতকাল)',
    months: 'অক্টোবর – মার্চ',
    icon: Snowflake,
    color: 'indigo',
    gradientFrom: 'from-indigo-600',
    gradientTo: 'to-purple-600'
  },
  summer: {
    id: 'summer',
    name: 'Summer',
    nameBn: 'গ্রীষ্ম/বর্ষা',
    months: 'এপ্রিল – সেপ্টেম্বর',
    icon: Sun,
    color: 'orange',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-amber-600'
  }
};

// মাসের নাম (বাংলা)
export const BANGLA_MONTHS = [
  'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 
  'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 
  'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
];

// ইংরেজি থেকে বাংলা মাসের ম্যাপিং
export const MONTH_MAPPING: Record<string, string> = {
  'January': 'জানুয়ারি',
  'February': 'ফেব্রুয়ারি',
  'March': 'মার্চ',
  'April': 'এপ্রিল',
  'May': 'মে',
  'June': 'জুন',
  'July': 'জুলাই',
  'August': 'আগস্ট',
  'September': 'সেপ্টেম্বর',
  'October': 'অক্টোবর',
  'November': 'নভেম্বর',
  'December': 'ডিসেম্বর'
};

// পানির চাহিদার ধরণ
export const WATER_REQUIREMENTS = {
  LOW: 'কম',
  MEDIUM: 'মাঝারি',
  HIGH: 'অধিক',
  STOP: 'বন্ধ'
} as const;

// ফসলের অসুবিধার ধরণ
export const DIFFICULTY_LEVELS = {
  EASY: 'সহজ',
  MODERATE: 'মাঝারি',
  ADVANCED: 'কঠিন'
} as const;

// ডিফল্ট ভ্যালু
export const DEFAULTS = {
  EXPECTED_YIELD: 'তথ্য নেই',
  STORAGE_DAYS: 'তথ্য নেই',
  MARKET_PRICE: 'তথ্য নেই'
} as const;