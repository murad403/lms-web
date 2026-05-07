export type ApiResponse<T> = {
    success: boolean;
    status: number;
    message: string;
    data: T;
};

export type OrganizationRecentActivityItem = {
    id: number;
    student_name: string;
    course_title: string;
    message: string;
    created_at: string;
};

export type OrganizationMonthlyRevenueItem = {
    label: string;
    amount: number;
};

export type OrganizationRatingBreakdownItem = {
    stars: number;
    count: number;
    percentage: number;
};

export type OrganizationCourseOverviewItem = {
    label: string;
    enrollments: number;
    completions: number;
};

export type OrganizationDashboardData = {
    course_created: number;
    active_courses: number;
    students_enrolled: number;
    online_sessions: number;
    total_earning: number;
    average_rating: number;
    recent_activity: OrganizationRecentActivityItem[];
    monthly_revenue_chart: OrganizationMonthlyRevenueItem[];
    rating_breakdown: OrganizationRatingBreakdownItem[];
    course_overview_chart: OrganizationCourseOverviewItem[];
};

export type OrganizationDashboardResponse = ApiResponse<OrganizationDashboardData>;
