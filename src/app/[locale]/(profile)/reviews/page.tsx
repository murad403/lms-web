"use client";
import ReviewCard from "@/components/card/ReviewCard";
import { reviews } from "@/lib/profile";
import { useTranslations } from "next-intl";

const ReviewsPage = () => {
  const t = useTranslations("ReviewsPage");


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
        <h2 className="text-lg sm:text-xl font-bold text-title">{t("title")}</h2>
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
    </div>
  );
};

export default ReviewsPage;
