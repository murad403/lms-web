"use client";
import Image from "next/image";
import { Star, Pencil, Trash2 } from "lucide-react";
import { TReview } from "@/lib/profile";

type ReviewCardProps = {
  review: TReview;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="py-5 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
          <Image
            src={review.avatar}
            alt={review.userName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-title">{review.userName}</h4>
              <span className="text-xs text-description">• {review.timeAgo}</span>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-description mt-2 leading-relaxed">
            {review.comment}
          </p>
          {review.isOwn && (
            <div className="flex items-center gap-4 mt-3">
              <button className="flex items-center gap-1.5 text-xs text-main hover:text-main/80 transition-colors font-medium">
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
              <button className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 transition-colors font-medium">
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
