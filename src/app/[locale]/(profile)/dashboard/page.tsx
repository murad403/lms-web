"use client";
import DashboardCourseCard from "@/components/card/DashboardCourseCard";
import { useTranslations } from "next-intl";
import DashboardStats from "./DashboardStats";
import RecentInvoices from "./RecentInvoices";
import LatestQuizzes from "./LatestQuizzes";
import { useGetStudentDashboardQuery } from "@/redux/features/student/student.api";

const DashboardPage = () => {
    const t = useTranslations("Dashboard");
    const { data } = useGetStudentDashboardQuery();

    const dashboardData = data?.data;

    const recentCourses = dashboardData?.recently_enrolled?.map((course) => ({
        id: course.id,
        title: course.title,
        image: course.thumbnail,
        lessonNumber: 1,
        lessonTitle: course.subtitle,
        progress: Math.round(course.course_progress),
    })) || [];

    return (
        <div className="space-y-6">
            {/* Stats */}
            <DashboardStats
                enrolledCoursesCount={dashboardData?.enrolled_courses_count || 0}
                activeCoursesCount={dashboardData?.active_courses_count || 0}
                completedCoursesCount={dashboardData?.completed_courses_count || 0}
            />

            {/* Recently Enrolled Courses */}
            <div>
                <h3 className="text-base sm:text-lg font-bold text-title mb-4">
                    {t("recentlyEnrolledCourses")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {recentCourses.map((course) => (
                        <DashboardCourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>

            {/* Recent Invoices & Latest Quizzes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Invoices */}
                <RecentInvoices invoices={dashboardData?.recent_invoices || []} />

                {/* Latest Quizzes */}
                <LatestQuizzes quizzes={dashboardData?.recent_quizes || []} />
            </div>
        </div>
    );
};

export default DashboardPage;
