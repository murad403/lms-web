import baseApi from "@/redux/api/baseApi";

type ApiResponse<T> = {
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

const studentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentDashboard: builder.query<ApiResponse<StudentDashboardData>, void>({
            query: () => ({
                url: "/students/dashboard/",
                method: "GET"
            }),
        }),
        getStudentProfile: builder.query<ApiResponse<StudentProfileData>, void>({
            query: () => ({
                url: "/students/profile/",
                method: "GET"
            }),
            providesTags: ["student"]
        }),
        updateStudentProfile: builder.mutation<ApiResponse<StudentProfileData>, FormData>({
            query: (data) => {
                return {
                    url: "/students/profile/",
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ["student"]
        }),
        getEnrolledCourses: builder.query<EnrolledCoursesResponse, { page?: number; status?: string }>({
            query: ({ page = 1, status }) => {
                const params = new URLSearchParams();
                params.append("page", page.toString());
                if (status) params.append("status", status);
                return {
                    url: `/students/enroll-courses/?${params.toString()}`,
                    method: "GET"
                }
            },
            providesTags: ["student"]
        }),
        enrollStudentInCourse: builder.query({
            query: () => {
                return {
                    url: "/students/enroll-courses/",
                    method: "GET"
                }
            }
        }),
        upcomingLiveClass: builder.query<LiveClassesResponse, void>({
            query: () => {
                return {
                    url: "/students/student/live-classes/upcoming/",
                    method: "GET"
                }
            }
        }),
        joinLiveClass: builder.mutation<JoinLiveClassResponse, number>({
            query: (id) => {
                return {
                    url: `/students/join-live-class/${id}/`,
                    method: "POST"
                }
            }
        }),
    }),
});



export const { useGetStudentDashboardQuery, useGetStudentProfileQuery, useUpdateStudentProfileMutation, useGetEnrolledCoursesQuery, useUpcomingLiveClassQuery, useJoinLiveClassMutation } = studentApi;
