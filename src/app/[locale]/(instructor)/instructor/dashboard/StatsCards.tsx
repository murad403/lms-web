"use client";
import { BookOpen, Users, Monitor, DollarSign, PlayCircle, GraduationCap } from "lucide-react";
import { TDashboardStats } from "@/lib/instructor";
import { useTranslations } from "next-intl";

type StatsCardsProps = {
  stats: TDashboardStats;
};

const statItems = [
  { key: "coursesCreated" as const, labelKey: "courseCreated", icon: PlayCircle, color: "bg-blue-50 text-blue-600" },
  { key: "activeCourses" as const, labelKey: "activeCourses", icon: BookOpen, color: "bg-green-50 text-green-600" },
  { key: "studentsEnrolled" as const, labelKey: "studentsEnrolled", icon: Users, color: "bg-orange-50 text-orange-600" },
  { key: "onlineStudents" as const, labelKey: "onlineStudents", icon: Monitor, color: "bg-red-50 text-red-600" },
  { key: "averageRating" as const, labelKey: "averageRating", icon: GraduationCap, color: "bg-violet-50 text-violet-600" },
  { key: "totalEarning" as const, labelKey: "usdTotalEarning", icon: DollarSign, color: "bg-slate-50 text-slate-600" },
];

const StatsCards = ({ stats }: StatsCardsProps) => {
  const t = useTranslations("InstructorDashboard");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {statItems.map((item) => {
        const Icon = item.icon;
        const value = stats[item.key];
        const displayValue = item.key === "totalEarning"
          ? `$${value.toLocaleString()}`
          : item.key === "averageRating"
            ? Number(value).toFixed(1)
            : value.toString().padStart(2, "0");

        return (
          <div
            key={item.key}
            className="bg-white p-6 flex items-center gap-6"
          >
            <div className={`w-12 h-12 flex items-center justify-center ${item.color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-title">{displayValue}</p>
              <p className="text-sm text-description">{t(item.labelKey)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
