"use client";
import { useState } from "react";
import { Plus, GripVertical, Pencil, Trash2, ChevronDown, ChevronUp, Video, FileText, Upload, File, Menu, StickyNote, AlignLeft, X } from "lucide-react";
import { TCourseSection, TCourseLecture } from "@/lib/instructor";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


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
                                    className="flex items-center gap-1 px-3 py-2 border border-dashed border-border-light rounded-md text-xs font-medium text-description hover:text-title hover:border-main transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Lecture
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openQuizModal(section.id)}
                                    className="flex items-center gap-1 px-3 py-2 border border-dashed border-border-light rounded-md text-xs font-medium text-description hover:text-title hover:border-main transition-colors"
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
            <Dialog open={modalType === "editLecture"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">Edit Lecture Name</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">Lecture Name</label>
                            <input
                                value={editingLectureTitle}
                                onChange={(e) => setEditingLectureTitle(e.target.value)}
                                placeholder="Write your lecture name here..."
                                className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveEditLecture}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Section Modal */}
            <Dialog open={modalType === "editSection"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">Edit Section Name</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">Section</label>
                            <input
                                value={editingSectionTitle}
                                onChange={(e) => setEditingSectionTitle(e.target.value)}
                                placeholder="Write your section name here..."
                                className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveEditSection}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Lecture Video Modal */}
            <Dialog open={modalType === "lectureVideo"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">Lecture Video</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        {uploadedVideo ? (
                            <div className="flex gap-4 items-start">
                                <div className="w-32 h-20 bg-gray-100 rounded-md overflow-hidden">
                                    <video src={uploadedVideo.preview} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-green-600 uppercase">FILE UPLOADED</span>
                                        <span className="text-xs text-description">• 1:55</span>
                                    </div>
                                    <p className="text-sm text-title truncate">{uploadedVideo.name}</p>
                                    <button
                                        onClick={() => setUploadedVideo(null)}
                                        className="text-sm text-main mt-2"
                                    >
                                        Replace Video
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-border-light rounded-md p-6 text-center">
                                <p className="text-sm text-description mb-2">Upload Files</p>
                                <label className="inline-flex items-center gap-2 px-4 py-2 text-main text-sm font-medium hover:text-main/80 cursor-pointer">
                                    <Upload className="w-4 h-4" />
                                    Upload File
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setUploadedVideo({
                                                    name: file.name,
                                                    preview: URL.createObjectURL(file),
                                                });
                                            }
                                        }}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-description mt-2">
                                    Note: All files should be at least 720p in a lesson
                                </p>
                            </div>
                        )}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Upload Video
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Lecture Description Modal */}
            <Dialog open={modalType === "lectureDescription"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">Add Lecture Description</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        <div className="border-2 border-dashed border-main rounded-md p-4">
                            <textarea
                                value={lectureDescription}
                                onChange={(e) => setLectureDescription(e.target.value)}
                                rows={4}
                                placeholder="Write your lecture description here..."
                                className="w-full text-sm focus:outline-none resize-none"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Add Description
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Lecture Notes Modal */}
            <Dialog open={modalType === "lectureNotes"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">Add Lecture Notes</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">Notes</label>
                            <textarea
                                value={lectureNotes}
                                onChange={(e) => setLectureNotes(e.target.value)}
                                rows={4}
                                placeholder="Write your lecture Notes here..."
                                className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main resize-none"
                            />
                        </div>
                        <div className="border border-dashed border-border-light rounded-md p-4 text-center">
                            <p className="text-sm font-medium text-title mb-2">Uploads Notes</p>
                            <label className="text-sm text-description cursor-pointer">
                                Drag and drop a file or <span className="text-main">Browse file</span>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Add Notes
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Attach File Modal */}
            <Dialog open={modalType === "attachFile"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">Attach File</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        <div className="border border-dashed border-border-light rounded-md p-6 text-center">
                            <p className="text-sm font-medium text-title mb-2">Attach File</p>
                            <label className="text-sm text-description cursor-pointer">
                                Drag and drop a file or <span className="text-main">Browse file</span>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Save & upload
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Quiz Modal */}
            <Dialog open={modalType === "addQuiz"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">Add Quiz</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 mt-2">
                        {/* Top Row: Left = Title & Description, Right = Settings */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Side - Quiz Title & Description */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-title mb-1.5 block">Quiz Title</label>
                                    <input
                                        value={quizData.title}
                                        onChange={(e) => updateQuizField("title", e.target.value)}
                                        placeholder="Enter quiz title..."
                                        className="w-full border border-border-light rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-title mb-1.5 block">Description</label>
                                    <textarea
                                        value={quizData.description}
                                        onChange={(e) => updateQuizField("description", e.target.value)}
                                        rows={4}
                                        placeholder="Enter quiz description..."
                                        className="w-full border border-border-light rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main resize-none"
                                    />
                                </div>
                            </div>

                            {/* Right Side - Quiz Settings */}
                            <div className="bg-gray-50 rounded-md border border-border-light p-4 space-y-4">
                                <h4 className="text-sm font-bold text-title">Quiz Settings</h4>
                                <div>
                                    <label className="text-xs font-medium text-title mb-1 block">Time Limit</label>
                                    <div className="relative">
                                        <select
                                            value={quizData.timeLimit}
                                            onChange={(e) => updateQuizField("timeLimit", e.target.value)}
                                            className="w-full border border-border-light rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main appearance-none bg-white pr-8"
                                        >
                                            {timeLimitOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-description absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-title mb-1 block">Attempts Allowed</label>
                                    <div className="relative">
                                        <select
                                            value={quizData.attemptsAllowed}
                                            onChange={(e) => updateQuizField("attemptsAllowed", e.target.value)}
                                            className="w-full border border-border-light rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main appearance-none bg-white pr-8"
                                        >
                                            {attemptsOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-description absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-title mb-1 block">Passing Score</label>
                                    <div className="relative">
                                        <select
                                            value={quizData.passingScore}
                                            onChange={(e) => updateQuizField("passingScore", e.target.value)}
                                            className="w-full border border-border-light rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main appearance-none bg-white pr-8"
                                        >
                                            {passingScoreOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-description absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-b border-border-light" />

                        {/* Quiz Questions */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-title">Quiz Questions</h4>

                            {quizData.questions.map((question, qIndex) => (
                                <div
                                    key={question.id}
                                    className="bg-gray-50 rounded-md border border-border-light p-4 space-y-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-title">Question {qIndex + 1}</span>
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
                                        {/* Question Type */}
                                        <div>
                                            <label className="text-xs font-medium text-title mb-1 block">Question Type</label>
                                            <div className="relative">
                                                <select
                                                    value={question.type}
                                                    onChange={(e) => changeQuestionType(question.id, e.target.value as QuizQuestionType)}
                                                    className="w-full border border-border-light rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main appearance-none bg-white pr-8"
                                                >
                                                    <option value="multiple-choice">Multiple Choice</option>
                                                    <option value="true-false">True or False</option>
                                                    <option value="short-answer">Question Answers</option>
                                                </select>
                                                <ChevronDown className="w-4 h-4 text-description absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Question Text */}
                                        <div className="md:col-span-2">
                                            <label className="text-xs font-medium text-title mb-1 block">Question</label>
                                            <input
                                                value={question.questionText}
                                                onChange={(e) => updateQuizQuestion(question.id, "questionText", e.target.value)}
                                                placeholder="Write question here..."
                                                className="w-full border border-border-light rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Options based on type */}
                                    {question.type === "multiple-choice" && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-title block">Options (Select the correct answer)</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {question.options.map((option, oIndex) => (
                                                    <div key={oIndex} className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => setCorrectOption(question.id, oIndex)}
                                                            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors shrink-0 ${
                                                                option.isCorrect
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
                                                            className="flex-1 border border-border-light rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {question.type === "true-false" && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-title block">Select the correct answer</label>
                                            <div className="flex gap-3">
                                                {question.options.map((option, oIndex) => (
                                                    <button
                                                        key={oIndex}
                                                        type="button"
                                                        onClick={() => setCorrectOption(question.id, oIndex)}
                                                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                                                            option.isCorrect
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

                                    {question.type === "short-answer" && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-title block">Correct Answer</label>
                                            <input
                                                value={question.answer || ""}
                                                onChange={(e) => updateQuizQuestion(question.id, "answer", e.target.value)}
                                                placeholder="Write the correct answer here..."
                                                className="w-full border border-border-light rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Add Question Button */}
                            <button
                                type="button"
                                onClick={addQuizQuestion}
                                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 border-2 border-dashed border-border-light rounded-md text-sm font-medium text-description hover:text-main hover:border-main transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Question
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-2 border-t border-border-light">
                            <button
                                type="button"
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={saveQuiz}
                                className="px-5 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Save Quiz
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CurriculumTab;
