"use client";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { TCourse } from "@/lib/courses";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type CourseCardProps = {
    course: TCourse;
};

const CourseCard = ({ course }: CourseCardProps) => {
    const t = useTranslations("CourseCard");
    return (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow shrink-0 w-full">
            {/* Image Section */}
            <div className="relative h-72 w-full">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                />
                {/* Wishlist Heart Icon */}
                <button className="absolute top-2 right-2 size-10 text-white hover:text-gray-700 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                    <Heart className="w-5 h-5  " />
                </button>
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-title mb-2 line-clamp-2">
                    {course.title}
                </h3>

                {/* Category and Rating on same line */}
                <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] sm:text-xs text-description uppercase">
                        {course.category}
                    </p>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs sm:text-sm font-semibold text-title">
                            {course.rating}{" "}
                            <span className="text-gray-400 font-normal">
                                ({course.reviews})
                            </span>
                        </span>
                    </div>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#042F54]">
                        ${course.price}
                    </span>
                    <Link href={`/course/${2}`} className="px-8 py-2 bg-main text-white rounded text-xs sm:text-sm font-semibold hover:bg-main/90 transition-colors">
                        {("info")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
