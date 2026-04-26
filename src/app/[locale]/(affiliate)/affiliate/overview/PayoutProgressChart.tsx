/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface PayoutProgressChartProps {
  labels: string[];
  values: number[];
  currentMonth: number;
  lastMonth: number;
  overall: number;
}

const COLORS = ["#3b82f6", "#e5e7eb"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3">
        <p className="text-xs text-gray-500">{payload[0].name}</p>
        <p className="text-sm font-bold text-gray-900">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export function PayoutProgressChart({
  labels,
  values,
  currentMonth,
  lastMonth,
  overall,
}: PayoutProgressChartProps) {
  const chartData = labels.map((label, i) => ({ name: label, value: values[i] }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-700">Payout Progress</h3>
        <p className="text-xs text-gray-400 mt-0.5">Doughnut breakdown</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Doughnut */}
        <div className="relative w-36 h-36 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={62}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                strokeWidth={0}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-gray-900">{overall}%</span>
            <span className="text-[10px] text-gray-400">overall</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-3 flex-1">
          {chartData.map((entry, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-xs text-gray-600">{entry.name}</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">{entry.value}%</span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-2 flex flex-col gap-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">This month</span>
              <span className="font-semibold text-gray-700">{currentMonth}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Last month</span>
              <span className="font-semibold text-gray-700">{lastMonth}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}