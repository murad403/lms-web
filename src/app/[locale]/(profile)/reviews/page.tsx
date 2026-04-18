"use client";
import ReviewCard from "@/components/card/ReviewCard";
import Pagination from "@/components/reusable/Pagination";
import { useDeleteReviewMutation, useEditReviewMutation, useReviewListQuery } from "@/redux/features/student/student.api";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

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
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="py-5 border border-border-light p-4 rounded-md">
              <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-10/12" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (data?.data ?? []).map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onEdit={handleEditReview}
            onDelete={handleDeleteReview}
          />
        ))}

        {!isLoading && (data?.data ?? []).length === 0 && (
          <p className="text-sm text-description">No reviews found.</p>
        )}
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
