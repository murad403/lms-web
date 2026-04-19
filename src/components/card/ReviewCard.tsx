// components/ReviewCard.tsx (Updated)
"use client";
import { useState } from "react";
import Image from "next/image";
import { Star, Pencil, Trash2 } from "lucide-react";
import { TReview } from "@/lib/profile";
import EditReviewModal from "../modal/EditReviewModal";
import DeleteReviewModal from "../modal/DeleteReviewModal";
import { useTranslations } from "next-intl";
import { resolveImageUrl } from "@/utils/image";
import { StudentReviewItem } from "@/redux/features/student/student.type";

type ReviewCardProps = {
    review: TReview | StudentReviewItem;
    onEdit?: (reviewId: string, data: { rating: number; comment: string }) => Promise<void>;
    onDelete?: (reviewId: string) => Promise<void>;
};

const formatRelativeTime = (createdAt?: string) => {
    if (!createdAt) return "-";

    const createdAtDate = new Date(createdAt);
    if (!Number.isFinite(createdAtDate.getTime())) return "-";

    const diffInSeconds = Math.floor((Date.now() - createdAtDate.getTime()) / 1000);
    if (diffInSeconds < 60) return "just now";

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

    const years = Math.floor(days / 365);
    return `${years} year${years === 1 ? "" : "s"} ago`;
};

const ReviewCard = ({ review, onEdit, onDelete }: ReviewCardProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const t = useTranslations("ReviewCard");
    const normalizedReview: TReview = {
        id: String(review.id),
        userName: "userName" in review ? review.userName : review.course_title,
        avatar: review.avatar,
        rating: review.rating,
        timeAgo: "timeAgo" in review ? review.timeAgo : formatRelativeTime(review.created_at),
        comment: review.comment,
        isOwn: "isOwn" in review ? review.isOwn : true,
    };
    const reviewerName = normalizedReview.userName || "Reviewer";

    const handleEdit = async (data: { rating: number; comment: string }) => {
        try {
            await onEdit?.(String(review.id), data);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Failed to edit review:", error);
        }
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await onDelete?.(String(review.id));
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Failed to delete review:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="py-5 border border-border-light p-4 rounded-md">
                <div className="flex items-start gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <Image
                            src={resolveImageUrl(normalizedReview.avatar)}
                            alt={reviewerName}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-semibold text-title">{reviewerName}</h4>
                                <span className="text-xs text-description">• {normalizedReview.timeAgo}</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < normalizedReview.rating
                                                ? "text-yellow-500 fill-yellow-500"
                                                : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-description mt-2 leading-relaxed">
                            {normalizedReview.comment}
                        </p>
                        {normalizedReview.isOwn && (
                            <div className="flex items-center gap-4 mt-3">
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="flex items-center gap-1.5 text-xs text-main hover:text-main/80 transition-colors font-medium"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                    {t("edit")}
                                </button>
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 transition-colors font-medium"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    {t("delete")}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <EditReviewModal
                review={normalizedReview}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEdit}
            />

            <DeleteReviewModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default ReviewCard;