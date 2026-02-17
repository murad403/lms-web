"use client";
import StatsCards from "@/components/instructor/dashboard/StatsCards";
import RecentActivity from "@/components/instructor/dashboard/RecentActivity";
import RevenueChart from "@/components/instructor/dashboard/RevenueChart";
import OverallRating from "@/components/instructor/dashboard/OverallRating";
import CourseOverviewChart from "@/components/instructor/dashboard/CourseOverviewChart";
import {
  dashboardStats,
  recentActivities,
  revenueData,
  ratingBreakdown,
  courseOverviewData,
} from "@/lib/instructor";

const InstructorDashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards stats={dashboardStats} />

      {/* Recent Activity + Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={recentActivities} />
        <RevenueChart data={revenueData} />
      </div>

      {/* Overall Rating + Course Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverallRating rating={4.6} breakdown={ratingBreakdown} />
        <CourseOverviewChart data={courseOverviewData} />
      </div>
    </div>
  );
};

export default InstructorDashboardPage;
