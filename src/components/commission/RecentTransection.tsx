"use client";

export type TransactionStatus = "Paid" | "Approved" | "Pending";

export interface Transaction {
  orderId: string;
  course: string;
  date: string;
  amount: number;
  currency?: string;
  status: TransactionStatus;
}

interface TransactionRowProps {
  transaction: Transaction;
  currency: string;
}

const statusColors: Record<TransactionStatus, string> = {
  Paid: "text-gray-400",
  Approved: "text-gray-400",
  Pending: "text-gray-400",
};

function TransactionRow({ transaction, currency }: TransactionRowProps) {
  const { orderId, course, date, amount, status } = transaction;

  return (
    <div className="flex  border items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
      {/* Left */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[16px] font-medium text-background-base">
          {orderId} - {course}
        </span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-[18px] font-bold text-[#16A34A]">
          +{currency}
          {amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span className={`text-xs ${statusColors[status]}`}>{status}</span>
      </div>
    </div>
  );
}

interface RecentTransactionsCardProps {
  title?: string;
  transactions?: Transaction[];
  currency?: string;
  className?: string;
}

export function RecentTransactionsCard({
  title = "Recent Transactions",
  transactions = [],
  currency = "€",
  className = "",
}: RecentTransactionsCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 ${className}`}
    >
      <h2 className="text-[18px] font-bold text-background-base">{title}</h2>

      <div className="flex flex-col gap-4">
        {transactions.map((tx) => (
          <TransactionRow
            key={tx.orderId}
            transaction={tx}
            currency={currency}
          />
        ))}
      </div>
    </div>
  );
}
