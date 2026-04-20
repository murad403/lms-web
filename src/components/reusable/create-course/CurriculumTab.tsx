"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
    Plus,
    GripVertical,
    Pencil,
    Trash2,
    ChevronDown,
    ChevronUp,
    Video,
    FileText,
    File,
    Menu,
    StickyNote,
    AlignLeft,
    Loader2,
} from "lucide-react";
import { TCourseSection, TCourseLecture } from "@/lib/instructor";
import EditLectureModal from "@/components/modal/create-course/EditLectureModal";
import EditSectionModal from "@/components/modal/create-course/EditSectionModal";
import LectureVideoModal from "@/components/modal/create-course/LectureVideoModal";
import LectureDescriptionModal from "@/components/modal/create-course/LectureDescriptionModal";
import LectureNotesModal from "@/components/modal/create-course/LectureNotesModal";
import AttachFileModal from "@/components/modal/create-course/AttachFileModal";
import AddQuizModal from "@/components/modal/create-course/AddQuizModal";
import {
    useAddCourseLectureMutation,
    useAddCourseQuizMutation,
    useAddCourseSectionMutation,
    useDeleteCourseLectureMutation,
    useDeleteCourseSectionMutation,
    useUpdateCourseLectureMutation,
    useUpdateCourseSectionMutation,
} from "@/redux/features/instructor/instructor.api";
import { toast } from "sonner";

type Props = {
    sections: TCourseSection[];
    setSections: (val: TCourseSection[]) => void;
    onNext: () => void | Promise<boolean>;
    onPrev: () => void;
    courseId?: number | null;
};

type ModalType =
    | "editSection"
    | "editLecture"
    | "lectureVideo"
    | "lectureNotes"
    | "lectureDescription"
    | "attachFile"
    | "addQuiz"
    | null;

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

type DraftLecture = TCourseLecture & {
    videoFile?: File | null;
    lectureAttachmentFile?: File | null;
    lectureNoteFile?: File | null;
};

