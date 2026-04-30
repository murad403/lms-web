import baseApi from "@/redux/api/baseApi";
import { TGetConversationsResponse, TGetMessagesResponse } from "./message.type";
import { getCookie } from "@/utils/auth-client";
import { ACCESS_TOKEN_COOKIE } from "@/utils/auth-shared";

const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query<TGetConversationsResponse, void>({
            query: () => ({
                url: "/messaging/conversations/",
                method: "GET"
            }),
        }),
        getMessages: builder.query<TGetMessagesResponse, number>({
            query: (conversationId) => ({
                url: `/messaging/conversations/${conversationId}/messages/`,
                method: "GET"
            }),
        }),
        sendMessage: builder.mutation({
            query: ({ conversationId, body }: { conversationId: number; body: string }) => ({
                url: `/messaging/conversations/${conversationId}/messages/`,
                method: "POST",
                body: { body }
            }),
        }),
    }),
});

export const { useGetConversationsQuery, useGetMessagesQuery, useSendMessageMutation } = messageApi;

/**
 * Get WebSocket URL for a conversation with auth token from cookies
 * Format: ws://localhost:8002/ws/messaging/conversations/{conversationId}/?token={accessToken}
 */
export const getConversationWebSocketUrl = (conversationId: number): string | null => {
  if (!conversationId) return null;

  // Get access token from cookies (same way as baseApi.ts)
  const authToken = getCookie(ACCESS_TOKEN_COOKIE);

  if (!authToken) {
    console.warn("No access token found in cookies for WebSocket connection");
    return null;
  }

  // Use localhost:8002 as WebSocket server base URL
  const wsUrl = `https://rs0hfx59-8002.asse.devtunnels.ms/ws/messaging/conversations/${conversationId}/?token=${authToken}`;
  console.log("WebSocket URL:", wsUrl);
  
  return wsUrl;
};