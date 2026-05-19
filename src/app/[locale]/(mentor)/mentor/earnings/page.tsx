"use client";
import React, { useState, useMemo } from "react";
import { useGetMentorEarningsQuery } from "@/redux/features/mentor/mentor.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { DollarSign, BookOpen, Search, Calendar, TrendingUp, Award, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

const MentorEarningsPage = () => {
  const t = useTranslations("InstructorEarnings");
  const { data: response, isLoading, isFetching } = useGetMentorEarningsQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const earningsData = response?.data;
  const isPageLoading = isLoading || isFetching;

  // Filter courses by title or organization name
  const filteredCourses = useMemo(() => {
    const courses = earningsData?.assigned_course_list || [];
    if (!searchTerm.trim()) return courses;

    const term = searchTerm.toLowerCase();
    return courses.filter(
      (course) =>
        course.course_title.toLowerCase().includes(term) ||
        course.organization_name.toLowerCase().includes(term)
    );
  }, [earningsData?.assigned_course_list, searchTerm]);

  // Format currency helper
  const formatCurrency = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  // Format date helper
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-title tracking-tight flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-main shrink-0" />
          {t("earningsOverview")}
        </h1>
        <p className="text-sm sm:text-base text-description max-w-2xl">
          {t("earningsOverviewDesc")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Total Earnings */}
        <div className="bg-white p-5 flex items-center gap-4 border border-border-light">
          {isPageLoading ? (
            <>
              <Skeleton className="h-12 w-12 rounded-md shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-28" />
                <Skeleton className="h-4 w-24" />
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-emerald-50 flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-title">
                  {formatCurrency(earningsData?.total_earning_amount || "0.00")}
                </p>
                <p className="text-sm text-description">{t("totalEarningAmount")}</p>
              </div>
            </>
          )}
        </div>

        {/* Card 2: Assigned Courses */}
        <div className="bg-white p-5 flex items-center gap-4 border border-border-light">
          {isPageLoading ? (
            <>
              <Skeleton className="h-12 w-12 rounded-md shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-blue-50 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-title">
                  {earningsData?.total_assigned_courses || 0}
                </p>
                <p className="text-sm text-description">{t("totalAssignedCourses")}</p>
              </div>
            </>
          )}
        </div>

        {/* Card 3: Partnership Status */}
        <div className="bg-white p-5 flex items-center gap-4 border border-border-light sm:col-span-2 lg:col-span-1">
          {isPageLoading ? (
            <>
              <Skeleton className="h-12 w-12 rounded-md shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-28" />
                <Skeleton className="h-4 w-24" />
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-purple-50 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-title">{t("verifiedMentor")}</p>
                <p className="text-sm text-description">{t("activeContracts")}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main List Section */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-title">{t("assignedCourseContracts")}</h2>
            <p className="text-xs sm:text-sm text-description">{t("assignedCourseContractsDesc")}</p>
          </div>
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400 bg-gray-50/50"
            />
          </div>
        </div>

        {/* Table / List Container */}
        <div className="overflow-x-auto">
          {isPageLoading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-gray-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">{t("courseAndOrg")}</th>
                  <th className="py-4 px-6">{t("coursePrice")}</th>
                  <th className="py-4 px-6">{t("revenueShare")}</th>
                  <th className="py-4 px-6">{t("calculatedEarning")}</th>
                  <th className="py-4 px-6">{t("expiryDate")}</th>
                  <th className="py-4 px-6 text-center">{t("status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredCourses.map((course) => {
                  const isOngoing = course.status?.toLowerCase() === "ongoing";
                  return (
                    <tr key={course.contract_id} className="hover:bg-gray-50/50 transition-colors group">
                      {/* Course Details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 text-main font-bold shrink-0">
                            {course.course_title.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-title group-hover:text-main transition-colors">
                              {course.course_title}
                            </h4>
                            <p className="text-xs text-description mt-0.5">
                              {course.organization_name}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Base Price */}
                      <td className="py-4 px-6 font-medium text-gray-700">
                        {formatCurrency(course.discount_price)}
                      </td>

                      {/* Revenue Share */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5">
                          <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-semibold">
                            {course.assigned_percentage}%
                          </Badge>
                        </div>
                      </td>

                      {/* Calculated Earnings */}
                      <td className="py-4 px-6">
                        <span className="font-bold text-emerald-600 flex items-center gap-0.5">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          {formatCurrency(course.calculated_earning)}
                        </span>
                      </td>

                      {/* Expiry Date */}
                      <td className="py-4 px-6 text-gray-500">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {formatDate(course.expiry_date)}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center">
                        <Badge
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border-none ${isOngoing
                              ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}
                        >
                          {isOngoing ? t("ongoing") : t("expired")}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="py-16 px-6 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-base font-bold text-title mb-1">{t("noAssignmentsFound")}</h3>
              <p className="text-xs sm:text-sm text-description max-w-xs">
                {searchTerm
                  ? t("noSearchFoundDesc")
                  : t("noAssignmentsFoundDesc")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorEarningsPage;