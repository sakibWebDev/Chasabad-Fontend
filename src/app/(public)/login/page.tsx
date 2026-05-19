// app/login/page.tsx
'use client'
import { useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginError {
  response?: {
    data?: {
      error?: string;
      emailVerified?: boolean;
    };
  };
  message?: string;
}

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড দিন!");
      return;
    }

    setMessage("লোড হচ্ছে...");
    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/api/v1/auth/login", form);

      if (res.status === 200 && res.data?.success) {
        // ✅ Successful login
        setMessage("✅ লগইন সফল!");
        toast.success("লগইন সফল হয়েছে!");
        setForm({ email: "", password: "" });

        // Store token if returned
        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);
        }

        // Store user data if needed
        if (res.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }

        // ✅ Redirect to Home page after login
        setTimeout(() => {
          router.push("/");
          router.refresh(); // Refresh to update server components
        }, 1);
      } else {
        setMessage("❌ লগইন ব্যর্থ হয়েছে");
        toast.error("লগইন ব্যর্থ হয়েছে!");
      }
    } catch (err: unknown) {
      const error = err as LoginError;
      // Handle email not verified case
      if (error.response?.data?.error === "Email not verified") {
        const email = form.email;
        setMessage("❌ ইমেইল ভেরিফাই করা হয়নি! প্রথমে আপনার ইমেইল ভেরিফাই করুন।");
        toast.error("ইমেইল ভেরিফাই করা হয়নি! দয়া করে আপনার ইমেইল চেক করুন।");
        
        // Redirect to OTP verification page
        setTimeout(() => {
          router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
        }, 2000);
      } else {
        const errorMessage = error.response?.data?.error || "নেটওয়ার্ক ত্রুটি!";
        setMessage(`❌ ${errorMessage}`);
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="w-full max-w-6xl mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 items-center p-6 md:p-8">
          {/* Left Side - Banner Content */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-white text-green-600 px-4 py-2 rounded-lg inline-block">
              চাষীভাই.
            </h1>
            
            <div className="space-y-4 text-base md:text-lg">
              <p className="flex items-start gap-2">
                <span className="text-2xl">🌾</span>
                <span className="flex-1">চাষী ভাই-এ স্বাগতম! এখানে আপনি উন্নতমানের বীজ ও কৃষি পণ্য পাবেন।</span>
              </p>
              
              <p className="flex items-start gap-2">
                <span className="text-2xl">⭐</span>
                <span className="flex-1">আপনার ফসলের জন্য সেরা গুণগত মান আমরা নিশ্চিত করি।</span>
              </p>
              
              <p className="flex items-start gap-2">
                <span className="text-2xl">🔬</span>
                <span className="flex-1">আমাদের পণ্য বৈজ্ঞানিকভাবে নির্বাচিত, যাতে আপনার ফসল বেশি উৎপাদনশীল ও সুস্থ থাকে।</span>
              </p>
              
              <p className="flex items-start gap-2">
                <span className="text-2xl">🌱</span>
                <span className="flex-1 font-semibold text-yellow-200">চাষী ভাই — আপনার কৃষির সেরা সহচর।</span>
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">লগইন</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-2">আপনার অ্যাকাউন্টে লগইন করুন</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ইমেইল
                </label>
                <input
                  type="email"
                  placeholder="আপনার ইমেইল লিখুন"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-12"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.83 3.83" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Forgot Password Link - FIXED */}
            <div className="text-right mt-2">
              <Link 
                href={`/forgot-password${form.email ? `?email=${encodeURIComponent(form.email)}` : ''}`} 
                className="text-sm text-green-600 hover:text-green-800 transition-colors"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-4 rounded-lg font-semibold mt-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  লগইন হচ্ছে...
                </span>
              ) : (
                "লগইন"
              )}
            </button>

            {/* Signup Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                নতুন ব্যবহারকারী?{" "}
                <Link href="/signup" className="text-green-600 hover:text-green-800 font-medium transition-colors">
                  সাইন আপ করুন
                </Link>
              </p>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`text-center mt-4 p-3 rounded-lg ${
                message.includes("✅") || message.includes("সফল")
                  ? "bg-green-50 text-green-800 border border-green-200" 
                  : message.includes("❌") || message.includes("ব্যর্থ")
                  ? "bg-red-50 text-red-800 border border-red-200"
                  : "bg-blue-50 text-blue-800 border border-blue-200"
              }`}>
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}