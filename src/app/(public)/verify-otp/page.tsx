'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleVerify = async () => {
    if (!otp) {
      toast.error("OTP দিন!");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/v1/auth/verify-email", { otp, email });

      if (res.data?.success) {
        toast.success("ভেরিফাই সফল হয়েছে!");
        router.push("/");
      }
    } catch (err: unknown) {
      toast.error((err as { response?: { data?: { error?: string } } })?.response?.data?.error || "OTP ভুল!");
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
        toast.success("নতুন OTP পাঠানো হয়েছে!");
        // Start countdown
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        toast.error(res.data?.error || "OTP পাঠানো失败!");
      }
    } catch (err: unknown) {
      toast.error((err as { response?: { data?: { error?: string } } })?.response?.data?.error || "OTP পাঠানো ব্যর্থ!");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-blue-50 to-purple-100 px-4">
      
      <div className="w-full max-w-md bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 space-y-6">
        
        {/* Logo / Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600 mb-1">
            চাষীভাই
          </h1>
          <p className="text-gray-500 text-sm">
            আপনার ইমেইলে পাঠানো OTP দিন
          </p>
          {email && (
            <p className="text-xs text-gray-400 mt-1">
              {email}
            </p>
          )}
        </div>

        {/* OTP Input */}
        <div>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6 digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-center tracking-[10px] text-xl font-semibold border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Checking..." : "Verify OTP"}
        </button>

        {/* Resend OTP Button */}
        <div className="text-center">
          <button
            onClick={handleResendOtp}
            disabled={resendLoading || countdown > 0}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendLoading ? (
              "পাঠানো হচ্ছে..."
            ) : countdown > 0 ? (
              `আবার চেষ্টা করুন (${countdown}s)`
            ) : (
              "OTP পুনরায় পাঠান"
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Skip Button */}
        <button
          onClick={() => router.push("/login")}
          className="w-full text-red-500 hover:text-red-600 font-medium"
        >
          Skip / Cancel
        </button>

        {/* Extra Info */}
        <p className="text-center text-xs text-gray-400">
          OTP পাননি? {countdown === 0 && "পুনরায় পাঠান বাটনে ক্লিক করুন"}
        </p>

      </div>
    </div>
  );
}