"use client";
import { useState, useCallback } from "react";
import { X, ChevronRight, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { TQuizData } from "@/lib/profile";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";

type QuizModalProps = {
  isOpen: boolean;
  onClose: () => void;
  quizData: TQuizData;
};

type QuizState = "taking" | "result";

const QuizModal = ({ isOpen, onClose, quizData }: QuizModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizState, setQuizState] = useState<QuizState>("taking");

  const totalQuestions = quizData.questions.length;
  const currentQ = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIndex, answer]) => quizData.questions[Number(qIndex)].correctAnswer === answer
  ).length;

  const wrongCount = totalQuestions - correctCount;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  const scorePoints = Math.round((correctCount / totalQuestions) * 100);

  const handleSelectAnswer = useCallback((optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }));
  }, [currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizState("result");
    }
  }, [currentQuestion, totalQuestions]);

  const handleRetake = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizState("taking");
  }, []);

  const handleClose = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizState("taking");
    onClose();
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden [&>button]:hidden">
        {quizState === "taking" ? (
          /* Quiz Taking View */
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-title">Quiz</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-description font-medium">
                  Question {currentQuestion + 1}/{totalQuestions}
                </span>
                <span className="text-main font-semibold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-main h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-title mb-4">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectAnswer(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-main bg-main/5 text-main font-medium"
                        : "border-border-light hover:border-main/30 text-title hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-main"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedAnswers[currentQuestion] === index && (
                          <div className="w-2.5 h-2.5 rounded-full bg-main" />
                        )}
                      </div>
                      {option}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="w-full py-3 bg-main text-white rounded-lg text-sm font-semibold hover:bg-main/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {currentQuestion < totalQuestions - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                "Submit Quiz"
              )}
            </button>
          </div>
        ) : (
          /* Result View */
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-title">Quiz Result</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Circle */}
            <div className="flex justify-center mb-6">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    stroke="#E5E7EB"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    stroke={scorePercentage >= 50 ? "#16A34A" : "#DC2626"}
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${(scorePercentage / 100) * 327} 327`}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-title">{scorePoints}</span>
                  <span className="text-xs text-description">Points</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-3 bg-blue-light rounded-lg">
                <p className="text-lg font-bold text-main">{scorePercentage}%</p>
                <p className="text-xs text-description">Completion</p>
              </div>
              <div className="text-center p-3 bg-green-light rounded-lg">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-quiz-correct" />
                  <p className="text-lg font-bold text-quiz-correct">{correctCount}</p>
                </div>
                <p className="text-xs text-description">Correct</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="flex items-center justify-center gap-1">
                  <XCircle className="w-4 h-4 text-quiz-wrong" />
                  <p className="text-lg font-bold text-quiz-wrong">{wrongCount}</p>
                </div>
                <p className="text-xs text-description">Wrong</p>
              </div>
            </div>

            {/* Total Questions */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-6">
              <span className="text-sm text-description">Total Questions</span>
              <span className="text-sm font-bold text-title">{totalQuestions}</span>
            </div>

            {/* Course Info */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-6">
              <div className="relative w-14 h-10 rounded overflow-hidden shrink-0">
                <Image
                  src="/courses/Course Images.png"
                  alt={quizData.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-title truncate">
                  {quizData.title}
                </h4>
                <p className="text-xs text-description">
                  {totalQuestions} Questions
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRetake}
                className="flex-1 px-4 py-2.5 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake
              </button>
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2.5 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
