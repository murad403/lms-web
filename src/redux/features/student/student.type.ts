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

export type LearningProgressCourseItem = {
    id: number;
    course: number;
    course_title: string;
    course_thumbnail: string;
    instructor: string;
    is_completed: boolean;
    section_count: number;
    lecture_count: number;
    completed_lecture_count: number;
    completion_percentage: number;
    enrolled_at: string;
};

export type LearningProgressResponse = ApiResponse<LearningProgressCourseItem[]> & {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    next: string | null;
    previous: string | null;
    average_completion_percentage: number;
    total_completed_courses: number;
    total_certificated_courses: number;
    total_completed_quizzes: number;
};

export type LessonTrackingItem = {
    id: number;
    course_id: number;
    course_name: string;
    model_name: string;
    lesson_name: string;
    is_completed: boolean;
    completed_at: string | null;
};

export type LessonTrackingResponse = ApiResponse<LessonTrackingItem[]>;

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

export type AddCartData = {
    course_id: number;
    course_title: string;
    course_amount: string;
};

export type AddCartResponse = ApiResponse<AddCartData>;

export type CartItem = {
    id: number;
    course_id: number;
    course_title: string;
    course_price: string;
    course_discount_price: string;
    course_amount: string;
    created_at: string;
    rating: string;
    reviews_count: string;
    thumbnail: string;
};

export type CartData = {
    cart_id: number;
    total_items: number;
    subtotal: string;
    items: CartItem[];
};

export type ViewCartResponse = ApiResponse<CartData>;

export type RemoveCartResponse = ApiResponse<Record<string, never>>;

export type StudentCertificateItem = {
    id: string;
    course_name: string;
    student_name: string;
    date: string;
    marks: number;
    out_of: number;
};

export type StudentCertificatesResponse = ApiResponse<StudentCertificateItem[]> & {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    next: string | null;
    previous: string | null;
};

export type StudentQuizAttemptItem = {
    id: string;
    quiz: number;
    course_name: string;
    correct_answers: number;
    total_questions: number;
    score_percentage: number;
    submitted_at: string;
};

export type StudentQuizAttemptsResponse = ApiResponse<StudentQuizAttemptItem[]> & {
    total?: number;
    page?: number;
    page_size?: number;
    total_pages?: number;
    next?: string | null;
    previous?: string | null;
};

export type DeleteAccountPayload = {
    password: string;
};

export type DeleteAccountResponse = ApiResponse<Record<string, never>>;