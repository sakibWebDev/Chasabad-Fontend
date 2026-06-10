// // app/admin/seeds/create/page.tsx
// 'use client';

// import { useState } from "react";
// import {
//   Sprout,
//   Leaf,

//   Plus,
//   Minus,
//   Upload,
//   Save,
//   ArrowLeft,
//   DollarSign,
//   X,
//   Check,
//   Calendar,
//   MapPin,
//   Droplets,
//   Sun,
//   Apple,
//   Package as PackageIcon,
//   Truck,
//   Shield,
//   Award,
//   Clock,
//   TrendingUp
// } from "lucide-react";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function CreateSeedPage() {
//   const router = useRouter();
//   const [saving, setSaving] = useState(false);
//   const [activeTab, setActiveTab] = useState("basic");
//   const [formData, setFormData] = useState({
//     name: '',
//     category: 'Vegetables',
//     subCategory: '',
//     price: '',
//     comparePrice: '',
//     quantity: '',
//     unit: 'packet',
//     germinationRate: '',
//     purity: '',
//     origin: '',
//     season: [] as string[],
//     growingDifficulty: 'easy',
//     daysToMaturity: '',
//     plantingDepth: '',
//     spacing: '',
//     sunlight: '',
//     watering: '',
//     description: '',
//     features: [''],
//     organic: false,
//     nonGmo: false,
//     heirloom: false,
//     status: 'active',
//     featured: false
//   });

//   const categories = [
//     { value: 'Vegetables', icon: Leaf, color: 'text-green-600' },
//     { value: 'Herbs', icon: Sprout, color: 'text-emerald-600' },
//     { value: 'Flowers', icon: Sprout, color: 'text-pink-600' },
//     { value: 'Fruits', icon: Apple, color: 'text-red-600' },
//     { value: 'Grains', icon: PackageIcon, color: 'text-amber-600' }
//   ];
  
//   const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
//   const difficulties = ['easy', 'moderate', 'advanced'];
//   const units = ['packet', 'gram', 'kg', 'seedling'];

//   const tabs = [
//     { id: "basic", label: "Basic Info", icon: Sprout },
//     { id: "pricing", label: "Pricing", icon: DollarSign },
//     { id: "growing", label: "Growing Guide", icon: Leaf },
//     { id: "details", label: "Details", icon: PackageIcon }
//   ];

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//     }));
//   };

//   const handleFeatureChange = (index: number, value: string) => {
//     const newFeatures = [...formData.features];
//     newFeatures[index] = value;
//     setFormData(prev => ({ ...prev, features: newFeatures }));
//   };

//   const addFeature = () => {
//     setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
//   };

//   const removeFeature = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index)
//     }));
//   };

//   const toggleSeason = (season: string) => {
//     setFormData(prev => ({
//       ...prev,
//       season: prev.season.includes(season)
//         ? prev.season.filter(s => s !== season)
//         : [...prev.season, season]
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     toast.success('Seed created successfully!');
//     setSaving(false);
//     router.push('/admin/seeds');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header with breadcrumb */}
//         <div className="mb-8">
//           <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
//             <Link href="/admin" className="hover:text-emerald-600">Dashboard</Link>
//             <span>/</span>
//             <Link href="/admin/seeds" className="hover:text-emerald-600">Seeds</Link>
//             <span>/</span>
//             <span className="text-gray-900 dark:text-white">Create New Seed</span>
//           </div>
          
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Link
//                 href="/admin/seeds"
//                 className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all"
//               >
//                 <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//               </Link>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
//                   Add New Seed
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-400 mt-1">Add a new seed variety to your catalog</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-sm text-emerald-700 dark:text-emerald-300">
//                 <span className="font-medium">Draft</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//             {/* Sidebar Navigation */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
//                 <div className="space-y-1">
//                   {tabs.map((tab) => {
//                     const Icon = tab.icon;
//                     return (
//                       <button
//                         key={tab.id}
//                         type="button"
//                         onClick={() => setActiveTab(tab.id)}
//                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                           activeTab === tab.id
//                             ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium shadow-sm'
//                             : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
//                         }`}
//                       >
//                         <Icon className="h-5 w-5" />
//                         <span>{tab.label}</span>
//                         {activeTab === tab.id && (
//                           <div className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Quick Stats Preview */}
//                 <div className="mt-6 pt-6 border-t dark:border-gray-700">
//                   <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
//                     Quick Preview
//                   </h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-500">Status:</span>
//                       <span className="font-medium capitalize">{formData.status}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-500">Category:</span>
//                       <span className="font-medium">{formData.category}</span>
//                     </div>
//                     {formData.price && (
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Price:</span>
//                         <span className="font-medium text-emerald-600">৳{formData.price}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="lg:col-span-3 space-y-6">
//               {/* Basic Information Tab */}
//               {activeTab === "basic" && (
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
//                   <div className="p-6 border-b dark:border-gray-700">
//                     <h2 className="text-xl font-semibold flex items-center gap-2">
//                       <Sprout className="h-6 w-6 text-emerald-600" />
//                       Basic Information
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Essential details about your seed product</p>
//                   </div>
                  
