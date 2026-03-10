"use client";
import ReportStats from "./ReportStats";
import RevenueTrendsChart from "./RevenueTrendsChart";
import EarningsTable from "./EarningsTable";
import RecentCreatedCourses from "./RecentCreatedCourses";
import { useTranslations } from "next-intl";

const ReportsPage = () => {
  const t = useTranslations("OrganizationReports");
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-title">{t("title")}</h1>
        <p className="text-sm text-description mt-1">{t("description")}</p>
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
