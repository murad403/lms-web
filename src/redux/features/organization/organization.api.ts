import baseApi from "@/redux/api/baseApi";
import { OrganizationCoursesQueryParams, OrganizationCoursesResponse, OrganizationDashboardResponse } from "./organization.type";
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
        })
    }),
});

export const {
    useGetOrganizationDashboardQuery,
    useGetOrganizationCoursesQuery,
    useOrganizationEarningsQuery,
    useOrganizationStripeConnectMutation: useStripeConnectMutation,
    useOrganizationStripeDashboardLinkMutation: useStripeDashboardLinkMutation,
    useOrganizationWithdrawRequestMutation: useWithdrawRequestMutation
} = organizationApi;
