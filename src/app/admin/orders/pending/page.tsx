// // app/admin/orders/pending/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { 
//   Clock, Eye, Truck, XCircle, Filter, Download, Search, 
//   ChevronLeft, ChevronRight, AlertCircle, Package, 
//   DollarSign, Calendar, MessageCircle, Printer
// } from 'lucide-react';
// import { Order } from '@/types';
// import toast from 'react-hot-toast';
// import Link from 'next/link';
// import Image from 'next/image';

// // Mock Data for Pending Orders
// const PENDING_ORDERS: Order[] = [
//   {
//     id: "1",
//     orderId: "ORD-2024-001",
//     user: {
//       id: "user1",
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "+8801712345678"
//     },
//     items: [
//       { id: "item1", name: "Premium Wireless Headphones", quantity: 2, price: 8990 },
//       { id: "item2", name: "USB-C Cable", quantity: 1, price: 1200 }
//     ],
//     total_amount: 19180,
//     status: "PENDING",
//     createdAt: "2024-01-15T10:30:00Z",
//     updatedAt: "2024-01-15T10:30:00Z",
//     shipping_address: "123 Main Street, Dhaka, Bangladesh",
//     payment_method: "bkash",
//     payment_status: "pending",
//     notes: "Customer requested gift wrapping"
//   },
//   {
//     id: "2",
//     orderId: "ORD-2024-006",
//     user: {
//       id: "user6",
//       name: "Emily Davis",
//       email: "emily@example.com",
//       phone: "+8801912345679"
//     },
//     items: [
//       { id: "item9", name: "Product 9", quantity: 1, price: 1800 },
//       { id: "item10", name: "Product 10", quantity: 4, price: 300 }
//     ],
//     total_amount: 3000,
//     status: "PENDING",
//     createdAt: "2024-01-16T08:45:00Z",
//     updatedAt: "2024-01-16T08:45:00Z",
//     shipping_address: "987 Lakefront, Barisal, Bangladesh",
//     payment_method: "cash_on_delivery",
//     payment_status: "pending",
//     notes: null
//   },
//   {
//     id: "3",
//     orderId: "ORD-2024-009",
//     user: {
//       id: "user9",
//       name: "Robert Chen",
//       email: "robert@example.com",
//       phone: "+8801712345690"
//     },
//     items: [
//       { id: "item13", name: "Gaming Mouse", quantity: 1, price: 3990 },
//       { id: "item14", name: "Mouse Pad", quantity: 2, price: 890 }
//     ],
//     total_amount: 5770,
//     status: "PENDING",
//     createdAt: "2024-01-18T14:20:00Z",
//     updatedAt: "2024-01-18T14:20:00Z",
//     shipping_address: "444 Digital City, Dhaka, Bangladesh",
//     payment_method: "nagad",
//     payment_status: "pending",
//     notes: "Urgent delivery needed"
//   }
// ];

// export default function PendingOrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   const loadOrders = async () => {
//     setLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 800));
//     setOrders(PENDING_ORDERS);
//     setLoading(false);
//     toast.success(`${PENDING_ORDERS.length} pending orders found`);
//   };

//   const handleUpdateStatus = async (id: string, status: string) => {
//     setOrders(prev => prev.filter(o => o.id !== id));
//     toast.success(`Order moved to ${status}`);
//   };

//   const filteredOrders = orders.filter(order =>
//     order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

//   const stats = {
//     total: orders.length,
//     totalAmount: orders.reduce((sum, o) => sum + o.total_amount, 0),
//     cod: orders.filter(o => o.payment_method === 'cash_on_delivery').length,
//     online: orders.filter(o => o.payment_method !== 'cash_on_delivery').length
//   };

//   const processOrder = (orderId: string) => {
//     toast.success(`Order ${orderId} moved to processing`);
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="p-2 bg-yellow-100 rounded-lg">
//             <Clock className="h-6 w-6 text-yellow-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pending Orders</h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-1">Orders waiting for confirmation</p>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 text-white">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm opacity-90">Total Pending</p>
//               <p className="text-3xl font-bold mt-1">{stats.total}</p>
//             </div>
//             <Clock className="h-8 w-8 opacity-80" />
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">Total Amount</p>
//               <p className="text-2xl font-bold text-gray-800 dark:text-white">৳{stats.totalAmount.toLocaleString()}</p>
//             </div>
//             <DollarSign className="h-8 w-8 text-green-600" />
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">COD Orders</p>
//               <p className="text-2xl font-bold text-orange-600">{stats.cod}</p>
//             </div>
//             <Package className="h-8 w-8 text-orange-600" />
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">Online Payment</p>
//               <p className="text-2xl font-bold text-blue-600">{stats.online}</p>
//             </div>
//             <Package className="h-8 w-8 text-blue-600" />
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
//         <div className="flex flex-wrap gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by order ID or customer..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-yellow-500"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Orders Grid */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {currentOrders.map((order) => (
//             <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//               <div className="flex flex-wrap justify-between items-start gap-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-3">
//                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                       {order.orderId}
//                     </h3>
//                     <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
//                       {order.payment_method}
//                     </span>
//                     <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
//                       {order.payment_status}
//                     </span>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Customer</p>
//                       <p className="font-medium text-gray-800 dark:text-white">{order.user?.name}</p>
//                       <p className="text-sm text-gray-500">{order.user?.email}</p>
//                       <p className="text-sm text-gray-500">{order.user?.phone}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Order Date</p>
//                       <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
//                       <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Shipping Address</p>
//                       <p className="text-sm text-gray-700 dark:text-gray-300">{order.shipping_address}</p>
//                     </div>
//                   </div>

