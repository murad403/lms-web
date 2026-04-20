export type ApiResponse<T> = {
	success: boolean;
	status: number;
	message: string;
	data: T;
};

export type InstructorRecentActivityItem = {
	id: number;
	student_name: string;
	course_title: string;
	message: string;
	created_at: string;
};

export type InstructorMonthlyRevenueItem = {
	label: string;
	amount: number;
};

export type InstructorRatingBreakdownItem = {
	stars: number;
	count: number;
	percentage: number;
};

export type InstructorCourseOverviewItem = {
	label: string;
	enrollments: number;
	completions: number;
};

export type InstructorDashboardData = {
	course_created: number;
	active_courses: number;
	students_enrolled: number;
	online_sessions: number;
	total_earning: number;
	average_rating: number;
	recent_activity: InstructorRecentActivityItem[];
	monthly_revenue_chart: InstructorMonthlyRevenueItem[];
	rating_breakdown: InstructorRatingBreakdownItem[];
	course_overview_chart: InstructorCourseOverviewItem[];
};

export type InstructorDashboardResponse = ApiResponse<InstructorDashboardData>;

export type InstructorProfileUser = {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar: string;
};

export type InstructorProfileData = {
	id: string;
	title: string;
	biography: string;
	website: string;
	twitter: string;
	linkedin: string;
	youtube: string;
	user: InstructorProfileUser;
	user_name?: string;
};

export type InstructorProfileResponse = ApiResponse<InstructorProfileData>;

export type InstructorCategoryItem = {
	id: number;
	name: string;
	slug: string;
	description: string;
};

export type InstructorCategoryResponse = ApiResponse<InstructorCategoryItem[]>;

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

export type UpdateInstructorProfilePayload = {
	title: string;
	biography: string;
	user: {
		name: string;
		phone: string;
		avatar?: File | string | null;
	};
};

export type InstructorLiveClassSession = {
	id: number;
	title: string;
	instructor: string;
	instructor_name: string;
	course: number;
	course_title: string;
	topic: string;
	scheduled_date: string;
	scheduled_time: string;
	platform: string;
	class_link: string;
	is_recorded: boolean;
	created_at: string;
	is_present: boolean;
};

export type InstructorLiveClassesStatsData = {
	total_live_classes: number;
	upcoming_live_classes_count: number;
	students_enrolled: number;
	upcoming_sessions: InstructorLiveClassSession[];
	past_sessions: InstructorLiveClassSession[];
};

export type InstructorLiveClassesStatsResponse = ApiResponse<InstructorLiveClassesStatsData>;

export type CourseInfoItem = {
	id: number;
	title: string;
	subtitle: string;
};

export type CourseInfoResponse = ApiResponse<CourseInfoItem[]>;

export type CreateLiveClassPayload = {
	title: string;
	topic: string;
	scheduled_date: string;
	scheduled_time: string;
	duration_minutes: number;
	platform: string;
	class_link: string;
	is_recorded: boolean;
};

export type CreateLiveClassRequest = {
	courseId: number;
	data: CreateLiveClassPayload;
};

export type CreateLiveClassResponse = ApiResponse<InstructorLiveClassSession>;

export type SectionItem = {
	id: number;
	name: string;
	order: number;
	lectures: LectureItem[];
};

export type SectionPayload = {
	name: string;
};

export type SectionResponse = ApiResponse<SectionItem>;

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

export type QuizOptionPayload = {
	text: string;
	is_correct: boolean;
};

export type QuizQuestionPayload = {
	question_type: "mcq" | "true_false";
	text: string;
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

export type PublishCourseResponse = ApiResponse<{
	id: number;
	status: string;
}>;
