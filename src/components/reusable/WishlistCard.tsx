"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAddCartMutation, useRemoveWishlistMutation, useViewCartQuery } from "@/redux/features/student/student.api";
import { toast } from "sonner";
import { getClientSession } from "@/utils/auth-client";

type TWishlistCourse = {
    id: number;
    courseId: number;
    title: string;
    image: string;
    rating: number;
    reviews: string;
    price: number;
    originalPrice?: number;
    instructor: string;
};

type WishlistCardProps = {
    course: TWishlistCourse;
};

const WishlistCard = ({ course }: WishlistCardProps) => {
    const t = useTranslations("WishlistCard");
    const session = getClientSession();
    const [removeWishlist, { isLoading: isRemovingWishlist }] = useRemoveWishlistMutation();
    const [addCart, { isLoading: isAddingCart }] = useAddCartMutation();
    const { data: cartData } = useViewCartQuery(undefined, {
        skip: !session.accessToken,
    });
    const cartItems = cartData?.data?.items || [];

    const handleRemoveWishlist = async (id: number) => {
        try {
            const response = await removeWishlist(id).unwrap();
            toast.success(response.message || "Course removed from wishlist successfully.");
        } catch (error) {
            const message =
                typeof error === "object" &&
                    error !== null &&
                    "data" in error &&
                    typeof (error as { data?: { message?: string } }).data?.message === "string"
                    ? (error as { data?: { message?: string } }).data?.message
                    : "Failed to remove wishlist.";
            toast.error(message);
        }
    };

    const handleAddToCart = async () => {
        if (cartItems.length > 0) {
            toast.error("Remove the existing cart item first, then you can add another course.");
            return;
        }

        try {
            const response = await addCart({ course_id: course.courseId }).unwrap();
            toast.success(response.message || "Course added to cart successfully.");
        } catch (error) {
            const message =
                typeof error === "object" &&
                    error !== null &&
                    "data" in error &&
                    typeof (error as { data?: { message?: string } }).data?.message === "string"
                    ? (error as { data?: { message?: string } }).data?.message
                    : "Failed to add cart.";
            toast.error(message);
        }
    };

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
                    <p className="text-xs text-description">{t("courseBy")} {course.instructor}</p>
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
                    href="/checkout"
                    className="px-4 py-2.5 border border-gray-300 rounded text-xs sm:text-sm font-medium text-title hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                    {t("buyNow")}
                </Link>
                <button
                    onClick={handleAddToCart}
                    disabled={isAddingCart}
                    className="px-4 cursor-pointer py-2.5 bg-main text-white rounded text-xs sm:text-sm hover:bg-main/90 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t("addToCart")}
                </button>
                <button
                    onClick={() => handleRemoveWishlist(course.courseId)}
                    disabled={isRemovingWishlist}
                    className="p-3 cursor-pointer group text-main bg-main-light rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Heart className="w-4 h-4 fill-main group-hover:fill-none duration-300 transition-colors" />
                </button>
            </div>
        </div>
    );
};

export default WishlistCard;
