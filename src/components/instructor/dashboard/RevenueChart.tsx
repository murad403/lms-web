"use client";
import { TRevenueData } from "@/lib/instructor";

type RevenueChartProps = {
  data: TRevenueData[];
};

const RevenueChart = ({ data }: RevenueChartProps) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-lg border border-border-light p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-title">Revenue</h3>
        <select className="text-sm text-description border border-gray-200 rounded-md px-2 py-1">
          <option>This month</option>
          <option>Last month</option>
          <option>This year</option>
        </select>
      </div>
      <div className="relative h-48">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-description w-10">
          <span>1m</span>
          <span>500k</span>
          <span>100k</span>
          <span>50k</span>
          <span>1k</span>
          <span>0</span>
        </div>
        {/* Chart area */}
        <div className="ml-12 h-full flex items-end gap-1">
          {data.map((item, index) => {
            const height = (item.value / maxValue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center group relative">
                {/* Tooltip */}
                <div className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  ${item.value.toLocaleString()}
                </div>
                {/* Bar */}
                <div
                  className="w-full max-w-8 bg-gradient-to-t from-main to-main/60 rounded-t-sm transition-all hover:from-main hover:to-main/80 cursor-pointer"
                  style={{ height: `${Math.max(height, 2)}%` }}
                />
                {/* Label */}
                <span className="text-[10px] text-description mt-1 truncate w-full text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
