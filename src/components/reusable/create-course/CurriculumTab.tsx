/* eslint-disable react-hooks/purity */
"use client";
import { useState } from "react";
import { Plus, GripVertical, Pencil, Trash2, ChevronDown, ChevronUp, Video, FileText, File, Menu, StickyNote, AlignLeft } from "lucide-react";
import { TCourseSection, TCourseLecture } from "@/lib/instructor";
import EditLectureModal from "@/components/modal/create-course/EditLectureModal";
import EditSectionModal from "@/components/modal/create-course/EditSectionModal";
import LectureVideoModal from "@/components/modal/create-course/LectureVideoModal";
import LectureDescriptionModal from "@/components/modal/create-course/LectureDescriptionModal";
import LectureNotesModal from "@/components/modal/create-course/LectureNotesModal";
import AttachFileModal from "@/components/modal/create-course/AttachFileModal";
import AddQuizModal from "@/components/modal/create-course/AddQuizModal";


type Props = {
    sections: TCourseSection[];
    setSections: (val: TCourseSection[]) => void;
    onNext: () => void;
    onPrev: () => void;
};

type ModalType = "editSection" | "editLecture" | "lectureVideo" | "lectureNotes" | "lectureDescription" | "attachFile" | "addQuiz" | null;

type QuizQuestionType = "multiple-choice" | "true-false" | "short-answer";

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
    answer?: string;
};

type QuizData = {
    title: string;
    description: string;
    timeLimit: string;
    attemptsAllowed: string;
    passingScore: string;
    questions: QuizQuestion[];
};

const defaultMultipleChoiceOptions: QuizOption[] = [
    { label: "A", value: "", isCorrect: true },
    { label: "B", value: "", isCorrect: false },
    { label: "C", value: "", isCorrect: false },
    { label: "D", value: "", isCorrect: false },
];

const defaultTrueFalseOptions: QuizOption[] = [
    { label: "True", value: "true", isCorrect: true },
    { label: "False", value: "false", isCorrect: false },
];

