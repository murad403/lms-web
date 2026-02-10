/* eslint-disable react-hooks/purity */
"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, Paperclip } from "lucide-react";
import { useForm } from "react-hook-form";


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

const initialMessages: Message[] = [
    {
        id: "1",
        sender: "AI Tutor",
        text: "Hello! I'm your AI-powered tutor. I can help you understand concepts from your courses, answer questions, and provide explanations. Select a course to get context-aware help, or just ask me anything!",
        time: "08:30 Pm",
        isOwn: false,
    },
];

const AITutorPage = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { register, handleSubmit, reset } = useForm<ChatForm>();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const onSubmit = (data: ChatForm) => {
        if (!data.message.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: data.message,
            isOwn: true,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            sender: "You",
        };

        setMessages((prev) => [...prev, userMsg]);
        reset();

        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Yeah sure, thanks",
                isOwn: false,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                sender: "AI Tutor",
            };
            setMessages((prev) => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <div className="bg-white rounded-md border border-border-light flex flex-col h-[calc(100vh-280px)] min-h-125">
            {/* Header */}
            <div className="p-4 border-b border-border-light flex items-center gap-3">
                <div className="size-12 rounded-full bg-main/10 flex items-center justify-center">
                    <Bot className="size-6 text-main" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-title">AI Tutor</h3>
                    <p className="text-xs text-green-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        AI is Here
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center">
                    <span className="text-xs text-description bg-gray-100 px-3 py-2 rounded-md">
                        Today
                    </span>
                </div>

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                    >
                        <div className={` gap-2 max-w-[80%] ${msg.isOwn ? "" : ""}`}>
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
                                    className={`px-3 py-2 rounded-md text-sm ${msg.isOwn
                                        ? "bg-main text-white rounded-br-none"
                                        : "bg-[#F5F7FF] text-title rounded-bl-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                                <p
                                    className={`text-xs text-description mt-1 ${msg.isOwn ? "text-right mr-1" : "ml-1"
                                        }`}
                                >
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-3 sm:p-4 border-t border-border-light flex items-center gap-2 sm:gap-3"
            >
                <input
                    {...register("message")}
                    placeholder="Type your message"
                    className="flex-1 bg-gray-50 rounded-md border border-border-light px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="px-4 py-2.5 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors flex items-center gap-1.5 shrink-0"
                >
                    Send
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
};

export default AITutorPage;
