"use client";
import { AffiliateStatCard } from "@/components/affiliate/dashboard/StateCard";
import { useAffiliateDashboardQuery } from "@/redux/features/affiliate/affiliate.api";
import { Skeleton } from "@/components/ui/skeleton";
import { MousePointer2, ShoppingCart, DollarSign, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { ClicksPieChart } from "./ClicksPieChart";
import { PayoutProgressChart } from "./PayoutProgressChart";
import { WalletEarningsCard } from "./WalletEarningsCard";
import { YearlyEarningsChart } from "./YearlyEarningsChart";





const StatCardSkeleton = () => (
  <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
    <div className="flex items-start justify-between gap-3">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-28" />
      </div>
      <Skeleton className="h-11 w-11 rounded-2xl" />
    </div>
    <Skeleton className="h-4 w-20" />
  </div>
);

const ChartSkeleton = ({ heightClass = "h-[320px]" }: { heightClass?: string }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${heightClass} flex flex-col gap-4`}>
    <div className="space-y-2">
      <Skeleton className="h-4 w-36" />
      <Skeleton className="h-3 w-52" />
    </div>
    <div className="flex-1 flex items-center gap-4">
      <Skeleton className="h-32 w-32 rounded-full shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  </div>
);

const WalletSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full p-6 flex flex-col gap-6">
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>

    <div className="text-center flex justify-center">
      <Skeleton className="h-12 w-40" />
    </div>

    <div className="flex flex-col gap-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

const YearlyChartSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
    <div className="flex items-center justify-between gap-3">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-40" />
      </div>
      <Skeleton className="h-7 w-28 rounded-full" />
    </div>
    <Skeleton className="h-55 w-full rounded-xl" />
  </div>
);

const Page = () => {
  const t = useTranslations("AffiliateDashboard");
  const { data: dashboardData, isLoading } = useAffiliateDashboardQuery();

  const stats = dashboardData?.data?.stats;

  const statCards = stats
    ? [
      {
        title: t("totalClicks"),
        value: stats.total_clicks.toLocaleString(),
        trendLabel: stats.trends.clicks,
        icon: MousePointer2,
        iconClassName: "text-orange-500",
        iconBgClassName: "bg-orange-50",
      },
      {
        title: t("totalSales"),
        value: `$${stats.total_sales.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
        trendLabel: stats.trends.sales,
        icon: ShoppingCart,
        iconClassName: "text-blue-500",
        iconBgClassName: "bg-blue-50",
      },
      {
        title: t("totalEarned"),
        value: `$${stats.total_earned.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
        trendLabel: stats.trends.earned,
        icon: DollarSign,
        iconClassName: "text-green-500",
        iconBgClassName: "bg-green-50",
      },
      {
        title: t("pendingCommissions"),
        value: `$${stats.pending_Withdraw.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
        trendLabel: stats.trends.pending,
        icon: Clock,
        iconClassName: "text-purple-500",
        iconBgClassName: "bg-purple-50",
      },
    ]
    : [];

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <ChartSkeleton />
          <ChartSkeleton />
          <WalletSkeleton />
        </div>
        <YearlyChartSkeleton />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full space-y-6 sm:space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((item, idx) => (
          <AffiliateStatCard
            key={idx}
            title={item.title}
            value={item.value}
            trendLabel={item.trendLabel}
            icon={item.icon}
            className="w-full"
            iconClassName={item.iconClassName}
            iconBgClassName={item.iconBgClassName}
          />
        ))}
      </div>

      {/* Charts Row */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Clicks Pie — 1 col */}
          <ClicksPieChart
            labels={stats.clicks_pie_chart.labels}
            values={stats.clicks_pie_chart.values}
          />

          {/* Payout Progress Doughnut — 1 col */}
          <PayoutProgressChart
            labels={stats.payout_progress_chart.labels}
            values={stats.payout_progress_chart.values}
            currentMonth={stats.payout_progress_chart.current_month}
            lastMonth={stats.payout_progress_chart.last_month}
            overall={stats.payout_progress_chart.overall}
          />

          {/* Wallet Card — 1 col */}
          <WalletEarningsCard wallet={stats.wallet} currency="$" />
        </div>
      )}

      {/* Yearly Earnings Line Chart — full width */}
      {stats && (
        <YearlyEarningsChart
          data={stats.yearly_earned_graph.data}
          currency="$"
        />
      )}
    </div>
  );
};

export default Page;