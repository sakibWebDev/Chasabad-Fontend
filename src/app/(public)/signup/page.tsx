'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

/* ================= TYPES ================= */

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/* ================= COMPONENT ================= */

export default function SignupPage() {
  const router = useRouter();

  /* ================= STATE ================= */

  const [form, setForm] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  /* ================= HANDLERS ================= */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting form:", form)

    /* ================= VALIDATION ================= */
    if (form.password !== form.confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না!");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(form.email)) {
        toast.error("Invalid email");
        return;
      }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/api/auth/sign-up/email", {
  name: form.name,
  email: form.email,
  password: form.password,
});

if (res.data?.user) {
  toast.success("সাইনআপ সফল হয়েছে!");
  router.push(`/verify-otp?email=${form.email}`);
  setForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // router.push("/login");
} else {
  toast.error("সাইনআপ ব্যর্থ হয়েছে");
}
    } catch (error: any) {
  const message =
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    error?.message ||
    "নেটওয়ার্ক সমস্যা!";

  toast.error(message);

    } finally {
      setIsLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8">
      <div className="w-full max-w-6xl mx-auto bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl overflow-hidden">

        <div className="grid md:grid-cols-2 gap-8 items-center p-8">

          {/* LEFT */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-white text-green-600 px-4 py-2 rounded-lg inline-block">
              চাষীভাই.
            </h1>
            <div className="space-y-4 text-lg">
              <p className="flex items-start gap-2"><span className="text-2xl">🌾</span>চাষী ভাই-এ স্বাগতম! এখানে আপনি উন্নতমানের বীজ ও কৃষি পণ্য পাবেন।</p>
              <p className="flex items-start gap-2"><span className="text-2xl">⭐</span>আপনার ফসলের জন্য সেরা গুণগত মান আমরা নিশ্চিত করি।</p>
              <p className="flex items-start gap-2"><span className="text-2xl">🔬</span>আমাদের পণ্য বৈজ্ঞানিকভাবে নির্বাচিত, যাতে আপনার ফসল বেশি উৎপাদনশীল ও সুস্থ থাকে।</p>
              <p className="flex items-start gap-2"><span className="text-2xl">🌱</span><span className="flex-1 font-semibold text-yellow-200">চাষী ভাই — আপনার কৃষির সেরা সহচর।</span></p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              সাইন আপ
            </h2>

            {/* NAME */}
            <input
              name="name"
              type="text"
              placeholder="নাম"
              value={form.name}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-3 border rounded-lg"
              required
            />

            {/* EMAIL */}
            <input
              name="email"
              type="email"
              placeholder="ইমেইল"
              value={form.email}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-3 border rounded-lg"
              required
            />

            {/* PASSWORD */}
            <div className="relative mb-3">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="পাসওয়ার্ড"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg pr-16"
                required
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative mb-4">
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="কনফার্ম পাসওয়ার্ড"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg pr-16"
                required
              />

              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              {isLoading ? "লোড হচ্ছে..." : "সাইন আপ"}
            </button>

            {/* LOGIN */}
            <p className="text-center mt-4 text-sm">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link href="/login" className="text-blue-600">
                লগইন
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}