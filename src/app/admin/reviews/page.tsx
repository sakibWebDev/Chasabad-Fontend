// // app/admin/reviews/page.tsx
// 'use client';

// import { useState } from 'react';
// import {
//   Star,
//   Search,
//   Filter,
//   Download,
//   ThumbsUp,
//   ThumbsDown,
//   MessageSquare,
//   User,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   Flag,
//   Reply,
//   MoreVertical,
//   Eye,
//   Trash2,
//   StarHalf,
//   TrendingUp,
//   Award,
//   Clock,
//   ChevronDown,
//   Ban,
//   Check,
//   Mail,
//   Phone,
//   MapPin
// } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';
// import toast from 'react-hot-toast';

// export default function ReviewsPage() {
//   const [view, setView] = useState('list');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterRating, setFilterRating] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [showReplyModal, setShowReplyModal] = useState(false);

//   const reviews = [
//     {
//       id: 1,
//       product: {
//         id: 101,
//         name: 'Organic Tomato Seeds',
//         image: '/products/tomato.jpg',
//         category: 'Vegetables'
//       },
//       customer: {
//         id: 1001,
//         name: 'Md. Karim Uddin',
//         email: 'karim@example.com',
//         phone: '+8801712345678',
//         location: 'Rajshahi',
//         avatar: '/avatars/karim.jpg',
//         memberSince: '2023-01-15',
//         totalReviews: 12
//       },
//       rating: 5,
//       title: 'Excellent quality seeds!',
//       content: 'These tomato seeds germinated quickly and produced healthy plants. The fruits are large and very tasty. Highly recommended for organic farming. Will definitely buy again.',
//       date: '2024-01-15T10:30:00',
//       likes: 45,
//       dislikes: 2,
//       status: 'approved',
//       verified: true,
//       helpful: 32,
//       reported: false,
//       images: ['/review1.jpg', '/review2.jpg'],
//       replies: [
//         {
//           id: 1,
//           author: 'Admin',
//           content: 'Thank you for your wonderful feedback! We\'re glad you\'re happy with the seeds.',
//           date: '2024-01-16T09:00:00'
//         }
//       ],
//       tags: ['organic', 'high-yield', 'recommended']
//     },
//     {
//       id: 2,
//       product: {
//         id: 102,
//         name: 'Sweet Basil Seeds',
//         image: '/products/basil.jpg',
//         category: 'Herbs'
//       },
//       customer: {
//         id: 1002,
//         name: 'Fatema Begum',
//         email: 'fatema@example.com',
//         phone: '+8801987654321',
//         location: 'Jessore',
//         avatar: '/avatars/fatema.jpg',
//         memberSince: '2023-03-20',
//         totalReviews: 8
//       },
//       rating: 4,
//       title: 'Good aromatic basil',
//       content: 'Good germination rate. The plants have strong aroma. Would buy again. Slightly slower growth than expected but overall good quality.',
//       date: '2024-01-10T14:20:00',
//       likes: 28,
//       dislikes: 1,
//       status: 'approved',
//       verified: true,
//       helpful: 24,
//       reported: false,
//       images: [],
//       replies: [],
//       tags: ['aromatic', 'good-quality']
//     },
//     {
//       id: 3,
//       product: {
//         id: 103,
//         name: 'Sunflower Seeds',
//         image: '/products/sunflower.jpg',
//         category: 'Flowers'
//       },
//       customer: {
//         id: 1003,
//         name: 'Abdul Halim',
//         email: 'abdul@example.com',
//         phone: '+8801756789234',
//         location: 'Bogra',
//         avatar: '/avatars/abdul.jpg',
//         memberSince: '2023-06-10',
//         totalReviews: 5
//       },
//       rating: 3,
//       title: 'Average germination rate',
//       content: 'Only about 70% of seeds germinated. Plants are healthy but expected more. Might try a different variety next time.',
//       date: '2024-01-05T11:45:00',
//       likes: 12,
//       dislikes: 5,
//       status: 'pending',
//       verified: false,
//       helpful: 8,
//       reported: false,
//       images: [],
//       replies: [],
//       tags: ['average']
//     },
//     {
//       id: 4,
//       product: {
//         id: 104,
//         name: 'Mango Seeds',
//         image: '/products/mango.jpg',
//         category: 'Fruits'
//       },
//       customer: {
//         id: 1004,
//         name: 'Nurul Amin',
//         email: 'nurul@example.com',
//         phone: '+8801678945321',
//         location: 'Comilla',
//         avatar: '/avatars/nurul.jpg',
//         memberSince: '2022-11-05',
//         totalReviews: 15
//       },
//       rating: 5,
//       title: 'Best mango variety',
//       content: 'The seeds produced amazing mango trees. Fruits are sweet and juicy. Excellent quality seeds. Already recommended to other farmers.',
//       date: '2024-01-02T16:15:00',
//       likes: 67,
//       dislikes: 0,
//       status: 'approved',
//       verified: true,
//       helpful: 45,
//       reported: false,
//       images: ['/mango1.jpg', '/mango2.jpg', '/mango3.jpg'],
//       replies: [
//         {
//           id: 1,
//           author: 'Admin',
//           content: 'Thank you for sharing your experience! We\'re thrilled to hear about your success.',
//           date: '2024-01-03T10:30:00'
//         }
//       ],
//       tags: ['sweet', 'highly-recommended', 'best-seller']
//     },
//     {
//       id: 5,
//       product: {
//         id: 105,
//         name: 'Wheat Seeds',
//         image: '/products/wheat.jpg',
//         category: 'Grains'
//       },
//       customer: {
//         id: 1005,
//         name: 'Rafiqul Islam',
//         email: 'rafiq@example.com',
//         phone: '+8801912345678',
//         location: 'Dinajpur',
//         avatar: '/avatars/rafiq.jpg',
//         memberSince: '2023-08-15',
//         totalReviews: 3
//       },
//       rating: 2,
//       title: 'Disappointing quality',
//       content: 'Poor germination rate and weak plants. Not worth the price. Expected much better quality from this brand.',
//       date: '2024-01-12T09:30:00',
//       likes: 8,
//       dislikes: 15,
//       status: 'flagged',
//       verified: false,
//       helpful: 3,
//       reported: true,
//       images: [],
//       replies: [],
//       tags: ['poor-quality']
//     }
//   ];

