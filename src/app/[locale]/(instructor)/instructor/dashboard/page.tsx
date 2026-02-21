"use client";
import StatsCards from "@/components/reusable/for-dashboard/StatsCards";
import RecentActivity from "@/components/reusable/for-dashboard/RecentActivity";
import RevenueChart from "@/components/reusable/for-dashboard/RevenueChart";
import OverallRating from "@/components/reusable/for-dashboard/OverallRating";
import CourseOverviewChart from "@/components/reusable/for-dashboard/CourseOverviewChart";
import { dashboardStats, recentActivities, revenueData, ratingBreakdown, courseOverviewData } from "@/lib/instructor";

const InstructorDashboardPage = () => {
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <StatsCards stats={dashboardStats} />

            {/* Recent Activity + Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RecentActivity activities={recentActivities} />
                <div className="lg:col-span-2">
                    <RevenueChart pathColor="#564FFD" strokeColor="#564FFD" title="Revenue" data={revenueData} />
                </div>
            </div>

            {/* Overall Rating + Course Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <OverallRating rating={4.6} breakdown={ratingBreakdown} />
                <div className="lg:col-span-2">
                    <CourseOverviewChart data={courseOverviewData} />
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboardPage;