//                   <div className="p-6 space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Seed Name *</label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700"
//                         placeholder="e.g., Organic Roma Tomato Seeds"
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Category *</label>
//                         <div className="grid grid-cols-2 gap-2">
//                           {categories.map((cat) => {
//                             const Icon = cat.icon;
//                             return (
//                               <button
//                                 key={cat.value}
//                                 type="button"
//                                 onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
//                                 className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
//                                   formData.category === cat.value
//                                     ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700'
//                                     : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
//                                 }`}
//                               >
//                                 <Icon className={`h-4 w-4 ${cat.color}`} />
//                                 <span className="text-sm">{cat.value}</span>
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Sub Category</label>
//                         <input
//                           type="text"
//                           name="subCategory"
//                           value={formData.subCategory}
//                           onChange={handleChange}
//                           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                           placeholder="e.g., Cherry Tomatoes"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Origin</label>
//                         <div className="relative">
//                           <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                           <input
//                             type="text"
//                             name="origin"
//                             value={formData.origin}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                             placeholder="Country of origin"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Unit</label>
//                         <select
//                           name="unit"
//                           value={formData.unit}
//                           onChange={handleChange}
//                           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                         >
//                           {units.map(unit => (
//                             <option key={unit} value={unit}>{unit}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Pricing Tab */}
//               {activeTab === "pricing" && (
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
//                   <div className="p-6 border-b dark:border-gray-700">
//                     <h2 className="text-xl font-semibold flex items-center gap-2">
//                       <DollarSign className="h-6 w-6 text-emerald-600" />
//                       Pricing & Inventory
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Set your pricing and stock information</p>
//                   </div>
                  
//                   <div className="p-6 space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Price (৳) *</label>
//                         <div className="relative">
//                           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">৳</span>
//                           <input
//                             type="number"
//                             name="price"
//                             value={formData.price}
//                             onChange={handleChange}
//                             required
//                             className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                             placeholder="0.00"
//                           />
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Compare at Price</label>
//                         <div className="relative">
//                           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">৳</span>
//                           <input
//                             type="number"
//                             name="comparePrice"
//                             value={formData.comparePrice}
//                             onChange={handleChange}
//                             className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                             placeholder="0.00"
//                           />
//                         </div>
//                         {formData.comparePrice && (
//                           <p className="text-xs text-green-600 mt-1">
//                             Save {Math.round((parseFloat(formData.comparePrice) - parseFloat(formData.price)) / parseFloat(formData.comparePrice) * 100)}%
//                           </p>
//                         )}
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
//                         <input
//                           type="number"
//                           name="quantity"
//                           value={formData.quantity}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                           placeholder="0"
//                         />
//                       </div>
//                     </div>

