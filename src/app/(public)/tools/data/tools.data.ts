// app/tools/data/tools.data.ts

import {
  Tractor,
  Droplets,
  Sprout,
  Scissors,
  Truck,
  Wrench,
  Thermometer,
  CloudRain,
  Sun,
  Wind,
  Battery,
  Activity,
  Zap,
  Container,
  Gauge,
  Hammer,
  Shovel,
  Leaf,
  Flower2
} from 'lucide-react';

// --- Types ---
export interface Tool {
  id: number;
  name: string;
  nameBn: string;
  category: string;
  categoryBn: string;
  icon: React.ElementType;
  description: string;
  descriptionBn: string;
  price: string;
  priceBn: string;
  brand: string;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
  specifications: {
    label: string;
    value: string;
  }[];
  image?: string;
  rating: number;
  reviews: number;
  uses: string[];
  maintenance: string[];
  warranty: string;
}

export interface EquipmentCategory {
  id: string;
  name: string;
  nameBn: string;
  icon: React.ElementType;
  count: number;
  color: string;
}

// --- Equipment Categories ---
export const toolCategories: EquipmentCategory[] = [
  { id: 'all', name: 'All', nameBn: 'সব', icon: Wrench, count: 24, color: 'from-gray-600 to-gray-500' },
  { id: 'tractor', name: 'Tractors', nameBn: 'ট্রাক্টর', icon: Tractor, count: 6, color: 'from-green-700 to-green-600' },
  { id: 'irrigation', name: 'Irrigation', nameBn: 'সেচ যন্ত্র', icon: Droplets, count: 5, color: 'from-blue-600 to-cyan-500' },
  { id: 'harvesting', name: 'Harvesting', nameBn: 'ফসল তোলার যন্ত্র', icon: Scissors, count: 4, color: 'from-amber-600 to-yellow-600' },
  { id: 'tillage', name: 'Tillage', nameBn: 'জমি প্রস্তুতির যন্ত্র', icon: Shovel, count: 3, color: 'from-stone-600 to-stone-500' },
  { id: 'sprayer', name: 'Sprayers', nameBn: 'স্প্রে মেশিন', icon: Droplets, count: 3, color: 'from-emerald-600 to-teal-500' },
  { id: 'sensor', name: 'Sensors', nameBn: 'সেন্সর', icon: Thermometer, count: 3, color: 'from-indigo-600 to-purple-500' }
];

