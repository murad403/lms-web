"use client";
import { TRecentActivity } from "@/lib/instructor";
import { MessageSquare, Star, ShoppingCart } from "lucide-react";

type RecentActivityProps = {
  activities: TRecentActivity[];
};

const iconMap: Record<string, React.ElementType> = {
  comment: MessageSquare,
  rating: Star,
  purchase: ShoppingCart,
};

const colorMap: Record<string, string> = {
  comment: "bg-purple-100 text-purple-600",
  rating: "bg-green-100 text-green-600",
  purchase: "bg-blue-100 text-blue-600",
};

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <div className="bg-white rounded-lg border border-border-light p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-title">Recent Activity</h3>
        <select className="text-sm text-description border border-gray-200 rounded-md px-2 py-1">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type] || MessageSquare;
          const color = colorMap[activity.type] || "bg-gray-100 text-gray-600";
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-title">
                  <span className="font-semibold">{activity.userName}</span>{" "}
                  {activity.action}{" "}
                  <span className="font-semibold">&quot;{activity.courseName}&quot;</span>
                </p>
                <p className="text-xs text-description mt-0.5">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
