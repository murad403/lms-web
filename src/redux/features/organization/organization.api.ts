import baseApi from "@/redux/api/baseApi";
import { AcceptInvitationPayload, AcceptInvitationResponse, InviteInstructorPayload, InviteInstructorResponse, IWhiteLabelResponse, OrganizationContractDetailsResponse, OrganizationContractQueryParams, OrganizationContractResponse, OrganizationCourseAnalyticsResponse, OrganizationCourseListResponse, OrganizationCoursesQueryParams, OrganizationCoursesResponse, OrganizationDailyEarningsResponse, OrganizationDashboardResponse, OrganizationInstructorInvitationDashboardQueryParams, OrganizationInstructorInvitationDashboardResponse, OrganizationInstructorListResponse, OrganizationMemberAnalyticsResponse, OrganizationRatingsBreakdownResponse, OrganizationRecentActivityResponse, OrganizationRevenueTrendsResponse, OrganizationStatisticsResponse, OrganizationTopCoursesResponse } from "./organization.type";
import { InstructorStripeConnectResponse, InstructorStripeDashboardResponse, InstructorWithdrawRequestPayload, InstructorWithdrawRequestResponse } from "../instructor/instructor.type";



const organizationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrganizationDashboard: builder.query<OrganizationDashboardResponse, void>({
            query: () => {
                return {
                    url: `/organizations/organization-deshboard/`,
                    method: "GET"
                }
            }
        }),
        getOrganizationCourses: builder.query<OrganizationCoursesResponse, OrganizationCoursesQueryParams | void>({
            query: (params) => {
                return {
                    url: `/organizations/my-courses/`,
                    method: "GET",
                    params: params || undefined
                }
            }
        }),
        organizationEarnings: builder.query({
            query: () => {
                return {
                    url: `/organizations/organization/earnings/`,
                    method: "GET"
                }
            },
            providesTags: ["organization-earnings"]
        }),

        organizationStripeConnect: builder.mutation<InstructorStripeConnectResponse, void>({
            query: () => {
                return {
                    url: `/payments/organization/stripe/connect/`,
                    method: "POST"
                }
            }
        }),
        organizationStripeDashboardLink: builder.mutation<InstructorStripeDashboardResponse, void>({
            query: () => {
                return {
                    url: `/payments/organization/stripe/dashboard-link/`,
                    method: "POST"
                }
            }
        }),
        organizationWithdrawRequest: builder.mutation<InstructorWithdrawRequestResponse, InstructorWithdrawRequestPayload>({
            query: (data) => {
                return {
                    url: `/payments/organization/withdraw/request/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["organization-earnings"]
        }),



        organizationInstructorInvitationDashboard: builder.query<OrganizationInstructorInvitationDashboardResponse, OrganizationInstructorInvitationDashboardQueryParams | void>({
            query: (params) => {
                return {
                    url: `/organizations/organization/instructors/dashboard/`,
                    method: "GET",
                    params: params || undefined
                }
            },
            providesTags: ["organization-instructors"]
        }),
        inviteInstructor: builder.mutation<InviteInstructorResponse, InviteInstructorPayload>({
            query: (data) => {
                return {
                    url: `/organizations/invite/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["organization-instructors"]
        }),
        instructorStatusChange: builder.mutation({
            query: (id) => {
                return {
                    url: `/organizations/membership/toggle/${id}/`,
                    method: "PATCH"
                }
            },
            invalidatesTags: ["organization-instructors"]
        }),
        instructorInvitationAcceptOrReject: builder.mutation<AcceptInvitationResponse, { data: AcceptInvitationPayload, token: string }>({
            query: ({ data, token }: { data: any, token: string }) => {
                return {
                    url: `/organizations/invitation/respond/${token}/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["organization-instructors"]
        }),

        // contracts *******************************************************
        instructorList: builder.query<OrganizationInstructorListResponse, void>({
            query: () => {
                return {
                    url: `/organizations/organization-instructors-contracts/`,
                    method: "GET"
                }
            },
            providesTags: ["organization-contracts"]
        }),
        CourseList: builder.query<OrganizationCourseListResponse, void>({
            query: () => {
                return {
                    url: `/organizations/my-organization-courses/`,
                    method: "GET"
                }
            },
            providesTags: ["organization-contracts"]
        }),
        contractList: builder.query<OrganizationContractResponse, OrganizationContractQueryParams | void>({
            query: (params) => {
                return {
                    url: `/organizations/contracts-instructors/`,
                    method: "GET",
                    params: params || undefined
                }
            },
            providesTags: ["organization-contracts"]
        }),
        contractDetails: builder.query<OrganizationContractDetailsResponse, number | string>({
            query: (id) => {
                return {
                    url: `/organizations/organization-contracts-details/${id}/`,
                    method: "GET"
                }
            },
            providesTags: ["organization-contracts"]
        }),
        contractStats: builder.query<OrganizationMemberAnalyticsResponse, void>({
            query: () => {
                return {
                    url: `/organizations/members-analytics/`,
                    method: "GET"
                }
            },
            providesTags: ["organization-contracts"]
        }),
        addContract: builder.mutation({
            query: (data) => {
                return {
                    url: `/organizations/contracts-instructors/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["organization-contracts"]
        }),
        updateContract: builder.mutation<any, { data: any, id: number | string }>({
            query: ({ data, id }) => {
                return {
                    url: `/organizations/contracts-instructors/${id}/`,
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ["organization-contracts"]
        }),
        getWhiteLabel: builder.query<IWhiteLabelResponse, void>({
            query: () => {
                return {
                    url: `/organizations/organization/profile/`,
                    method: "GET"
                }
            },
            providesTags: ["organization-white-label"]
        }),
        updateWhiteLabel: builder.mutation<IWhiteLabelResponse, FormData>({
            query: (data) => {
                return {
                    url: `/organizations/organization/profile/`,
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ["organization-white-label"]
        }),
        getStatistics: builder.query<OrganizationStatisticsResponse, void>({
            query: () => ({
                url: `/organizations/dashboard-statistics/`,
                method: "GET"
            })
        }),
        getRevenueTrends: builder.query<OrganizationRevenueTrendsResponse, void>({
            query: () => ({
                url: `/organizations/revenue-trends/`,
                method: "GET"
            })
        }),
        getDailyEarnings: builder.query<OrganizationDailyEarningsResponse, { start_date: string; end_date: string }>({
            query: ({ start_date, end_date }) => ({
                url: `/organizations/daily-revenue/`,
                method: "GET",
                params: { start_date, end_date }
            })
        }),
        getCourseAnalytics: builder.query<OrganizationCourseAnalyticsResponse, { page?: number; page_size?: number }>({
            query: (params) => ({
                url: `/organizations/course-analytics/`,
                method: "GET",
                params
            })
        }),
        getTopCourses: builder.query<OrganizationTopCoursesResponse, void>({
            query: () => ({
                url: `/organizations/top-courses/`,
                method: "GET"
            })
        }),
        getRecentActivity: builder.query<OrganizationRecentActivityResponse, void>({
            query: () => ({
                url: `/organizations/recent-activity/`,
                method: "GET"
            })
        }),
        getRatingsBreakdown: builder.query<OrganizationRatingsBreakdownResponse, void>({
            query: () => ({
                url: `/organizations/ratings-breakdown/`,
                method: "GET"
            })
        }),
        getOrganizationReviews: builder.query<any, { page?: number; page_size?: number } | void>({
            query: (params) => ({
                url: `/courses/organizations/courses/reviews/`,
                method: "GET",
                params: params || undefined
            })
        }),
    }),
});

export const {
    useGetOrganizationDashboardQuery,
    useGetOrganizationCoursesQuery,
    useOrganizationEarningsQuery,
    useOrganizationStripeConnectMutation: useStripeConnectMutation,
    useOrganizationStripeDashboardLinkMutation: useStripeDashboardLinkMutation,
    useOrganizationWithdrawRequestMutation: useWithdrawRequestMutation,
    useOrganizationInstructorInvitationDashboardQuery,
    useInviteInstructorMutation,
    useInstructorStatusChangeMutation,
    useInstructorInvitationAcceptOrRejectMutation,
    useContractListQuery,
    useContractDetailsQuery,
    useContractStatsQuery,
    useInstructorListQuery,
    useCourseListQuery,
    useAddContractMutation,
    useUpdateContractMutation,
    useGetWhiteLabelQuery,
    useUpdateWhiteLabelMutation,
    useGetStatisticsQuery,
    useGetRevenueTrendsQuery,
    useGetDailyEarningsQuery,
    useGetCourseAnalyticsQuery,
    useGetTopCoursesQuery,
    useGetRecentActivityQuery,
    useGetRatingsBreakdownQuery,
    useGetOrganizationReviewsQuery,
} = organizationApi;
