"use client";
import StatsCards from "@/app/[locale]/(instructor)/instructor/dashboard/StatsCards";
import RecentActivity from "@/components/reusable/for-dashboard/RecentActivity";
import RevenueChart from "@/components/reusable/for-dashboard/RevenueChart";
import OverallRating from "@/components/reusable/for-dashboard/OverallRating";
import CourseOverviewChart from "@/components/reusable/for-dashboard/CourseOverviewChart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOrganizationDashboardQuery } from "@/redux/features/organization/organization.api";
import { useTranslations } from "next-intl";

const DashboardSkeleton = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-white border border-border-light rounded-lg p-4 space-y-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="bg-white border border-border-light rounded-lg p-5 space-y-4">
                    <Skeleton className="h-5 w-40" />
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-36" />
                                <Skeleton className="h-4 w-56" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="xl:col-span-2 bg-white border border-border-light rounded-lg p-5 space-y-4 min-h-80">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-64 w-full rounded-md" />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="bg-white border border-border-light rounded-lg p-5 space-y-4">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                    <Skeleton className="h-4 w-40 mx-auto" />
                    <Skeleton className="h-4 w-32 mx-auto" />
                </div>

                <div className="xl:col-span-2 bg-white border border-border-light rounded-lg p-5 space-y-4 min-h-72">
                    <Skeleton className="h-5 w-44" />
                    <div className="space-y-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-3 flex-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrganizationPage = () => {
  const t = useTranslations("InstructorDashboard");
  const { data: dashboardResponse, isLoading } = useGetOrganizationDashboardQuery(undefined);
  const dashboardData = dashboardResponse?.data;

  if (isLoading && !dashboardData) {
    return <DashboardSkeleton />;
  }

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

export default OrganizationPage;