//                     {/* Badges Section */}
//                     <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
//                       <h3 className="text-sm font-semibold mb-3">Product Badges</h3>
//                       <div className="flex flex-wrap gap-4">
//                         <label className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             name="organic"
//                             checked={formData.organic}
//                             onChange={handleChange}
//                             className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
//                           />
//                           <span className="text-sm flex items-center gap-1">
//                             <Shield className="h-4 w-4" />
//                             Organic
//                           </span>
//                         </label>
//                         <label className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             name="nonGmo"
//                             checked={formData.nonGmo}
//                             onChange={handleChange}
//                             className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
//                           />
//                           <span className="text-sm flex items-center gap-1">
//                             <Award className="h-4 w-4" />
//                             Non-GMO
//                           </span>
//                         </label>
//                         <label className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             name="heirloom"
//                             checked={formData.heirloom}
//                             onChange={handleChange}
//                             className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
//                           />
//                           <span className="text-sm flex items-center gap-1">
//                             <Truck className="h-4 w-4" />
//                             Heirloom
//                           </span>
//                         </label>
//                         <label className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             name="featured"
//                             checked={formData.featured}
//                             onChange={handleChange}
//                             className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
//                           />
//                           <span className="text-sm flex items-center gap-1">
//                             <TrendingUp className="h-4 w-4" />
//                             Featured
//                           </span>
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Growing Guide Tab */}
//               {activeTab === "growing" && (
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
//                   <div className="p-6 border-b dark:border-gray-700">
//                     <h2 className="text-xl font-semibold flex items-center gap-2">
//                       <Leaf className="h-6 w-6 text-emerald-600" />
//                       Growing Guide
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Cultivation instructions and requirements</p>
//                   </div>
                  
//                   <div className="p-6 space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Germination Rate</label>
//                         <input
//                           type="text"
//                           name="germinationRate"
//                           value={formData.germinationRate}
//                           onChange={handleChange}
//                           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                           placeholder="85%"
//                         />
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Purity</label>
//                         <input
//                           type="text"
//                           name="purity"
//                           value={formData.purity}
//                           onChange={handleChange}
//                           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                           placeholder="99%"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Growing Difficulty</label>
//                         <div className="flex gap-2">
//                           {difficulties.map(diff => (
//                             <button
//                               key={diff}
//                               type="button"
//                               onClick={() => setFormData(prev => ({ ...prev, growingDifficulty: diff }))}
//                               className={`flex-1 px-3 py-2 rounded-xl capitalize transition-all ${
//                                 formData.growingDifficulty === diff
//                                   ? 'bg-emerald-600 text-white'
//                                   : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
//                               }`}
//                             >
//                               {diff}
//                             </button>
//                           ))}
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Days to Maturity</label>
//                         <div className="relative">
//                           <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                           <input
//                             type="text"
//                             name="daysToMaturity"
//                             value={formData.daysToMaturity}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                             placeholder="60-90 days"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Planting Depth</label>
//                         <input
//                           type="text"
//                           name="plantingDepth"
//                           value={formData.plantingDepth}
//                           onChange={handleChange}
//                           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                           placeholder="0.5 cm"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Spacing</label>
//                         <input
//                           type="text"
//                           name="spacing"
//                           value={formData.spacing}
//                           onChange={handleChange}
//                           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                           placeholder="24 inches apart"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Sunlight</label>
//                         <div className="relative">
//                           <Sun className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                           <input
//                             type="text"
//                             name="sunlight"
//                             value={formData.sunlight}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                             placeholder="Full sun"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Watering</label>
//                         <div className="relative">
//                           <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                           <input
//                             type="text"
//                             name="watering"
//                             value={formData.watering}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                             placeholder="Regular"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">Growing Seasons</label>
//                       <div className="flex flex-wrap gap-2">
//                         {seasons.map(season => (
//                           <button
//                             key={season}
//                             type="button"
//                             onClick={() => toggleSeason(season)}
//                             className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
//                               formData.season.includes(season)
//                                 ? 'bg-emerald-600 text-white shadow-md'
//                                 : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
//                             }`}
//                           >
//                             {season}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Details Tab */}
//               {activeTab === "details" && (
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
//                   <div className="p-6 border-b dark:border-gray-700">
//                     <h2 className="text-xl font-semibold flex items-center gap-2">
//                       <PackageIcon className="h-6 w-6 text-emerald-600" />
//                       Product Details
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Description and key features</p>
//                   </div>
                  