const CurriculumTab = ({ sections, setSections, onNext, onPrev }: Props) => {
    const [expandedSections, setExpandedSections] = useState<string[]>(
        sections.map((s) => s.id)
    );
    const [modalType, setModalType] = useState<ModalType>(null);
    const [selectedSection, setSelectedSection] = useState<TCourseSection | null>(null);
    const [selectedLecture, setSelectedLecture] = useState<{ sectionId: string; lecture: TCourseLecture } | null>(null);
    const [editingSectionTitle, setEditingSectionTitle] = useState("");
    const [editingLectureTitle, setEditingLectureTitle] = useState("");
    const [lectureNotes, setLectureNotes] = useState("");
    const [lectureDescription, setLectureDescription] = useState("");
    const [uploadedVideo, setUploadedVideo] = useState<{ name: string; preview: string } | null>(null);
    const [quizSectionId, setQuizSectionId] = useState<string | null>(null);
    const [quizData, setQuizData] = useState<QuizData>({
        title: "",
        description: "",
        timeLimit: "30",
        attemptsAllowed: "unlimited",
        passingScore: "70",
        questions: [
            {
                id: `q-${Date.now()}`,
                type: "multiple-choice",
                questionText: "",
                options: [...defaultMultipleChoiceOptions],
            },
        ],
    });

    const toggleSection = (id: string) => {
        setExpandedSections((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    // Section operations
    const addSection = () => {
        const newSection: TCourseSection = {
            id: `section-${Date.now()}`,
            title: `Section ${sections.length + 1}: New Section`,
            lectures: [],
        };
        setSections([...sections, newSection]);
        setExpandedSections((prev) => [...prev, newSection.id]);
    };

    const deleteSection = (sectionId: string) => {
        setSections(sections.filter((s) => s.id !== sectionId));
    };

    const openEditSection = (section: TCourseSection) => {
        setSelectedSection(section);
        setEditingSectionTitle(section.title);
        setModalType("editSection");
    };

    const saveEditSection = () => {
        if (!selectedSection || !editingSectionTitle.trim()) return;
        setSections(
            sections.map((s) =>
                s.id === selectedSection.id ? { ...s, title: editingSectionTitle.trim() } : s
            )
        );
        setModalType(null);
    };

    // Lecture operations
    const addLecture = (sectionId: string) => {
        const newLecture: TCourseLecture = {
            id: `lecture-${Date.now()}`,
            title: "New Lecture",
            type: "video",
        };
        setSections(
            sections.map((s) =>
                s.id === sectionId ? { ...s, lectures: [...s.lectures, newLecture] } : s
            )
        );
    };

    const deleteLecture = (sectionId: string, lectureId: string) => {
        setSections(
            sections.map((s) =>
                s.id === sectionId
                    ? { ...s, lectures: s.lectures.filter((l) => l.id !== lectureId) }
                    : s
            )
        );
    };

    const openLectureModal = (sectionId: string, lecture: TCourseLecture, type: ModalType) => {
        setSelectedLecture({ sectionId, lecture });
        if (type === "editLecture") {
            setEditingLectureTitle(lecture.title);
        }
        setModalType(type);
    };

    // Quiz operations
    const openQuizModal = (sectionId: string) => {
        setQuizSectionId(sectionId);
        setQuizData({
            title: "",
            description: "",
            timeLimit: "30",
            attemptsAllowed: "unlimited",
            passingScore: "70",
            questions: [
                {
                    id: `q-${Date.now()}`,
                    type: "multiple-choice",
                    questionText: "",
                    options: [...defaultMultipleChoiceOptions],
                },
            ],
        });
        setModalType("addQuiz");
    };

    const updateQuizField = (field: keyof QuizData, value: string) => {
        setQuizData((prev) => ({ ...prev, [field]: value }));
    };

    const addQuizQuestion = () => {
        setQuizData((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    id: `q-${Date.now()}`,
                    type: "multiple-choice",
                    questionText: "",
                    options: [...defaultMultipleChoiceOptions],
                },
            ],
        }));
    };

    const removeQuizQuestion = (questionId: string) => {
        setQuizData((prev) => ({
            ...prev,
            questions: prev.questions.filter((q) => q.id !== questionId),
        }));
    };

    const updateQuizQuestion = (questionId: string, field: string, value: string) => {
        setQuizData((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId ? { ...q, [field]: value } : q
            ),
        }));
    };

    const changeQuestionType = (questionId: string, type: QuizQuestionType) => {
        setQuizData((prev) => ({
            ...prev,
            questions: prev.questions.map((q) => {
                if (q.id !== questionId) return q;
                if (type === "true-false") {
                    return { ...q, type, options: [...defaultTrueFalseOptions], answer: undefined };
                }
                if (type === "short-answer") {
                    return { ...q, type, options: [], answer: "" };
                }
                return { ...q, type, options: [...defaultMultipleChoiceOptions], answer: undefined };
            }),
        }));
    };

    const updateQuizOption = (questionId: string, optionIndex: number, value: string) => {
        setQuizData((prev) => ({
            ...prev,
            questions: prev.questions.map((q) => {
                if (q.id !== questionId) return q;
                const newOptions = q.options.map((opt, idx) =>
                    idx === optionIndex ? { ...opt, value } : opt
                );
                return { ...q, options: newOptions };
            }),
        }));
    };

    const setCorrectOption = (questionId: string, optionIndex: number) => {
        setQuizData((prev) => ({
            ...prev,
            questions: prev.questions.map((q) => {
                if (q.id !== questionId) return q;
                const newOptions = q.options.map((opt, idx) => ({
                    ...opt,
                    isCorrect: idx === optionIndex,
                }));
                return { ...q, options: newOptions };
            }),
        }));
    };

    const saveQuiz = () => {
        if (!quizSectionId || !quizData.title.trim()) return;
        console.log("Quiz saved:", { sectionId: quizSectionId, ...quizData });
        setModalType(null);
    };

    const saveEditLecture = () => {
        if (!selectedLecture || !editingLectureTitle.trim()) return;
        setSections(
            sections.map((s) =>
                s.id === selectedLecture.sectionId
                    ? {
                        ...s,
                        lectures: s.lectures.map((l) =>
                            l.id === selectedLecture.lecture.id
                                ? { ...l, title: editingLectureTitle.trim() }
                                : l
                        ),
                    }
                    : s
            )
        );
        setModalType(null);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-title">Curriculum</h3>
            <div className="border-b border-border-light" />

            {sections.map((section) => (
                <div
                    key={section.id}
                    className="border border-border-light rounded-md overflow-hidden"
                >
                    {/* Section Header */}
                    <div className="bg-gray-50 px-4 py-3 flex items-center gap-2">
                        <Menu className="w-4 h-4 text-description cursor-grab shrink-0" />
                        <button
                            type="button"
                            onClick={() => toggleSection(section.id)}
                            className="p-0.5"
                        >
                            {expandedSections.includes(section.id) ? (
                                <ChevronUp className="w-4 h-4 text-description" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-description" />
                            )}
                        </button>

                        <span className="flex-1 text-sm font-semibold text-title">
                            {section.title}
                        </span>

                        <div className="flex items-center gap-1 shrink-0">
                            <button
                                type="button"
                                onClick={() => openEditSection(section)}
                                className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                            >
                                <Pencil className="w-3.5 h-3.5 text-description" />
                            </button>
                            <button
                                type="button"
                                onClick={() => deleteSection(section.id)}
                                className="p-1.5 hover:bg-red-50 rounded transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                        </div>
                    </div>

                    {/* Lectures */}
                    {expandedSections.includes(section.id) && (
                        <div className="p-4 space-y-2">
                            {section.lectures.map((lecture, lIndex) => (
                                <div
                                    key={lecture.id}
                                    className="flex items-center gap-2 px-3 py-3 bg-white border border-border-light rounded-md"
                                >
                                    <GripVertical className="w-3.5 h-3.5 text-description cursor-grab shrink-0" />
                                    {lecture.type === "video" ? (
                                        <Video className="w-4 h-4 text-main shrink-0" />
                                    ) : (
                                        <FileText className="w-4 h-4 text-main shrink-0" />
                                    )}

                                    <span className="flex-1 text-sm text-title">
                                        Lecture {lIndex + 1}: {lecture.title}
                                    </span>

                                    {lecture.duration && (
                                        <span className="text-xs text-description shrink-0">
                                            {lecture.duration}
                                        </span>
                                    )}

                                    <div className="flex items-center gap-1 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => openLectureModal(section.id, lecture, "lectureVideo")}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors text-xs text-main"
                                            title="Upload Video"
                                        >
                                            <Video className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openLectureModal(section.id, lecture, "attachFile")}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors text-xs text-main"
                                            title="Attach File"
                                        >
                                            <File className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openLectureModal(section.id, lecture, "lectureNotes")}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors text-xs text-main"
                                            title="Add Lecture Notes"
                                        >
                                            <StickyNote className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openLectureModal(section.id, lecture, "lectureDescription")}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                                            title="Edit Description"
                                        >
                                            <AlignLeft className="w-3 h-3 text-description" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openLectureModal(section.id, lecture, "editLecture")}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                                            title="Edit Lecture Name"
                                        >
                                            <Pencil className="w-3 h-3 text-description" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteLecture(section.id, lecture.id)}
                                            className="p-1 hover:bg-red-50 rounded transition-colors"
                                        >
                                            <Trash2 className="w-3 h-3 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add Lecture & Add Quiz */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => addLecture(section.id)}
                                    className="flex items-center gap-1 p-3 border border-dashed border-border-light rounded-md text-xs font-medium text-description hover:text-title hover:border-main transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Lecture
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openQuizModal(section.id)}
                                    className="flex items-center gap-1 p-3 border border-dashed border-border-light rounded-md text-xs font-medium text-description hover:text-title hover:border-main transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Quiz
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Add Section */}
            <button
                type="button"
                onClick={addSection}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-3 border-2 border-dashed border-border-light rounded-md text-sm font-medium text-description hover:text-main hover:border-main transition-colors"
            >
                <Plus className="w-4 h-4" />
                Add New Section
            </button>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-border-light">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-5 py-3 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    className="px-5 py-3 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                >
                    Save & Next
                </button>
            </div>

            {/* Edit Lecture Name Modal */}
            <EditLectureModal
                open={modalType === "editLecture"}
                onClose={() => setModalType(null)}
                editingLectureTitle={editingLectureTitle}
                setEditingLectureTitle={setEditingLectureTitle}
                onSave={saveEditLecture}
            />

            {/* Edit Section Modal */}
            <EditSectionModal
                open={modalType === "editSection"}
                onClose={() => setModalType(null)}
                editingSectionTitle={editingSectionTitle}
                setEditingSectionTitle={setEditingSectionTitle}
                onSave={saveEditSection}
            />

            {/* Lecture Video Modal */}
            <LectureVideoModal
                open={modalType === "lectureVideo"}
                onClose={() => setModalType(null)}
                uploadedVideo={uploadedVideo}
                setUploadedVideo={setUploadedVideo}
            />

            {/* Lecture Description Modal */}
            <LectureDescriptionModal
                open={modalType === "lectureDescription"}
                onClose={() => setModalType(null)}
                lectureDescription={lectureDescription}
                setLectureDescription={setLectureDescription}
            />

            {/* Lecture Notes Modal */}
            <LectureNotesModal
                open={modalType === "lectureNotes"}
                onClose={() => setModalType(null)}
                lectureNotes={lectureNotes}
                setLectureNotes={setLectureNotes}
            />

            {/* Attach File Modal */}
            <AttachFileModal
                open={modalType === "attachFile"}
                onClose={() => setModalType(null)}
            />

            {/* Add Quiz Modal */}
            <AddQuizModal
                open={modalType === "addQuiz"}
                onClose={() => setModalType(null)}
                quizData={quizData}
                updateQuizField={updateQuizField}
                addQuizQuestion={addQuizQuestion}
                removeQuizQuestion={removeQuizQuestion}
                updateQuizQuestion={updateQuizQuestion}
                changeQuestionType={changeQuestionType}
                updateQuizOption={updateQuizOption}
                setCorrectOption={setCorrectOption}
                onSave={saveQuiz}
            />
        </div>
    );
};

export default CurriculumTab;
