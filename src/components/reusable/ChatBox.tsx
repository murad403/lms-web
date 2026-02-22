/* eslint-disable react-hooks/purity */
"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Send, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { chatUsers, chatMessages, TChatUser, TChatMessage } from "@/lib/profile";
import { useTranslations } from "next-intl";
import avatar from "@/assets/banner/avatar.png"

type MessageForm = {
  message: string;
};

type ChatBoxProps = {
  title?: string;
  heightClass?: string;
  isShowTitle: boolean;
};

const ChatBox = ({ title, heightClass = "h-[calc(100vh-200px)] md:h-[calc(100vh-320px)]", isShowTitle }: ChatBoxProps) => {
  const [selectedUser, setSelectedUser] = useState<TChatUser>(chatUsers[0]);
  const [messages, setMessages] = useState<TChatMessage[]>(chatMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserList, setShowUserList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const t = useTranslations("MessagesPage");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filteredUsers = chatUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = (data: MessageForm) => {
    if (!data.message.trim()) return;

    const newMsg: TChatMessage = {
      id: Date.now().toString(),
      senderId: "user",
      text: data.message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    reset();
  };

  const handleUserSelect = (user: TChatUser) => {
    setSelectedUser(user);
    setShowUserList(false);
  };

  return (
    <div>
      {isShowTitle && title && (
        <h2 className="text-lg sm:text-xl font-bold text-title mb-4 sm:mb-6">{title}</h2>
      )}

      <div className={`bg-white rounded-md border border-border-light flex overflow-hidden ${heightClass} min-h-125`}>

        {/* ── User List Panel ── */}
        <div
          className={`
            flex-col border-r border-border-light
            w-full md:w-72 lg:w-80 shrink-0
            ${showUserList ? "flex" : "hidden md:flex"}
          `}
        >
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-border-light shrink-0">
            <h3 className="text-base font-bold text-title mb-2 sm:mb-3">Chat</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-main"
              />
            </div>
          </div>

          {/* Users */}
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className={`w-full flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left border-b border-border-light last:border-0 ${
                  selectedUser.id === user.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="relative w-10 h-10 rounded-full">
                  <Image src={user.avatar} alt={user.name} fill className="object-cover rounded-full" />
                  {user.online && (
                    <span className="absolute z-10 bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-title truncate">{user.name}</h4>
                    <span className="text-[11px] text-description shrink-0">{user.time}</span>
                  </div>
                  <p className="text-xs text-description truncate mt-0.5">{user.lastMessage}</p>
                </div>
                {user.unread && (
                  <span className="w-5 h-5 bg-main text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                    {user.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Chat Panel ── */}
        <div className={`flex-col flex-1 min-w-0 ${showUserList ? "hidden md:flex" : "flex"}`}>

          {/* Chat Header */}
          <div className="px-3 sm:px-4 py-3 border-b border-border-light flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Back button — mobile only */}
            <button
              onClick={() => setShowUserList(true)}
              className="md:hidden p-1.5 -ml-1 rounded-md text-description hover:text-title hover:bg-gray-100 transition-colors"
              aria-label="Back to chats"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="relative shrink-0">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden">
                <Image src={avatar} alt={selectedUser.name} fill className="object-cover" />
              </div>
              {selectedUser.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-bold text-title truncate">{selectedUser.name}</h4>
              <p className="text-xs text-green-500 font-medium">{t("activeNow")}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-3 sm:space-y-4">
            <div className="text-center">
              <span className="text-xs text-description bg-gray-100 px-3 py-1.5 rounded-full">{t("today")}</span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-end gap-1.5 sm:gap-2 max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${msg.isOwn ? "flex-row-reverse" : ""}`}>
                  {!msg.isOwn && (
                    <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full mb-4">
                      <Image src={selectedUser.avatar} alt={selectedUser.name} fill className="rounded-full object-cover" />
                    </div>
                  )}
                  <div>
                    {!msg.isOwn && (
                      <p className="text-[10px] text-description mb-1 ml-1">{selectedUser.name}</p>
                    )}
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm leading-relaxed wrap-break-word ${
                        msg.isOwn
                          ? "bg-main text-white rounded-br-sm"
                          : "bg-gray-100 text-title rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.time && (
                      <p className={`text-[10px] text-description mt-1 ${msg.isOwn ? "text-right mr-1" : "ml-1"}`}>
                        {msg.time}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-3 sm:px-4 py-3 border-t border-border-light flex items-center gap-2 shrink-0"
          >
            <input
              {...register("message")}
              placeholder={t("typePlaceholder")}
              className="flex-1 min-w-0 bg-gray-50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-border-light text-sm focus:outline-none focus:ring-1 focus:ring-main"
              autoComplete="off"
            />
            <button
              type="submit"
              className="px-3 sm:px-4 py-2.5 sm:py-3 bg-main text-white rounded-xl text-sm font-semibold hover:bg-main/90 active:bg-main/80 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span className="hidden sm:inline">{t("send")}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

