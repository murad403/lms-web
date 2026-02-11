"use client";
import { useState, useCallback } from "react";
import { X, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";
import { TQuizData } from "@/lib/profile";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
                <DialogTitle className="sr-only">Quiz</DialogTitle>
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
                            <div className="flex items-center justify-between text-sm gap-2 mb-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-main h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <span className="text-description font-medium">
                                   {currentQuestion + 1}/{totalQuestions}
                                </span>
                            </div>
                        </div>

                        {/* Question */}
                        <div className="mb-6">
                            <h3 className="text-lg border-2 border-border-light rounded-2xl p-4 border-l-4 border-l-main font-semibold text-title mb-4 shadow-md">
                                {currentQ.question}
                            </h3>

                            {/* Options */}
                            <div className="space-y-3">
                                {currentQ.options.map((option, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleSelectAnswer(index)}
                                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${selectedAnswers[currentQuestion] === index
                                            ? "border-main bg-main/5 text-main font-medium"
                                            : "border-border-light hover:border-main/30 text-title hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedAnswers[currentQuestion] === index
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
                            className="w-full py-3 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    <div className="p-6 bg-gray-50">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-8">
                            <button
                                onClick={handleRetake}
                                className="text-title hover:text-main transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-lg font-bold text-title">Quiz Result</h2>
                        </div>

                        {/* Score Circle */}
                        <div className="flex justify-center mb-8">
                            <div className="relative w-48 h-48 bg-white rounded-full shadow-lg flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full opacity-50" />
                                <div className="relative text-center">
                                    <p className="text-sm text-main font-medium mb-1">your Score</p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-5xl font-bold text-main">{scorePoints}</span>
                                        <span className="text-xl text-main font-medium">pt</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            {/* Completion */}
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <div className="w-3 h-3 rounded-full bg-main" />
                                    <span className="text-2xl font-bold text-title">{scorePercentage}%</span>
                                </div>
                                <p className="text-sm text-description">Completion</p>
                            </div>

                            {/* Total Questions */}
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <div className="w-3 h-3 rounded-full bg-main" />
                                    <span className="text-2xl font-bold text-title">{totalQuestions}</span>
                                </div>
                                <p className="text-sm text-description">Total Question</p>
                            </div>

                            {/* Correct */}
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <div className="w-3 h-3 rounded-full bg-success" />
                                    <span className="text-2xl font-bold text-title">{correctCount}</span>
                                </div>
                                <p className="text-sm text-description">Correct</p>
                            </div>

                            {/* Wrong */}
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="text-2xl font-bold text-title">{wrongCount < 10 ? `0${wrongCount}` : wrongCount}</span>
                                </div>
                                <p className="text-sm text-description">Wrong</p>
                            </div>
                        </div>

                        {/* Course Info Card */}
                        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-title mb-1">
                                        {quizData.title}
                                    </h4>
                                    <p className="text-xs text-description">
                                        Number of Questions : {totalQuestions}
                                    </p>
                                </div>
                                <button
                                    onClick={handleRetake}
                                    className="flex items-center gap-2 px-4 py-2 bg-main text-white rounded-full text-sm font-medium hover:bg-main/90 transition-colors"
                                >
                                    Retake
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Continue Button */}
                        <button
                            onClick={handleClose}
                            className="w-full py-3.5 bg-main text-white rounded-lg text-sm font-semibold hover:bg-main/90 transition-colors"
                        >
                            Continue
                        </button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default QuizModal;