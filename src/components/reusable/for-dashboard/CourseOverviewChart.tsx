"use client";
import { TCourseOverviewData } from "@/lib/instructor";
import { useTranslations } from "next-intl";

type CourseOverviewChartProps = {
  data: TCourseOverviewData[];
};

const CourseOverviewChart = ({ data }: CourseOverviewChartProps) => {
  const t = useTranslations("InstructorDashboard");
  const chartData = data;
  const hasData = chartData.length > 0;

  const maxValue = hasData
    ? Math.max(...chartData.flatMap((item) => [item.comments, item.views]), 0)
    : 0;

  const formatAxisValue = (value: number) => {
    if (value >= 1_000_000) {
      const formatted = value / 1_000_000;
      return `${Number.isInteger(formatted) ? formatted.toFixed(0) : formatted.toFixed(1)}m`;
    }
    if (value >= 1_000) {
      const formatted = value / 1_000;
      return `${Number.isInteger(formatted) ? formatted.toFixed(0) : formatted.toFixed(1)}k`;
    }
    return Math.round(value).toString();
  };

  const yAxisValues = Array.from({ length: 7 }, (_, index) => {
    const ratio = (6 - index) / 6;
    return maxValue * ratio;
  });

  // Create smooth bezier curve path
  const createSmoothPath = (values: number[]) => {
    const points = values.map((val, i) => ({
      x: values.length === 1 ? 0 : (i / (values.length - 1)) * 100,
      y: maxValue > 0 ? 100 - (val / maxValue) * 100 : 100,
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
      <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border-light">
        <h3 className="text-base sm:text-lg font-semibold text-title">{t("courseOverview")}</h3>
      </div>

      {/* Chart */}
      <div className="relative h-95 sm:h-100 lg:h-105">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 sm:bottom-8 flex flex-col justify-between text-[10px] sm:text-xs text-description w-8 sm:w-10">
          {yAxisValues.map((value, index) => (
            <span key={index}>{formatAxisValue(value)}</span>
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
            {hasData && <path d={viewsAreaPath} fill="url(#viewsGradient)" />}

            {/* Comments area fill */}
            {hasData && <path d={commentsAreaPath} fill="url(#commentsGradient)" />}

            {/* Views line (purple/indigo) */}
            {hasData && (
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
            )}

            {/* Comments line (cyan) */}
            {hasData && (
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
            )}
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
