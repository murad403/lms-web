// WalletEarningsCard.tsx
"use client";

import { Info } from "lucide-react";

interface WalletData {
  total_earned: number;
  total_payable: number;
  total_paid: number;
  payout_progress: number;
}

interface WalletEarningsCardProps {
  wallet: WalletData;
  currency?: string;
}

interface EarningRowProps {
  label: string;
  value: string;
  progress: number;
  tooltip?: string;
}

function EarningRow({ label, value, progress, tooltip }: EarningRowProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-gray-700 font-medium">{label}</span>
          {tooltip && (
            <div className="relative group">
              <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
              <div className="absolute left-5 -top-1 hidden group-hover:block z-10 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        <span className="text-sm font-semibold text-gray-900">{value}</span>
      </div>
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-150 rounded-full overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
        <div
          className="h-full rounded-full bg-gray-700 transition-all duration-700 ease-out"
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

export function WalletEarningsCard({
  wallet,
  currency = "$",
}: WalletEarningsCardProps) {
  const { total_earned, total_payable, total_paid, payout_progress } = wallet;

  const fmt = (val: number) =>
    `${currency}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Derive progress percentages relative to total_earned
  const totalEarnedSafe = total_earned || 1;
  const payableProgress = Math.min((total_payable / totalEarnedSafe) * 100, 100);
  const paidProgress = Math.min((total_paid / totalEarnedSafe) * 100, 100);
  const payoutProgressClamped = Math.min(payout_progress, 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-semibold text-gray-700 tracking-wide">
          Total Earned
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
          All time
        </span>
      </div>

      {/* Big Number */}
      <div className="text-center">
        <span className="text-4xl font-bold text-gray-900 tracking-tight">
          {fmt(total_earned)}
        </span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-5">
        <EarningRow
          label="Total Payable"
          value={fmt(total_payable)}
          progress={payableProgress}
          tooltip="Amount available to withdraw"
        />
        <EarningRow
          label="Total Paid"
          value={fmt(total_paid)}
          progress={paidProgress}
          tooltip="Amount already paid out"
        />
        <EarningRow
          label="Payout Progress"
          value={`${payout_progress.toFixed(1)}%`}
          progress={payoutProgressClamped}
          tooltip="Progress toward next payout threshold"
        />
      </div>
    </div>
  );
}