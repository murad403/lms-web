"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import ReviewCard from "@/components/reusable/ReviewCard";
import WriteReviewModal from "@/components/modal/WriteReviewModal";
import { reviews } from "@/lib/profile";

const ReviewsPage = () => {
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const handleWriteReview = (data: { rating: number; comment: string }) => {
    // TODO: API call to submit review
    console.log("New review:", data);
    setIsWriteReviewOpen(false);
  };

  const handleEditReview = async (
    reviewId: string,
    data: { rating: number; comment: string }
  ) => {
    // TODO: API call to edit review
    console.log("Edit review:", reviewId, data);
  };

  const handleDeleteReview = async (reviewId: string) => {
    // TODO: API call to delete review
    console.log("Delete review:", reviewId);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-title">Reviews</h2>
        <button
          onClick={() => setIsWriteReviewOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-main text-white rounded-lg text-sm font-semibold hover:bg-main/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Write a Review
        </button>
      </div>

      <div className="bg-white space-y-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onEdit={handleEditReview}
            onDelete={handleDeleteReview}
          />
        ))}
      </div>

      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmit={handleWriteReview}
      />
    </div>
  );
};

export default ReviewsPage;
