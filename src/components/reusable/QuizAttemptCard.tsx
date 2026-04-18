"use client";
import { useTranslations } from "next-intl";
import { type StudentQuizAttemptItem } from "@/redux/features/student/student.type";

type QuizAttemptCardProps = {
    quizAttempt: StudentQuizAttemptItem;
    onStartQuiz?: (quizId: string) => void;
};

const QuizAttemptCard = ({ quizAttempt }: QuizAttemptCardProps) => {
    const t = useTranslations("QuizAttemptCard");
    const submittedDate = Number.isNaN(new Date(quizAttempt.submitted_at).getTime())
        ? quizAttempt.submitted_at
        : new Date(quizAttempt.submitted_at).toLocaleString();

    return (
        <div className="py-4 border border-border-light rounded-md p-4">
            <div className="min-w-0 flex-1">
                <h4 className="text-base sm:text-lg font-semibold text-title mb-1 truncate">
                    {quizAttempt.course_name}
                </h4>
                <div className="space-y-1 text-sm md:text-base text-description">
                    <p>Quiz: {quizAttempt.quiz}</p>
                    <p>{t("numberOfQuestions")} : {String(quizAttempt.total_questions).padStart(2, "0")}</p>
                    <p>Correct Answers: {quizAttempt.correct_answers}</p>
                    <p>Score: {quizAttempt.score_percentage}%</p>
                    <p>Submitted At: {submittedDate}</p>
                </div>
            </div>
        </div>
    );
};

export default QuizAttemptCard;
