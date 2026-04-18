"use client";
import StatsCards from "@/app/[locale]/(instructor)/instructor/dashboard/StatsCards";
import RecentActivity from "@/components/reusable/for-dashboard/RecentActivity";
import RevenueChart from "@/components/reusable/for-dashboard/RevenueChart";
import OverallRating from "@/components/reusable/for-dashboard/OverallRating";
import CourseOverviewChart from "@/components/reusable/for-dashboard/CourseOverviewChart";
import { useDashboardQuery } from "@/redux/features/instructor/instructor.api";
import { useTranslations } from "next-intl";

const InstructorDashboardPage = () => {
    const t = useTranslations("InstructorDashboard");
    const { data, isLoading } = useDashboardQuery();
    const dashboardData = data?.data;

    const stats = {
        coursesCreated: dashboardData?.course_created ?? 0,
        activeCourses: dashboardData?.active_courses ?? 0,
        studentsEnrolled: dashboardData?.students_enrolled ?? 0,
        onlineStudents: dashboardData?.online_sessions ?? 0,
        averageRating: dashboardData?.average_rating ?? 0,
        totalEarning: dashboardData?.total_earning ?? 0,
    };

    const recentActivities = (dashboardData?.recent_activity ?? []).map((activity) => ({
        id: String(activity.id),
        type: "purchase" as const,
        userName: activity.student_name,
        action: "purchased your course",
        courseName: activity.course_title,
        time: Number.isNaN(new Date(activity.created_at).getTime())
            ? activity.created_at
            : new Date(activity.created_at).toLocaleString(),
    }));

    const revenueData = (dashboardData?.monthly_revenue_chart ?? []).map((item) => ({
        label: item.label,
        value: item.amount,
    }));

    const ratingBreakdown = (dashboardData?.rating_breakdown ?? []).map((item) => ({
        star: item.stars,
        percentage: item.percentage,
    }));

    const courseOverviewData = (dashboardData?.course_overview_chart ?? []).map((item) => ({
        label: item.label,
        comments: item.enrollments,
        views: item.completions,
    }));

    const averageRating = dashboardData?.average_rating ?? 0;

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <StatsCards stats={stats} />

            {/* Recent Activity + Revenue */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <RecentActivity activities={recentActivities} />
                <div className="xl:col-span-2">
                    <RevenueChart pathColor="#564FFD" strokeColor="#564FFD" title={t("revenue")} data={revenueData} />
                </div>
            </div>

            {/* Overall Rating + Course Overview */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <OverallRating rating={averageRating} breakdown={ratingBreakdown} />
                <div className="xl:col-span-2">
                    <CourseOverviewChart data={courseOverviewData} />
                </div>
            </div>

            {!isLoading && !dashboardData && (
                <p className="text-sm text-description">No dashboard data found.</p>
            )}
        </div>
    );
};

export default InstructorDashboardPage;
