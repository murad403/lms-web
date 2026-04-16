export type ApiResponse<T> = {
    success: boolean;
    status: number;
    message: string;
    data: T;
};

export type StudentDashboardCourse = {
    id: number;
    title: string;
    subtitle: string;
    thumbnail: string;
    price: string;
    course_progress: number;
};

export type StudentDashboardInvoice = {
    id: number;
    name: string;
    invoice_id: string;
    payment_method: string;
    amount: string;
    status: string;
    invoice_date: string;
    created_at: string;
};

export type StudentDashboardQuiz = {
    id: number;
    quiz_title: string;
    score_percentage: number;
    submitted_at: string;
};

export type StudentDashboardData = {
    enrolled_courses_count: number;
    active_courses_count: number;
    completed_courses_count: number;
    recently_enrolled: StudentDashboardCourse[];
    recent_invoices: StudentDashboardInvoice[];
    recent_quizes: StudentDashboardQuiz[];
};

export type StudentProfileData = {
    id: string;
    title: string;
    date_of_birth: string;
    gender: string;
    bio: string;
    first_name: string;
    last_name: string;
    age: number;
    user: {
        id: string;
        name: string;
        email: string;
        phone: string;
        avatar: string;
    };
    created_at?: string;
};

export type UpdateStudentProfilePayload = {
    first_name: string;
    last_name: string;
    title: string;
    bio: string;
    avatar?: File;
};

export type EnrolledCourse = {
    id: number;
    course: number;
    course_title: string;
    category: string;
    course_thumbnail: string;
    instructor_profile: string | null;
    course_price: string;
    ratings: string;
    instructor: string;
    is_active: boolean;
    is_completed: boolean;
    is_started: boolean;
    enrolled_at: string;
    total_lectures: number;
    completed_lectures: number;
    progress_percentage: number;
};

export type EnrolledCoursesResponse = ApiResponse<EnrolledCourse[]> & {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    next: string | null;
    previous: string | null;
};

export type LiveClassItem = {
    id: number;
    title: string;
    topic: string;
    instructor: string;
    instructor_name: string;
    course: number;
    course_title: string;
    scheduled_date: string;
    scheduled_time: string;
    duration_minutes: number;
    platform: string;
    class_link: string;
    is_recorded: boolean;
    recording_link: string | null;
    status: "Attended" | "Missed" | string;
    created_at: string;
};

export type LiveClassesData = {
    upcoming_live_classes: LiveClassItem[];
    past_live_classes: LiveClassItem[];
};

export type LiveClassesResponse = ApiResponse<LiveClassesData>;

export type JoinLiveClassResponse = ApiResponse<{
    class_link: string;
}>;

export type StudentReviewItem = {
    id: number;
    course: number;
    course_title: string;
    user: string;
    student_name: string;
    rating: number;
    comment: string;
    avatar: string;
    created_at: string;
    updated_at: string;
};

export type StudentReviewListResponse = ApiResponse<StudentReviewItem[]> & {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    next: string | null;
    previous: string | null;
};

export type UpdateReviewPayload = {
    id: number;
    rating: number;
    comment: string;
};

export type StudentPurchaseHistoryItem = {
    id: number;
    course: number;
    instructor: string;
    course_title: string;
    course_price: string;
    course_thumbnail: string;
    enrolled_at: string;
};

export type StudentPurchaseHistoryResponse = ApiResponse<StudentPurchaseHistoryItem[]> & {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    next: string | null;
    previous: string | null;
};

export type AddWishlistData = {
    course_id: number;
    course_title: string;
};

export type AddWishlistResponse = ApiResponse<AddWishlistData>;

export type WishlistItem = {
    id: number;
    course_id: number;
    course_title: string;
    original_price: string;
    thumbnail: string | null;
    rating: string;
    instructor: string;
    reviews_count: number;
    added_at: string;
};

export type WishlistData = {
    id: number;
    total_items: number;
    items: WishlistItem[];
    created_at: string;
};

export type ViewWishlistResponse = ApiResponse<WishlistData>;

export type RemoveWishlistResponse = ApiResponse<Record<string, never>>;