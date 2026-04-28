"use client";
import { Award, BookOpen, Clock } from "lucide-react";
import { SlBadge } from "react-icons/sl";
import { useTranslations } from "next-intl";
import { useCourseAccreditationQuery } from "@/redux/features/instructor/instructor.api";
import { Skeleton } from "@/components/ui/skeleton";

const AccreditationStatsCards = () => {
    const t = useTranslations("InstructorAccreditation");
    
    const { data: accreditationData, isLoading } = useCourseAccreditationQuery({
        page: 1,
        page_size: 1,
    });

    const stats = accreditationData?.data?.stats || {
        approved_courses: 0,
        published_courses: 0,
        pending_review_courses: 0,
        certificates_issued: 0,
    };

    const cards = [
        {
            labelKey: "approvedCourses",
            value: stats.approved_courses,
            icon: BookOpen,
            color: "green-600",
            border: "border-green-600",
            bg: "bg-green-50",
            titleKey: "accreditedCourses"
        },
        {
            labelKey: "pendingReview",
            value: stats.pending_review_courses,
            icon: Clock,
            color: "yellow-600",
            border: "border-yellow-600",
            bg: "bg-yellow-50",
            titleKey: "awaitingApproval"
        },
        {
            labelKey: "certificatesIssued",
            value: stats.certificates_issued.toLocaleString?.() || stats.certificates_issued,
            icon: Award,
            color: "blue-600",
            border: "border-blue-400",
            bg: "bg-blue-50",
        },
        {
            labelKey: "activeCertificates",
            value: stats.published_courses,
            icon: SlBadge,
            color: "purple-600",
            border: "border-purple-600",
            bg: "bg-purple-50",
            titleKey: "validCertificates"
        },
    ];

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={`stat-skeleton-${index}`}
                        className="bg-white p-5 border-l-4 border-gray-200 rounded-xl"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <Skeleton className="h-4 w-32 mb-2" />
                                <Skeleton className="h-6 w-16 mb-2" />
                                <Skeleton className="h-3 w-40" />
                            </div>
                            <Skeleton className="w-12 h-12 rounded-lg shrink-0 ml-4" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card) => (
                <div
                    key={card.labelKey}
                    className={`bg-white p-5 border-l-4 ${card.border} rounded-xl`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-base font-medium text-description">{t(card.labelKey)}</p>
                            <p className="text-2xl font-bold text-title mt-1">{card.value}</p>
                            {card.titleKey && <p className="text-xs text-description mt-1">{t(card.titleKey)}</p>}
                        </div>
                        <div className={`${card.bg} p-3 rounded-lg`}>
                            <card.icon className={`w-5 h-5 text-${card.color}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccreditationStatsCards;
