"use client";
import { useState } from "react";
import QuizAttemptCard from "@/components/reusable/QuizAttemptCard";
import QuizModal from "@/components/modal/QuizModal";
import { quizAttempts, quizQuestionsData, TQuizData } from "@/lib/profile";

const QuizAttemptsPage = () => {
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [activeQuiz, setActiveQuiz] = useState<TQuizData | null>(null);

    const handleOpenQuiz = (quizId: string) => {
        const quizData = quizQuestionsData.find((q) => q.id === quizId);
        if (quizData) {
            setActiveQuiz(quizData);
            setIsQuizOpen(true);
        }
    };

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-title mb-6">
                My Quiz Attempts
            </h2>

            <div className="bg-white space-y-4">
                {quizAttempts.map((quiz) => (
                    <QuizAttemptCard
                        key={quiz.id}
                        quizAttempt={quiz}
                        onStartQuiz={handleOpenQuiz}
                    />
                ))}
            </div>

            {activeQuiz && (
                <QuizModal
                    isOpen={isQuizOpen}
                    onClose={() => {
                        setIsQuizOpen(false);
                        setActiveQuiz(null);
                    }}
                    quizData={activeQuiz}
                />
            )}
        </div>
    );
};

export default QuizAttemptsPage;
