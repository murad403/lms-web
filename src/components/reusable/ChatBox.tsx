/* eslint-disable react-hooks/purity */
"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { chatUsers, chatMessages, TChatUser, TChatMessage } from "@/lib/profile";
import { useTranslations } from "next-intl";

type MessageForm = {
  message: string;
};

type ChatBoxProps = {
  title?: string;
  heightClass?: string;
  isShowTitle: boolean;
};

const ChatBox = ({ title, heightClass = "h-[calc(100vh-320px)]", isShowTitle }: ChatBoxProps) => {
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
        <h2 className="text-lg sm:text-xl font-bold text-title mb-6">{title}</h2>
      )}

      <div className={`bg-white rounded-md border border-border-light flex flex-col md:flex-row ${heightClass} min-h-125 overflow-hidden`}>
        {/* User List */}
        <div
          className={`${showUserList ? "flex" : "hidden md:flex"
            } flex-col w-full md:w-72 lg:w-80 border-r border-border-light`}
        >
          {/* Chat Label */}
          <div className="p-3 border-b border-border-light">
            <h3 className="text-base font-bold text-title mb-2">Chat</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-main"
              />
            </div>
          </div>

          {/* User List */}
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className={`w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-50 transition-colors text-left ${selectedUser.id === user.id ? "bg-blue-50" : ""
                  }`}
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                  {user.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-title truncate">{user.name}</h4>
                    <span className="text-xs text-description shrink-0 ml-2">{user.time}</span>
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

        {/* Chat Area */}
        <div className={`${showUserList ? "hidden md:flex" : "flex"} flex-col flex-1`}>
          {/* Chat Header */}
          <div className="p-3 sm:p-4 border-b border-border-light flex items-center gap-3">
            <button
              onClick={() => setShowUserList(true)}
              className="md:hidden p-1 text-description hover:text-title"
            >
              ←
            </button>
            <div className="relative size-12 rounded-full overflow-hidden shrink-0">
              <Image src={selectedUser.avatar} alt={selectedUser.name} fill className="object-cover" />
            </div>
            <div>
              <h4 className="text-base font-bold text-title">{selectedUser.name}</h4>
              <p className="text-xs text-description">{t("activeNow")}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-center">
              <span className="text-xs text-description bg-gray-100 px-3 py-2 rounded-md">{t("today")}</span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-end gap-2 max-w-[80%] sm:max-w-[70%] ${msg.isOwn ? "flex-row-reverse" : ""}`}>
                  {!msg.isOwn && (
                    <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0">
                      <Image src={selectedUser.avatar} alt={selectedUser.name} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    {!msg.isOwn && (
                      <p className="text-[10px] text-description mb-1 ml-1">{selectedUser.name}</p>
                    )}
                    <div
                      className={`px-3 py-2 rounded-xl text-sm ${msg.isOwn ? "bg-main text-white rounded-br-none" : "bg-gray-100 text-title rounded-bl-none"
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
            className="p-3 sm:p-4 border-t border-border-light flex items-center gap-2 sm:gap-3"
          >
            <input
              {...register("message")}
              placeholder={t("typePlaceholder")}
              className="flex-1 bg-gray-50 rounded-lg px-4 py-3 border border-border-light text-sm focus:outline-none focus:ring-1 focus:ring-main"
              autoComplete="off"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-main text-white rounded-lg text-sm font-semibold hover:bg-main/90 transition-colors flex items-center gap-1.5 shrink-0"
            >
              {t("send")}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
