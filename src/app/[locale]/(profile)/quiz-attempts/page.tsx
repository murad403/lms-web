"use client";
import QuizAttemptCard from "@/components/reusable/QuizAttemptCard";
import { quizAttempts } from "@/lib/profile";

const QuizAttemptsPage = () => {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold text-title mb-6">
        My Quiz Attempts
      </h2>

      <div className="bg-white rounded-xl border border-border-light p-4 sm:p-6">
        {quizAttempts.map((quiz) => (
          <QuizAttemptCard key={quiz.id} quizAttempt={quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizAttemptsPage;
