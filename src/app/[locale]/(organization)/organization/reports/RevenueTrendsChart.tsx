"use client";
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl';

const revenueData = [
  { day: "Mon", revenue: 19000 },
  { day: "Tue", revenue: 22000 },
  { day: "Wed", revenue: 15000 },
  { day: "Thu", revenue: 28000 },
  { day: "Fri", revenue: 24000 },
  { day: "Sat", revenue: 18000 },
  { day: "Sun", revenue: 14000 },
];

const yAxisLabels = ["$34K", "$25.5K", "$17K", "$8.5K", "$0k"];
const maxRevenue = 34000;

const RevenueTrendsChart = () => {
  const [chartFilter, setChartFilter] = useState("6months");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const t = useTranslations("OrganizationReports");

  return (
    <div className="bg-white rounded-md p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-title">{t("revenueTrends")}</h3>
          <p className="text-sm text-description mt-0.5">{t("revenueTrendsDesc")}</p>
        </div>
        <div className="relative">
          <select
            value={chartFilter}
            onChange={(e) => setChartFilter(e.target.value)}
            className="appearance-none text-sm text-title pl-4 pr-9 py-2 bg-white border border-border-light rounded-md focus:outline-none focus:border-main cursor-pointer"
          >
            <option value="6months">{t("last6Months")}</option>
            <option value="12months">{t("last12Months")}</option>
            <option value="year">{t("thisYear")}</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description pointer-events-none" />
        </div>
      </div>

      {/* Chart */}
      <div className="flex">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between h-52 pr-3 text-xs text-description">
          {yAxisLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        {/* Right side: bars + day labels */}
        <div className="flex-1 flex flex-col">
          {/* Bars */}
          <div className="flex items-end gap-3 sm:gap-6 h-52 border-l border-b border-gray-200 pl-4">
            {revenueData.map((bar, index) => {
              const heightPercent = (bar.revenue / maxRevenue) * 100;
              return (
                <div
                  key={bar.day}
                  className="flex-1 flex items-end justify-center"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="relative w-full flex justify-center h-48">
                    {hoveredBar === index && (
                      <div className="absolute -top-7 bg-[#042F54] text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                        ${bar.revenue.toLocaleString()}
                      </div>
                    )}
                    <div
                      className="w-full max-w-20 rounded-t-md transition-colors cursor-pointer bg-[#042F54] hover:bg-[#042F54]/90"
                      style={{
                        height: `${heightPercent}%`,
                        marginTop: "auto",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Day Labels */}
          <div className="flex gap-3 sm:gap-6 pl-4 pt-2">
            {revenueData.map((bar) => (
              <div key={bar.day} className="flex-1 flex justify-center">
                <span className="text-xs text-description">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueTrendsChart
