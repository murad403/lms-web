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



export type InstructorEarningsWithdrawalItem = {
	id: number;
	withdraw_id: string;
	user_name: string;
	bank_name: string | null;
	bank_last4: string | null;
	amount: string;
	status: string;
	requested_at: string;
};

export type InstructorMonthlyRevenueChartItem = {
	label: string;
	amount: string;
};

export type InstructorEarningsData = {
	total_revenue: string;
	total_withdrawals: string;
	today_revenue: string;
	current_balance: string;
	withdrawals: InstructorEarningsWithdrawalItem[];
	monthly_revenue_chart: InstructorMonthlyRevenueChartItem[];
};

export type InstructorEarningsResponse = ApiResponse<InstructorEarningsData>;

export type InstructorStripeConnectData = {
	stripe_account_id: string;
	onboarding_url: string;
	charges_enabled: boolean;
	payouts_enabled: boolean;
	details_submitted: boolean;
};

export type InstructorStripeConnectResponse = ApiResponse<InstructorStripeConnectData>;

export type InstructorStripeDashboardResponse = ApiResponse<{
	url: string;
}>;

export type InstructorWithdrawRequestPayload = {
	amount: number;
};

export type InstructorWithdrawRequestResponse = ApiResponse<{
	withdraw_id: string;
	amount: string;
	status: string;
}>;

export type InstructorCancelWithdrawResponse = ApiResponse<{
	withdraw_id: string;
	status: string;
}>;

export type InstructorSignatureData = {
	id: string;
	name: string;
	email: string;
	signature: string;
};

export type InstructorSignatureResponse = ApiResponse<InstructorSignatureData>;

export type InstructorUploadSignatureMessage = {
	message: string;
	id: string;
};

export type InstructorUploadSignatureResponse = {
	success: boolean;
	status: number;
	message: InstructorUploadSignatureMessage;
};

// Course Accreditation Types
export type CourseAccreditationStats = {
	approved_courses: number;
	published_courses: number;
	pending_review_courses: number;
	certificates_issued: number;
	ratings_people: number;
};

export type CourseAccreditationCourse = {
	id: number;
	title: string;
	subtitle: string;
	category: number;
	topic: string;
	language: string;
	level: "beginner" | "intermediate" | "advanced";
	price: string;
	discount_price: string;
	rating: number;
	coupon_code: string;
	expiry_type: string;
	status: "draft" | "published" | "accepted" | "pending" | "rejected";
	created_at: string;
};

export type CourseAccreditationData = {
	stats: CourseAccreditationStats;
	total: number;
	page: number;
	page_size: number;
	total_pages: number;
	next: string | null;
	previous: string | null;
	results: CourseAccreditationCourse[];
};

export type CourseAccreditationResponse = ApiResponse<CourseAccreditationData>;

// My Courses Types
export type MyCourseInstructor = {
	id: string;
	name: string;
	email: string;
	phone: string;
	get_biography: string | null;
	avatar: string | null;
};

export type MyCourseAdvanceInfo = {
	id: number;
	thumbnail: string | null;
	trailer_video: string | null;
	description: string;
};

export type MyCourseItem = {
	id: number;
	title: string;
	subtitle: string;
	Category: string;
	topic: string;
	language: string;
	description: string;
	level: "beginner" | "intermediate" | "advanced";
	price: string;
	rating: number;
	discount_price: string;
	coupon_code: string;
	status: string;
	reviews_count: number;
	instructor: MyCourseInstructor;
	advance_info: MyCourseAdvanceInfo;
};

export type MyCoursesQueryParams = {
	page?: number;
	page_size?: number;
	search?: string;
	category?: string | number;
};

export type MyCoursesResponse = {
	success: boolean;
	status: number;
	message: string;
	total: number;
	page: number;
	page_size: number;
	total_pages: number;
	next: string | null;
	previous: string | null;
	data: MyCourseItem[];
};

// Certificate Types
export type CertificateListCourse = {
	id: number;
	certificated_id: string;
	title: string;
	subtitle: string;
	category: number;
	topic: string;
	language: string;
	status: string;
	created_at: string;
};

export type CertificateListData = {
	total: number;
	page: number;
	page_size: number;
	total_pages: number;
	next: string | null;
	previous: string | null;
	data: CertificateListCourse[];
};

export type CertificateListResponse = {
	success: boolean;
	status: number;
	message: string;
	total: number;
	page: number;
	page_size: number;
	total_pages: number;
	next: string | null;
	previous: string | null;
	data: CertificateListCourse[];
};

// Owner Course Details Types
export type OwnerCourseDetailsCategory = {
	id: number;
	name: string;
	slug: string;
	description: string;
	created_at: string;
	updated_at: string;
};

export type OwnerCourseDetailsInstructor = {
	id: string;
	name: string;
	email: string;
	phone: string;
	get_biography: string;
	avatar: string | null;
};

export type OwnerCourseDetailsHero = {
	thumbnail: string | null;
	published_at: string;
	last_updated_at: string;
	created_by: string;
	title: string;
	subtitle: string;
	course_price: number;
	total_revenue: number;
	overall_rating: number;
	reviews_count: number;
};

export type OwnerCourseDetailsCard = {
	label: string;
	value: number | string;
	sub_label: string;
};

export type ChartTrendData = {
	labels: string[];
	values: number[];
};

export type RatingBreakdownItem = {
	stars: number;
	count: number;
	percentage: number;
};

export type OwnerCourseDetailsRatingChart = {
	overall_rating: number;
	reviews_count: number;
	trend: ChartTrendData;
	breakdown: RatingBreakdownItem[];
};

export type OwnerCourseDetailsRevenueChart = {
	labels: string[];
	values: number[];
};

export type OwnerCourseDetailsCourseOverviewChart = {
	labels: string[];
	enrollments: number[];
	completions: number[];
};

export type OwnerCourseDetailsDashboard = {
	hero: OwnerCourseDetailsHero;
	cards: OwnerCourseDetailsCard[];
	rating_chart: OwnerCourseDetailsRatingChart;
	revenue_chart: OwnerCourseDetailsRevenueChart;
	course_overview_chart: OwnerCourseDetailsCourseOverviewChart;
};

export type OwnerCourseDetailsData = {
	id: number;
	title: string;
	subtitle: string;
	category: OwnerCourseDetailsCategory;
	topic: string;
	language: string;
	level: "beginner" | "intermediate" | "advanced";
	price: string;
	discount_price: string;
	rating: number;
	coupon_code: string;
	expiry_type: string;
	status: string;
	created_at: string;
	instructor: OwnerCourseDetailsInstructor;
	dashboard: OwnerCourseDetailsDashboard;
};

export type OwnerCourseDetailsResponse = ApiResponse<OwnerCourseDetailsData>;

// Instructor Organizations Types
export type InstructorOrganization = {
    membership_id: number;
    organization_id: number;
    organization_name: string;
    organization_photo: string | null;
    banner: string | null;
    role: string;
    status: string;
    joined_at: string;
};

export type InstructorOrganizationResponse = {
    success: boolean;
    status: number;
    message: string;
    data: InstructorOrganization[];
};
