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
