/* eslint-disable react-hooks/incompatible-library */
// components/modals/EditReviewModal.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, X } from "lucide-react";
import { TReview } from "@/lib/profile";
import { useTranslations } from "next-intl";

type EditReviewModalProps = {
    review: TReview;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { rating: number; comment: string }) => void;
};

const EditReviewModal = ({ review, isOpen, onClose, onSubmit }: EditReviewModalProps) => {
    const t = useTranslations("EditReviewModal");

    const reviewSchema = z.object({
        rating: z.number().min(1).max(5),
        comment: z.string().min(1, t("commentRequired")).max(500, t("commentTooLong")),
    });

    type ReviewFormData = z.infer<typeof reviewSchema>;

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: review.rating,
            comment: review.comment,
        },
    });

    const rating = watch("rating");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-title">{t("title")}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Rating */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-title mb-2">
                            {t("rating")}
                        </label>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setValue("rating", i + 1)}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={`w-8 h-8 transition-colors ${i < rating
                                                ? "text-yellow-500 fill-yellow-500"
                                                : "text-gray-300 hover:text-yellow-400"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        {errors.rating && (
                            <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
                        )}
                    </div>

                    {/* Comment */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-title mb-2">
                            {t("comment")}
                        </label>
                        <textarea
                            {...register("comment")}
                            rows={4}
                            className="w-full px-3 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main text-sm resize-none"
                            placeholder={t("placeholder")}
                        />
                        {errors.comment && (
                            <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-border-light rounded-md text-sm font-medium text-description hover:bg-gray-50 transition-colors"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? t("saving") : t("save")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReviewModal;