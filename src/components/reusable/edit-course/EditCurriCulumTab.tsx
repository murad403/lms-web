"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AlignLeft, ChevronDown, ChevronUp, File, FileText, GripVertical, Loader2, Menu, Pencil, Plus, StickyNote, Trash2, Video } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditLectureModal from "@/components/modal/create-course/EditLectureModal";
import EditSectionModal from "@/components/modal/create-course/EditSectionModal";
import LectureVideoModal from "@/components/modal/create-course/LectureVideoModal";
import LectureDescriptionModal from "@/components/modal/create-course/LectureDescriptionModal";
import LectureNotesModal from "@/components/modal/create-course/LectureNotesModal";
import AttachFileModal from "@/components/modal/create-course/AttachFileModal";
import AddQuizModal from "@/components/modal/create-course/AddQuizModal";
import EditQuizModal, { quizItemToQuizData } from "@/components/modal/create-course/EditQuizModal";
import { useAddCourseLectureMutation, useAddCourseQuizMutation, useAddCourseSectionMutation, useDeleteCourseLectureMutation, useDeleteCourseSectionMutation, useGetCourseCurriculumQuery, useUpdateCourseLectureMutation, useUpdateCourseQuizMutation, useUpdateCourseSectionMutation, useDeleteCourseQuizMutation } from "@/redux/features/create-course/createCourse.api";
import { CourseCurriculumSectionItem, LectureItem, QuizItem, QuizPayload, QuizUpdatePayload } from "@/redux/features/create-course/createCourse.type";

type Props = {
  courseId: number;
  onPrev: () => void;
};

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

type LectureDraft = {
  id: number;
  title: string;
  description: string;
  lectureNotes: string;
  videoFileUrl?: string;
  lectureAttachmentUrl?: string;
  lectureNoteFileUrl?: string;
  videoFile?: File | null;
  lectureAttachmentFile?: File | null;
  lectureNoteFile?: File | null;
};

type SectionDraft = {
  id: number;
  title: string;
  order: number;
  lectures: LectureDraft[];
  quizzes: QuizItem[];
};

type TargetState =
  | { kind: "section"; sectionId?: number }
  | { kind: "lecture"; sectionId: number; lectureId?: number }
  | { kind: "quiz"; sectionId: number; quizId?: number }
  | null;

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

const mapLecture = (lecture: LectureItem): LectureDraft => ({
  id: lecture.id,
  title: lecture.name,
  description: lecture.description ?? "",
  lectureNotes: lecture.lecture_notes ?? "",
  videoFileUrl: lecture.video_file,
  lectureAttachmentUrl: lecture.LectureAttachment,
  lectureNoteFileUrl: lecture.LectureNoteFile,
});

const mapQuiz = (quiz: QuizItem): QuizData => quizItemToQuizData(quiz) as QuizData;

const mapSection = (section: CourseCurriculumSectionItem): SectionDraft => ({
  id: section.id,
  title: section.name,
  order: section.order,
  lectures: section.lectures.map(mapLecture),
  quizzes: section.quizzes ?? [],
});

