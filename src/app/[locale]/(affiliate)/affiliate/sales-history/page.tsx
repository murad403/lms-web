"use client";
import { CommissionWalletCard } from "@/components/affiliate/dashboard/Commissionwalletcard";
import { SaleRecord, SalesHistoryTable } from "../../../../../components/affiliate/dashboard/Saleshistorytable";
import { AffiliateStatCard } from "@/components/affiliate/dashboard/StateCard";
import { MousePointerClick, BookOpen, CircleDollarSign, CreditCard } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSalesHistoryQuery } from "@/redux/features/affiliate/affiliate.api";
import { AffiliateSalesHistoryItem } from "@/redux/features/affiliate/affiliate.type";
import { Skeleton } from "@/components/ui/skeleton";

function mapSalesHistoryRecord(item: AffiliateSalesHistoryItem): SaleRecord {
  return {
    orderId: item.order_id,
    course: item.course_title,
    customer: item.customer_name,
    price: item.price,
    commissionPercent: item.commission_percentage,
    commissionAmount: Number(item.commission_amount),
    status: item.status as SaleRecord["status"],
    date: item.date,
  };
}

const Page = () => {
  const t = useTranslations("AffiliateDashboard");
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching, isError } = useSalesHistoryQuery(
    search.trim() ? { search: search.trim() } : undefined,
  );

  const dashboardData = data?.data;
  const stats = dashboardData?.stats;
  const salesData = (dashboardData?.sales_history ?? []).map(mapSalesHistoryRecord);

  if (isError || !dashboardData) {
    if (isLoading) {
      return (
        <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
                <Skeleton className="mt-4 h-9 w-24" />
                <Skeleton className="mt-3 h-4 w-36" />
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-8 w-32" />
                </div>
              ))}
            </div>
            <Skeleton className="mt-6 h-2.5 w-full rounded-full" />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-56 rounded-lg" />
            </div>
            <div className="mt-6 space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-600 shadow-sm">
          Unable to load affiliate dashboard data.
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: t("totalClicksSales"),
      value: stats?.total_clicks ?? 0,
      trendLabel: stats?.trends.clicks,
      icon: MousePointerClick,
      iconClassName: "text-orange-500",
      iconBgClassName: "bg-orange-50",
    },
    {
      title: t("totalSales"),
      value: stats?.total_sales ?? 0,
      trendLabel: stats?.trends.sales,
      icon: BookOpen,
      iconClassName: "text-blue-500",
      iconBgClassName: "bg-blue-50",
    },
    {
      title: t("totalEarned"),
      value: stats?.total_earned ?? 0,
      trendLabel: stats?.trends.earned,
      icon: CircleDollarSign,
      iconClassName: "text-green-500",
      iconBgClassName: "bg-green-50",
    },
    {
      title: t("pendingCommissions"),
      value: stats?.pending_Withdraw ?? 0,
      trendLabel: stats?.trends.pending,
      icon: CreditCard,
      iconClassName: "text-purple-500",
      iconBgClassName: "bg-purple-50",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((item, idx) => (
          <div key={idx} className="w-full">
            <AffiliateStatCard
              title={item.title}
              value={item.value}
              trendLabel={item.trendLabel}
              icon={item.icon}
              className="w-full"
              iconClassName={item.iconClassName}
              iconBgClassName={item.iconBgClassName}
            />
          </div>
        ))}
      </div>

      <div>
        <CommissionWalletCard
          title={t("salesCommissionWallet")}
          totalEarned={stats?.wallet.total_earned ?? 0}
          totalPayable={stats?.wallet.total_payable ?? 0}
          totalPaid={stats?.wallet.total_paid ?? 0}
          payoutProgress={stats?.wallet.payout_progress}
          currency="$"
          className="w-full"
        />
      </div>
      <div>
        <SalesHistoryTable
          data={salesData}
          currency="$"
          className="w-full"
          isLoading={isLoading || isFetching}
          searchValue={search}
          onSearchChange={setSearch}
        />
      </div>
    </div>
  );
};

export default Page;
