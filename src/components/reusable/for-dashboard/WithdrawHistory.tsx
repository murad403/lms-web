import { withdrawalHistory } from "@/lib/instructor";
import { Skeleton } from "@/components/ui/skeleton";
import { formatAmount } from "@/utils/formatter";

type WithdrawHistoryRow = {
  id: number | string;
  withdraw_id?: string;
  user_name?: string;
  bank_name?: string;
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

const legacyRows: WithdrawHistoryRow[] = withdrawalHistory.map((item) => ({
  id: item.id,
  withdraw_id: String(item.id),
  user_name: "-",
  bank_name: item.provider,
  amount: item.amount,
  status: item.status.toLowerCase(),
  date: item.date,
  provider: item.provider,
}));

const WithdrawHistory = ({
  title = "Withdrawal History",
  rows,
  isLoading = false,
  currency = "$",
}: WithdrawHistoryProps) => {
  const tableRows = rows ?? legacyRows;

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-230 text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-3 font-semibold text-gray-700">ID</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-700">User Name</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-700">Bank Name</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-3 font-semibold text-gray-700">Time</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={`history-skeleton-${index}`} className="border-b border-gray-100">
                  <td className="py-3 px-3" colSpan={7}>
                    <Skeleton className="h-7 w-full" />
                  </td>
                </tr>
              ))
            ) : tableRows.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-sm text-gray-400">
                  No withdrawal history found.
                </td>
              </tr>
            ) : (
              tableRows.map((item) => {
                const requestedAt = item.requested_at ? new Date(item.requested_at) : null;
                const isValidDate = requestedAt ? !Number.isNaN(requestedAt.getTime()) : false;
                const numericAmount = typeof item.amount === "string" ? Number(item.amount) : item.amount;

                return (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/60">
                    <td className="py-3 px-3 text-gray-700">{item.id}</td>
                    <td className="py-3 px-3 text-gray-700">{item.user_name || "-"}</td>
                    <td className="py-3 px-3 text-gray-700">{item.bank_name || item.provider || "-"}</td>
                    <td className="py-3 px-3 text-gray-900 font-medium">
                      {Number.isFinite(numericAmount) ? formatAmount(Number(numericAmount), currency) : "-"}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusClassName(String(item.status).toLowerCase())}`}>
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
                        ? requestedAt!.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
                        : "-"}
                    </td>
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