//                   <div className="p-6 space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Description</label>
//                       <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows={6}
//                         className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                         placeholder="Provide a detailed description of this seed variety..."
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">Key Features</label>
//                       <div className="space-y-3">
//                         {formData.features.map((feature, index) => (
//                           <div key={index} className="flex gap-2">
//                             <div className="flex-1 relative">
//                               <Check className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
//                               <input
//                                 type="text"
//                                 value={feature}
//                                 onChange={(e) => handleFeatureChange(index, e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700"
//                                 placeholder={`Feature ${index + 1}`}
//                               />
//                             </div>
//                             {index > 0 && (
//                               <button
//                                 type="button"
//                                 onClick={() => removeFeature(index)}
//                                 className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
//                               >
//                                 <X className="h-5 w-5" />
//                               </button>
//                             )}
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={addFeature}
//                           className="mt-2 px-4 py-2 text-emerald-600 border-2 border-emerald-600 rounded-xl hover:bg-emerald-50 transition-all flex items-center gap-2"
//                         >
//                           <Plus className="h-4 w-4" />
//                           Add Feature
//                         </button>
//                       </div>
//                     </div>

//                     {/* Image Upload */}
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Product Images</label>
//                       <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
//                         <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                         <p className="text-sm text-gray-500">Click or drag and drop to upload</p>
//                         <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
//                       </div>
//                     </div>

//                     {/* Status */}
//                     <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
//                       <h3 className="text-sm font-semibold mb-3">Product Status</h3>
//                       <div className="flex gap-4">
//                         <label className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="radio"
//                             name="status"
//                             value="active"
//                             checked={formData.status === 'active'}
//                             onChange={handleChange}
//                             className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
//                           />
//                           <span className="text-sm">Active</span>
//                         </label>
//                         <label className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="radio"
//                             name="status"
//                             value="draft"
//                             checked={formData.status === 'draft'}
//                             onChange={handleChange}
//                             className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
//                           />
//                           <span className="text-sm">Draft</span>
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Form Actions */}
//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 disabled:opacity-50 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all"
//                 >
//                   {saving ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="h-5 w-5" />
//                       Save Seed
//                     </>
//                   )}
//                 </button>
//                 <Link
//                   href="/admin/seeds"
//                   className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
//                 >
//                   Cancel
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// // Apple icon import (add to your imports)
//  // Temporary fallback if Apple doesn't exist

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Save, 
  Plus, 
  Upload, 
  X,
  Check,
  AlertCircle,
  Loader2
} from "lucide-react";

// এনাম টাইপ গুলো
const DIFFICULTY_OPTIONS = [
  { value: "EASY", label: "সহজ" },
  { value: "MEDIUM", label: "মধ্যম" },
  { value: "HARD", label: "কঠিন" }
];

const SUNLIGHT_OPTIONS = [
  { value: "FULL_SUN", label: "পূর্ণ রৌদ্র" },
  { value: "PARTIAL_SHADE", label: "আংশিক ছায়া" },
  { value: "SHADE", label: "ছায়া" }
];

const WATER_REQUIREMENT_OPTIONS = [
  { value: "LOW", label: "কম" },
  { value: "MODERATE", label: "মাঝারি" },
  { value: "HIGH", label: "প্রচুর" },
  { value: "FLOOD", label: "বন্যাপ্রবণ" }
];

const SOIL_TYPE_OPTIONS = [
  { value: "CLAY", label: "এটেল মাটি" },
  { value: "SANDY", label: "বেলে মাটি" },
  { value: "LOAMY", label: "পলি মাটি" },
  { value: "SILTY", label: "পলি দোআঁশ" },
  { value: "PEATY", label: "পিট মাটি" },
  { value: "CHALKY", label: "চুনযুক্ত মাটি" },
  { value: "LATERITE", label: "ল্যাটেরাইট" },
  { value: "ALLUVIAL", label: "পলি মাটি" },
  { value: "BLACK_COTTON", label: "কালো তুলা মাটি" },
  { value: "RED", label: "লাল মাটি" }
];

