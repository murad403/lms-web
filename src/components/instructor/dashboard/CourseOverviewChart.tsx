"use client";
import { TCourseOverviewData } from "@/lib/instructor";

type CourseOverviewChartProps = {
  data: TCourseOverviewData[];
};

const CourseOverviewChart = ({ data }: CourseOverviewChartProps) => {
  const maxValue = Math.max(...data.flatMap((d) => [d.comments, d.views]));

  return (
    <div className="bg-white rounded-lg border border-border-light p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-title">Course Overview</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-xs text-description">Comments</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-main" />
            <span className="text-xs text-description">View</span>
          </div>
          <select className="text-sm text-description border border-gray-200 rounded-md px-2 py-1">
            <option>This month</option>
            <option>Last month</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-48">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-description w-8">
          <span>1m</span>
          <span>500k</span>
          <span>100k</span>
          <span>50k</span>
          <span>10k</span>
          <span>0</span>
        </div>
        {/* Lines */}
        <div className="ml-10 h-full relative">
          <svg className="w-full h-[calc(100%-24px)]" viewBox="0 0 300 150" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 30, 60, 90, 120, 150].map((y) => (
              <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#f0f0f0" strokeWidth="0.5" />
            ))}
            {/* Comments line */}
            <polyline
              fill="none"
              stroke="#F97316"
              strokeWidth="2"
              points={data.map((d, i) => {
                const x = (i / (data.length - 1)) * 300;
                const y = 150 - (d.comments / maxValue) * 150;
                return `${x},${y}`;
              }).join(" ")}
            />
            {/* Views line */}
            <polyline
              fill="none"
              stroke="#1E3A8A"
              strokeWidth="2"
              points={data.map((d, i) => {
                const x = (i / (data.length - 1)) * 300;
                const y = 150 - (d.views / maxValue) * 150;
                return `${x},${y}`;
              }).join(" ")}
            />
          </svg>
          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-description mt-1">
            {data.map((d) => (
              <span key={d.label}>{d.label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverviewChart;
