"use client";
import ReviewCard from "@/components/card/ReviewCard";
import Pagination from "@/components/reusable/Pagination";
import { useDeleteReviewMutation, useEditReviewMutation, useReviewListQuery } from "@/redux/features/student/student.api";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

const ReviewsPage = () => {
  const t = useTranslations("ReviewsPage");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useReviewListQuery({ page: currentPage });
  const [editReview] = useEditReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();


  const handleEditReview = async (
    reviewId: string,
    data: { rating: number; comment: string }
  ) => {
    try {
      const response = await editReview({ id: Number(reviewId), rating: data.rating, comment: data.comment }).unwrap();
      toast.success(response.message || "Review updated successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update review.";
      toast.error(message);
      throw error;
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const response = await deleteReview(Number(reviewId)).unwrap();
      toast.success(response.message || "Review deleted successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete review.";
      toast.error(message);
      throw error;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-title">{t("title")}</h2>
      </div>

      <div className="bg-white space-y-4">
        {isLoading ? null : (data?.data ?? []).map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onEdit={handleEditReview}
            onDelete={handleDeleteReview}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={data?.total_pages || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ReviewsPage;
