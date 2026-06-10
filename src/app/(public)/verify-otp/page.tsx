'use client';

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { Mail, Shield, Clock, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

// Main component that uses useSearchParams
function VerifyOtpContent() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      toast.error("ইমেইল ঠিকানা পাওয়া যায়নি!");
      router.push("/register");
    }
  }, [email, router]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      toast.error("৬ ডিজিটের OTP দিন!");
      return;
    }

    if (!email) {
      toast.error("ইমেইল ঠিকানা পাওয়া যায়নি!");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/v1/auth/verify-email", { 
        otp: otpValue, 
        email 
      });

      if (res.data?.success) {
        toast.success("ভেরিফাই সফল হয়েছে!", {
          icon: '✅',
          duration: 3000,
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(res.data?.message || "OTP ভুল!");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || "OTP ভেরিফিকেশন ব্যর্থ!");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("ইমেইল ঠিকানা পাওয়া যায়নি!");
      return;
    }

    if (countdown > 0) {
      toast.error(`${countdown} সেকেন্ড পরে আবার চেষ্টা করুন`);
      return;
    }

    setResendLoading(true);
    try {
      const res = await axiosInstance.post("/api/v1/auth/resend-otp", { email });

      if (res.data?.success) {
        toast.success("নতুন OTP পাঠানো হয়েছে!", {
          icon: '📧',
          duration: 3000,
        });
        setCountdown(60);
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0")?.focus();
      } else {
        toast.error(res.data?.message || "OTP পাঠানো ব্যর্থ!");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || "OTP পাঠানো ব্যর্থ!");
    } finally {
      setResendLoading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedOtp = pastedData.slice(0, 6).split("");
    
    if (pastedOtp.every(char => /^\d$/.test(char))) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedOtp.length; i++) {
        newOtp[i] = pastedOtp[i];
      }
      setOtp(newOtp);
      
      const lastIndex = Math.min(pastedOtp.length - 1, 5);
      document.getElementById(`otp-${lastIndex}`)?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              ইমেইল ভেরিফিকেশন
            </h1>
            <p className="text-green-100 text-sm">
              আপনার ইমেইলে পাঠানো ৬ ডিজিটের কোডটি দিন
            </p>
            {email && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg">
                <Mail className="h-3 w-3 text-green-200" />
                <span className="text-xs text-green-100 font-medium">
                  {email}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                ভেরিফিকেশন কোড
              </label>
              <div className="flex justify-center gap-2" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                {otp.join("").length === 6 ? (
                  <span className="text-green-600 flex items-center justify-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    ৬ ডিজিট পূর্ণ হয়েছে
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {6 - otp.join("").length} ডিজিট বাকি
                  </span>
                )}
              </p>
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || otp.join("").length !== 6}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>ভেরিফাই করা হচ্ছে...</span>
                </div>
              ) : (
                "ভেরিফাই করুন"
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">অথবা</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleResendOtp}
                disabled={resendLoading || countdown > 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                    <span>পাঠানো হচ্ছে...</span>
                  </>
                ) : countdown > 0 ? (
                  <>
                    <Clock className="h-4 w-4" />
                    <span>আবার চেষ্টা করুন ({countdown}সে)</span>
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    <span>OTP পুনরায় পাঠান</span>
                  </>
                )}
              </button>
              
              {countdown === 0 && !resendLoading && (
                <p className="text-xs text-gray-500 text-center">
                  OTP পাননি? উপরের বাটনে ক্লিক করুন
                </p>
              )}
            </div>

            <button
              onClick={() => router.push("/login")}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>লগইন পৃষ্ঠায় ফিরুন</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            আপনার ইমেইল চেক করুন। OTP পেতে ১-২ মিনিট সময় লাগতে পারে।
          </p>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function VerifyOtpLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">লোড হচ্ছে...</p>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<VerifyOtpLoading />}>
      <VerifyOtpContent />
    </Suspense>
  );
}