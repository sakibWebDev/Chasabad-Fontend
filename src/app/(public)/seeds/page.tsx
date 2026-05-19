// "use client";

// import { useState, useEffect } from "react";
// import SeedCard from "@/components/public/SeedCard";
// import SearchFilters from "@/components/public/SearchFilters";
// import axios from "axios";

// interface Seed {
//   id: string;
//   seedId: string;
//   name: string;
//   name_en: string;
//   image: string;
//   difficulty: string;
//   market_price: number;
//   rating: number;
//   category: string;
// }

// export default function SeedsPage() {
//   const [seeds, setSeeds] = useState<Seed[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     category: "",
//     difficulty: "",
//     search: "",
//     page: 1,
//   });
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 12,
//     total: 0,
//     totalPages: 0,
//   });

//   useEffect(() => {
//     fetchSeeds();
//   }, [filters]);

//   const fetchSeeds = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/api/public/seeds", {
//         params: filters,
//       });
//       setSeeds(response.data.seeds);
//       setPagination(response.data.pagination);
//     } catch (error) {
//       console.error("Error fetching seeds:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (newFilters: any) => {
//     setFilters({ ...filters, ...newFilters, page: 1 });
//   };

//   const handlePageChange = (newPage: number) => {
//     setFilters({ ...filters, page: newPage });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore Seeds</h1>
//           <p className="text-gray-600">
//             Discover high-quality seeds for better harvest
//           </p>
//         </div>

//         {/* Filters */}
//         <SearchFilters onFilterChange={handleFilterChange} />

//         {/* Results */}
//         {loading ? (
//           <div className="flex justify-center items-center h-96">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//           </div>
//         ) : seeds.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {seeds.map((seed) => (
//                 <SeedCard key={seed.id} seed={seed} />
//               ))}
//             </div>

//             {/* Pagination */}
//             {pagination.totalPages > 1 && (
//               <div className="flex justify-center mt-8 space-x-2">
//                 <button
//                   onClick={() => handlePageChange(pagination.page - 1)}
//                   disabled={pagination.page === 1}
//                   className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   Previous
//                 </button>
//                 <div className="flex space-x-1">
//                   {Array.from(
//                     { length: pagination.totalPages },
//                     (_, i) => i + 1
//                   ).map((page) => (
//                     <button
//                       key={page}
//                       onClick={() => handlePageChange(page)}
//                       className={`px-4 py-2 border rounded-lg ${
//                         pagination.page === page
//                           ? "bg-green-600 text-white"
//                           : "hover:bg-gray-50"
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                 </div>
//                 <button
//                   onClick={() => handlePageChange(pagination.page + 1)}
//                   disabled={pagination.page === pagination.totalPages}
//                   className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">No seeds found</p>
//             <button
//               onClick={() => handleFilterChange({ category: "", difficulty: "", search: "" })}
//               className="mt-4 text-green-600 hover:text-green-700"
//             >
//               Clear filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }