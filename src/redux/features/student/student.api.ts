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
                console.log(data)
                return {
                    url: "/students/profile/",
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ["student"]
        }),
    }),
});



export const { useGetStudentDashboardQuery, useGetStudentProfileQuery, useUpdateStudentProfileMutation } = studentApi;
