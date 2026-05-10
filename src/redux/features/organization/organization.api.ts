import baseApi from "@/redux/api/baseApi";
import { InviteInstructorPayload, InviteInstructorResponse, OrganizationCoursesQueryParams, OrganizationCoursesResponse, OrganizationDashboardResponse, OrganizationInstructorInvitationDashboardQueryParams, OrganizationInstructorInvitationDashboardResponse } from "./organization.type";
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
    useInviteInstructorMutation
} = organizationApi;
