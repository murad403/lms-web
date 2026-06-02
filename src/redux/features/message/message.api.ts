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

    const publicOrigin =
        process.env.NEXT_PUBLIC_BACKEND_PUBLIC_ORIGIN ||
        process.env.NEXT_PUBLIC_BASE_URL ||
        "https://rs0hfx59-8001.asse.devtunnels.ms";

    try {
        const url = new URL(publicOrigin);
        const wsProtocol = url.protocol === "https:" ? "wss:" : "ws:";
        return `${wsProtocol}//${url.host}/ws/messaging/conversations/${conversationId}/?token=${authToken}`;
    } catch {
        const host = publicOrigin.replace(/^https?:\/\//, "").split("/")[0];
        const wsProtocol = publicOrigin.startsWith("https:") ? "wss://" : "ws://";
        return `${wsProtocol}${host}/ws/messaging/conversations/${conversationId}/?token=${authToken}`;
    }
};