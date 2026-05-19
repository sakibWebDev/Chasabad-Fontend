// components/home/InteractiveTools.tsx
'use client';

import Link from 'next/link';
import { Calculator, Sprout, Droplet, Sun, Thermometer, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const tools = [
  {
    icon: Calculator,
    title: 'ফসল পরিকল্পনা ক্যালকুলেটর',
    description: 'আপনার জমির আকার অনুযায়ী ফসল পরিকল্পনা করুন',
    href: '/crop-planner',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Sprout,
    title: 'বীজ পরামর্শক',
    description: 'আপনার এলাকার জন্য সেরা বীজ নির্বাচন করুন',
    href: '/seed-advisor',
    color: 'from-emerald-500 to-green-500'
  },
  {
    icon: Droplet,
    title: 'সেভিং ক্যালকুলেটর',
    description: 'সঠিক সেচ ব্যবস্থাপনায় পানি সাশ্রয় করুন',
    href: '/water-calculator',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Sun,
    title: 'আবহাওয়া আপডেট',
    description: 'মৌসুমি আবহাওয়ার পূর্বাভাস এবং পরামর্শ',
    href: '/weather',
    color: 'from-orange-500 to-amber-500'
  },
  {
    icon: Thermometer,
    title: 'রোগ শনাক্তকরণ',
    description: 'AI দিয়ে ফসলের রোগ সনাক্ত করুন',
    href: '/disease-detection',
    color: 'from-red-500 to-rose-500'
  }
];

export default function InteractiveTools() {
  const [cropArea, setCropArea] = useState('');
  const [cropType, setCropType] = useState('rice');
  const [seedAmount, setSeedAmount] = useState<number | null>(null);

  const calculateSeed = () => {
    const area = parseFloat(cropArea);
    if (!isNaN(area)) {
      const rates: { [key: string]: number } = {
        rice: 80,
        wheat: 100,
        maize: 20,
        vegetable: 5
      };
      const amount = area * (rates[cropType] || 50);
      setSeedAmount(amount);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
            ইন্টারেক্টিভ টুলস
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            কৃষি কাজকে সহজ করার জন্য আমাদের ডিজিটাল টুলস ব্যবহার করুন
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tools Grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={index}
                    href={tool.href}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 hover:shadow-lg transition group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Quick Calculator Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
            <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-600" />
              দ্রুত বীজ পরিমাপ ক্যালকুলেটর
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                  জমির পরিমাণ (একর)
                </label>
                <input
                  type="number"
                  value={cropArea}
                  onChange={(e) => setCropArea(e.target.value)}
                  placeholder="যেমন: ২.৫"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                  ফসলের ধরন
                </label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  <option value="rice">ধান</option>
                  <option value="wheat">গম</option>
                  <option value="maize">ভুট্টা</option>
                  <option value="vegetable">সবজি</option>
                </select>
              </div>
              
              <button
                onClick={calculateSeed}
                className="w-full py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
              >
                গণনা করুন
              </button>
              
              {seedAmount !== null && (
                <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    আপনার প্রয়োজন:
                  </p>
                  <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                    {seedAmount} কেজি বীজ
                  </p>
                  <Link
                    href="/shop/seeds"
                    className="text-xs text-emerald-600 hover:text-emerald-700 mt-2 inline-block"
                  >
                    বীজ কিনুন →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
