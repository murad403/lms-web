"use client";
import ReportStats from "./ReportStats";
import RevenueTrendsChart from "./RevenueTrendsChart";
import EarningsTable from "./EarningsTable";
import RecentCreatedCourses from "./RecentCreatedCourses";

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-title">Reports</h1>
        <p className="text-sm text-description mt-1">Financial overview and analytics</p>
      </div>

      {/* Stats */}
      <ReportStats />

      {/* Revenue Trends Chart */}
      <RevenueTrendsChart />

      {/* Earnings Table */}
      <EarningsTable />

      {/* Recently Created Courses */}
      <RecentCreatedCourses />
    </div>
  );
};

export default ReportsPage;
