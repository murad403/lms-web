/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Send, ArrowLeft, Wifi, WifiOff } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useGetConversationsQuery, useGetMessagesQuery, useSendMessageMutation, getConversationWebSocketUrl} from "@/redux/features/message/message.api";
import { TMessage } from "@/redux/features/message/message.type";
import { useWebSocket } from "@/hooks/useWebSocket";
import { resolveImageUrl } from "@/utils/image";
import { getClientSession } from "@/utils/auth-client";

type MessageForm = {
  message: string;
};

type ChatBoxProps = {
  title?: string;
  heightClass?: string;
  isShowTitle: boolean;
};

/**
 * Decode JWT token to extract user ID
 * Supports common JWT user ID fields: sub, user_id, id
 */
const getUserIdFromToken = (): string | undefined => {
  try {
    const session = getClientSession();
    if (!session.accessToken) return undefined;

    // JWT format: header.payload.signature
    const parts = session.accessToken.split(".");
    if (parts.length !== 3) return undefined;

    // Decode payload (add padding if needed)
    const payload = parts[1];
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decoded = JSON.parse(atob(padded));

    // Try common user ID fields in order
    return decoded.sub || decoded.user_id || decoded.id || undefined;
  } catch (err) {
    console.error("Failed to decode JWT token:", err);
    return undefined;
  }
};

