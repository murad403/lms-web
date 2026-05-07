import baseApi1 from "@/redux/api/baseApi";
import { CourseInfoResponse, CreateLiveClassRequest, CreateLiveClassResponse, InstructorCancelWithdrawResponse, InstructorDashboardResponse, InstructorEarningsResponse, InstructorLiveClassesStatsResponse, InstructorProfileResponse, InstructorSignatureResponse, InstructorStripeConnectResponse, InstructorStripeDashboardResponse, InstructorUploadSignatureResponse, InstructorWithdrawRequestPayload, InstructorWithdrawRequestResponse, CourseAccreditationResponse, CertificateListResponse, MyCoursesQueryParams, MyCoursesResponse, OwnerCourseDetailsResponse } from "./instructor.type";

const instructorApi = baseApi1.injectEndpoints({
    endpoints: (builder) => ({
        dashboard: builder.query<InstructorDashboardResponse, void>({
            query: () => {
                return {
                    url: "/instructors/dashboard/",
                    method: "GET"
                }
            },
        }),

        // settings****************************************************************************************
        getInstructorProfile: builder.query<InstructorProfileResponse, void>({
            query: () => {
                return {
                    url: "/instructors/profile/",
                    method: "GET"
                }
            },
            providesTags: ["instructor-profile"]
        }),
        updateInstructorProfile: builder.mutation<InstructorProfileResponse, FormData>({
            query: (data) => {
                return {
                    url: "/instructors/profile/",
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ["instructor-profile"]
        }),

        // live classes*****************************************************************************************
        getLiveClassesDashboard: builder.query<InstructorLiveClassesStatsResponse, void>({
            query: () => {
                return {
                    url: "/courses/live-classes/stats/",
                    method: "GET"
                }
            },
            providesTags: ["instructor-live-classes"]
        }),
        courseInfo: builder.query<CourseInfoResponse, void>({
            query: () => {
                return {
                    url: "/courses/course/info/",
                    method: "GET"
                }
            }
        }),
        createLiveClass: builder.mutation<CreateLiveClassResponse, CreateLiveClassRequest>({
            query: ({ data, courseId }) => {
                return {
                    url: `/courses/live-classes/${courseId}/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["instructor-live-classes"]
        }),

        //my courses*************************************************************************** 
        myCourses: builder.query<MyCoursesResponse, MyCoursesQueryParams | void>({
            query: (params) => {
                // console.log(params)
                return {
                    url: `/courses/courses-list-instructor/`,
                    method: "GET",
                    params: params || undefined
                }
            }
        }),
        ownerCourseDetails: builder.query<OwnerCourseDetailsResponse, number>({
            query: (courseId) => {
                return {
                    url: `/courses/my-courses/${courseId}/`,
                    method: "GET",
                }
            }
        }),



        // earnings*****************************************************************************************
        earnings: builder.query<InstructorEarningsResponse, void>({
            query: () => {
                return {
                    url: `/instructors/earnings/`,
                    method: "GET"
                }
            },
            providesTags: ["instructor-earnings"]
        }),
        stripeConnect: builder.mutation<InstructorStripeConnectResponse, void>({
            query: () => {
                return {
                    url: `/payments/stripe/connect/`,
                    method: "POST"
                }
            }
        }),
        stripeDashboardLink: builder.mutation<InstructorStripeDashboardResponse, void>({
            query: () => {
                return {
                    url: `/payments/stripe/dashboard-link/`,
                    method: "POST"
                }
            }
        }),
        withdrawRequest: builder.mutation<InstructorWithdrawRequestResponse, InstructorWithdrawRequestPayload>({
            query: (data) => {
                return {
                    url: `/payments/withdraw/request/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["instructor-earnings"]
        }),
        cancelWithdrawRequest: builder.mutation<InstructorCancelWithdrawResponse, { withdrawId: string }>({
            query: ({ withdrawId }) => {
                return {
                    url: `/payments/instructor/withdraw/cancel/${withdrawId}/`,
                    method: "POST"
                }
            },
            invalidatesTags: ["instructor-earnings"]
        }),





        // accreditation********************************************************************************
        uploadSignature: builder.mutation<InstructorUploadSignatureResponse, FormData>({
            query: (data) => {
                return {
                    url: `/instructors/upload-signature/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["signature"]
        }),
        getSignature: builder.query<InstructorSignatureResponse, void>({
            query: () => {
                return {
                    url: `/instructors/get-signature/`,
                    method: "GET"
                }
            },
            providesTags: ["signature"]
        }),
        courseAccreditation: builder.query<CourseAccreditationResponse, { page?: number; page_size?: number; status?: string } | void>({
            query: (params) => {
                return {
                    url: `/instructors/courses/`,
                    method: "GET",
                    params: params || undefined
                }
            }
        }),
        certificateList: builder.query<CertificateListResponse, { page?: number; page_size?: number } | void>({
            query: (params) => {
                return {
                    url: `/instructors/certificates-list/`,
                    method: "GET",
                    params: params || undefined
                }
            }
        }),
        getInstructorProfileDetails: builder.query({
            query: () => {
                return {
                    url: `/instructors/instructor/me/`,
                    method: "GET"
                }
            }
        }),
    }),
});








export const {
    useDashboardQuery,
    useUpdateInstructorProfileMutation,
    useGetInstructorProfileQuery,
    useCreateLiveClassMutation,
    useCourseInfoQuery,
    useGetLiveClassesDashboardQuery,
    useEarningsQuery,
    useStripeConnectMutation,
    useStripeDashboardLinkMutation,
    useWithdrawRequestMutation,
    useCancelWithdrawRequestMutation,
    useGetSignatureQuery,
    useUploadSignatureMutation,
    useMyCoursesQuery,
    useCourseAccreditationQuery,
    useCertificateListQuery,
    useOwnerCourseDetailsQuery, 
    useGetInstructorProfileDetailsQuery
} = instructorApi;
