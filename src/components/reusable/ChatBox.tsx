/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, Send, ArrowLeft, Wifi, WifiOff } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useGetConversationsQuery, useGetMessagesQuery, useSendMessageMutation, getConversationWebSocketUrl } from "@/redux/features/message/message.api";
import { TMessage } from "@/redux/features/message/message.type";
import { useWebSocket } from "@/hooks/useWebSocket";
import { resolveImageUrl } from "@/utils/image";
import { getClientSession } from "@/utils/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

type MessageForm = {
  message: string;
};

type ChatBoxProps = {
  title?: string;
  heightClass?: string;
  isShowTitle: boolean;
};

const OPTIMISTIC_PREFIX = "opt_";

const getUserIdFromToken = (): string | undefined => {
  try {
    const session = getClientSession();
    if (!session.accessToken) return undefined;

    const parts = session.accessToken.split(".");
    if (parts.length !== 3) return undefined;

    const payload = parts[1];
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decoded = JSON.parse(atob(padded));

    const raw = decoded.sub ?? decoded.user_id ?? decoded.id;
    return raw !== undefined ? String(raw).toLowerCase() : undefined;
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    return undefined;
  }
};

const isSameUser = (
  a: string | number | undefined | null,
  b: string | undefined
): boolean => {
  if (!a || !b) return false;
  return String(a).toLowerCase() === String(b).toLowerCase();
};

const normalizeIncomingMessage = (
  data: any,
  selectedConversationId: number
): TMessage => {
  return {
    id: data.id,
    conversation: Number(data.conversation ?? selectedConversationId),
    sender: String(data.sender ?? data.sender_id ?? "").toLowerCase(),
    sender_name: data.sender_name ?? "",
    body: data.body,
    status: data.status ?? "sent",
    is_read: data.is_read ?? false,
    created_at: data.created_at ?? new Date().toISOString(),
  };
};

const ConversationsSkeleton = () => (
  <div className="space-y-1.5 px-3 sm:px-4 py-2">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="flex items-center gap-3 px-0 py-3 sm:py-3.5 border-b border-border-light last:border-0"
      >
        <Skeleton className="size-10 rounded-full shrink-0" />

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-14 shrink-0" />
          </div>
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
    ))}
  </div>
);

