// app/admin/users/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Globe,
  Save,
  X,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  MapPin,
  Lock,
  Shield,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { useAppSelector } from "@/lib/hooks/useAppSelector";

// Validation Schema - Removed password field completely
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER", "EXPERT", "RESEARCHER"]),
  status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  division: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  image: z.string().optional().nullable(),
  emailVerified: z.boolean().default(false),
  needPasswordChange: z.boolean().default(true),
});

type UserFormData = z.infer<typeof userSchema>;

// Bangladesh Divisions
const BANGLADESH_DIVISIONS = [
  "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Barisal", "Sylhet", "Rangpur", "Mymensingh",
];

// Districts by Division
const DISTRICTS_BY_DIVISION: Record<string, string[]> = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Kishoreganj", "Manikganj", "Munshiganj", "Narsingdi", "Rajbari", "Shariatpur", "Faridpur", "Gopalganj", "Madaripur"],
  Chittagong: ["Chittagong", "Cox's Bazar", "Rangamati", "Bandarban", "Khagrachari", "Comilla", "Brahmanbaria", "Chandpur", "Lakshmipur", "Noakhali", "Feni"],
  Khulna: ["Khulna", "Bagerhat", "Satkhira", "Jessore", "Jhenaidah", "Magura", "Narail", "Kushtia", "Chuadanga", "Meherpur"],
  Rajshahi: ["Rajshahi", "Bogra", "Chapai Nawabganj", "Naogaon", "Natore", "Pabna", "Sirajganj", "Joypurhat"],
  Barisal: ["Barisal", "Barguna", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rangpur: ["Rangpur", "Dinajpur", "Kurigram", "Gaibandha", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
};

const ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin", color: "bg-purple-600", description: "Full system access" },
  { value: "ADMIN", label: "Admin", color: "bg-blue-600", description: "Administrative access" },
  { value: "EXPERT", label: "Expert", color: "bg-green-600", description: "Agricultural expert" },
  { value: "RESEARCHER", label: "Researcher", color: "bg-indigo-600", description: "Research access" },
  { value: "USER", label: "User", color: "bg-gray-600", description: "Regular user" },
];

