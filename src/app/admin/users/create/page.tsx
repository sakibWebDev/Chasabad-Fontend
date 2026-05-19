"use client";
import  axiosInstance  from "../../../../lib/axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Globe,
  Calendar,
  Shield,
  Activity,
  Save,
  X,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";

// Validation Schema
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  password: z.string().min(6, "Password must be at least 6 characters").optional().nullable(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER", "EXPERT", "RESEARCHER"]),
  status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]),
  
  // Address Information
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  division: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  
  // Location Coordinates
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  
  // Additional Info
  image: z.string().optional().nullable(),
  emailVerified: z.boolean().default(false),
  needPasswordChange: z.boolean().default(true),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  userId?: string;
  isEdit?: boolean;
}

// Bangladesh Divisions
const BANGLADESH_DIVISIONS = [
  "Dhaka",
  "Chittagong",
  "Khulna",
  "Rajshahi",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

// Districts by Division (Sample)
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

// Roles with descriptions
const ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin", color: "bg-red-500", description: "Full system access" },
  { value: "ADMIN", label: "Admin", color: "bg-purple-500", description: "Administrative access" },
  { value: "EXPERT", label: "Expert", color: "bg-blue-500", description: "Agricultural expert" },
  { value: "RESEARCHER", label: "Researcher", color: "bg-indigo-500", description: "Research access" },
  { value: "USER", label: "User", color: "bg-gray-500", description: "Regular user" },
];

// Status options
const STATUSES = [
  { value: "ACTIVE", label: "Active", color: "bg-green-500", icon: CheckCircle },
  { value: "BLOCKED", label: "Blocked", color: "bg-red-500", icon: AlertCircle },
  { value: "DELETED", label: "Deleted", color: "bg-gray-500", icon: Trash2 },
];

export default function UserForm({ userId, isEdit = false }: UserFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "USER",
      status: "ACTIVE",
      address: "",
      city: "",
      district: "",
      division: "",
      postalCode: "",
      latitude: null,
      longitude: null,
      emailVerified: false,
      needPasswordChange: true,
    },
  });

  const watchDivision = watch("division");
  const watchStatus = watch("status");

  // Load user data for edit mode
  useEffect(() => {
    if (isEdit && userId) {
      fetchUserData();
    }
  }, [isEdit, userId]);

  useEffect(() => {
    if (watchDivision) {
      setAvailableDistricts(DISTRICTS_BY_DIVISION[watchDivision] || []);
      setValue("district", "");
    }
  }, [watchDivision, setValue]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/admin/users/${userId}`);
      const userData = response.data.data;
      
      Object.keys(userData).forEach((key) => {
        if (userData[key] !== undefined) {
          setValue(key as any, userData[key]);
        }
      });
      
      if (userData.division) {
        setAvailableDistricts(DISTRICTS_BY_DIVISION[userData.division] || []);
      }
      
      if (userData.image) {
        setImagePreview(userData.image);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to load user data");
      router.push("/admin/users");
    } finally {
      setFetching(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    
    try {
      const response = await axios.post("/api/upload", formData);
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    }
  };

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    
    try {
      let imageUrl = data.image;
      console.log("Submitting data:", data);
      
      if (imageFile) {
        const uploadedUrl = await handleImageUpload(imageFile);
        if (uploadedUrl) imageUrl = uploadedUrl;
      }
      
      const payload = {
        ...data,
        image: imageUrl,
        ...(isEdit ? {} : { password: data.password }),
      };
      
      if (isEdit && userId) {
        await axios.put(`/api/v1/admin/users/${userId}`, payload);
        toast.success("User updated successfully");
      } else {
        await axiosInstance.post("/api/v1/admin/users", payload);
        toast.success("User created successfully");
      }
      
      router.push("/admin/users");
      router.refresh();
    } catch (error: any) {
      console.error("Error saving user:", error);
      toast.error(error.response?.data?.message || "Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isEdit ? "Edit User" : "Add New User"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {isEdit ? "Update user information" : "Create a new user account"}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{loading ? "Saving..." : isEdit ? "Update User" : "Create User"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
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
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="user@example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+880XXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Password (Only for new user) */}
              {!isEdit && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>
              )}

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("role")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                >
                  {ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                >
                  {STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              Address Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Division */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Division
                </label>
                <select
                  {...register("division")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  onChange={(e) => {
                    register("division").onChange(e);
                    setSelectedDivision(e.target.value);
                  }}
                >
                  <option value="">Select Division</option>
                  {BANGLADESH_DIVISIONS.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  District
                </label>
                <select
                  {...register("district")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  disabled={!watchDivision}
                >
                  <option value="">Select District</option>
                  {availableDistricts.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              {/* City/Town */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City/Town
                </label>
                <input
                  {...register("city")}
                  type="text"
                  placeholder="Enter city or town name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Postal Code
                </label>
                <input
                  {...register("postalCode")}
                  type="text"
                  placeholder="Enter postal code"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Full Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Address
                </label>
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-green-600" />
              Location Coordinates (Optional)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Latitude
                </label>
                <input
                  {...register("latitude", { valueAsNumber: true })}
                  type="number"
                  step="any"
                  placeholder="e.g., 23.8103"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Longitude
                </label>
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Profile Image
            </h2>
            
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                </div>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                JPG, PNG or GIF. Max 2MB
              </p>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Account Settings
            </h2>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Email Verified
                </span>
                <input
                  {...register("emailVerified")}
                  type="checkbox"
                  className="toggle-checkbox"
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Force Password Change
                </span>
                <input
                  {...register("needPasswordChange")}
                  type="checkbox"
                  className="toggle-checkbox"
                />
              </label>
            </div>
          </div>

          {/* Status Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Status Information
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Status</span>
                <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                  watchStatus === "ACTIVE" 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : watchStatus === "BLOCKED"
                    ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                }`}>
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
                  <span>Account is blocked</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}