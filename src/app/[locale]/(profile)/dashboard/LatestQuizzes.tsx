import { StudentDashboardQuiz } from '@/redux/features/student/student.type';
import { useTranslations } from 'next-intl';
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

type LatestQuizzesProps = {
    quizzes: StudentDashboardQuiz[];
    isLoading?: boolean;
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return Number.isNaN(date.getTime()) ? dateString : date.toLocaleDateString();
};

const LatestQuizzes = ({ quizzes, isLoading = false }: LatestQuizzesProps) => {
    const t = useTranslations("Dashboard");

    if (isLoading) {
        return (
            <div className="rounded-md border border-border-light p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-title mb-4 border-b border-border-light pb-4">
                    {t("latestQuizzes")}
                </h3>
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                            <div className="min-w-0 flex-1 space-y-2">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                            <div className="shrink-0 ml-3">
                                <Skeleton className="size-12 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-md border border-border-light p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-bold text-title mb-4 border-b border-border-light pb-4">
                {t("latestQuizzes")}
            </h3>
            <div className="space-y-3">
                {quizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="flex items-center justify-between py-2"
                    >
                        <div className="min-w-0 flex-1">
                            <h4 className="text-base font-semibold text-title truncate">
                                {quiz.quiz_title}
                            </h4>
                            <p className="text-sm text-description">
                                Score : {Math.round(quiz.score_percentage)}% •
                                {t("date")} : {formatDate(quiz.submitted_at)}
                            </p>
                        </div>
                        <div className="shrink-0 ml-3">
                            <div
                                className={`size-12 sm:w-12 sm:h-12 rounded-full border-4 flex items-center justify-center ${quiz.score_percentage >= 70
                                    ? "border-green-500"
                                    : quiz.score_percentage >= 50
                                        ? "border-yellow-500"
                                        : "border-red-500"
                                    }`}
                            >
                                <span
                                    className={`text-sm font-bold ${quiz.score_percentage >= 70
                                        ? "text-green-600"
                                        : quiz.score_percentage >= 50
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {Math.round(quiz.score_percentage)}%
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
