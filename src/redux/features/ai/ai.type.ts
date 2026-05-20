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

export type CourseSummaryItem = {
    lectures: string[];
    quizzes: string[];
};

export type CourseForAiItem = {
    id: number;
    title: string;
    subtitle: string;
    instructor_name: string;
    organization_name: string;
    quizzes: number;
    quiz_count: number;
    summary: CourseSummaryItem;
};

export type CourseListForAiResponse = ApiResponse<CourseForAiItem[]>;

export type AiCourseStructurePayload = {
    course_id: number;
};

export type AiCourseStructureResponse = ApiResponse<{
    course_id: number;
    response: string;
}>;

export type AiLessonDraftPayload = {
    course_id: number;
    lecture_name: string;
};

export type AiLessonDraftResponse = ApiResponse<{
    course_id: number;
    lecture_name: string;
    response: string;
}>;

export type AiQuizQuestionPayload = {
    course_id: number;
    topic: string;
};

export type AiQuizQuestionResponse = ApiResponse<{
    course_id: number;
    topic: string;
    num_questions: number;
    response: string;
}>;

export type AiImproveContentPayload = {
    course_id: number;
    content_to_improve: string;
    improvement_goal: string;
};

export type AiImproveContentResponse = ApiResponse<{
    course_id: number;
    response: string;
}>;

export type AiLearningObjectivesPayload = {
    course_id: number;
};

export type AiLearningObjectivesResponse = ApiResponse<{
    course_id: number;
    section_name: string;
    response: string;
}>;
