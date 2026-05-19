/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronUp, Play, Pause, CheckSquare, Square, ArrowLeft, BookOpen, Layers, Menu } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useStartCourseQuery, useCompletedLectureMutation, useAddReviewMutation, useGetQuizzesQuery, useSubmitQuizzesMutation } from "@/redux/features/student/student.api";
import { CourseLecture } from "@/redux/features/student/student.type";
import { Skeleton } from "@/components/ui/skeleton";
import QuizModal from "@/components/modal/QuizModal";
import WriteReviewModal from "@/components/modal/WriteReviewModal";
import { toast } from "sonner";
import { TQuizData, TQuizQuestion } from "@/lib/profile";
import { resolveImageUrl } from "@/utils/image";
import CoursePlayerTabs from "./CoursePlayerTabs";
import type { SubmitQuizData } from "@/redux/features/student/student.type";



const CoursePlayerPage = () => {
  const params = useParams();
  const courseId = Array.isArray(params.id) ? parseInt(params.id[0]) : parseInt(params.id as string);
  const router = useRouter();
  const t = useTranslations("CoursePlayer");

  // API Hooks
  const { data: courseData, isLoading: isCourseLoading } = useStartCourseQuery(courseId);
  const [completeLecture] = useCompletedLectureMutation();
  const [submitQuizzes] = useSubmitQuizzesMutation();
  const [addReview] = useAddReviewMutation();

  // State
  const [currentLecture, setCurrentLecture] = useState<CourseLecture | null>(null);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<number[]>(() =>
    courseData?.data?.contents?.[0] ? [courseData.data.contents[0].id] : []
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const [videoKey, setVideoKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideoUrl = currentLecture?.video_file ? resolveImageUrl(currentLecture.video_file) : "";

  // Initialize current lecture from API response
  useEffect(() => {
    if (courseData?.data && !currentLecture) {
      const lecture = courseData.data.current_lecture ?? courseData.data.contents?.[0]?.lectures?.[0];
      if (lecture) {
        setCurrentLecture(lecture);
        setHasAutoPlayed(false);
      }
    }
  }, [courseData?.data, currentLecture]);

  // Auto-play first lecture on initial load
  useEffect(() => {
    if (courseData?.data && !hasAutoPlayed && currentLecture && currentVideoUrl) {
      setIsPlaying(true);
      setHasAutoPlayed(true);
      setTimeout(() => {
        videoRef.current?.play().catch(() => {
          console.log("Autoplay was prevented by browser");
        });
      }, 500);
    }
  }, [courseData?.data, hasAutoPlayed, currentLecture, currentVideoUrl]);

  // Global keyboard handler for arrow key seeking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;

      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        video.currentTime = Math.min(video.currentTime + 5, video.duration);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        video.currentTime = Math.max(video.currentTime - 5, 0);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch quiz data
  const { data: quizData } = useGetQuizzesQuery(
    selectedQuizId ?? 0,
    { skip: !selectedQuizId }
  );

  // Calculate overall progress
  const progressPercent = courseData?.data?.course_progress_percentage ?? 0;

  // Get all lectures
  const allLectures = useMemo(() => {
    return (courseData?.data?.contents ?? []).flatMap((s) => s.lectures);
  }, [courseData?.data?.contents]);

  const currentIndex = useMemo(
    () => allLectures.findIndex((l) => l.id === currentLecture?.id),
    [allLectures, currentLecture?.id]
  );

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handlePlayLecture = (lecture: CourseLecture) => {
    setCurrentLecture(lecture);
    setIsPlaying(true);
    setShowMobileSidebar(false);
    setVideoKey(prev => prev + 1);
  };

  const canSelectLecture = (lecture: CourseLecture) => {
    return lecture.is_completed || lecture.id === currentLecture?.id;
  };

  const handleNextLecture = async () => {
    if (!currentLecture || currentIndex < 0) return;

    try {
      await completeLecture(currentLecture.id).unwrap();

      if (currentIndex < allLectures.length - 1) {
        const nextLecture = allLectures[currentIndex + 1];
        setCurrentLecture(nextLecture);
        setVideoKey(prev => prev + 1);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error completing lecture:", error);
      toast.error(t("errorCompletingLecture") || "Error completing lecture");
    }
  };

  const handleReviewSubmit = async (data: { rating: number; comment: string }) => {
    try {
      const response = await addReview({
        id: courseId,
        data: {
          rating: data.rating,
          comment: data.comment,
        },
      }).unwrap();
      toast.success(response?.message || "Review submitted successfully");
      setIsReviewOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Error submitting review");
    }
  };

  const handleSubmitQuiz = async (answers: { q_id: number; o_id: number }[]): Promise<SubmitQuizData | null> => {
    if (!selectedQuizId) return null;

    try {
      const response = await submitQuizzes({
        quizId: selectedQuizId,
        data: { answers },
      }).unwrap();

      if (currentLecture) {
        await completeLecture(currentLecture.id).unwrap();
      }

      toast.success("Quiz submitted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit quiz");
      throw error;
    }
  };

  const getCurrentLectureNumber = () => {
    if (!currentLecture) return 0;
    return allLectures.findIndex((l) => l.id === currentLecture.id) + 1;
  };

  if (isCourseLoading) {
    return (
      <div className="sm:min-h-screen bg-white px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0">
        <div className="border-b border-border-light bg-white sticky top-0 z-30">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
            <div className="flex items-center justify-between py-3 sm:py-4 gap-2 sm:gap-4">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="flex-1 h-6 max-w-xs" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-0 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            <div className="flex-1 min-w-0">
              <Skeleton className="w-full aspect-video rounded-lg mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>

            <div className="hidden lg:block w-full lg:w-110 shrink-0">
              <div className="border border-border-light rounded-lg overflow-hidden">
                <Skeleton className="h-16 w-full" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-12 w-full mt-4" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!courseData?.data) {
    return (
      <div className="sm:min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-title">Course not found</p>
        </div>
      </div>
    );
  }

  const contents = courseData.data.contents;

  return (
    <div className="sm:min-h-screen bg-white px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0">
      {/* Top Header Bar */}
      <div className="border-b border-border-light bg-white sticky top-0 z-30">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
          <div className="flex items-center justify-between py-3 sm:py-4 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
              <button
                onClick={() => router.back()}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-title" />
              </button>

              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-base md:text-lg font-medium text-title truncate">
                  {courseData.data.course_title}
                </h1>

                <div className="hidden md:flex items-center gap-3 lg:gap-4 mt-1 text-xs md:text-sm text-description">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#4F9BEF]" />
                    {contents.length} {t("sections")}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#564FFD]" />
                    {allLectures.length} {t("lectures")}
                  </span>
                </div>

                <div className="flex md:hidden items-center gap-2 mt-1 text-xs text-description">
                  <span>{contents.length} {t("sections")}</span>
                  <span>•</span>
                  <span>{allLectures.length} {t("lectures")}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="lg:hidden p-1.5 sm:p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-title" />
              </button>

              <button
                onClick={() => setIsReviewOpen(true)}
                className="hidden sm:flex items-center gap-1.5 md:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 border border-border-light rounded-md text-xs sm:text-sm font-semibold text-title hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="hidden md:inline">{t("writeAReview")}</span>
                <span className="md:hidden">{t("review")}</span>
              </button>

              <button
                onClick={handleNextLecture}
                disabled={currentIndex >= allLectures.length - 1}
                className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-main text-white rounded-md text-xs sm:text-sm font-semibold hover:bg-main/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="hidden sm:inline">{t("nextLecture")}</span>
                <span className="sm:hidden">{t("next")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-0 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Video Player Column */}
          <div className="flex-1 min-w-0">
            {currentLecture ? (
              <div>
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                  {currentVideoUrl ? (
                    <video
                      key={videoKey}
                      ref={videoRef}
                      src={currentVideoUrl}
                      className="w-full h-full object-contain"
                      controls
                      preload="metadata"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onLoadedMetadata={() => {
                        if (isPlaying && videoRef.current) {
                          videoRef.current.play().catch(console.log);
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-300">
                      Video is not available for this lecture.
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="sm:hidden w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 px-4 py-2.5 border border-border-light rounded-lg text-sm font-semibold text-title hover:bg-gray-50 transition-colors"
                >
                  {t("writeAReview")}
                </button>
                <CoursePlayerTabs
                  currentLecture={currentLecture}
                  currentLectureNumber={getCurrentLectureNumber()}
                />
              </div>
            ) : (
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                <Skeleton className="w-full h-full" />
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-full lg:w-110 shrink-0">
            <div className="border border-border-light rounded-lg overflow-hidden lg:sticky lg:top-20">
              <div className="flex items-center justify-between p-4 bg-white border-b border-border-light">
                <h3 className="text-lg xl:text-xl font-medium text-title">
                  {t("courseContents")}
                </h3>
                <span className="text-sm font-medium text-success">
                  {progressPercent}% {t("completed")}
                </span>
              </div>

              <div className="max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide bg-white">
                {contents.map((section) => {
                  const isExpanded = expandedSections.includes(section.id);
                  const sectionCompleted = section.lectures.filter(
                    (l) => l.is_completed
                  ).length;

                  return (
                    <div
                      key={section.id}
                      className="border-b border-border-light last:border-b-0"
                    >
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {isExpanded ? (
                            <ChevronUp className="size-3 text-description shrink-0" />
                          ) : (
                            <ChevronDown className="size-3 text-description shrink-0" />
                          )}
                          <span className="text-sm lg:text-base font-semibold text-title text-left truncate">
                            {section.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 xl:gap-3 text-xs text-description shrink-0 ml-2">
                          <span className="flex items-center gap-1">
                            <BookOpen className="size-3.5 text-main" />
                            {section.lectures.length}
                          </span>
                          {section.quizzes && section.quizzes.length > 0 && (
                            <span className="flex items-center gap-1 text-success">
                              {sectionCompleted}/{section.lectures.length}
                            </span>
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="bg-white">
                          {section.lectures.map((lecture, idx) => {
                            const isActive = currentLecture?.id === lecture.id;
                            const isSelectable = canSelectLecture(lecture);

                            return (
                              <button
                                key={lecture.id}
                                onClick={() => isSelectable && handlePlayLecture(lecture)}
                                disabled={!isSelectable}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${isSelectable ? "hover:bg-main/5 cursor-pointer" : "cursor-not-allowed opacity-60"} ${isActive ? "bg-main/10" : ""}`}
                              >
                                <div className="shrink-0">
                                  {lecture.is_completed ? (
                                    <CheckSquare className="size-4 text-main fill-main" />
                                  ) : (
                                    <Square className="size-4 text-gray-300" />
                                  )}
                                </div>

                                <span className={`flex-1 text-sm truncate ${isActive ? "text-main font-medium" : "text-title"}`}>
                                  {idx + 1}. {lecture.name}
                                </span>

                                {isActive && isPlaying ? (
                                  <Pause className="w-3.5 h-3.5 text-main shrink-0" />
                                ) : (
                                  <Play className="w-3.5 h-3.5 text-description shrink-0" />
                                )}
                              </button>
                            );
                          })}

                          {section.quizzes && section.quizzes.length > 0 && (
                            (() => {
                              const quiz = section.quizzes![0];
                              const isQuizCompleted = Boolean(quiz.is_completed);

                              return (
                                <div className={`flex items-center gap-3 px-4 py-2.5 ${isQuizCompleted ? "bg-main/5" : ""}`}>
                                  <div className="shrink-0">
                                    {isQuizCompleted ? (
                                      <CheckSquare className="size-4 text-main fill-main" />
                                    ) : (
                                      <Square className="size-4 text-gray-300" />
                                    )}
                                  </div>
                                  <span className={`flex-1 text-sm font-semibold ${isQuizCompleted ? "text-main" : "text-title"}`}>
                                    {section.lectures.length + 1}. {quiz.title}
                                  </span>
                                  {isQuizCompleted && (
                                    <span className="text-xs font-medium text-success">
                                      {t("completed")}
                                    </span>
                                  )}
                                  <button
                                    onClick={() => {
                                      setSelectedQuizId(quiz.id);
                                      setIsQuizOpen(true);
                                    }}
                                    className="px-3 py-1.5 bg-main text-white rounded text-xs font-semibold hover:bg-main/90 transition-colors cursor-pointer"
                                  >
                                    {t("startQuiz")}
                                  </button>
                                </div>
                              );
                            })()
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileSidebar(false)}
          />

          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 bg-white border-b border-border-light">
              <h3 className="text-lg font-medium text-title">
                {t("courseContents")}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-success">
                  {progressPercent}%
                </span>
                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-title" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {contents.map((section) => {
                const isExpanded = expandedSections.includes(section.id);
                const sectionCompleted = section.lectures.filter(
                  (l) => l.is_completed
                ).length;

                return (
                  <div
                    key={section.id}
                    className="border-b border-border-light last:border-b-0"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {isExpanded ? (
                          <ChevronUp className="size-3 text-description shrink-0" />
                        ) : (
                          <ChevronDown className="size-3 text-description shrink-0" />
                        )}
                        <span className="text-sm font-semibold text-title text-left truncate">
                          {section.name}
                        </span>
                      </div>
                      <span className="text-xs text-success shrink-0 ml-2">
                        {sectionCompleted}/{section.lectures.length}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="bg-white">
                        {section.lectures.map((lecture, idx) => {
                          const isActive = currentLecture?.id === lecture.id;
                          const isSelectable = canSelectLecture(lecture);

                          return (
                            <button
                              key={lecture.id}
                              onClick={() => isSelectable && handlePlayLecture(lecture)}
                              disabled={!isSelectable}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${isSelectable ? "hover:bg-main/5 cursor-pointer" : "cursor-not-allowed opacity-60"} ${isActive ? "bg-main/10" : ""}`}
                            >
                              <div className="shrink-0">
                                {lecture.is_completed ? (
                                  <CheckSquare className="size-4 text-main fill-main" />
                                ) : (
                                  <Square className="size-4 text-gray-300" />
                                )}
                              </div>

                              <span className={`flex-1 text-sm truncate ${isActive ? "text-main font-medium" : "text-title"}`}>
                                {idx + 1}. {lecture.name}
                              </span>
                            </button>
                          );
                        })}

                        {section.quizzes && section.quizzes.length > 0 && (
                          (() => {
                            const quiz = section.quizzes![0];
                            const isQuizCompleted = Boolean(quiz.is_completed);

                            return (
                              <div className={`flex items-center gap-3 px-4 py-2.5 ${isQuizCompleted ? "bg-main/5" : ""}`}>
                                <div className="shrink-0">
                                  {isQuizCompleted ? (
                                    <CheckSquare className="size-4 text-main fill-main" />
                                  ) : (
                                    <Square className="size-4 text-gray-300" />
                                  )}
                                </div>
                                <span className={`flex-1 text-sm font-semibold ${isQuizCompleted ? "text-main" : "text-title"}`}>
                                  {section.lectures.length + 1}. {quiz.title}
                                </span>
                                {isQuizCompleted && (
                                  <span className="text-xs font-medium text-success">
                                    {t("completed")}
                                  </span>
                                )}
                                <button
                                  onClick={() => {
                                    setSelectedQuizId(quiz.id);
                                    setIsQuizOpen(true);
                                    setShowMobileSidebar(false);
                                  }}
                                  className="px-3 py-1.5 bg-main text-white rounded text-xs font-semibold hover:bg-main/90 transition-colors cursor-pointer"
                                >
                                  {t("startQuiz")}
                                </button>
                              </div>
                            );
                          })()
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {(() => {
        if (!selectedQuizId || !quizData?.data) return null;

        const convertedQuizData: TQuizData = {
          id: String(selectedQuizId),
          title: quizData.data.title,
          questions: quizData.data.questions.map((q) => ({
            id: String(q.id),
            questionId: q.id,
            question: q.text,
            optionIds: q.options.map((opt) => opt.id),
            options: q.options.map(opt => opt.text),
            correctAnswer: 0,
          } as TQuizQuestion))
        };

        return (
          <QuizModal
            isOpen={isQuizOpen}
            onClose={() => {
              setIsQuizOpen(false);
              setSelectedQuizId(null);
            }}
            quizData={convertedQuizData}
            onSubmitQuiz={handleSubmitQuiz}
          />
        );
      })()}

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmit={handleReviewSubmit}
        courseName={courseData.data.course_title}
      />
    </div>
  );
};

export default CoursePlayerPage;