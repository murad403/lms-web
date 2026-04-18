import { BookOpen, CheckCircle, MonitorPlay } from 'lucide-react'
import { useTranslations } from 'next-intl';
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

type DashboardStatsProps = {
    enrolledCoursesCount: number;
    activeCoursesCount: number;
    completedCoursesCount: number;
    isLoading?: boolean;
};

const DashboardStats = ({ enrolledCoursesCount, activeCoursesCount, completedCoursesCount, isLoading = false }: DashboardStatsProps) => {
    const t = useTranslations("Dashboard");

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-xl border border-border-light p-4 sm:p-5 flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-md shrink-0" />
                        <div className="space-y-2 w-full">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-7 w-14" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-border-light p-4 sm:p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-main" />
                </div>
                <div>
                    <p className="text-base text-description">{t("enrolledCourses")}</p>
                    <p className="text-xl sm:text-2xl font-bold text-title">{enrolledCoursesCount}</p>
                </div>
            </div>
            <div className="bg-white rounded-xl border border-border-light p-4 sm:p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-green-50 flex items-center justify-center shrink-0">
                    <MonitorPlay className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <p className="text-base text-description">{t("activeCourses")}</p>
                    <p className="text-xl sm:text-2xl font-bold text-title">{activeCoursesCount}</p>
                </div>
            </div>
            <div className="bg-white rounded-xl border border-border-light p-4 sm:p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-purple-50 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <p className="text-base text-description">{t("completedCourses")}</p>
                    <p className="text-xl sm:text-2xl font-bold text-title">{completedCoursesCount}</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardStats
