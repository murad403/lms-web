"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { TWishlistCourse } from "@/lib/profile";
import { Link } from "@/i18n/navigation";
import { Heart } from "lucide-react";

type WishlistCardProps = {
    course: TWishlistCourse;
};

const WishlistCard = ({ course }: WishlistCardProps) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-gray-100 last:border-b-0">
            {/* Course Info */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="relative w-20 h-14 sm:w-24 sm:h-20 rounded-md overflow-hidden shrink-0">
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-title">{course.rating}</span>
                        <span className="text-[10px] text-description">({course.reviews})</span>
                    </div>
                    <h4 className="text-sm font-semibold text-title line-clamp-2 mb-0.5">
                        {course.title}
                    </h4>
                    <p className="text-xs text-description">Course by {course.instructor}</p>
                </div>
            </div>

            {/* Price */}
            <div className="shrink-0 text-center sm:w-24">
                <span className="text-base font-bold text-main">${course.price.toFixed(2)}</span>
                {course.originalPrice && (
                    <span className="text-xs text-description line-through ml-1">
                        ${course.originalPrice.toFixed(2)}
                    </span>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
                <Link
                    href={`/course/${course.id}`}
                    className="px-4 py-2.5 border border-gray-300 rounded text-xs sm:text-sm font-medium text-title hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                    Buy Now
                </Link>
                <button className="px-4 py-2.5 bg-main text-white rounded text-xs sm:text-sm hover:bg-main/90 transition-colors whitespace-nowrap">
                    Add To Cart
                </button>
                <button className="p-3 text-main bg-[#E9EBF3] rounded transition-colors">
                    <Heart className="w-4 h-4 fill-main" />
                </button>
            </div>
        </div>
    );
};

export default WishlistCard;
