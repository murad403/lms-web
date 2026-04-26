"use client";
import { useMemo, useState } from "react";
import { PaymentProgressCard } from "@/components/commission/PaymentProgress";
import { RecentTransactionsCard } from "@/components/commission/RecentTransection";
import { WalletCard } from "@/components/commission/WalletCard";
import { CreditCard, Wallet, DollarSign, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCommissionWalletQuery } from "@/redux/features/affiliate/affiliate.api";
import { AffiliateRecentTransactionItem } from "@/redux/features/affiliate/affiliate.type";
import { Transaction } from "@/components/commission/RecentTransection";

function mapRecentTransactionItem(item: AffiliateRecentTransactionItem): Transaction {
  return {
    orderId: item.order_id,
    course: item.course_title,
    date: item.date,
    amount: Number(item.commission_amount),
    status: item.status === "paid" ? "Paid" : item.status === "approved" ? "Approved" : "Pending",
    commission_percentage: item.commission_percentage
  };
}

const Page = () => {
  const t = useTranslations("AffiliateCommission");
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching } = useCommissionWalletQuery(
    search.trim() ? { search: search.trim() } : undefined,
  );

  const walletData = data?.data.wallet;
  const recentTransactions = useMemo(
    () => (data?.data.recent_transactions ?? []).map(mapRecentTransactionItem),
    [data],
  );

  if (isLoading && !data) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        <Skeleton className="h-8 w-64" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-4 h-10 w-32" />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-4 h-2.5 w-full rounded-full" />
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-10 w-64 rounded-lg" />
          </div>
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-600 shadow-sm">
          Unable to load commission wallet data.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold">{t("commissionWallet")}</h1>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search transactions..."
            className="h-10 pl-9 text-sm border-gray-200 focus-visible:ring-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <WalletCard
          label={t("totalEarned")}
          amount={walletData?.total_earned}
          icon={CreditCard}
          iconClassName="text-green-500"
          iconBgClassName="bg-green-50"
          className="w-full"
        />
        <WalletCard
          label={t("pendingPayment")}
          amount={walletData?.pending_payment}
          icon={Wallet}
          iconClassName="text-amber-500"
          iconBgClassName="bg-amber-50"
          className="w-full"
        />
        <WalletCard
          label={t("totalPaid")}
          amount={walletData?.total_paid}
          icon={DollarSign}
          iconClassName="text-purple-500"
          iconBgClassName="bg-purple-50"
          className="w-full"
        />
      </div>
      <div>
        <PaymentProgressCard
          title={t("paymentProgress")}
          label={t("paidVsTotalEarned")}
          percent={walletData?.payout_progress}
          className="w-full"
        />
      </div>
      <div>
        <RecentTransactionsCard
          title={t("recentTransactions")}
          currency="$"
          className="w-full"
          transactions={recentTransactions}
          isLoading={isLoading || isFetching}
        />
      </div>
    </div>
  );
};

export default Page;
