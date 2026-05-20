/* eslint-disable react-hooks/purity */
"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useGetEnrolledCoursesQuery } from "@/redux/features/student/student.api";
import { useSendMessageToAiMutation, useAiConversationListQuery } from "@/redux/features/ai/ai.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ChatForm = {
    message: string;
};

type Message = {
    id: string;
    text: string;
    isOwn: boolean;
    time: string;
    sender: string;
};

const AITutorPage = () => {
    const t = useTranslations("AITutor");
    const tCommon = useTranslations("Common");

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { register, handleSubmit, reset } = useForm<ChatForm>();

    // 1. Fetch Enrolled Courses
    const { data: enrolledCoursesData, isLoading: isCoursesLoading } = useGetEnrolledCoursesQuery({ page: 1 });
    const enrolledCourses = enrolledCoursesData?.data || [];

    const [selectedCourseId, setSelectedCourseId] = useState<string>("");
    const [conversationId, setConversationId] = useState<number | null>(null);
    const [localMessages, setLocalMessages] = useState<Message[]>([]);

    // 2. Mutations & Queries
    const [sendMessageToAi, { isLoading: isSending }] = useSendMessageToAiMutation();

    const { data: conversationData, isLoading: isChatLoading } = useAiConversationListQuery(
        conversationId!,
        { skip: conversationId === null }
    );

    // 3. Select first course when loaded
    useEffect(() => {
        if (enrolledCourses.length > 0 && !selectedCourseId) {
            setSelectedCourseId(enrolledCourses[0].course.toString());
        }
    }, [enrolledCourses, selectedCourseId]);

    // 4. Update Conversation ID when course changes
    useEffect(() => {
        if (selectedCourseId) {
            const storedId = localStorage.getItem(`ai_conversation_course_${selectedCourseId}`);
            if (storedId) {
                setConversationId(Number(storedId));
            } else {
                setConversationId(null);
                setLocalMessages([]);
            }
        }
    }, [selectedCourseId]);

    // 5. Sync Conversation history with local messages
    useEffect(() => {
        if (conversationData?.data) {
            const apiMsgs = [...conversationData.data]
                .sort((a, b) => a.id - b.id)
                .map((msg) => ({
                    id: msg.id.toString(),
                    text: msg.body,
                    isOwn: msg.sender === "user",
                    time: new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    sender: msg.sender === "user" ? t("you") : msg.sender_name || t("title"),
                }));
            setLocalMessages(apiMsgs);
        } else {
            setLocalMessages([]);
        }
    }, [conversationData, t]);

    // 6. Scroll to bottom
    const scrollToBottom = (behavior: "smooth" | "auto" = "smooth") => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior,
            });
        }
    };

    useEffect(() => {
        scrollToBottom("auto");
    }, [conversationId]);

    useEffect(() => {
        scrollToBottom("smooth");
    }, [localMessages, isSending]);

    // 7. Handle sending message
    const onSubmit = async (data: ChatForm) => {
        if (!data.message?.trim() || !selectedCourseId) return;

        const userMessageText = data.message.trim();
        reset(); // Instant UI cleanup

        // Optimistically add user message to local state
        const tempMsg: Message = {
            id: `temp-${Date.now()}`,
            text: userMessageText,
            isOwn: true,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            sender: t("you"),
        };
        setLocalMessages((prev) => [...prev, tempMsg]);

        try {
            const courseIdNum = Number(selectedCourseId);
            const response = await sendMessageToAi({
                course_id: courseIdNum,
                user_message: userMessageText,
            }).unwrap();

            if (response.success && response.data) {
                const newConversationId = response.data.conversation_id;
                localStorage.setItem(`ai_conversation_course_${selectedCourseId}`, newConversationId.toString());
                setConversationId(newConversationId);
            }
        } catch (error) {
            console.error("Failed to send message to AI:", error);
            // Remove the optimistic message if it failed
            setLocalMessages((prev) => prev.filter((m) => m.id !== tempMsg.id));
        }
    };

    // Determine the list of messages to show
    const displayMessages = localMessages.length > 0 
        ? localMessages 
        : [
            {
                id: "initial",
                sender: t("title"),
                text: t("initialMessage"),
                time: "",
                isOwn: false,
            }
          ];

    return (
        <div className="bg-white rounded-md border border-border-light flex flex-col h-[calc(100vh-280px)] min-h-125">
            {/* Header */}
            <div className="p-4 border-b border-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-main/10 flex items-center justify-center">
                        <Bot className="size-6 text-main" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-title">{t("title")}</h3>
                        <p className="text-xs text-green-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                            {t("aiIsHere")}
                        </p>
                    </div>
                </div>

                {/* Dropdown for Enrolled Courses */}
                <div className="w-full sm:w-auto min-w-[200px]">
                    <Select 
                        value={selectedCourseId} 
                        onValueChange={setSelectedCourseId}
                        disabled={isCoursesLoading || enrolledCourses.length === 0}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={isCoursesLoading ? tCommon("loading") : t("selectCourse")} />
                        </SelectTrigger>
                        <SelectContent position="popper" className="bg-white">
                            {enrolledCourses.map((item) => (
                                <SelectItem key={item.course} value={item.course.toString()}>
                                    {item.course_title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Messages */}
            {conversationId !== null && isChatLoading ? (
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                        >
                            <div className="gap-2 w-[60%]">
                                <div className="flex gap-2 items-center mb-2">
                                    {index % 2 === 0 && <div className="w-7 h-7 rounded-full bg-gray-100 animate-pulse" />}
                                    <div className="h-3 w-16 bg-gray-100 animate-pulse rounded" />
                                </div>
                                <div className="h-10 bg-gray-50/50 animate-pulse rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="text-center">
                        <span className="text-xs text-description bg-gray-100 px-3 py-2 rounded-md">
                            {t("today")}
                        </span>
                    </div>

                    {displayMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                        >
                            <div className="gap-2 max-w-[80%]">
                                <div className="flex gap-2 items-center mb-2">
                                    {!msg.isOwn && (
                                        <div className="w-7 h-7 rounded-full bg-main/10 flex items-center justify-center shrink-0">
                                            <Bot className="size-4 text-main" />
                                        </div>
                                    )}
                                    {!msg.isOwn && (
                                        <p className="text-xs text-description mb-1 ml-1">
                                            {msg.sender}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <div
                                        className={`px-3 py-2 rounded-md text-sm break-words whitespace-pre-wrap ${msg.isOwn
                                            ? "bg-main text-white rounded-br-none"
                                            : "bg-[#F5F7FF] text-title rounded-bl-none"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                    {msg.time && (
                                        <p
                                            className={`text-xs text-description mt-1 ${msg.isOwn ? "text-right mr-1" : "ml-1"
                                                }`}
                                        >
                                            {msg.time}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Bouncing Typing Dots Bouncing for active API calls */}
                    {isSending && (
                        <div className="flex justify-start">
                            <div className="gap-2 max-w-[80%]">
                                <div className="flex gap-2 items-center mb-2">
                                    <div className="w-7 h-7 rounded-full bg-main/10 flex items-center justify-center shrink-0">
                                        <Bot className="size-4 text-main animate-pulse" />
                                    </div>
                                    <p className="text-xs text-description mb-1 ml-1">
                                        {t("title")}
                                    </p>
                                </div>
                                <div>
                                    <div className="px-4 py-3 rounded-md text-sm bg-[#F5F7FF] text-title rounded-bl-none flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-main rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-main rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-main rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Input */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-3 sm:p-4 border-t border-border-light flex items-center gap-2 sm:gap-3"
            >
                <input
                    {...register("message")}
                    placeholder={t("typePlaceholder")}
                    className="flex-1 bg-gray-50 rounded-md border border-border-light px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                    autoComplete="off"
                    disabled={enrolledCourses.length === 0}
                />
                <button
                    type="submit"
                    className="px-4 py-2.5 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSending || enrolledCourses.length === 0}
                >
                    {isSending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            {t("send")}
                            <Send className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AITutorPage;