const SEASONS = [
  { value: "summer", label: "গ্রীষ্মকাল" },
  { value: "rainy", label: "বর্ষাকাল" },
  { value: "autumn", label: "শরৎকাল" },
  { value: "late_autumn", label: "হেমন্তকাল" },
  { value: "winter", label: "শীতকাল" },
  { value: "spring", label: "বসন্তকাল" }
];

interface SeedFormData {
  // বেসিক তথ্য
  name: string;
  name_en: string;
  scientific_name: string;
  category: string;
  sub_category: string;
  season_id: string;
  image: string;
  image_gallery: string[];
  video_url: string;
  icon: string;
  variety_type: string;
  origin_country: string;
  origin_region: string;
  year_of_introduction: number;
  
  // চাষ সংক্রান্ত
  germination_time: string;
  germination_days: number;
  maturity_time: string;
  maturity_days: number;
  spacing: string;
  depth: string;
  depth_cm: number;
  sunlight: string;
  watering: string;
  difficulty: string;
  
  // মাটি ও আবহাওয়া
  soil_type: string;
  soil_type_enum: string;
  temperature: string;
  temperature_min: number;
  temperature_max: number;
  rainfall: string;
  rainfall_min_mm: number;
  rainfall_max_mm: number;
  ph_range: string;
  ph_min: number;
  ph_max: number;
  altitude_range: string;
  wind_tolerance: string;
  
  // ফলন ও সংরক্ষণ
  yield_per_hectare: string;
  yield_min_kg: number;
  yield_max_kg: number;
  harvest_method: string;
  storage: string;
  storage_days: number;
  
  // উপকারিতা ও সতর্কতা
  benefits: string[];
  benefits_bn: string[];
  precautions: string[];
  precautions_bn: string[];
  special_notes: string;
  special_notes_bn: string;
  nutritional_value: any;
  medicinal_uses: string[];
  commercial_uses: string[];
  
  // সার্টিফিকেশন ও মূল্য
  export_potential: boolean;
  organic_certified: boolean;
  market_price: number;
  seed_cost: number;
  expected_profit: number;
  
  // পরিবেশগত তথ্য
  carbon_footprint: number;
  water_footprint: number;
  sustainable_practices: string[];
}

