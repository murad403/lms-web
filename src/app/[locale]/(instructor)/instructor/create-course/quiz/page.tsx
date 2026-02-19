/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, ArrowLeft, ChevronDown, Trash } from "lucide-react";
import { Link } from "@/i18n/navigation";

// Question option schema
const optionSchema = z.object({
    label: z.string(),
    value: z.string().min(1, "Option is required"),
    isCorrect: z.boolean(),
});

// Question schema
const questionSchema = z.object({
    type: z.enum(["multiple-choice", "true-false"]),
    questionText: z.string().min(1, "Question text is required"),
    options: z.array(optionSchema),
});

// Quiz form schema
const quizFormSchema = z.object({
    quizTitle: z.string().min(1, "Quiz title is required"),
    timeLimit: z.string(),
    attemptsAllowed: z.string(),
    passingScore: z.string(),
    shuffleQuestions: z.boolean(),
    questions: z.array(questionSchema),
});

type QuizFormValues = z.infer<typeof quizFormSchema>;

const timeLimitOptions = [
    { label: "No Time Limit", value: "0" },
    { label: "10 Minutes", value: "10" },
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" },
    { label: "30 Minutes", value: "30" },
    { label: "45 Minutes", value: "45" },
    { label: "60 Minutes", value: "60" },
];

const attemptsOptions = [
    { label: "Unlimited", value: "unlimited" },
    { label: "1 Attempt", value: "1" },
    { label: "2 Attempts", value: "2" },
    { label: "3 Attempts", value: "3" },
    { label: "5 Attempts", value: "5" },
];

const passingScoreOptions = [
    { label: "50%", value: "50" },
    { label: "60%", value: "60" },
    { label: "70%", value: "70" },
    { label: "80%", value: "80" },
    { label: "90%", value: "90" },
    { label: "100%", value: "100" },
];

