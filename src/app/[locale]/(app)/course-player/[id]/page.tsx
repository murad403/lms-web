"use client";
import { useState, useRef, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  CheckSquare,
  Square,
  ArrowLeft,
  Clock,
  BookOpen,
  Layers,
  MessageCircle,
  Users,
  CalendarDays,
  SkipBack,
  SkipForward,
} from "lucide-react";
import Image from "next/image";
import {
  courseSections,
  coursePlayerInfo,
  quizQuestionsData,
} from "@/lib/profile";
import { Link, useRouter } from "@/i18n/navigation";
import QuizModal from "@/components/modal/QuizModal";
import WriteReviewModal from "@/components/modal/WriteReviewModal";

const CoursePlayerPage = () => {
  const router = useRouter();
  const [currentLecture, setCurrentLecture] = useState(
    courseSections[0].lectures[1]
  );
  const [expandedSections, setExpandedSections] = useState<string[]>(["s1"]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Calculate overall progress
  const totalLectures = courseSections.reduce(
    (acc, section) => acc + section.lectures.length,
    0
  );
  const completedLectures = courseSections.reduce(
    (acc, section) => acc + section.lectures.filter((l) => l.completed).length,
    0
  );
  const progressPercent = Math.round(
    (completedLectures / totalLectures) * 100
  );

  // Find current lecture index across all sections for "Next Lecture"
  const allLectures = useMemo(
    () => courseSections.flatMap((s) => s.lectures),
    []
  );
  const currentIndex = allLectures.findIndex(
    (l) => l.id === currentLecture.id
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handlePlayLecture = (
    lecture: (typeof courseSections)[0]["lectures"][0]
  ) => {
    setCurrentLecture(lecture);
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  const handleNextLecture = () => {
    if (currentIndex < allLectures.length - 1) {
      handlePlayLecture(allLectures[currentIndex + 1]);
    }
  };

  const handleReviewSubmit = (data: { rating: number; comment: string }) => {
    console.log("Review submitted:", data);
    setIsReviewOpen(false);
  };

  // Get current lecture number
  const getCurrentLectureNumber = () => {
    let count = 0;
    for (const section of courseSections) {
      for (const lecture of section.lectures) {
        count++;
        if (lecture.id === currentLecture.id) return count;
      }
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header Bar */}
      <div className="border-b border-border-light bg-white sticky top-0 z-30">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
          <div className="flex items-center justify-between py-3 sm:py-4 gap-4">
            {/* Left: Back + Course Info */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-title" />
              </button>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-base font-bold text-title truncate">
                  {coursePlayerInfo.title}
                </h1>
                <div className="flex items-center gap-3 sm:gap-4 mt-1 text-xs text-description">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    {coursePlayerInfo.sections} Sections
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {coursePlayerInfo.totalLectures} lectures
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {coursePlayerInfo.totalDuration}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => setIsReviewOpen(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 border border-border-light rounded-lg text-sm font-semibold text-title hover:bg-gray-50 transition-colors"
              >
                Write A Review
              </button>
              <button
                onClick={handleNextLecture}
                disabled={currentIndex >= allLectures.length - 1}
                className="flex items-center gap-2 px-4 py-2.5 bg-main text-white rounded-lg text-sm font-semibold hover:bg-main/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Lecture
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-0 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video Player Column */}
          <div className="flex-1 min-w-0">
            {/* Video */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <video
                ref={videoRef}
                src={currentLecture.videoUrl}
                className="w-full h-full object-contain"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>

            {/* Lecture Info Below Video */}
            <div className="mt-5">
              <h2 className="text-lg sm:text-xl font-bold text-title">
                {getCurrentLectureNumber()}. {currentLecture.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-3">
                {/* Student Avatars */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="relative w-7 h-7 rounded-full border-2 border-white overflow-hidden"
                      >
                        <Image
                          src="/home/banner.jpg"
                          alt="Student"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-title">
                      {coursePlayerInfo.studentsWatching}
                    </span>{" "}
                    <span className="text-description">students watching</span>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-center gap-1.5 text-sm text-description">
                  <CalendarDays className="w-4 h-4" />
                  Last updated: {coursePlayerInfo.lastUpdated}
                </div>

                {/* Comments */}
                <div className="flex items-center gap-1.5 text-sm text-description">
                  <MessageCircle className="w-4 h-4" />
                  Comments: {coursePlayerInfo.comments}
                </div>
              </div>
            </div>

            {/* Mobile Write Review Button */}
            <button
              onClick={() => setIsReviewOpen(true)}
              className="sm:hidden w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 border border-border-light rounded-lg text-sm font-semibold text-title hover:bg-gray-50 transition-colors"
            >
              Write A Review
            </button>
          </div>

          {/* Course Contents Sidebar */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="border border-border-light rounded-lg overflow-hidden lg:sticky lg:top-20">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 bg-white border-b border-border-light">
                <h3 className="text-base font-bold text-title">
                  Course Contents
                </h3>
                <span className="text-sm font-semibold text-success">
                  {progressPercent}% Completed
                </span>
              </div>

              {/* Sections List */}
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide bg-white">
                {courseSections.map((section) => {
                  const isExpanded = expandedSections.includes(section.id);
                  const sectionCompleted = section.lectures.filter(
                    (l) => l.completed
                  ).length;

                  return (
                    <div
                      key={section.id}
                      className="border-b border-border-light last:border-b-0"
                    >
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-description shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-description shrink-0" />
                          )}
                          <span className="text-sm font-semibold text-title text-left truncate">
                            {section.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-description shrink-0 ml-2">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-main" />
                            {section.lectureCount} lectures
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-main" />
                            {section.totalDuration}
                          </span>
                          {section.completionPercent !== undefined && (
                            <span className="flex items-center gap-1 text-success">
                              🌱 {section.completionPercent}% finish ({sectionCompleted}/{section.lectures.length})
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Lectures List */}
                      {isExpanded && (
                        <div className="bg-white">
                          {section.lectures.map((lecture, idx) => {
                            const isActive =
                              currentLecture.id === lecture.id;

                            return (
                              <button
                                key={lecture.id}
                                onClick={() => handlePlayLecture(lecture)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-main/5 transition-colors ${
                                  isActive ? "bg-main/10" : ""
                                }`}
                              >
                                {/* Checkbox */}
                                <div className="shrink-0">
                                  {lecture.completed ? (
                                    <CheckSquare className="w-[18px] h-[18px] text-main fill-main" />
                                  ) : (
                                    <Square className="w-[18px] h-[18px] text-gray-300" />
                                  )}
                                </div>

                                {/* Lecture Title */}
                                <span
                                  className={`flex-1 text-sm truncate ${
                                    isActive
                                      ? "text-main font-medium"
                                      : "text-title"
                                  }`}
                                >
                                  {idx + 1}. {lecture.title}
                                </span>

                                {/* Play/Pause + Duration */}
                                <div className="flex items-center gap-2 shrink-0">
                                  {isActive && isPlaying ? (
                                    <Pause className="w-4 h-4 text-main" />
                                  ) : (
                                    <Play className="w-4 h-4 text-description" />
                                  )}
                                  <span className="text-xs text-description">
                                    {lecture.duration}
                                  </span>
                                </div>
                              </button>
                            );
                          })}

                          {/* Quiz Row (if section has quiz) */}
                          {section.hasQuiz && (
                            <div className="flex items-center gap-3 px-4 py-2.5">
                              <Square className="w-[18px] h-[18px] text-gray-300 shrink-0" />
                              <span className="flex-1 text-sm text-title">
                                {section.lectures.length + 1}. Start Quiz
                              </span>
                              <button
                                onClick={() => setIsQuizOpen(true)}
                                className="px-4 py-1.5 bg-main text-white rounded text-xs font-semibold hover:bg-main/90 transition-colors"
                              >
                                Start
                              </button>
                            </div>
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

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        quizData={quizQuestionsData[0]}
      />

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmit={handleReviewSubmit}
        courseName={coursePlayerInfo.title}
      />
    </div>
  );
};

export default CoursePlayerPage;
