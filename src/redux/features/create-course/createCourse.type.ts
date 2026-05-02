import { ApiResponse } from "@/redux/features/instructor/instructor.type";

// Basic Course Info Types
export type BasicCourseInfoPayload = {
	title: string;
	subtitle?: string;
	category: number;
	topic?: string;
	language: "en" | "es" | "fr" | "de" | "zh";
	level: "beginner" | "intermediate" | "advanced";
	price?: number;
	discount_price?: number;
	coupon_code?: string;
	expiry_type?: "1_week" | "1_month" | "3_months" | "lifetime" | "limited";
};

export type BasicCourseInfoData = BasicCourseInfoPayload & {
	id: number;
	status?: string;
};

export type BasicCourseInfoResponse = ApiResponse<BasicCourseInfoData>;

// Advanced Course Info Types
export type AdvanceCourseInfoItem = {
	text: string;
	order: number;
};

export type AdvanceCourseInfoData = {
	id: number;
	description: string;
	outcomes: AdvanceCourseInfoItem[];
	requirements: AdvanceCourseInfoItem[];
	thumbnail?: string;
	trailer_video?: string;
};

export type AdvanceCourseInfoResponse = ApiResponse<AdvanceCourseInfoData>;

// Course Overview Types
export type CourseOverviewData = {
	id: number;
	title: string;
	description: string;
	thumbnail: string | null;
	thumbnail_video: string | null;
	category_name: string;
	language: string;
	level: "beginner" | "intermediate" | "advanced";
	price: string;
	discount_price: string;
};

export type CourseOverviewResponse = {
	success: boolean;
	message: string;
	data: CourseOverviewData;
};

// Section Types
export type SectionPayload = {
	name: string;
};

export type SectionItem = {
	id: number;
	name: string;
	order: number;
	quizze_id?: number;
	quizz_title?: string;
	lectures: LectureItem[];
};

export type SectionResponse = ApiResponse<SectionItem>;

// Lecture Types
export type LectureItem = {
	id: number;
	name: string;
	order: number;
	description?: string;
	video_file?: string;
	LectureAttachment?: string;
	LectureNoteFile?: string;
	lecture_notes?: string;
};

export type LectureResponse = ApiResponse<LectureItem>;

// Quiz Types
export type QuizOptionPayload = {
	text: string;
	is_correct: boolean;
	order?: number;
};

export type QuizQuestionPayload = {
	question_type: "mcq" | "true_false";
	text: string;
	order?: number;
	options: QuizOptionPayload[];
};

export type QuizPayload = {
	title: string;
	description: string;
	time_limit_minutes: number;
	attempts_allowed: number;
	passing_score: number;
	shuffle_questions: boolean;
	questions: QuizQuestionPayload[];
};

// Quiz Update Payload (same shape as QuizPayload)
export type QuizUpdatePayload = QuizPayload;

export type QuizOptionItem = {
	id: number;
	text: string;
	is_correct: boolean;
	order: number;
};

export type QuizQuestionItem = {
	id: number;
	question_type: "mcq" | "true_false";
	text: string;
	order: number;
	options: QuizOptionItem[];
};

export type QuizItem = {
	id: number;
	title: string;
	description: string;
	time_limit_minutes: number;
	attempts_allowed: number;
	passing_score: number;
	shuffle_questions: boolean;
	questions: QuizQuestionItem[];
};

export type QuizResponse = ApiResponse<QuizItem>;

// Publish Course Types
export type PublishCourseResponse = ApiResponse<{
	id: number;
	status: string;
}>;