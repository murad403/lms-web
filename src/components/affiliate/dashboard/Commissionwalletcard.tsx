"use client";

interface CommissionWalletCardProps {
  totalEarned?: number;
  totalPayable?: number;
  totalPaid?: number;
  currency?: string;
  className?: string;
  title: string;
}

function formatAmount(amount: number, currency: string) {
  return `${currency}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function CommissionWalletCard({
  totalEarned = 2845.5,
  totalPayable = 213.75,
  totalPaid = 2631.75,
  currency = "€",
  className = "",
  title,
}: CommissionWalletCardProps) {
  const progress = totalEarned > 0 ? (totalPaid / totalEarned) * 100 : 0;
  const progressPercent = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6 ${className}`}
    >
      {/* Title */}
      <h2 className="text-[18px] font-bold text-gray-900">{title}</h2>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Total Earned */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-400">Total Earned</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatAmount(totalEarned, currency)}
          </p>
        </div>

        {/* Total Payable */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-400">Total Payable</p>
          <p className="text-2xl font-bold text-amber-500">
            {formatAmount(totalPayable, currency)}
          </p>
        </div>

        {/* Total Paid */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-400">Total Paid</p>
          <p className="text-2xl font-bold text-green-500">
            {formatAmount(totalPaid, currency)}
          </p>
        </div>
      </div>

      {/* Payment Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Payment Progress</p>
          <p className="text-sm text-gray-500 font-medium">
            {progressPercent.toFixed(1)}% Paid
          </p>
        </div>
        {/* Track */}
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
