import { useTranslations } from "next-intl";
import { Plus, Trash2, ChevronDown, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type QuizQuestionType = "multiple-choice" | "true-false";

type QuizOption = {
    label: string;
    value: string;
    isCorrect: boolean;
};

type QuizQuestion = {
    id: string;
    type: QuizQuestionType;
    questionText: string;
    options: QuizOption[];
};

type QuizData = {
    title: string;
    description: string;
    timeLimit: string;
    attemptsAllowed: string;
    passingScore: string;
    shuffleQuestions: boolean;
    questions: QuizQuestion[];
};

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
    { label: "1x", value: "1" },
    { label: "2x", value: "2" },
    { label: "3x", value: "3" },
    { label: "5x", value: "5" },
    { label: "8x", value: "8" },
];

const passingScoreOptions = [
    { label: "50%", value: "50" },
    { label: "60%", value: "60" },
    { label: "70%", value: "70" },
    { label: "80%", value: "80" },
    { label: "90%", value: "90" },
    { label: "100%", value: "100" },
];

type Props = {
    open: boolean;
    onClose: () => void;
    quizData: QuizData;
    updateQuizField: (field: keyof QuizData, value: string | boolean) => void;
    addQuizQuestion: () => void;
    removeQuizQuestion: (questionId: string) => void;
    updateQuizQuestion: (questionId: string, field: string, value: string) => void;
    changeQuestionType: (questionId: string, type: QuizQuestionType) => void;
    updateQuizOption: (questionId: string, optionIndex: number, value: string) => void;
    setCorrectOption: (questionId: string, optionIndex: number) => void;
    onSave: () => void | Promise<void>;
    isSaving?: boolean;
};

