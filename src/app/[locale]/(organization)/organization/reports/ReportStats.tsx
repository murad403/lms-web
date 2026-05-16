"use client";
import { BookOpen, DollarSign, TrendingUp, Users, Star, Layers, Activity, BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useGetStatisticsQuery } from '@/redux/features/organization/organization.api';
import { Skeleton } from '@/components/ui/skeleton';

const ReportStats = () => {
    const t = useTranslations("OrganizationReports");
    const { data, isLoading } = useGetStatisticsQuery();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white p-5 flex items-center gap-4 border border-border-light rounded-lg shadow-sm animate-pulse">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                             <div className="h-3 bg-gray-100 w-1/2 rounded"></div>
                             <div className="h-6 bg-gray-100 w-3/4 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const statsData = data?.data;

    const stats = [
        { labelKey: "totalRevenue", value: `$${statsData?.total_revenue || "0.00"}`, icon: DollarSign, color: "bg-blue-50 text-blue-600" },
        { labelKey: "todayRevenue", value: `$${statsData?.today_revenue || "0.00"}`, icon: TrendingUp, color: "bg-green-50 text-green-600" },
        { labelKey: "totalCourses", value: statsData?.total_courses || 0, icon: BookOpen, color: "bg-purple-50 text-purple-600" },
        { labelKey: "activeCourses", value: statsData?.active_courses || 0, icon: Activity, color: "bg-orange-50 text-orange-600" },
        { labelKey: "totalEnrollments", value: statsData?.total_enrollments || 0, icon: Users, color: "bg-indigo-50 text-indigo-600" },
        { labelKey: "allTimeEnrollments", value: statsData?.total_enrollments_all_time || 0, icon: Users, color: "bg-pink-50 text-pink-600" },
        { labelKey: "avgRating", value: statsData?.average_rating?.toFixed(1) || "0.0", icon: Star, color: "bg-yellow-50 text-yellow-600" },
        { labelKey: "courseSales", value: statsData?.course_sales || 0, icon: Layers, color: "bg-cyan-50 text-cyan-600" },
        { labelKey: "avgCoursePrice", value: `$${statsData?.average_course_price?.toFixed(2) || "0.00"}`, icon: BarChart3, color: "bg-teal-50 text-teal-600" },
        { labelKey: "totalReviews", value: statsData?.total_reviews || 0, icon: Star, color: "bg-rose-50 text-rose-600" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.labelKey} className="bg-white p-5 border border-border-light rounded-lg flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${stat.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-[10px] font-bold text-description/70 uppercase tracking-widest truncate">{t(stat.labelKey)}</p>
                            <p className="text-xl font-bold text-title mt-0.5">{stat.value}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ReportStats;