export default function CreateSeedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  
  // ফর্ম ডাটা স্টেট
  const [formData, setFormData] = useState<SeedFormData>({
    name: "",
    name_en: "",
    scientific_name: "",
    category: "",
    sub_category: "",
    season_id: "",
    image: "",
    image_gallery: [],
    video_url: "",
    icon: "",
    variety_type: "",
    origin_country: "বাংলাদেশ",
    origin_region: "",
    year_of_introduction: new Date().getFullYear(),
    germination_time: "",
    germination_days: 0,
    maturity_time: "",
    maturity_days: 0,
    spacing: "",
    depth: "",
    depth_cm: 0,
    sunlight: "FULL_SUN",
    watering: "MODERATE",
    difficulty: "EASY",
    soil_type: "",
    soil_type_enum: "LOAMY",
    temperature: "",
    temperature_min: 0,
    temperature_max: 0,
    rainfall: "",
    rainfall_min_mm: 0,
    rainfall_max_mm: 0,
    ph_range: "",
    ph_min: 0,
    ph_max: 0,
    altitude_range: "",
    wind_tolerance: "",
    yield_per_hectare: "",
    yield_min_kg: 0,
    yield_max_kg: 0,
    harvest_method: "",
    storage: "",
    storage_days: 0,
    benefits: [],
    benefits_bn: [],
    precautions: [],
    precautions_bn: [],
    special_notes: "",
    special_notes_bn: "",
    nutritional_value: {},
    medicinal_uses: [],
    commercial_uses: [],
    export_potential: false,
    organic_certified: false,
    market_price: 0,
    seed_cost: 0,
    expected_profit: 0,
    carbon_footprint: 0,
    water_footprint: 0,
    sustainable_practices: []
  });

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // অ্যারে ফিল্ডে আইটেম যোগ
  const addArrayItem = (field: keyof SeedFormData, value: string) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), value]
    }));
  };

  // অ্যারে থেকে আইটেম রিমুভ
  const removeArrayItem = (field: keyof SeedFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  // ইমেজ আপলোড হ্যান্ডলার
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // এখানে ইমেজ আপলোড API কল হবে
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImagePreview(prev => [...prev, ...imageUrls]);
    setFormData(prev => ({
      ...prev,
      image_gallery: [...prev.image_gallery, ...imageUrls]
    }));
  };

  // ফর্ম সাবমিট
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/seeds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("সীড ক্রিয়েট করতে ব্যর্থ হয়েছে");

      const data = await response.json();
      router.push(`/admin/seeds/${data.seedId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "একটি ত্রুটি ঘটেছে");
    } finally {
      setLoading(false);
    }
  };

  // স্টেপ ইন্ডিকেটর
  const steps = [
    { number: 1, title: "বেসিক তথ্য", icon: "🌾" },
    { number: 2, title: "চাষ পদ্ধতি", icon: "🌱" },
    { number: 3, title: "মাটি ও আবহাওয়া", icon: "🌍" },
    { number: 4, title: "ফলন ও সংরক্ষণ", icon: "📦" },
    { number: 5, title: "উপকারিতা", icon: "💚" },
    { number: 6, title: "অতিরিক্ত তথ্য", icon: "📝" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* হেডার */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">নতুন বীজ যোগ করুন</h1>
          <p className="text-gray-500 mt-1">কৃষি পণ্যের সকল তথ্য সঠিকভাবে পূরণ করুন</p>
        </div>

        {/* স্টেপ প্রগ্রেস */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.number} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-all ${
                      currentStep >= step.number
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? <Check size={20} /> : step.icon}
                  </div>
                  <span className="text-xs mt-2 text-center hidden md:block">{step.title}</span>
                </div>
                {step.number < steps.length && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-0.5 ${
                      currentStep > step.number ? "bg-green-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* স্টেপ 1: বেসিক তথ্য */}
          {currentStep === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span>🌾</span> বেসিক তথ্য
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    বীজের নাম (বাংলা) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="যেমন: ধান বীজ-২৯"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    বীজের নাম (ইংরেজি)
                  </label>
                  <input
                    type="text"
                    name="name_en"
                    value={formData.name_en}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Rice Seed-29"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    বৈজ্ঞানিক নাম
                  </label>
                  <input
                    type="text"
                    name="scientific_name"
                    value={formData.scientific_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="যেমন: Oryza sativa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ক্যাটেগরি <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">সিলেক্ট করুন</option>
                    <option value="ধান">ধান</option>
                    <option value="গম">গম</option>
                    <option value="ভুট্টা">ভুট্টা</option>
                    <option value="সবজি">সবজি</option>
                    <option value="ফল">ফল</option>
                    <option value="ডাল">ডাল</option>
                    <option value="তেলবীজ">তেলবীজ</option>
                    <option value="মসলা">মসলা</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    উপ-ক্যাটেগরি
                  </label>
                  <input
                    type="text"
                    name="sub_category"
                    value={formData.sub_category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="যেমন: স্বল্প মেয়াদী"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মৌসুম <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="season_id"
                    value={formData.season_id}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">সিলেক্ট করুন</option>
                    {SEASONS.map(season => (
                      <option key={season.value} value={season.value}>
                        {season.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    চাষের অসুবিধা
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {DIFFICULTY_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    উৎপত্তি দেশ
                  </label>
                  <input
                    type="text"
                    name="origin_country"
                    value={formData.origin_country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    প্রবর্তন সাল
                  </label>
                  <input
                    type="number"
                    name="year_of_introduction"
                    value={formData.year_of_introduction}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* ইমেজ আপলোড */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  বীজের ছবি
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload size={40} className="text-gray-400" />
                    <span className="text-gray-500">ছবি আপলোড করুন</span>
                    <span className="text-xs text-gray-400">PNG, JPG, WEBP (Max 5MB)</span>
                  </label>
                </div>
                
                {/* ইমেজ প্রিভিউ */}
                {imagePreview.length > 0 && (
                  <div className="flex gap-3 mt-4 flex-wrap">
                    {imagePreview.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image src={img} alt={`Preview ${idx}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(prev => prev.filter((_, i) => i !== idx));
                            setFormData(prev => ({
                              ...prev,
                              image_gallery: prev.image_gallery.filter((_, i) => i !== idx)
                            }));
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-lg"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* স্টেপ 2: চাষ পদ্ধতি */}
          {currentStep === 2 && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span>🌱</span> চাষ পদ্ধতি
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    অঙ্কুরোদগম সময়
                  </label>
                  <input
                    type="text"
                    name="germination_time"
                    value={formData.germination_time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="যেমন: ৫-৭ দিন"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    অঙ্কুরোদগম (দিন)
                  </label>
                  <input
                    type="number"
                    name="germination_days"
                    value={formData.germination_days}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পরিপক্কতা সময়
                  </label>
                  <input
                    type="text"
                    name="maturity_time"
                    value={formData.maturity_time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="যেমন: ১২০-১৩০ দিন"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পরিপক্কতা (দিন)
                  </label>
                  <input
                    type="number"
                    name="maturity_days"
                    value={formData.maturity_days}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সূর্যালোকের প্রয়োজন
                  </label>
                  <select
                    name="sunlight"
                    value={formData.sunlight}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    {SUNLIGHT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পানির প্রয়োজন
                  </label>
                  <select
                    name="watering"
                    value={formData.watering}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    {WATER_REQUIREMENT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    গাছের দূরত্ব
                  </label>
                  <input
                    type="text"
                    name="spacing"
                    value={formData.spacing}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="যেমন: ২০ x ১৫ সেমি"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    বীজ বপনের গভীরতা
                  </label>
                  <input
                    type="text"
                    name="depth"
                    value={formData.depth}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="যেমন: ২-৩ সেমি"
                  />
                </div>
              </div>
            </div>
          )}

          {/* স্টেপ 3: মাটি ও আবহাওয়া */}
          {currentStep === 3 && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span>🌍</span> মাটি ও আবহাওয়া
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মাটির ধরন
                  </label>
                  <select
                    name="soil_type_enum"
                    value={formData.soil_type_enum}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    {SOIL_TYPE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সর্বনিম্ন তাপমাত্রা (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature_min"
                    value={formData.temperature_min}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সর্বোচ্চ তাপমাত্রা (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature_max"
                    value={formData.temperature_max}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সর্বনিম্ন বৃষ্টিপাত (mm)
                  </label>
                  <input
                    type="number"
                    name="rainfall_min_mm"
                    value={formData.rainfall_min_mm}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সর্বোচ্চ বৃষ্টিপাত (mm)
                  </label>
                  <input
                    type="number"
                    name="rainfall_max_mm"
                    value={formData.rainfall_max_mm}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সর্বনিম্ন pH
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="ph_min"
                    value={formData.ph_min}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সর্বোচ্চ pH
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="ph_max"
                    value={formData.ph_max}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    উচ্চতা সীমা
                  </label>
                  <input
                    type="text"
                    name="altitude_range"
                    value={formData.altitude_range}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="যেমন: ০-৩০০ মিটার"
                  />
                </div>
              </div>
            </div>
          )}

          {/* স্টেপ 4: ফলন ও সংরক্ষণ */}
          {currentStep === 4 && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span>📦</span> ফলন ও সংরক্ষণ
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ফলন (প্রতি হেক্টর)
                  </label>
                  <input
                    type="text"
                    name="yield_per_hectare"
                    value={formData.yield_per_hectare}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="যেমন: ৪-৫ টন"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সর্বনিম্ন ফলন (kg)
                  </label>
                  <input
                    type="number"
                    name="yield_min_kg"
                    value={formData.yield_min_kg}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সর্বোচ্চ ফলন (kg)
                  </label>
                  <input
                    type="number"
                    name="yield_max_kg"
                    value={formData.yield_max_kg}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ফসল সংগ্রহের পদ্ধতি
                  </label>
                  <input
                    type="text"
                    name="harvest_method"
                    value={formData.harvest_method}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সংরক্ষণ পদ্ধতি
                  </label>
                  <input
                    type="text"
                    name="storage"
                    value={formData.storage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    সংরক্ষণ সময় (দিন)
                  </label>
                  <input
                    type="number"
                    name="storage_days"
                    value={formData.storage_days}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* স্টেপ 5: উপকারিতা */}
          {currentStep === 5 && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span>💚</span> উপকারিতা ও সতর্কতা
              </h2>
              
              <div className="space-y-4">
                {/* উপকারিতা (বাংলা) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    উপকারিতা (বাংলা)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      id="benefitInput"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="যেমন: রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById("benefitInput") as HTMLInputElement;
                        if (input.value) {
                          addArrayItem("benefits_bn", input.value);
                          input.value = "";
                        }
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.benefits_bn.map((item, idx) => (
                      <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        {item}
                        <button type="button" onClick={() => removeArrayItem("benefits_bn", idx)}>
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* সতর্কতা (বাংলা) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    সতর্কতা (বাংলা)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      id="precautionInput"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="যেমন: অতিরিক্ত পানি দেওয়া যাবে না"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById("precautionInput") as HTMLInputElement;
                        if (input.value) {
                          addArrayItem("precautions_bn", input.value);
                          input.value = "";
                        }
                      }}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.precautions_bn.map((item, idx) => (
                      <span key={idx} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        {item}
                        <button type="button" onClick={() => removeArrayItem("precautions_bn", idx)}>
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* বিশেষ নোট */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    বিশেষ নোট (বাংলা)
                  </label>
                  <textarea
                    name="special_notes_bn"
                    value={formData.special_notes_bn}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="বীজ সম্পর্কে বিশেষ তথ্য..."
                  />
                </div>

                {/* বাণিজ্যিক ব্যবহার */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    বাণিজ্যিক ব্যবহার
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      id="commercialInput"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="যেমন: খাদ্য প্রক্রিয়াকরণ"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById("commercialInput") as HTMLInputElement;
                        if (input.value) {
                          addArrayItem("commercial_uses", input.value);
                          input.value = "";
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.commercial_uses.map((item, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        {item}
                        <button type="button" onClick={() => removeArrayItem("commercial_uses", idx)}>
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* স্টেপ 6: অতিরিক্ত তথ্য */}
          {currentStep === 6 && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span>📝</span> অতিরিক্ত তথ্য
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    বীজের মূল্য (প্রতি কেজি)
                  </label>
                  <input
                    type="number"
                    name="seed_cost"
                    value={formData.seed_cost}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    বাজার মূল্য
                  </label>
                  <input
                    type="number"
                    name="market_price"
                    value={formData.market_price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    প্রত্যাশিত লাভ (%)
                  </label>
                  <input
                    type="number"
                    name="expected_profit"
                    value={formData.expected_profit}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    কার্বন ফুটপ্রিন্ট (kg CO₂)
                  </label>
                  <input
                    type="number"
                    name="carbon_footprint"
                    value={formData.carbon_footprint}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পানি ফুটপ্রিন্ট (লিটার)
                  </label>
                  <input
                    type="number"
                    name="water_footprint"
                    value={formData.water_footprint}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* চেকবক্স */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="organic_certified"
                    checked={formData.organic_certified}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-sm">অর্গানিক সার্টিফাইড</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="export_potential"
                    checked={formData.export_potential}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-sm">এক্সপোর্ট সম্ভাবনা</span>
                </label>
              </div>
            </div>
          )}

          {/* এরর মেসেজ */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {/* নেভিগেশন বাটন */}
          <div className="flex justify-between gap-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                আগের ধাপ
              </button>
            )}
            
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ml-auto"
              >
                পরবর্তী ধাপ
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ml-auto flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {loading ? "সেভ হচ্ছে..." : "সেভ করুন"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}