// components/home/SpecialOfferBanner.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Clock, Gift, ArrowRight } from 'lucide-react';

export default function SpecialOfferBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm text-white mb-4">
            <Gift className="h-4 w-4" />
            <span>সীমিত সময়ের অফার</span>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
            বর্ষাকালীন বিশেষ ছাড়!
          </h2>
          <p className="text-orange-100 mb-6">
            সকল বীজ ও চারায় ৩০% পর্যন্ত ছাড়
          </p>
          
          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 min-w-[70px]">
              <div className="text-2xl md:text-3xl font-bold text-white">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-xs text-white/80">ঘন্টা</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 min-w-[70px]">
              <div className="text-2xl md:text-3xl font-bold text-white">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs text-white/80">মিনিট</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 min-w-[70px]">
              <div className="text-2xl md:text-3xl font-bold text-white">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs text-white/80">সেকেন্ড</div>
            </div>
          </div>
          
          <Link
            href="/shop/sale"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition shadow-lg"
          >
            অফার দেখুন
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}