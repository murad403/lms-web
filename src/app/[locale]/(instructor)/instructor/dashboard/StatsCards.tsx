"use client";
import { BookOpen, Users, Monitor, DollarSign, PlayCircle, GraduationCap } from "lucide-react";
import { TDashboardStats } from "@/lib/instructor";

type StatsCardsProps = {
  stats: TDashboardStats;
};

const statItems = [
  { key: "coursesCreated" as const, label: "Course Created", icon: PlayCircle, color: "bg-blue-50 text-blue-600" },
  { key: "activeCourses" as const, label: "Active Courses", icon: BookOpen, color: "bg-green-50 text-green-600" },
  { key: "studentsEnrolled" as const, label: "Students Enrolled", icon: Users, color: "bg-orange-50 text-orange-600" },
  { key: "onlineStudents" as const, label: "Online Students", icon: Monitor, color: "bg-red-50 text-red-600" },
  { key: "onlineCourses" as const, label: "Online Courses", icon: GraduationCap, color: "bg-green-50 text-green-600" },
  { key: "totalEarning" as const, label: "USD Total Earning", icon: DollarSign, color: "bg-purple-50 text-purple-600" },
];

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statItems.map((item) => {
        const Icon = item.icon;
        const value = stats[item.key];
        const displayValue = item.key === "totalEarning"
          ? `$${value.toLocaleString()}`
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
              <p className="text-sm text-description">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
