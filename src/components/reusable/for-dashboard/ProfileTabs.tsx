import { useState } from "react";
import Image from "next/image";
import { Star, Users, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { TInstructorProfile, TInstructorCourse } from "@/lib/instructor";
import { useTranslations } from "next-intl";
import Pagination from "@/components/reusable/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

type TReview = {
    id: number;
    name: string;
    avatar: string;
    timeAgo: string;
    rating: number;
    comment: string;
};

type ProfileTabsProps = {
    profile: TInstructorProfile;
    publishedCourses: TInstructorCourse[];
    publicReviews: TReview[];
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    isCoursesLoading?: boolean;
    isReviewsLoading?: boolean;
};

const ProfileTabs = ({
    profile,
    publishedCourses,
    publicReviews,
    currentPage,
    totalPages,
    onPageChange,
    isCoursesLoading,
    isReviewsLoading,
}: ProfileTabsProps) => {
    const [activeTab, setActiveTab] = useState("courses");
    const [showAllReviews, setShowAllReviews] = useState(false);
    const visibleReviews = (totalPages && totalPages > 1) 
        ? publicReviews 
        : (showAllReviews ? publicReviews : publicReviews.slice(0, 4));
    const t = useTranslations("InstructorProfile");

    return (
        <div className="container mx-auto">
            <div className="flex border-b border-border-light bg-white">
                {["courses", "reviews"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-sm font-semibold capitalize transition-colors border-b-4 -mb-px ${activeTab === tab
                            ? "border-main text-main"
                            : "border-transparent text-description hover:text-title"
                            }`}
                    >
                        {tab === "courses" ? t("coursesTab") : t("reviewTab")}
                    </button>
                ))}
            </div>

            {/* Courses Tab */}
            {activeTab === "courses" && (
                <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-bold text-title">
                        {profile.firstName} Courses ({publishedCourses.length.toString().padStart(2, "0")})
                    </h3>
                    {isCoursesLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white border border-border-light overflow-hidden p-3 space-y-3">
                                    <Skeleton className="h-40 w-full rounded" />
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Skeleton className="h-4 w-16" />
                                            <Skeleton className="h-4 w-10" />
                                        </div>
                                        <Skeleton className="h-5 w-full" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {publishedCourses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={`/course/${course.id}`}
                                    className="bg-white border border-border-light overflow-hidden hover:shadow-md transition-shadow block"
                                >
                                    <div className="relative h-50 w-full bg-gray-100">
                                        {course.image ? (
                                            <Image
                                                src={course.image}
                                                alt={course.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 space-y-1.5">
                                        <div className="flex justify-between items-center">
                                            <div className="bg-[#EBEBFF] text-xs font-semibold text-main uppercase px-2 py-0.5 rounded">
                                                {course.category}
                                            </div>
                                            <div className="text-lg font-bold text-title">
                                                ${course.price}
                                            </div>
                                        </div>
                                        <h4 className="text-base font-semibold text-title line-clamp-2 leading-snug">
                                            {course.title}
                                        </h4>
                                        <div className="flex items-center justify-between text-sm text-description">
                                            <div className="flex items-center gap-1">
                                                <Star className="size-4 text-yellow-400 fill-yellow-400" />
                                                <span className="font-medium text-title">{course.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-3.5 h-3.5" />
                                                <span>{course.students} {t("students")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
                <div className="mt-6 space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <h3 className="text-xl font-bold text-title">{t("studentsFeedback")}</h3>
                    </div>
                    {isReviewsLoading ? (
                        <div className="space-y-5">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-3">
                                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-4 w-28" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                        <Skeleton className="h-3 w-20" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-5/6" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="space-y-5">
                                {visibleReviews.map((review) => (
                                    <div key={review.id} className="flex gap-3">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200">
                                            {review.avatar ? (
                                                <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-[#EBEBFF] text-main font-bold">
                                                    <span className="uppercase text-sm">{review.name.charAt(0)}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-sm font-semibold text-title">{review.name}</span>
                                                <span className="text-xs text-description"> {review.timeAgo}</span>
                                            </div>
                                            <div className="flex items-center gap-0.5 mt-1">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star
                                                        key={s}
                                                        className={`w-3.5 h-3.5 ${s <= review.rating
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-300 fill-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm text-description mt-1.5 leading-relaxed">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {totalPages && totalPages > 1 && onPageChange ? (
                                <div className="pt-4">
                                    <Pagination
                                        currentPage={currentPage || 1}
                                        totalPages={totalPages}
                                        onPageChange={onPageChange}
                                    />
                                </div>
                            ) : (
                                !showAllReviews && publicReviews.length > 4 && (
                                    <div className="flex justify-center pt-2">
                                        <button
                                            onClick={() => setShowAllReviews(true)}
                                            className="flex items-center gap-2 px-5 py-2.5 border border-border-light rounded text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                                        >
                                            {t("loadMore")}
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileTabs;
