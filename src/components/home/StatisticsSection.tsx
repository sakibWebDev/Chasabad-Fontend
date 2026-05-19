// components/home/StatisticsSection.tsx
'use client';

import { useEffect, useState } from 'react';
import { Package, Users, Sprout, Award, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Package,
    label: 'ডেলিভারি সম্পন্ন',
    value: 45280,
    suffix: '+',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    label: 'সন্তুষ্ট কৃষক',
    value: 50234,
    suffix: '+',
    color: 'from-emerald-500 to-green-500'
  },
  {
    icon: Sprout,
    label: 'বিভিন্ন পণ্য',
    value: 523,
    suffix: '+',
    color: 'from-green-500 to-lime-500'
  },
  {
    icon: Award,
    label: 'সফল জার্মিনেশন',
    value: 98,
    suffix: '%',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: TrendingUp,
    label: 'গ্রাহক সন্তুষ্টি',
    value: 95,
    suffix: '%',
    color: 'from-purple-500 to-pink-500'
  }
];

export default function StatisticsSection() {
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      let step = 0;
      
      const timeout = setInterval(() => {
        if (step < steps) {
          current += increment;
          step++;
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.floor(current);
            return newCounters;
          });
        } else {
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = stat.value;
            return newCounters;
          });
          clearInterval(timeout);
        }
      }, duration / steps);
      
      timeouts.push(timeout);
    });
    
    return () => timeouts.forEach(clearInterval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
            সংখ্যায় <span className="text-emerald-600">চাষীভাই</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            আমাদের সাফল্যের গল্প সংখ্যার মাধ্যমে
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                  {counters[index].toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}