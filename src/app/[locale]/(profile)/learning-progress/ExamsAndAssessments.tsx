import { examAssessments } from '@/lib/profile';
import { FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react'

const ExamsAndAssessments = () => {
    const t = useTranslations("LearningProgress");
    return (
        <div className="bg-white rounded-md border border-border-light p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-title mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-main" />
                {t("examsAssessments")}
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
                                            {t("completed")}
                                        </span>
                                    )}
                                    {exam.status === "Exam Eligible" && (
                                        <span className="px-2 py-1 bg-main text-white text-sm rounded">
                                            {t("examEligible")}
                                        </span>
                                    )}
                                    {exam.status === "Certificate Ready" && (
                                        <span className="px-2 py-1 bg-blue-500 text-white text-sm rounded">
                                            {t("certificateReady")}
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
                                {exam.completedLessons}/{exam.totalLessons} {t("lessons")}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ExamsAndAssessments
