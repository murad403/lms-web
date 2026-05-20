import baseApi from "@/redux/api/baseApi";
import { SendMessageToAiPayload, SendMessageToAiResponse, AiConversationListResponse } from "./ai.type";


const aiApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourseListForAi: builder.query({
            query: () => {
                return {
                    url: `/analytics/ai/courses/`,
                    method: "GET"
                }
            }
        }),
        sendMessageToAi: builder.mutation<SendMessageToAiResponse, SendMessageToAiPayload>({
            query: (data) => {
                return {
                    url: "/analytics/ai/chat/",
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["ai"]
        }),
        aiConversationList: builder.query<AiConversationListResponse, number>({
            query: (conversationId) => {
                return {
                    url: `/analytics/ai/chat/?conversation_id=${conversationId}`,
                    method: "GET"
                }
            },
            providesTags: ["ai"]
        }),
    }),
});



export const { 
    useSendMessageToAiMutation,
    useAiConversationListQuery,
} = aiApi;