// --- Tools Data ---
export const toolsData: Tool[] = [
  // Tractors (6)
  {
    id: 1,
    name: "Mahindra 275 DI",
    nameBn: "মহিন্দ্রা ২৭৫ ডিআই",
    category: "tractor",
    categoryBn: "ট্রাক্টর",
    icon: Tractor,
    description: "35 HP diesel tractor for small to medium farms",
    descriptionBn: "ছোট থেকে মাঝারি খামারের জন্য ৩৫ এইচপি ডিজেল ট্রাক্টর",
    price: "₹4,50,000 - ₹5,20,000",
    priceBn: "₹৪,৫০,০০০ - ₹৫,২০,০০০",
    brand: "Mahindra",
    availability: "in-stock",
    specifications: [
      { label: "Engine Power", value: "35 HP" },
      { label: "Engine Type", value: "4 Stroke Diesel" },
      { label: "Fuel Tank", value: "45 Liters" },
      { label: "Weight", value: "1520 kg" },
      { label: "PTO HP", value: "31 HP" },
      { label: "Brakes", value: "Oil Immersed" }
    ],
    rating: 4.7,
    reviews: 128,
    uses: ["জমি চাষ", "মাল বহন", "সেচ পাম্প চালানো", "ফসল তোলা"],
    maintenance: ["প্রতি ৫০ ঘন্টা পর তেল পরিবর্তন", "এয়ার ফিল্টার পরিষ্কার", "টায়ার প্রেসার চেক"],
    warranty: "5 years / 5000 hours"
  },
  {
    id: 2,
    name: "John Deere 5050D",
    nameBn: "জন ডিয়ার ৫০৫০ডি",
    category: "tractor",
    categoryBn: "ট্রাক্টর",
    icon: Tractor,
    description: "50 HP powerful tractor for heavy duty farming",
    descriptionBn: "ভারী কাজের জন্য ৫০ এইচপি শক্তিশালী ট্রাক্টর",
    price: "₹7,80,000 - ₹8,50,000",
    priceBn: "₹৭,৮০,০০০ - ₹৮,৫০,০০০",
    brand: "John Deere",
    availability: "in-stock",
    specifications: [
      { label: "Engine Power", value: "50 HP" },
      { label: "Engine Type", value: "4 Stroke Diesel" },
      { label: "Fuel Tank", value: "60 Liters" },
      { label: "Weight", value: "2100 kg" },
      { label: "PTO HP", value: "45 HP" },
      { label: "Gears", value: "8 Forward + 2 Reverse" }
    ],
    rating: 4.9,
    reviews: 256,
    uses: ["ভারী জমি চাষ", "হাল চাষ", "ডিস্কিং", "লেভেলিং"],
    maintenance: ["প্রতি ১০০ ঘন্টা পর সার্ভিস", "ডিজেল ফিল্টার পরিবর্তন", "ক্লাচ অ্যাডজাস্ট"],
    warranty: "5 years / 5000 hours"
  },
  {
    id: 3,
    name: "Sonalika DI 42",
    nameBn: "সোনালিকা ডিআই ৪২",
    category: "tractor",
    categoryBn: "ট্রাক্টর",
    icon: Tractor,
    description: "42 HP economical tractor for Indian farmers",
    descriptionBn: "ভারতীয় কৃষকদের জন্য ৪২ এইচপি সাশ্রয়ী ট্রাক্টর",
    price: "₹5,50,000 - ₹6,20,000",
    priceBn: "₹৫,৫০,০০০ - ₹৬,২০,০০০",
    brand: "Sonalika",
    availability: "in-stock",
    specifications: [
      { label: "Engine Power", value: "42 HP" },
      { label: "Engine Type", value: "3 Cylinder Diesel" },
      { label: "Fuel Tank", value: "50 Liters" },
      { label: "Weight", value: "1680 kg" },
      { label: "PTO HP", value: "38 HP" }
    ],
    rating: 4.6,
    reviews: 189,
    uses: ["জমি চাষ", "সেচ", "মাল বহন", "কাটিং"],
    maintenance: ["প্রতি ৬০ ঘন্টা পর তেল পরিবর্তন", "ব্যাটারি চেক"],
    warranty: "4 years / 4000 hours"
  },
  {
    id: 4,
    name: "New Holland 3630",
    nameBn: "নিউ হল্যান্ড ৩৬৩০",
    category: "tractor",
    categoryBn: "ট্রাক্টর",
    icon: Tractor,
    description: "55 HP premium tractor with advanced features",
    descriptionBn: "আধুনিক ফিচার সমৃদ্ধ ৫৫ এইচপি প্রিমিয়াম ট্রাক্টর",
    price: "₹8,20,000 - ₹9,00,000",
    priceBn: "₹৮,২০,০০০ - ₹৯,০০,০০০",
    brand: "New Holland",
    availability: "in-stock",
    specifications: [
      { label: "Engine Power", value: "55 HP" },
      { label: "Engine Type", value: "4 Cylinder Diesel" },
      { label: "Fuel Tank", value: "65 Liters" },
      { label: "Weight", value: "2250 kg" },
      { label: "PTO HP", value: "49 HP" }
    ],
    rating: 4.8,
    reviews: 167,
    uses: ["ভারী চাষ", "কম্বাইন হারভেস্টিং", "মাল্টি টাস্ক"],
    maintenance: ["প্রতি ৮০ ঘন্টা পর সার্ভিস", "হাইড্রলিক অয়েল চেক"],
    warranty: "5 years / 5000 hours"
  },
  {
    id: 5,
    name: "Farmtrac 45",
    nameBn: "ফার্মট্র্যাক ৪৫",
    category: "tractor",
    categoryBn: "ট্রাক্টর",
    icon: Tractor,
    description: "45 HP compact tractor for orchards",
    descriptionBn: "বাগানের জন্য ৪৫ এইচপি কম্প্যাক্ট ট্রাক্টর",
    price: "₹6,20,000 - ₹6,90,000",
    priceBn: "₹৬,২০,০০০ - ₹৬,৯০,০০০",
    brand: "Farmtrac",
    availability: "low-stock",
    specifications: [
      { label: "Engine Power", value: "45 HP" },
      { label: "Engine Type", value: "4 Stroke" },
      { label: "Fuel Tank", value: "48 Liters" },
      { label: "Weight", value: "1750 kg" }
    ],
    rating: 4.5,
    reviews: 98,
    uses: ["বাগান চাষ", "ফলের বাগান", "সবজি ক্ষেত"],
    maintenance: ["প্রতি ৫০ ঘন্টা পর তেল পরিবর্তন", "টায়ার চেক"],
    warranty: "3 years / 3000 hours"
  },
  {
    id: 6,
    name: "Eicher 480",
    nameBn: "আইচার ৪৮০",
    category: "tractor",
    categoryBn: "ট্রাক্টর",
    icon: Tractor,
    description: "48 HP tractor with fuel efficiency",
    descriptionBn: "জ্বালানি সাশ্রয়ী ৪৮ এইচপি ট্রাক্টর",
    price: "₹5,80,000 - ₹6,50,000",
    priceBn: "₹৫,৮০,০০০ - ₹৬,৫০,০০০",
    brand: "Eicher",
    availability: "in-stock",
    specifications: [
      { label: "Engine Power", value: "48 HP" },
      { label: "Engine Type", value: "3 Cylinder" },
      { label: "Fuel Tank", value: "52 Liters" },
      { label: "Weight", value: "1850 kg" }
    ],
    rating: 4.4,
    reviews: 112,
    uses: ["মাঝারি চাষ", "পরিবহন", "সেচ"],
    maintenance: ["প্রতি ৭০ ঘন্টা পর সার্ভিস", "ইঞ্জিন অয়েল চেক"],
    warranty: "4 years / 4000 hours"
  },

  // Irrigation Tools (5)
  {
    id: 7,
    name: "Drip Irrigation Kit",
    nameBn: "ড্রিপ ইরিগেশন কিট",
    category: "irrigation",
    categoryBn: "সেচ যন্ত্র",
    icon: Droplets,
    description: "Complete drip irrigation system for 1 acre",
    descriptionBn: "১ একরের জন্য সম্পূর্ণ ড্রিপ সেচ ব্যবস্থা",
    price: "₹12,000 - ₹18,000",
    priceBn: "₹১২,০০০ - ₹১৮,০০০",
    brand: "Netafim",
    availability: "in-stock",
    specifications: [
      { label: "Coverage", value: "1 acre" },
      { label: "Pipe Size", value: "16mm" },
      { label: "Dripper Spacing", value: "30cm" },
      { label: "Flow Rate", value: "2 LPH" },
      { label: "Pressure", value: "1-2 Bar" }
    ],
    rating: 4.8,
    reviews: 234,
    uses: ["ড্রিপ সেচ", "পানি সাশ্রয়", "উন্নত ফলন"],
    maintenance: ["ফিল্টার পরিষ্কার করুন", "ড্রিপার চেক করুন", "পাইপ লিক চেক"],
    warranty: "2 years"
  },
  {
    id: 8,
    name: "Sprinkler Irrigation Set",
    nameBn: "স্প্রিংকলার ইরিগেশন সেট",
    category: "irrigation",
    categoryBn: "সেচ যন্ত্র",
    icon: CloudRain,
    description: "Full coverage sprinkler system for 2 acres",
    descriptionBn: "২ একরের জন্য সম্পূর্ণ স্প্রিংকলার ব্যবস্থা",
    price: "₹25,000 - ₹35,000",
    priceBn: "₹২৫,০০০ - ₹৩৫,০০০",
    brand: "Jain Irrigation",
    availability: "in-stock",
    specifications: [
      { label: "Coverage", value: "2 acres" },
      { label: "Sprinkler Head", value: "Impact type" },
      { label: "Radius", value: "12-18 meters" },
      { label: "Flow Rate", value: "15-20 LPM" }
    ],
    rating: 4.6,
    reviews: 167,
    uses: ["সবজি ক্ষেতে সেচ", "শস্য ক্ষেতে সেচ", "শীতকালীন ফসল"],
    maintenance: ["স্প্রিংকলার হেড পরিষ্কার", "পাইপ চেক", "লিকেজ পরীক্ষা"],
    warranty: "1 year"
  },
  {
    id: 9,
    name: "Submersible Water Pump",
    nameBn: "সাবমার্সিবল ওয়াটার পাম্প",
    category: "irrigation",
    categoryBn: "সেচ যন্ত্র",
    icon: Zap,
    description: "3 HP submersible pump for deep wells",
    descriptionBn: "গভীর নলকূপের জন্য ৩ এইচপি সাবমার্সিবল পাম্প",
    price: "₹18,000 - ₹25,000",
    priceBn: "₹১৮,০০০ - ₹২৫,০০০",
    brand: "Crompton",
    availability: "in-stock",
    specifications: [
      { label: "Power", value: "3 HP" },
      { label: "Voltage", value: "230V" },
      { label: "Max Head", value: "60 meters" },
      { label: "Flow Rate", value: "200 LPM" },
      { label: "Phase", value: "Single Phase" }
    ],
    rating: 4.7,
    reviews: 345,
    uses: ["নলকূপ থেকে পানি তোলা", "জলাধার ভর্তি", "সেচ"],
    maintenance: ["মটর তেল চেক", "ক্যাপাসিটর চেক", "ওয়্যারিং চেক"],
    warranty: "2 years"
  },
  {
    id: 10,
    name: "Solar Water Pump",
    nameBn: "সোলার ওয়াটার পাম্প",
    category: "irrigation",
    categoryBn: "সেচ যন্ত্র",
    icon: Sun,
    description: "5 HP solar powered pump for sustainable farming",
    descriptionBn: "টেকসই চাষের জন্য ৫ এইচপি সোলার পাম্প",
    price: "₹1,80,000 - ₹2,20,000",
    priceBn: "₹১,৮০,০০০ - ₹২,২০,০০০",
    brand: "Lubi",
    availability: "low-stock",
    specifications: [
      { label: "Power", value: "5 HP" },
      { label: "Solar Panel", value: "5.5 KW" },
      { label: "Controller", value: "VFD" },
      { label: "Flow Rate", value: "300 LPM" }
    ],
    rating: 4.9,
    reviews: 89,
    uses: ["বিদ্যুৎবিহীন এলাকায় সেচ", "পরিবেশবান্ধব চাষ"],
    maintenance: ["সোলার প্যানেল পরিষ্কার", "কন্ট্রোলার চেক", "পাম্প সার্ভিস"],
    warranty: "5 years on panel"
  },
  {
    id: 11,
    name: "Hose Pipe Reel",
    nameBn: "হোজ পাইপ রিল",
    category: "irrigation",
    categoryBn: "সেচ যন্ত্র",
    icon: Container,
    description: "100 meter hose pipe with automatic reel",
    descriptionBn: "১০০ মিটার হোজ পাইপ সহ অটোমেটিক রিল",
    price: "₹5,500 - ₹8,000",
    priceBn: "₹৫,৫০০ - ₹৮,০০০",
    brand: "Flo",
    availability: "in-stock",
    specifications: [
      { label: "Length", value: "100 meters" },
      { label: "Diameter", value: "1 inch" },
      { label: "Material", value: "PVC" }
    ],
    rating: 4.5,
    reviews: 78,
    uses: ["সেচের পাইপ সংরক্ষণ", "পানি সরবরাহ"],
    maintenance: ["পাইপ পরিষ্কার", "রিল লুব্রিকেট", "লিক চেক"],
    warranty: "6 months"
  },

  // Harvesting Tools (4)
  {
    id: 12,
    name: "Combine Harvester",
    nameBn: "কম্বাইন হারভেস্টার",
    category: "harvesting",
    categoryBn: "ফসল তোলার যন্ত্র",
    icon: Scissors,
    description: "Multi-crop combine harvester for rice/wheat",
    descriptionBn: "ধান/গমের জন্য মাল্টি-ক্রপ কম্বাইন হারভেস্টার",
    price: "₹12,00,000 - ₹15,00,000",
    priceBn: "₹১২,০০,০০০ - ₹১৫,০০,০০০",
    brand: "Kartar",
    availability: "low-stock",
    specifications: [
      { label: "Engine Power", value: "65 HP" },
      { label: "Cutting Width", value: "5 feet" },
      { label: "Grain Tank", value: "1000 kg" },
      { label: "Fuel Tank", value: "80 Liters" }
    ],
    rating: 4.8,
    reviews: 56,
    uses: ["ধান কাটা", "গম কাটা", "মাড়াই", "দানা আলাদা"],
    maintenance: ["ব্লেড শার্পেন", "ইঞ্জিন সার্ভিস", "লুব্রিকেশন"],
    warranty: "3 years / 3000 hours"
  },
  {
    id: 13,
    name: "Reaper Machine",
    nameBn: "রিপার মেশিন",
    category: "harvesting",
    categoryBn: "ফসল তোলার যন্ত্র",
    icon: Scissors,
    description: "Small reaper for paddy harvesting",
    descriptionBn: "ধান কাটার জন্য ছোট রিপার মেশিন",
    price: "₹85,000 - ₹1,20,000",
    priceBn: "₹৮৫,০০০ - ₹১,২০,০০০",
    brand: "Dasmesh",
    availability: "in-stock",
    specifications: [
      { label: "Engine", value: "8 HP" },
      { label: "Cutting Width", value: "3 feet" },
      { label: "Weight", value: "180 kg" }
    ],
    rating: 4.6,
    reviews: 112,
    uses: ["ধান কাটা", "ছোট জমির ফসল"],
    maintenance: ["ব্লেড চেক", "ইঞ্জিন অয়েল পরিবর্তন"],
    warranty: "2 years"
  },
  {
    id: 14,
    name: "Thresher Machine",
    nameBn: "থ্রেসার মেশিন",
    category: "harvesting",
    categoryBn: "ফসল তোলার যন্ত্র",
    icon: Activity,
    description: "Multi-crop thresher for grains separation",
    descriptionBn: "দানা আলাদা করার মাল্টি-ক্রপ থ্রেসার",
    price: "₹35,000 - ₹50,000",
    priceBn: "₹৩৫,০০০ - ₹৫০,০০০",
    brand: "Mittal",
    availability: "in-stock",
    specifications: [
      { label: "Power", value: "5 HP" },
      { label: "Capacity", value: "500 kg/hr" },
      { label: "Voltage", value: "230V" }
    ],
    rating: 4.4,
    reviews: 234,
    uses: ["ধান মাড়াই", "গম মাড়াই", "দানা আলাদা"],
    maintenance: ["ভেন্ট পরিষ্কার", "বেল্ট চেক", "মটর সার্ভিস"],
    warranty: "1 year"
  },
  {
    id: 15,
    name: "Power Weeder",
    nameBn: "পাওয়ার উইডার",
    category: "harvesting",
    categoryBn: "ফসল তোলার যন্ত্র",
    icon: Activity,
    description: "Manual power weeder for weed removal",
    descriptionBn: "আগাছা অপসারণের পাওয়ার উইডার",
    price: "₹18,000 - ₹25,000",
    priceBn: "₹১৮,০০০ - ₹২৫,০০০",
    brand: "Honda",
    availability: "in-stock",
    specifications: [
      { label: "Engine", value: "2.5 HP" },
      { label: "Working Width", value: "12 inches" },
      { label: "Weight", value: "25 kg" }
    ],
    rating: 4.5,
    reviews: 89,
    uses: ["আগাছা পরিষ্কার", "মাটি আলগা করা"],
    maintenance: ["ব্লেড পরিষ্কার", "ইঞ্জিন চেক"],
    warranty: "2 years"
  },

  // Tillage Tools (3)
  {
    id: 16,
    name: "Disc Plough",
    nameBn: "ডিস্ক প্লো",
    category: "tillage",
    categoryBn: "জমি প্রস্তুতির যন্ত্র",
    icon: Shovel,
    description: "Heavy duty disc plough for deep plowing",
    descriptionBn: "গভীর চাষের জন্য হেভি ডিউটি ডিস্ক প্লো",
    price: "₹25,000 - ₹35,000",
    priceBn: "₹২৫,০০০ - ₹৩৫,০০০",
    brand: "Fieldking",
    availability: "in-stock",
    specifications: [
      { label: "No. of Discs", value: "3" },
      { label: "Working Width", value: "36 inches" },
      { label: "Tractor HP Required", value: "35-50 HP" }
    ],
    rating: 4.7,
    reviews: 156,
    uses: ["গভীর চাষ", "জমি প্রস্তুতি", "আবর্জনা দমন"],
    maintenance: ["ডিস্ক শার্পেন", "লুব্রিকেশন", "বোল্ট চেক"],
    warranty: "2 years"
  },
  {
    id: 17,
    name: "Rotavator",
    nameBn: "রোটাভেটর",
    category: "tillage",
    categoryBn: "জমি প্রস্তুতির যন্ত্র",
    icon: Gauge,
    description: "Multi-purpose rotavator for soil preparation",
    descriptionBn: "জমি প্রস্তুতির মাল্টিপারপাস রোটাভেটর",
    price: "₹45,000 - ₹60,000",
    priceBn: "₹৪৫,০০০ - ₹৬০,০০০",
    brand: "Khedut",
    availability: "in-stock",
    specifications: [
      { label: "Working Width", value: "48 inches" },
      { label: "No. of Blades", value: "54" },
      { label: "Tractor HP", value: "40-60 HP" }
    ],
    rating: 4.8,
    reviews: 203,
    uses: ["মাটি চূর্ণ", "আগাছা মেশানো", "জমি সমতল"],
    maintenance: ["ব্লেড পরিবর্তন", "গিয়ার চেক", "লুব্রিকেশন"],
    warranty: "3 years"
  },
  {
    id: 18,
    name: "Cultivator",
    nameBn: "কাল্টিভেটর",
    category: "tillage",
    categoryBn: "জমি প্রস্তুতির যন্ত্র",
    icon: Hammer,
    description: "9 tyne cultivator for soil aeration",
    descriptionBn: "মাটি বায়ুচলাচলের জন্য ৯ টাইন কাল্টিভেটর",
    price: "₹18,000 - ₹25,000",
    priceBn: "₹১৮,০০০ - ₹২৫,০০০",
    brand: "Universal",
    availability: "in-stock",
    specifications: [
      { label: "No. of Tyne", value: "9" },
      { label: "Working Width", value: "6 feet" },
      { label: "Weight", value: "350 kg" }
    ],
    rating: 4.5,
    reviews: 98,
    uses: ["মাটি আলগা", "আগাছা নিয়ন্ত্রণ", "জমি প্রস্তুতি"],
    maintenance: ["টাইন চেক", "ফ্রেম পরীক্ষা"],
    warranty: "2 years"
  },

  // Sprayers (3)
  {
    id: 19,
    name: "Knapsack Sprayer",
    nameBn: "ন্যাপস্যাক স্প্রেয়ার",
    category: "sprayer",
    categoryBn: "স্প্রে মেশিন",
    icon: Droplets,
    description: "16 liter manual knapsack sprayer",
    descriptionBn: "১৬ লিটার ম্যানুয়াল ন্যাপস্যাক স্প্রেয়ার",
    price: "₹800 - ₹1,200",
    priceBn: "₹৮০০ - ₹১,২০০",
    brand: "Aspee",
    availability: "in-stock",
    specifications: [
      { label: "Capacity", value: "16 Liters" },
      { label: "Weight", value: "4.5 kg" },
      { label: "Spray Range", value: "3-4 meters" }
    ],
    rating: 4.6,
    reviews: 567,
    uses: ["কীটনাশক স্প্রে", "সার স্প্রে", "আগাছানাশক স্প্রে"],
    maintenance: ["নোজেল পরিষ্কার", "ট্যাংক ধোয়া", "পাম্প চেক"],
    warranty: "1 year"
  },
  {
    id: 20,
    name: "Power Sprayer",
    nameBn: "পাওয়ার স্প্রেয়ার",
    category: "sprayer",
    categoryBn: "স্প্রে মেশিন",
    icon: Zap,
    description: "Battery operated power sprayer",
    descriptionBn: "ব্যাটারি চালিত পাওয়ার স্প্রেয়ার",
    price: "₹4,500 - ₹6,500",
    priceBn: "₹৪,৫০০ - ₹৬,৫০০",
    brand: "KisanKraft",
    availability: "in-stock",
    specifications: [
      { label: "Capacity", value: "20 Liters" },
      { label: "Battery", value: "12V 7Ah" },
      { label: "Spray Range", value: "5-6 meters" }
    ],
    rating: 4.7,
    reviews: 234,
    uses: ["বড় জমিতে স্প্রে", "দ্রুত স্প্রে"],
    maintenance: ["ব্যাটারি চার্জ", "নোজেল পরিষ্কার", "মটর চেক"],
    warranty: "2 years"
  },
  {
    id: 21,
    name: "Mist Blower",
    nameBn: "মিস্ট ব্লোয়ার",
    category: "sprayer",
    categoryBn: "স্প্রে মেশিন",
    icon: Wind,
    description: "High power mist blower for orchards",
    descriptionBn: "বাগানের জন্য হাই পাওয়ার মিস্ট ব্লোয়ার",
    price: "₹12,000 - ₹18,000",
    priceBn: "₹১২,০০০ - ₹১৮,০০০",
    brand: "Honda",
    availability: "low-stock",
    specifications: [
      { label: "Engine", value: "2.5 HP" },
      { label: "Capacity", value: "14 Liters" },
      { label: "Air Speed", value: "80 m/s" }
    ],
    rating: 4.8,
    reviews: 112,
    uses: ["বাগানের স্প্রে", "উঁচু গাছের স্প্রে"],
    maintenance: ["এয়ার ফিল্টার পরিষ্কার", "ইঞ্জিন চেক"],
    warranty: "2 years"
  },

  // Sensors (3)
  {
    id: 22,
    name: "Soil Moisture Sensor",
    nameBn: "মাটির আর্দ্রতা সেন্সর",
    category: "sensor",
    categoryBn: "সেন্সর",
    icon: Thermometer,
    description: "Digital soil moisture meter",
    descriptionBn: "ডিজিটাল মাটির আর্দ্রতা মিটার",
    price: "₹1,500 - ₹2,500",
    priceBn: "₹১,৫০০ - ₹২,৫০০",
    brand: "HTC",
    availability: "in-stock",
    specifications: [
      { label: "Measurement", value: "0-100%" },
      { label: "Accuracy", value: "±2%" },
      { label: "Battery", value: "9V" }
    ],
    rating: 4.5,
    reviews: 345,
    uses: ["মাটির আর্দ্রতা পরিমাপ", "সেচ সময় নির্ধারণ"],
    maintenance: ["প্রোব পরিষ্কার", "ব্যাটারি পরিবর্তন"],
    warranty: "6 months"
  },
  {
    id: 23,
    name: "pH Meter",
    nameBn: "পিএইচ মিটার",
    category: "sensor",
    categoryBn: "সেন্সর",
    icon: Battery,
    description: "Digital soil pH tester",
    descriptionBn: "ডিজিটাল মাটির পিএইচ টেস্টার",
    price: "₹1,200 - ₹1,800",
    priceBn: "₹১,২০০ - ₹১,৮০০",
    brand: "Digital",
    availability: "in-stock",
    specifications: [
      { label: "Range", value: "0-14 pH" },
      { label: "Accuracy", value: "±0.1" },
      { label: "Auto Calibration", value: "Yes" }
    ],
    rating: 4.6,
    reviews: 278,
    uses: ["মাটির অম্লত্ব পরিমাপ", "সার নির্বাচন"],
    maintenance: ["প্রোব পরিষ্কার", "ক্যালিব্রেট"],
    warranty: "1 year"
  },
  {
    id: 24,
    name: "Weather Station",
    nameBn: "আবহাওয়া স্টেশন",
    category: "sensor",
    categoryBn: "সেন্সর",
    icon: CloudRain,
    description: "Complete weather monitoring system",
    descriptionBn: "সম্পূর্ণ আবহাওয়া পর্যবেক্ষণ সিস্টেম",
    price: "₹25,000 - ₹35,000",
    priceBn: "₹২৫,০০০ - ₹৩৫,০০০",
    brand: "Davis",
    availability: "low-stock",
    specifications: [
      { label: "Parameters", value: "Temp, Humidity, Rain" },
      { label: "Wireless", value: "Yes" },
      { label: "Solar Powered", value: "Yes" }
    ],
    rating: 4.8,
    reviews: 56,
    uses: ["আবহাওয়া পর্যবেক্ষণ", "ফসল পরিকল্পনা"],
    maintenance: ["সেন্সর পরিষ্কার", "ব্যাটারি চেক"],
    warranty: "2 years"
  }
];

// Helper functions
export const getToolsByCategory = (categoryId: string) => {
  if (categoryId === 'all') return toolsData;
  return toolsData.filter(tool => tool.category === categoryId);
};

export const getToolById = (id: number) => {
  return toolsData.find(tool => tool.id === id);
};

export const getCategoryById = (id: string) => {
  return toolCategories.find(cat => cat.id === id);
};

export const getAvailabilityColor = (availability: string) => {
  switch(availability) {
    case 'in-stock': return 'bg-green-100 text-green-800';
    case 'low-stock': return 'bg-yellow-100 text-yellow-800';
    case 'out-of-stock': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getAvailabilityText = (availability: string) => {
  switch(availability) {
    case 'in-stock': return 'স্টকে আছে';
    case 'low-stock': return 'স্টক সীমিত';
    case 'out-of-stock': return 'স্টকে নেই';
    default: return '';
  }
};