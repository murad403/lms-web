import baseApi from "@/redux/api/baseApi";
import { TGetConversationsResponse, TGetMessagesResponse, TSendMessageResponse } from "./message.type";
import { getCookie } from "@/utils/auth-client";
import { ACCESS_TOKEN_COOKIE } from "@/utils/auth-shared";

const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query<TGetConversationsResponse, void>({
            query: () => ({
                url: "/messaging/conversations/",
                method: "GET",
            }),
            providesTags: ["message"],
        }),

        getMessages: builder.query<TGetMessagesResponse, number>({
            query: (conversationId) => ({
                url: `/messaging/conversations/${conversationId}/messages/`,
                method: "GET",
            }),
            providesTags: ["message"],
        }),

        sendMessage: builder.mutation<
            TSendMessageResponse,
            { conversationId: number; body: string }
        >({
            query: ({ conversationId, body }) => ({
                url: `/messaging/conversations/${conversationId}/messages/`,
                method: "POST",
                body: { body },
            }),
            invalidatesTags: ["message"],
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetMessagesQuery,
    useSendMessageMutation,
} = messageApi;

export const getConversationWebSocketUrl = (
    conversationId: number
): string | null => {
    if (!conversationId) return null;

    const authToken = getCookie(ACCESS_TOKEN_COOKIE);

    if (!authToken) {
        console.warn("No access token found in cookies for WebSocket connection");
        return null;
    }

    return `wss://rs0hfx59-8002.asse.devtunnels.ms/ws/messaging/conversations/${conversationId}/?token=${authToken}`;
};