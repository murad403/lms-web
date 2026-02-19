/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TCourseOverviewData } from "@/lib/instructor";

type CourseOverviewChartProps = {
  data: TCourseOverviewData[];
};

const CourseOverviewChart = ({ data: _data }: CourseOverviewChartProps) => {
  // Extended demo data for smoother curves
  const chartData: TCourseOverviewData[] = [
    { label: "Sun", comments: 75000, views: 65000 },
    { label: "Mon", comments: 85000, views: 145000 },
    { label: "Tue", comments: 55000, views: 95000 },
    { label: "Wed", comments: 8000, views: 5000 },
    { label: "Thu", comments: 65000, views: 85000 },
    { label: "Fri", comments: 125000, views: 145000 },
    { label: "Sat", comments: 95000, views: 85000 },
  ];

  const maxValue = 1000000;
  const yAxisLabels = ["1m", "500k", "100k", "50k", "10k", "1k", "0"];

  // Create smooth bezier curve path
  const createSmoothPath = (values: number[]) => {
    const points = values.map((val, i) => ({
      x: (i / (values.length - 1)) * 100,
      y: 100 - (val / maxValue) * 100,
    }));

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

  const commentsPath = createSmoothPath(chartData.map((d) => d.comments));
  const viewsPath = createSmoothPath(chartData.map((d) => d.views));

  // Create area paths for gradient fill
  const commentsAreaPath = commentsPath + ` L 100 100 L 0 100 Z`;
  const viewsAreaPath = viewsPath + ` L 100 100 L 0 100 Z`;

  return (
    <div className="bg-white p-4 sm:p-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border-light">
        <h3 className="text-base sm:text-lg font-semibold text-title">Course Overview</h3>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <select className="text-xs sm:text-sm text-description px-2 sm:px-3 py-1 sm:py-1.5 bg-white focus:outline-none">
            <option>This week</option>
            <option>This month</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-95 sm:h-100 lg:h-105">
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
              <linearGradient id="viewsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#564FFD" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#564FFD" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="commentsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4F9BEF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#4F9BEF" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 16.67, 33.33, 50, 66.67, 83.33, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="#f0f0f0"
                strokeWidth="0.2"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Views area fill */}
            <path d={viewsAreaPath} fill="url(#viewsGradient)" />

            {/* Comments area fill */}
            <path d={commentsAreaPath} fill="url(#commentsGradient)" />

            {/* Views line (purple/indigo) */}
            <path
              d={viewsPath}
              fill="none"
              stroke="#564FFD"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: '3px' }}
            />

            {/* Comments line (cyan) */}
            <path
              d={commentsPath}
              fill="none"
              stroke="#4F9BEF"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: '3px' }}
            />
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-8 sm:left-10 right-0 bottom-0 flex justify-between text-[10px] sm:text-xs text-description">
          {chartData.map((d) => (
            <span key={d.label} className="flex-1 text-center">{d.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseOverviewChart;
