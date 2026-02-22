"use client";

import { LucideIcon, Building2, Landmark } from "lucide-react";

export interface PaymentMethodCardProps {
  title?: string;
  methodName?: string;
  accountNumber?: string;
  note?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  iconBgClassName?: string;
  className?: string;
}

export function PaymentMethodCard({
  title = "Payment Method",
  methodName = "Bank Transfer (IBAN)",
  accountNumber = "DE89 3704 0044 0532 0130 00",
  note = "Payments are processed monthly on the 1st",
  icon: Icon = Landmark,
  iconClassName = "text-blue-400",
  iconBgClassName = "bg-blue-50",
  className = "",
}: PaymentMethodCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-6 ${className}`}
    >
      {/* Title */}
      <h2 className="text-[18px] font-bold text-background-base">{title}</h2>

      {/* Method Row */}
      <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3.5">
        {/* Icon */}
        <div
          className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ${iconBgClassName}`}
        >
          <Icon className={`w-5 h-5 ${iconClassName}`} />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <span className="text-[16px] font-semibold text-gray-800">
            {methodName}
          </span>
          <span className="text-[14px] text-gray-500">{accountNumber}</span>
          <span className="text-sm text-gray-400">{note}</span>
        </div>
      </div>
    </div>
  );
}
