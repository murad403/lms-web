/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
interface ClicksPieChartProps {
    labels: string[];
    values: number[];
}

const COLORS = ["#3b82f6", "#f59e0b", "#10b981"];




const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3">
                <p className="text-xs text-gray-500">{payload[0].name}</p>
                <p className="text-sm font-bold text-gray-900">{payload[0].value} clicks</p>
            </div>
        );
    }
    return null;
};

const CustomLegend = ({ payload }: any) => (
    <div className="flex flex-col gap-2 mt-2">
        {payload.map((entry: any, i: number) => (
            <div key={i} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-xs text-gray-600">{entry.value}</span>
                </div>
                <span className="text-xs font-semibold text-gray-800">{entry.payload.value}</span>
            </div>
        ))}
    </div>
);

export function ClicksPieChart({ labels, values }: ClicksPieChartProps) {
    const chartData = labels.map((label, i) => ({ name: label, value: values[i] }));
    const total = values.reduce((a, b) => a + b, 0);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
            <div>
                <h3 className="text-sm font-semibold text-gray-700">Clicks Breakdown</h3>
                <p className="text-xs text-gray-400 mt-0.5">Current vs last month vs total</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-32 h-32 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={36}
                                outerRadius={58}
                                dataKey="value"
                                strokeWidth={0}
                            >
                                {chartData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xl font-bold text-gray-900">{total}</span>
                        <span className="text-[10px] text-gray-400">total</span>
                    </div>
                </div>

                <div className="flex-1">
                    <CustomLegend payload={chartData.map((d, i) => ({ value: d.name, color: COLORS[i], payload: d }))} />
                </div>
            </div>
        </div>
    );
}