const STATUSES = [
  { value: "ACTIVE", label: "Active", color: "bg-green-500", icon: CheckCircle },
  { value: "BLOCKED", label: "Blocked", color: "bg-red-500", icon: AlertCircle },
  { value: "DELETED", label: "Deleted", color: "bg-gray-500", icon: Trash2 },
];

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "USER",
      status: "ACTIVE",
      address: "",
      city: "",
      district: "",
      division: "",
      postalCode: "",
      latitude: null,
      longitude: null,
      image: "",
      emailVerified: false,
      needPasswordChange: true,
    },
  });

  const watchDivision = watch("division");
  const watchStatus = watch("status");
  const watchRole = watch("role");

  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";
  const isEditingSuperAdmin = watchRole === "SUPER_ADMIN";

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    if (watchDivision) {
      setAvailableDistricts(DISTRICTS_BY_DIVISION[watchDivision] || []);
      setValue("district", "");
    }
  }, [watchDivision, setValue]);

  const fetchUserData = async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get(`/api/v1/admin/users/${userId}`);
      console.log("User Response:", response.data);

      const userData = response.data?.data || response.data?.user || response.data;

      if (!userData) {
        toast.error("User not found");
        router.push("/admin/users");
        return;
      }

      setOriginalEmail(userData.email || "");

      // Set all form values (excluding password)
      setValue("name", userData.name || "");
      setValue("email", userData.email || "");
      setValue("phone", userData.phone || "");
      setValue("role", userData.role || "USER");
      setValue("status", userData.status || "ACTIVE");
      setValue("address", userData.address || "");
      setValue("city", userData.city || "");
      setValue("district", userData.district || "");
      setValue("division", userData.division || "");
      setValue("postalCode", userData.postalCode || "");
      setValue("latitude", userData.latitude || null);
      setValue("longitude", userData.longitude || null);
      setValue("emailVerified", userData.emailVerified || false);
      setValue("needPasswordChange", userData.needPasswordChange ?? true);

      if (userData.division) {
        setSelectedDivision(userData.division);
        setAvailableDistricts(DISTRICTS_BY_DIVISION[userData.division] || []);
      }

      if (userData.image) {
        const imageUrl = userData.image.startsWith("http")
          ? userData.image
          : `${process.env.NEXT_PUBLIC_API_URL || ""}${userData.image}`;
        setImagePreview(imageUrl);
      }

      toast.success("User data loaded");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to load user");
      router.push("/admin/users");
    } finally {
      setFetching(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosInstance.post("/api/v1/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data?.url || response.data?.data?.url || null;
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
      return null;
    }
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      setLoading(true);

      let imageUrl = data.image;

      if (imageFile) {
        const uploadedUrl = await handleImageUpload(imageFile);
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      // Prepare payload - NO PASSWORD FIELD
      const payload: any = { ...data, image: imageUrl };

      // 🔥 Prevent email change
      if (data.email !== originalEmail) {
        toast.error("Email cannot be changed");
        payload.email = originalEmail;
        setValue("email", originalEmail);
      }

      // Remove empty/null values
      Object.keys(payload).forEach((key) => {
        if (
          payload[key] === undefined ||
          payload[key] === null ||
          payload[key] === "" ||
          (typeof payload[key] === "string" && payload[key].trim() === "")
        ) {
          delete payload[key];
        }
      });

      // 🔥 Ensure password is NEVER sent
      delete payload.password;

      console.log("📤 Final Payload (No Password):", JSON.stringify(payload, null, 2));

      const response = await axiosInstance.patch(`/api/v1/admin/users/${userId}`, payload);

      console.log("✅ Update Response:", response.data);

      toast.success("User updated successfully");
      router.push("/admin/users");
      router.refresh();
    } catch (error: any) {
      console.error("❌ Error:", error);
      toast.error(error?.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, GIF, and WEBP images are allowed");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit User</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Update user information</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {loading ? "Updating..." : "Update User"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-green-600" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Email - Read Only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(Cannot be changed)</span>
                </label>
                <div className="relative">
                  <input
                    {...register("email")}
                    type="email"
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                  <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+880XXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              {/* Password Info - No input field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value="********"
                    disabled
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                  <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password cannot be changed from this form
                </p>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("role")}
                  disabled={!isSuperAdmin && isEditingSuperAdmin}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white ${
                    !isSuperAdmin && isEditingSuperAdmin ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                >
                  {ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("status")}
                  disabled={!isSuperAdmin && isEditingSuperAdmin}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white ${
                    !isSuperAdmin && isEditingSuperAdmin ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                >
                  {STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              Address Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Division</label>
                <select
                  {...register("division")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Division</option>
                  {BANGLADESH_DIVISIONS.map((div) => (
                    <option key={div} value={div}>{div}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">District</label>
                <select
                  {...register("district")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  disabled={!watchDivision}
                >
                  <option value="">Select District</option>
                  {availableDistricts.map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City/Town</label>
                <input
                  {...register("city")}
                  type="text"
                  placeholder="Enter city or town name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Postal Code</label>
                <input
                  {...register("postalCode")}
                  type="text"
                  placeholder="Enter postal code"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Address</label>
                <textarea
                  {...register("address")}
                  rows={3}
                  placeholder="Enter complete address"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Location Coordinates */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-green-600" />
              Location Coordinates (Optional)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Latitude</label>
                <input
                  {...register("latitude", { valueAsNumber: true })}
                  type="number"
                  step="any"
                  placeholder="e.g., 23.8103"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Longitude</label>
                <input
                  {...register("longitude", { valueAsNumber: true })}
                  type="number"
                  step="any"
                  placeholder="e.g., 90.4125"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Profile Image</h2>

            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                {imagePreview ? (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      width={120}
                      height={120}
                      className="rounded-full object-cover border-4 border-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("");
                        setImageFile(null);
                        setValue("image", "");
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="h-32 w-32 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <User className="h-12 w-12 text-white" />
                  </div>
                )}
              </div>

              <label className="cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <div className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                </div>
              </label>
              <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB</p>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Account Settings</h2>

            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700 dark:text-gray-300">Email Verified</span>
                <input
                  {...register("emailVerified")}
                  type="checkbox"
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700 dark:text-gray-300">Force Password Change</span>
                <input
                  {...register("needPasswordChange")}
                  type="checkbox"
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </label>
            </div>
          </div>

          {/* Status Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Status Information</h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Status</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    watchStatus === "ACTIVE"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : watchStatus === "BLOCKED"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {watchStatus}
                </span>
              </div>

              {watchStatus === "ACTIVE" && (
                <div className="flex items-center space-x-2 text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>Account is active and accessible</span>
                </div>
              )}

              {watchStatus === "BLOCKED" && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Account is blocked and cannot access the system</span>
                </div>
              )}

              {watchStatus === "DELETED" && (
                <div className="flex items-center space-x-2 text-gray-600 text-sm">
                  <Trash2 className="h-4 w-4" />
                  <span>Account is marked as deleted</span>
                </div>
              )}
            </div>
          </div>

          {/* Password Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl shadow-sm p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-blue-600" />
              <h2 className="text-sm font-semibold text-blue-800 dark:text-blue-400">Password Info</h2>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Password cannot be changed from this form. Use a separate password reset feature.
            </p>
          </div>

          {/* Permission Info for non-Super Admin editing Super Admin */}
          {!isSuperAdmin && isEditingSuperAdmin && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl shadow-sm p-6 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-yellow-600" />
                <h2 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">Limited Access</h2>
              </div>
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                You cannot change the role or status of a Super Admin user.
              </p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}