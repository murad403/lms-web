import baseApi from "@/redux/api/baseApi";
import { AddCartResponse, AddWishlistResponse, ApiResponse, DeleteAccountPayload, DeleteAccountResponse, EnrolledCoursesResponse, JoinLiveClassResponse, LiveClassesResponse, RemoveCartResponse, RemoveWishlistResponse, StudentCertificatesResponse, StudentDashboardData, StudentProfileData, StudentPurchaseHistoryResponse, StudentQuizAttemptsResponse, StudentReviewItem, StudentReviewListResponse, UpdateReviewPayload, ViewCartResponse, ViewWishlistResponse } from "./student.type";



const studentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteAccount:  builder.mutation<DeleteAccountResponse, DeleteAccountPayload>({
            query: (data) =>{
                return{
                    url: "/students/delete-account/",
                    method: "DELETE",
                    body: data
                }
            }
        }),
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

        addWishlist: builder.mutation<AddWishlistResponse, number>({
            query: (id) => {
                return {
                    url: `/orders/wishlist/add/${id}/`,
                    method: "POST"
                }
            },
            invalidatesTags: ["wishlist", "courses"]
        }),
        viewWishlist: builder.query<ViewWishlistResponse, void>({
            query: () => {
                return {
                    url: `/orders/wishlist/`,
                    method: "GET"
                }
            },
            providesTags: ["wishlist"]
        }),
        removeWishlist: builder.mutation<RemoveWishlistResponse, number>({
            query: (id) => {
                return {
                    url: `/orders/wishlist/${id}/`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["wishlist", "courses"]
        }),

        addCart: builder.mutation<AddCartResponse, { course_id: number }>({
            query: (data) => {
                return {
                    url: `/orders/cart/add/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["cart"]
        }),
        viewCart: builder.query<ViewCartResponse, void>({
            query: () => {
                return {
                    url: `/orders/cart-view/`,
                    method: "GET"
                }
            },
            providesTags: ["cart"]
        }),
        removeCart: builder.mutation<RemoveCartResponse, number>({
            query: (id) => {
                return {
                    url: `/orders/cart-remove/${id}/`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["cart"]
        }),

        certificates: builder.query<StudentCertificatesResponse, { page?: number } | void>({
            query: (params) => {
                const page = params?.page ?? 1;
                return {
                    url: `/students/student/certificates/?page=${page}`,
                    method: "GET"
                }
            }
        }),
        quizAttempts: builder.query<StudentQuizAttemptsResponse, { page?: number } | void>({
            query: (params) => {
                const page = params?.page ?? 1;
                return {
                    url: `/students/quiz-attempts-list/?page=${page}`,
                    method: "GET"
                }
            }
        }),
    }),
});



export const { useGetStudentDashboardQuery, useGetStudentProfileQuery, useUpdateStudentProfileMutation, useGetEnrolledCoursesQuery, useUpcomingLiveClassQuery, useJoinLiveClassMutation, useReviewListQuery, useEditReviewMutation, useDeleteReviewMutation, usePurchaseHistoryQuery, useAddWishlistMutation, useViewWishlistQuery, useRemoveWishlistMutation, useViewCartQuery, useRemoveCartMutation, useAddCartMutation, useCertificatesQuery, useQuizAttemptsQuery, useDeleteAccountMutation } = studentApi;
