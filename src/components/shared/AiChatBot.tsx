"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Send, Pen, ListTodo, Lightbulb, Loader2, HelpCircle } from "lucide-react";
import { FaRobot } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { getClientSession } from "@/utils/auth-client";
import { useGetStudentProfileQuery } from "@/redux/features/student/student.api";
import { useGetInstructorProfileQuery } from "@/redux/features/instructor/instructor.api";
import { useGetWhiteLabelQuery } from "@/redux/features/organization/organization.api";
import { resolveImageUrl } from "@/utils/image";
import {
  useGetCourseListForAiQuery,
  useAiCourseStructureMutation,
  useAiLessonDraftMutation,
  useAiQuizQuestionMutation,
  useAiImproveContentMutation,
  useAiLearningObjectivesMutation,
  useSendMessageToAiMutation,
  useAiConversationListQuery,
} from "@/redux/features/ai/ai.api";

type TChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
};

type ChatForm = {
  message: string;
};

const AiChatBot = () => {
  const t = useTranslations("InstructorAIAssistant");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const session = getClientSession();
  const { data: studentProfile } = useGetStudentProfileQuery(undefined, {
    skip: !session.accessToken || session.role !== "student",
  });
  const { data: instructorProfile } = useGetInstructorProfileQuery(undefined, {
    skip: !session.accessToken || session.role !== "instructor",
  });
  const { data: orgProfile } = useGetWhiteLabelQuery(undefined, {
    skip: !session.accessToken || session.role !== "organization",
  });

  const userAvatarUrl = useMemo(() => {
    if (session.role === "student" && studentProfile?.data?.user?.avatar) {
      return resolveImageUrl(studentProfile.data.user.avatar);
    }
    if (session.role === "instructor" && instructorProfile?.data?.user?.avatar) {
      return resolveImageUrl(instructorProfile.data.user.avatar);
    }
    if (session.role === "organization" && orgProfile?.data?.photo) {
      return resolveImageUrl(orgProfile.data.photo);
    }
    return "";
  }, [session.role, studentProfile, instructorProfile, orgProfile]);

  const userInitials = useMemo(() => {
    if (session.role === "student") {
      const name = studentProfile?.data?.user?.name || studentProfile?.data?.first_name;
      return name ? name.charAt(0).toUpperCase() : "S";
    }
    if (session.role === "instructor") {
      const name = instructorProfile?.data?.user?.name || instructorProfile?.data?.user?.email;
      return name ? name.charAt(0).toUpperCase() : "I";
    }
    if (session.role === "organization") {
      const name = orgProfile?.data?.name || orgProfile?.data?.username;
      return name ? name.charAt(0).toUpperCase() : "O";
    }
    return "U";
  }, [session.role, studentProfile, instructorProfile, orgProfile]);

  const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const initialAssistantMessage = useMemo(() => {
    return `Hello! I'm your AI teaching assistant.

Please select a course from the dropdown above to start. Once selected, you can:
• Generate lesson drafts for any of its lectures
• Generate quiz questions for any of its quizzes
• Suggest revised course outlines/structures
• Generate aligned learning objectives
• Improve existing course content (type text and click "Improve Content")`;
  }, []);

  const [messages, setMessages] = useState<TChatMessage[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedLectureOrQuiz, setSelectedLectureOrQuiz] = useState<string>("");
  const [conversationId, setConversationId] = useState<number | null>(null);

  const { register, handleSubmit, reset, getValues } = useForm<ChatForm>();

  // Fetch all courses for AI
  const { data: coursesResponse, isLoading: isLoadingCourses } = useGetCourseListForAiQuery(undefined);
  const courses = coursesResponse?.data || [];

  // Fetch conversation history
  const { data: conversationData } = useAiConversationListQuery(
    conversationId!,
    { skip: conversationId === null }
  );

  // Find currently selected course
  const selectedCourse = useMemo(() => {
    return courses.find((c: any) => c.id === selectedCourseId);
  }, [courses, selectedCourseId]);

  const lectures = selectedCourse?.summary?.lectures || [];
  const quizzes = selectedCourse?.summary?.quizzes || [];

  // Mutations
  const [triggerCourseStructure, { isLoading: isCreatingStructure }] = useAiCourseStructureMutation();
  const [triggerLessonDraft, { isLoading: isDrafting }] = useAiLessonDraftMutation();
  const [triggerQuizQuestion, { isLoading: isGeneratingQuiz }] = useAiQuizQuestionMutation();
  const [triggerImproveContent, { isLoading: isImprovingContent }] = useAiImproveContentMutation();
  const [triggerLearningObjectives, { isLoading: isGeneratingObjectives }] = useAiLearningObjectivesMutation();
  const [triggerSendMessage, { isLoading: isSendingMessage }] = useSendMessageToAiMutation();

  const isTyping =
    isCreatingStructure ||
    isDrafting ||
    isGeneratingQuiz ||
    isImprovingContent ||
    isGeneratingObjectives ||
    isSendingMessage;

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "";
    try {
      const date = new Date(timeStr);
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutesStr = minutes < 10 ? "0" + minutes : minutes;
      return `${hours}:${minutesStr} ${ampm}`;
    } catch {
      return "";
    }
  };

  // Sync conversation history from API
  useEffect(() => {
    if (conversationData?.data && conversationData.data.length > 0) {
      const sorted = [...conversationData.data].sort((a, b) => a.id - b.id);
      const mapped = sorted.map((msg) => {
        const role = (
          msg.sender_name === "AI Assistant" ||
          msg.sender === "assistant" ||
          msg.sender === "ai" ||
          msg.sender === "bot" ||
          msg.sender === "00000000-0000-0000-0000-000000000000"
        ) ? "assistant" : "user";

        return {
          id: msg.id.toString(),
          role: role as "user" | "assistant",
          text: msg.body,
          time: formatTime(msg.created_at),
        };
      });

      setMessages([
        {
          id: "welcome",
          role: "assistant",
          text: initialAssistantMessage,
          time: "",
        },
        ...mapped,
      ]);
    } else {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          text: initialAssistantMessage,
          time: "",
        },
      ]);
    }
  }, [conversationData, initialAssistantMessage]);

  // Update Conversation ID when course changes
  useEffect(() => {
    if (selectedCourseId) {
      const storedId = localStorage.getItem(`ai_conversation_course_${selectedCourseId}`);
      if (storedId) {
        setConversationId(Number(storedId));
      } else {
        setConversationId(null);
      }
    }
  }, [selectedCourseId]);

  // Scroll to bottom when messages or typing status changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Select first course when loaded to enable chat immediately
  useEffect(() => {
    if (courses.length > 0 && !selectedCourseId) {
      setSelectedCourseId(courses[0].id);
    }
  }, [courses, selectedCourseId]);

  const addMessage = (text: string, role: "user" | "assistant") => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role,
        text,
        time: getFormattedTime(),
      },
    ]);
  };

  // General Chat Submission
  const onChatSubmit = async (data: ChatForm) => {
    if (!data.message.trim() || !selectedCourseId) return;
    const userMsg = data.message;
    addMessage(userMsg, "user");
    reset();

    try {
      const res = await triggerSendMessage({
        course_id: selectedCourseId,
        user_message: userMsg,
      }).unwrap();
      if (res.success && res.data) {
        addMessage(res.data.response, "assistant");
        if (res.data.conversation_id) {
          localStorage.setItem(`ai_conversation_course_${selectedCourseId}`, res.data.conversation_id.toString());
          setConversationId(res.data.conversation_id);
        }
      } else {
        addMessage("Failed to generate response. Please try again.", "assistant");
      }
    } catch (err) {
      addMessage("An error occurred while communicating with the AI.", "assistant");
    }
  };

  // Lecture or Quiz Selection Trigger (Only updates state, does not trigger API directly)
  const handleLectureOrQuizSelect = (val: string) => {
    if (!val || !selectedCourseId) return;
    setSelectedLectureOrQuiz(val);
  };

  // Suggest Course Structure Quick Action
  const handleSuggestCourseStructure = async () => {
    if (!selectedCourseId) return;
    addMessage(`Suggest revised course structure for: "${selectedCourse?.title}"`, "user");
    try {
      const res = await triggerCourseStructure({
        course_id: selectedCourseId,
      }).unwrap();
      if (res.success && res.data) {
        addMessage(res.data.response, "assistant");
        const newConversationId = (res.data as any).conversation_id;
        if (newConversationId) {
          localStorage.setItem(`ai_conversation_course_${selectedCourseId}`, newConversationId.toString());
          setConversationId(newConversationId);
        }
      } else {
        addMessage("Failed to generate course structure suggestion. Please try again.", "assistant");
      }
    } catch (err) {
      addMessage("An error occurred while generating the course structure.", "assistant");
    }
  };

  // Learning Objectives Quick Action
  const handleLearningObjectives = async () => {
    if (!selectedCourseId) return;
    addMessage(`Generate learning objectives for: "${selectedCourse?.title}"`, "user");
    try {
      const res = await triggerLearningObjectives({
        course_id: selectedCourseId,
      }).unwrap();
      if (res.success && res.data) {
        addMessage(res.data.response, "assistant");
        const newConversationId = (res.data as any).conversation_id;
        if (newConversationId) {
          localStorage.setItem(`ai_conversation_course_${selectedCourseId}`, newConversationId.toString());
          setConversationId(newConversationId);
        }
      } else {
        addMessage("Failed to generate learning objectives. Please try again.", "assistant");
      }
    } catch (err) {
      addMessage("An error occurred while generating learning objectives.", "assistant");
    }
  };

  // Improve Content Action
  const handleImproveContent = async (text: string) => {
    if (!selectedCourseId) return;
    if (!text.trim()) {
      addMessage("Please enter the content you want to improve in the message box, then click 'Improve Content'.", "assistant");
      return;
    }
    addMessage(`Improve content: "${text}"`, "user");
    reset();

    try {
      const res = await triggerImproveContent({
        course_id: selectedCourseId,
        content_to_improve: text,
        improvement_goal: "Improve readability, engagement, and learning experience.",
      }).unwrap();
      if (res.success && res.data) {
        addMessage(res.data.response, "assistant");
        const newConversationId = (res.data as any).conversation_id;
        if (newConversationId) {
          localStorage.setItem(`ai_conversation_course_${selectedCourseId}`, newConversationId.toString());
          setConversationId(newConversationId);
        }
      } else {
        addMessage("Failed to improve content. Please try again.", "assistant");
      }
    } catch (err) {
      addMessage("An error occurred while improving content.", "assistant");
    }
  };

  // Generate Lesson Draft Action
  const handleGenerateLessonDraft = async (text: string) => {
    if (!selectedCourseId) return;

    let lectureName = "";
    if (selectedLectureOrQuiz && selectedLectureOrQuiz.startsWith("lecture:")) {
      lectureName = selectedLectureOrQuiz.split(":").slice(2).join(":");
    } else {
      lectureName = text.trim();
    }

    if (!lectureName) {
      addMessage("Please select a lecture from the dropdown or type a lecture topic in the message box, then click 'Generate Lesson Draft'.", "assistant");
      return;
    }

    addMessage(`Generate lesson draft for lecture: "${lectureName}"`, "user");
    reset();

    try {
      const res = await triggerLessonDraft({
        course_id: selectedCourseId,
        lecture_name: lectureName,
      }).unwrap();
      if (res.success && res.data) {
        addMessage(res.data.response, "assistant");
        const newConversationId = (res.data as any).conversation_id;
        if (newConversationId) {
          localStorage.setItem(`ai_conversation_course_${selectedCourseId}`, newConversationId.toString());
          setConversationId(newConversationId);
        }
      } else {
        addMessage("Failed to generate lesson draft. Please try again.", "assistant");
      }
    } catch (err) {
      addMessage("An error occurred while generating the lesson draft.", "assistant");
    }
  };

  // Create Quiz Questions Action
  const handleCreateQuizQuestions = async (text: string) => {
    if (!selectedCourseId) return;

    let topicName = "";
    if (selectedLectureOrQuiz && selectedLectureOrQuiz.startsWith("quiz:")) {
      topicName = selectedLectureOrQuiz.split(":").slice(2).join(":");
    } else {
      topicName = text.trim();
    }

    if (!topicName) {
      addMessage("Please select a quiz from the dropdown or type a quiz topic in the message box, then click 'Create Quiz Questions'.", "assistant");
      return;
    }

    addMessage(`Generate quiz questions for topic: "${topicName}"`, "user");
    reset();

    try {
      const res = await triggerQuizQuestion({
        course_id: selectedCourseId,
        topic: topicName,
      }).unwrap();
      if (res.success && res.data) {
        addMessage(res.data.response, "assistant");
        const newConversationId = (res.data as any).conversation_id;
        if (newConversationId) {
          localStorage.setItem(`ai_conversation_course_${selectedCourseId}`, newConversationId.toString());
          setConversationId(newConversationId);
        }
      } else {
        addMessage("Failed to generate quiz questions. Please try again.", "assistant");
      }
    } catch (err) {
      addMessage("An error occurred while generating the quiz questions.", "assistant");
    }
  };

  // Helper to parse inline bolding
  const parseInlineBold = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return <strong key={idx} className="font-bold text-[#0C2A66]">{part}</strong>;
      }
      return part;
    });
  };

  // Render markdown text beautifully in assistant bubbles
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, index) => {
      // Header check
      if (line.startsWith("#")) {
        const level = line.match(/^#+/)?.[0].length || 1;
        const cleanText = line.replace(/^#+\s*/, "");
        const sizeClass =
          level === 1 ? "text-xl font-bold mt-3 mb-2" :
            level === 2 ? "text-lg font-bold mt-2 mb-1" :
              "text-base font-bold mt-1.5 mb-1";
        return <div key={index} className={`${sizeClass} text-[#0C2A66]`}>{cleanText}</div>;
      }
      // Horizontal Rule check
      if (line.trim() === "---") {
        return <hr key={index} className="my-3 border-gray-200" />;
      }
      // Bullet list check
      if (line.trim().startsWith("-") || line.trim().startsWith("*") || line.trim().startsWith("•")) {
        const cleanText = line.replace(/^\s*[-*•]\s*/, "");
        return (
          <ul key={index} className="list-disc list-inside pl-4 my-1">
            <li className="text-sm">{parseInlineBold(cleanText)}</li>
          </ul>
        );
      }
      // Standard paragraph
      return (
        <p key={index} className="min-h-[1.2rem] my-1 text-sm">
          {parseInlineBold(line)}
        </p>
      );
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-border-light shadow-sm p-6 flex flex-col min-h-[600px] w-full">
      {/* Header Block */}
      <div className="flex items-center justify-between pb-5 border-b border-border-light">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#292929] flex items-center justify-center shrink-0 shadow-sm">
            <FaRobot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0C2A66]">
              {t("aiTeachingAssistant") || "AI Teaching Assistant"}
            </h2>
            <p className="text-xs text-description">
              {t("poweredByAI") || "Powered by advanced AI"}
            </p>
          </div>
        </div>
      </div>

      {/* Select Dropdowns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-b border-border-light">
        {/* Dropdown 1: Course Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#0C2A66]">
            {t("selectCourse") || "Select Course"}
          </label>
          <Select
            value={selectedCourseId ? String(selectedCourseId) : ""}
            onValueChange={(val) => {
              setSelectedCourseId(Number(val));
              setSelectedLectureOrQuiz("");
            }}
            disabled={isLoadingCourses}
          >
            <SelectTrigger className="w-full bg-white border border-border-light rounded-xl h-11 text-sm font-semibold text-[#1F2E4D]">
              {isLoadingCourses ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-main" />
                  <span>Loading courses...</span>
                </div>
              ) : (
                <SelectValue placeholder={t("selectCourse") || "Select Course"} />
              )}
            </SelectTrigger>
            <SelectContent>
              {courses.map((course: any) => (
                <SelectItem key={course.id} value={String(course.id)}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dropdown 2: Lecture / Quiz Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#0C2A66]">
            {t("selectLectureOrQuiz") || "Select Lecture or Quiz"}
          </label>
          <Select
            value={selectedLectureOrQuiz}
            onValueChange={handleLectureOrQuizSelect}
            disabled={!selectedCourseId || isTyping}
          >
            <SelectTrigger className="w-full bg-white border border-border-light rounded-xl h-11 text-sm font-semibold text-[#1F2E4D]">
              <SelectValue placeholder={t("selectLectureOrQuiz") || "Select Lecture or Quiz"} />
            </SelectTrigger>
            <SelectContent>
              {lectures.length > 0 && (
                <>
                  <div className="text-[11px] font-bold text-gray-400 px-2 py-1 uppercase tracking-wider bg-gray-50">
                    {t("lectures") || "Lectures"}
                  </div>
                  {lectures.map((lec: string, idx: number) => (
                    <SelectItem key={`lec-${idx}`} value={`lecture:${idx}:${lec}`}>
                      {lec}
                    </SelectItem>
                  ))}
                </>
              )}
              {quizzes.length > 0 && (
                <>
                  <div className="text-[11px] font-bold text-gray-400 px-2 py-1 uppercase tracking-wider bg-gray-50 mt-1">
                    {t("quizzes") || "Quizzes"}
                  </div>
                  {quizzes.map((quiz: string, idx: number) => (
                    <SelectItem key={`quiz-${idx}`} value={`quiz:${idx}:${quiz}`}>
                      {quiz}
                    </SelectItem>
                  ))}
                </>
              )}
              {lectures.length === 0 && quizzes.length === 0 && (
                <SelectItem disabled value="none">
                  No lectures or quizzes found
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-1 max-h-[500px] min-h-[400px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 items-start ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
          >
            {msg.role === "assistant" ? (
              <div className="w-8 h-8 rounded-full bg-[#0C3B77] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <FaRobot className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm mt-0.5 border border-gray-100 flex items-center justify-center bg-[#0C2A66] text-white text-xs font-bold uppercase">
                {userAvatarUrl ? (
                  <Image src={userAvatarUrl} alt="User" width={32} height={32} className="w-full h-full object-cover" />
                ) : (
                  <span>{userInitials}</span>
                )}
              </div>
            )}

            <div className={`flex flex-col gap-1.5 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"
              }`}>
              <div
                className={`px-4 py-2.5 rounded-xl leading-relaxed shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${msg.role === "user"
                    ? "bg-[#4590EC] text-white rounded-tr-none font-medium text-sm"
                    : "bg-[#EDF2F6] text-[#11263C] rounded-tl-none font-medium text-sm"
                  }`}
              >
                {msg.role === "assistant" ? renderFormattedText(msg.text) : msg.text}
              </div>
              <span className="text-[10px] text-description px-1.5">
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {/* Typing State Bouncing Dots */}
        {isTyping && (
          <div className="flex gap-3 items-start flex-row">
            <div className="w-8 h-8 rounded-full bg-[#0C3B77] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <FaRobot className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col gap-1.5 items-start max-w-[85%]">
              <div className="bg-[#EDF2F6] text-[#11263C] px-4 py-2.5 rounded-xl rounded-tl-none font-medium shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-1.5 py-1">
                  <span className="w-2.5 h-2.5 bg-[#0c3b77] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2.5 h-2.5 bg-[#0c3b77] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2.5 h-2.5 bg-[#0c3b77] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 pb-5 border-t border-border-light">
        <button
          onClick={handleSuggestCourseStructure}
          disabled={!selectedCourseId || isTyping}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-border-light rounded-xl text-xs font-bold text-[#1F2E4D] shadow-sm transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ListTodo className="w-4 h-4 text-main shrink-0" />
          {t("suggestCourseStructure") || "Suggest Course Structure"}
        </button>
        <button
          onClick={() => {
            const val = getValues("message");
            handleGenerateLessonDraft(val);
          }}
          disabled={!selectedCourseId || isTyping || !selectedLectureOrQuiz.startsWith("lecture:")}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-border-light rounded-xl text-xs font-bold text-[#1F2E4D] shadow-sm transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Pen className="w-4 h-4 text-main shrink-0" />
          {t("generateLessonDraft") || "Generate Lesson Draft"}
        </button>
        <button
          onClick={() => {
            const val = getValues("message");
            handleCreateQuizQuestions(val);
          }}
          disabled={!selectedCourseId || isTyping || !selectedLectureOrQuiz.startsWith("quiz:")}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-border-light rounded-xl text-xs font-bold text-[#1F2E4D] shadow-sm transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HelpCircle className="w-4 h-4 text-main shrink-0" />
          {t("createQuizQuestions") || "Create Quiz Questions"}
        </button>
        <button
          onClick={handleLearningObjectives}
          disabled={!selectedCourseId || isTyping}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-border-light rounded-xl text-xs font-bold text-[#1F2E4D] shadow-sm transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Lightbulb className="w-4 h-4 text-main shrink-0" />
          {t("learningObjectives") || "Learning Objectives"}
        </button>
        <button
          onClick={() => {
            const val = getValues("message");
            handleImproveContent(val);
          }}
          disabled={!selectedCourseId || isTyping}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-border-light rounded-xl text-xs font-bold text-[#1F2E4D] shadow-sm transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Pen className="w-4 h-4 text-main shrink-0" />
          {t("improveContent") || "Improve Content"}
        </button>
      </div>

      {/* Input Row */}
      <form
        onSubmit={handleSubmit(onChatSubmit)}
        className="border-t border-border-light pt-5 shrink-0"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-main">
              <Pen className="w-4 h-4 shrink-0" />
            </span>
            <input
              {...register("message")}
              type="text"
              placeholder={
                !selectedCourseId
                  ? "Select a course to start..."
                  : t("askPlaceholder") || "Ask me anything about course creation..."
              }
              disabled={!selectedCourseId || isTyping}
              className="w-full bg-white border border-border-light rounded-xl pl-11 pr-4 py-3 text-sm text-[#1F2E4D] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-main shadow-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={!selectedCourseId || isTyping}
            className="flex items-center gap-1.5 px-6 py-3 bg-[#4590EC] hover:bg-[#347FD5] text-white font-semibold rounded-xl text-sm transition-all shadow-sm shrink-0 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {t("send") || "Send"}
            <Send className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiChatBot;