"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Send,
    Sparkles,
    BookOpen,
    FileText,
    HelpCircle,
    Lightbulb,
    Target,
    Trash2,
} from "lucide-react";

type TChatMessage = {
    id: string;
    role: "user" | "assistant";
    text: string;
};

type ChatForm = {
    message: string;
};

type ContentForm = {
    topic: string;
    contentType: string;
};

const quickActions = [
    { label: "Suggest Course Structure", icon: BookOpen },
    { label: "Generate Lesson Draft", icon: FileText },
    { label: "Create Quiz Questions", icon: HelpCircle },
    { label: "Improve Content", icon: Lightbulb },
    { label: "Learning Objectives", icon: Target },
];

const contentTypeOptions = [
    { value: "course-structure", label: "Course Structure" },
    { value: "lesson-plan", label: "Lesson Plan" },
    { value: "quiz", label: "Quiz Questions" },
    { value: "assignment", label: "Assignment" },
    { value: "summary", label: "Content Summary" },
];

const AIAssistantPage = () => {
    const [messages, setMessages] = useState<TChatMessage[]>([
        {
            id: "1",
            role: "assistant",
            text: "Hello! I'm your AI teaching assistant. I can help you create course content, suggest structures, generate quizzes, and more. How can I help you today?",
        },
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const chatForm = useForm<ChatForm>();
    const contentForm = useForm<ContentForm>();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const addMessage = (text: string, role: "user" | "assistant") => {
        setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), role, text },
        ]);
    };

    const onChatSubmit = (data: ChatForm) => {
        if (!data.message.trim()) return;
        addMessage(data.message, "user");
        chatForm.reset();

        // Simulated AI response
        setTimeout(() => {
            addMessage(
                "That's a great question! I'd be happy to help you with that. Let me think about the best approach for your course content...",
                "assistant"
            );
        }, 800);
    };

    const handleQuickAction = (label: string) => {
        addMessage(label, "user");
        setTimeout(() => {
            addMessage(
                `Sure! I can help you ${label.toLowerCase()}. Could you tell me which course or topic you'd like me to focus on?`,
                "assistant"
            );
        }, 800);
    };

    const onContentGenerate = (data: ContentForm) => {
        if (!data.topic.trim()) return;
        const type =
            contentTypeOptions.find((o) => o.value === data.contentType)?.label ||
            data.contentType;
        addMessage(`Generate ${type} for: ${data.topic}`, "user");
        contentForm.reset();

        setTimeout(() => {
            addMessage(
                `Here's a generated ${type} outline for "${data.topic}":\n\n1. Introduction & Overview\n2. Core Concepts & Fundamentals\n3. Practical Applications\n4. Hands-on Exercises\n5. Assessment & Review\n\nWould you like me to expand on any of these sections?`,
                "assistant"
            );
        }, 1000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Assistant */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-border-light flex flex-col h-[calc(100vh-220px)] min-h-125">
                {/* Header */}
                <div className="p-4 border-b border-border-light flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-main/10 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-main" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-title">AI Assistant</h3>
                            <p className="text-xs text-green-500">Online</p>
                        </div>
                    </div>
                    <button
                        onClick={() =>
                            setMessages([
                                {
                                    id: "1",
                                    role: "assistant",
                                    text: "Hello! I'm your AI teaching assistant. How can I help you today?",
                                },
                            ])
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Clear chat"
                    >
                        <Trash2 className="w-4 h-4 text-description" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-xl text-sm whitespace-pre-line ${
                                    msg.role === "user"
                                        ? "bg-main text-white rounded-br-none"
                                        : "bg-gray-100 text-title rounded-bl-none"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                        <button
                            key={action.label}
                            onClick={() => handleQuickAction(action.label)}
                            className="flex items-center gap-1.5 px-3 py-1.5 border border-border-light rounded-full text-xs font-medium text-description hover:bg-gray-50 hover:text-title transition-colors"
                        >
                            <action.icon className="w-3.5 h-3.5" />
                            {action.label}
                        </button>
                    ))}
                </div>

                {/* Input */}
                <form
                    onSubmit={chatForm.handleSubmit(onChatSubmit)}
                    className="p-4 border-t border-border-light flex items-center gap-3"
                >
                    <input
                        {...chatForm.register("message")}
                        placeholder="Ask me anything about course creation..."
                        className="flex-1 bg-gray-50 rounded-lg px-4 py-3 border border-border-light text-sm focus:outline-none focus:ring-1 focus:ring-main"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="px-4 py-3 bg-main text-white rounded-lg text-sm font-semibold hover:bg-main/90 transition-colors flex items-center gap-1.5 shrink-0"
                    >
                        Send
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>

            {/* Content Generator */}
            <div className="bg-white rounded-lg border border-border-light p-5 h-fit">
                <h3 className="text-base font-bold text-title mb-1">
                    Content Generator
                </h3>
                <p className="text-xs text-description mb-5">
                    Generate course content instantly with AI
                </p>

                <form
                    onSubmit={contentForm.handleSubmit(onContentGenerate)}
                    className="space-y-4"
                >
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            Topic / Subject
                        </label>
                        <input
                            {...contentForm.register("topic", { required: true })}
                            placeholder="e.g., Introduction to React Hooks"
                            className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            Content Type
                        </label>
                        <select
                            {...contentForm.register("contentType")}
                            className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                            defaultValue="course-structure"
                        >
                            {contentTypeOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition-colors flex items-center justify-center gap-1.5"
                        >
                            <Sparkles className="w-4 h-4" />
                            Generate
                        </button>
                        <button
                            type="button"
                            onClick={() => contentForm.reset()}
                            className="px-4 py-2.5 border border-border-light rounded-lg text-sm font-medium text-description hover:bg-gray-50 transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AIAssistantPage;
