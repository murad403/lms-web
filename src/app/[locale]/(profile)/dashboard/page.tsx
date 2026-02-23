"use client";
import DashboardCourseCard from "@/components/card/DashboardCourseCard";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import DashboardStats from "./DashboardStats";
import RecentInvoices from "./RecentInvoices";
import LatestQuizzes from "./LatestQuizzes";

const recentCourses = [
    { id: 1, title: "Reiki Level I, II and MasterTeacher Program", image: "/courses/Course Images (3).png", lessonNumber: 1, lessonTitle: "Introductions", progress: 0 },
    { id: 2, title: "The Complete 2021 Web Development Bootcamp", image: "/courses/Course Images (4).png", lessonNumber: 167, lessonTitle: "What You'll Need to Get Started - Se...", progress: 61 },
    { id: 3, title: "2021 Complete Python Bootcamp From Zero to...", image: "/courses/Course Images (5).png", lessonNumber: 9, lessonTitle: "Advanced CSS - Selector Priority", progress: 12 },
];

const DashboardPage = () => {
    const t = useTranslations("Dashboard");
    return (
        <div className="space-y-6">
            {/* Quiz Banner */}
            <div className="bg-[#F4F6F9] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <h3 className="text-title font-bold text-sm sm:text-base">
                        {t("quizTitle")}
                    </h3>
                    <p className="text-description text-xs sm:text-sm mt-1">{t("answered")}</p>
                </div>
                <Link
                    href="/quiz-attempts"
                    className="px-5 py-3 bg-main text-white rounded-3xl text-xs sm:text-sm font-semibold hover:bg-main/90 transition-colors whitespace-nowrap"
                >
                    {t("continueQuiz")}
                </Link>
            </div>

            {/* Stats */}
            <DashboardStats />

            {/* Recently Enrolled Courses */}
            <div>
                <h3 className="text-base sm:text-lg font-bold text-title mb-4">
                    {t("recentlyEnrolledCourses")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentCourses.map((course) => (
                        <DashboardCourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>

            {/* Recent Invoices & Latest Quizzes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Invoices */}
                <RecentInvoices />

                {/* Latest Quizzes */}
                <LatestQuizzes />
            </div>
        </div>
    );
};

export default DashboardPage;
