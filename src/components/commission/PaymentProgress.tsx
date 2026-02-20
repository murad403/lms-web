"use client";

interface PaymentProgressCardProps {
  title?: string;
  label?: string;
  percent?: number;
  progressClassName?: string;
  className?: string;
}

export function PaymentProgressCard({
  title = "Payment Progress",
  label = "Paid vs Total Earned",
  percent = 92.5,
  progressClassName = "bg-blue-600",
  className = "",
}: PaymentProgressCardProps) {
  const clamped = Math.min(Math.max(percent, 0), 100);

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex flex-col gap-6 ${className}`}
    >
      {/* Title */}
      <h2 className="text-[18px] font-bold text-background-base">{title}</h2>

      {/* Label + Percent */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{label}</span>
          <span className="text-sm text-gray-500 font-medium">{clamped}%</span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressClassName}`}
            style={{ width: `${clamped}%` }}
          />
        </div>
      </div>
    </div>
  );
}