//                   <div className="border-t pt-3">
//                     <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Items:</p>
//                     <div className="space-y-1">
//                       {order.items.slice(0, 2).map((item, idx) => (
//                         <p key={idx} className="text-sm text-gray-600">
//                           {item.quantity}x {item.name} - ৳{item.price.toLocaleString()}
//                         </p>
//                       ))}
//                       {order.items.length > 2 && (
//                         <p className="text-sm text-gray-500">+{order.items.length - 2} more items</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <p className="text-2xl font-bold text-green-600">৳{order.total_amount.toLocaleString()}</p>
//                   {order.notes && (
//                     <div className="mt-2 flex items-center gap-1 text-sm text-orange-600">
//                       <AlertCircle className="h-4 w-4" />
//                       <span>Note attached</span>
//                     </div>
//                   )}
//                   <div className="flex gap-2 mt-4">
//                     <button
//                       onClick={() => {
//                         setSelectedOrder(order);
//                         setShowDetailsModal(true);
//                       }}
//                       className="px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 text-sm"
//                     >
//                       <Eye className="h-4 w-4 inline mr-1" />
//                       Details
//                     </button>
//                     <button
//                       onClick={() => processOrder(order.id)}
//                       className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
//                     >
//                       <Truck className="h-4 w-4 inline mr-1" />
//                       Process
//                     </button>
//                     <button
//                       onClick={() => handleUpdateStatus(order.id, 'CANCELLED')}
//                       className="px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 text-sm"
//                     >
//                       <XCircle className="h-4 w-4 inline mr-1" />
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Empty State */}
//           {filteredOrders.length === 0 && (
//             <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
//               <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-500">No pending orders found</p>
//             </div>
//           )}

//           {/* Pagination */}
//           {filteredOrders.length > 0 && (
//             <div className="flex justify-between items-center mt-4">
//               <div className="text-sm text-gray-500">
//                 Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length}
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 border rounded-lg disabled:opacity-50"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
//                 <span className="px-3 py-1">Page {currentPage} of {totalPages}</span>
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

//       {/* Order Details Modal */}
//       {showDetailsModal && selectedOrder && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-2xl font-bold">Order Details</h2>
//                 <button onClick={() => setShowDetailsModal(false)} className="text-gray-500">✕</button>
//               </div>
              
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm text-gray-500">Order ID</label>
//                     <p className="font-medium">{selectedOrder.orderId}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-500">Status</label>
//                     <p className="font-medium text-yellow-600">{selectedOrder.status}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-500">Customer Name</label>
//                     <p>{selectedOrder.user?.name}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-500">Contact</label>
//                     <p>{selectedOrder.user?.email} | {selectedOrder.user?.phone}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-500">Payment Method</label>
//                     <p>{selectedOrder.payment_method}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-500">Payment Status</label>
//                     <p>{selectedOrder.payment_status}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-sm text-gray-500">Shipping Address</label>
//                   <p className="mt-1">{selectedOrder.shipping_address}</p>
//                 </div>

//                 <div>
//                   <label className="text-sm text-gray-500 mb-2 block">Order Items</label>
//                   <div className="border rounded-lg overflow-hidden">
//                     <table className="w-full text-sm">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-4 py-2 text-left">Item</th>
//                           <th className="px-4 py-2 text-center">Quantity</th>
//                           <th className="px-4 py-2 text-right">Price</th>
//                           <th className="px-4 py-2 text-right">Total</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {selectedOrder.items.map((item, idx) => (
//                           <tr key={idx} className="border-t">
//                             <td className="px-4 py-2">{item.name}</td>
//                             <td className="px-4 py-2 text-center">{item.quantity}</td>
//                             <td className="px-4 py-2 text-right">৳{item.price.toLocaleString()}</td>
//                             <td className="px-4 py-2 text-right">৳{(item.price * item.quantity).toLocaleString()}</td>
//                           </tr>
//                         ))}
//                         <tr className="border-t bg-gray-50">
//                           <td colSpan={3} className="px-4 py-2 text-right font-semibold">Total:</td>
//                           <td className="px-4 py-2 text-right font-bold text-green-600">
//                             ৳{selectedOrder.total_amount.toLocaleString()}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <button
//                     onClick={() => {
//                       handleUpdateStatus(selectedOrder.id, 'PROCESSING');
//                       setShowDetailsModal(false);
//                     }}
//                     className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg"
//                   >
//                     Process Order
//                   </button>
//                   <button
//                     onClick={() => {
//                       toast.success('Printing invoice...');
//                     }}
//                     className="flex-1 px-4 py-2 border rounded-lg flex items-center justify-center gap-2"
//                   >
//                     <Printer className="h-4 w-4" />
//                     Print Invoice
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }