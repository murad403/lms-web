"use client";
import DashboardCourseCard from "@/components/card/DashboardCourseCard";
import { useTranslations } from "next-intl";
import DashboardStats from "./DashboardStats";
import RecentInvoices from "./RecentInvoices";
import LatestQuizzes from "./LatestQuizzes";
import { useGetStudentDashboardQuery } from "@/redux/features/student/student.api";
import { resolveImageUrl } from "@/utils/image";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardPage = () => {
    const t = useTranslations("Dashboard");
    const { data, isLoading } = useGetStudentDashboardQuery();

    const dashboardData = data?.data;

    const recentCourses = dashboardData?.recently_enrolled?.map((course) => ({
        id: course.id,
        title: course.title,
        image: resolveImageUrl(course.thumbnail),
        lessonNumber: 1,
        lessonTitle: course.subtitle,
        progress: Math.round(course.course_progress),
    })) || [];

    return (
        <div className="space-y-6">
            {!isLoading && recentCourses.length === 0 && (
                <p className="text-sm text-description">No dashboard data found.</p>
            )}

            {/* Stats */}
            <DashboardStats
                enrolledCoursesCount={dashboardData?.enrolled_courses_count || 0}
                activeCoursesCount={dashboardData?.active_courses_count || 0}
                completedCoursesCount={dashboardData?.completed_courses_count || 0}
                isLoading={isLoading}
            />

            {/* Recently Enrolled Courses */}
            <div>
                <h3 className="text-base sm:text-lg font-bold text-title mb-4">
                    {t("recentlyEnrolledCourses")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, index) => (
                              <div key={index} className="bg-white rounded-md overflow-hidden border border-border-light w-full">
                                  <Skeleton className="h-40 sm:h-60 w-full" />
                                  <div className="p-3 sm:p-4 space-y-3">
                                      <Skeleton className="h-3 w-3/4" />
                                      <Skeleton className="h-5 w-5/6" />
                                      <div className="flex items-center justify-between">
                                          <Skeleton className="h-10 w-28 rounded" />
                                          <Skeleton className="h-4 w-20" />
                                      </div>
                                  </div>
                              </div>
                          ))
                        : recentCourses.map((course) => <DashboardCourseCard key={course.id} course={course} />)}
                </div>
            </div>

            {/* Recent Invoices & Latest Quizzes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Invoices */}
                <RecentInvoices invoices={dashboardData?.recent_invoices || []} isLoading={isLoading} />

                {/* Latest Quizzes */}
                <LatestQuizzes quizzes={dashboardData?.recent_quizes || []} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default DashboardPage;
