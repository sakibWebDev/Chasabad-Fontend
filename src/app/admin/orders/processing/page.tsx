// // app/admin/orders/processing/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { RefreshCw, Eye, Truck, XCircle, CheckCircle, Search, ChevronLeft, ChevronRight, Package } from 'lucide-react';
// import { Order } from '@/types';
// import toast from 'react-hot-toast';

// const PROCESSING_ORDERS: Order[] = [
//   {
//     id: "2",
//     orderId: "ORD-2024-002",
//     user: {
//       id: "user2",
//       name: "Jane Smith",
//       email: "jane@example.com",
//       phone: "+8801876543210"
//     },
//     items: [{ id: "item3", name: "Smart Watch Pro", quantity: 1, price: 15990 }],
//     total_amount: 15990,
//     status: "PROCESSING",
//     createdAt: "2024-01-14T15:45:00Z",
//     updatedAt: "2024-01-14T16:00:00Z",
//     shipping_address: "456 Park Avenue, Chittagong, Bangladesh",
//     payment_method: "nagad",
//     payment_status: "completed",
//     tracking_number: null
//   },
//   {
//     id: "7",
//     orderId: "ORD-2024-007",
//     user: {
//       id: "user7",
//       name: "David Lee",
//       email: "david@example.com",
//       phone: "+8801712345680"
//     },
//     items: [{ id: "item11", name: "Product 11", quantity: 2, price: 2100 }],
//     total_amount: 4200,
//     status: "PROCESSING",
//     createdAt: "2024-01-17T13:20:00Z",
//     updatedAt: "2024-01-17T14:30:00Z",
//     shipping_address: "555 New Road, Dhaka, Bangladesh",
//     payment_method: "bkash",
//     payment_status: "completed",
//     tracking_number: null
//   }
// ];

// export default function ProcessingOrdersPage() {
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
//     setOrders(PROCESSING_ORDERS);
//     setLoading(false);
//   };

//   const handleShipOrder = (orderId: string) => {
//     toast.success(`Order ${orderId} marked as shipped`);
//     setOrders(prev => prev.filter(o => o.id !== orderId));
//   };

//   const filteredOrders = orders.filter(order =>
//     order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="p-2 bg-blue-100 rounded-lg">
//             <RefreshCw className="h-6 w-6 text-blue-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold">Processing Orders</h1>
//             <p className="text-gray-600">Orders being prepared for shipment</p>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
//           <p className="text-sm opacity-90">Processing Orders</p>
//           <p className="text-3xl font-bold">{orders.length}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4">
//           <p className="text-sm text-gray-500">Total Value</p>
//           <p className="text-2xl font-bold">৳{orders.reduce((s, o) => s + o.total_amount, 0).toLocaleString()}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4">
//           <p className="text-sm text-gray-500">Ready to Ship</p>
//           <p className="text-2xl font-bold">{orders.length}</p>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search orders..."
//             className="w-full pl-10 pr-4 py-2 border rounded-lg"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {currentOrders.map((order) => (
//             <div key={order.id} className="bg-white rounded-lg shadow p-6">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-semibold">{order.orderId}</h3>
//                   <p className="text-gray-600 mt-1">{order.user?.name}</p>
//                   <p className="text-sm text-gray-500">{order.shipping_address}</p>
//                   <div className="mt-2">
//                     <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
//                       <RefreshCw className="h-3 w-3" />
//                       Processing
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-2xl font-bold text-green-600">৳{order.total_amount.toLocaleString()}</p>
//                   <div className="flex gap-2 mt-4">
//                     <button className="px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
//                       <Eye className="h-4 w-4 inline mr-1" />
//                       View
//                     </button>
//                     <button
//                       onClick={() => handleShipOrder(order.id)}
//                       className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                     >
//                       <Truck className="h-4 w-4 inline mr-1" />
//                       Ship Order
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {filteredOrders.length === 0 && (
//             <div className="text-center py-12 bg-white rounded-lg">
//               <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-500">No processing orders</p>
//             </div>
//           )}

//           {/* Pagination */}
//           {filteredOrders.length > 0 && (
//             <div className="flex justify-between items-center mt-4">
//               <div className="text-sm text-gray-500">
//                 Page {currentPage} of {totalPages}
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 border rounded-lg disabled:opacity-50"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1 border rounded-lg disabled:opacity-50"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }