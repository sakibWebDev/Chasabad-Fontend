// // app/admin/orders/delivered/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { CheckCircle, Star, Download, Search, ChevronLeft, ChevronRight, Package, Trophy, TrendingUp } from 'lucide-react';
// import { Order } from '@/types';
// import toast from 'react-hot-toast';

// const DELIVERED_ORDERS: Order[] = [
//   {
//     id: "4",
//     orderId: "ORD-2024-004",
//     user: {
//       id: "user4",
//       name: "Sarah Wilson",
//       email: "sarah@example.com",
//       phone: "+8801712345679"
//     },
//     items: [{ id: "item6", name: "Product 6", quantity: 1, price: 4200 }],
//     total_amount: 4200,
//     status: "DELIVERED",
//     createdAt: "2024-01-10T14:20:00Z",
//     updatedAt: "2024-01-12T09:00:00Z",
//     shipping_address: "321 Hill View, Rajshahi, Bangladesh",
//     payment_method: "bkash",
//     payment_status: "completed",
//     delivered_at: "2024-01-12T09:00:00Z"
//   },
//   {
//     id: "8",
//     orderId: "ORD-2024-008",
//     user: {
//       id: "user8",
//       name: "Lisa Wang",
//       email: "lisa@example.com",
//       phone: "+8801876543222"
//     },
//     items: [{ id: "item12", name: "Product 12", quantity: 1, price: 5500 }],
//     total_amount: 5500,
//     status: "DELIVERED",
//     createdAt: "2024-01-12T09:00:00Z",
//     updatedAt: "2024-01-15T16:45:00Z",
//     shipping_address: "777 Lake Drive, Chittagong, Bangladesh",
//     payment_method: "nagad",
//     payment_status: "completed",
//     delivered_at: "2024-01-15T16:45:00Z"
//   }
// ];

// export default function DeliveredOrdersPage() {
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
//     setOrders(DELIVERED_ORDERS);
//     setLoading(false);
//   };

//   const stats = {
//     total: orders.length,
//     totalRevenue: orders.reduce((s, o) => s + o.total_amount, 0),
//     averageOrder: orders.reduce((s, o) => s + o.total_amount, 0) / (orders.length || 1)
//   };

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="p-2 bg-green-100 rounded-lg">
//             <CheckCircle className="h-6 w-6 text-green-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold">Delivered Orders</h1>
//             <p className="text-gray-600">Successfully completed orders</p>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
//           <p className="text-sm opacity-90">Total Delivered</p>
//           <p className="text-3xl font-bold">{stats.total}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4">
//           <p className="text-sm text-gray-500">Revenue</p>
//           <p className="text-2xl font-bold">৳{stats.totalRevenue.toLocaleString()}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4">
//           <p className="text-sm text-gray-500">Average Order Value</p>
//           <p className="text-2xl font-bold">৳{Math.round(stats.averageOrder).toLocaleString()}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4">
//           <p className="text-sm text-gray-500">Customer Rating</p>
//           <p className="text-2xl font-bold flex items-center gap-1">4.8 <Star className="h-5 w-5 text-yellow-400 fill-current" /></p>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search delivered orders..."
//             className="w-full pl-10 pr-4 py-2 border rounded-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Order ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Customer</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Delivered On</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {orders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 font-medium">{order.orderId}</td>
//                   <td className="px-6 py-4">
//                     <div>{order.user?.name}</div>
//                     <div className="text-sm text-gray-500">{order.user?.email}</div>
//                   </td>
//                   <td className="px-6 py-4 font-semibold text-green-600">৳{order.total_amount.toLocaleString()}</td>
//                   <td className="px-6 py-4">{new Date(order.updatedAt).toLocaleDateString()}</td>
//                   <td className="px-6 py-4">
//                     <button className="text-blue-600 hover:text-blue-800">
//                       <CheckCircle className="h-5 w-5" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {orders.length === 0 && (
//             <div className="text-center py-12">
//               <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-500">No delivered orders</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }