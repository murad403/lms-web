"use client";
import { useState } from "react";
import { DollarSign, TrendingUp, Building, Tag } from "lucide-react";
import { reportStats, revenueBarData, earnings, recentCourses } from "@/lib/organization";
import Image from "next/image";

const statusColors: Record<string, string> = {
  Published: "bg-green-50 text-green-700",
  Draft: "bg-yellow-50 text-yellow-700",
  "Under Review": "bg-orange-50 text-orange-700",
};

const ReportsPage = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [chartFilter, setChartFilter] = useState("6months");

  const stats = [
    { label: "Total Revenue", value: `$${(reportStats.totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: "bg-blue-50 text-blue-600" },
    { label: "Instructor Payouts", value: `$${(reportStats.instructorPayouts / 1000).toFixed(0)}K`, icon: TrendingUp, color: "bg-green-50 text-green-600" },
    { label: "Organization Share", value: `$${(reportStats.organizationShare / 1000).toFixed(0)}K`, icon: Building, color: "bg-purple-50 text-purple-600" },
    { label: "Avg Course Price", value: `$${reportStats.avgCoursePrice}`, icon: Tag, color: "bg-orange-50 text-orange-600" },
  ];

  const maxRevenue = Math.max(...revenueBarData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-title">Reports</h1>
        <p className="text-sm text-description mt-1">Financial overview and analytics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-5 flex items-center gap-4">
              <div className={`w-12 h-12 flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-title">{stat.value}</p>
                <p className="text-sm text-description">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Trends Chart */}
      <div className="bg-white p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-light">
          <h3 className="text-base font-semibold text-title">Revenue Trends</h3>
          <select
            value={chartFilter}
            onChange={(e) => setChartFilter(e.target.value)}
            className="text-sm text-description px-3 bg-white border border-border-light focus:outline-none py-1.5"
          >
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div className="flex items-end gap-4 h-64">
          {revenueBarData.map((bar, index) => {
            const heightPercent = (bar.revenue / maxRevenue) * 100;
            return (
              <div
                key={bar.month}
                className="flex-1 flex flex-col items-center gap-2"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div className="relative w-full flex justify-center" style={{ height: "200px" }}>
                  {hoveredBar === index && (
                    <div className="absolute -top-8 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                      ${bar.revenue.toLocaleString()}
                    </div>
                  )}
                  <div
                    className={`w-full max-w-12 transition-colors cursor-pointer ${
                      hoveredBar === index ? "bg-main" : "bg-main/70"
                    }`}
                    style={{
                      height: `${heightPercent}%`,
                      marginTop: "auto",
                    }}
                  />
                </div>
                <span className="text-xs text-description">{bar.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Table */}
        <div className="bg-white">
          <div className="p-6 border-b border-border-light flex items-center justify-between">
            <h3 className="text-base font-semibold text-title">Earnings</h3>
            <div className="flex gap-2">
              <input
                type="date"
                className="text-sm border border-border-light px-3 py-1.5 focus:outline-none focus:border-main"
              />
              <input
                type="date"
                className="text-sm border border-border-light px-3 py-1.5 focus:outline-none focus:border-main"
              />
            </div>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="text-left py-3 px-3 font-medium text-description">Order ID</th>
                  <th className="text-left py-3 px-3 font-medium text-description">Date</th>
                  <th className="text-left py-3 px-3 font-medium text-description">Course</th>
                  <th className="text-left py-3 px-3 font-medium text-description">Amount</th>
                </tr>
              </thead>
              <tbody>
                {earnings.slice(0, 6).map((earning) => (
                  <tr key={earning.orderId} className="border-b border-border-light last:border-0">
                    <td className="py-3 px-3 text-title font-medium">{earning.orderId}</td>
                    <td className="py-3 px-3 text-description">{earning.date}</td>
                    <td className="py-3 px-3 text-description max-w-37.5 truncate">{earning.course}</td>
                    <td className="py-3 px-3 text-title font-medium">${earning.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recently Created Courses */}
        <div className="bg-white">
          <div className="p-6 border-b border-border-light">
            <h3 className="text-base font-semibold text-title">Recently Created Courses</h3>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="text-left py-3 px-3 font-medium text-description">Course</th>
                  <th className="text-left py-3 px-3 font-medium text-description">Enrolled</th>
                  <th className="text-left py-3 px-3 font-medium text-description">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCourses.map((course) => (
                  <tr key={course.id} className="border-b border-border-light last:border-0">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 overflow-hidden shrink-0">
                          <Image src={course.image} alt={course.title} fill className="object-cover" />
                        </div>
                        <span className="text-title font-medium text-sm truncate max-w-45">{course.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-description">{course.enrolled.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span className={`px-3 py-1 text-xs font-medium ${statusColors[course.status]}`}>
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
