import baseApi from "@/redux/api/baseApi";
import { ApiResponse, EnrolledCoursesResponse, JoinLiveClassResponse, LiveClassesResponse, StudentDashboardData, StudentProfileData, StudentPurchaseHistoryResponse, StudentReviewItem, StudentReviewListResponse, UpdateReviewPayload } from "./student.type";



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
        reviewList: builder.query<StudentReviewListResponse, { page?: number }>({
            query: ({ page = 1 }) => {
                return {
                    url: `/students/review-list/?page=${page}`,
                    method: "GET"
                }
            },
            providesTags: ["reviews"]
        }),
        editReview: builder.mutation<ApiResponse<StudentReviewItem>, UpdateReviewPayload>({
            query: ({ id, ...data }) => {
                return {
                    url: `/students/reviews-updated/${id}/`,
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ["reviews"]
        }),
        deleteReview: builder.mutation<ApiResponse<null>, number>({
            query: (id) => {
                return {
                    url: `/students/reviews-deleted/${id}/`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["reviews"]
        }),
        purchaseHistory: builder.query<StudentPurchaseHistoryResponse, { page?: number }>({
            query: ({ page = 1 }) => {
                return {
                    url: `/students/student/purchase-history/?page=${page}`,
                    method: "GET"
                }
            }
        }),
    }),
});



export const { useGetStudentDashboardQuery, useGetStudentProfileQuery, useUpdateStudentProfileMutation, useGetEnrolledCoursesQuery, useUpcomingLiveClassQuery, useJoinLiveClassMutation, useReviewListQuery, useEditReviewMutation, useDeleteReviewMutation, usePurchaseHistoryQuery } = studentApi;
