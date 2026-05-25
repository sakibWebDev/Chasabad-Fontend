// lib/features/review/review.api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const reviewApi = {
  // Get all reviews with filters
  getAllReviews: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    rating?: number;
    productId?: string;
    search?: string;
  }) => {
    const response = await axios.get(`${API_URL}/reviews`, { params });
    return response.data;
  },

  // Get review by ID
  getReviewById: async (id: string) => {
    const response = await axios.get(`${API_URL}/reviews/${id}`);
    return response.data;
  },

  // Create a new review
  createReview: async (data: {
    productId: string;
    rating: number;
    title: string;
    content: string;
    images?: string[];
    tags?: string[];
  }) => {
    const response = await axios.post(`${API_URL}/reviews`, data);
    return response.data;
  },

  // Update review status (approve/reject)
  updateReviewStatus: async (id: string, status: string) => {
    const response = await axios.patch(`${API_URL}/reviews/${id}/status`, { status });
    return response.data;
  },

  // Reply to a review
  replyToReview: async (id: string, reply: string) => {
    const response = await axios.post(`${API_URL}/reviews/${id}/reply`, { reply });
    return response.data;
  },

  // Delete a review
  deleteReview: async (id: string) => {
    const response = await axios.delete(`${API_URL}/reviews/${id}`);
    return response.data;
  },

  // Get review statistics
  getReviewStats: async () => {
    const response = await axios.get(`${API_URL}/reviews/stats`);
    return response.data;
  },

  // Like/Unlike a review
  likeReview: async (id: string) => {
    const response = await axios.post(`${API_URL}/reviews/${id}/like`);
    return response.data;
  },

  // Mark review as helpful
  markHelpful: async (id: string) => {
    const response = await axios.post(`${API_URL}/reviews/${id}/helpful`);
    return response.data;
  },

  // Report a review
  reportReview: async (id: string, reason: string) => {
    const response = await axios.post(`${API_URL}/reviews/${id}/report`, { reason });
    return response.data;
  },

  // Feature review on product page
  featureReview: async (id: string) => {
    const response = await axios.post(`${API_URL}/reviews/${id}/feature`);
    return response.data;
  },

  // Search reviews
  searchReviews: async (searchTerm: string) => {
    const response = await axios.get(`${API_URL}/reviews/search`, { params: { q: searchTerm } });
    return response.data;
  },

  // Get reviews by product
  getReviewsByProduct: async (productId: string, page?: number, limit?: number) => {
    const response = await axios.get(`${API_URL}/reviews/product/${productId}`, { params: { page, limit } });
    return response.data;
  },

  // Get reviews by user
  getReviewsByUser: async (userId: string) => {
    const response = await axios.get(`${API_URL}/reviews/user/${userId}`);
    return response.data;
  }
};