'use client';

import { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Fixed: Initialize passwordStrength with empty string
  const [passwordStrength, setPasswordStrength] = useState('');

  useEffect(() => {
    // Only set error if token is missing and no error has been set yet
    if (!token && !error) {
      setError('ইনভ্যালিড বা মেয়াদোত্তীর্ণ রিসেট লিংক');
    }
  }, [token, error]); // Added error to dependencies to prevent infinite loops

  const checkPasswordStrength = (pass: string) => {
    if (pass.length === 0) return '';
    if (pass.length < 6) return 'দুর্বল';
    if (pass.length >= 6 && pass.length < 8) return 'মাঝারি';
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) return 'শক্তিশালী';
    return 'মাঝারি';
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'দুর্বল':
        return 'bg-red-500';
      case 'মাঝারি':
        return 'bg-yellow-500';
      case 'শক্তিশালী':
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('দয়া করে সব ক্ষেত্র পূরণ করুন');
      return;
    }

    if (password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return;
    }

    if (password !== confirmPassword) {
      setError('পাসওয়ার্ড দুটি মিলছে না');
      return;
    }

    if (!token) {
      setError('ইনভ্যালিড রিকোয়েস্ট');
      return;
    }

    setIsLoading(true);

    try {
      // এখানে আপনার API কল হবে
      // await resetPasswordAPI({ token, password });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError('পাসওয়ার্ড রিসেট করতে সমস্যা হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!
          </h2>
          
          <p className="text-gray-600 mb-6">
            আপনার নতুন পাসওয়ার্ড সেট করা হয়েছে। এখন আপনি আপনার নতুন পাসওয়ার্ড দিয়ে লগইন করতে পারবেন।
          </p>
          
          <button
            onClick={() => router.push('/login')}
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition duration-200"
          >
            লগইন পৃষ্ঠায় যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* হেডার */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 px-8 py-6">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <Lock className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center mb-2">
              নতুন পাসওয়ার্ড সেট করুন
            </h1>
            <p className="text-green-100 text-center text-sm">
              আপনার অ্যাকাউন্টের জন্য একটি শক্তিশালী পাসওয়ার্ড দিন
            </p>
          </div>

          {/* ফর্ম */}
          <div className="px-8 py-6">
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  নতুন পাসওয়ার্ড
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    placeholder="নতুন পাসওয়ার্ড লিখুন"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStrengthColor()} transition-all duration-300`}
                          style={{ 
                            width: passwordStrength === 'দুর্বল' ? '33%' : 
                                   passwordStrength === 'মাঝারি' ? '66%' : '100%' 
                          }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${
                        passwordStrength === 'দুর্বল' ? 'text-red-500' :
                        passwordStrength === 'মাঝারি' ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {passwordStrength}
                      </span>
                    </div>
                    <ul className="text-xs text-gray-500 space-y-1 mt-2">
                      <li className={password.length >= 6 ? "text-green-600" : ""}>
                        • কমপক্ষে ৬ অক্ষর
                      </li>
                      <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>
                        • একটি বড় হাতের অক্ষর (A-Z)
                      </li>
                      <li className={/[0-9]/.test(password) ? "text-green-600" : ""}>
                        • একটি সংখ্যা (0-9)
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    placeholder="পাসওয়ার্ড আবার লিখুন"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    পাসওয়ার্ড দুটি মিলছে না
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !token}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>পরিবর্তন করা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>পাসওয়ার্ড পরিবর্তন করুন</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <Link href="/login" className="text-sm text-green-600 hover:text-green-700 font-medium">
                  লগইন পৃষ্ঠায় ফিরে যান
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;