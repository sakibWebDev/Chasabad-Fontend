// lib/features/review/review.types.ts
export interface Review {
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

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  approvedReviews: number;
  pendingReviews: number;
  flaggedReviews: number;
  verifiedReviews: number;
  totalLikes: number;
  totalHelpful: number;
}

export interface ReviewsState {
  reviews: Review[];
  currentReview: Review | null;
  stats: ReviewStats | null;
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
  loading: {
    list: boolean;
    detail: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    stats: boolean;
  };
  error: {
    list: string | null;
    detail: string | null;
    create: string | null;
    update: string | null;
    delete: string | null;
    stats: string | null;
  };
}

export interface CreateReviewInput {
  productId: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  tags?: string[];
}

export interface UpdateReviewInput {
  id: string;
  status?: 'approved' | 'pending' | 'flagged';
  reply?: string;
}

export interface GetReviewsParams {
  page?: number;
  limit?: number;
  status?: string;
  rating?: number;
  productId?: string;
  search?: string;
}