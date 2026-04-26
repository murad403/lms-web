/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { YearlyEarnedDataPoint } from "@/redux/features/affiliate/affiliate.type";
import { XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, AreaChart
} from "recharts";

interface YearlyEarningsChartProps {
  data: YearlyEarnedDataPoint[];
  currency?: string;
}



const CustomTooltip = ({ active, payload, label, currency }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-bold text-gray-900">
          {currency}{payload[0].value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
};

export function YearlyEarningsChart({ data, currency = "$" }: YearlyEarningsChartProps) {
  const shortLabels = data.map((d) => {
    const [month, year] = d.month.split(" ");
    return { ...d, shortMonth: `${month.slice(0, 3)} '${year.slice(2)}` };
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Yearly Earnings</h3>
          <p className="text-xs text-gray-400 mt-0.5">Last 12 months</p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-3 py-1 rounded-full">
          {currency}{data.reduce((s, d) => s + d.total_earned, 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={shortLabels} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey="shortMonth"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${currency}${v}`}
          />
          <Tooltip content={<CustomTooltip currency={currency} />} />
          <Area
            type="monotone"
            dataKey="total_earned"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#earningsGradient)"
            dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}