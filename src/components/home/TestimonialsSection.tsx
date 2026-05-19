// components/home/TestimonialsSection.tsx
'use client';

import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'মোঃ আব্দুল করিম',
    location: 'গাজীপুর',
    role: 'কৃষক',
    rating: 5,
    text: 'চাষীভাই থেকে বীজ কিনে খুব সন্তুষ্ট। টমেটোর ফলন অনেক ভালো হয়েছে। তাদের এক্সপার্ট টিপস খুব কাজে দিয়েছে।',
    image: null,
    product: 'জৈব টমেটো বীজ'
  },
  {
    id: 2,
    name: 'শাহিনা আক্তার',
    location: 'নারায়ণগঞ্জ',
    role: 'গৃহিণী ও উদ্যানপ先锋',
    rating: 5,
    text: 'ছাদে বাগান করার জন্য চারা নিয়েছিলাম। সব গাছ এখন সুন্দরভাবে বাড়ছে। ডেলিভারিও সময়মতো পেয়েছি।',
    image: null,
    product: 'ফলের চারা'
  },
  {
    id: 3,
    name: 'মোঃ জামাল উদ্দিন',
    location: 'চাঁদপুর',
    role: 'পেশাদার কৃষক',
    rating: 4,
    text: 'ধানের বীজের মান খুব ভালো। অঙ্কুরোদগম হার ৯৫% এর উপরে। দামও যুক্তিসঙ্গত। পরবর্তীতেও কেনাকাটা করবো।',
    image: null,
    product: 'উচ্চ ফলনশীল ধানের বীজ'
  },
  {
    id: 4,
    name: 'রোকেয়া বেগম',
    location: 'রাজশাহী',
    role: 'কৃষি উদ্যোক্তা',
    rating: 5,
    text: 'তাদের সাপোর্ট টিম খুবই সহায়ক। সময়মতো পরামর্শ দেয়। আম চারা কেনার পর তাদের কেয়ার গাইডলাইন ফলো করেছি।',
    image: null,
    product: 'আম গাছের চারা'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full px-4 py-1 text-sm text-emerald-700 dark:text-emerald-400 mb-3">
            <Star className="h-4 w-4 fill-current" />
            <span>কৃষকদের মতামত</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            আমাদের সেবায় সন্তুষ্ট কৃষকরা
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            ৫০,০০০+ কৃষক আমাদের উপর আস্থা রেখেছেন
          </p>
        </div>
        
        {/* Testimonials Slider */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-6">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-emerald-100 dark:text-emerald-900/30" />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.location} • {testimonial.role}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < testimonial.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {testimonial.text}
                </p>
                
                <div className="text-xs text-emerald-600 dark:text-emerald-400">
                  পণ্য: {testimonial.product}
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={prevSlide}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition ${
                      currentIndex === idx ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}