//   const stats = {
//     total: reviews.length,
//     averageRating: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1),
//     approved: reviews.filter(r => r.status === 'approved').length,
//     pending: reviews.filter(r => r.status === 'pending').length,
//     flagged: reviews.filter(r => r.status === 'flagged').length,
//     fiveStar: reviews.filter(r => r.rating === 5).length,
//     fourStar: reviews.filter(r => r.rating === 4).length,
//     threeStar: reviews.filter(r => r.rating === 3).length,
//     twoStar: reviews.filter(r => r.rating === 2).length,
//     oneStar: reviews.filter(r => r.rating === 1).length,
//     verified: reviews.filter(r => r.verified).length,
//     totalLikes: reviews.reduce((acc, r) => acc + r.likes, 0),
//     totalHelpful: reviews.reduce((acc, r) => acc + r.helpful, 0)
//   };

//   const ratingDistribution = [
//     { stars: 5, count: stats.fiveStar, percentage: (stats.fiveStar / stats.total) * 100 },
//     { stars: 4, count: stats.fourStar, percentage: (stats.fourStar / stats.total) * 100 },
//     { stars: 3, count: stats.threeStar, percentage: (stats.threeStar / stats.total) * 100 },
//     { stars: 2, count: stats.twoStar, percentage: (stats.twoStar / stats.total) * 100 },
//     { stars: 1, count: stats.oneStar, percentage: (stats.oneStar / stats.total) * 100 }
//   ];

