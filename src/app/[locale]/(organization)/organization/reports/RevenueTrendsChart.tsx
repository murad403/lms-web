"use client";
import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl';
import { useGetRevenueTrendsQuery } from '@/redux/features/organization/organization.api';
import { Skeleton } from '@/components/ui/skeleton';

const RevenueTrendsChart = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const t = useTranslations("OrganizationReports");
  const { data, isLoading } = useGetRevenueTrendsQuery();

  const chartData = useMemo(() => {
    return data?.data?.map(item => ({
      label: item.label,
      amount: parseFloat(item.amount)
    })) || [];
  }, [data]);

  const maxAmount = useMemo(() => {
    const max = Math.max(...chartData.map(d => d.amount), 0);
    return max > 0 ? max * 1.2 : 1000; // Give some headroom
  }, [chartData]);

  const yAxisLabels = useMemo(() => {
    return [
      `$${(maxAmount).toFixed(0)}`,
      `$${(maxAmount * 0.75).toFixed(0)}`,
      `$${(maxAmount * 0.5).toFixed(0)}`,
      `$${(maxAmount * 0.25).toFixed(0)}`,
      "$0"
    ];
  }, [maxAmount]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 border border-border-light h-[380px]">
         <div className="space-y-2 mb-8">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
         </div>
         <div className="flex gap-4 items-end h-52">
            <div className="flex flex-col justify-between h-full py-2">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-3 w-8" />)}
            </div>
            <div className="flex-1 flex gap-4 h-full items-end">
                {[70, 45, 80, 50, 90, 35, 60, 40, 85, 55, 75, 30].map((h, i) => (
                    <Skeleton key={i} className="flex-1 h-full rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-border-light p-6">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-title">{t("revenueTrends")}</h3>
        <p className="text-sm text-description mt-1">{t("revenueTrendsDesc")}</p>
      </div>

      {/* Chart */}
      <div className="flex">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between h-56 pr-4 text-[10px] font-bold text-description/50 uppercase tracking-tighter">
          {yAxisLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        {/* Right side: bars + month labels */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Bars container */}
          <div className="relative flex items-end gap-1.5 sm:gap-3 h-56 border-l border-b border-border-light/50 pl-4">
            {/* Grid Lines */}
            <div className="absolute inset-0 pl-4 pointer-events-none">
                {[0.25, 0.5, 0.75].map((tick) => (
                    <div 
                        key={tick} 
                        className="absolute w-full border-t border-gray-100/50" 
                        style={{ bottom: `${tick * 100}%` }}
                    />
                ))}
            </div>

            {chartData.map((bar, index) => {
              const heightPercent = (bar.amount / maxAmount) * 100;
              return (
                <div
                  key={bar.label}
                  className="flex-1 flex items-end justify-center group"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="relative w-full flex justify-center items-end h-full">
                    {hoveredBar === index && (
                      <div className="absolute -top-10 bg-title text-white px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap z-20 shadow-xl animate-in fade-in zoom-in duration-200">
                        ${bar.amount.toLocaleString()}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-title" />
                      </div>
                    )}
                    <div
                      className={`w-full max-w-[48px] rounded-t-sm transition-all duration-300 cursor-pointer ${hoveredBar === index ? 'bg-main shadow-lg shadow-main/20' : 'bg-main/10 hover:bg-main/30'}`}
                      style={{
                        height: `${Math.max(heightPercent, 2)}%`, 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Month Labels */}
          <div className="flex gap-1.5 sm:gap-3 pl-4 pt-4 overflow-x-auto no-scrollbar">
            {chartData.map((bar) => (
              <div key={bar.label} className="flex-1 flex justify-center min-w-[20px]">
                <span className="text-[9px] sm:text-[10px] font-bold text-description/60 uppercase tracking-tighter truncate">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueTrendsChart;
