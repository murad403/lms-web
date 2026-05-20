import baseApi from "@/redux/api/baseApi";
import { SendMessageToAiPayload, SendMessageToAiResponse, AiConversationListResponse, CourseListForAiResponse, AiCourseStructureResponse, AiCourseStructurePayload, AiLessonDraftResponse, AiLessonDraftPayload, AiQuizQuestionResponse, AiQuizQuestionPayload, AiImproveContentResponse, AiImproveContentPayload, AiLearningObjectivesResponse, AiLearningObjectivesPayload } from "./ai.type";


const aiApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourseListForAi: builder.query<CourseListForAiResponse, any>({
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
        aiCourseStructure: builder.mutation<AiCourseStructureResponse, AiCourseStructurePayload>({
            query: (data) => {
                return {
                    url: `/analytics/ai/course-structure/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["ai"]
        }),
        aiLessonDraft: builder.mutation<AiLessonDraftResponse, AiLessonDraftPayload>({
            query: (data) => {
                return {
                    url: `/analytics/ai/lesson-draft/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["ai"]
        }),
        aiQuizQuestion: builder.mutation<AiQuizQuestionResponse, AiQuizQuestionPayload>({
            query: (data) => {
                return {
                    url: `/analytics/ai/quiz-questions/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["ai"]
        }),
        aiImproveContent: builder.mutation<AiImproveContentResponse, AiImproveContentPayload>({
            query: (data) => {
                return {
                    url: `/analytics/ai/improve-content/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["ai"]
        }),
        aiLearningObjectives: builder.mutation<AiLearningObjectivesResponse, AiLearningObjectivesPayload>({
            query: (data) => {
                return {
                    url: `/analytics/ai/learning-objectives/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["ai"]
        }),
    }),
});



export const {
    useSendMessageToAiMutation,
    useAiConversationListQuery,
    useGetCourseListForAiQuery,
    useAiCourseStructureMutation,
    useAiLessonDraftMutation,
    useAiQuizQuestionMutation,
    useAiImproveContentMutation,
    useAiLearningObjectivesMutation,
} = aiApi;
