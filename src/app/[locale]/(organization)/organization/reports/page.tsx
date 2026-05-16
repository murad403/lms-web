"use client";
import ReportStats from "./ReportStats";
import RevenueTrendsChart from "./RevenueTrendsChart";
import DailyEarningsChart from "./DailyEarningsChart";
import EarningsTable from "./EarningsTable";
import RecentCreatedCourses from "./RecentCreatedCourses";
import CourseAnalytics from "./CourseAnalytics";
import TopCourses from "./TopCourses";
import RatingsBreakdown from "./RatingsBreakdown";
import { useTranslations } from "next-intl";

const ReportsPage = () => {
  const t = useTranslations("OrganizationReports");
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-title">{t("title")}</h1>
        <p className="text-sm text-description">{t("description")}</p>
      </div>

      {/* Stats Cards */}
      <ReportStats />

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevenueTrendsChart />
          <DailyEarningsChart />
      </div>

      {/* Performance & Ratings */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <TopCourses />
          </div>
          <div className="xl:col-span-1">
            <RatingsBreakdown />
          </div>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <EarningsTable />
          <RecentCreatedCourses />
      </div>

      {/* Full Width Analytics */}
      <CourseAnalytics />
    </div>
  );
};

export default ReportsPage;
