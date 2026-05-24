'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import Button from './Button';
import styles from './seeds.module.css';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful?: number;
  images?: string[];
}

interface ReviewSectionProps {
  reviews: Review[];
  productId: string;
  onReviewSubmit?: (review: Omit<Review, 'id' | 'date'>) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  reviews, 
  productId, 
  onReviewSubmit 
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  
  const { user } = useSelector((state: RootState) => state.auth || { user: null });

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => Math.floor(review.rating) === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(review => Math.floor(review.rating) === rating).length / reviews.length) * 100 
      : 0
  }));

  // Sort reviews
  const getSortedReviews = () => {
    const sorted = [...reviews];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'highest':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted;
    }
  };

  const handleSubmitReview = async () => {
    if (!newReview.comment.trim()) {
      alert('Please write a review comment');
      return;
    }

    setSubmitting(true);
    try {
      // Here you would typically make an API call to submit the review
      const reviewData = {
        productId,
        rating: newReview.rating,
        comment: newReview.comment,
        userName: newReview.userName || user?.name || 'Anonymous',
        userId: user?.id || 'guest',
      };

      // Call the onSubmit callback if provided
      if (onReviewSubmit) {
        await onReviewSubmit(reviewData);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Review submitted:', reviewData);
      }

      // Reset form
      setNewReview({ rating: 5, comment: '', userName: '' });
      setShowReviewForm(false);
      alert('Thank you for your review!');
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleHelpfulClick = async (reviewId: string) => {
    // Implement helpful vote functionality
    console.log('Marked as helpful:', reviewId);
  };

  const sortedReviews = getSortedReviews();

  return (
    <div className={styles.reviewSection}>
      {/* Rating Summary */}
      <div className={styles.ratingSummary}>
        <div className={styles.ratingSummaryLeft}>
          <div className={styles.averageRating}>
            <span className={styles.ratingNumber}>{averageRating.toFixed(1)}</span>
            <span className={styles.ratingOutOf}>/5</span>
          </div>
          <div className={styles.starsLarge}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(averageRating) ? styles.starFilled : styles.starEmpty}>
                ★
              </span>
            ))}
          </div>
          <div className={styles.totalReviews}>
            Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className={styles.ratingSummaryRight}>
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className={styles.ratingBar}>
              <div className={styles.ratingLabel}>{rating} ★</div>
              <div className={styles.barContainer}>
                <div className={styles.bar} style={{ width: `${percentage}%` }} />
              </div>
              <div className={styles.ratingCount}>{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      <div className={styles.reviewHeader}>
        <h3 className={styles.reviewTitle}>Customer Reviews</h3>
        {user && !showReviewForm && (
          <Button 
            onClick={() => setShowReviewForm(true)} 
            variant="primary"
            size="medium"
          >
            Write a Review
          </Button>
        )}
      </div>

      {/* Sort Dropdown */}
      {reviews.length > 0 && (
        <div className={styles.sortSection}>
          <label htmlFor="sort" className={styles.sortLabel}>Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className={styles.sortSelect}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div className={styles.reviewForm}>
          <h4 className={styles.formTitle}>Write Your Review</h4>
          
          {!user && (
            <div className={styles.formField}>
              <label htmlFor="userName">Name (optional)</label>
              <input
                type="text"
                id="userName"
                value={newReview.userName}
                onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                placeholder="Enter your name"
                className={styles.formInput}
              />
            </div>
          )}

          <div className={styles.formField}>
            <label>Rating</label>
            <div className={styles.ratingInput}>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating })}
                  className={`${styles.ratingStar} ${newReview.rating >= rating ? styles.selected : ''}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formField}>
            <label htmlFor="comment">Review *</label>
            <textarea
              id="comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Share your experience with this product..."
              rows={5}
              className={styles.formTextarea}
              required
            />
          </div>

          <div className={styles.formActions}>
            <Button 
              onClick={() => setShowReviewForm(false)} 
              variant="secondary"
              size="medium"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitReview} 
              variant="primary"
              size="medium"
              disabled={submitting || !newReview.comment.trim()}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {sortedReviews.length > 0 ? (
        <div className={styles.reviewsList}>
          {sortedReviews.map((review) => (
            <div key={review.id} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerInfo}>
                  <div className={styles.reviewerName}>
                    <strong>{review.userName}</strong>
                    {review.userId === user?.id && (
                      <span className={styles.verifiedBadge}>Verified Buyer</span>
                    )}
                  </div>
                  <div className={styles.reviewStars}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? styles.starFilled : styles.starEmpty}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.reviewDate}>
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <p className={styles.reviewComment}>{review.comment}</p>

              {review.images && review.images.length > 0 && (
                <div className={styles.reviewImages}>
                  {review.images.map((image, idx) => (
                    <img key={idx} src={image} alt={`Review ${idx + 1}`} className={styles.reviewImage} />
                  ))}
                </div>
              )}

              <div className={styles.reviewFooter}>
                <button 
                  onClick={() => handleHelpfulClick(review.id)}
                  className={styles.helpfulButton}
                >
                  👍 Helpful ({review.helpful || 0})
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !showReviewForm && (
          <div className={styles.noReviews}>
            <div className={styles.noReviewsIcon}>📝</div>
            <p className={styles.noReviewsText}>No reviews yet</p>
            <p className={styles.noReviewsSubtext}>
              Be the first to share your thoughts about this product!
            </p>
            {user && (
              <Button 
                onClick={() => setShowReviewForm(true)} 
                variant="primary"
                size="medium"
              >
                Write a Review
              </Button>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ReviewSection;