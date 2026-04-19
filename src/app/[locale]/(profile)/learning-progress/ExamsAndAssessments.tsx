import { FileText } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { LearningProgressCourseItem } from "@/redux/features/student/student.type";
import { useTranslations } from 'next-intl';
import React from 'react'

type ExamsAndAssessmentsProps = {
    data: LearningProgressCourseItem[];
    isLoading?: boolean;
};

const ExamsAndAssessments = ({ data, isLoading }: ExamsAndAssessmentsProps) => {
    const t = useTranslations("LearningProgress");

    const renderStatus = (course: LearningProgressCourseItem) => {
        if (course.is_completed) return t("completed");
        if (course.completion_percentage >= 75) return t("examEligible");
        if (course.completion_percentage > 0) return t("inProgress");
        return t("notStarted");
    };

    const renderStatusClasses = (course: LearningProgressCourseItem) => {
        if (course.is_completed) return "bg-blue-500 text-white";
        if (course.completion_percentage >= 75) return "bg-main text-white";
        if (course.completion_percentage > 0) return "bg-yellow-500 text-white";
        return "bg-gray-100 text-gray-500";
    };

    const renderProgressColor = (course: LearningProgressCourseItem) => {
        if (course.is_completed) return "bg-green-500";
        if (course.completion_percentage >= 75) return "bg-main";
        if (course.completion_percentage > 0) return "bg-yellow-500";
        return "bg-gray-400";
    };

    return (
        <div className="bg-white rounded-md border border-border-light p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-title mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-main" />
                {t("examsAssessments")}
            </h3>

            <div className="space-y-5">
                {isLoading ? (
                    Array.from({ length: 2 }).map((_, index) => (
                        <div className="border border-border-light p-4 rounded-md" key={index}>
                            <div className="flex items-start justify-between gap-2 mb-3">
                                <div className="min-w-0 space-y-2 flex-1">
                                    <Skeleton className="h-5 w-56 max-w-full" />
                                    <Skeleton className="h-4 w-36 max-w-full" />
                                </div>
                                <Skeleton className="h-6 w-24 shrink-0" />
                            </div>
                            <Skeleton className="w-full h-2 rounded-full" />
                            <Skeleton className="h-3 w-32 mt-2" />
                        </div>
                    ))
                ) : data.length > 0 ? data.map((course) => {
                    const progress = Math.max(0, Math.min(course.completion_percentage, 100));
                    const progressColor = renderProgressColor(course);
                    const bgColor =
                        progress >= 100
                            ? "bg-green-100"
                            : progress >= 75
                                ? "bg-blue-100"
                                : progress > 0
                                    ? "bg-yellow-100"
                                    : "bg-gray-100";

                    return (
                        <div className="border border-border-light p-4 rounded-md" key={course.id}>
                            <div className="flex items-start justify-between  gap-2 mb-1">
                                <div className="min-w-0">
                                    <h4 className="text-base font-semibold text-main truncate">
                                        {course.course_title}
                                    </h4>
                                    <p className="text-sm text-description">{course.instructor}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    {progress < 100 && (
                                        <span className="text-sm font-medium text-main">
                                            {progress}% <span className="text-red-500">/100%</span>
                                        </span>
                                    )}
                                    <span className={`px-2 py-1 text-sm bg-main text-white rounded ${renderStatusClasses(course)}`}>
                                        {renderStatus(course)}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className={`w-full ${bgColor} rounded-full h-2`}>
                                <div
                                    className={`${progressColor} h-2 rounded-full transition-all duration-500`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-xs text-description mt-1">
                                {course.completed_lecture_count}/{course.lecture_count} {t("lessons")}
                            </p>
                        </div>
                    );
                }) : (
                    <p className="text-sm text-description">{t("noExams")}</p>
                )}
            </div>
        </div>
    )
}

export default ExamsAndAssessments