const AddQuizModal = ({ open, onClose, quizData, updateQuizField, addQuizQuestion, removeQuizQuestion, updateQuizQuestion, changeQuestionType, updateQuizOption, setCorrectOption, onSave, isSaving = false}: Props) => {
    const t = useTranslations("InstructorCreateCourse");
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[calc(100%-2rem)] max-w-full xl:max-w-285 max-h-[90vh] overflow-y-auto lg:left-[calc(50%+10rem)] lg:w-[calc(100%-20rem-2rem)] lg:max-w-285">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-main">{t("createQuizTitle")}</DialogTitle>
                    <DialogDescription className="text-base text-description">{t("questionForLessons")}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-2">
                    {/* Top Row: Left = Title & Description, Right = Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Side - Quiz Title & Description */}
                        <div className="space-y-4 border rounded-md border-border-light p-4">
                            <div>
                                <h3 className="text-lg font-semibold text-title">{t("quiz")}</h3>
                                <p className="text-sm text-description">{t("quizDetails")}</p>
                            </div>
                            <div className="border border-border-light p-4 rounded-md">
                                <div>
                                    <label className="text-sm font-medium text-title mb-1.5 block">{t("questionTitle")}</label>
                                    <input
                                        value={quizData.title}
                                        onChange={(e) => updateQuizField("title", e.target.value)}
                                        placeholder={t("quizTitlePlaceholder")}
                                        className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-title mb-1.5 block">{t("briefDescription")}</label>
                                    <textarea
                                        value={quizData.description}
                                        onChange={(e) => updateQuizField("description", e.target.value)}
                                        rows={4}
                                        placeholder={t("briefDescriptionPlaceholder")}
                                        className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Quiz Settings */}
                        <div className="rounded-md border border-border-light p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-base font-bold text-title">{t("quizSettings")}</h4>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-title mb-1 block">{t("timeLimit")}</label>
                                <div className="relative">
                                    <select
                                        value={quizData.timeLimit}
                                        onChange={(e) => updateQuizField("timeLimit", e.target.value)}
                                        className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main appearance-none bg-white pr-8"
                                    >
                                        {timeLimitOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-description absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-title mb-1 block">{t("attemptsAllowed")}</label>
                                <div className="relative">
                                    <select
                                        value={quizData.attemptsAllowed}
                                        onChange={(e) => updateQuizField("attemptsAllowed", e.target.value)}
                                        className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main appearance-none bg-white pr-8"
                                    >
                                        {attemptsOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-description absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-title mb-1 block">{t("passingScore")}</label>
                                <div className="relative">
                                    <select
                                        value={quizData.passingScore}
                                        onChange={(e) => updateQuizField("passingScore", e.target.value)}
                                        className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main appearance-none bg-white pr-8"
                                    >
                                        {passingScoreOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-description absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                            <label className="flex items-center gap-2 text-sm text-title">
                                <input
                                    type="checkbox"
                                    checked={quizData.shuffleQuestions}
                                    onChange={(e) => updateQuizField("shuffleQuestions", e.target.checked)}
                                />
                                Shuffle Questions
                            </label>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-b border-border-light" />

                    {/* Quiz Questions */}
                    <div className="space-y-4 border border-border-light rounded-md p-4">
                        <h4 className="text-lg font-semibold text-main">{t("quizQuestions")}</h4>

                        {quizData.questions.map((question, qIndex) => (
                            <div
                                key={question.id}
                                className="bg-gray-50 rounded-md border border-border-light p-4 space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-semibold text-title">{t("question")} {qIndex + 1}</span>
                                    {quizData.questions.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeQuizQuestion(question.id)}
                                            className="p-1 hover:bg-red-50 rounded transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div>
                                        <label className="text-sm font-medium text-title mb-1 block">{t("questionType")}</label>
                                        <div className="relative">
                                            <select
                                                value={question.type}
                                                onChange={(e) => changeQuestionType(question.id, e.target.value as QuizQuestionType)}
                                                className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main appearance-none bg-white pr-8"
                                            >
                                                <option value="multiple-choice">{t("multipleChoice")}</option>
                                                <option value="true-false">{t("trueOrFalse")}</option>
                                            </select>
                                            <ChevronDown className="w-4 h-4 text-description absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-sm font-medium text-title mb-1 block">{t("question")}</label>
                                        <input
                                            value={question.questionText}
                                            onChange={(e) => updateQuizQuestion(question.id, "questionText", e.target.value)}
                                            placeholder={t("questionPlaceholder")}
                                            className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                                        />
                                    </div>
                                </div>

                                {question.type === "multiple-choice" && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-title block">{t("options")}</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {question.options.map((option, oIndex) => (
                                                <div key={oIndex} className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setCorrectOption(question.id, oIndex)}
                                                        className={`size-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors shrink-0 ${option.isCorrect
                                                            ? "bg-main text-white"
                                                            : "bg-white border border-border-light text-title hover:border-main"
                                                            }`}
                                                    >
                                                        {option.label}
                                                    </button>
                                                    <input
                                                        value={option.value}
                                                        onChange={(e) => updateQuizOption(question.id, oIndex, e.target.value)}
                                                        placeholder={`Option ${option.label}`}
                                                        className="flex-1 border border-border-light rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {question.type === "true-false" && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-title block">{t("selectCorrectAnswer")}</label>
                                        <div className="flex gap-3">
                                            {question.options.map((option, oIndex) => (
                                                <button
                                                    key={oIndex}
                                                    type="button"
                                                    onClick={() => setCorrectOption(question.id, oIndex)}
                                                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${option.isCorrect
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
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addQuizQuestion}
                            className="w-full flex items-center justify-center gap-1.5 px-4 py-3 border-2 border-dashed border-border-light rounded-md text-sm font-medium text-description hover:text-main hover:border-main transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            {t("addQuestion")}
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2 border-t border-border-light">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSaving}
                            className="px-4 py-3 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="button"
                            onClick={onSave}
                            disabled={isSaving}
                            className="px-5 py-3 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                            {t("saveQuiz")}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddQuizModal;