const ChatBox = ({
  title,
  heightClass = "h-[calc(100vh-200px)] md:h-[calc(100vh-320px)]",
  isShowTitle,
}: ChatBoxProps) => {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserList, setShowUserList] = useState(true);
  const [localMessages, setLocalMessages] = useState<TMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const t = useTranslations("MessagesPage");

  // ✅ Get current user ID from JWT token in cookies
  const currentUserId = getUserIdFromToken();

  // Fetch conversations
  const { data: conversationsResponse, isLoading: isConversationsLoading } =
    useGetConversationsQuery();
  const conversations = conversationsResponse?.data || [];

  // Auto-select first conversation
  useEffect(() => {
    if (conversations.length > 0 && selectedConversationId === null) {
      setSelectedConversationId(conversations[0].id);
    }
  }, [conversations, selectedConversationId]);

  // Fetch messages for selected conversation
  const { data: messagesResponse, isLoading: isMessagesLoading } = useGetMessagesQuery(
    selectedConversationId!,
    { skip: !selectedConversationId }
  );

  // Sync API messages into local state
  useEffect(() => {
    if (messagesResponse?.data) {
      setLocalMessages(messagesResponse.data);
    }
  }, [messagesResponse?.data]);

  // WebSocket for real-time messages
  const wsUrl = selectedConversationId
    ? getConversationWebSocketUrl(selectedConversationId)
    : null;

  const { isConnected: isWsConnected, sendMessage: sendWsMessage } = useWebSocket(wsUrl, {
    onMessage: (data) => {
      if (data.type === "message") {
        const newMessage: TMessage = {
          id: data.id,
          conversation: selectedConversationId!,
          sender: data.sender,
          sender_name: data.sender_name,
          body: data.body,
          status: data.status || "sent",
          is_read: data.is_read || false,
          created_at: data.created_at || new Date().toISOString(),
        };
        setLocalMessages((prev) => {
          const exists = prev.some((msg) => msg.id === newMessage.id);
          return exists ? prev : [...prev, newMessage];
        });
      } else if (data.type === "message_read") {
        setLocalMessages((prev) =>
          prev.map((msg) =>
            msg.id === data.message_id ? { ...msg, is_read: true } : msg
          )
        );
      }
    },
    onError: (error) => {
      console.error("WebSocket error:", error);
    },
  });

  const [sendMessageMutation] = useSendMessageMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  // Get the other participant in the conversation (not current user)
  const getOtherParticipant = (convId: number | null) => {
    const conv = conversations.find((c) => c.id === convId);
    if (!conv) return null;
    return conv.participants.find((p) => p.id !== currentUserId) ?? conv.participants[0];
  };

  const filteredConversations = conversations.filter((conv) => {
    const other = conv.participants.find((p) => p.id !== currentUserId) ?? conv.participants[0];
    return other?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Send message via WebSocket when connected, or REST API as fallback
  const onSubmit = async (data: MessageForm) => {
    if (!data.message?.trim() || !selectedConversationId) return;

    if (isWsConnected) {
      sendWsMessage({ type: "message", body: data.message });
    } else {
      try {
        await sendMessageMutation({
          conversationId: selectedConversationId,
          body: data.message,
        }).unwrap();
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }

    reset();
  };

  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversationId(conversationId);
    setShowUserList(false);
  };

  const otherParticipant = getOtherParticipant(selectedConversationId);
  const messages = localMessages;

  return (
    <div>
      {isShowTitle && title && (
        <h2 className="text-lg sm:text-xl font-bold text-title mb-4 sm:mb-6">{title}</h2>
      )}

      <div
        className={`bg-white rounded-md border border-border-light flex overflow-hidden ${heightClass} min-h-125`}
      >
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

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {isConversationsLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-description">{t("loading")}</p>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-description">{t("noConversations")}</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => {
                const participant =
                  conversation.participants.find((p) => p.id !== currentUserId) ??
                  conversation.participants[0];
                const isSelected = selectedConversationId === conversation.id;
                return (
                  <button
                    key={conversation.id}
                    onClick={() => handleConversationSelect(conversation.id)}
                    className={`w-full flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left border-b border-border-light last:border-0 ${
                      isSelected ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-full">
                      <Image
                        src={resolveImageUrl(participant.avatar)}
                        alt={participant.name}
                        fill
                        className="object-cover rounded-full"
                      />
                      <span className="absolute z-10 bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-title truncate">
                          {participant.name}
                        </h4>
                        <span className="text-[11px] text-description shrink-0">
                          {new Date(conversation.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-description truncate mt-0.5">
                        {conversation.last_message || t("noMessages")}
                      </p>
                    </div>
                    {conversation.unread_count > 0 && (
                      <span className="w-5 h-5 bg-main text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                        {conversation.unread_count}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ── Chat Panel ── */}
        <div className={`flex-col flex-1 min-w-0 ${showUserList ? "hidden md:flex" : "flex"}`}>
          {/* Chat Header */}
          <div className="px-3 sm:px-4 py-3 border-b border-border-light flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setShowUserList(true)}
              className="md:hidden p-1.5 -ml-1 rounded-md text-description hover:text-title hover:bg-gray-100 transition-colors"
              aria-label="Back to chats"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {otherParticipant ? (
              <>
                <div className="relative shrink-0">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden">
                    <Image
                      src={resolveImageUrl(otherParticipant.avatar)}
                      alt={otherParticipant.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm sm:text-base font-bold text-title truncate">
                    {otherParticipant.name}
                  </h4>
                  <p className="text-xs text-green-500 font-medium">{t("activeNow")}</p>
                </div>
              </>
            ) : (
              <p className="text-sm text-description">{t("selectConversation")}</p>
            )}

            <div className="flex items-center gap-1.5 ml-auto">
              {isWsConnected ? (
                <>
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-500 hidden sm:inline">{t("connected")}</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-red-500 hidden sm:inline">{t("disconnected")}</span>
                </>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-3 sm:space-y-4">
            {isMessagesLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-description">{t("loadingMessages")}</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center">
                <p className="text-xs text-description bg-gray-100 px-3 py-1.5 rounded-full inline-block">
                  {t("today")}
                </p>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <span className="text-xs text-description bg-gray-100 px-3 py-1.5 rounded-full">
                    {t("today")}
                  </span>
                </div>

                {messages.map((msg) => {
                  const isOwn = msg.sender === currentUserId;
                  const senderName = msg.sender_name;
                  const messageTime = new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`flex items-end gap-1.5 sm:gap-2 max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${
                          isOwn ? "flex-row-reverse" : ""
                        }`}
                      >
                        {!isOwn && (
                          <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full mb-4">
                            <Image
                              src={resolveImageUrl(otherParticipant?.avatar)}
                              alt={senderName}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          {!isOwn && (
                            <p className="text-[10px] text-description mb-1 ml-1">{senderName}</p>
                          )}
                          <div
                            className={`px-3 py-2 rounded-2xl text-sm leading-relaxed wrap-break-word ${
                              isOwn
                                ? "bg-main text-white rounded-br-sm"
                                : "bg-gray-100 text-title rounded-bl-sm"
                            }`}
                          >
                            {msg.body}
                          </div>
                          <p
                            className={`text-[10px] text-description mt-1 ${
                              isOwn ? "text-right mr-1" : "ml-1"
                            }`}
                          >
                            {messageTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
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
              disabled={!selectedConversationId || isMessagesLoading}
              className="flex-1 min-w-0 bg-gray-50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-border-light text-sm focus:outline-none focus:ring-1 focus:ring-main disabled:opacity-50 disabled:cursor-not-allowed"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!selectedConversationId}
              className="px-3 sm:px-4 py-2.5 sm:py-3 bg-main text-white rounded-xl text-sm font-semibold hover:bg-main/90 active:bg-main/80 transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
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