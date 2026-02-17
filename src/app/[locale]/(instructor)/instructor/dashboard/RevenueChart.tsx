/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { TRevenueData } from "@/lib/instructor";

type RevenueChartProps = {
  data: TRevenueData[];
};

const RevenueChart = ({ data: _data }: RevenueChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Extended demo data for smoother curve
  const chartData: TRevenueData[] = [
    { label: "Aug 01", value: 85000 },
    { label: "Aug 03", value: 92000 },
    { label: "Aug 05", value: 78000 },
    { label: "Aug 07", value: 51749 },
    { label: "Aug 09", value: 88000 },
    { label: "Aug 11", value: 95000 },
    { label: "Aug 13", value: 82000 },
    { label: "Aug 15", value: 75000 },
    { label: "Aug 17", value: 89000 },
    { label: "Aug 19", value: 98000 },
    { label: "Aug 21", value: 85000 },
    { label: "Aug 23", value: 72000 },
    { label: "Aug 25", value: 88000 },
    { label: "Aug 27", value: 95000 },
    { label: "Aug 29", value: 82000 },
    { label: "Aug 31", value: 92000 },
  ];

  const maxValue = 1000000; // 1m for y-axis scale

  // Create smooth bezier curve
  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? i : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  };

  const points = chartData.map((d, i) => ({
    x: (i / (chartData.length - 1)) * 100,
    y: 100 - (d.value / maxValue) * 100,
  }));

  const linePath = createSmoothPath(points);
  const areaPath = linePath + ` L 100 100 L 0 100 Z`;

  const yAxisLabels = ["1m", "500k", "100k", "50k", "10k", "1k", "0"];
  const xAxisLabels = ["Aug 01", "Aug 10", "Aug 20", "Aug 31", "Aug 31"];

  return (
    <div className="bg-white p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border-light">
        <h3 className="text-base sm:text-lg font-semibold text-title">Revenue</h3>
        <select className="text-xs sm:text-sm text-description px-2 sm:px-3 bg-white focus:outline-none w-fit">
          <option>This month</option>
          <option>Last month</option>
          <option>This year</option>
        </select>
      </div>

      <div className="relative h-95 sm:h-105 lg:h-120">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 sm:bottom-8 flex flex-col justify-between text-[10px] sm:text-xs text-description w-6 sm:w-8">
          {yAxisLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        {/* Chart area */}
        <div className="absolute left-8 sm:left-10 right-0 top-0 bottom-6 sm:bottom-8">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#564FFD" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#564FFD" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Area fill */}
            <path d={areaPath} fill="url(#revenueGradient)" />

            {/* Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#564FFD"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: '3px' }}
            />
          </svg>

          {/* Interactive overlay */}
          <div className="absolute inset-0 flex">
            {chartData.map((d, i) => {
              const y = 100 - (d.value / maxValue) * 100;
              return (
                <div
                  key={i}
                  className="flex-1 h-full relative cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {hoveredIndex === i && (
                    <>
                      {/* Vertical dashed line */}
                      <div
                        className="absolute w-px h-full border-l border-dashed border-gray-400"
                        style={{ left: '50%' }}
                      />
                      {/* Data point */}
                      <div
                        className="absolute w-2.5 h-2.5 bg-info rounded-full border-2 border-white shadow-md"
                        style={{
                          left: '50%',
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                      {/* Tooltip */}
                      <div
                        className="absolute z-20 bg-gray-800 text-white px-2.5 py-1.5 rounded text-xs whitespace-nowrap shadow-lg"
                        style={{
                          left: '50%',
                          top: `${y}%`,
                          transform: 'translate(-50%, -130%)'
                        }}
                      >
                        <div className="font-semibold">{d.value.toLocaleString()}</div>
                        <div className="text-gray-300 text-[10px]">{d.label.replace('Aug ', '')}th Aug</div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-8 sm:left-10 right-0 bottom-0 flex justify-between text-[10px] sm:text-xs text-description">
          {xAxisLabels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
