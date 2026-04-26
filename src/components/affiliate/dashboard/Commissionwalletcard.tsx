"use client";
import { formatAmount } from "@/utils/formatter";
import { useTranslations } from "next-intl";
interface CommissionWalletCardProps {
  totalEarned?: number;
  totalPayable?: number;
  totalPaid?: number;
  payoutProgress?: number;
  currency?: string;
  className?: string;
  title: string;
}

export function CommissionWalletCard({
  totalEarned = 0,
  totalPayable = 0,
  totalPaid = 0,
  payoutProgress = 0,
  currency = "$",
  className = "",
  title,
}: CommissionWalletCardProps) {

  const t = useTranslations("AffiliateDashboard");

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6 ${className}`}
    >
      {/* Title */}
      <h2 className="text-[18px] font-bold text-gray-900">{title}</h2>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Earned */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-400">{t("totalEarned")}</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatAmount(totalEarned, currency)}
          </p>
        </div>

        {/* Total Payable */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-400">{t("totalPayable")}</p>
          <p className="text-2xl font-bold text-amber-500">
            {formatAmount(totalPayable, currency)}
          </p>
        </div>

        {/* Total Paid */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-400">{t("totalPaid")}</p>
          <p className="text-2xl font-bold text-green-500">
            {formatAmount(totalPaid, currency)}
          </p>
        </div>
      </div>

      {/* Payment Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">{t("paymentProgress")}</p>
          <p className="text-sm text-gray-500 font-medium">
            {payoutProgress.toFixed(1)}% {t("paid")}
          </p>
        </div>
        {/* Track */}
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${payoutProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
