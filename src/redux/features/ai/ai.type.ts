import { ApiResponse } from "../student/student.type";

export type SendMessageToAiPayload = {
    course_id: number;
    user_message: string;
};

export type SendMessageToAiResponse = ApiResponse<{
    course_id: number;
    conversation_id: number;
    assistant_message_id: number;
    response: string;
}>;

export type AiConversationItem = {
    id: number;
    conversation: number;
    sender: string;
    sender_name: string;
    body: string;
    status: string;
    is_read: boolean;
    created_at: string;
};

export type AiConversationListResponse = ApiResponse<AiConversationItem[]>;
