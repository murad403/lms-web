"use client";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { TCourse } from "@/lib/courses";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { resolveImageUrl } from "@/utils/image";
import { useAddWishlistMutation } from "@/redux/features/student/student.api";
import { toast } from "sonner";

type CourseCardProps = {
    course: TCourse;
};

const COURSE_FALLBACK_IMAGE = "/courses/Course Images.png";

const CourseCard = ({ course }: CourseCardProps) => {
    const t = useTranslations("CourseCard");
    const [addWishlist, { isLoading: isAddingWishlist }] = useAddWishlistMutation();

    const handleAddWishlist = async (id: number) => {
        try {
            const response = await addWishlist(id).unwrap();
            toast.success(response.message || "Course added to wishlist successfully.");
        } catch (error) {
            const message =
                typeof error === "object" &&
                    error !== null &&
                    "data" in error &&
                    typeof (error as { data?: { message?: string } }).data?.message === "string"
                    ? (error as { data?: { message?: string } }).data?.message
                    : "Failed to add wishlist.";
            toast.error(message);
        }
    };

    // console.log(course?.is_wishlisted)
    return (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow shrink-0 w-full">
            {/* Image Section */}
            <div className="relative md:h-70 h-60 w-full">
                <Image
                    src={resolveImageUrl(course.image) || COURSE_FALLBACK_IMAGE}
                    alt={course.title}
                    fill
                    className="object-cover"
                />
                {/* Wishlist Heart Icon */}
                <button
                    onClick={() => handleAddWishlist(course?.id)}
                    disabled={isAddingWishlist}
                    className={`absolute top-2 right-2 size-10 text-white hover:text-gray-700 hover:bg-white rounded-full flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    <Heart className={`w-5 h-5 ${course.is_wishlisted && "fill-red-500 text-red-500"}`} />
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
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-navy-blue">
                        ${course.price}
                    </span>
                    <Link href={`/course/${course.id}`} className="px-8 py-2 bg-main text-white rounded text-xs sm:text-sm font-semibold hover:bg-main/90 transition-colors">
                        {t("info")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
