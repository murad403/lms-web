"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

type QuizFormValues = {
    title: string;
    timeLimit: number;
    passingScore: number;
    questions: {
        question: string;
        options: { value: string }[];
        correctAnswer: number;
        points: number;
    }[];
};

const AddQuizPage = () => {
    const {
        register,
        control,
        handleSubmit,
        watch,
    } = useForm<QuizFormValues>({
        defaultValues: {
            title: "",
            timeLimit: 30,
            passingScore: 70,
            questions: [
                {
                    question: "",
                    options: [
                        { value: "" },
                        { value: "" },
                        { value: "" },
                        { value: "" },
                    ],
                    correctAnswer: 0,
                    points: 10,
                },
            ],
        },
    });

    const {
        fields: questionFields,
        append: appendQuestion,
        remove: removeQuestion,
    } = useFieldArray({ control, name: "questions" });

    const onSubmit = (data: QuizFormValues) => {
        // TODO: Save quiz to course section
        console.log("Quiz data:", data);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Link
                    href="/instructor/create-course"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-title" />
                </Link>
                <h2 className="text-lg sm:text-xl font-bold text-title">
                    Add Quiz
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Quiz Settings */}
                <div className="bg-white rounded-lg border border-border-light p-4 sm:p-6 space-y-4">
                    <h3 className="text-base font-bold text-title">Quiz Settings</h3>

                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            Quiz Title
                        </label>
                        <input
                            {...register("title", { required: true })}
                            placeholder="e.g., Module 1 Assessment"
                            className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">
                                Time Limit (minutes)
                            </label>
                            <input
                                {...register("timeLimit", { required: true, valueAsNumber: true })}
                                type="number"
                                min={1}
                                className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">
                                Passing Score (%)
                            </label>
                            <input
                                {...register("passingScore", { required: true, valueAsNumber: true })}
                                type="number"
                                min={0}
                                max={100}
                                className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                            />
                        </div>
                    </div>
                </div>

                {/* Questions */}
                {questionFields.map((field, qIndex) => (
                    <div
                        key={field.id}
                        className="bg-white rounded-lg border border-border-light p-4 sm:p-6 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-title">
                                Question {qIndex + 1}
                            </h3>
                            {questionFields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(qIndex)}
                                    className="p-1.5 hover:bg-red-50 rounded transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">
                                Question Text
                            </label>
                            <textarea
                                {...register(`questions.${qIndex}.question`, { required: true })}
                                rows={2}
                                placeholder="Enter your question..."
                                className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main resize-none"
                            />
                        </div>

                        {/* Options */}
                        <div className="space-y-2.5">
                            <label className="text-sm font-medium text-title block">
                                Options
                            </label>
                            {[0, 1, 2, 3].map((oIndex) => (
                                <div key={oIndex} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        {...register(`questions.${qIndex}.correctAnswer`, {
                                            valueAsNumber: true,
                                        })}
                                        value={oIndex}
                                        className="accent-main"
                                    />
                                    <input
                                        {...register(
                                            `questions.${qIndex}.options.${oIndex}.value`,
                                            { required: true }
                                        )}
                                        placeholder={`Option ${oIndex + 1}`}
                                        className="flex-1 border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                                    />
                                </div>
                            ))}
                            <p className="text-xs text-description mt-1">
                                Select the radio button next to the correct answer
                            </p>
                        </div>

                        {/* Points */}
                        <div className="w-32">
                            <label className="text-sm font-medium text-title mb-1.5 block">
                                Points
                            </label>
                            <input
                                {...register(`questions.${qIndex}.points`, {
                                    required: true,
                                    valueAsNumber: true,
                                })}
                                type="number"
                                min={1}
                                className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                            />
                        </div>
                    </div>
                ))}

                {/* Add Question */}
                <button
                    type="button"
                    onClick={() =>
                        appendQuestion({
                            question: "",
                            options: [
                                { value: "" },
                                { value: "" },
                                { value: "" },
                                { value: "" },
                            ],
                            correctAnswer: 0,
                            points: 10,
                        })
                    }
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-3 border-2 border-dashed border-border-light rounded-lg text-sm font-medium text-description hover:text-main hover:border-main transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Question
                </button>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/instructor/create-course"
                        className="px-5 py-2.5 border border-border-light rounded-lg text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition-colors"
                    >
                        Save Quiz
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddQuizPage;
