'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, Send, CheckCircle, Key, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import axiosInstance from '@/lib/axios';
import toast from 'react-hot-toast';

interface ForgotPassworddProps {
  email: string;
}

const ForgotPasswordd = ({ email: initialEmail }: ForgotPassworddProps) => {
  const router = useRouter();
  
  const [email, setEmail] = useState(initialEmail || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // OTP and Reset Password States
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState<'otp' | 'success'>('otp');

  // Set email when prop changes
  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyOTPAndReset = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('দয়া করে 6 ডিজিটের OTP দিন');
      return;
    }
    
    if (!newPassword) {
      setError('নতুন পাসওয়ার্ড দিন');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('পাসওয়ার্ড দুটি মিলছে না');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Verify OTP and reset password
      const response = await axiosInstance.post("/api/v1/auth/reset-password", {
        email,
        otp: otpValue,
        newPassword
      });
      
      if (response.data?.success) {
        toast.success("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
        setStep('success');
      } else {
        setError(response.data?.message || "পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "OTP ভেরিফিকেশন ব্যর্থ হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axiosInstance.post("/api/v1/auth/forgot-password", { email });
      
      if (response.data?.success) {
        toast.success("নতুন OTP পাঠানো হয়েছে!");
      } else {
        setError(response.data?.message || "OTP পাঠাতে ব্যর্থ হয়েছে");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "OTP পাঠাতে সমস্যা হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  const checkPasswordStrength = (pass: string) => {
    if (pass.length === 0) return '';
    if (pass.length < 6) return 'দুর্বল';
    if (pass.length >= 6 && pass.length < 8) return 'মাঝারি';
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) return 'শক্তিশালী';
    return 'মাঝারি';
  };

  const getStrengthColor = () => {
    const strength = checkPasswordStrength(newPassword);
    switch (strength) {
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

  // Success Page Component
  if (step === 'success') {
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
            আপনার পাসওয়ার্ড সফলভাবে রিসেট করা হয়েছে। এখন আপনি আপনার নতুন পাসওয়ার্ড দিয়ে লগইন করতে পারবেন।
          </p>
          
          <button
            onClick={() => router.push('/login')}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg font-medium transition duration-200"
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
        {/* Back Button */}
        <button
          onClick={() => router.push('/login')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
          <span>লগইন পৃষ্ঠায় ফিরে যান</span>
        </button>

        {/* OTP and Reset Password Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-500 px-8 py-6">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center mb-2">
              ভেরিফিকেশন কোড
            </h1>
            <p className="text-green-100 text-center text-sm">
              আমরা {email} ঠিকানায় একটি OTP পাঠিয়েছি
            </p>
          </div>

          <div className="px-8 py-6">
            <form onSubmit={handleVerifyOTPAndReset} className="space-y-6">
              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  OTP কোড লিখুন
                </label>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition"
                      disabled={isLoading}
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-gray-500 text-center">
                  আপনার ইমেইলে প্রাপ্ত 6 ডিজিটের কোড লিখুন
                </p>
              </div>

              {/* New Password */}
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
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                
                {newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStrengthColor()} transition-all duration-300`}
                          style={{ 
                            width: checkPasswordStrength(newPassword) === 'দুর্বল' ? '33%' : 
                                   checkPasswordStrength(newPassword) === 'মাঝারি' ? '66%' : '100%' 
                          }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${
                        checkPasswordStrength(newPassword) === 'দুর্বল' ? 'text-red-500' :
                        checkPasswordStrength(newPassword) === 'মাঝারি' ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {checkPasswordStrength(newPassword)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    placeholder="আবার পাসওয়ার্ড লিখুন"
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
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    পাসওয়ার্ড দুটি মিলছে না
                  </p>
                )}
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
                    <span>ভেরিফাই করা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>পাসওয়ার্ড পরিবর্তন করুন</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                  disabled={isLoading}
                >
                  আবার OTP পাঠান
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordd;