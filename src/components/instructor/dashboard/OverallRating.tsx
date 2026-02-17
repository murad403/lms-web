"use client";
import { Star } from "lucide-react";
import { TRatingBreakdown } from "@/lib/instructor";

type OverallRatingProps = {
  rating: number;
  breakdown: TRatingBreakdown[];
};

const OverallRating = ({ rating, breakdown }: OverallRatingProps) => {
  return (
    <div className="bg-white rounded-lg border border-border-light p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-title">Overall Course Rating</h3>
        <select className="text-sm text-description border border-gray-200 rounded-md px-2 py-1">
          <option>This week</option>
          <option>This month</option>
          <option>This year</option>
        </select>
      </div>

      {/* Rating Display */}
      <div className="flex items-center gap-6 mb-6">
        <div className="bg-orange-50 rounded-lg px-6 py-4 text-center">
          <p className="text-4xl font-bold text-orange-500">{rating}</p>
          <div className="flex justify-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "text-orange-400 fill-orange-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-description mt-1">Overall Rating</p>
        </div>

        {/* Rating bars visualization */}
        <div className="flex-1">
          <svg viewBox="0 0 200 120" className="w-full h-24">
            {/* Simple wave visualization */}
            <path
              d="M0,100 Q25,80 50,60 T100,40 T150,50 T200,30"
              fill="none"
              stroke="#F97316"
              strokeWidth="2"
            />
            <path
              d="M0,100 Q25,80 50,60 T100,40 T150,50 T200,30 L200,120 L0,120 Z"
              fill="rgba(249,115,22,0.1)"
            />
          </svg>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-2">
        {breakdown.map((item) => (
          <div key={item.star} className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 w-20 shrink-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < item.star
                      ? "text-orange-400 fill-orange-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-description w-10 shrink-0">{item.star} Star</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-400 rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-title w-8 text-right">
              {item.percentage < 1 ? `<1%` : `${item.percentage}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallRating;