const buildLectureFormData = (lecture: LectureDraft) => {
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

const buildQuizPayload = (quiz: QuizData): QuizPayload | null => {
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

const toFileName = (url?: string) => url?.split("/").pop() || "file";

const EditCurriCulumTab = ({ courseId, onPrev }: Props) => {
  const t = useTranslations("InstructorCreateCourse");
  const { data: curriculumResponse, isLoading, isFetching } = useGetCourseCurriculumQuery(courseId, {
    skip: !courseId,
  });

  const [sections, setSections] = useState<SectionDraft[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [modalType, setModalType] = useState<"section" | "lecture" | "quiz-add" | "quiz-edit" | "lecture-video" | "lecture-description" | "lecture-notes" | "lecture-attachment" | null>(null);
  const [selectedSection, setSelectedSection] = useState<TargetState>(null);
  const [sectionTitle, setSectionTitle] = useState("");
  const [lectureDraft, setLectureDraft] = useState<LectureDraft | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<{ name: string; preview: string; file?: File } | null>(null);
  const [lectureDescription, setLectureDescription] = useState("");
  const [lectureNotes, setLectureNotes] = useState("");
  const [lectureNoteFile, setLectureNoteFile] = useState<File | null>(null);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [quizDraft, setQuizDraft] = useState<QuizData>(createDefaultQuizData());
  const [savingSection, setSavingSection] = useState(false);
  const [savingLecture, setSavingLecture] = useState(false);
  const [savingQuiz, setSavingQuiz] = useState(false);
  const [deletingSectionId, setDeletingSectionId] = useState<number | null>(null);
  const [deletingLectureId, setDeletingLectureId] = useState<number | null>(null);
  const hydratedCourseIdRef = useRef<number | null>(null);

  const [addCourseSection] = useAddCourseSectionMutation();
  const [updateCourseSection] = useUpdateCourseSectionMutation();
  const [deleteCourseSection] = useDeleteCourseSectionMutation();
  const [addCourseLecture] = useAddCourseLectureMutation();
  const [updateCourseLecture] = useUpdateCourseLectureMutation();
  const [deleteCourseLecture] = useDeleteCourseLectureMutation();
  const [addCourseQuiz] = useAddCourseQuizMutation();
  const [updateCourseQuiz] = useUpdateCourseQuizMutation();
  const [deleteCourseQuiz] = useDeleteCourseQuizMutation();
  const [deletingQuizId, setDeletingQuizId] = useState<number | null>(null);

  useEffect(() => {
    hydratedCourseIdRef.current = null;
    setSections([]);
    setExpandedSections([]);
    closeModal();
  }, [courseId]);

  useEffect(() => {
    if (!curriculumResponse || hydratedCourseIdRef.current === courseId) {
      return;
    }

    const nextSections = curriculumResponse.map(mapSection);
    setSections(nextSections);
    setExpandedSections(nextSections.map((section) => String(section.id)));
    hydratedCourseIdRef.current = courseId;
  }, [courseId, curriculumResponse]);

  function closeModal() {
    setModalType(null);
    setSelectedSection(null);
    setSectionTitle("");
    setLectureDraft(null);
    setUploadedVideo(null);
    setLectureDescription("");
    setLectureNotes("");
    setLectureNoteFile(null);
    setAttachmentFile(null);
    setQuizDraft(createDefaultQuizData());
  }

  const updateSectionState = (sectionId: number, updater: (section: SectionDraft) => SectionDraft) => {
    setSections((previous) => previous.map((section) => (section.id === sectionId ? updater(section) : section)));
  };

  const replaceLectureState = (sectionId: number, lectureId: number, lecture: LectureDraft) => {
    updateSectionState(sectionId, (section) => ({
      ...section,
      lectures: section.lectures.map((item) => (item.id === lectureId ? lecture : item)),
    }));
  };

  const upsertQuizState = (sectionId: number, quiz: QuizItem) => {
    updateSectionState(sectionId, (section) => {
      const existingIndex = section.quizzes.findIndex((item) => item.id === quiz.id);
      if (existingIndex === -1) {
        return { ...section, quizzes: [...section.quizzes, quiz] };
      }

      return {
        ...section,
        quizzes: section.quizzes.map((item) => (item.id === quiz.id ? quiz : item)),
      };
    });
  };

  const toggleSection = (id: string) => {
    setExpandedSections((previous) =>
      previous.includes(id) ? previous.filter((sectionId) => sectionId !== id) : [...previous, id]
    );
  };

  const openSectionModal = (section: SectionDraft | null) => {
    setSelectedSection(section ? { kind: "section", sectionId: section.id } : { kind: "section" });
    setSectionTitle(section?.title ?? "");
    setModalType("section");
  };

  const openLectureModal = (sectionId: number, lecture?: LectureDraft) => {
    if (lecture) {
      setSelectedSection({ kind: "lecture", sectionId, lectureId: lecture.id });
      setLectureDraft({ ...lecture, videoFile: null, lectureAttachmentFile: null, lectureNoteFile: null });
    } else {
      setSelectedSection({ kind: "lecture", sectionId });
      setLectureDraft({
        id: 0,
        title: "",
        description: "",
        lectureNotes: "",
        videoFileUrl: undefined,
        lectureAttachmentUrl: undefined,
        lectureNoteFileUrl: undefined,
        videoFile: null,
        lectureAttachmentFile: null,
        lectureNoteFile: null,
      });
    }

    setUploadedVideo(lecture?.videoFileUrl ? { name: toFileName(lecture.videoFileUrl), preview: lecture.videoFileUrl } : null);
    setLectureDescription(lecture?.description ?? "");
    setLectureNotes(lecture?.lectureNotes ?? "");
    setLectureNoteFile(null);
    setAttachmentFile(null);
    setModalType("lecture");
  };

  const openLectureAssetModal = (sectionId: number, lecture: LectureDraft, kind: "lecture-video" | "lecture-description" | "lecture-notes" | "lecture-attachment") => {
    setSelectedSection({ kind: "lecture", sectionId, lectureId: lecture.id });
    setLectureDraft({ ...lecture, videoFile: null, lectureAttachmentFile: null, lectureNoteFile: null });
    setUploadedVideo(lecture.videoFileUrl ? { name: toFileName(lecture.videoFileUrl), preview: lecture.videoFileUrl } : null);
    setLectureDescription(lecture.description ?? "");
    setLectureNotes(lecture.lectureNotes ?? "");
    setLectureNoteFile(null);
    setAttachmentFile(null);
    setModalType(kind);
  };

  const openQuizModal = (sectionId: number, quiz?: QuizItem) => {
    if (quiz) {
      setSelectedSection({ kind: "quiz", sectionId, quizId: quiz.id });
      setQuizDraft(mapQuiz(quiz));
      setModalType("quiz-edit");
      return;
    }

    setSelectedSection({ kind: "quiz", sectionId });
    setQuizDraft(createDefaultQuizData());
    setModalType("quiz-add");
  };

  const handleSaveSection = async () => {
    const sectionName = sectionTitle.trim();
    if (!sectionName) {
      toast.error("Section name is required");
      return;
    }

    if (!selectedSection || selectedSection.kind !== "section") {
      return;
    }

    try {
      setSavingSection(true);

      if (selectedSection.sectionId) {
        const response = await updateCourseSection({
          courseId,
          sectionId: selectedSection.sectionId,
          data: { name: sectionName },
        }).unwrap();

        updateSectionState(selectedSection.sectionId, (section) => ({
          ...section,
          title: response.data.name,
          order: response.data.order,
        }));
        toast.success("Section updated successfully");
      } else {
        const response = await addCourseSection({
          courseId,
          data: { name: sectionName },
        }).unwrap();

        const nextSection: SectionDraft = {
          id: response.data.id,
          title: response.data.name,
          order: response.data.order,
          lectures: [],
          quizzes: [],
        };

        setSections((previous) => [...previous, nextSection]);
        setExpandedSections((previous) => [...previous, String(nextSection.id)]);
        toast.success("Section added successfully");
      }

      closeModal();
    } catch (error) {
      console.error("Failed to save section:", error);
      toast.error("Failed to save section");
    } finally {
      setSavingSection(false);
    }
  };

  const handleDeleteSection = async (sectionId: number) => {
    if (deletingSectionId !== null) {
      return;
    }

    try {
      setDeletingSectionId(sectionId);
      await deleteCourseSection({ courseId, sectionId }).unwrap();
      setSections((previous) => previous.filter((section) => section.id !== sectionId));
      setExpandedSections((previous) => previous.filter((id) => id !== String(sectionId)));
      toast.success("Section deleted successfully");
    } catch (error) {
      console.error("Failed to delete section:", error);
      toast.error("Failed to delete section");
    } finally {
      setDeletingSectionId(null);
    }
  };

  const persistLecture = async (draft: LectureDraft) => {
    if (!selectedSection || selectedSection.kind !== "lecture") {
      return;
    }

    const lectureName = draft.title.trim();
    if (!lectureName) {
      toast.error("Lecture name is required");
      return;
    }

    try {
      setSavingLecture(true);
      const payload = buildLectureFormData({ ...draft, title: lectureName });

      if (selectedSection.lectureId) {
        const response = await updateCourseLecture({
          sectionId: selectedSection.sectionId,
          lectureId: selectedSection.lectureId,
          data: payload,
        }).unwrap();

        replaceLectureState(selectedSection.sectionId, selectedSection.lectureId, {
          id: response.data.id,
          title: response.data.name,
          description: response.data.description ?? "",
          lectureNotes: response.data.lecture_notes ?? "",
          videoFileUrl: response.data.video_file,
          lectureAttachmentUrl: response.data.LectureAttachment,
          lectureNoteFileUrl: response.data.LectureNoteFile,
        });
        toast.success("Lecture updated successfully");
      } else {
        const response = await addCourseLecture({
          sectionId: selectedSection.sectionId,
          data: payload,
        }).unwrap();

        updateSectionState(selectedSection.sectionId, (section) => ({
          ...section,
          lectures: [
            ...section.lectures,
            {
              id: response.data.id,
              title: response.data.name,
              description: response.data.description ?? "",
              lectureNotes: response.data.lecture_notes ?? "",
              videoFileUrl: response.data.video_file,
              lectureAttachmentUrl: response.data.LectureAttachment,
              lectureNoteFileUrl: response.data.LectureNoteFile,
            },
          ],
        }));
        toast.success("Lecture added successfully");
      }

      closeModal();
    } catch (error) {
      console.error("Failed to save lecture:", error);
      toast.error("Failed to save lecture");
    } finally {
      setSavingLecture(false);
    }
  };

  const handleDeleteLecture = async (sectionId: number, lectureId: number) => {
    if (deletingLectureId !== null) {
      return;
    }

    try {
      setDeletingLectureId(lectureId);
      await deleteCourseLecture({ sectionId, lectureId }).unwrap();
      updateSectionState(sectionId, (section) => ({
        ...section,
        lectures: section.lectures.filter((lecture) => lecture.id !== lectureId),
      }));
      toast.success("Lecture deleted successfully");
    } catch (error) {
      console.error("Failed to delete lecture:", error);
      toast.error("Failed to delete lecture");
    } finally {
      setDeletingLectureId(null);
    }
  };

  const handleSaveQuiz = async () => {
    if (!selectedSection || selectedSection.kind !== "quiz") {
      return;
    }

    const payload = buildQuizPayload(quizDraft);
    if (!payload) {
      toast.error("Add a valid quiz title and at least one question");
      return;
    }

    try {
      setSavingQuiz(true);

      if (selectedSection.quizId) {
        const response = await updateCourseQuiz({
          sectionId: selectedSection.sectionId,
          quizId: selectedSection.quizId,
          data: payload as QuizUpdatePayload,
        }).unwrap();

        upsertQuizState(selectedSection.sectionId, response.data);
        toast.success("Quiz updated successfully");
      } else {
        const response = await addCourseQuiz({
          sectionId: selectedSection.sectionId,
          data: payload,
        }).unwrap();

        upsertQuizState(selectedSection.sectionId, response.data);
        toast.success("Quiz added successfully");
      }

      closeModal();
    } catch (error) {
      console.error("Failed to save quiz:", error);
      toast.error("Failed to save quiz");
    } finally {
      setSavingQuiz(false);
    }
  };

  const updateQuizField = (field: keyof QuizData, value: string | boolean) => {
    setQuizDraft((previous) => ({ ...previous, [field]: value }));
  };

  const addQuizQuestion = () => {
    setQuizDraft((previous) => ({
      ...previous,
      questions: [
        ...previous.questions,
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
    setQuizDraft((previous) => ({
      ...previous,
      questions: previous.questions.filter((question) => question.id !== questionId),
    }));
  };

  const updateQuizQuestion = (questionId: string, field: string, value: string) => {
    setQuizDraft((previous) => ({
      ...previous,
      questions: previous.questions.map((question) => (question.id === questionId ? { ...question, [field]: value } : question)),
    }));
  };

  const changeQuestionType = (questionId: string, type: QuizQuestionType) => {
    setQuizDraft((previous) => ({
      ...previous,
      questions: previous.questions.map((question) => {
        if (question.id !== questionId) {
          return question;
        }

        return type === "true-false"
          ? { ...question, type, options: [...defaultTrueFalseOptions] }
          : { ...question, type, options: [...defaultMultipleChoiceOptions] };
      }),
    }));
  };

  const updateQuizOption = (questionId: string, optionIndex: number, value: string) => {
    setQuizDraft((previous) => ({
      ...previous,
      questions: previous.questions.map((question) => {
        if (question.id !== questionId) {
          return question;
        }

        return {
          ...question,
          options: question.options.map((option, index) => (index === optionIndex ? { ...option, value } : option)),
        };
      }),
    }));
  };

  const setCorrectOption = (questionId: string, optionIndex: number) => {
    setQuizDraft((previous) => ({
      ...previous,
      questions: previous.questions.map((question) => {
        if (question.id !== questionId) {
          return question;
        }

        return {
          ...question,
          options: question.options.map((option, index) => ({
            ...option,
            isCorrect: index === optionIndex,
          })),
        };
      }),
    }));
  };

  const isBusy = isLoading || isFetching;

  const router = useRouter();

  const handleSaveAndExit = () => {
    toast.success("Curriculum saved");
    router.push("/instructor/my-courses");
  };

  if (isBusy && sections.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-40 rounded bg-gray-100 animate-pulse" />
          <div className="h-4 w-24 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border border-border-light rounded-md p-4 space-y-3">
              <div className="h-10 rounded bg-gray-100 animate-pulse" />
              <div className="h-16 rounded bg-gray-50 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-title">{t("curriculum")}</h3>
          <p className="text-sm text-description">Edit sections, lectures, and quizzes for this course.</p>
        </div>
        {isFetching && <span className="text-xs text-description flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Syncing latest data</span>}
      </div>
      <div className="border-b border-border-light" />

      {sections.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-light bg-white p-6 text-sm text-description">
          No curriculum has been added yet.
        </div>
      ) : (
        sections.map((section) => (
          <div key={section.id} className="border border-border-light rounded-md overflow-hidden bg-white">
            <div className="bg-gray-50 px-4 py-3 flex items-center gap-2">
              <Menu className="w-4 h-4 text-description cursor-grab shrink-0" />
              <button type="button" onClick={() => toggleSection(String(section.id))} className="p-0.5">
                {expandedSections.includes(String(section.id)) ? (
                  <ChevronUp className="w-4 h-4 text-description" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-description" />
                )}
              </button>

              <span className="flex-1 text-sm font-semibold text-title truncate">{section.title}</span>

              <button type="button" onClick={() => openSectionModal(section)} className="p-1.5 hover:bg-gray-200 rounded transition-colors shrink-0">
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
              <div className="p-4 space-y-3">
                {section.lectures.map((lecture) => (
                  <div key={lecture.id} className="flex flex-wrap items-center gap-2 px-3 py-3 bg-white border border-border-light rounded-md">
                    <GripVertical className="w-3.5 h-3.5 text-description cursor-grab shrink-0" />
                    {lecture.videoFileUrl ? (
                      <Video className="w-4 h-4 text-main shrink-0" />
                    ) : (
                      <FileText className="w-4 h-4 text-main shrink-0" />
                    )}

                    <span className="flex-1 min-w-0 text-sm text-title truncate">{lecture.title}</span>

                    <div className="flex items-center gap-1 shrink-0">
                      <button type="button" onClick={() => openLectureAssetModal(section.id, lecture, "lecture-video")} className="p-1 hover:bg-gray-100 rounded transition-colors text-xs text-main" title="Upload Video">
                        <Video className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" onClick={() => openLectureAssetModal(section.id, lecture, "lecture-attachment")} className="p-1 hover:bg-gray-100 rounded transition-colors text-xs text-main" title="Attach File">
                        <File className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" onClick={() => openLectureAssetModal(section.id, lecture, "lecture-notes")} className="p-1 hover:bg-gray-100 rounded transition-colors text-xs text-main" title="Add Lecture Notes">
                        <StickyNote className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" onClick={() => openLectureAssetModal(section.id, lecture, "lecture-description")} className="p-1 hover:bg-gray-100 rounded transition-colors" title="Edit Description">
                        <AlignLeft className="w-3 h-3 text-description" />
                      </button>
                      <button type="button" onClick={() => openLectureModal(section.id, lecture)} className="p-1 hover:bg-gray-100 rounded transition-colors" title="Edit Lecture Name">
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

                {section.quizzes.map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between gap-3 px-3 py-3 bg-white border border-border-light rounded-md">
                    <span className="text-sm text-title truncate">Quiz: {quiz.title}</span>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => openQuizModal(section.id, quiz)} className="text-xs text-main font-medium">
                        Edit Quiz
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (deletingQuizId !== null) return;
                          try {
                            setDeletingQuizId(quiz.id);
                            await deleteCourseQuiz({ quizId: quiz.id, sectionId: section.id }).unwrap();
                            updateSectionState(section.id, (s) => ({ ...s, quizzes: s.quizzes.filter((q) => q.id !== quiz.id) }));
                            toast.success("Quiz deleted successfully");
                          } catch (error) {
                            console.error("Failed to delete quiz:", error);
                            toast.error("Failed to delete quiz");
                          } finally {
                            setDeletingQuizId(null);
                          }
                        }}
                        disabled={deletingQuizId === quiz.id}
                        className="p-1 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Quiz"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => openLectureModal(section.id)}
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
        ))
      )}

      <button
        type="button"
        onClick={() => openSectionModal(null)}
        className="w-full flex items-center justify-center gap-1.5 px-4 py-3 border-2 border-dashed border-border-light rounded-md text-sm font-medium text-description hover:text-main hover:border-main transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add New Section
      </button>

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
          onClick={handleSaveAndExit}
          className="px-5 py-3 bg-main text-white rounded-md text-sm font-medium hover:opacity-95 transition-colors"
        >
          Save & Update
        </button>
      </div>

      <EditSectionModal
        open={modalType === "section"}
        onClose={closeModal}
        editingSectionTitle={sectionTitle}
        setEditingSectionTitle={setSectionTitle}
        onSave={handleSaveSection}
        isSaving={savingSection}
      />

      <EditLectureModal
        open={modalType === "lecture"}
        onClose={closeModal}
        editingLectureTitle={lectureDraft?.title ?? ""}
        setEditingLectureTitle={(value) => setLectureDraft((previous) => (previous ? { ...previous, title: value } : previous))}
        onSave={() => lectureDraft ? persistLecture(lectureDraft) : undefined}
        isSaving={savingLecture}
      />

      <LectureVideoModal
        open={modalType === "lecture-video"}
        onClose={closeModal}
        uploadedVideo={uploadedVideo}
        setUploadedVideo={setUploadedVideo}
        onSave={() => {
          if (!lectureDraft || !uploadedVideo?.file) {
            toast.error("Select a video file to upload");
            return;
          }

          return persistLecture({ ...lectureDraft, videoFile: uploadedVideo.file });
        }}
        isSaving={savingLecture}
      />

      <LectureDescriptionModal
        open={modalType === "lecture-description"}
        onClose={closeModal}
        lectureDescription={lectureDescription}
        setLectureDescription={setLectureDescription}
        onSave={() => lectureDraft ? persistLecture({ ...lectureDraft, description: lectureDescription }) : undefined}
        isSaving={savingLecture}
      />

      <LectureNotesModal
        open={modalType === "lecture-notes"}
        onClose={closeModal}
        lectureNotes={lectureNotes}
        setLectureNotes={setLectureNotes}
        lectureNoteFile={lectureNoteFile}
        setLectureNoteFile={setLectureNoteFile}
        onSave={() => lectureDraft ? persistLecture({ ...lectureDraft, lectureNotes, lectureNoteFile }) : undefined}
        isSaving={savingLecture}
      />

      <AttachFileModal
        open={modalType === "lecture-attachment"}
        onClose={closeModal}
        attachmentFile={attachmentFile}
        setAttachmentFile={setAttachmentFile}
        onSave={() => lectureDraft ? persistLecture({ ...lectureDraft, lectureAttachmentFile: attachmentFile }) : undefined}
        isSaving={savingLecture}
      />

      <AddQuizModal
        open={modalType === "quiz-add"}
        onClose={closeModal}
        quizData={quizDraft}
        updateQuizField={updateQuizField}
        addQuizQuestion={addQuizQuestion}
        removeQuizQuestion={removeQuizQuestion}
        updateQuizQuestion={updateQuizQuestion}
        changeQuestionType={changeQuestionType}
        updateQuizOption={updateQuizOption}
        setCorrectOption={setCorrectOption}
        onSave={handleSaveQuiz}
        isSaving={savingQuiz}
      />

      <EditQuizModal
        open={modalType === "quiz-edit"}
        onClose={closeModal}
        quizData={quizDraft}
        updateQuizField={updateQuizField}
        addQuizQuestion={addQuizQuestion}
        removeQuizQuestion={removeQuizQuestion}
        updateQuizQuestion={updateQuizQuestion}
        changeQuestionType={changeQuestionType}
        updateQuizOption={updateQuizOption}
        setCorrectOption={setCorrectOption}
        onSave={handleSaveQuiz}
        isSaving={savingQuiz}
      />
    </div>
  );
};

export default EditCurriCulumTab;
