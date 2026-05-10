/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import InstructorEarningStats from "../../../../../components/reusable/for-dashboard/InstructorEarningStats";
import RevenueChart from "../../../../../components/reusable/for-dashboard/RevenueChart";
import WithdrawHistory, { WithdrawHistoryRow } from "../../../../../components/reusable/for-dashboard/WithdrawHistory";
import { formatAmount } from "@/utils/formatter";
import { useTranslations } from "next-intl";
import { useOrganizationEarningsQuery, useStripeConnectMutation, useStripeDashboardLinkMutation, useWithdrawRequestMutation } from "@/redux/features/organization/organization.api";
import { useCancelWithdrawRequestMutation } from "@/redux/features/instructor/instructor.api";



const SectionSkeleton = ({ titleWidth = 160, lines = 2 }: { titleWidth?: number; lines?: number }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
    <div className="space-y-2">
      <Skeleton className="h-5" style={{ width: titleWidth }} />
      <Skeleton className="h-4 w-full max-w-md" />
    </div>

    {lines === 1 ? (
      <Skeleton className="h-11 w-full max-w-xs" />
    ) : (
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-44" />
      </div>
    )}
  </div>
);

const WithdrawalFormSkeleton = () => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
    <div className="space-y-2">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-4 w-full max-w-sm" />
    </div>

    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-3 w-52" />
      </div>
      <Skeleton className="h-10 w-44" />
    </div>
  </div>
);

const RevenueChartSkeleton = () => (
  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border-light">
      <Skeleton className="h-6 w-44" />
      <Skeleton className="h-4 w-24" />
    </div>

    <div className="relative h-95 sm:h-100 lg:h-105">
      <div className="absolute left-0 top-0 bottom-6 sm:bottom-8 flex flex-col justify-between w-8 gap-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={`y-skeleton-${index}`} className="h-3 w-8" />
        ))}
      </div>

      <div className="absolute left-8 sm:left-10 right-0 top-0 bottom-6 sm:bottom-8 rounded-lg border border-dashed border-gray-100 bg-gray-50/60 p-3">
        <div className="flex h-full items-end gap-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={`bar-skeleton-${index}`} className="flex-1 flex items-end">
              <Skeleton className="h-[40%] w-full rounded-t-md" style={{ height: `${30 + (index % 5) * 10}%` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-8 sm:left-10 right-0 bottom-0 flex justify-between gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={`x-skeleton-${index}`} className="h-3 flex-1" />
        ))}
      </div>
    </div>
  </div>
);

const toTitleCase = (value: string) => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

const toNumericAmount = (value?: string | number | null) => {
  const parsed = typeof value === "string" ? Number(value) : value;
  return Number.isFinite(parsed) ? Number(parsed) : 0;
};

type LastRequest = {
  withdrawId: string;
  amount: string;
  status: string;
};

