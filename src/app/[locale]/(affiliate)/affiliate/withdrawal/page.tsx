"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCommissionWalletQuery,
  useStripeConnectMutation,
  useStripeDashboardMutation,
  useWithdrawalHistoryQuery,
  useWithdrawalRequestMutation,
} from "@/redux/features/affiliate/affiliate.api";
import { formatAmount } from "@/utils/formatter";
import WithdrawHistory from "@/components/reusable/for-dashboard/WithdrawHistory";
import Pagination from "@/components/reusable/Pagination";

const toTitleCase = (value: string) => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

const CardSkeleton = () => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
    <Skeleton className="h-4 w-28" />
    <Skeleton className="h-9 w-40" />
  </div>
);

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

const HistorySkeleton = () => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
    <div className="space-y-2">
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-4 w-72" />
    </div>

    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </div>
  </div>
);

const Page = () => {
  const [amount, setAmount] = useState("");
  const [lastRequest, setLastRequest] = useState<{
    withdrawId: string;
    amount: string;
    status: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: walletResponse,
    isLoading: isWalletLoading,
    isFetching: isWalletFetching,
  } = useCommissionWalletQuery();

  const {
    data: historyResponse,
    isLoading: isHistoryLoading,
    isFetching: isHistoryFetching,
  } = useWithdrawalHistoryQuery({ page: currentPage, page_size: 10 });

  const [stripeConnect, { isLoading: isConnectLoading }] = useStripeConnectMutation();
  const [stripeDashboard, { isLoading: isDashboardLoading }] = useStripeDashboardMutation();
  const [withdrawalRequest, { isLoading: isRequestLoading }] = useWithdrawalRequestMutation();

  const wallet = walletResponse?.data.wallet;
  const historyItems = historyResponse?.data?.data ?? [];
  // Always fall back to 1 so Pagination still renders during loading
  const totalPages = historyResponse?.total_pages ?? 1;
  const numericAmount = Number(amount);
  const hasValidAmount = Number.isFinite(numericAmount) && numericAmount > 0;
  const maxWithdraw = wallet?.total_payable ?? 0;
  const canSubmit = hasValidAmount && numericAmount <= maxWithdraw && maxWithdraw > 0;

  const showWalletSkeleton = isWalletLoading && !walletResponse;
  const showHistorySkeleton = isHistoryLoading && !historyResponse;

  const handleConnect = async () => {
    try {
      const response = await stripeConnect().unwrap();
      const connectData = response.data;

      const isStripeReady =
        connectData.charges_enabled &&
        connectData.payouts_enabled &&
        connectData.details_submitted;

      if (isStripeReady) {
        const dashboardResponse = await stripeDashboard().unwrap();
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
      const response = await stripeDashboard().unwrap();
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
      toast.error("Enter a valid amount up to your available payable balance.");
      return;
    }

    try {
      const response = await withdrawalRequest({ amount: numericAmount }).unwrap();
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

  if (!showWalletSkeleton && (!walletResponse || !wallet)) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-600 shadow-sm">
          Unable to load withdrawal wallet data.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between gap-3">
          {showWalletSkeleton ? (
            <Skeleton className="h-8 w-56" />
          ) : (
            <h1 className="text-xl sm:text-2xl font-semibold">Withdrawal</h1>
          )}
          {(isWalletFetching ||
            isHistoryFetching ||
            isConnectLoading ||
            isDashboardLoading ||
            isRequestLoading) && (
            <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 bg-blue-50">
              Processing
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {showWalletSkeleton ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Available Payable</p>
                <p className="mt-2 text-3xl font-bold text-amber-500">
                  {formatAmount(wallet?.total_payable ?? 0, "$")}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Total Paid</p>
                <p className="mt-2 text-3xl font-bold text-green-600">
                  {formatAmount(wallet?.total_paid ?? 0, "$")}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Total Earned</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {formatAmount(wallet?.total_earned ?? 0, "$")}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {showWalletSkeleton ? (
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
                      htmlFor="withdraw-amount"
                    >
                      Amount
                    </label>
                    <Input
                      id="withdraw-amount"
                      type="number"
                      min={1}
                      step="0.01"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      placeholder="Enter amount"
                    />
                    <p className="text-xs text-gray-500">
                      Maximum available: {formatAmount(maxWithdraw, "$")}
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
                      <span className="font-medium">Status:</span>{" "}
                      {toTitleCase(lastRequest.status)}
                    </p>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>

      {/* History section — skeleton + table always render; Pagination always renders */}
      <div className="space-y-4 px-4 sm:px-6 lg:px-8">
        {showHistorySkeleton ? (
          <HistorySkeleton />
        ) : (
          <WithdrawHistory
            title="Withdrawal History"
            rows={historyItems}
            isLoading={isHistoryLoading || isHistoryFetching}
            currency="$"
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
};

export default Page;