const AddQuizPage = () => {
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<QuizFormValues>({
        resolver: zodResolver(quizFormSchema),
        defaultValues: {
            quizTitle: "",
            timeLimit: "30",
            attemptsAllowed: "unlimited",
            passingScore: "70",
            shuffleQuestions: false,
            questions: [
                {
                    type: "multiple-choice",
                    questionText: "",
                    options: [
                        { label: "A", value: "", isCorrect: true },
                        { label: "B", value: "", isCorrect: false },
                        { label: "C", value: "", isCorrect: false },
                        { label: "D", value: "", isCorrect: false },
                    ],
                },
            ],
        },
    });

    const {
        fields: questionFields,
        append: appendQuestion,
        remove: removeQuestion,
        update: updateQuestion,
    } = useFieldArray({ control, name: "questions" });

    const watchQuestions = watch("questions");

    const handleQuestionTypeChange = (index: number, type: "multiple-choice" | "true-false") => {
        if (type === "true-false") {
            updateQuestion(index, {
                type: "true-false",
                questionText: watchQuestions[index]?.questionText || "",
                options: [
                    { label: "True", value: "true", isCorrect: true },
                    { label: "False", value: "false", isCorrect: false },
                ],
            });
        } else {
            updateQuestion(index, {
                type: "multiple-choice",
                questionText: watchQuestions[index]?.questionText || "",
                options: [
                    { label: "A", value: "", isCorrect: true },
                    { label: "B", value: "", isCorrect: false },
                    { label: "C", value: "", isCorrect: false },
                    { label: "D", value: "", isCorrect: false },
                ],
            });
        }
    };

    const handleCorrectAnswerChange = (questionIndex: number, optionIndex: number) => {
        const currentQuestion = watchQuestions[questionIndex];
        if (!currentQuestion) return;

        const updatedOptions = currentQuestion.options.map((opt, idx) => ({
            ...opt,
            isCorrect: idx === optionIndex,
        }));

        updateQuestion(questionIndex, {
            ...currentQuestion,
            options: updatedOptions,
        });
    };

    const addOptionToQuestion = (questionIndex: number) => {
        const currentQuestion = watchQuestions[questionIndex];
        if (!currentQuestion || currentQuestion.type !== "multiple-choice") return;

        const nextLabel = String.fromCharCode(65 + currentQuestion.options.length); // E, F, G...
        const updatedOptions = [
            ...currentQuestion.options,
            { label: nextLabel, value: "", isCorrect: false },
        ];

        updateQuestion(questionIndex, {
            ...currentQuestion,
            options: updatedOptions,
        });
    };

    const onSubmit = (data: QuizFormValues) => {
        console.log("Quiz data:", data);
        // TODO: Save quiz to course section
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Link
                    href="/instructor/create-course"
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-title" />
                </Link>
                <h2 className="text-xl font-bold text-title">Add Quiz</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Quiz Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-title">Quiz</h3>
                        <button
                            type="button"
                            className="flex items-center gap-1.5 px-4 py-2 bg-main text-white text-sm font-medium rounded-md hover:bg-main/90 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Quiz
                        </button>
                    </div>
                    <div className="border-b border-border-light" />
                </div>

                {/* Quiz Settings */}
                <div className="bg-gray-50 rounded-md border border-border-light p-5 space-y-5">
                    <h4 className="text-base font-bold text-title">Quiz Settings</h4>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Time Limit */}
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">
                                Time Limit
                            </label>
                            <div className="relative">
                                <select
                                    {...register("timeLimit")}
                                    className="w-full border border-border-light rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main appearance-none bg-white pr-8"
                                >
                                    {timeLimitOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="w-4 h-4 text-description absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        {/* Attempts Allowed */}
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">
                                Attempts Allowed
                            </label>
                            <div className="relative">
                                <select
                                    {...register("attemptsAllowed")}
                                    className="w-full border border-border-light rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main appearance-none bg-white pr-8"
                                >
                                    {attemptsOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="w-4 h-4 text-description absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        {/* Passing Score */}
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">
                                Passing Score
                            </label>
                            <div className="relative">
                                <select
                                    {...register("passingScore")}
                                    className="w-full border border-border-light rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main appearance-none bg-white pr-8"
                                >
                                    {passingScoreOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="w-4 h-4 text-description absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quiz Questions */}
                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-title">Quiz Questions</h4>
                    <div className="border-b border-border-light" />

                    {questionFields.map((field, qIndex) => {
                        const currentQuestion = watchQuestions[qIndex];
                        const questionType = currentQuestion?.type || "multiple-choice";

                        return (
                            <div
                                key={field.id}
                                className="bg-gray-50 rounded-md border border-border-light p-5 space-y-4"
                            >
                                {/* Question Type & Question Text Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Question Type */}
                                    <div>
                                        <label className="text-sm font-medium text-title mb-1.5 block">
                                            Quiz Question Type
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={questionType}
                                                onChange={(e) =>
                                                    handleQuestionTypeChange(
                                                        qIndex,
                                                        e.target.value as "multiple-choice" | "true-false"
                                                    )
                                                }
                                                className="w-full border border-border-light rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main appearance-none bg-white pr-8"
                                            >
                                                <option value="multiple-choice">Multiple Choice</option>
                                                <option value="true-false">True / False</option>
                                            </select>
                                            <ChevronDown className="w-4 h-4 text-description absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Question Text */}
                                    <div className="md:col-span-2">
                                        <label className="text-sm font-medium text-title mb-1.5 block">
                                            Question {qIndex + 1}
                                        </label>
                                        <input
                                            {...register(`questions.${qIndex}.questionText`)}
                                            placeholder="Write question here..."
                                            className="w-full border border-border-light rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                                        />
                                        {errors.questions?.[qIndex]?.questionText && (
                                            <p className="text-xs text-red-500 mt-1">
                                                {errors.questions[qIndex].questionText?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Options */}
                                {questionType === "multiple-choice" ? (
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-title block">
                                            Options (Select the correct answer)
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {currentQuestion?.options.map((option, oIndex) => (
                                                <div key={oIndex} className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCorrectAnswerChange(qIndex, oIndex)}
                                                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors shrink-0 ${option.isCorrect
                                                                ? "bg-main text-white"
                                                                : "bg-white border border-border-light text-title hover:border-main"
                                                            }`}
                                                    >
                                                        {option.label}
                                                    </button>
                                                    <input
                                                        {...register(`questions.${qIndex}.options.${oIndex}.value`)}
                                                        placeholder={`Option ${option.label}`}
                                                        className="flex-1 border border-border-light rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Add Option */}
                                        <button
                                            type="button"
                                            onClick={() => addOptionToQuestion(qIndex)}
                                            className="text-sm text-main font-medium hover:text-main/80 transition-colors"
                                        >
                                            + Add Option
                                        </button>
                                    </div>
                                ) : (
                                    /* True/False Options */
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-title block">
                                            Select the correct answer
                                        </label>
                                        <div className="flex gap-4">
                                            {currentQuestion?.options.map((option, oIndex) => (
                                                <button
                                                    key={oIndex}
                                                    type="button"
                                                    onClick={() => handleCorrectAnswerChange(qIndex, oIndex)}
                                                    className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${option.isCorrect
                                                            ? "bg-main text-white"
                                                            : "bg-white border border-border-light text-title hover:border-main"
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Remove Question */}
                                {questionFields.length > 1 && (
                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            onClick={() => removeQuestion(qIndex)}
                                            className="flex items-center gap-1.5 text-sm text-red-500 font-medium hover:text-red-600 transition-colors"
                                        >
                                            <Trash className="w-4 h-4" />
                                            Remove Question
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Add Question */}
                    <button
                        type="button"
                        onClick={() =>
                            appendQuestion({
                                type: "multiple-choice",
                                questionText: "",
                                options: [
                                    { label: "A", value: "", isCorrect: true },
                                    { label: "B", value: "", isCorrect: false },
                                    { label: "C", value: "", isCorrect: false },
                                    { label: "D", value: "", isCorrect: false },
                                ],
                            })
                        }
                        className="w-full flex items-center justify-center gap-1.5 px-4 py-3 border-2 border-dashed border-border-light rounded-md text-sm font-medium text-description hover:text-main hover:border-main transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Question
                    </button>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border-light">
                    <Link
                        href="/instructor/create-course"
                        className="px-5 py-2.5 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                    >
                        Save Quiz
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddQuizPage;
