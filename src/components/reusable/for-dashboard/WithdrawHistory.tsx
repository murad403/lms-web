import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatAmount } from "@/utils/formatter";

export type WithdrawHistoryRow = {
  id: number | string;
  withdraw_id?: string;
  user_name?: string;
  bank_name?: string;
  bank_last4?: string;
  amount: string | number;
  status: string;
  requested_at?: string;
  date?: string;
  provider?: string;
};

interface WithdrawHistoryProps {
  title?: string;
  rows?: WithdrawHistoryRow[];
  isLoading?: boolean;
  currency?: string;
  showCancelAction?: boolean;
  onCancelWithdraw?: (row: WithdrawHistoryRow) => void;
  cancellingWithdrawId?: string | number | null;
}

const toTitleCase = (value: string) => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

const statusClassName = (status: string) => {
  if (status === "completed") return "text-green-700 bg-green-50 border-green-200";
  if (status === "pending") return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-red-700 bg-red-50 border-red-200";
};

const COLUMNS = ["Withdraw ID", "User Name", "Bank Name", "Amount", "Status", "Date", "Time"];

const RowSkeleton = ({ showCancelAction }: { showCancelAction: boolean }) => (
  <tr className="border-b border-gray-100">
    <td className="py-3 px-3">
      <Skeleton className="h-5 w-28 rounded-md" />
    </td>
    <td className="py-3 px-3">
      <Skeleton className="h-5 w-20 rounded-md" />
    </td>
    <td className="py-3 px-3">
      <Skeleton className="h-5 w-32 rounded-md" />
    </td>
    <td className="py-3 px-3">
      <Skeleton className="h-5 w-16 rounded-md" />
    </td>
    <td className="py-3 px-3">
      <Skeleton className="h-6 w-20 rounded-full" />
    </td>
    <td className="py-3 px-3">
      <Skeleton className="h-5 w-20 rounded-md" />
    </td>
    <td className="py-3 px-3">
      <Skeleton className="h-5 w-16 rounded-md" />
    </td>
    {showCancelAction && (
      <td className="py-3 px-3">
        <Skeleton className="h-9 w-28 rounded-md" />
      </td>
    )}
  </tr>
);

const WithdrawHistory = ({
  title = "Withdrawal History",
  rows,
  isLoading = false,
  currency = "$",
  showCancelAction = false,
  onCancelWithdraw,
  cancellingWithdrawId = null,
}: WithdrawHistoryProps) => {
  const tableRows = rows ?? [];
  const columns = showCancelAction ? [...COLUMNS, "Action"] : COLUMNS;

  return (
    <section className="border border-gray-100 bg-white p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">Latest withdrawal requests and their current status.</p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-230 text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((col) => (
                <th key={col} className="text-left py-3 px-3 font-semibold text-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <RowSkeleton key={`history-skeleton-${index}`} showCancelAction={showCancelAction} />
              ))
            ) : tableRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-10 text-center text-sm text-gray-400">
                  No withdrawal history found.
                </td>
              </tr>
            ) : (
              tableRows.map((item) => {
                const requestedAt = item.requested_at ? new Date(item.requested_at) : null;
                const isValidDate = requestedAt ? !Number.isNaN(requestedAt.getTime()) : false;
                const numericAmount =
                  typeof item.amount === "string" ? Number(item.amount) : item.amount;
                const normalizedStatus = String(item.status).toLowerCase();
                const isCompleted = normalizedStatus === "completed" || normalizedStatus === "rejected" || normalizedStatus === "cancelled";
                const isCancelling =
                  cancellingWithdrawId !== null &&
                  (cancellingWithdrawId === item.withdraw_id || cancellingWithdrawId === item.id);
                const bankDisplay = [item.bank_name, item.bank_last4 ? `••••${item.bank_last4}` : null]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/60">
                    <td className="py-3 px-3 text-gray-700 font-mono text-xs">
                      {item.withdraw_id || item.id}
                    </td>
                    <td className="py-3 px-3 text-gray-700">{item.user_name || "-"}</td>
                    <td className="py-3 px-3 text-gray-700">
                      {bankDisplay || item.provider || "-"}
                    </td>
                    <td className="py-3 px-3 text-gray-900 font-medium">
                      {Number.isFinite(numericAmount)
                        ? formatAmount(Number(numericAmount), currency)
                        : "-"}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusClassName(
                          normalizedStatus
                        )}`}
                      >
                        {toTitleCase(String(item.status))}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      {isValidDate
                        ? requestedAt!.toLocaleDateString("en-US")
                        : item.date || "-"}
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      {isValidDate
                        ? requestedAt!.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>
                    {showCancelAction && (
                      <td className="py-3 px-3">
                        {!isCompleted ? (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            disabled={!onCancelWithdraw || isCancelling}
                            onClick={() => onCancelWithdraw?.(item)}
                          >
                            {isCancelling ? "Cancelling..." : "Cancel Withdraw"}
                          </Button>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default WithdrawHistory;