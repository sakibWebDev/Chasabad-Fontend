// // app/admin/orders/cancelled/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { XCircle, RefreshCw, AlertTriangle, Search, ChevronLeft, ChevronRight, ThumbsDown } from 'lucide-react';
// import { Order , OrderItem } from '@/types';
// import toast from 'react-hot-toast';

// // Mock seed data for order items
// const MOCK_SEED = {
//   id: "seed1",
//   name: "Product 7",
//   category: "Vegetables",
//   price: 950,
//   stock: 100,
//   unit: "kg"
// };

// const CANCELLED_ORDERS: Order[] = [
//   {
//     id: "5",
//     orderId: "ORD-2024-005",
//     userId: "user5",
//     user: {
//       id: "user5",
//       name: "Alex Brown",
//       email: "alex@example.com",
//       phone: "+8801876543211",
//       role: "USER",
//       status: "ACTIVE",
//       createdAt: "2024-01-01T00:00:00Z"
//     },
//     total_amount: 4700,
//     status: "CANCELLED",
//     createdAt: "2024-01-09T11:00:00Z",
//     items: [
//       { 
//         id: "item7", 
//         seedId: "seed1",
//         seed: { ...MOCK_SEED, id: "seed1", name: "Product 7", price: 950 },
//         quantity: 2, 
//         unit_price: 950,
//         total_price: 1900
//       },
//       { 
//         id: "item8", 
//         seedId: "seed2",
//         seed: { ...MOCK_SEED, id: "seed2", name: "Product 8", price: 2800 },
//         quantity: 1, 
//         unit_price: 2800,
//         total_price: 2800
//       }
//     ]
//   }
// ];

// export default function CancelledOrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   const loadOrders = async () => {
//     setLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 800));
//     setOrders(CANCELLED_ORDERS);
//     setLoading(false);
//   };

//   // Filter orders based on search term
//   const filteredOrders = orders.filter(order => 
//     order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
//   const paginatedOrders = filteredOrders.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const stats = {
//     total: orders.length,
//     totalRefunded: orders.reduce((s, o) => s + o.total_amount, 0),
//   };

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="p-2 bg-red-100 rounded-lg">
//             <XCircle className="h-6 w-6 text-red-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold">Cancelled Orders</h1>
//             <p className="text-gray-600">Orders that were cancelled</p>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
//           <p className="text-sm opacity-90">Total Cancelled Orders</p>
//           <p className="text-3xl font-bold">{stats.total}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4">
//           <p className="text-sm text-gray-500">Total Amount Refunded</p>
//           <p className="text-2xl font-bold">৳{stats.totalRefunded.toLocaleString()}</p>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search cancelled orders by ID or customer name..."
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
//         </div>
//       ) : (
//         <>
//           <div className="space-y-4">
//             {paginatedOrders.map((order) => (
//               <div key={order.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-2">
//                       <h3 className="text-lg font-semibold">{order.orderId}</h3>
//                       <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
//                         CANCELLED
//                       </span>
//                     </div>
//                     <p className="text-gray-700"><span className="font-medium">Customer:</span> {order.user?.name || 'N/A'}</p>
//                     <p className="text-gray-700"><span className="font-medium">Email:</span> {order.user?.email || 'N/A'}</p>
//                     <p className="text-gray-700"><span className="font-medium">Phone:</span> {order.user?.phone || 'N/A'}</p>
                    
//                     {/* Order Items */}
//                     <div className="mt-3">
//                       <p className="font-medium text-gray-700 mb-2">Items:</p>
//                       <div className="space-y-1">
//                         {order.items.map((item) => (
//                           <div key={item.id} className="text-sm text-gray-600">
//                             {item.quantity}x {item.seed.name} - ৳{item.unit_price.toLocaleString()} each
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-2xl font-bold text-red-600">৳{order.total_amount.toLocaleString()}</p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Ordered on {new Date(order.createdAt).toLocaleDateString()}
//                     </p>
//                     <button 
//                       onClick={() => toast.success(`Processing refund for ${order.orderId}`)}
//                       className="mt-4 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                     >
//                       <RefreshCw className="h-4 w-4 inline mr-1" />
//                       Process Refund
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {filteredOrders.length === 0 && (
//               <div className="text-center py-12 bg-white rounded-lg">
//                 <ThumbsDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500">No cancelled orders found</p>
//               </div>
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center gap-2 mt-6">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>
//               <span className="px-3 py-1">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }