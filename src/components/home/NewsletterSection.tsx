// components/home/NewsletterSection.tsx
'use client';

import { useState } from 'react';
import { Send, Mail, Bell, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribed:', email);
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  // Social Media Links (আপনার লিংক দিন)
  const socialLinks = {
    facebook: 'https://facebook.com/chashibhai',
    twitter: 'https://twitter.com/chashibhai',
    youtube: 'https://youtube.com/chashibhai',
    linkedin: 'https://linkedin.com/company/chashibhai',
    instagram: 'https://instagram.com/chashibhai',
    whatsapp: 'https://wa.me/880123456789'
  };

  return (
    <div className="bg-gradient-to-r from-green-700 to-emerald-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-6 w-6" />
              <span className="text-sm font-semibold">নিউজলেটার</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              কৃষি টিপস ও অফার পান
            </h2>
            <p className="text-emerald-100 mb-4">
              সাপ্তাহিক কৃষি পরামর্শ, নতুন পণ্যের তথ্য এবং স্পেশাল অফার পেতে সাবস্ক্রাইব করুন
            </p>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                <span>সাপ্তাহিক আপডেট</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>এক্সপার্ট টিপস</span>
              </div>
            </div>
          </div>
          
          {/* Right Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl">
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300 block mb-2">
                  আপনার ইমেইল ঠিকানা
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                সাবস্ক্রাইব করুন
              </button>
            </form>
            
            {subscribed && (
              <div className="mt-3 p-2 bg-green-100 text-green-700 rounded-lg text-sm text-center">
                ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন
              </div>
            )}
            
            {/* Social Links - আপডেটেড ডিজাইন */}
            <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">
                সোশ্যাল মিডিয়ায় আমাদের ফলো করুন
              </p>
              
              {/* ডিজাইন অপশন ১: গোলাকার গ্রেডিয়েন্ট আইকন */}
              <div className="flex justify-center gap-4">
                {/* Facebook */}
                <Link
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Facebook
                  </span>
                </Link>

                {/* Twitter */}
                <Link
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.04.7.13 1.04-3.78-.2-7.14-2-9.4-4.78-.4.67-.6 1.45-.6 2.28 0 1.57.8 2.95 2 3.77-.74-.02-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.38.1-.78.16-1.2.16-.3 0-.58-.03-.86-.08.58 1.82 2.27 3.15 4.28 3.18-1.57 1.23-3.55 1.96-5.7 1.96-.37 0-.74-.02-1.1-.06 2.04 1.3 4.46 2.06 7.06 2.06 8.48 0 13.12-7 13.12-13.08 0-.2 0-.4-.02-.6.9-.65 1.68-1.47 2.3-2.4z"/>
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Twitter
                  </span>
                </Link>

                {/* YouTube */}
                <Link
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.5 6.2c-.3-1-1-1.8-2-2-.3-.1-2.2-.2-6.5-.2s-6.2.1-6.5.2c-1 .2-1.7.9-2 2-.2.7-.3 2.1-.3 5.8 0 3.7.1 5.1.3 5.8.3 1 1 1.8 2 2 .3.1 2.2.2 6.5.2s6.2-.1 6.5-.2c1-.2 1.7-.9 2-2 .2-.7.3-2.1.3-5.8 0-3.7-.1-5.1-.3-5.8zM9.5 15.5v-7l6 3.5-6 3.5z"/>
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    YouTube
                  </span>
                </Link>

                {/* LinkedIn */}
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    LinkedIn
                  </span>
                </Link>

                {/* Instagram - অতিরিক্ত */}
                <Link
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.2c3.2 0 3.6 0 4.9.1.9.1 1.4.2 1.8.4.4.2.8.4 1.1.7.3.3.6.7.7 1.1.1.4.2.9.4 1.8.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1.9-.2 1.4-.4 1.8-.2.4-.4.8-.7 1.1-.3.3-.7.6-1.1.7-.4.1-.9.2-1.8.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-.9-.1-1.4-.2-1.8-.4-.4-.2-.8-.4-1.1-.7-.3-.3-.6-.7-.7-1.1-.1-.4-.2-.9-.4-1.8-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-.9.2-1.4.4-1.8.2-.4.4-.8.7-1.1.3-.3.7-.6 1.1-.7.4-.1.9-.2 1.8-.4 1.3-.1 1.7-.1 4.9-.1zm0-1.7c-3.3 0-3.7 0-5 .1-1.3.1-2.2.3-3 .6-.9.3-1.6.8-2.3 1.4-.7.7-1.1 1.4-1.4 2.3-.3.8-.5 1.7-.6 3-.1 1.3-.1 1.7-.1 5s0 3.7.1 5c.1 1.3.3 2.2.6 3 .3.9.8 1.6 1.4 2.3.7.7 1.4 1.1 2.3 1.4.8.3 1.7.5 3 .6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 3-.6.9-.3 1.6-.8 2.3-1.4.7-.7 1.1-1.4 1.4-2.3.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-3-.3-.9-.8-1.6-1.4-2.3-.7-.7-1.4-1.1-2.3-1.4-.8-.3-1.7-.5-3-.6C15.7.5 15.3.5 12 .5z"/>
                      <circle cx="12" cy="12" r="3.5"/>
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Instagram
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}