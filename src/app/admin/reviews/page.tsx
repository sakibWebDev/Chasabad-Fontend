// app/admin/reviews/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Star,
  Search,
  Filter,
  Download,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  User,
  CheckCircle,
  XCircle,
  Flag,
  Reply,
  Trash2,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight,
  Ban,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { 
  getAllReviews, 
  updateReviewStatus, 
  deleteReview, 
  getReviewStats,
  replyToReview 
} from '@/lib/features/review/reviewSlice';

interface Review {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    image?: string;
    category: string;
  };
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  rating: number;
  title: string;
  content: string;
  status: 'approved' | 'pending' | 'flagged';
  verified: boolean;
  likes: number;
  dislikes: number;
  helpful: number;
  reported: boolean;
  images: string[];
  replies: {
    id: string;
    author: string;
    content: string;
    date: string;
  }[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ReviewsPage() {
  const dispatch = useAppDispatch();
  const { reviews, stats, pagination, loading } = useAppSelector((state) => state.review);
  
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch reviews from API
    dispatch(getAllReviews({ 
      page: currentPage, 
      limit: itemsPerPage,
      status: filterStatus !== 'all' ? filterStatus : undefined,
      rating: filterRating !== 'all' ? parseInt(filterRating) : undefined
    }));
    dispatch(getReviewStats());
  }, [dispatch, currentPage, itemsPerPage, filterStatus, filterRating]);

  // Filter reviews based on search term (client-side)
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = searchTerm === '' || 
      review.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Pagination for filtered results
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  const statsData = {
    total: stats?.totalReviews || 0,
    averageRating: stats?.averageRating || 0,
    approved: stats?.approvedReviews || 0,
    pending: stats?.pendingReviews || 0,
    flagged: stats?.flaggedReviews || 0,
    fiveStar: reviews.filter(r => r.rating === 5).length,
    fourStar: reviews.filter(r => r.rating === 4).length,
    threeStar: reviews.filter(r => r.rating === 3).length,
    twoStar: reviews.filter(r => r.rating === 2).length,
    oneStar: reviews.filter(r => r.rating === 1).length,
    verified: stats?.verifiedReviews || 0,
    totalLikes: reviews.reduce((acc, r) => acc + (r.likes || 0), 0),
    totalHelpful: reviews.reduce((acc, r) => acc + (r.helpful || 0), 0)
  };

  const ratingDistribution = [
    { stars: 5, count: statsData.fiveStar, percentage: statsData.total > 0 ? (statsData.fiveStar / statsData.total) * 100 : 0 },
    { stars: 4, count: statsData.fourStar, percentage: statsData.total > 0 ? (statsData.fourStar / statsData.total) * 100 : 0 },
    { stars: 3, count: statsData.threeStar, percentage: statsData.total > 0 ? (statsData.threeStar / statsData.total) * 100 : 0 },
    { stars: 2, count: statsData.twoStar, percentage: statsData.total > 0 ? (statsData.twoStar / statsData.total) * 100 : 0 },
    { stars: 1, count: statsData.oneStar, percentage: statsData.total > 0 ? (statsData.oneStar / statsData.total) * 100 : 0 }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      approved: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      flagged: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    };
    const icons = {
      approved: <CheckCircle className="h-3 w-3" />,
      pending: <Clock className="h-3 w-3" />,
      flagged: <Flag className="h-3 w-3" />
    };
    return (
      <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${badges[status as keyof typeof badges]}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleApprove = async (id: string) => {
    const result = await dispatch(updateReviewStatus({ id, status: 'approved' }));
    if (updateReviewStatus.fulfilled.match(result)) {
      toast.success('Review approved successfully');
      dispatch(getAllReviews({ page: currentPage, limit: itemsPerPage }));
    }
  };

  const handleReject = async (id: string) => {
    const result = await dispatch(updateReviewStatus({ id, status: 'flagged' }));
    if (updateReviewStatus.fulfilled.match(result)) {
      toast.success('Review rejected');
      dispatch(getAllReviews({ page: currentPage, limit: itemsPerPage }));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      const result = await dispatch(deleteReview(id));
      if (deleteReview.fulfilled.match(result)) {
        toast.success('Review deleted successfully');
        dispatch(getAllReviews({ page: currentPage, limit: itemsPerPage }));
      }
    }
  };

  const handleReply = (review: Review) => {
    setSelectedReview(review);
    setReplyContent('');
    setShowReplyModal(true);
  };

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) {
      toast.error('Please enter a reply');
      return;
    }
    
    if (selectedReview) {
      const result = await dispatch(replyToReview({ 
        id: selectedReview.id, 
        reply: replyContent 
      }));
      if (replyToReview.fulfilled.match(result)) {
        toast.success('Reply posted successfully');
        setShowReplyModal(false);
        setReplyContent('');
        dispatch(getAllReviews({ page: currentPage, limit: itemsPerPage }));
      }
    }
  };

  const handleFeature = (id: string) => {
    toast.success('Review featured on product page');
    // API call to feature review would go here
  };

  const exportToCSV = () => {
    const headers = ['Product', 'Customer', 'Rating', 'Title', 'Content', 'Status', 'Date', 'Likes', 'Helpful'];
    const csvData = filteredReviews.map(review => [
      review.product.name,
      review.user.name,
      review.rating,
      review.title,
      review.content,
      review.status,
      new Date(review.createdAt).toLocaleDateString(),
      review.likes,
      review.helpful
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reviews_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Reviews exported successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Link href="/admin" className="hover:text-amber-600">Dashboard</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white">Reviews</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Reviews Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage customer reviews, ratings, and feedback
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={exportToCSV}
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span className="text-sm">Export Reviews</span>
              </button>
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button 
                  onClick={() => setView('list')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${view === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                >
                  List View
                </button>
                <button 
                  onClick={() => setView('grid')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${view === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                >
                  Grid View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Reviews', value: statsData.total, icon: MessageSquare, color: 'amber', change: '+12%' },
            { label: 'Average Rating', value: statsData.averageRating.toFixed(1), icon: Star, color: 'yellow', suffix: '★', change: '+0.3' },
            { label: 'Approved', value: statsData.approved, icon: CheckCircle, color: 'green', change: '+8%' },
            { label: 'Pending', value: statsData.pending, icon: Clock, color: 'orange', change: '-5%' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const colorClasses = {
              amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600',
              yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600',
              green: 'bg-green-50 dark:bg-green-900/20 text-green-600',
              orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'
            };
            return (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                      {stat.value}
                      {stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
                    </p>
                    {stat.change && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs text-green-600 flex items-center gap-0.5">
                          <TrendingUp className="h-3 w-3" />
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-500">vs last month</span>
                      </div>
                    )}
                  </div>
                  <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rating Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Rating Distribution</h3>
          <div className="space-y-3">
            {ratingDistribution.map((rating, i) => (
              <div key={i}>
                <div className="flex items-center gap-4 mb-1">
                  <div className="w-16 flex items-center gap-1">
                    {renderStars(rating.stars)}
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full h-2 transition-all"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{rating.count} reviews</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by product, customer, or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <select 
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars ★★★★★</option>
              <option value="4">4 Stars ★★★★☆</option>
              <option value="3">3 Stars ★★★☆☆</option>
              <option value="2">2 Stars ★★☆☆☆</option>
              <option value="1">1 Star ★☆☆☆☆</option>
            </select>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
            </select>
            
            <button className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading.list && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        )}

        {/* List View */}
        {!loading.list && view === 'list' && (
          <div className="space-y-4">
            {paginatedReviews.map((review) => (
              <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                {/* Review Header */}
                <div className="p-6 border-b dark:border-gray-700">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{review.user.name}</h4>
                          {review.verified && (
                            <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-lg flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Verified Purchase
                            </span>
                          )}
                          {getStatusBadge(review.status)}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {review.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(review.id)}
                            className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </button>
                          <button 
                            onClick={() => handleReject(review.id)}
                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <Ban className="h-4 w-4 text-red-600" />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleDelete(review.id)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h5 className="font-medium text-lg text-gray-900 dark:text-white">{review.title}</h5>
                    <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                      Product: {review.product.name}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{review.content}</p>
                  
                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.map((img, i) => (
                        <div key={i} className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <div className="text-gray-400">Image</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Review Stats */}
                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{review.likes || 0}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsDown className="h-4 w-4" />
                      <span>{review.dislikes || 0}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{review.replies?.length || 0} replies</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Flag className="h-4 w-4" />
                      <span>{review.reported ? 'Reported' : 'Not reported'}</span>
                    </span>
                  </div>

                  {/* Tags */}
                  {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {review.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Replies */}
                  {review.replies && review.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-amber-200 dark:border-amber-800">
                      {review.replies.map((reply) => (
                        <div key={reply.id} className="text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 dark:text-white">{reply.author}</span>
                            <span className="text-xs text-gray-500">{new Date(reply.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4 pt-4 border-t dark:border-gray-700">
                    <button 
                      onClick={() => handleReply(review)}
                      className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
                    >
                      <Reply className="h-4 w-4" />
                      Reply to Review
                    </button>
                    <button 
                      onClick={() => handleFeature(review.id)}
                      className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Feature on Product
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid View */}
        {!loading.list && view === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedReviews.map((review) => (
              <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
                <div className="p-5">
                  {/* Rating and Status */}
                  <div className="flex items-center justify-between mb-3">
                    {renderStars(review.rating)}
                    {getStatusBadge(review.status)}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {review.title}
                  </h3>
                  
                  {/* Content Preview */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                    {review.content}
                  </p>
                  
                  {/* Product Info */}
                  <div className="mb-3">
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      {review.product.name}
                    </p>
                  </div>
                  
                  {/* Customer Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{review.user.name}</p>
                      <p className="text-xs text-gray-500">{review.user.email}</p>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {review.likes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {review.replies?.length || 0}
                    </span>
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t dark:border-gray-700">
                    {review.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleApprove(review.id)}
                          className="flex-1 px-2 py-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleReply(review)}
                          className="flex-1 px-2 py-1 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
                        >
                          Reply
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => handleDelete(review.id)}
                      className="px-2 py-1 text-xs bg-red-50 dark:bg-red-900/20 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading.list && filteredReviews.length > 0 && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Reply Modal */}
        {showReplyModal && selectedReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Reply to Review</h2>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Review by {selectedReview.user.name}:</p>
                <p className="text-gray-900 dark:text-white">{selectedReview.content.substring(0, 100)}...</p>
              </div>
              
              <textarea
                rows={4}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Write your reply here..."
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSubmitReply}
                  className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Post Reply
                </button>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading.list && filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">No reviews found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}