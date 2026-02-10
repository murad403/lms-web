"use client";
import { BookOpen, MonitorPlay, CheckCircle, ChevronRight, Download } from "lucide-react";
import DashboardCourseCard from "@/components/reusable/DashboardCourseCard";
import { invoices, quizResults } from "@/lib/profile";
import { Link } from "@/i18n/navigation";

const recentCourses = [
  { id: 1, title: "Reiki Level I, II and MasterTeacher Program", image: "/courses/Course Images (3).png", lessonNumber: 1, lessonTitle: "Introductions", progress: 0 },
  { id: 2, title: "The Complete 2021 Web Development Bootcamp", image: "/courses/Course Images (4).png", lessonNumber: 167, lessonTitle: "What You'll Need to Get Started - Se...", progress: 61 },
  { id: 3, title: "2021 Complete Python Bootcamp From Zero to...", image: "/courses/Course Images (5).png", lessonNumber: 9, lessonTitle: "Advanced CSS - Selector Priority", progress: 12 },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Quiz Banner */}
      <div className="bg-[#1B2E5A] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-white font-bold text-sm sm:text-base">
            Quiz : Build Responsive Real World
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm mt-1">Answered : 15/22</p>
        </div>
        <Link
          href="/quiz-attempts"
          className="px-5 py-2 bg-white text-[#1B2E5A] rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
        >
          Continue Quiz
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-border-light p-4 sm:p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-main" />
          </div>
          <div>
            <p className="text-xs text-description">Enrolled Courses</p>
            <p className="text-xl sm:text-2xl font-bold text-title">12</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border-light p-4 sm:p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <MonitorPlay className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-description">Active Courses</p>
            <p className="text-xl sm:text-2xl font-bold text-title">03</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border-light p-4 sm:p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-description">Completed Courses</p>
            <p className="text-xl sm:text-2xl font-bold text-title">10</p>
          </div>
        </div>
      </div>

      {/* Recently Enrolled Courses */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-title mb-4">
          Recently Enrolled Courses
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
        <div className="bg-white rounded-xl border border-border-light p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold text-title mb-4">
            Recent Invoices
          </h3>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between py-2"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-title truncate">
                    {invoice.title}
                  </h4>
                  <p className="text-xs text-description">
                    {invoice.invoiceNo} • Amount :{" "}
                    <span className="font-bold text-main">${invoice.amount}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-semibold rounded">
                    {invoice.status}
                  </span>
                  <button className="p-1 text-description hover:text-title transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Quizzes */}
        <div className="bg-white rounded-xl border border-border-light p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold text-title mb-4">
            Latest Quizzes
          </h3>
          <div className="space-y-3">
            {quizResults.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between py-2"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-title truncate">
                    {quiz.title}
                  </h4>
                  <p className="text-xs text-description">
                    Correct Answer : {quiz.correctAnswer}/{quiz.totalQuestions} •
                    Date : {quiz.date}
                  </p>
                </div>
                <div className="shrink-0 ml-3">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] flex items-center justify-center ${
                      quiz.percentage >= 70
                        ? "border-green-500"
                        : quiz.percentage >= 50
                        ? "border-yellow-500"
                        : "border-red-500"
                    }`}
                  >
                    <span
                      className={`text-[10px] sm:text-xs font-bold ${
                        quiz.percentage >= 70
                          ? "text-green-600"
                          : quiz.percentage >= 50
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {quiz.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
