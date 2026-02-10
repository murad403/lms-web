"use client";
import { ArrowRight } from "lucide-react";
import { TQuizAttempt } from "@/lib/profile";
import { Link } from "@/i18n/navigation";

type QuizAttemptCardProps = {
    quizAttempt: TQuizAttempt;
};

const QuizAttemptCard = ({ quizAttempt }: QuizAttemptCardProps) => {
    return (
        <div className="flex items-center justify-between py-4 border border-border-light rounded-md p-4">
            <div className="min-w-0 flex-1">
                <h4 className="text-sm sm:text-base font-semibold text-title mb-1 truncate">
                    {quizAttempt.title}
                </h4>
                <p className="text-xs text-description">
                    Number of Questions : {String(quizAttempt.numberOfQuestions).padStart(2, "0")}
                </p>
            </div>
            <Link
                href={`/quiz-attempts/${quizAttempt.id}`}
                className="p-2 bg-main text-white rounded-full hover:bg-main/90 transition-colors shrink-0 ml-3"
            >
                <ArrowRight className="size-5"/>
            </Link>
        </div>
    );
};

export default QuizAttemptCard;
