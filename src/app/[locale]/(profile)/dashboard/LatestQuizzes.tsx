import { quizResults } from '@/lib/profile'
import { useTranslations } from 'next-intl';
import React from 'react'

const LatestQuizzes = () => {
    const t = useTranslations("Dashboard");
    return (
        <div className="rounded-md border border-border-light p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-bold text-title mb-4 border-b border-border-light pb-4">
                {t("latestQuizzes")}
            </h3>
            <div className="space-y-3">
                {quizResults.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="flex items-center justify-between py-2"
                    >
                        <div className="min-w-0 flex-1">
                            <h4 className="text-base font-semibold text-title truncate">
                                {quiz.title}
                            </h4>
                            <p className="text-sm text-description">
                                {t("correctAnswer")} : {quiz.correctAnswer}/{quiz.totalQuestions} •
                                {t("date")} : {quiz.date}
                            </p>
                        </div>
                        <div className="shrink-0 ml-3">
                            <div
                                className={`size-12 sm:w-12 sm:h-12 rounded-full border-4 flex items-center justify-center ${quiz.percentage >= 70
                                    ? "border-green-500"
                                    : quiz.percentage >= 50
                                        ? "border-yellow-500"
                                        : "border-red-500"
                                    }`}
                            >
                                <span
                                    className={`text-sm font-bold ${quiz.percentage >= 70
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
    )
}

export default LatestQuizzes
