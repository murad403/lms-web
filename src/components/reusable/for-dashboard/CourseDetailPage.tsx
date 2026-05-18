"use client";
import Image from "next/image";
import { Star, BookOpen, MessageSquare, Users, Paperclip, Globe } from "lucide-react";
import RevenueChart from "@/components/reusable/for-dashboard/RevenueChart";
import OverallRating from "@/components/reusable/for-dashboard/OverallRating";
import CourseOverviewChart from "@/components/reusable/for-dashboard/CourseOverviewChart";
import { Link } from "@/i18n/navigation";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import { useOwnerCourseDetailsQuery } from "@/redux/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { OwnerCourseDetailsCard, RatingBreakdownItem } from "@/redux/features/instructor/instructor.type";
import { resolveImageUrl } from "@/utils/image";

interface CourseDetailPageProps {
    courseId: number;
}

const CourseDetailPage = ({ courseId }: CourseDetailPageProps) => {
    const { data, isLoading } = useOwnerCourseDetailsQuery(courseId, {
        skip: !courseId,
    });
    const t = useTranslations("InstructorCourseDetail");

    if (isLoading) {
        return (
            <div className="space-y-6">
                {/* Breadcrumb Skeleton */}
                <Skeleton className="h-4 w-48" />

                {/* Course Header Skeleton */}
                <div className="bg-white p-4 sm:p-5">
                    <div className="flex flex-col xl:flex-row gap-5">
                        <Skeleton className="w-full xl:w-64 h-52 sm:h-60" />
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-12 w-1/2 mt-6" />
                        </div>
                    </div>
                </div>

                {/* Charts Skeleton */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-24" />
                        ))}
                    </div>
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                </div>
            </div>
        );
    }

    if (!data?.data) return null;

    const courseData = data.data;
    const heroData = courseData.dashboard.hero;
    const cardsData = courseData.dashboard.cards;
    const ratingChartData = courseData.dashboard.rating_chart;
    const revenueChartData = courseData.dashboard.revenue_chart;
    const courseOverviewData = courseData.dashboard.course_overview_chart;

    type InfoCard = {
        icon: typeof BookOpen;
        value: number | string;
        label: string;
        sub_label: string;
    };

    const infoCards: InfoCard[] = cardsData.map((card: OwnerCourseDetailsCard) => {
        let icon;
        switch (card.label.toLowerCase()) {
            case "lectures":
                icon = BookOpen;
                break;
            case "total comments":
                icon = MessageSquare;
                break;
            case "students enrolled":
                icon = Users;
                break;
            case "attach file":
                icon = Paperclip;
                break;
            case "language":
                icon = Globe;
                break;
            default:
                icon = BookOpen;
        }
        return {
            icon,
            value: card.value,
            label: card.label,
            sub_label: card.sub_label,
        };
    });

    const revenueChartData_formatted = revenueChartData.labels.map((label: string, index: number) => ({
        label,
        value: revenueChartData.values[index],
    }));

    const courseOverviewData_formatted = courseOverviewData.labels.map((label: string, index: number) => ({
        label,
        comments: courseOverviewData.completions[index],
        views: courseOverviewData.enrollments[index],
    }));

    const ratingBreakdown = ratingChartData.breakdown.map((item: RatingBreakdownItem) => ({
        star: item.stars,
        percentage: item.percentage,
    }));

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-description">
                <Link href="/instructor/my-courses" className="hover:text-main">
                    {t("myCoursesLink")}
                </Link>
                {" > "}
                <span className="text-title font-medium">{courseData.title}</span>
            </div>

            {/* Course Header */}
            <div className="bg-white p-4 sm:p-5">
                <div className="flex flex-col xl:flex-row gap-5">
                    {/* Course Image */}
                    {heroData.thumbnail && (
                        <div className="relative w-full xl:w-64 xl:h-auto h-52 sm:h-60 overflow-hidden shrink-0">
                            <Image src={resolveImageUrl(heroData.thumbnail)} alt={courseData.title} fill className="object-cover" />
                        </div>
                    )}

                    {/* Course Info */}
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-description">
                            {t("published")}: {heroData.published_at} &nbsp; {t("lastUpdated")}: {heroData.last_updated_at}
                        </p>
                        <h2 className="text-lg sm:text-xl font-bold text-title mt-1">{courseData.title}</h2>
                        <p className="text-sm text-description mt-1">{courseData.subtitle}</p>

                        <div className="flex flex-wrap justify-between gap-3 mt-3">
                            <div className="flex gap-2">
                                <div>
                                    <AvatarGroup className="grayscale">
                                        <Avatar>
                                            <AvatarImage src={resolveImageUrl(courseData.instructor.avatar)} alt={courseData.instructor.name} />
                                            <AvatarFallback>{courseData.instructor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </AvatarGroup>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-description">{t("createdBy")}</span>
                                    <span className="text-sm font-medium text-main">{heroData.created_by}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`size-4 sm:size-5 ${i < Math.floor(heroData.overall_rating) ? "text-orange-400 fill-orange-400" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                                <span className="text-base font-semibold text-title ml-1">{heroData.overall_rating}</span>
                                <span className="text-sm text-description ml-1">({heroData.reviews_count})</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center border-t border-border-light mt-6 gap-4 pt-4">
                            <div className="flex gap-2 flex-col">
                                <span className="text-xl text-title">${heroData.course_price}</span>
                                <span className="text-sm text-description">{t("coursePrice")}</span>
                            </div>
                            <div className="flex gap-2 flex-col">
                                <span className="text-xl text-title">${heroData.total_revenue.toLocaleString()}</span>
                                <span className="text-sm text-description">{t("usdRevenue")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Revenue + Course Overview */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {infoCards.map((card: InfoCard, index: number) => {
                        const Icon = card.icon;
                        return (
                            <div key={index} className="bg-white p-4 flex gap-5 items-center">
                                <div className="bg-[#EBEBFF] p-3">
                                    <Icon className="size-7 text-main" />
                                </div>
                                <div>
                                    <p className="text-xl text-title">{card.value}</p>
                                    <p className="text-sm text-description">{card.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* overall rating */}
                <OverallRating rating={heroData.overall_rating} breakdown={ratingBreakdown} />
                <RevenueChart pathColor="#564FFD" strokeColor="#564FFD" title="Revenue" data={revenueChartData_formatted} />
                <CourseOverviewChart data={courseOverviewData_formatted} />
            </div>

        </div>
    );
};

export default CourseDetailPage;
