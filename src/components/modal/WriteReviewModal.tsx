/* eslint-disable react-hooks/incompatible-library */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const reviewSchema = z.object({
    rating: z.number().min(1, "Please select a rating").max(5),
    comment: z
        .string()
        .min(1, "Review is required")
        .max(1000, "Review is too long"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

type WriteReviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ReviewFormData) => void;
    courseName?: string;
};

const WriteReviewModal = ({
    isOpen,
    onClose,
    onSubmit,
    courseName,
}: WriteReviewModalProps) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 0,
            comment: "",
        },
    });

    const rating = watch("rating");

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleFormSubmit = (data: ReviewFormData) => {
        onSubmit(data);
        reset();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md p-0 gap-0">
                <DialogHeader className="p-6 pb-0">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-bold text-title">
                            Write a Review
                        </DialogTitle>
                        
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 pt-4">
                    {courseName && (
                        <p className="text-sm text-description mb-4">{courseName}</p>
                    )}

                    {/* Star Rating */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-title mb-2">
                            Rating
                        </label>
                        <div className="flex items-center gap-2">
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
                            {rating > 0 && (
                                <span className="text-sm font-semibold text-title ml-2">
                                    {rating.toFixed(1)}
                                </span>
                            )}
                            {rating >= 4 && (
                                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded ml-1 font-medium">
                                    Featured
                                </span>
                            )}
                        </div>
                        {errors.rating && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.rating.message}
                            </p>
                        )}
                    </div>

                    {/* Review Textarea */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-title mb-2">
                            Feedback
                        </label>
                        <textarea
                            {...register("comment")}
                            rows={5}
                            className="w-full px-3 py-3 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main text-sm resize-none placeholder:text-gray-400"
                            placeholder="Write your review here..."
                        />
                        {errors.comment && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.comment.message}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2.5 border border-border-light rounded-md text-sm font-medium text-description hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2.5 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Review"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default WriteReviewModal;
