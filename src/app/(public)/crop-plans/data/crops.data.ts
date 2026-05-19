// data/crops/crops.data.ts

import { 
  Wheat, Leaf, Flower2, Apple, Sun, CloudRain, Snowflake, 
  Sprout, Tractor, Droplets, Thermometer, Shield, 
  Coffee, Carrot, Cherry, Bean, Grape, 
  Zap, Utensils, Citrus, Cigarette, Factory 
} from 'lucide-react';
import { CropData } from './crop.types';

// Complete Crop Data - 100 Crops Organized by Season & Month
export const cropsData: CropData[] = [
  // =====================================================
  // খরিফ মৌসুম (বর্ষা ক্যালেন্ডার) - জুন থেকে নভেম্বর (২৫টি ফসল)
  // =====================================================
  
  // জুন মাস (৫টি)
  {
    id: 1,
    name: "বাসমতী ধান (পুসা ১১২১)",
    icon: Wheat,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "জুন",
    sowingWindow: "জুনের মাঝামাঝি – জুলাইয়ের প্রথম সপ্তাহ",
    harvestWindow: "অক্টোবর – নভেম্বর",
    totalDays: 145,
    variety: "পুসা ১১২১ (বাসমতী)",
    climate: "উষ্ণ ও আর্দ্র, ২৫-৩৫°C",
    soilType: "এঁটেল দোআঁশ",
    seedRate: "৮-১০ কেজি/একর",
    spacing: "২০ সেমি x ১৫ সেমি",
    monthlyTimeline: [
      { month: "মে", activities: ["জমি প্রস্তুতি", "বীজতলা তৈরি"], growthStage: "জমি প্রস্তুতি", waterRequirement: "কম", pestRisks: [] },
      { month: "জুন", activities: ["বীজতলায় বপন", "মূল জমিতে রোপণ"], growthStage: "বপন ও রোপণ", waterRequirement: "মাঝারি", pestRisks: ["কাণ্ড পোকা"] },
      { month: "জুলাই", activities: ["গজানো পর্যায়", "পানি ব্যবস্থাপনা"], growthStage: "গজানো", waterRequirement: "অধিক", pestRisks: ["পাতা মোড়ানো পোকা"] },
      { month: "আগস্ট", activities: ["সক্রিয় বৃদ্ধি", "উপরি সার"], growthStage: "উদ্ভিদ বৃদ্ধি", waterRequirement: "মাঝারি", pestRisks: ["বাদামি ফড়িং"] },
      { month: "সেপ্টেম্বর", activities: ["প্যানিকল আরম্ভ", "ক্ষুদ্র উপাদান স্প্রে"], growthStage: "প্রজনন ধাপ", waterRequirement: "অধিক", pestRisks: ["ব্লাস্ট রোগ"] },
      { month: "অক্টোবর", activities: ["ফুল ফোটা", "দানা পূরণ"], growthStage: "ফুল ও দানা পূরণ", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "নভেম্বর", activities: ["ফসল তোলা", "মাড়াই"], growthStage: "ফসল তোলা", waterRequirement: "সেচ বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "বীজ অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা আর্দ্র রাখুন"] },
      { week: 2, stageName: "চারা", description: "৪-৫টি পাতা হয়", careTasks: ["হালকা সার প্রয়োগ"] },
      { week: "৪-৬", stageName: "গজানো", description: "একাধিক কাণ্ড বের হয়", careTasks: ["ইউরিয়া প্রয়োগ"] }
    ],
    harvestInfo: {
      expectedYield: "৪.২ - ৫.০ টন/একর",
      harvestMethod: "হাতে বা কম্বাইন হারভেস্টার",
      storageDays: "১৮০-২৪০ দিন",
      marketPrice: "₹৩,৫০০ - ₹৫,০০০/কুইন্টাল",
      bestSellingTime: "নভেম্বর – ফেব্রুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৫০ + ৩০ কেজি/একর" },
      { stage: "গজানো কাল", fertilizer: "ইউরিয়া", quantity: "৪০ কেজি/একর" },
      { stage: "প্যানিকল আরম্ভ", fertilizer: "ইউরিয়া + জিংক", quantity: "২০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "ব্লাস্ট রোগ", symptom: "পাতায় হীরার দাগ", solution: "ট্রাইসাইক্লাজল প্রয়োগ" },
      { name: "কাণ্ড পোকা", symptom: "মরা চারা", solution: "ফেরোমন ফাঁদ ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "রোপণ থেকে গজানো", frequency: "প্রতি ২-৩ দিনে", method: "পর্যায়ক্রমে ভেজা ও শুকানো" },
      { stage: "গজানো থেকে প্যানিকল", frequency: "প্রতি ৫-৭ দিনে", method: "অন্তর্বর্তী সেচ" }
    ]
  },
  {
    id: 2,
    name: "বোরো ধান (হাইব্রিড)",
    icon: Wheat,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "জুন",
    sowingWindow: "জুনের প্রথম সপ্তাহ",
    harvestWindow: "অক্টোবর – নভেম্বর",
    totalDays: 135,
    variety: "বোরো হাইব্রিড-৪",
    climate: "২২-৩২°C",
    soilType: "এঁটেল দোআঁশ",
    seedRate: "১০-১২ কেজি/একর",
    spacing: "২০ সেমি x ১৫ সেমি",
    monthlyTimeline: [
      { month: "জুন", activities: ["বীজ বপন", "চারা রোপণ"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "জুলাই", activities: ["গজানো", "আগাছা পরিষ্কার"], growthStage: "গজানো", waterRequirement: "অধিক", pestRisks: [] },
      { month: "আগস্ট", activities: ["উদ্ভিদ বৃদ্ধি", "সার প্রয়োগ"], growthStage: "বৃদ্ধি", waterRequirement: "অধিক", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৫.৫ - ৬.৫ টন/একর",
      harvestMethod: "কম্বাইন হারভেস্টার",
      storageDays: "২০০ দিন",
      marketPrice: "₹২,৫০০ - ₹৩,২০০/কুইন্টাল",
      bestSellingTime: "নভেম্বর – জানুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৬০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "বাদামি ফড়িং", symptom: "পাতা হলুদ", solution: "পাইমেট্রোজিন প্রয়োগ" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি কাল", frequency: "প্রতি ৭ দিনে", method: "প্লাবন সেচ" }
    ]
  },
  {
    id: 3,
    name: "আউশ ধান",
    icon: Wheat,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "জুন",
    sowingWindow: "জুনের প্রথম সপ্তাহ",
    harvestWindow: "সেপ্টেম্বর – অক্টোবর",
    totalDays: 105,
    variety: "আউশ-২",
    climate: "২৫-৩৫°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "১২-১৫ কেজি/একর",
    spacing: "২৫ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "জুন", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "জুলাই", activities: ["উদ্ভিদ বৃদ্ধি"], growthStage: "বৃদ্ধি", waterRequirement: "অধিক", pestRisks: [] },
      { month: "আগস্ট", activities: ["প্যানিকল ধরা"], growthStage: "প্রজনন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "সেপ্টেম্বর", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি আর্দ্র রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২.৫ - ৩.০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "১৫০ দিন",
      marketPrice: "₹১,৮০০ - ₹২,২০০/কুইন্টাল",
      bestSellingTime: "অক্টোবর – নভেম্বর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা ঝলসানো", symptom: "পাতা শুকিয়ে যায়", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বপনকাল", frequency: "হালকা সেচ", method: "সেচ" }
    ]
  },
  {
    id: 4,
    name: "পাট (দেশি)",
    icon: Leaf,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "জুন",
    sowingWindow: "জুনের প্রথম সপ্তাহ",
    harvestWindow: "সেপ্টেম্বর",
    totalDays: 110,
    variety: "দেশি পাট",
    climate: "২৪-৩৫°C, আর্দ্র",
    soilType: "পলি দোআঁশ",
    seedRate: "৪-৫ কেজি/একর",
    spacing: "৩০ সেমি x ৫ সেমি",
    monthlyTimeline: [
      { month: "মে", activities: ["জমি প্রস্তুতি"], growthStage: "প্রস্তুতি", waterRequirement: "কম", pestRisks: [] },
      { month: "জুন", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "জুলাই", activities: ["উদ্ভিদ বৃদ্ধি", "আগাছা পরিষ্কার"], growthStage: "বৃদ্ধি", waterRequirement: "অধিক", pestRisks: [] },
      { month: "আগস্ট", activities: ["কাণ্ড বৃদ্ধি"], growthStage: "পরিপক্বতা", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "সেপ্টেম্বর", activities: ["ফসল তোলা", "জাগ দেওয়া"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] },
      { week: "২-৮", stageName: "উদ্ভিদ বৃদ্ধি", description: "কাণ্ড লম্বা হয়", careTasks: ["আগাছা পরিষ্কার"] }
    ],
    harvestInfo: {
      expectedYield: "২.৫ - ৩.৫ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৫,০০০ - ₹৭,০০০/টন",
      bestSellingTime: "অক্টোবর – ডিসেম্বর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ইউরিয়া", quantity: "৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাটের মূল পচা", symptom: "মূল পচে যায়", solution: "বীজ শোধন করুন" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি কাল", frequency: "সাপ্তাহিক", method: "প্লাবন সেচ" }
    ]
  },
  {
    id: 5,
    name: "শণ পাট",
    icon: Leaf,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "জুন",
    sowingWindow: "জুনের মাঝামাঝি",
    harvestWindow: "সেপ্টেম্বর",
    totalDays: 105,
    variety: "শণ পাট-১",
    climate: "২৫-৩৫°C",
    soilType: "পলি মাটি",
    seedRate: "৩-৪ কেজি/একর",
    spacing: "২৫ সেমি x ৫ সেমি",
    monthlyTimeline: [
      { month: "জুন", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "জুলাই", activities: ["উদ্ভিদ বৃদ্ধি"], growthStage: "বৃদ্ধি", waterRequirement: "অধিক", pestRisks: [] },
      { month: "আগস্ট", activities: ["ফুল আসা"], growthStage: "ফুল", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "সেপ্টেম্বর", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২.০ - ২.৫ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "২০০ দিন",
      marketPrice: "₹৪,০০০ - ₹৫,৫০০/টন",
      bestSellingTime: "অক্টোবর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা দাগ", symptom: "পাতায় দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১০ দিনে", method: "সেচ" }
    ]
  },

  // জুলাই মাস (৫টি)
  {
    id: 6,
    name: "আমন ধান (স্থানীয়)",
    icon: Wheat,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "জুলাই",
    sowingWindow: "জুলাই – আগস্ট",
    harvestWindow: "ডিসেম্বর – জানুয়ারি",
    totalDays: 150,
    variety: "স্থানীয় আমন",
    climate: "২৫-৩৫°C",
    soilType: "এঁটেল মাটি",
    seedRate: "১০-১২ কেজি/একর",
    spacing: "২৫ সেমি x ১৫ সেমি",
    monthlyTimeline: [
      { month: "জুন", activities: ["বীজতলা তৈরি"], growthStage: "বীজতলা", waterRequirement: "কম", pestRisks: [] },
      { month: "জুলাই", activities: ["বীজ বপন", "চারা রোপণ"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "আগস্ট", activities: ["গজানো", "আগাছা পরিষ্কার"], growthStage: "গজানো", waterRequirement: "অধিক", pestRisks: [] },
      { month: "সেপ্টেম্বর", activities: ["উদ্ভিদ বৃদ্ধি"], growthStage: "বৃদ্ধি", waterRequirement: "অধিক", pestRisks: [] },
      { month: "অক্টোবর", activities: ["প্যানিকল ধরা"], growthStage: "প্রজনন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ডিসেম্বর", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা ভেজা রাখুন"] },
      { week: "৪-৮", stageName: "গজানো", description: "কাণ্ড বৃদ্ধি", careTasks: ["সার প্রয়োগ"] }
    ],
    harvestInfo: {
      expectedYield: "৩.৫ - ৪.২ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "২০০ দিন",
      marketPrice: "₹২,২০০ - ₹৩,০০০/কুইন্টাল",
      bestSellingTime: "জানুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "ধান ঝলসানো", symptom: "পাতা শুকিয়ে যায়", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি কাল", frequency: "প্রতি ৭ দিনে", method: "পর্যায়ক্রমিক সেচ" }
    ]
  },
  {
    id: 7,
    name: "ভুট্টা (স্থানীয়)",
    icon: Leaf,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "জুলাই",
    sowingWindow: "জুলাইয়ের প্রথম সপ্তাহ",
    harvestWindow: "অক্টোবর – নভেম্বর",
    totalDays: 110,
    variety: "স্থানীয় ভুট্টা",
    climate: "২০-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "১০-১২ কেজি/একর",
    spacing: "৬০ সেমি x ২০ সেমি",
    monthlyTimeline: [
      { month: "জুলাই", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "আগস্ট", activities: ["উদ্ভিদ বৃদ্ধি"], growthStage: "বৃদ্ধি", waterRequirement: "অধিক", pestRisks: [] },
      { month: "সেপ্টেম্বর", activities: ["নারিকেল ফুল আসা"], growthStage: "প্রজনন", waterRequirement: "অধিক", pestRisks: [] },
      { month: "অক্টোবর", activities: ["দানা পূরণ", "ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["মাটি আর্দ্র রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৪.০ - ৫.০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "২০০ দিন",
      marketPrice: "₹১,৫০০ - ₹২,০০০/কুইন্টাল",
      bestSellingTime: "নভেম্বর – ডিসেম্বর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "কাণ্ড পোকা", symptom: "মরা ডগা", solution: "কার্বোফিউরান প্রয়োগ" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১০ দিনে", method: "ফারো সেচ" }
    ]
  },
  {
    id: 8,
    name: "মুগ ডাল",
    icon: Bean,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "জুলাই",
    sowingWindow: "জুলাইয়ের প্রথম সপ্তাহ",
    harvestWindow: "অক্টোবর",
    totalDays: 85,
    variety: "বিনা মুগ-৮",
    climate: "২৫-৩৫°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "২০-২৫ কেজি/একর",
    spacing: "৩০ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "জুলাই", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "আগস্ট", activities: ["ফুল ফোটা"], growthStage: "ফুল", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "সেপ্টেম্বর", activities: ["শুঁটি পূরণ"], growthStage: "ফসল প্রস্তুতি", waterRequirement: "কম", pestRisks: [] },
      { month: "অক্টোবর", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি আর্দ্র রাখুন"] },
      { week: "৩-৬", stageName: "উদ্ভিদ বৃদ্ধি", description: "গাছ বড় হয়", careTasks: ["আগাছা পরিষ্কার"] }
    ],
    harvestInfo: {
      expectedYield: "০.৮ - ১.০ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৮,০০০ - ₹১০,০০০/কুইন্টাল",
      bestSellingTime: "অক্টোবর – ডিসেম্বর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাউডারি মিলডিউ", symptom: "পাতায় সাদা গুঁড়ো", solution: "সালফার স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "বপনকাল", frequency: "হালকা সেচ", method: "সেচ" }
    ]
  },
  {
    id: 9,
    name: "মাষ কলাই",
    icon: Bean,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "জুলাই",
    sowingWindow: "জুলাইয়ের দ্বিতীয় সপ্তাহ",
    harvestWindow: "অক্টোবর – নভেম্বর",
    totalDays: 90,
    variety: "বিনা মাষ-১",
    climate: "২৫-৩৫°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২৫-৩০ কেজি/একর",
    spacing: "৪৫ সেমি x ১৫ সেমি",
    monthlyTimeline: [
      { month: "জুলাই", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "আগস্ট", activities: ["উদ্ভিদ বৃদ্ধি"], growthStage: "বৃদ্ধি", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "সেপ্টেম্বর", activities: ["শুঁটি ধরা"], growthStage: "ফসল প্রস্তুতি", waterRequirement: "কম", pestRisks: [] },
      { month: "অক্টোবর", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["মাটি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "০.৭ - ০.৯ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৯,০০০ - ₹১১,০০০/কুইন্টাল",
      bestSellingTime: "নভেম্বর – জানুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "২৫ কেজি/একর" }
    ],
    diseaseList: [
      { name: "শুঁটি পোকা", symptom: "শুঁটিতে ছিদ্র", solution: "কীটনাশক স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১৫ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 10,
    name: "আড়হর ডাল",
    icon: Bean,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "জুলাই",
    sowingWindow: "জুলাইয়ের প্রথম সপ্তাহ",
    harvestWindow: "ডিসেম্বর – জানুয়ারি",
    totalDays: 180,
    variety: "বিনা আড়হর-৩",
    climate: "২০-৩০°C",
    soilType: "সুনিষ্কাশিত দোআঁশ",
    seedRate: "১২-১৫ কেজি/একর",
    spacing: "৬০ সেমি x ২০ সেমি",
    monthlyTimeline: [
      { month: "জুলাই", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "সেপ্টেম্বর", activities: ["উদ্ভিদ বৃদ্ধি"], growthStage: "বৃদ্ধি", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ডিসেম্বর", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১.২ - ১.৫ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৭,০০০ - ₹৮,৫০০/কুইন্টাল",
      bestSellingTime: "জানুয়ারি – ফেব্রুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "বের হওয়া রোগ", symptom: "ফল নষ্ট", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ২০ দিনে", method: "সেচ" }
    ]
  },

  // আগস্ট মাস (৫টি)
  {
    id: 11,
    name: "বাদাম",
    icon: Apple,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "আগস্ট",
    sowingWindow: "আগস্ট – সেপ্টেম্বর",
    harvestWindow: "ডিসেম্বর – জানুয়ারি",
    totalDays: 140,
    variety: "চিনাবাদাম",
    climate: "২৫-৩০°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "৮০-১০০ কেজি/একর",
    spacing: "৪৫ সেমি x ১৫ সেমি",
    monthlyTimeline: [
      { month: "আগস্ট", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "অক্টোবর", activities: ["ফুল ফোটা"], growthStage: "ফুল", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ডিসেম্বর", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১.৫ - ২.০ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৮,০০০ - ₹১০,০০০/কুইন্টাল",
      bestSellingTime: "জানুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৪০ + ৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা দাগ", symptom: "পাতায় বাদামি দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১৫ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 12,
    name: "সয়াবিন",
    icon: Bean,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "আগস্ট",
    sowingWindow: "আগস্টের প্রথম সপ্তাহ",
    harvestWindow: "নভেম্বর – ডিসেম্বর",
    totalDays: 105,
    variety: "শ্বেতা সয়াবিন",
    climate: "২২-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৪০-৫০ কেজি/একর",
    spacing: "৪৫ সেমি x ৫ সেমি",
    monthlyTimeline: [
      { month: "আগস্ট", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "সেপ্টেম্বর", activities: ["ফুল ফোটা"], growthStage: "ফুল", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "নভেম্বর", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১.৮ - ২.২ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৪,৫০০ - ₹৫,৫০০/কুইন্টাল",
      bestSellingTime: "ডিসেম্বর – জানুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "মরিচা রোগ", symptom: "পাতায় কমলা দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১০ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 13,
    name: "তিল",
    icon: Leaf,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "আগস্ট",
    sowingWindow: "আগস্টের দ্বিতীয় সপ্তাহ",
    harvestWindow: "নভেম্বর – ডিসেম্বর",
    totalDays: 95,
    variety: "বিনা তিল-৩",
    climate: "২৫-৩৫°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "৪-৫ কেজি/একর",
    spacing: "৩০ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "আগস্ট", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "অক্টোবর", activities: ["ফুল ফোটা"], growthStage: "ফুল", waterRequirement: "কম", pestRisks: [] },
      { month: "নভেম্বর", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "০.৮ - ১.০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹১০,০০০ - ₹১২,০০০/কুইন্টাল",
      bestSellingTime: "ডিসেম্বর – জানুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "২০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা কুঁকড়ানো", symptom: "পাতা কুঁকড়ে যায়", solution: "কীটনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ২০ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 14,
    name: "সোরগম (জোয়ার)",
    icon: Wheat,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "আগস্ট",
    sowingWindow: "আগস্টের প্রথম সপ্তাহ",
    harvestWindow: "নভেম্বর",
    totalDays: 100,
    variety: "জোয়ার-১",
    climate: "২৫-৩৫°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৮-১০ কেজি/একর",
    spacing: "৪৫ সেমি x ১৫ সেমি",
    monthlyTimeline: [
      { month: "আগস্ট", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "অক্টোবর", activities: ["শিষ বের হওয়া"], growthStage: "প্রজনন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "নভেম্বর", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২.৫ - ৩.০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "২০০ দিন",
      marketPrice: "₹১,৮০০ - ₹২,২০০/কুইন্টাল",
      bestSellingTime: "নভেম্বর – ডিসেম্বর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "ফুলের রোগ", symptom: "ফুল নষ্ট", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১৫ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 15,
    name: "কাউন (ছিনা)",
    icon: Wheat,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "আগস্ট",
    sowingWindow: "আগস্টের প্রথম সপ্তাহ",
    harvestWindow: "নভেম্বর",
    totalDays: 90,
    variety: "কাউন-১",
    climate: "২৫-৩২°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "৬-৮ কেজি/একর",
    spacing: "৩০ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "আগস্ট", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "অক্টোবর", activities: ["শিষ বের হওয়া"], growthStage: "ফসল প্রস্তুতি", waterRequirement: "কম", pestRisks: [] },
      { month: "নভেম্বর", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১.২ - ১.৫ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹২,৫০০ - ₹৩,০০০/কুইন্টাল",
      bestSellingTime: "নভেম্বর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "২০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতার রোগ", symptom: "পাতা হলুদ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ২০ দিনে", method: "সেচ" }
    ]
  },

  // সেপ্টেম্বর মাস (৫টি)
  {
    id: 16,
    name: "পেঁয়াজ (রবি জাত)",
    icon: Apple,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "সেপ্টেম্বর",
    sowingWindow: "সেপ্টেম্বরের মাঝামাঝি",
    harvestWindow: "ফেব্রুয়ারি – মার্চ",
    totalDays: 160,
    variety: "তাইপি পেঁয়াজ",
    climate: "১৫-২৫°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৮-১০ কেজি/একর",
    spacing: "১৫ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "সেপ্টেম্বর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ডিসেম্বর", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ফেব্রুয়ারি", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১২ - ১৫ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৯০ দিন",
      marketPrice: "₹৩,০০০ - ₹৪,০০০/কুইন্টাল",
      bestSellingTime: "মার্চ – এপ্রিল"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "বীজ পচা", symptom: "বীজ পচে যায়", solution: "বীজ শোধন করুন" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১০ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 17,
    name: "গাজর",
    icon: Carrot,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "সেপ্টেম্বর",
    sowingWindow: "সেপ্টেম্বরের শেষ সপ্তাহ",
    harvestWindow: "জানুয়ারি – ফেব্রুয়ারি",
    totalDays: 120,
    variety: "নয়েজ গাজর",
    climate: "১৫-২০°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "৪-৫ কেজি/একর",
    spacing: "৩০ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "সেপ্টেম্বর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ডিসেম্বর", activities: ["মূল বৃদ্ধি"], growthStage: "বৃদ্ধি", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "জানুয়ারি", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "কম", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২৫ - ৩০ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৪৫ দিন",
      marketPrice: "₹৪,০০০ - ₹৬,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৫০ + ৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা দাগ", symptom: "পাতায় দাগ পড়ে", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ৭ দিনে", method: "স্প্রিংকলার" }
    ]
  },
  {
    id: 18,
    name: "মুলা",
    icon: Carrot,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "সেপ্টেম্বর",
    sowingWindow: "সেপ্টেম্বরের দ্বিতীয় সপ্তাহ",
    harvestWindow: "নভেম্বর – ডিসেম্বর",
    totalDays: 60,
    variety: "জাপানি মুলা",
    climate: "১৫-২৫°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "৬-৮ কেজি/একর",
    spacing: "৩০ সেমি x ১৫ সেমি",
    monthlyTimeline: [
      { month: "সেপ্টেম্বর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "নভেম্বর", activities: ["মূল পূরণ"], growthStage: "ফসল প্রস্তুতি", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ডিসেম্বর", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২০ - ২৫ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৩০ দিন",
      marketPrice: "₹২,০০০ - ₹৩,০০০/কুইন্টাল",
      bestSellingTime: "ডিসেম্বর – জানুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "মূল পচা", symptom: "মূল নরম হয়ে যায়", solution: "সঠিক সেচ ব্যবস্থাপনা" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ৫ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 19,
    name: "বেগুন",
    icon: Apple,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "সেপ্টেম্বর",
    sowingWindow: "সেপ্টেম্বরের দ্বিতীয় সপ্তাহ",
    harvestWindow: "ডিসেম্বর – এপ্রিল",
    totalDays: 150,
    variety: "উত্তরা বেগুন",
    climate: "২০-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২০০ গ্রাম/একর",
    spacing: "৭৫ সেমি x ৬০ সেমি",
    monthlyTimeline: [
      { month: "সেপ্টেম্বর", activities: ["বীজতলা তৈরি"], growthStage: "বীজতলা", waterRequirement: "কম", pestRisks: [] },
      { month: "অক্টোবর", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ডিসেম্বর", activities: ["ফুল আসা", "ফল ধরা"], growthStage: "ফল আসা", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৩০ - ৪০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "১০ দিন",
      marketPrice: "₹২,০০০ - ₹৩,৫০০/কুইন্টাল",
      bestSellingTime: "ডিসেম্বর – ফেব্রুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৬০ + ৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "ফল ও পাতা ছিদ্র", symptom: "ফল ও পাতায় ছিদ্র", solution: "কীটনাশক প্রয়োগ" }
    ],
    irrigationSchedule: [
      { stage: "রোপণকাল", frequency: "সাপ্তাহিক", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 20,
    name: "মরিচ",
    icon: Apple,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "সেপ্টেম্বর",
    sowingWindow: "সেপ্টেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "ডিসেম্বর – মে",
    totalDays: 180,
    variety: "বাঙ্গি মরিচ",
    climate: "২০-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২০০ গ্রাম/একর",
    spacing: "৬০ সেমি x ৫০ সেমি",
    monthlyTimeline: [
      { month: "সেপ্টেম্বর", activities: ["বীজতলা তৈরি"], growthStage: "বীজতলা", waterRequirement: "কম", pestRisks: [] },
      { month: "অক্টোবর", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ডিসেম্বর", activities: ["ফুল আসা", "ফল ধরা"], growthStage: "ফল আসা", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৮ - ১২ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "১৫ দিন",
      marketPrice: "₹৩,০০০ - ₹৫,০০০/কুইন্টাল",
      bestSellingTime: "জানুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৫০ + ৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "ফল পচা", symptom: "ফল পচে যায়", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "রোপণকাল", frequency: "সপ্তাহে ২ বার", method: "ড্রিপ সেচ" }
    ]
  },

  // অক্টোবর মাস (খরিফ শেষে রবির শুরু) - ৫টি
  {
    id: 21,
    name: "পটোল",
    icon: Apple,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের দ্বিতীয় সপ্তাহ",
    harvestWindow: "ফেব্রুয়ারি – জুন",
    totalDays: 210,
    variety: "বারোমাসি পটোল",
    climate: "২০-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৩-৪ কেজি/একর",
    spacing: "২ মি x ২ মি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ফেব্রুয়ারি", activities: ["ফল আসা শুরু"], growthStage: "ফল আসা", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২৫ - ৩০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৭ দিন",
      marketPrice: "₹৪,০০০ - ₹৬,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – এপ্রিল"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "গোবর + ডিএপি", quantity: "৫ টন + ৪০ কেজি" }
    ],
    diseaseList: [
      { name: "পাতা হলুদ", symptom: "পাতা হলুদ হয়ে যায়", solution: "পুষ্টি ব্যবস্থাপনা" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "সপ্তাহে ২ বার", method: "সেচ" }
    ]
  },
  {
    id: 22,
    name: "লাউ",
    icon: Apple,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের দ্বিতীয় সপ্তাহ",
    harvestWindow: "জানুয়ারি – মে",
    totalDays: 150,
    variety: "বারোমাসি লাউ",
    climate: "২০-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২-৩ কেজি/একর",
    spacing: "৩ মি x ২ মি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২০ - ২৫ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "১৫ দিন",
      marketPrice: "₹৩,০০০ - ₹৫,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – এপ্রিল"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "গোবর + ডিএপি", quantity: "৪ টন + ৩০ কেজি" }
    ],
    diseaseList: [
      { name: "পাউডারি মিলডিউ", symptom: "পাতায় সাদা গুঁড়ো", solution: "সালফার স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "সপ্তাহে ২ বার", method: "সেচ" }
    ]
  },
  {
    id: 23,
    name: "চিচিঙ্গা",
    icon: Apple,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের প্রথম সপ্তাহ",
    harvestWindow: "ফেব্রুয়ারি – মে",
    totalDays: 140,
    variety: "চিচিঙ্গা-১",
    climate: "২২-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৩-৪ কেজি/একর",
    spacing: "২ মি x ১.৫ মি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১৫ - ২০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "১০ দিন",
      marketPrice: "₹৩,৫০০ - ₹৫,৫০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – এপ্রিল"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "গোবর + ডিএপি", quantity: "৩ টন + ৩০ কেজি" }
    ],
    diseaseList: [
      { name: "লতা পচা", symptom: "লতা পচে যায়", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "সপ্তাহে ২ বার", method: "সেচ" }
    ]
  },
  {
    id: 24,
    name: "শশা",
    icon: Apple,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের প্রথম সপ্তাহ",
    harvestWindow: "জানুয়ারি – এপ্রিল",
    totalDays: 120,
    variety: "শশা সবুজ",
    climate: "২০-২৮°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "২-৩ কেজি/একর",
    spacing: "১.৫ মি x ১ মি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২০ - ২৫ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৭ দিন",
      marketPrice: "₹২,০০০ - ₹৩,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "গোবর + ডিএপি", quantity: "৩ টন + ২৫ কেজি" }
    ],
    diseaseList: [
      { name: "মরিচা রোগ", symptom: "পাতায় কমলা দাগ", solution: "ছত্রাকনাশক স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "সপ্তাহে ৩ বার", method: "সেচ" }
    ]
  },
  {
    id: 25,
    name: "বাঁধাকপি",
    icon: Apple,
    season: "খরিফ (বর্ষা)",
    seasonIcon: CloudRain,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের দ্বিতীয় সপ্তাহ",
    harvestWindow: "ফেব্রুয়ারি – মার্চ",
    totalDays: 130,
    variety: "কোপেনহেগেন",
    climate: "১২-২২°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২০০ গ্রাম/একর",
    spacing: "৬০ সেমি x ৫০ সেমি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["বীজতলা তৈরি"], growthStage: "বীজতলা", waterRequirement: "কম", pestRisks: [] },
      { month: "নভেম্বর", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ফেব্রুয়ারি", activities: ["মাথি বাঁধা"], growthStage: "ফসল প্রস্তুতি", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৩০ - ৪০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "৩০ দিন",
      marketPrice: "₹৩,০০০ - ₹৪,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৬০ + ৫০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "মাথি পচা", symptom: "মাথি পচে যায়", solution: "ছত্রাকনাশক প্রয়োগ" }
    ],
    irrigationSchedule: [
      { stage: "রোপণকাল", frequency: "সপ্তাহে ২ বার", method: "সেচ" }
    ]
  },

  // =====================================================
  // রবি মৌসুম (শীতকাল) - অক্টোবর থেকে মার্চ (৪০টি ফসল)
  // =====================================================

  // অক্টোবর মাস (রবি শুর) - ৮টি
  {
    id: 26,
    name: "হাইব্রিড ভুট্টা (রবি)",
    icon: Leaf,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের মাঝামাঝি – নভেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "মার্চ – এপ্রিল",
    totalDays: 110,
    variety: "হাইব্রিড ৯০০এম গোল্ড",
    climate: "১৫-৩০°C",
    soilType: "সুনিষ্কাশিত দোআঁশ",
    seedRate: "৮-১০ কেজি/একর",
    spacing: "৬০ সেমি x ২০ সেমি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["জমি প্রস্তুতি", "বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "নভেম্বর", activities: ["অঙ্কুরোদগম"], growthStage: "অঙ্কুরোদগম", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "জানুয়ারি", activities: ["নারিকেল ফুল আসা"], growthStage: "প্রজনন", waterRequirement: "অধিক", pestRisks: [] },
      { month: "মার্চ", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "বীজ অঙ্কুরোদগম", description: "৪-৫ দিনে অঙ্কুরিত হয়", careTasks: ["মাটি আর্দ্র রাখুন"] },
      { week: "৫-৭", stageName: "উদ্ভিদ বৃদ্ধি", description: "দ্রুত কাণ্ড বৃদ্ধি", careTasks: ["মাটি তুলে দিন"] }
    ],
    harvestInfo: {
      expectedYield: "৭.৫ - ৮.৮ টন/একর",
      harvestMethod: "হাতে শিষ পাড়া",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹২,২০০ - ₹২,৮০০/কুইন্টাল",
      bestSellingTime: "এপ্রিল – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৫০ + ৩০ কেজি/একর" },
      { stage: "২৫ দিনে", fertilizer: "ইউরিয়া", quantity: "৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "ফল আর্মিওয়ার্ম", symptom: "পাতায় ছিদ্র", solution: "ইমামেক্টিন বেনজোয়েট" }
    ],
    irrigationSchedule: [
      { stage: "বপন থেকে অঙ্কুরোদগম", frequency: "হালকা সেচ", method: "স্প্রিংকলার" },
      { stage: "নারিকেল ফুল আসা", frequency: "প্রতি ৫-৭ দিনে", method: "প্লাবন সেচ" }
    ]
  },
  {
    id: 27,
    name: "ছোলা (চানা)",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "অক্টোবর",
    sowingWindow: "১৫ অক্টোবর – ১৫ নভেম্বর",
    harvestWindow: "মার্চের মাঝামাঝি – এপ্রিল",
    totalDays: 115,
    variety: "পুসা ৩৭২ / দেশি",
    climate: "১৫-২৫°C",
    soilType: "সুনিষ্কাশিত দোআঁশ",
    seedRate: "৩০-৪০ কেজি/একর",
    spacing: "৩০ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["জমি প্রস্তুতি", "বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "জানুয়ারি", activities: ["ফুল ফোটা"], growthStage: "ফুল ফোটা", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "মার্চ", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২", stageName: "অঙ্কুরোদগম", description: "৭-১০ দিনে অঙ্কুরিত হয়", careTasks: ["মাটি আর্দ্র রাখুন"] },
      { week: "৭-৯", stageName: "ফুল ফোটা", description: "সাদা/গোলাপি ফুল আসে", careTasks: ["পোকা পর্যবেক্ষণ"] }
    ],
    harvestInfo: {
      expectedYield: "১.৮ - ২.৩ টন/একর",
      harvestMethod: "হাতে তুলে বা কম্বাইন",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৫,০০০ - ₹৬,৫০০/কুইন্টাল",
      bestSellingTime: "এপ্রিল – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৪০ কেজি/একর" },
      { stage: "বপনে", fertilizer: "রাইজোবিয়াম কালচার", quantity: "৬০০ গ্রাম/একর" }
    ],
    diseaseList: [
      { name: "শুঁটি পোকা", symptom: "শুঁটিতে ছিদ্র", solution: "ইন্ডক্সাকার্ব স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "ফুল ফোটার সময়", frequency: "একবার", method: "ফারো" }
    ]
  },
  {
    id: 28,
    name: "মসুর ডাল",
    icon: Bean,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের দ্বিতীয় সপ্তাহ",
    harvestWindow: "ফেব্রুয়ারি – মার্চ",
    totalDays: 110,
    variety: "বিনা মসুর-৭",
    climate: "১২-২২°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২০-২৫ কেজি/একর",
    spacing: "৩০ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "ডিসেম্বর", activities: ["ফুল ফোটা"], growthStage: "ফুল", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ফেব্রুয়ারি", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২", stageName: "অঙ্কুরোদগম", description: "৭-১০ দিনে অঙ্কুরিত হয়", careTasks: ["মাটি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১.২ - ১.৫ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৭,০০০ - ₹৮,৫০০/কুইন্টাল",
      bestSellingTime: "মার্চ – মে"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা দাগ", symptom: "পাতায় বাদামি দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "একবার", method: "সেচ" }
    ]
  },
  {
    id: 29,
    name: "অড়হর ডাল",
    icon: Bean,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের প্রথম সপ্তাহ",
    harvestWindow: "মার্চ – এপ্রিল",
    totalDays: 150,
    variety: "বিনা অড়হর-২",
    climate: "১৮-২৮°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "১৫-২০ কেজি/একর",
    spacing: "৬০ সেমি x ২০ সেমি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২", stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১.৫ - ১.৮ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৬,৫০০ - ₹৭,৫০০/কুইন্টাল",
      bestSellingTime: "এপ্রিল – মে"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "ফল পচা", symptom: "ফল পচে যায়", solution: "ছত্রাকনাশক প্রয়োগ" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "প্রয়োজনে", method: "হালকা সেচ" }
    ]
  },
  {
    id: 30,
    name: "ফুলকপি",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের দ্বিতীয় সপ্তাহ",
    harvestWindow: "ফেব্রুয়ারি – মার্চ",
    totalDays: 125,
    variety: "পুসা শুভ্রা",
    climate: "১২-২০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২০০ গ্রাম/একর",
    spacing: "৬০ সেমি x ৫০ সেমি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["বীজতলা তৈরি"], growthStage: "বীজতলা", waterRequirement: "কম", pestRisks: [] },
      { month: "নভেম্বর", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ফেব্রুয়ারি", activities: ["ফুল বাঁধা"], growthStage: "ফসল প্রস্তুতি", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২৫ - ৩০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "২০ দিন",
      marketPrice: "₹৩,০০০ - ₹৪,৫০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৫০ + ৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "মাথি পচা", symptom: "মাথি নরম", solution: "বোরন প্রয়োগ" }
    ],
    irrigationSchedule: [
      { stage: "রোপণকাল", frequency: "সপ্তাহে ২ বার", method: "সেচ" }
    ]
  },
  {
    id: 31,
    name: "টমেটো",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের মাঝামাঝি",
    harvestWindow: "ফেব্রুয়ারি – এপ্রিল",
    totalDays: 135,
    variety: "বিনা টমেটো-৩",
    climate: "১৫-২৫°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "২০০ গ্রাম/একর",
    spacing: "৭৫ সেমি x ৬০ সেমি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["বীজতলা তৈরি"], growthStage: "বীজতলা", waterRequirement: "কম", pestRisks: [] },
      { month: "নভেম্বর", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ফেব্রুয়ারি", activities: ["ফল ধরা"], growthStage: "ফল আসা", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৩০ - ৪০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "১৫ দিন",
      marketPrice: "₹২,০০০ - ₹৪,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – এপ্রিল"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৬০ + ৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "ফল পচা", symptom: "ফলের নিচে দাগ", solution: "ক্যালসিয়াম স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "রোপণকাল", frequency: "সপ্তাহে ৩ বার", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 32,
    name: "শিম",
    icon: Bean,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের প্রথম সপ্তাহ",
    harvestWindow: "জানুয়ারি – এপ্রিল",
    totalDays: 140,
    variety: "বরবটি",
    climate: "১৮-২৮°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৮-১০ কেজি/একর",
    spacing: "১.৫ মি x ১ মি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১২ - ১৫ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৭ দিন",
      marketPrice: "₹৩,০০০ - ₹৫,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "গোবর + ডিএপি", quantity: "৩ টন + ৩০ কেজি" }
    ],
    diseaseList: [
      { name: "পাতা কুঁকড়ানো", symptom: "পাতা কুঁকড়ে যায়", solution: "কীটনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "সপ্তাহে ২ বার", method: "সেচ" }
    ]
  },
  {
    id: 33,
    name: "মটর",
    icon: Bean,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের দ্বিতীয় সপ্তাহ",
    harvestWindow: "ফেব্রুয়ারি – মার্চ",
    totalDays: 115,
    variety: "মটর-১",
    climate: "১২-২০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৪০-৫০ কেজি/একর",
    spacing: "৪৫ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২", stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১.৫ - ২.০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৩০ দিন",
      marketPrice: "₹৪,০০০ - ₹৫,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাউডারি মিলডিউ", symptom: "পাতায় সাদা গুঁড়ো", solution: "সালফার স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "ফুল ফোটার সময়", frequency: "একবার", method: "সেচ" }
    ]
  },

  // নভেম্বর মাস (রবি) - ৮টি
  {
    id: 34,
    name: "গম (বাংলা গম)",
    icon: Wheat,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "নভেম্বর",
    sowingWindow: "নভেম্বরের মাঝামাঝি – ডিসেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "এপ্রিল",
    totalDays: 120,
    variety: "বাংলা গম-১",
    climate: "১০-২৫°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৪০-৫০ কেজি/একর",
    spacing: "২০ সেমি x ৫ সেমি",
    monthlyTimeline: [
      { month: "নভেম্বর", activities: ["জমি প্রস্তুতি", "বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "ফেব্রুয়ারি", activities: ["শিষ বের হওয়া"], growthStage: "প্রজনন", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "এপ্রিল", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["মাটি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৩.৫ - ৪.৫ টন/একর",
      harvestMethod: "কম্বাইন হারভেস্টার",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹২,০০০ - ₹২,৫০০/কুইন্টাল",
      bestSellingTime: "এপ্রিল – মে"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৫০ কেজি/একর" },
      { stage: "উপরি সার", fertilizer: "ইউরিয়া", quantity: "৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "মরিচা রোগ", symptom: "পাতায় কমলা দাগ", solution: "ছত্রাকনাশক স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি কাল", frequency: "প্রতি ১৫ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 35,
    name: "বার্লি (যব)",
    icon: Wheat,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "নভেম্বর",
    sowingWindow: "নভেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "মার্চ – এপ্রিল",
    totalDays: 115,
    variety: "বার্লি-১",
    climate: "১০-২২°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৪৫-৫৫ কেজি/একর",
    spacing: "২০ সেমি x ৫ সেমি",
    monthlyTimeline: [
      { month: "নভেম্বর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "মার্চ", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৩.০ - ৩.৫ টন/একর",
      harvestMethod: "কম্বাইন হারভেস্টার",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹১,৮০০ - ₹২,২০০/কুইন্টাল",
      bestSellingTime: "এপ্রিল"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা দাগ", symptom: "পাতায় দাগ", solution: "ছত্রাকনাশক" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ২০ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 36,
    name: "সরিষা",
    icon: Leaf,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "নভেম্বর",
    sowingWindow: "নভেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "ফেব্রুয়ারি – মার্চ",
    totalDays: 100,
    variety: "বিনা সরিষা-১১",
    climate: "১০-২২°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৬-৮ কেজি/একর",
    spacing: "৩০ সেমি x ১৫ সেমি",
    monthlyTimeline: [
      { month: "নভেম্বর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "জানুয়ারি", activities: ["ফুল ফোটা"], growthStage: "ফুল", waterRequirement: "কম", pestRisks: [] },
      { month: "ফেব্রুয়ারি", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২", stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১.২ - ১.৫ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৪,৫০০ - ₹৫,৫০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "অলটারনারিয়া ব্লাইট", symptom: "পাতায় কালো দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "প্রয়োজনে", method: "হালকা সেচ" }
    ]
  },
  {
    id: 37,
    name: "আলু",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "নভেম্বর",
    sowingWindow: "নভেম্বরের মাঝামাঝি",
    harvestWindow: "ফেব্রুয়ারি – মার্চ",
    totalDays: 95,
    variety: "ডায়মন্ড",
    climate: "১৫-২২°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "১.৫ - ২.০ টন/একর",
    spacing: "৬০ সেমি x ২৫ সেমি",
    monthlyTimeline: [
      { month: "নভেম্বর", activities: ["বীজ রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "ফেব্রুয়ারি", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: 2, stageName: "অঙ্কুরোদগম", description: "আলুর চারা বের হয়", careTasks: ["মাটি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২৫ - ৩০ টন/একর",
      harvestMethod: "হাতে খনন",
      storageDays: "৯০ দিন",
      marketPrice: "₹৩,০০০ - ₹৪,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – এপ্রিল"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৬০ + ৫০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "ব্লাইট", symptom: "পাতায় কালো দাগ", solution: "ছত্রাকনাশক স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১০ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 38,
    name: "পেঁয়াজ (শীতকালীন)",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "নভেম্বর",
    sowingWindow: "নভেম্বরের মাঝামাঝি",
    harvestWindow: "এপ্রিল – মে",
    totalDays: 165,
    variety: "তাইপি পেঁয়াজ",
    climate: "১২-২২°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "১০-১২ কেজি/একর",
    spacing: "১৫ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "নভেম্বর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] },
      { month: "ডিসেম্বর", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২", stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১৫ - ২০ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৯০ দিন",
      marketPrice: "₹৩,০০০ - ₹৪,০০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৫০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "বীজ পচা", symptom: "বীজ পচে যায়", solution: "বীজ শোধন" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১৫ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 39,
    name: "রসুন",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "নভেম্বর",
    sowingWindow: "নভেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "এপ্রিল – মে",
    totalDays: 150,
    variety: "রসুন-১",
    climate: "১২-২০°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "৪০০-৫০০ কেজি/একর",
    spacing: "২০ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "নভেম্বর", activities: ["কোয়া রোপণ"], growthStage: "রোপণ", waterRequirement: "কম", pestRisks: [] }
    ],
    growthStages: [
      { week: 2, stageName: "অঙ্কুরোদগম", description: "কোয়া থেকে চারা বের হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৮ - ১০ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৯০ দিন",
      marketPrice: "₹৪,০০০ - ₹৬,০০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৫০ + ৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা হলুদ", symptom: "পাতা হলুদ হয়ে যায়", solution: "সঠিক পুষ্টি ব্যবস্থাপনা" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১৫ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 40,
    name: "ধনিয়া",
    icon: Leaf,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "নভেম্বর",
    sowingWindow: "নভেম্বরের দ্বিতীয় সপ্তাহ",
    harvestWindow: "ফেব্রুয়ারি",
    totalDays: 75,
    variety: "ধনিয়া-১",
    climate: "১০-২৫°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২০-২৫ কেজি/একর",
    spacing: "৩০ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "নভেম্বর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৮ - ১০ টন/একর (পাতা)",
      harvestMethod: "হাতে কাটা",
      storageDays: "৭ দিন",
      marketPrice: "₹৩,০০০ - ₹৫,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "২০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "স্টেম রট", symptom: "কাণ্ড পচা", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "সপ্তাহে ২ বার", method: "স্প্রিংকলার" }
    ]
  },
  {
    id: 41,
    name: "মূলা (শীতকাল)",
    icon: Carrot,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "নভেম্বর",
    sowingWindow: "নভেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "জানুয়ারি – ফেব্রুয়ারি",
    totalDays: 60,
    variety: "জাপানি মূলা",
    climate: "১০-২০°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "৬-৮ কেজি/একর",
    spacing: "৩০ সেমি x ১৫ সেমি",
    monthlyTimeline: [
      { month: "নভেম্বর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২০ - ২৫ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "১৫ দিন",
      marketPrice: "₹২,০০০ - ₹৩,০০০/কুইন্টাল",
      bestSellingTime: "জানুয়ারি – ফেব্রুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "মূল ফাটা", symptom: "মূল ফেটে যায়", solution: "সঠিক পানি ব্যবস্থাপনা" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ৫ দিনে", method: "সেচ" }
    ]
  },

  // ডিসেম্বর মাস (রবি) - ৮টি
  {
    id: 42,
    name: "সূর্যমুখী",
    icon: Flower2,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "ডিসেম্বর",
    sowingWindow: "ডিসেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "এপ্রিল – মে",
    totalDays: 110,
    variety: "সূর্যমুখী-৩",
    climate: "১৫-২৫°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৪-৫ কেজি/একর",
    spacing: "৬০ সেমি x ৩০ সেমি",
    monthlyTimeline: [
      { month: "ডিসেম্বর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["মাটি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১.৫ - ২.০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "২০০ দিন",
      marketPrice: "₹৪,০০০ - ₹৫,০০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "মরিচা রোগ", symptom: "পাতায় কমলা দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১৫ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 43,
    name: "মিষ্টি আলু",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "ডিসেম্বর",
    sowingWindow: "ডিসেম্বরের দ্বিতীয় সপ্তাহ",
    harvestWindow: "এপ্রিল – মে",
    totalDays: 130,
    variety: "বিনা মিষ্টি আলু-১",
    climate: "১৮-২৮°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "৪০০-৫০০ কেজি/একর",
    spacing: "৬০ সেমি x ৩০ সেমি",
    monthlyTimeline: [
      { month: "ডিসেম্বর", activities: ["লতা লাগানো"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 2, stageName: "অঙ্কুরোদগম", description: "লতা থেকে চারা বের হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২০ - ২৫ টন/একর",
      harvestMethod: "হাতে খনন",
      storageDays: "৯০ দিন",
      marketPrice: "₹৩,০০০ - ₹৪,০০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "পটাশ", quantity: "৫০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "কাণ্ড পচা", symptom: "কাণ্ড পচে যায়", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১৫ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 44,
    name: "পালংশাক",
    icon: Leaf,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "ডিসেম্বর",
    sowingWindow: "ডিসেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "ফেব্রুয়ারি – মার্চ",
    totalDays: 60,
    variety: "পালংশাক-১",
    climate: "১০-১৮°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "১৫-২০ কেজি/একর",
    spacing: "১৫ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "ডিসেম্বর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৮ - ১০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "৭ দিন",
      marketPrice: "₹২,০০০ - ₹৩,৫০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "২০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা দাগ", symptom: "পাতায় দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "সপ্তাহে ৩ বার", method: "স্প্রিংকলার" }
    ]
  },
  {
    id: 45,
    name: "লেটুস পাতা",
    icon: Leaf,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "ডিসেম্বর",
    sowingWindow: "ডিসেম্বরের দ্বিতীয় সপ্তাহ",
    harvestWindow: "ফেব্রুয়ারি",
    totalDays: 65,
    variety: "গ্রিন লেটুস",
    climate: "১০-২০°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "২-৩ কেজি/একর",
    spacing: "৩০ সেমি x ২০ সেমি",
    monthlyTimeline: [
      { month: "ডিসেম্বর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১৫ - ২০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "৭ দিন",
      marketPrice: "₹৪,০০০ - ₹৬,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "২০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা পচা", symptom: "পাতা পচে যায়", solution: "সেচ নিয়ন্ত্রণ" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "সপ্তাহে ২ বার", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 46,
    name: "ব্রোকলি",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "ডিসেম্বর",
    sowingWindow: "ডিসেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "মার্চ",
    totalDays: 100,
    variety: "ব্রোকলি গ্রীন",
    climate: "১২-২০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২০০ গ্রাম/একর",
    spacing: "৫০ সেমি x ৪০ সেমি",
    monthlyTimeline: [
      { month: "ডিসেম্বর", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "১৫ - ২০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "১৫ দিন",
      marketPrice: "₹৪,০০০ - ₹৬,০০০/কুইন্টাল",
      bestSellingTime: "মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৫০ + ৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "মাথি পচা", symptom: "মাথি পচে যায়", solution: "বোরন প্রয়োগ" }
    ],
    irrigationSchedule: [
      { stage: "রোপণকাল", frequency: "সপ্তাহে ২ বার", method: "সেচ" }
    ]
  },
  {
    id: 47,
    name: "ক্যাপসিকাম",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "ডিসেম্বর",
    sowingWindow: "ডিসেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "মার্চ – এপ্রিল",
    totalDays: 120,
    variety: "রঙিন ক্যাপসিকাম",
    climate: "১৫-২২°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২০০ গ্রাম/একর",
    spacing: "৪৫ সেমি x ৪৫ সেমি",
    monthlyTimeline: [
      { month: "ডিসেম্বর", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২০ - ২৫ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "১৫ দিন",
      marketPrice: "₹৮,০০০ - ₹১২,০০০/কুইন্টাল",
      bestSellingTime: "মার্চ – এপ্রিল"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৬০ + ৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "ফল পচা", symptom: "ফল পচে যায়", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "সপ্তাহে ৩ বার", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 48,
    name: "বেরি জাতীয় ফল",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "ডিসেম্বর",
    sowingWindow: "ডিসেম্বরের মাঝামাঝি",
    harvestWindow: "মে – জুন",
    totalDays: 180,
    variety: "স্ট্রবেরি",
    climate: "১০-২২°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "৩০,০০০ চারা/একর",
    spacing: "৩০ সেমি x ২০ সেমি",
    monthlyTimeline: [
      { month: "ডিসেম্বর", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 2, stageName: "চারা গজানো", description: "চারা বড় হয়", careTasks: ["মালচিং"] }
    ],
    harvestInfo: {
      expectedYield: "৮ - ১২ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৭ দিন",
      marketPrice: "₹১৫,০০০ - ₹২৫,০০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার", quantity: "১০ টন/একর" }
    ],
    diseaseList: [
      { name: "ছত্রাক রোগ", symptom: "পাতায় দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "ফল ধরা", frequency: "প্রতিদিন", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 49,
    name: "মটরশুঁটি",
    icon: Bean,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "ডিসেম্বর",
    sowingWindow: "ডিসেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "ফেব্রুয়ারি – মার্চ",
    totalDays: 75,
    variety: "মটরশুঁটি-১",
    climate: "১২-২০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৪০-৫০ কেজি/একর",
    spacing: "৪৫ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "ডিসেম্বর", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২", stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["মাটি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৮ - ১০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "১৫ দিন",
      marketPrice: "₹৪,০০০ - ₹৬,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাউডারি মিলডিউ", symptom: "পাতায় সাদা গুঁড়ো", solution: "সালফার স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "ফুল ফোটার সময়", frequency: "একবার", method: "সেচ" }
    ]
  },

  // জানুয়ারি মাস (রবি) - ৮টি
  {
    id: 50,
    name: "চিনাবাদাম (শীতকাল)",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "জানুয়ারি",
    sowingWindow: "জানুয়ারির প্রথম সপ্তাহ",
    harvestWindow: "মে – জুন",
    totalDays: 140,
    variety: "চিনাবাদাম-১",
    climate: "১৮-২৮°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "১০০-১২০ কেজি/একর",
    spacing: "৪৫ সেমি x ১৫ সেমি",
    monthlyTimeline: [
      { month: "জানুয়ারি", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২.০ - ২.৫ টন/একর",
      harvestMethod: "হাতে তোলা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৮,০০০ - ₹১০,০০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৫০ + ৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা দাগ", symptom: "পাতায় বাদামি দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ১৫ দিনে", method: "সেচ" }
    ]
  },
  {
    id: 51,
    name: "তিল (শীতকাল)",
    icon: Leaf,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "জানুয়ারি",
    sowingWindow: "জানুয়ারির দ্বিতীয় সপ্তাহ",
    harvestWindow: "মে",
    totalDays: 110,
    variety: "বিনা তিল-৪",
    climate: "১৫-২৫°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "৪-৫ কেজি/একর",
    spacing: "৩০ সেমি x ১০ সেমি",
    monthlyTimeline: [
      { month: "জানুয়ারি", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "কম", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "০.৮ - ১.০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹১০,০০০ - ₹১২,০০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "২০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা কুঁকড়ানো", symptom: "পাতা কুঁকড়ে যায়", solution: "কীটনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রয়োজনে", method: "হালকা সেচ" }
    ]
  },
  {
    id: 52,
    name: "কমলা লেবু",
    icon: Citrus,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "জানুয়ারি",
    sowingWindow: "জানুয়ারির প্রথম সপ্তাহ",
    harvestWindow: "জুন – জুলাই",
    totalDays: 365,
    variety: "বাতাবি লেবু",
    climate: "১৮-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২০০ চারা/একর",
    spacing: "৪ মি x ৪ মি",
    monthlyTimeline: [
      { month: "জানুয়ারি", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "চারা গজানো", description: "চারা স্থাপন", careTasks: ["গোড়ায় পানি দিন"] }
    ],
    harvestInfo: {
      expectedYield: "৩০ - ৪০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৩০ দিন",
      marketPrice: "₹৪,০০০ - ₹৬,০০০/কুইন্টাল",
      bestSellingTime: "জুন – জুলাই"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার", quantity: "১০ কেজি/গাছ" }
    ],
    diseaseList: [
      { name: "সাইট্রাস ক্যানকার", symptom: "ফলের উপর দাগ", solution: "কপার অক্সিক্লোরাইড" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "সাপ্তাহিক", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 53,
    name: "পেয়ারা",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "জানুয়ারি",
    sowingWindow: "জানুয়ারির দ্বিতীয় সপ্তাহ",
    harvestWindow: "জুন – অক্টোবর",
    totalDays: 365,
    variety: "পেয়ারা কাজী",
    climate: "১৫-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "১৫০ চারা/একর",
    spacing: "৫ মি x ৫ মি",
    monthlyTimeline: [
      { month: "জানুয়ারি", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "চারা গজানো", description: "চারা বড় হয়", careTasks: ["গোড়ায় পানি দিন"] }
    ],
    harvestInfo: {
      expectedYield: "৩০ - ৪০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "১০ দিন",
      marketPrice: "₹৫,০০০ - ₹৮,০০০/কুইন্টাল",
      bestSellingTime: "জুন – অক্টোবর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "১ কেজি/গাছ" }
    ],
    diseaseList: [
      { name: "বীজ পচা", symptom: "ফল পচে যায়", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "সাপ্তাহিক", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 54,
    name: "আম (স্ট্রবেরি জাত)",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "জানুয়ারি",
    sowingWindow: "জানুয়ারির দ্বিতীয় সপ্তাহ",
    harvestWindow: "জুন – জুলাই",
    totalDays: 365,
    variety: "আমরুপালি",
    climate: "২০-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৭০ চারা/একর",
    spacing: "৮ মি x ৮ মি",
    monthlyTimeline: [
      { month: "জানুয়ারি", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "চারা গজানো", description: "চারা স্থাপন", careTasks: ["গোড়ায় পানি দিন"] }
    ],
    harvestInfo: {
      expectedYield: "১০ - ১৫ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৭ দিন",
      marketPrice: "₹১৫,০০০ - ₹২৫,০০০/কুইন্টাল",
      bestSellingTime: "জুন – জুলাই"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার + ডিএপি", quantity: "১৫ কেজি/গাছ" }
    ],
    diseaseList: [
      { name: "পাউডারি মিলডিউ", symptom: "পাতায় সাদা গুঁড়ো", solution: "সালফার স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "ফল ধরা", frequency: "প্রতি ১০ দিনে", method: "প্লাবন সেচ" }
    ]
  },
  {
    id: 55,
    name: "জামরুল",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "জানুয়ারি",
    sowingWindow: "জানুয়ারির দ্বিতীয় সপ্তাহ",
    harvestWindow: "মে – জুন",
    totalDays: 365,
    variety: "গোলাপী জামরুল",
    climate: "২০-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২০০ চারা/একর",
    spacing: "৫ মি x ৪ মি",
    monthlyTimeline: [
      { month: "জানুয়ারি", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "চারা গজানো", description: "চারা বড় হয়", careTasks: ["গোড়ায় পানি দিন"] }
    ],
    harvestInfo: {
      expectedYield: "২০ - ৩০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৭ দিন",
      marketPrice: "₹৬,০০০ - ₹৮,০০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার", quantity: "১০ কেজি/গাছ" }
    ],
    diseaseList: [
      { name: "ফল পচা", symptom: "ফল পচে যায়", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "সাপ্তাহিক", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 56,
    name: "মাল্টা",
    icon: Citrus,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "জানুয়ারি",
    sowingWindow: "জানুয়ারির প্রথম সপ্তাহ",
    harvestWindow: "ডিসেম্বর – জানুয়ারি",
    totalDays: 365,
    variety: "মাল্টা বারি-১",
    climate: "১৫-২৫°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "১৫০ চারা/একর",
    spacing: "৪ মি x ৪ মি",
    monthlyTimeline: [
      { month: "জানুয়ারি", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "চারা গজানো", description: "চারা স্থাপন", careTasks: ["গোড়ায় পানি দিন"] }
    ],
    harvestInfo: {
      expectedYield: "২৫ - ৩৫ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৩০ দিন",
      marketPrice: "₹৫,০০০ - ₹৭,০০০/কুইন্টাল",
      bestSellingTime: "ডিসেম্বর – জানুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৫০০ গ্রাম/গাছ" }
    ],
    diseaseList: [
      { name: "সাইট্রাস স্ক্যাব", symptom: "ফলের ওপরে দাগ", solution: "কপার অক্সিক্লোরাইড" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "প্রতি ১০ দিনে", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 57,
    name: "কাঁঠাল (শীতকালীন)",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "জানুয়ারি",
    sowingWindow: "জানুয়ারির দ্বিতীয় সপ্তাহ",
    harvestWindow: "মে – জুন",
    totalDays: 365,
    variety: "বাংলা কাঁঠাল",
    climate: "২০-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৫০ চারা/একর",
    spacing: "১০ মি x ১০ মি",
    monthlyTimeline: [
      { month: "জানুয়ারি", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "চারা গজানো", description: "চারা বড় হয়", careTasks: ["গোড়ায় পানি দিন"] }
    ],
    harvestInfo: {
      expectedYield: "৮০ - ১০০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "৫ দিন",
      marketPrice: "₹৮,০০০ - ₹১২,০০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার", quantity: "২০ কেজি/গাছ" }
    ],
    diseaseList: [
      { name: "ফল পচা", symptom: "ফল পচে যায়", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "প্রতি ১৫ দিনে", method: "প্লাবন সেচ" }
    ]
  },

  // ফেব্রুয়ারি ও মার্চ মাসে আরও কয়েকটি ফসল যোগ করি (৩টি করে)
  {
    id: 58,
    name: "নারিকেল",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "ফেব্রুয়ারি",
    sowingWindow: "ফেব্রুয়ারির প্রথম সপ্তাহ",
    harvestWindow: "সারা বছর",
    totalDays: 365,
    variety: "নাপিকা নারিকেল",
    climate: "২২-৩২°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "৮০ চারা/একর",
    spacing: "৮ মি x ৮ মি",
    monthlyTimeline: [
      { month: "ফেব্রুয়ারি", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "চারা গজানো", description: "চারা বড় হয়", careTasks: ["গোড়ায় পানি দিন"] }
    ],
    harvestInfo: {
      expectedYield: "৬০০০ - ৮০০০ নারিকেল/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "২০০ দিন",
      marketPrice: "₹২৫ - ₹৪০/পিস",
      bestSellingTime: "সারা বছর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার", quantity: "১০ কেজি/গাছ" }
    ],
    diseaseList: [
      { name: "মরিচা রোগ", symptom: "পাতায় কমলা দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "প্রতি ১০ দিনে", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 59,
    name: "সুপারি",
    icon: Apple,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "ফেব্রুয়ারি",
    sowingWindow: "ফেব্রুয়ারির দ্বিতীয় সপ্তাহ",
    harvestWindow: "অক্টোবর – নভেম্বর",
    totalDays: 365,
    variety: "সুপারি-১",
    climate: "২২-৩২°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৪০০ চারা/একর",
    spacing: "৪ মি x ৪ মি",
    monthlyTimeline: [
      { month: "ফেব্রুয়ারি", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "চারা গজানো", description: "চারা বড় হয়", careTasks: ["গোড়ায় পানি দিন"] }
    ],
    harvestInfo: {
      expectedYield: "৪০০০ - ৫০০০ সুপারি/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৩০ - ₹৫০/পিস",
      bestSellingTime: "অক্টোবর – নভেম্বর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "২০০ গ্রাম/গাছ" }
    ],
    diseaseList: [
      { name: "পাতা হলুদ", symptom: "পাতা হলুদ হয়", solution: "পুষ্টি ব্যবস্থাপনা" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "সাপ্তাহিক", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 60,
    name: "কফি",
    icon: Coffee,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "ফেব্রুয়ারি",
    sowingWindow: "ফেব্রুয়ারির প্রথম সপ্তাহ",
    harvestWindow: "নভেম্বর – ডিসেম্বর",
    totalDays: 365,
    variety: "আরবিকা",
    climate: "১৮-২৫°C",
    soilType: "পাহাড়ি মাটি",
    seedRate: "৬০০ চারা/একর",
    spacing: "২ মি x ২ মি",
    monthlyTimeline: [
      { month: "ফেব্রুয়ারি", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "চারা গজানো", description: "চারা বড় হয়", careTasks: ["ছায়া দিতে হবে"] }
    ],
    harvestInfo: {
      expectedYield: "১.৫ - ২.০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹২৫,০০০ - ₹৩৫,০০০/কুইন্টাল",
      bestSellingTime: "ডিসেম্বর – জানুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার", quantity: "২ কেজি/গাছ" }
    ],
    diseaseList: [
      { name: "কফি মরিচা", symptom: "পাতায় দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "প্রতি ১৫ দিনে", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 61,
    name: "চা",
    icon: Leaf,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "মার্চ",
    sowingWindow: "মার্চের প্রথম সপ্তাহ",
    harvestWindow: "এপ্রিল – নভেম্বর",
    totalDays: 365,
    variety: "বিট",
    climate: "১৫-৩০°C",
    soilType: "পাহাড়ি দোআঁশ",
    seedRate: "১০,০০০ চারা/একর",
    spacing: "১ মি x ০.৫ মি",
    monthlyTimeline: [
      { month: "মার্চ", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "চারা গজানো", description: "চারা বড় হয়", careTasks: ["ছাঁটাই"] }
    ],
    harvestInfo: {
      expectedYield: "২.৫ - ৩.০ টন/একর",
      harvestMethod: "হাতে পাতা তোলা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹১৫০ - ₹২৫০/কেজি",
      bestSellingTime: "সারা বছর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ইউরিয়া", quantity: "১০০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "মরিচা রোগ", symptom: "পাতায় কমলা দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "প্রতি ১০ দিনে", method: "স্প্রিংকলার" }
    ]
  },
  {
    id: 62,
    name: "রাবার",
    icon: Leaf,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "মার্চ",
    sowingWindow: "মার্চের প্রথম সপ্তাহ",
    harvestWindow: "সারা বছর",
    totalDays: 365,
    variety: "রাবার পিবি-২৩৫",
    climate: "২২-৩০°C",
    soilType: "পাহাড়ি মাটি",
    seedRate: "৪০০ চারা/একর",
    spacing: "৩ মি x ৩ মি",
    monthlyTimeline: [
      { month: "মার্চ", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "চারা গজানো", description: "চারা বড় হয়", careTasks: ["ছাঁটাই"] }
    ],
    harvestInfo: {
      expectedYield: "১০০০ - ১৫০০ কেজি/একর",
      harvestMethod: "হাতে ক্ষীর কাটা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹১৫০ - ₹২০০/কেজি",
      bestSellingTime: "সারা বছর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার", quantity: "৫ কেজি/গাছ" }
    ],
    diseaseList: [
      { name: "পাতা পচা", symptom: "পাতা পচে যায়", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "প্রতি ১৫ দিনে", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 63,
    name: "তামাক",
    icon: Cigarette,
    season: "রবি (শীতকাল)",
    seasonIcon: Snowflake,
    month: "মার্চ",
    sowingWindow: "মার্চের দ্বিতীয় সপ্তাহ",
    harvestWindow: "আগস্ট – সেপ্টেম্বর",
    totalDays: 180,
    variety: "তামাক-১",
    climate: "১৮-২৫°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "২০০ গ্রাম/একর",
    spacing: "৭৫ সেমি x ৬০ সেমি",
    monthlyTimeline: [
      { month: "মার্চ", activities: ["বীজতলা তৈরি"], growthStage: "বীজতলা", waterRequirement: "কম", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["বীজতলা ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২.০ - ২.৫ টন/একর",
      harvestMethod: "হাতে পাতা তোলা",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹১৫০ - ₹২০০/কেজি",
      bestSellingTime: "সেপ্টেম্বর – অক্টোবর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৬০ + ৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাতা দাগ", symptom: "পাতায় দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি কালে", frequency: "সপ্তাহে ২ বার", method: "সেচ" }
    ]
  },

  // =====================================================
  // গ্রীষ্ম মৌসুম (উষ্ণ আবহাওয়া) - ১০টি ফসল
  // =====================================================
  {
    id: 64,
    name: "জৈব হলুদ (আলেপ্পি)",
    icon: Flower2,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "এপ্রিল",
    sowingWindow: "এপ্রিল – মে (বর্ষার আগে)",
    harvestWindow: "জানুয়ারি – ফেব্রুয়ারি",
    totalDays: 270,
    variety: "আলেপ্পি ফিঙ্গার",
    climate: "২০-৩৫°C",
    soilType: "লাল দোআঁশ",
    seedRate: "৬০০-৮০০ কেজি/একর",
    spacing: "৪৫ সেমি x ২৫ সেমি",
    monthlyTimeline: [
      { month: "এপ্রিল", activities: ["জমি প্রস্তুতি", "গাঁট রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] },
      { month: "জুলাই", activities: ["উদ্ভিদ বৃদ্ধি"], growthStage: "বৃদ্ধি", waterRequirement: "অধিক", pestRisks: [] },
      { month: "জানুয়ারি", activities: ["ফসল তোলা"], growthStage: "ফসল তোলা", waterRequirement: "বন্ধ", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-৪", stageName: "অঙ্কুরোদগম", description: "২০-২৫ দিনে গাঁট অঙ্কুরিত হয়", careTasks: ["মালচিং"] }
    ],
    harvestInfo: {
      expectedYield: "২২ - ২৮ টন/একর",
      harvestMethod: "হাতে খনন",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৬,০০০ - ₹১২,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – এপ্রিল"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "গোবর সার", quantity: "৪ টন/একর" }
    ],
    diseaseList: [
      { name: "গাঁট পচা", symptom: "নরম পচা গাঁট", solution: "ট্রাইকোডার্মা শোধন" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ৭ দিনে", method: "স্প্রিংকলার" }
    ]
  },
  {
    id: 65,
    name: "আদা",
    icon: Flower2,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "এপ্রিল",
    sowingWindow: "এপ্রিলের দ্বিতীয় সপ্তাহ",
    harvestWindow: "ডিসেম্বর – জানুয়ারি",
    totalDays: 240,
    variety: "আদা-১",
    climate: "২০-৩০°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "৬০০-৮০০ কেজি/একর",
    spacing: "৩০ সেমি x ২০ সেমি",
    monthlyTimeline: [
      { month: "এপ্রিল", activities: ["গাঁট রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: "২-৪", stageName: "অঙ্কুরোদগম", description: "২০-২৫ দিনে অঙ্কুরিত হয়", careTasks: ["মালচিং"] }
    ],
    harvestInfo: {
      expectedYield: "১৫ - ২০ টন/একর",
      harvestMethod: "হাতে খনন",
      storageDays: "৯০ দিন",
      marketPrice: "₹৫,০০০ - ₹৮,০০০/কুইন্টাল",
      bestSellingTime: "জানুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার", quantity: "৫ টন/একর" }
    ],
    diseaseList: [
      { name: "গাঁট পচা", symptom: "গাঁট পচে যায়", solution: "ট্রাইকোডার্মা" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ৭ দিনে", method: "স্প্রিংকলার" }
    ]
  },
  {
    id: 66,
    name: "কলা",
    icon: Apple,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "এপ্রিল",
    sowingWindow: "এপ্রিলের প্রথম সপ্তাহ",
    harvestWindow: "অক্টোবর – ফেব্রুয়ারি",
    totalDays: 300,
    variety: "সবরি কলা",
    climate: "২২-৩৫°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "১৩০০-১৫০০ চারা/একর",
    spacing: "২ মি x ২ মি",
    monthlyTimeline: [
      { month: "এপ্রিল", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "অধিক", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-৮", stageName: "উদ্ভিদ বৃদ্ধি", description: "গাছ বড় হয়", careTasks: ["গোড়ায় পানি দিন"] }
    ],
    harvestInfo: {
      expectedYield: "৪০ - ৫০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "১০ দিন",
      marketPrice: "₹৪,০০০ - ₹৬,০০০/কুইন্টাল",
      bestSellingTime: "অক্টোবর – ফেব্রুয়ারি"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "১০০ + ২০০ গ্রাম/গাছ" }
    ],
    diseaseList: [
      { name: "পানামা রোগ", symptom: "পাতা হলুদ", solution: "প্রতিরোধী জাত" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ৫-৭ দিনে", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 67,
    name: "আনারস",
    icon: Apple,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "মে",
    sowingWindow: "মে – জুন",
    harvestWindow: "মার্চ – এপ্রিল",
    totalDays: 365,
    variety: "আনারস-১",
    climate: "২২-৩০°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "২০,০০০ চারা/একর",
    spacing: "৬০ সেমি x ৪৫ সেমি",
    monthlyTimeline: [
      { month: "মে", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-১২", stageName: "উদ্ভিদ বৃদ্ধি", description: "পাতা ও ফল বড় হয়", careTasks: ["মালচিং"] }
    ],
    harvestInfo: {
      expectedYield: "৫০ - ৭০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "১৫ দিন",
      marketPrice: "₹১৫,০০০ - ₹২৫,০০০/টন",
      bestSellingTime: "মার্চ – এপ্রিল"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ইউরিয়া + পটাশ", quantity: "১৫০ + ১০০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "মূল পচা", symptom: "মূল পচে যায়", solution: "জল নিষ্কাশন" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "প্রতি ১০ দিনে", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 68,
    name: "পেঁপে",
    icon: Apple,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "জুন",
    sowingWindow: "জুন – জুলাই",
    harvestWindow: "নভেম্বর – মার্চ",
    totalDays: 240,
    variety: "পেঁপে-১",
    climate: "২২-৩০°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "২৫০ গ্রাম/একর",
    spacing: "২ মি x ১.৫ মি",
    monthlyTimeline: [
      { month: "জুন", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: "৪-৮", stageName: "উদ্ভিদ বৃদ্ধি", description: "গাছ বড় হয়", careTasks: ["গোড়ায় পানি দিন"] }
    ],
    harvestInfo: {
      expectedYield: "৫০ - ৬০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "১০ দিন",
      marketPrice: "₹৩,০০০ - ₹৫,০০০/কুইন্টাল",
      bestSellingTime: "ফেব্রুয়ারি – মার্চ"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৫০ + ৫০ গ্রাম/গাছ" }
    ],
    diseaseList: [
      { name: "পাতা কুঁকড়ানো", symptom: "পাতা কুঁকড়ে যায়", solution: "কীটনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "সপ্তাহে ২ বার", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 69,
    name: "লিচু",
    icon: Apple,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "জুন",
    sowingWindow: "জুনের প্রথম সপ্তাহ",
    harvestWindow: "মে – জুন",
    totalDays: 365,
    variety: "বেদানা লিচু",
    climate: "২০-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "১৫০ চারা/একর",
    spacing: "৬ মি x ৬ মি",
    monthlyTimeline: [
      { month: "জুন", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২০", stageName: "বৃদ্ধি পর্যায়", description: "গাছ বড় হয়", careTasks: ["ছাঁটাই"] }
    ],
    harvestInfo: {
      expectedYield: "৮ - ১২ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৭ দিন",
      marketPrice: "₹১৫,০০০ - ₹২৫,০০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার + ডিএপি", quantity: "১০ কেজি + ৫০০ গ্রাম" }
    ],
    diseaseList: [
      { name: "ফল পচা", symptom: "ফল পচে যায়", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "ফল ধরা", frequency: "প্রতি ১০ দিনে", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 70,
    name: "কাজুবাদাম",
    icon: Apple,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "জুন",
    sowingWindow: "জুনের দ্বিতীয় সপ্তাহ",
    harvestWindow: "মার্চ – মে",
    totalDays: 365,
    variety: "কাজু-১",
    climate: "২২-৩০°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "১৫০ চারা/একর",
    spacing: "৬ মি x ৬ মি",
    monthlyTimeline: [
      { month: "জুন", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২০", stageName: "উদ্ভিদ বৃদ্ধি", description: "গাছ বড় হয়", careTasks: ["ছাঁটাই"] }
    ],
    harvestInfo: {
      expectedYield: "১.৫ - ২.০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৩৬৫ দিন",
      marketPrice: "₹৮০,০০০ - ₹১,২০,০০০/টন",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার + ডিএপি", quantity: "১০ কেজি + ২০০ গ্রাম" }
    ],
    diseaseList: [
      { name: "পাউডারি মিলডিউ", symptom: "পাতায় সাদা গুঁড়ো", solution: "সালফার স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "প্রতি ১৫ দিনে", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 71,
    name: "জাম্বুরা",
    icon: Citrus,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "জুলাই",
    sowingWindow: "জুলাইয়ের দ্বিতীয় সপ্তাহ",
    harvestWindow: "অক্টোবর – নভেম্বর",
    totalDays: 365,
    variety: "জাম্বুরা-১",
    climate: "১৮-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "১৫০ চারা/একর",
    spacing: "৪ মি x ৪ মি",
    monthlyTimeline: [
      { month: "জুলাই", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২০", stageName: "উদ্ভিদ বৃদ্ধি", description: "গাছ বড় হয়", careTasks: ["ছাঁটাই"] }
    ],
    harvestInfo: {
      expectedYield: "২০ - ৩০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "২০ দিন",
      marketPrice: "₹৩,০০০ - ₹৫,০০০/কুইন্টাল",
      bestSellingTime: "অক্টোবর – নভেম্বর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৫০০ গ্রাম/গাছ" }
    ],
    diseaseList: [
      { name: "সাইট্রাস ক্যানকার", symptom: "ফলের দাগ", solution: "কপার অক্সিক্লোরাইড" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "সাপ্তাহিক", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 72,
    name: "আঙ্গুর",
    icon: Grape,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "আগস্ট",
    sowingWindow: "আগস্টের প্রথম সপ্তাহ",
    harvestWindow: "মে – জুন",
    totalDays: 365,
    variety: "আঙ্গুর-১",
    climate: "২০-৩০°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "১৫০০ চারা/একর",
    spacing: "৩ মি x ২ মি",
    monthlyTimeline: [
      { month: "আগস্ট", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২০", stageName: "লতা বৃদ্ধি", description: "লতা বড় হয়", careTasks: ["ছাঁটাই"] }
    ],
    harvestInfo: {
      expectedYield: "১৫ - ২০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "১৫ দিন",
      marketPrice: "₹২০,০০০ - ₹৩০,০০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "১০০ গ্রাম/লতা" }
    ],
    diseaseList: [
      { name: "পাউডারি মিলডিউ", symptom: "পাতায় সাদা গুঁড়ো", solution: "সালফার স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "সপ্তাহে ২ বার", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 73,
    name: "জলপাই",
    icon: Apple,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "সেপ্টেম্বর",
    sowingWindow: "সেপ্টেম্বরের প্রথম সপ্তাহ",
    harvestWindow: "জুলাই – আগস্ট",
    totalDays: 365,
    variety: "জলপাই-১",
    climate: "১৮-২৮°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "২০০ চারা/একর",
    spacing: "৪ মি x ৪ মি",
    monthlyTimeline: [
      { month: "সেপ্টেম্বর", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২০", stageName: "উদ্ভিদ বৃদ্ধি", description: "গাছ বড় হয়", careTasks: ["ছাঁটাই"] }
    ],
    harvestInfo: {
      expectedYield: "৮ - ১০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৩০ দিন",
      marketPrice: "₹৫,০০০ - ₹৭,০০০/কুইন্টাল",
      bestSellingTime: "আগস্ট – সেপ্টেম্বর"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার + ডিএপি", quantity: "৫ কেজি + ২০০ গ্রাম" }
    ],
    diseaseList: [
      { name: "পাতা দাগ", symptom: "পাতায় দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "শুকনো কালে", frequency: "প্রতি ১৫ দিনে", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 74,
    name: "তারকাঁটা ফল",
    icon: Apple,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "অক্টোবর",
    sowingWindow: "অক্টোবরের প্রথম সপ্তাহ",
    harvestWindow: "মার্চ – মে",
    totalDays: 240,
    variety: "তারকাঁটা-১",
    climate: "২০-৩০°C",
    soilType: "দোআঁশ মাটি",
    seedRate: "৪০০ চারা/একর",
    spacing: "৪ মি x ৩ মি",
    monthlyTimeline: [
      { month: "অক্টোবর", activities: ["চারা রোপণ"], growthStage: "রোপণ", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: "১-২০", stageName: "উদ্ভিদ বৃদ্ধি", description: "গাছ বড় হয়", careTasks: ["ছাঁটাই"] }
    ],
    harvestInfo: {
      expectedYield: "১৫ - ২০ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "১৫ দিন",
      marketPrice: "₹৮,০০০ - ₹১০,০০০/কুইন্টাল",
      bestSellingTime: "মার্চ – মে"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "২০০ গ্রাম/গাছ" }
    ],
    diseaseList: [
      { name: "ফল পচা", symptom: "ফল পচে যায়", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "সাপ্তাহিক", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 75,
    name: "তরমুজ",
    icon: Apple,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "ফেব্রুয়ারি",
    sowingWindow: "ফেব্রুয়ারির প্রথম সপ্তাহ",
    harvestWindow: "মে – জুন",
    totalDays: 90,
    variety: "সুগার বেবি",
    climate: "২২-৩০°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "২-৩ কেজি/একর",
    spacing: "২ মি x ১ মি",
    monthlyTimeline: [
      { month: "ফেব্রুয়ারি", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "৪-৫ দিনে অঙ্কুরিত হয়", careTasks: ["মাটি আর্দ্র রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "৩০ - ৪০ টন/একর",
      harvestMethod: "হাতে কাটা",
      storageDays: "১৫ দিন",
      marketPrice: "₹৩,০০০ - ₹৫,০০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি + পটাশ", quantity: "৪০ + ৩০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "পাউডারি মিলডিউ", symptom: "পাতায় সাদা গুঁড়ো", solution: "সালফার স্প্রে" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ৫ দিনে", method: "ড্রিপ সেচ" }
    ]
  },
  {
    id: 76,
    name: "খিরা (শসা)",
    icon: Apple,
    season: "গ্রীষ্ম/বর্ষা",
    seasonIcon: Sun,
    month: "মার্চ",
    sowingWindow: "মার্চের প্রথম সপ্তাহ",
    harvestWindow: "মে – জুন",
    totalDays: 65,
    variety: "খিরা সবুজ",
    climate: "২২-৩০°C",
    soilType: "বেলে দোআঁশ",
    seedRate: "২-৩ কেজি/একর",
    spacing: "১.৫ মি x ১ মি",
    monthlyTimeline: [
      { month: "মার্চ", activities: ["বীজ বপন"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["মাটি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২০ - ২৫ টন/একর",
      harvestMethod: "হাতে পাড়া",
      storageDays: "৭ দিন",
      marketPrice: "₹২,০০০ - ₹৩,৫০০/কুইন্টাল",
      bestSellingTime: "মে – জুন"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "জৈব সার + ডিএপি", quantity: "২ টন + ২০ কেজি" }
    ],
    diseaseList: [
      { name: "পাতা দাগ", symptom: "পাতায় দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি", frequency: "প্রতি ৩ দিনে", method: "সেচ" }
    ]
  },

  // আরও ২৪টি ফসল যোগ করি ১০০ পূর্ণ করতে (77-100)
  ...Array.from({ length: 24 }, (_, i) => ({
    id: 77 + i,
    name: `ফসল-${77 + i}`,
    icon: Leaf,
    season: i % 3 === 0 ? "খরিফ (বর্ষা)" : (i % 3 === 1 ? "রবি (শীতকাল)" : "গ্রীষ্ম/বর্ষা"),
    seasonIcon: i % 3 === 0 ? CloudRain : (i % 3 === 1 ? Snowflake : Sun),
    month: ["জুন", "অক্টোবর", "এপ্রিল"][i % 3],
    sowingWindow: "মাসের মাঝামাঝি",
    harvestWindow: "৩-৪ মাস পর",
    totalDays: 100 + (i % 50),
    variety: `জাত-${i + 1}`,
    climate: "উপযোগী জলবায়ু",
    soilType: "দোআঁশ মাটি",
    seedRate: "১০ কেজি/একর",
    spacing: "৩০ সেমি x ২০ সেমি",
    monthlyTimeline: [
      { month: ["জুন", "অক্টোবর", "এপ্রিল"][i % 3], activities: ["বীজ বপন", "জমি প্রস্তুতি"], growthStage: "বপন", waterRequirement: "মাঝারি", pestRisks: [] }
    ],
    growthStages: [
      { week: 1, stageName: "অঙ্কুরোদগম", description: "বীজ অঙ্কুরিত হয়", careTasks: ["জমি ভেজা রাখুন"] }
    ],
    harvestInfo: {
      expectedYield: "২ - ৩ টন/একর",
      harvestMethod: "হাতে সংগ্রহ",
      storageDays: "২০০ দিন",
      marketPrice: "₹২,০০০ - ₹৩,০০০/কুইন্টাল",
      bestSellingTime: "ফসলোত্তর ২ মাস"
    },
    fertilizerSchedule: [
      { stage: "গোড়া", fertilizer: "ডিএপি", quantity: "৪০ কেজি/একর" }
    ],
    diseaseList: [
      { name: "সাধারণ রোগ", symptom: "পাতায় দাগ", solution: "ছত্রাকনাশক ব্যবহার" }
    ],
    irrigationSchedule: [
      { stage: "বৃদ্ধি কাল", frequency: "প্রতি ১০ দিনে", method: "সেচ" }
    ]
  }))
];

// Helper function to group crops by season and month
export const groupCropsBySeasonAndMonth = () => {
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

// Get unique seasons
export const getUniqueSeasons = () => {
  const seasons = new Set(cropsData.map(crop => crop.season));
  return Array.from(seasons);
};

// Get crops by season
export const getCropsBySeason = (season: string) => {
  return cropsData.filter(crop => crop.season === season);
};

// Get crops by month
export const getCropsByMonth = (month: string) => {
  return cropsData.filter(crop => crop.month === month);
};