//   const filteredReviews = reviews.filter(review => {
//     const matchesSearch = searchTerm === '' || 
//       review.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       review.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       review.title.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesRating = filterRating === 'all' || review.rating === parseInt(filterRating);
//     const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    
//     return matchesSearch && matchesRating && matchesStatus;
//   });

//   const renderStars = (rating: number) => {
//     return (
//       <div className="flex items-center gap-0.5">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
//           />
//         ))}
//       </div>
//     );
//   };

//   const getStatusBadge = (status: string) => {
//     const badges = {
//       approved: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
//       pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
//       flagged: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
//     };
//     const icons = {
//       approved: <CheckCircle className="h-3 w-3" />,
//       pending: <Clock className="h-3 w-3" />,
//       flagged: <Flag className="h-3 w-3" />
//     };
//     return (
//       <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${badges[status as keyof typeof badges]}`}>
//         {icons[status as keyof typeof icons]}
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </span>
//     );
//   };

//   const handleApprove = (id: number) => {
//     toast.success('Review approved successfully');
//     // API call here
//   };

//   const handleReject = (id: number) => {
//     toast.success('Review rejected');
//     // API call here
//   };

//   const handleDelete = (id: number) => {
//     if (confirm('Are you sure you want to delete this review?')) {
//       toast.success('Review deleted successfully');
//       // API call here
//     }
//   };

//   const handleReply = (review: any) => {
//     setSelectedReview(review);
//     setShowReplyModal(true);
//   };

