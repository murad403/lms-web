"use client";
import { useState } from "react";
import QuizAttemptCard from "@/components/reusable/QuizAttemptCard";
import { useTranslations } from "next-intl";
import { useQuizAttemptsQuery } from "@/redux/features/student/student.api";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/reusable/Pagination";

const QuizAttemptsPage = () => {
    const t = useTranslations("QuizAttemptsPage");
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useQuizAttemptsQuery({ page: currentPage });
    const quizAttempts = data?.data || [];
    const totalPages = data?.total_pages || 1;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-title mb-6">
                {t("title")}
            </h2>

            <div className="bg-white space-y-4">
                {isLoading && (
                    Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="py-4 border border-border-light rounded-md p-4">
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-64" />
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-56" />
                                <Skeleton className="h-4 w-44" />
                                <Skeleton className="h-4 w-36" />
                                <Skeleton className="h-4 w-60" />
                            </div>
                        </div>
                    ))
                )}

                {quizAttempts.map((quiz) => (
                    <QuizAttemptCard
                        key={quiz?.id}
                        quizAttempt={quiz}
                    />
                ))}

                {!isLoading && quizAttempts.length === 0 && (
                    <p className="text-sm text-description">No quiz attempts found.</p>
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default QuizAttemptsPage;
