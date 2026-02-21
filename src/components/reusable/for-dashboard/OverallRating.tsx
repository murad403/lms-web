"use client";
import { Star } from "lucide-react";
import { TRatingBreakdown } from "@/lib/instructor";

type OverallRatingProps = {
  rating: number;
  breakdown: TRatingBreakdown[];
};

const OverallRating = ({ rating, breakdown }: OverallRatingProps) => {
  // Wave pattern data for the chart
  const wavePoints = [
    { x: 0, y: 60 },
    { x: 15, y: 45 },
    { x: 25, y: 55 },
    { x: 35, y: 35 },
    { x: 45, y: 50 },
    { x: 55, y: 30 },
    { x: 65, y: 45 },
    { x: 75, y: 25 },
    { x: 85, y: 40 },
    { x: 95, y: 20 },
    { x: 100, y: 35 },
  ];

  // Create smooth bezier curve path
  const createWavePath = () => {
    let path = `M ${wavePoints[0].x} ${wavePoints[0].y}`;

    for (let i = 0; i < wavePoints.length - 1; i++) {
      const p0 = wavePoints[i === 0 ? i : i - 1];
      const p1 = wavePoints[i];
      const p2 = wavePoints[i + 1];
      const p3 = wavePoints[i + 2 < wavePoints.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  };

  const wavePath = createWavePath();
  const areaPath = wavePath + ` L 100 80 L 0 80 Z`;

  return (
    <div className="bg-white p-4 sm:p-5 min-h-95 sm:min-h-105 lg:min-h-120">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border-light">
        <h3 className="text-base sm:text-lg font-semibold text-title">Overall Course Rating</h3>
        <select className="text-xs sm:text-sm text-description px-2 sm:px-3 bg-white focus:outline-none w-fit">
          <option>This week</option>
          <option>This month</option>
          <option>This year</option>
        </select>
      </div>

      {/* Rating Display with Wave Chart */}
      <div className="mb-10 border-b border-border-light pb-10">
        <div className="flex flex-col sm:flex-row items-end gap-4 flex-1">
          {/* Rating Box */}
          <div className="bg-orange-50 p-6 text-center shrink-0">
            <p className="text-4xl sm:text-5xl font-bold text-orange-500">{rating}</p>
            <div className="flex justify-center gap-0.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < Math.floor(rating)
                    ? "text-orange-400 fill-orange-400"
                    : i < rating
                      ? "text-orange-400 fill-orange-400"
                      : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            <p className="text-xs text-description mt-1.5">Overall Rating</p>
          </div>

          {/* Wave Chart */}
          <div className="flex-1 w-full h-40 overflow-hidden">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 80"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F97316" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#F97316" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Area fill */}
              <path d={areaPath} fill="url(#waveGradient)" />

              {/* Line */}
              <path
                d={wavePath}
                fill="none"
                stroke="#F97316"
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
                style={{ strokeWidth: '2px' }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-2.5 sm:space-y-3">
        {breakdown.map((item) => (
          <div key={item.star} className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-0.5 w-16 sm:w-20 shrink-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < item.star
                    ? "text-orange-400 fill-orange-400"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs text-description w-10 sm:w-12 shrink-0">{item.star} Star</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-400 rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-title w-8 sm:w-10 text-right">
              {item.percentage < 1 ? `<1%` : `${item.percentage}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallRating;
