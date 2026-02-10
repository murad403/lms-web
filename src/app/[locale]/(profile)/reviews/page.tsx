"use client";
import ReviewCard from "@/components/reusable/ReviewCard";
import { reviews } from "@/lib/profile";

const ReviewsPage = () => {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold text-title mb-6">Reviews</h2>

      <div className="bg-white space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