const MessagesSkeleton = () => (
  <div className="space-y-4 sm:space-y-5 px-3 sm:px-4 py-4">
    <div className="text-center">
      <Skeleton className="h-6 w-20 rounded-full mx-auto" />
    </div>

    {Array.from({ length: 5 }).map((_, index) => {
      const isOwn = index % 2 === 1;

      return (
        <div key={index} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
          <div
            className={`flex items-end gap-1.5 sm:gap-2 max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${isOwn ? "flex-row-reverse" : ""}`}
          >
            {!isOwn && <Skeleton className="size-7 rounded-full mb-4 shrink-0" />}

            <div className="space-y-1.5">
              {!isOwn && <Skeleton className="h-3 w-20 ml-1" />}

              <Skeleton
                className={`h-10 sm:h-11 rounded-2xl ${isOwn ? "w-44 sm:w-56" : "w-52 sm:w-64"}`}
              />

              <Skeleton className={`h-3 w-12 ${isOwn ? "ml-auto mr-1" : "ml-1"}`} />
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

const MessageHeaderSkeleton = () => (
  <div className="px-3 sm:px-4 py-3 border-b border-border-light flex items-center gap-2 sm:gap-3 shrink-0">
    <Skeleton className="w-5 h-5 rounded-md md:hidden shrink-0" />

    <div className="relative shrink-0">
      <Skeleton className="w-10 h-10 sm:w-11 sm:h-11 rounded-full" />
      <Skeleton className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white" />
    </div>

    <div className="min-w-0 flex-1 space-y-2">
      <Skeleton className="h-4 sm:h-5 w-28 sm:w-36" />
      <Skeleton className="h-3 w-20" />
    </div>

    <Skeleton className="h-4 w-16 ml-auto hidden sm:block" />
  </div>
);

const MessageComposerSkeleton = () => (
  <div className="px-3 sm:px-4 py-3 border-t border-border-light flex items-center gap-2 shrink-0">
    <Skeleton className="flex-1 min-w-0 h-11 sm:h-12 rounded-xl" />
    <Skeleton className="h-11 sm:h-12 w-24 sm:w-28 rounded-xl shrink-0" />
  </div>
);

const ChatBox = ({
  title,
  heightClass = "h-[calc(100vh-200px)] md:h-[calc(100vh-320px)]",
  isShowTitle,
}: ChatBoxProps) => {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserList, setShowUserList] = useState(true);
  const [localMessages, setLocalMessages] = useState<TMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const t = useTranslations("MessagesPage");

  const currentUserId = useMemo(() => getUserIdFromToken(), []);

  const { data: conversationsResponse, isLoading: isConversationsLoading } =
    useGetConversationsQuery();

  const conversations = useMemo(
    () => conversationsResponse?.data || [],
    [conversationsResponse?.data]
  );

  useEffect(() => {
    if (conversations.length > 0 && selectedConversationId === null) {
      setSelectedConversationId(conversations[0].id);
    }
  }, [conversations, selectedConversationId]);

  const { data: messagesResponse, isLoading: isMessagesLoading } =
    useGetMessagesQuery(selectedConversationId!, {
      skip: !selectedConversationId,
    });

  useEffect(() => {
    if (messagesResponse?.data) {
      setLocalMessages(messagesResponse.data);
    }
  }, [messagesResponse?.data]);

  const wsUrl = useMemo(() => {
    if (!selectedConversationId) return null;
    return getConversationWebSocketUrl(selectedConversationId);
  }, [selectedConversationId]);

  const { isConnected: isWsConnected, sendMessage: sendWsMessage } =
    useWebSocket(wsUrl, {
      onMessage: (data) => {
        // console.log("WS message:", data);

        if (!selectedConversationId) return;

        if (data.type === "message_read") {
          setLocalMessages((prev) =>
            prev.map((msg) =>
              String(msg.id) === String(data.message_id)
                ? { ...msg, is_read: true }
                : msg
            )
          );
          return;
        }

        if (data.type !== "message" && data.type !== "chat.message") {
          console.warn("Unhandled WS type:", data.type);
          return;
        }

        const incoming = normalizeIncomingMessage(data, selectedConversationId);

        setLocalMessages((prev) => {
          const alreadyExists = prev.some(
            (msg) => String(msg.id) === String(incoming.id)
          );

          if (alreadyExists) return prev;

          const optimisticIndex = prev.findIndex(
            (msg) =>
              String(msg.id).startsWith(OPTIMISTIC_PREFIX) &&
              msg.body === incoming.body &&
              msg.conversation === incoming.conversation
          );

          if (optimisticIndex !== -1) {
            const next = [...prev];

            next[optimisticIndex] = {
              ...incoming,
              sender: currentUserId ?? incoming.sender,
              sender_name: "You",
              status: "sent",
            };

            return next;
          }

          return [...prev, incoming];
        });
      },
      onOpen: () => console.log("WS connected"),
      onClose: () => console.log("WS disconnected"),
      onError: (error) => console.error("WS error:", error),
    });

  const [sendMessageMutation] = useSendMessageMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  const getOtherParticipant = (conversationId: number | null) => {
    const conversation = conversations.find((c) => c.id === conversationId);

    if (!conversation) return null;

    return (
      conversation.participants.find((p) => !isSameUser(p.id, currentUserId)) ??
      conversation.participants[0]
    );
  };

  const filteredConversations = conversations.filter((conversation) => {
    const otherParticipant =
      conversation.participants.find(
        (participant) => !isSameUser(participant.id, currentUserId)
      ) ?? conversation.participants[0];

    return otherParticipant?.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const onSubmit = async (data: MessageForm) => {
    const messageText = data.message?.trim();

    if (!messageText || !selectedConversationId) return;

    const optimisticId = `${OPTIMISTIC_PREFIX}${Date.now()}`;

    const optimisticMessage: TMessage = {
      id: optimisticId,
      conversation: selectedConversationId,
      sender: currentUserId ?? "",
      sender_name: "You",
      body: messageText,
      status: "pending",
      is_read: false,
      created_at: new Date().toISOString(),
    };

    setLocalMessages((prev) => [...prev, optimisticMessage]);
    reset();

    try {
      if (isWsConnected) {
        const sent = sendWsMessage({
          type: "message",
          conversation: selectedConversationId,
          body: messageText,
        });

        if (!sent) {
          throw new Error("WebSocket send failed");
        }

        return;
      }

      const response = await sendMessageMutation({
        conversationId: selectedConversationId,
        body: messageText,
      }).unwrap();

      if (response?.data) {
        setLocalMessages((prev) =>
          prev.map((msg) =>
            msg.id === optimisticId ? response.data : msg
          )
        );
      }
    } catch (error) {
      console.error("Message send failed:", error);

      setLocalMessages((prev) =>
        prev.map((msg) =>
          msg.id === optimisticId ? { ...msg, status: "failed" } : msg
        )
      );
    }
  };

  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversationId(conversationId);
    setShowUserList(false);
  };

  const otherParticipant = getOtherParticipant(selectedConversationId);

  return (
    <div>
      {isShowTitle && title && (
        <h2 className="text-lg sm:text-xl font-bold text-title mb-4 sm:mb-6">
          {title}
        </h2>
      )}

      <div
        className={`bg-white rounded-md border border-border-light flex overflow-hidden ${heightClass} min-h-125`}
      >
        <div
          className={`
            flex-col border-r border-border-light
            w-full md:w-72 lg:w-80 shrink-0
            ${showUserList ? "flex" : "hidden md:flex"}
          `}
        >
          <div className="p-3 sm:p-4 border-b border-border-light shrink-0">
            <h3 className="text-base font-bold text-title mb-2 sm:mb-3">
              Chat
            </h3>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-main"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isConversationsLoading ? (
              <ConversationsSkeleton />
            ) : filteredConversations.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-description">
                  {t("noConversations")}
                </p>
              </div>
            ) : (
              filteredConversations.map((conversation) => {
                const participant =
                  conversation.participants.find(
                    (p) => !isSameUser(p.id, currentUserId)
                  ) ?? conversation.participants[0];

                const isSelected = selectedConversationId === conversation.id;

                return (
                  <button
                    key={conversation.id}
                    onClick={() => handleConversationSelect(conversation.id)}
                    className={`w-full flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left border-b border-border-light last:border-0 ${isSelected ? "bg-blue-50" : ""
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
                          {new Date(
                            conversation.updated_at
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-xs text-description truncate mt-0.5">
                        {conversation.last_message || t("noMessages")}
                      </p>
                    </div>

                    {/* {conversation.unread_count > 0 && (
                      <span className="w-5 h-5 bg-main text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                        {conversation.unread_count}
                      </span>
                    )} */}
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div
          className={`flex-col flex-1 min-w-0 ${showUserList ? "hidden md:flex" : "flex"
            }`}
        >
          {isMessagesLoading ? (
            <MessageHeaderSkeleton />
          ) : (
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

                    <p className="text-xs text-green-500 font-medium">
                      {t("activeNow")}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-description">
                  {t("selectConversation")}
                </p>
              )}

              <div className="flex items-center gap-1.5 ml-auto">
                {isWsConnected ? (
                  <>
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-500 hidden sm:inline">
                      {t("connected")}
                    </span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-red-500 hidden sm:inline">
                      {t("disconnected")}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-3 sm:space-y-4">
            {isMessagesLoading ? (
              <MessagesSkeleton />
            ) : localMessages.length === 0 ? (
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

                {localMessages.map((msg) => {
                  const isOwn = isSameUser(msg.sender, currentUserId);

                  const messageTime = new Date(
                    msg.created_at
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div
                      key={String(msg.id)}
                      className={`flex ${isOwn ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div
                        className={`flex items-end gap-1.5 sm:gap-2 max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${isOwn ? "flex-row-reverse" : ""
                          }`}
                      >
                        {!isOwn && (
                          <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full mb-4">
                            <Image
                              src={resolveImageUrl(otherParticipant?.avatar)}
                              alt={msg.sender_name || "User"}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                        )}

                        <div>
                          {!isOwn && (
                            <p className="text-[10px] text-description mb-1 ml-1">
                              {msg.sender_name}
                            </p>
                          )}

                          <div
                            className={`px-3 py-2 rounded-2xl text-sm leading-relaxed wrap-break-word ${isOwn
                              ? "bg-main text-white rounded-br-sm"
                              : "bg-gray-100 text-title rounded-bl-sm"
                              }`}
                          >
                            {msg.body}
                          </div>

                          <p
                            className={`text-[10px] text-description mt-1 ${isOwn ? "text-right mr-1" : "ml-1"
                              }`}
                          >
                            {messageTime}
                            {isOwn && msg.status === "pending" && " · Sending"}
                            {isOwn && msg.status === "failed" && " · Failed"}
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

          {isMessagesLoading ? (
            <MessageComposerSkeleton />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;