"use client";
import { useState } from "react";
import { Clock, CheckCircle, FileText, Award, TrendingUp } from "lucide-react";
import { examAssessments, lessonTracking } from "@/lib/profile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LearningProgressPage = () => {
    const [moduleFilter, setModuleFilter] = useState("all");

    const filteredLessons =
        moduleFilter === "all"
            ? lessonTracking
            : lessonTracking.filter((l) => l.module === moduleFilter);

    const uniqueModules = [...new Set(lessonTracking.map((l) => l.module))];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-title">Learning Progress</h2>
                <p className="text-xs sm:text-sm text-description mt-1">
                    Track your detailed learning journey and achievements
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <div className="bg-white rounded-md border border-border-light p-3 sm:p-6 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs text-description">Total Hours</p>
                        <p className="text-lg sm:text-xl font-bold text-title">45.5h</p>
                    </div>
                    <div className="bg-[#E5EAED] p-2 rounded-full">
                        <Clock className="size-6 text-main shrink-0" />
                    </div>
                </div>
                <div className="bg-white rounded-md border border-border-light p-3 sm:p-4 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs text-description">Completion</p>
                        <p className="text-lg sm:text-xl font-bold text-title">68%</p>
                    </div>
                    <div className="bg-[#E5EAED] p-2 rounded-full">
                        <TrendingUp className="size-6 text-success shrink-0"/>
                    </div>
                </div>
                <div className="bg-white rounded-md border border-border-light p-3 sm:p-4 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs text-description">Exam Eligible</p>
                        <p className="text-lg sm:text-xl font-bold text-title">2 Courses</p>
                    </div>
                    <div className="bg-[#E5EAED] p-2 rounded-full">
                        <FileText className="size-6 text-main shrink-0" />
                    </div>
                </div>
                <div className="bg-white rounded-md border border-border-light p-3 sm:p-4 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs text-description">Certificate Ready</p>
                        <p className="text-lg sm:text-xl font-bold text-title">2 Courses</p>
                    </div>
                    <div className="bg-[#E5EAED] p-2 rounded-full">
                        <Award className="size-6 text-yellow-500 shrink-0" />
                    </div>
                </div>
            </div>

            {/* Exams & Assessments */}
            <div className="bg-white rounded-md border border-border-light p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-title mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-main" />
                    Exams & Assessments
                </h3>

                <div className="space-y-5">
                    {examAssessments.map((exam) => {
                        const progressColor =
                            exam.progress >= 100
                                ? "bg-green-500"
                                : exam.progress >= 40
                                    ? "bg-main"
                                    : "bg-red-500";
                        const bgColor =
                            exam.progress >= 100
                                ? "bg-green-100"
                                : exam.progress >= 40
                                    ? "bg-blue-100"
                                    : "bg-red-100";

                        return (
                            <div className="border border-border-light p-4 rounded-md" key={exam.id}>
                                <div className="flex items-start justify-between  gap-2 mb-1">
                                    <div className="min-w-0">
                                        <h4 className="text-base font-semibold text-main truncate">
                                            {exam.title}
                                        </h4>
                                        <p className="text-sm text-description">{exam.instructor}</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        {exam.progress < 100 && (
                                            <span className="text-sm font-medium text-main">
                                                {exam.progress}% <span className="text-red-500">/100%</span>
                                            </span>
                                        )}
                                        {exam.status === "Completed" && (
                                            <span className="px-2 py-1 bg-main text-white text-sm rounded">
                                                Completed
                                            </span>
                                        )}
                                        {exam.status === "Exam Eligible" && (
                                            <span className="px-2 py-1 bg-main text-white text-sm rounded">
                                                Exam Eligible
                                            </span>
                                        )}
                                        {exam.status === "Certificate Ready" && (
                                            <span className="px-2 py-1 bg-blue-500 text-white text-sm rounded">
                                                Certificate Ready
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className={`w-full ${bgColor} rounded-full h-2`}>
                                    <div
                                        className={`${progressColor} h-2 rounded-full transition-all duration-500`}
                                        style={{ width: `${Math.min(exam.progress, 100)}%` }}
                                    />
                                </div>
                                <p className="text-xs text-description mt-1">
                                    {exam.completedLessons}/{exam.totalLessons} lessons
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Lesson Tracking */}
            <div className="bg-white rounded-md border border-border-light p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-title">
                        Lesson Tracking
                    </h3>
                    <Select value={moduleFilter} onValueChange={setModuleFilter}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {uniqueModules.map((mod) => (
                                <SelectItem key={mod} value={mod}>
                                    {mod}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                    Module
                                </th>
                                <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                    Lesson
                                </th>
                                <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                    Watch Time
                                </th>
                                <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                    Status
                                </th>
                                <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLessons.map((lesson) => (
                                <tr key={lesson.id} className="border-b border-gray-50">
                                    <td className="py-3 px-2 text-sm text-title">
                                        {lesson.module}
                                    </td>
                                    <td className="py-3 px-2 text-sm text-title">
                                        {lesson.lesson}
                                    </td>
                                    <td className="py-3 px-2 text-sm text-description">
                                        {lesson.watchTime}
                                    </td>
                                    <td className="py-3 px-2">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${lesson.status === "Completed"
                                                    ? "bg-green-500 text-white"
                                                    : lesson.status === "In Progress"
                                                        ? "bg-yellow-50 text-yellow-600"
                                                        : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            {lesson.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2 text-sm text-description">
                                        {lesson.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LearningProgressPage;
