// lib/features/review/reviewSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { reviewApi } from './review.api';
import { Review, ReviewsState, CreateReviewInput, GetReviewsParams } from './review.types';
import toast from 'react-hot-toast';

const initialState: ReviewsState = {
  reviews: [],
  currentReview: null,
  stats: null,
  pagination: {
    total: 0,
    page: 1,
    totalPages: 0,
    limit: 20,
  },
  loading: {
    list: false,
    detail: false,
    create: false,
    update: false,
    delete: false,
    stats: false,
  },
  error: {
    list: null,
    detail: null,
    create: null,
    update: null,
    delete: null,
    stats: null,
  },
};

// ============ Async Thunks ============

// Get all reviews (Admin)
export const getAllReviews = createAsyncThunk(
  'reviews/getAllReviews',
  async (params: GetReviewsParams, { rejectWithValue }) => {
    try {
      const response = await reviewApi.getAllReviews(params);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch reviews';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Get review by ID
export const getReviewById = createAsyncThunk(
  'reviews/getReviewById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await reviewApi.getReviewById(id);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch review details';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Create a new review
export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (reviewData: CreateReviewInput, { rejectWithValue }) => {
    try {
      const response = await reviewApi.createReview(reviewData);
      if (response.success) {
        toast.success('Review submitted successfully!');
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to submit review';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Update review status (Approve/Reject)
export const updateReviewStatus = createAsyncThunk(
  'reviews/updateReviewStatus',
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await reviewApi.updateReviewStatus(id, status);
      if (response.success) {
        toast.success(`Review ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update review status';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Reply to a review
export const replyToReview = createAsyncThunk(
  'reviews/replyToReview',
  async ({ id, reply }: { id: string; reply: string }, { rejectWithValue }) => {
    try {
      const response = await reviewApi.replyToReview(id, reply);
      if (response.success) {
        toast.success('Reply posted successfully');
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to post reply';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await reviewApi.deleteReview(id);
      if (response.success) {
        toast.success('Review deleted successfully');
        return id;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete review';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Get review statistics
export const getReviewStats = createAsyncThunk(
  'reviews/getReviewStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await reviewApi.getReviewStats();
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch statistics';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Like a review
export const likeReview = createAsyncThunk(
  'reviews/likeReview',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await reviewApi.likeReview(id);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to like review';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Mark review as helpful
export const markHelpful = createAsyncThunk(
  'reviews/markHelpful',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await reviewApi.markHelpful(id);
      if (response.success) {
        toast.success('Thank you for your feedback!');
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to mark as helpful';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Report a review
export const reportReview = createAsyncThunk(
  'reviews/reportReview',
  async ({ id, reason }: { id: string; reason: string }, { rejectWithValue }) => {
    try {
      const response = await reviewApi.reportReview(id, reason);
      if (response.success) {
        toast.success('Review reported successfully');
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to report review';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Feature review on product page
export const featureReview = createAsyncThunk(
  'reviews/featureReview',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await reviewApi.featureReview(id);
      if (response.success) {
        toast.success('Review featured on product page');
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to feature review';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Search reviews
export const searchReviews = createAsyncThunk(
  'reviews/searchReviews',
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const response = await reviewApi.searchReviews(searchTerm);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to search reviews';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Get reviews by product
export const getReviewsByProduct = createAsyncThunk(
  'reviews/getReviewsByProduct',
  async ({ productId, page, limit }: { productId: string; page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await reviewApi.getReviewsByProduct(productId, page, limit);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch product reviews';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Get reviews by user
export const getReviewsByUser = createAsyncThunk(
  'reviews/getReviewsByUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await reviewApi.getReviewsByUser(userId);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch user reviews';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ============ Slice ============

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearCurrentReview: (state) => {
      state.currentReview = null;
      state.error.detail = null;
    },
    clearReviews: (state) => {
      state.reviews = [];
      state.pagination = initialState.pagination;
    },
    clearErrors: (state) => {
      state.error = initialState.error;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
    updateReviewLocally: (state, action: PayloadAction<Review>) => {
      const index = state.reviews.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
      if (state.currentReview?.id === action.payload.id) {
        state.currentReview = action.payload;
      }
    },
    addReplyLocally: (state, action: PayloadAction<{ id: string; reply: any }>) => {
      const review = state.reviews.find(r => r.id === action.payload.id);
      if (review) {
        review.replies.push(action.payload.reply);
      }
      if (state.currentReview?.id === action.payload.id) {
        state.currentReview.replies.push(action.payload.reply);
      }
    },
  },
  extraReducers: (builder) => {
    // ===== Get All Reviews =====
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.loading.list = true;
        state.error.list = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading.list = false;
        state.reviews = action.payload.reviews;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          limit: action.payload.limit,
        };
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading.list = false;
        state.error.list = action.payload as string;
      });

    // ===== Get Review By ID =====
    builder
      .addCase(getReviewById.pending, (state) => {
        state.loading.detail = true;
        state.error.detail = null;
      })
      .addCase(getReviewById.fulfilled, (state, action) => {
        state.loading.detail = false;
        state.currentReview = action.payload;
      })
      .addCase(getReviewById.rejected, (state, action) => {
        state.loading.detail = false;
        state.error.detail = action.payload as string;
      });

    // ===== Create Review =====
    builder
      .addCase(createReview.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading.create = false;
        state.reviews.unshift(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload as string;
      });

    // ===== Update Review Status =====
    builder
      .addCase(updateReviewStatus.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateReviewStatus.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.reviews.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
        if (state.currentReview?.id === action.payload.id) {
          state.currentReview = action.payload;
        }
      })
      .addCase(updateReviewStatus.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload as string;
      });

    // ===== Reply to Review =====
    builder
      .addCase(replyToReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
        if (state.currentReview?.id === action.payload.id) {
          state.currentReview = action.payload;
        }
      });

    // ===== Delete Review =====
    builder
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(r => r.id !== action.payload);
        if (state.currentReview?.id === action.payload) {
          state.currentReview = null;
        }
      });

    // ===== Get Review Stats =====
    builder
      .addCase(getReviewStats.pending, (state) => {
        state.loading.stats = true;
        state.error.stats = null;
      })
      .addCase(getReviewStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.stats = action.payload;
      })
      .addCase(getReviewStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error.stats = action.payload as string;
      });

    // ===== Like Review =====
    builder
      .addCase(likeReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
        if (state.currentReview?.id === action.payload.id) {
          state.currentReview = action.payload;
        }
      });

    // ===== Mark Helpful =====
    builder
      .addCase(markHelpful.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
        if (state.currentReview?.id === action.payload.id) {
          state.currentReview = action.payload;
        }
      });

    // ===== Search Reviews =====
    builder
      .addCase(searchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });

    // ===== Get Reviews by Product =====
    builder
      .addCase(getReviewsByProduct.fulfilled, (state, action) => {
        state.reviews = action.payload.reviews;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          limit: action.payload.limit,
        };
      });

    // ===== Get Reviews by User =====
    builder
      .addCase(getReviewsByUser.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  },
});

export const { 
  clearCurrentReview, 
  clearReviews, 
  clearErrors,
  setPage,
  setLimit,
  updateReviewLocally,
  addReplyLocally
} = reviewSlice.actions;

export default reviewSlice.reducer;