const EarningsPage = () => {
  const t = useTranslations("InstructorEarnings");
  const [amount, setAmount] = useState("");
  const [lastRequest, setLastRequest] = useState<LastRequest | null>(null);
  const [cancellingWithdrawId, setCancellingWithdrawId] = useState<string | null>(null);

  const { data: earningsResponse, isLoading: isEarningsLoading, isFetching: isEarningsFetching } = useOrganizationEarningsQuery(undefined);

  const [stripeConnect, { isLoading: isConnectLoading }] = useStripeConnectMutation();
  const [stripeDashboardLink, { isLoading: isDashboardLoading }] = useStripeDashboardLinkMutation();
  const [withdrawRequest, { isLoading: isRequestLoading }] = useWithdrawRequestMutation();
  const [cancelWithdrawRequest, { isLoading: isCancelLoading }] = useCancelWithdrawRequestMutation();

  const earningsData = earningsResponse?.data;
  const currentBalance = toNumericAmount(earningsData?.current_balance);
  const numericAmount = Number(amount);
  const hasValidAmount = Number.isFinite(numericAmount) && numericAmount > 0;
  const canSubmit = hasValidAmount && numericAmount <= currentBalance && currentBalance > 0;

  const chartData = useMemo(
    () =>
      (earningsData?.monthly_revenue_chart ?? []).map((item: any) => ({
        label: item.label,
        value: toNumericAmount(item.amount),
      })),
    [earningsData?.monthly_revenue_chart]
  );

  const historyRows = useMemo<WithdrawHistoryRow[]>(
    () =>
      (earningsData?.withdrawals ?? []).map((item: any) => ({
        id: item.id,
        withdraw_id: item.withdraw_id,
        user_name: item.user_name,
        bank_name: item.bank_name ?? undefined,
        bank_last4: item.bank_last4 ?? undefined,
        amount: item.amount,
        status: item.status,
        requested_at: item.requested_at,
      })),
    [earningsData?.withdrawals]
  );

  const handleConnect = async () => {
    try {
      const response = await stripeConnect().unwrap();
      const connectData = response.data;

      const isStripeReady =
        connectData.charges_enabled &&
        connectData.payouts_enabled &&
        connectData.details_submitted;

      if (isStripeReady) {
        const dashboardResponse = await stripeDashboardLink().unwrap();
        toast.success("Stripe is already connected. Opening dashboard...");
        window.open(dashboardResponse.data.url, "_blank", "noopener,noreferrer");
        return;
      }

      toast.success(response.message || "Stripe onboarding link generated successfully.");
      window.open(connectData.onboarding_url, "_blank", "noopener,noreferrer");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof (error as { data?: { message?: string } }).data?.message === "string"
          ? (error as { data?: { message?: string } }).data?.message
          : "Failed to start Stripe onboarding";

      toast.error(message);
    }
  };

  const handleOpenDashboard = async () => {
    try {
      const response = await stripeDashboardLink().unwrap();
      toast.success(response.message || "Stripe dashboard link generated successfully.");
      window.open(response.data.url, "_blank", "noopener,noreferrer");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof (error as { data?: { message?: string } }).data?.message === "string"
          ? (error as { data?: { message?: string } }).data?.message
          : "Failed to open Stripe dashboard";

      toast.error(message);
    }
  };

  const handleWithdrawalSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      toast.error("Enter a valid amount up to your current balance.");
      return;
    }

    try {
      const response = await withdrawRequest({ amount: numericAmount }).unwrap();
      setLastRequest({
        withdrawId: response.data.withdraw_id,
        amount: response.data.amount,
        status: response.data.status,
      });
      toast.success(response.message || "Withdraw request submitted");
      setAmount("");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof (error as { data?: { message?: string } }).data?.message === "string"
          ? (error as { data?: { message?: string } }).data?.message
          : "Failed to submit withdrawal request";

      toast.error(message);
    }
  };

  const handleCancelWithdraw = async (row: WithdrawHistoryRow) => {
    const withdrawId = String(row.withdraw_id || "").trim();
    if (!withdrawId) {
      toast.error("Withdraw ID is missing.");
      return;
    }

    try {
      setCancellingWithdrawId(withdrawId);
      const response = await cancelWithdrawRequest({ withdrawId }).unwrap();
      toast.success(response.message || "Withdraw request cancelled successfully.");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof (error as { data?: { message?: string } }).data?.message === "string"
          ? (error as { data?: { message?: string } }).data?.message
          : "Failed to cancel withdrawal request";

      toast.error(message);
    } finally {
      setCancellingWithdrawId(null);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <InstructorEarningStats
        totalRevenue={earningsData?.total_revenue}
        currentBalance={earningsData?.current_balance}
        totalWithdrawals={earningsData?.total_withdrawals}
        todayRevenue={earningsData?.today_revenue}
        isLoading={isEarningsLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isEarningsLoading && !earningsResponse ? (
          <>
            <SectionSkeleton titleWidth={180} lines={2} />
            <WithdrawalFormSkeleton />
          </>
        ) : (
          <>
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Stripe Connection</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Connect Stripe, verify account status, and open your Stripe Express dashboard.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleConnect}
                  disabled={isConnectLoading}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  {isConnectLoading ? "Generating..." : "Connect Stripe"}
                </Button>
                <Button
                  onClick={handleOpenDashboard}
                  disabled={isDashboardLoading}
                  variant="outline"
                  className="cursor-pointer"
                >
                  {isDashboardLoading ? "Opening..." : "Open Stripe Dashboard"}
                </Button>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Withdrawal Request</h2>
                <p className="mt-1 text-sm text-gray-500">Submit a withdrawal amount.</p>
              </div>

              <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="instructor-withdraw-amount"
                  >
                    Amount
                  </label>
                  <Input
                    id="instructor-withdraw-amount"
                    type="number"
                    min={1}
                    step="0.01"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="Enter amount"
                  />
                  <p className="text-xs text-gray-500">
                    Maximum available: {formatAmount(currentBalance, "$")}
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={!canSubmit || isRequestLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                >
                  {isRequestLoading ? "Submitting..." : "Submit Withdrawal"}
                </Button>
              </form>

              {lastRequest && (
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">Latest Request</p>
                  <p>
                    <span className="font-medium">Withdraw ID:</span> {lastRequest.withdrawId}
                  </p>
                  <p>
                    <span className="font-medium">Amount:</span>{" "}
                    {formatAmount(Number(lastRequest.amount), "$")}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span> {toTitleCase(lastRequest.status)}
                  </p>
                </div>
              )}
            </section>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          {isEarningsLoading && !earningsResponse ? (
            <RevenueChartSkeleton />
          ) : (
            <RevenueChart
              pathColor="#23BD33"
              strokeColor="#23BD33"
              title={t("statistic")}
              data={chartData}
            />
          )}
        </div>

        {(isEarningsFetching || isConnectLoading || isDashboardLoading || isRequestLoading || isCancelLoading) && (
          <div className="xl:col-span-1 flex xl:justify-end items-start">
            <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 bg-blue-50">
              Processing
            </Badge>
          </div>
        )}
      </div>

      <div>
        <WithdrawHistory
          title="Withdrawal History"
          rows={historyRows}
          isLoading={isEarningsLoading || isEarningsFetching}
          currency="$"
          showCancelAction
          onCancelWithdraw={handleCancelWithdraw}
          cancellingWithdrawId={cancellingWithdrawId}
        />
      </div>
    </div>
  );
};

export default EarningsPage;
