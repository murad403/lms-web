"use client";

import { CreditCard, Calendar } from "lucide-react";

export type PayoutStatus = "Paid" | "Pending" | "Failed";

export interface Payout {
  payoutId: string;
  date: string;
  method: string;
  amount: number;
  currency?: string;
  status: PayoutStatus;
}

const statusStyles: Record<PayoutStatus, { badge: string }> = {
  Paid: { badge: "bg-[#DCFCE7] text-green-500 py-1 w-20 text-center" },
  Pending: { badge: "bg-amber-100 text-amber-500 py-1 w-20 text-center" },
  Failed: { badge: "bg-red-100 text-red-500 py-1 w-20 text-center" },
};

const defaultPayouts: Payout[] = [
  {
    payoutId: "PAY-2026-02-001",
    date: "February 1, 2026",
    method: "Bank Transfer (IBAN)",
    amount: 845.5,
    status: "Paid",
  },
  {
    payoutId: "PAY-2026-01-001",
    date: "January 1, 2026",
    method: "Bank Transfer (IBAN)",
    amount: 1125.75,
    status: "Paid",
  },
  {
    payoutId: "PAY-2025-12-001",
    date: "December 1, 2025",
    method: "Bank Transfer (IBAN)",
    amount: 660.5,
    status: "Paid",
  },
];

interface PayoutRowProps {
  payout: Payout;
  currency: string;
}

function PayoutRow({ payout, currency }: PayoutRowProps) {
  const { payoutId, date, method, amount, status } = payout;
  const { badge } = statusStyles[status];

  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3.5">
      {/* Left */}
      <div className="flex items-center gap-5">
        <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-[#DCFCE7]">
          <CreditCard className="w-6 h-6 text-green-500" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[16px] font-semibold text-gray-800">
            {payoutId}
          </span>
          <span className="flex items-center gap-1 text-[14px] text-gray-400">
            <Calendar className="w-5 h-5" />
            {date}
          </span>
          <span className="text-sm text-gray-400">{method}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-sm font-bold text-green-500">
          {currency}
          {amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span
          className={`text-xs font-medium py-0.5 rounded-md ${badge}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

interface PayoutHistoryCardProps {
  title?: string;
  payouts?: Payout[];
  currency?: string;
  className?: string;
}

export function PayoutHistoryCard({
  title = "Payout History",
  payouts = defaultPayouts,
  currency = "€",
  className = "",
}: PayoutHistoryCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 ${className}`}
    >
      <h2 className="text-[18px] font-bold text-background-base">{title}</h2>

      <div className="flex flex-col gap-4">
        {payouts.map((payout) => (
          <PayoutRow
            key={payout.payoutId}
            payout={payout}
            currency={currency}
          />
        ))}
      </div>
    </div>
  );
}
