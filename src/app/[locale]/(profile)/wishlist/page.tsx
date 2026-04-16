"use client";
import WishlistCard from "@/components/reusable/WishlistCard";
import { useTranslations } from "next-intl";
import { useViewWishlistQuery } from "@/redux/features/student/student.api";
import { resolveImageUrl } from "@/utils/image";
import { Link } from "@/i18n/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const WISHLIST_FALLBACK_IMAGE = "/courses/Course Images.png";

const WishlistPage = () => {
    const t = useTranslations("WishlistPage");
    const { data, isLoading } = useViewWishlistQuery();

    const wishlistCourses = (data?.data?.items || []).map((item) => ({
        id: item.id,
        courseId: item.course_id,
        title: item.course_title,
        image: resolveImageUrl(item.thumbnail) || WISHLIST_FALLBACK_IMAGE,
        rating: Number.parseFloat(item.rating || "0") || 0,
        reviews: String(item.reviews_count),
        price: Number.parseFloat(item.original_price || "0") || 0,
        originalPrice: undefined,
        instructor: item.instructor,
    }));

    const hasWishlistItems = wishlistCourses.length > 0;

    const loadingRows = Array.from({ length: 3 });

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-title mb-6">{t("title")}</h2>

            <div className="bg-white rounded-md border border-border-light overflow-hidden">
                {isLoading ? (
                    <>
                        <p className="sr-only">{t("loading")}</p>
                        <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 px-4 sm:px-6 py-3 border-b border-gray-200 bg-gray-50">
                            <span className="text-sm text-main font-medium uppercase">{t("course")}</span>
                            <span className="text-sm text-main font-medium uppercase w-24 text-center">
                                {t("prices")}
                            </span>
                            <span className="text-sm text-main font-medium uppercase w-56 text-center">
                                {t("action")}
                            </span>
                        </div>

                        <div className="px-4 sm:px-6">
                            {loadingRows.map((_, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-gray-100 last:border-b-0">
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                        <Skeleton className="w-20 h-14 sm:w-24 sm:h-20 rounded-md shrink-0" />
                                        <div className="min-w-0 w-full">
                                            <Skeleton className="h-3 w-24 mb-2" />
                                            <Skeleton className="h-4 w-56 mb-2" />
                                            <Skeleton className="h-3 w-32" />
                                        </div>
                                    </div>

                                    <div className="shrink-0 text-center sm:w-24">
                                        <Skeleton className="h-5 w-16 mx-auto" />
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <Skeleton className="h-10 w-20" />
                                        <Skeleton className="h-10 w-24" />
                                        <Skeleton className="h-10 w-10" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : hasWishlistItems ? (
                    <>
                        {/* Table Header */}
                        <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 px-4 sm:px-6 py-3 border-b border-gray-200 bg-gray-50">
                            <span className="text-sm text-main font-medium uppercase">{t("course")}</span>
                            <span className="text-sm text-main font-medium uppercase w-24 text-center">
                                {t("prices")}
                            </span>
                            <span className="text-sm text-main font-medium uppercase w-56 text-center">
                                {t("action")}
                            </span>
                        </div>

                        {/* Items */}
                        <div className="px-4 sm:px-6">
                            {wishlistCourses.map((course) => (
                                <WishlistCard key={course.id} course={course} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="px-4 sm:px-6 py-14 text-center">
                        <h3 className="text-lg font-semibold text-title">{t("emptyTitle")}</h3>
                        <p className="text-sm text-description mt-2">{t("emptyDescription")}</p>
                        <Link
                            href="/courses"
                            className="inline-flex mt-5 px-5 py-2.5 bg-main text-white rounded text-sm font-semibold hover:bg-main/90 transition-colors"
                        >
                            {t("addCourse")}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
