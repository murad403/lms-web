"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Send, Pen, ListTodo, Lightbulb, Trash2 } from "lucide-react";
import { FaRobot } from "react-icons/fa6";
import { useTranslations } from "next-intl";

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

  const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const initialAssistantMessage = `Hello! I'm your AI teaching assistant. I can help you:

• Suggest Course Structures based on your topic
• Generate lesson drafts and content outlines
• Create quiz questions and assessments
• Improve existing content for clarity and engagement
• Write learning objectives aligned with outcomes

What would you like help with today?`;

  const [messages, setMessages] = useState<TChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      text: initialAssistantMessage,
      time: "04:57 PM",
    },
  ]);

  const { register, handleSubmit, reset } = useForm<ChatForm>();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const onChatSubmit = (data: ChatForm) => {
    if (!data.message.trim()) return;
    addMessage(data.message, "user");
    reset();

    // Simulated AI response matching context
    setTimeout(() => {
      addMessage(
        "I'd be happy to help you with that! Let me process your request and generate the best teaching draft for you.",
        "assistant"
      );
    }, 800);
  };

  const handleQuickAction = (actionLabel: string) => {
    addMessage(actionLabel, "user");
    setTimeout(() => {
      addMessage(
        `Great choice! I will now start working on the task: "${actionLabel}". Please provide the specific topic or details you have in mind.`,
        "assistant"
      );
    }, 800);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        text: "Chat cleared. How can I assist you with your teaching curriculum today?",
        time: getFormattedTime(),
      },
    ]);
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

        {/* Clear Button */}
        <button
          onClick={handleClearChat}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0 text-description hover:text-red-500"
          title="Clear Chat"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-1 max-h-[450px] min-h-[350px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 items-start ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Circle Avatar bubble */}
            {msg.role === "assistant" ? (
              <div className="w-8 h-8 rounded-full bg-[#0C3B77] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <FaRobot className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-main flex items-center justify-center shrink-0 text-white font-bold text-xs uppercase shadow-sm mt-0.5">
                U
              </div>
            )}

            {/* Bubble details */}
            <div className={`flex flex-col gap-1.5 max-w-[85%] ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}>
              <div
                className={`px-5 py-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${
                  msg.role === "user"
                    ? "bg-[#4590EC] text-white rounded-tr-none font-medium"
                    : "bg-[#EDF2F6] text-[#11263C] rounded-tl-none font-medium"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-description px-1.5">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 pb-5">
        <button
          onClick={() => handleQuickAction("Suggest Course Structure")}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-border-light rounded-xl text-xs font-bold text-[#1F2E4D] shadow-sm transition-all shrink-0"
        >
          <ListTodo className="w-4 h-4 text-main shrink-0" />
          Suggest Course Structure
        </button>
        <button
          onClick={() => handleQuickAction("Learning Objectives")}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-border-light rounded-xl text-xs font-bold text-[#1F2E4D] shadow-sm transition-all shrink-0"
        >
          <Lightbulb className="w-4 h-4 text-main shrink-0" />
          Learning Objectives
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
              placeholder="Type your message"
              className="w-full bg-white border border-border-light rounded-xl pl-11 pr-4 py-3 text-sm text-[#1F2E4D] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-main shadow-sm"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-6 py-3 bg-[#4590EC] hover:bg-[#347FD5] text-white font-semibold rounded-xl text-sm transition-all shadow-sm shrink-0"
          >
            Send
            <Send className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiChatBot;