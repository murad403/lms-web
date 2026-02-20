"use client";

import { LucideIcon, Euro } from "lucide-react";

interface EarningsCardProps {
  label?: string;
  amount?: number;
  currency?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  iconBgClassName?: string;
  className?: string;
}

export function WalletCard({
  label = "Total Earned",
  amount = 2845.5,
  currency = "€",
  icon: Icon = Euro,
  iconClassName = "text-purple-500",
  iconBgClassName = "bg-purple-50",
  className = "",
}: EarningsCardProps) {
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-xl ${iconBgClassName}`}
        >
          <Icon className={`w-5 h-5 ${iconClassName}`} />
        </div>
        <span className="text-sm text-gray-400 font-medium">{label}</span>
      </div>

      {/* Amount */}
      <p className="text-3xl font-bold text-gray-900 tracking-tight">
        {currency}
        {formatted}
      </p>
    </div>
  );
}
