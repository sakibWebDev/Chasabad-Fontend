// app/forgot-password/page.tsx
'use client';

import axiosInstance from '@/lib/axios';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import ForgotPasswordd from "@/components/authhelper/Forgotpasswordd";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('দয়া করে আপনার ইমেইল ঠিকানা দিন');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('দয়া করে একটি বৈধ ইমেইল ঠিকানা দিন');
      return;
    }

    setIsLoading(true);

    try {
      await axiosInstance.post("/api/v1/auth/forget-password", { email });
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "পাসওয়ার্ড রিসেট লিংক পাঠাতে সমস্যা হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return <ForgotPasswordd email={email} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* ব্যাক বাটন */}
        <Link 
          href="/login"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
          <span>লগইন পৃষ্ঠায় ফিরে যান</span>
        </Link>

        {/* মেইন কার্ড */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* হেডার */}
          <div className="bg-linear-to-br from-green-600 to-green-500 px-8 py-6">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <Mail className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center mb-2">
              পাসওয়ার্ড ভুলে গেছেন?
            </h1>
            <p className="text-green-100 text-center text-sm">
              চিন্তা করবেন না! আমরা আপনাকে পাসওয়ার্ড রিসেট করতে সাহায্য করব
            </p>
          </div>

          {/* ফর্ম */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  আপনার ইমেইল ঠিকানা
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    placeholder="আপনার ইমেইল লিখুন"
                    disabled={isLoading}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  আমরা আপনার রেজিস্টার্ড ইমেইলে একটি OTP পাঠাব
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>পাঠানো হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>OTP পাঠান</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  মনে পড়েছে?{' '}
                  <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                    লগইন করুন
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* হেল্প সেকশন */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                সমস্যা হচ্ছে?{' '}
                <button className="text-green-600 hover:text-green-700 font-medium">
                  সাপোর্ট টিমের সাথে যোগাযোগ করুন
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* সিকিউরিটি নোট */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 আপনার তথ্য নিরাপদ। আমরা কখনো আপনার পাসওয়ার্ড শেয়ার করি না।
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;