type SectionQuizDraft = {
    data: QuizData;
    synced: boolean;
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

const createDefaultQuizData = (): QuizData => ({
    title: "",
    description: "",
    timeLimit: "30",
    attemptsAllowed: "3",
    passingScore: "70",
    shuffleQuestions: true,
    questions: [
        {
            id: `q-${Date.now()}`,
            type: "multiple-choice",
            questionText: "",
            options: [...defaultMultipleChoiceOptions],
        },
    ],
});

const CurriculumTab = ({ sections, setSections, onNext, onPrev, courseId }: Props) => {
    const t = useTranslations("InstructorCreateCourse");
    const [addCourseSection] = useAddCourseSectionMutation();
    const [updateCourseSection] = useUpdateCourseSectionMutation();
    const [deleteCourseSection] = useDeleteCourseSectionMutation();
    const [addCourseLecture] = useAddCourseLectureMutation();
    const [updateCourseLecture] = useUpdateCourseLectureMutation();
    const [deleteCourseLecture] = useDeleteCourseLectureMutation();
    const [addCourseQuiz] = useAddCourseQuizMutation();

    const [expandedSections, setExpandedSections] = useState<string[]>(sections.map((s) => String(s.id)));
    const [modalType, setModalType] = useState<ModalType>(null);
    const [selectedSection, setSelectedSection] = useState<TCourseSection | null>(null);
    const [selectedLecture, setSelectedLecture] = useState<{ sectionId: string | number; lecture: TCourseLecture } | null>(null);
    const [creatingLectureSectionId, setCreatingLectureSectionId] = useState<string | number | null>(null);

    const [editingSectionTitle, setEditingSectionTitle] = useState("");
    const [editingLectureTitle, setEditingLectureTitle] = useState("");
    const [lectureNotes, setLectureNotes] = useState("");
    const [lectureDescription, setLectureDescription] = useState("");
    const [uploadedVideo, setUploadedVideo] = useState<{ name: string; preview: string; file?: File } | null>(null);
    const [lectureAttachmentFile, setLectureAttachmentFile] = useState<File | null>(null);
    const [lectureNoteFile, setLectureNoteFile] = useState<File | null>(null);

    const [quizSectionId, setQuizSectionId] = useState<string | number | null>(null);
    const [quizData, setQuizData] = useState<QuizData>(createDefaultQuizData());
    const [sectionQuizMap, setSectionQuizMap] = useState<Record<string, SectionQuizDraft>>({});

    const [isAdvancing, setIsAdvancing] = useState(false);
    const [deletingSectionId, setDeletingSectionId] = useState<string | number | null>(null);
    const [deletingLectureId, setDeletingLectureId] = useState<string | number | null>(null);

    const getSectionKey = (id: string | number) => String(id);

    const toNumericId = (id: string | number) => {
        const parsed = Number(id);
        return Number.isFinite(parsed) ? parsed : null;
    };

    const buildLectureFormData = (lecture: DraftLecture) => {
        const formData = new FormData();
        formData.append("name", lecture.title.trim());
        formData.append("description", lecture.description || "");
        formData.append("lecture_notes", lecture.lectureNotes || "");

        if (lecture.videoFile) {
            formData.append("video_file", lecture.videoFile);
        }
        if (lecture.lectureAttachmentFile) {
            formData.append("LectureAttachment", lecture.lectureAttachmentFile);
        }
        if (lecture.lectureNoteFile) {
            formData.append("LectureNoteFile", lecture.lectureNoteFile);
        }

        return formData;
    };

    const createQuizPayload = (quiz: QuizData) => {
        const payload = {
            title: quiz.title.trim(),
            description: quiz.description.trim(),
            time_limit_minutes: Number(quiz.timeLimit) || 0,
            attempts_allowed: Number(quiz.attemptsAllowed) || 1,
            passing_score: Number(quiz.passingScore) || 0,
            shuffle_questions: quiz.shuffleQuestions,
            questions: quiz.questions
                .map((question) => ({
                    question_type: question.type === "multiple-choice" ? ("mcq" as const) : ("true_false" as const),
                    text: question.questionText.trim(),
                    options: question.options
                        .filter((option) => option.value.trim())
                        .map((option) => ({ text: option.value.trim(), is_correct: option.isCorrect })),
                }))
                .filter((question) => question.text && question.options.length > 1),
        };

        if (!payload.title || payload.questions.length === 0) {
            return null;
        }

        return payload;
    };

    const toggleSection = (id: string) => {
        setExpandedSections((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const addSection = () => {
        setSelectedSection(null);
        setEditingSectionTitle("");
        setModalType("editSection");
    };

    const openEditSection = (section: TCourseSection) => {
        setSelectedSection(section);
        setEditingSectionTitle(section.title);
        setModalType("editSection");
    };

    const saveEditSection = () => {
        const sectionName = editingSectionTitle.trim();
        if (!sectionName) return;

        if (selectedSection) {
            setSections(
                sections.map((section) =>
                    section.id === selectedSection.id ? { ...section, title: sectionName } : section
                )
            );
        } else {
            const newSection: TCourseSection = {
                id: `section-${Date.now()}`,
                title: sectionName,
                lectures: [],
            };
            setSections([...sections, newSection]);
            setExpandedSections((prev) => [...prev, String(newSection.id)]);
        }

        setModalType(null);
        setSelectedSection(null);
        setEditingSectionTitle("");
    };

    const handleDeleteSection = async (sectionId: string | number) => {
        if (deletingSectionId !== null) return;

        const numericSectionId = toNumericId(sectionId);
        if (!courseId || !numericSectionId) {
            setSections(sections.filter((section) => section.id !== sectionId));
            setExpandedSections((prev) => prev.filter((id) => id !== String(sectionId)));
            setSectionQuizMap((prev) => {
                const next = { ...prev };
                delete next[getSectionKey(sectionId)];
                return next;
            });
            return;
        }

        setDeletingSectionId(sectionId);
        try {
            await deleteCourseSection({ courseId, sectionId: numericSectionId }).unwrap();
            setSections(sections.filter((section) => section.id !== sectionId));
            setExpandedSections((prev) => prev.filter((id) => id !== String(sectionId)));
            setSectionQuizMap((prev) => {
                const next = { ...prev };
                delete next[getSectionKey(sectionId)];
                return next;
            });
            toast.success("Section deleted successfully");
        } catch (error) {
            console.error("Failed to delete section:", error);
            toast.error("Failed to delete section");
        } finally {
            setDeletingSectionId(null);
        }
    };

    const addLecture = (sectionId: string | number) => {
        setCreatingLectureSectionId(sectionId);
        setSelectedLecture(null);
        setEditingLectureTitle("");
        setLectureDescription("");
        setLectureNotes("");
        setUploadedVideo(null);
        setLectureAttachmentFile(null);
        setLectureNoteFile(null);
        setModalType("editLecture");
    };

    const openLectureModal = (sectionId: string | number, lecture: TCourseLecture, type: ModalType) => {
        setSelectedLecture({ sectionId, lecture });
        setCreatingLectureSectionId(null);

        if (type === "editLecture") {
            setEditingLectureTitle(lecture.title);
        }
        if (type === "lectureDescription") {
            setLectureDescription(lecture.description || "");
        }
        if (type === "lectureNotes") {
            setLectureNotes(lecture.lectureNotes || "");
            setLectureNoteFile((lecture as DraftLecture).lectureNoteFile || null);
        }
        if (type === "lectureVideo") {
            if (lecture.videoFileUrl) {
                setUploadedVideo({ name: lecture.videoFileUrl.split("/").pop() || "video", preview: lecture.videoFileUrl });
            } else {
                setUploadedVideo(null);
            }
        }
        if (type === "attachFile") {
            setLectureAttachmentFile((lecture as DraftLecture).lectureAttachmentFile || null);
        }

        setModalType(type);
    };

    const saveEditLecture = () => {
        const lectureName = editingLectureTitle.trim();
        if (!lectureName) return;

        if (creatingLectureSectionId !== null) {
            const newLecture: DraftLecture = {
                id: `lecture-${Date.now()}`,
                title: lectureName,
                type: "video",
                description: lectureDescription,
                lectureNotes,
                videoFile: uploadedVideo?.file || null,
                lectureAttachmentFile,
                lectureNoteFile,
            };

            setSections(
                sections.map((section) =>
                    section.id === creatingLectureSectionId
                        ? { ...section, lectures: [...section.lectures, newLecture as TCourseLecture] }
                        : section
                )
            );
        } else if (selectedLecture) {
            setSections(
                sections.map((section) =>
                    section.id === selectedLecture.sectionId
                        ? {
                            ...section,
                            lectures: section.lectures.map((lecture) =>
                                lecture.id === selectedLecture.lecture.id
                                    ? { ...lecture, title: lectureName }
                                    : lecture
                            ),
                        }
                        : section
                )
            );
        }

        setModalType(null);
        setCreatingLectureSectionId(null);
        setSelectedLecture(null);
    };

    const handleDeleteLecture = async (sectionId: string | number, lectureId: string | number) => {
        if (deletingLectureId !== null) return;

        const numericSectionId = toNumericId(sectionId);
        const numericLectureId = toNumericId(lectureId);
        if (!courseId || !numericSectionId || !numericLectureId) {
            setSections(
                sections.map((section) =>
                    section.id === sectionId
                        ? { ...section, lectures: section.lectures.filter((lecture) => lecture.id !== lectureId) }
                        : section
                )
            );
            return;
        }

        setDeletingLectureId(lectureId);
        try {
            await deleteCourseLecture({ sectionId: numericSectionId, lectureId: numericLectureId }).unwrap();
            setSections(
                sections.map((section) =>
                    section.id === sectionId
                        ? { ...section, lectures: section.lectures.filter((lecture) => lecture.id !== lectureId) }
                        : section
                )
            );
            toast.success("Lecture deleted successfully");
        } catch (error) {
            console.error("Failed to delete lecture:", error);
            toast.error("Failed to delete lecture");
        } finally {
            setDeletingLectureId(null);
        }
    };

    const patchLectureAsset = (kind: "video" | "description" | "notes" | "attachment") => {
        if (!selectedLecture) return;

        setSections(
            sections.map((section) =>
                section.id === selectedLecture.sectionId
                    ? {
                        ...section,
                        lectures: section.lectures.map((lecture) => {
                            if (lecture.id !== selectedLecture.lecture.id) return lecture;

                            if (kind === "description") {
                                return { ...lecture, description: lectureDescription };
                            }
                            if (kind === "notes") {
                                return {
                                    ...lecture,
                                    lectureNotes,
                                    lectureNoteFile,
                                };
                            }
                            if (kind === "attachment") {
                                return {
                                    ...lecture,
                                    lectureAttachmentFile,
                                };
                            }
                            return {
                                ...lecture,
                                videoFile: uploadedVideo?.file || lecture.videoFile || null,
                                videoFileUrl: uploadedVideo?.file ? uploadedVideo.preview : lecture.videoFileUrl,
                            } as TCourseLecture;
                        }),
                    }
                    : section
            )
        );

        setModalType(null);
    };

    const openQuizModal = (sectionId: string | number) => {
        setQuizSectionId(sectionId);
        const existing = sectionQuizMap[getSectionKey(sectionId)];
        setQuizData(existing?.data || createDefaultQuizData());
        setModalType("addQuiz");
    };

    const updateQuizField = (field: keyof QuizData, value: string | boolean) => {
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
                    return { ...q, type, options: [...defaultTrueFalseOptions] };
                }
                return { ...q, type, options: [...defaultMultipleChoiceOptions] };
            }),
        }));
    };

    const updateQuizOption = (questionId: string, optionIndex: number, value: string) => {
        setQuizData((prev) => ({
            ...prev,
            questions: prev.questions.map((q) => {
                if (q.id !== questionId) return q;
                return {
                    ...q,
                    options: q.options.map((opt, idx) =>
                        idx === optionIndex ? { ...opt, value } : opt
                    ),
                };
            }),
        }));
    };

    const setCorrectOption = (questionId: string, optionIndex: number) => {
        setQuizData((prev) => ({
            ...prev,
            questions: prev.questions.map((q) => {
                if (q.id !== questionId) return q;
                return {
                    ...q,
                    options: q.options.map((opt, idx) => ({
                        ...opt,
                        isCorrect: idx === optionIndex,
                    })),
                };
            }),
        }));
    };

    const saveQuiz = () => {
        if (!quizSectionId) return;

        const validPayload = createQuizPayload(quizData);
        if (!validPayload) {
            toast.error("Add valid quiz title and questions");
            return;
        }

        setSectionQuizMap((prev) => ({
            ...prev,
            [getSectionKey(quizSectionId)]: {
                data: quizData,
                synced: false,
            },
        }));

        setModalType(null);
        toast.success("Quiz added to this section");
    };

    const syncCurriculum = async () => {
        if (!courseId) {
            toast.error("Please save basic information first");
            return false;
        }

        try {
            const nextSections: TCourseSection[] = [];
            const nextQuizMap: Record<string, SectionQuizDraft> = {};

            for (const section of sections) {
                const sectionName = section.title.trim();
                if (!sectionName) {
                    toast.error("Section name is required");
                    return false;
                }

                const sectionId = toNumericId(section.id);
                const sectionResponse = sectionId
                    ? await updateCourseSection({
                        courseId,
                        sectionId,
                        data: { name: sectionName },
                    }).unwrap()
                    : await addCourseSection({
                        courseId,
                        data: { name: sectionName },
                    }).unwrap();

                const syncedSectionId = sectionResponse.data.id;
                const syncedLectures: TCourseLecture[] = [];

                for (const rawLecture of section.lectures) {
                    const lecture = rawLecture as DraftLecture;
                    const lectureName = lecture.title.trim();
                    if (!lectureName) {
                        toast.error("Lecture name is required");
                        return false;
                    }

                    const formData = buildLectureFormData({ ...lecture, title: lectureName });
                    const lectureId = toNumericId(lecture.id);
                    const lectureResponse = lectureId
                        ? await updateCourseLecture({
                            sectionId: syncedSectionId,
                            lectureId,
                            data: formData,
                        }).unwrap()
                        : await addCourseLecture({
                            sectionId: syncedSectionId,
                            data: formData,
                        }).unwrap();

                    syncedLectures.push({
                        ...lecture,
                        id: lectureResponse.data.id,
                        title: lectureResponse.data.name,
                        description: lectureResponse.data.description,
                        lectureNotes: lectureResponse.data.lecture_notes,
                        videoFileUrl: lectureResponse.data.video_file,
                        lectureAttachmentUrl: lectureResponse.data.LectureAttachment,
                        lectureNoteFileUrl: lectureResponse.data.LectureNoteFile,
                        videoFile: undefined,
                        lectureAttachmentFile: undefined,
                        lectureNoteFile: undefined,
                    });
                }

                const quizDraft = sectionQuizMap[getSectionKey(section.id)];
                if (quizDraft && !quizDraft.synced) {
                    const quizPayload = createQuizPayload(quizDraft.data);
                    if (!quizPayload) {
                        toast.error("Invalid quiz data in section");
                        return false;
                    }
                    await addCourseQuiz({ sectionId: syncedSectionId, data: quizPayload }).unwrap();
                }

                if (quizDraft) {
                    nextQuizMap[getSectionKey(syncedSectionId)] = {
                        data: quizDraft.data,
                        synced: true,
                    };
                }

                nextSections.push({
                    ...section,
                    id: syncedSectionId,
                    title: sectionResponse.data.name,
                    order: sectionResponse.data.order,
                    lectures: syncedLectures,
                });
            }

            setSections(nextSections);
            setSectionQuizMap(nextQuizMap);
            return true;
        } catch (error) {
            console.error("Failed to sync curriculum:", error);
            toast.error("Failed to save curriculum");
            return false;
        }
    };

    const handleSaveAndNext = async () => {
        setIsAdvancing(true);
        try {
            const saved = await syncCurriculum();
            if (!saved) return;
            await Promise.resolve(onNext());
        } finally {
            setIsAdvancing(false);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-title">{t("curriculum")}</h3>
            <div className="border-b border-border-light" />

            {sections.map((section) => {
                const sectionKey = getSectionKey(section.id);
                const sectionQuiz = sectionQuizMap[sectionKey];

                return (
                    <div key={section.id} className="border border-border-light rounded-md overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 flex items-center gap-2">
                            <Menu className="w-4 h-4 text-description cursor-grab shrink-0" />
                            <button
                                type="button"
                                onClick={() => toggleSection(String(section.id))}
                                className="p-0.5"
                            >
                                {expandedSections.includes(String(section.id)) ? (
                                    <ChevronUp className="w-4 h-4 text-description" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 text-description" />
                                )}
                            </button>

                            <span className="flex-1 text-sm font-semibold text-title truncate">{section.title}</span>

                            <button
                                type="button"
                                onClick={() => openEditSection(section)}
                                className="p-1.5 hover:bg-gray-200 rounded transition-colors shrink-0"
                            >
                                <Pencil className="w-3.5 h-3.5 text-description" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDeleteSection(section.id)}
                                disabled={deletingSectionId === section.id}
                                className="p-1.5 hover:bg-red-50 rounded transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                        </div>

                        {expandedSections.includes(String(section.id)) && (
                            <div className="p-4 space-y-2">
                                {section.lectures.map((lecture, lIndex) => (
                                    <div
                                        key={lecture.id}
                                        className="flex flex-wrap items-center gap-2 px-3 py-3 bg-white border border-border-light rounded-md"
                                    >
                                        <GripVertical className="w-3.5 h-3.5 text-description cursor-grab shrink-0" />
                                        {lecture.type === "video" ? (
                                            <Video className="w-4 h-4 text-main shrink-0" />
                                        ) : (
                                            <FileText className="w-4 h-4 text-main shrink-0" />
                                        )}

                                        <span className="flex-1 min-w-0 text-sm text-title truncate">
                                            {t("lecture")} {lIndex + 1}: {lecture.title}
                                        </span>

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
                                                onClick={() => handleDeleteLecture(section.id, lecture.id)}
                                                disabled={deletingLectureId === lecture.id}
                                                className="p-1 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Delete Lecture"
                                            >
                                                <Trash2 className="w-3 h-3 text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {sectionQuiz && (
                                    <div className="flex items-center justify-between px-3 py-3 bg-white border border-border-light rounded-md">
                                        <span className="text-sm text-title truncate">Quiz: {sectionQuiz.data.title}</span>
                                        <button
                                            type="button"
                                            onClick={() => openQuizModal(section.id)}
                                            className="text-xs text-main font-medium"
                                        >
                                            Edit Quiz
                                        </button>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => addLecture(section.id)}
                                        className="flex items-center gap-1 p-3 border border-dashed border-border-light rounded-md text-xs font-medium text-description hover:text-title hover:border-main transition-colors"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        {t("addLecture")}
                                    </button>

                                    {!sectionQuiz && (
                                        <button
                                            type="button"
                                            onClick={() => openQuizModal(section.id)}
                                            className="flex items-center gap-1 p-3 border border-dashed border-border-light rounded-md text-xs font-medium text-description hover:text-title hover:border-main transition-colors"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            {t("addQuiz")}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            <button
                type="button"
                onClick={addSection}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-3 border-2 border-dashed border-border-light rounded-md text-sm font-medium text-description hover:text-main hover:border-main transition-colors"
            >
                <Plus className="w-4 h-4" />
                {t("addNewSection")}
            </button>

            <div className="flex items-center justify-between pt-6 border-t border-border-light">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-5 py-3 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                >
                    {t("previous")}
                </button>
                <button
                    type="button"
                    onClick={handleSaveAndNext}
                    disabled={isAdvancing}
                    className="px-5 py-3 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isAdvancing && <Loader2 className="w-4 h-4 animate-spin" />}
                    {t("saveAndNext")}
                </button>
            </div>

            <EditLectureModal
                open={modalType === "editLecture"}
                onClose={() => setModalType(null)}
                editingLectureTitle={editingLectureTitle}
                setEditingLectureTitle={setEditingLectureTitle}
                onSave={saveEditLecture}
                isSaving={false}
            />

            <EditSectionModal
                open={modalType === "editSection"}
                onClose={() => setModalType(null)}
                editingSectionTitle={editingSectionTitle}
                setEditingSectionTitle={setEditingSectionTitle}
                onSave={saveEditSection}
                isSaving={false}
            />

            <LectureVideoModal
                open={modalType === "lectureVideo"}
                onClose={() => setModalType(null)}
                uploadedVideo={uploadedVideo}
                setUploadedVideo={setUploadedVideo}
                onSave={() => patchLectureAsset("video")}
                isSaving={false}
            />

            <LectureDescriptionModal
                open={modalType === "lectureDescription"}
                onClose={() => setModalType(null)}
                lectureDescription={lectureDescription}
                setLectureDescription={setLectureDescription}
                onSave={() => patchLectureAsset("description")}
                isSaving={false}
            />

            <LectureNotesModal
                open={modalType === "lectureNotes"}
                onClose={() => setModalType(null)}
                lectureNotes={lectureNotes}
                setLectureNotes={setLectureNotes}
                lectureNoteFile={lectureNoteFile}
                setLectureNoteFile={setLectureNoteFile}
                onSave={() => patchLectureAsset("notes")}
                isSaving={false}
            />

            <AttachFileModal
                open={modalType === "attachFile"}
                onClose={() => setModalType(null)}
                attachmentFile={lectureAttachmentFile}
                setAttachmentFile={setLectureAttachmentFile}
                onSave={() => patchLectureAsset("attachment")}
                isSaving={false}
            />

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
                isSaving={false}
            />
        </div>
    );
};

export default CurriculumTab;