//   const handleFeature = (id: number) => {
//     toast.success('Review featured on product page');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//                 <Link href="/admin" className="hover:text-amber-600">Dashboard</Link>
//                 <span>/</span>
//                 <span className="text-gray-900 dark:text-white">Reviews</span>
//               </div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
//                 Reviews Management
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400 mt-1">
//                 Manage customer reviews, ratings, and feedback
//               </p>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2">
//                 <Download className="h-4 w-4" />
//                 <span className="text-sm">Export Reviews</span>
//               </button>
//               <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
//                 <button 
//                   onClick={() => setView('list')}
//                   className={`px-3 py-1.5 rounded-lg text-sm transition-all ${view === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
//                 >
//                   List View
//                 </button>
//                 <button 
//                   onClick={() => setView('grid')}
//                   className={`px-3 py-1.5 rounded-lg text-sm transition-all ${view === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
//                 >
//                   Grid View
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {[
//             { label: 'Total Reviews', value: stats.total, icon: MessageSquare, color: 'amber', change: '+12%' },
//             { label: 'Average Rating', value: stats.averageRating, icon: Star, color: 'yellow', suffix: '★', change: '+0.3' },
//             { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'green', change: '+8%' },
//             { label: 'Pending', value: stats.pending, icon: Clock, color: 'orange', change: '-5%' }
//           ].map((stat, idx) => {
//             const Icon = stat.icon;
//             const colorClasses = {
//               amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600',
//               yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600',
//               green: 'bg-green-50 dark:bg-green-900/20 text-green-600',
//               orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'
//             };
//             return (
//               <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
//                     <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
//                       {stat.value}
//                       {stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
//                     </p>
//                     {stat.change && (
//                       <div className="flex items-center gap-1 mt-2">
//                         <span className="text-xs text-green-600 flex items-center gap-0.5">
//                           <TrendingUp className="h-3 w-3" />
//                           {stat.change}
//                         </span>
//                         <span className="text-xs text-gray-500">vs last month</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
//                     <Icon className="h-5 w-5" />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Rating Distribution */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
//           <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Rating Distribution</h3>
//           <div className="space-y-3">
//             {ratingDistribution.map((rating, i) => (
//               <div key={i}>
//                 <div className="flex items-center gap-4 mb-1">
//                   <div className="w-16 flex items-center gap-1">
//                     {renderStars(rating.stars)}
//                   </div>
//                   <div className="flex-1">
//                     <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                       <div 
//                         className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full h-2 transition-all"
//                         style={{ width: `${rating.percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                   <div className="w-20 text-right">
//                     <span className="text-sm text-gray-600 dark:text-gray-400">{rating.count} reviews</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-8">
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex-1 min-w-[200px]">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by product, customer, or title..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
//                 />
//               </div>
//             </div>
            
//             <select 
//               value={filterRating}
//               onChange={(e) => setFilterRating(e.target.value)}
//               className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
//             >
//               <option value="all">All Ratings</option>
//               <option value="5">5 Stars ★★★★★</option>
//               <option value="4">4 Stars ★★★★☆</option>
//               <option value="3">3 Stars ★★★☆☆</option>
//               <option value="2">2 Stars ★★☆☆☆</option>
//               <option value="1">1 Star ★☆☆☆☆</option>
//             </select>
            
//             <select 
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
//             >
//               <option value="all">All Status</option>
//               <option value="approved">Approved</option>
//               <option value="pending">Pending</option>
//               <option value="flagged">Flagged</option>
//             </select>
            
//             <button className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
//               <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
//             </button>
//           </div>
//         </div>

//         {/* List View */}
//         {view === 'list' && (
//           <div className="space-y-4">
//             {filteredReviews.map((review) => (
//               <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">
//                 {/* Review Header */}
//                 <div className="p-6 border-b dark:border-gray-700">
//                   <div className="flex items-start justify-between flex-wrap gap-4">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-full flex items-center justify-center">
//                         <User className="h-6 w-6 text-amber-600 dark:text-amber-400" />
//                       </div>
//                       <div>
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <h4 className="font-semibold text-gray-900 dark:text-white">{review.customer.name}</h4>
//                           {review.verified && (
//                             <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-lg flex items-center gap-1">
//                               <CheckCircle className="h-3 w-3" />
//                               Verified Purchase
//                             </span>
//                           )}
//                           {getStatusBadge(review.status)}
//                         </div>
//                         <div className="flex items-center gap-3 mt-1">
//                           {renderStars(review.rating)}
//                           <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <button 
//                         onClick={() => handleApprove(review.id)}
//                         className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
//                         title="Approve"
//                       >
//                         <Check className="h-4 w-4 text-green-600" />
//                       </button>
//                       <button 
//                         onClick={() => handleReject(review.id)}
//                         className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//                         title="Reject"
//                       >
//                         <Ban className="h-4 w-4 text-red-600" />
//                       </button>
//                       <button 
//                         onClick={() => handleDelete(review.id)}
//                         className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//                         title="Delete"
//                       >
//                         <Trash2 className="h-4 w-4 text-red-600" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Review Content */}
//                 <div className="p-6">
//                   <div className="mb-3">
//                     <h5 className="font-medium text-lg text-gray-900 dark:text-white">{review.title}</h5>
//                     <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
//                       Product: {review.product.name} ({review.product.category})
//                     </p>
//                   </div>
//                   <p className="text-gray-600 dark:text-gray-400 mb-4">{review.content}</p>
                  
//                   {/* Review Images */}
//                   {review.images.length > 0 && (
//                     <div className="flex gap-2 mb-4">
//                       {review.images.map((img, i) => (
//                         <div key={i} className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
//                           <div className="text-gray-400">Image</div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* Review Stats */}
//                   <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
//                     <button className="flex items-center gap-1 hover:text-green-600">
//                       <ThumbsUp className="h-4 w-4" />
//                       <span>{review.likes}</span>
//                     </button>
//                     <button className="flex items-center gap-1 hover:text-red-600">
//                       <ThumbsDown className="h-4 w-4" />
//                       <span>{review.dislikes}</span>
//                     </button>
//                     <span className="flex items-center gap-1">
//                       <MessageSquare className="h-4 w-4" />
//                       <span>{review.replies.length} replies</span>
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Flag className="h-4 w-4" />
//                       <span>{review.reported ? 'Reported' : 'Not reported'}</span>
//                     </span>
//                   </div>

//                   {/* Tags */}
//                   {review.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mt-4">
//                       {review.tags.map((tag, i) => (
//                         <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs text-gray-600 dark:text-gray-400">
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {/* Replies */}
//                   {review.replies.length > 0 && (
//                     <div className="mt-4 pl-4 border-l-2 border-amber-200 dark:border-amber-800">
//                       {review.replies.map((reply) => (
//                         <div key={reply.id} className="text-sm">
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className="font-medium text-gray-900 dark:text-white">{reply.author}</span>
//                             <span className="text-xs text-gray-500">{new Date(reply.date).toLocaleDateString()}</span>
//                           </div>
//                           <p className="text-gray-600 dark:text-gray-400">{reply.content}</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* Action Buttons */}
//                   <div className="flex gap-3 mt-4 pt-4 border-t dark:border-gray-700">
//                     <button 
//                       onClick={() => handleReply(review)}
//                       className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
//                     >
//                       <Reply className="h-4 w-4" />
//                       Reply to Review
//                     </button>
//                     <button 
//                       onClick={() => handleFeature(review.id)}
//                       className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                     >
//                       Feature on Product
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Grid View */}
//         {view === 'grid' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredReviews.map((review) => (
//               <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
//                 <div className="p-5">
//                   {/* Rating and Status */}
//                   <div className="flex items-center justify-between mb-3">
//                     {renderStars(review.rating)}
//                     {getStatusBadge(review.status)}
//                   </div>
                  
//                   {/* Title */}
//                   <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
//                     {review.title}
//                   </h3>
                  
//                   {/* Content Preview */}
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
//                     {review.content}
//                   </p>
                  
//                   {/* Product Info */}
//                   <div className="mb-3">
//                     <p className="text-xs text-amber-600 dark:text-amber-400">
//                       {review.product.name}
//                     </p>
//                   </div>
                  
//                   {/* Customer Info */}
//                   <div className="flex items-center gap-2 mb-3">
//                     <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
//                       <User className="h-4 w-4 text-gray-500" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-900 dark:text-white">{review.customer.name}</p>
//                       <p className="text-xs text-gray-500">{review.customer.location}</p>
//                     </div>
//                   </div>
                  
//                   {/* Stats */}
//                   <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
//                     <span className="flex items-center gap-1">
//                       <ThumbsUp className="h-3 w-3" />
//                       {review.likes}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <MessageSquare className="h-3 w-3" />
//                       {review.replies.length}
//                     </span>
//                     <span>{new Date(review.date).toLocaleDateString()}</span>
//                   </div>
                  
//                   {/* Actions */}
//                   <div className="flex gap-2 pt-3 border-t dark:border-gray-700">
//                     <button 
//                       onClick={() => handleApprove(review.id)}
//                       className="flex-1 px-2 py-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
//                     >
//                       Approve
//                     </button>
//                     <button 
//                       onClick={() => handleReply(review)}
//                       className="flex-1 px-2 py-1 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
//                     >
//                       Reply
//                     </button>
//                     <button 
//                       onClick={() => handleDelete(review.id)}
//                       className="px-2 py-1 text-xs bg-red-50 dark:bg-red-900/20 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Reply Modal */}
//         {showReplyModal && selectedReview && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">Reply to Review</h2>
//                 <button
//                   onClick={() => setShowReplyModal(false)}
//                   className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
//                 >
//                   <XCircle className="h-5 w-5" />
//                 </button>
//               </div>
              
//               <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Review by {selectedReview.customer.name}:</p>
//                 <p className="text-gray-900 dark:text-white">`{selectedReview.content.substring(0, 100)}...`</p>
//               </div>
              
//               <textarea
//                 rows={4}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
//                 placeholder="Write your reply here..."
//               />
              
//               <div className="flex gap-3 mt-4">
//                 <button
//                   onClick={() => {
//                     toast.success('Reply posted successfully');
//                     setShowReplyModal(false);
//                   }}
//                   className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
//                 >
//                   Post Reply
//                 </button>
//                 <button
//                   onClick={() => setShowReplyModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {filteredReviews.length === 0 && (
//           <div className="text-center py-12">
//             <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">No reviews found</h3>
//             <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }