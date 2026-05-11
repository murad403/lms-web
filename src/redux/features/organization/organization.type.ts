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

export type OrganizationCourseInstructor = {
    id: string;
    name: string;
    email: string;
    phone: string;
    get_biography: string | null;
    avatar: string | null;
};

export type OrganizationCourseAdvanceInfo = {
    id: number;
    thumbnail: string | null;
    trailer_video: string | null;
    description: string;
};

export type OrganizationCourseItem = {
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
    duration: string;
    discount_price: string;
    coupon_code: string;
    is_wishlisted: boolean;
    expiry_type: string;
    reviews_count: number;
    status: string;
    modules: number;
    lectures: number;
    quizes: number;
    instructor: OrganizationCourseInstructor;
    advance_info: OrganizationCourseAdvanceInfo;
};

export type OrganizationCoursesQueryParams = {
    page?: number;
    page_size?: number;
    search?: string;
    category?: number;
};

export type OrganizationCoursesResponse = {
    success: boolean;
    status: number;
    message: string;
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    next: string | null;
    previous: string | null;
    data: OrganizationCourseItem[];
};

export type OrganizationInstructorDashboardStats = {
    total_instructors: number;
    active_instructors: number;
    pending_invitations: number;
    total_courses: number;
};

export type OrganizationInstructorMembership = {
    id: number;
    organization_name: string;
    user: string;
    user_name: string;
    user_email: string;
    user_avatar: string | null;
    role: string;
    status: string;
    last_login: string;
    joined_at: string;
};

export type OrganizationInstructorInvitationDashboardData = {
    stats: OrganizationInstructorDashboardStats;
    "memberships list": OrganizationInstructorMembership[];
};

export type OrganizationInstructorInvitationDashboardResponse = ApiResponse<OrganizationInstructorInvitationDashboardData>;

export type OrganizationInstructorInvitationDashboardQueryParams = {
    search?: string;
    status?: string;
};

export type InviteInstructorPayload = {
    email: string;
};

export type InviteInstructorResponse = ApiResponse<{
    id: number;
    organization: number;
    invited_by: string;
    email: string;
    role: string;
    token: string;
    status: string;
    created_at: string;
    expires_at: string;
}>;

export type AcceptInvitationPayload = {
    action: "accept" | "reject";
};

export type AcceptInvitationResponse = {
    success: boolean;
    status: number;
    message: string;
};
