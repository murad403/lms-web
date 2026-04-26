import baseApi1 from "@/redux/api/baseApi";
import { AffiliateDashboardQueryParams, AffiliateDashboardResponse, AffiliateProfileResponse, AffiliateWalletResponse, CourseListResponse, GenerateReferralResponse, StripeConnectResponse, StripeDashboardResponse, WithdrawalHistoryQueryParams, WithdrawalHistoryResponse, WithdrawalRequestPayload, WithdrawalRequestResponse } from "./affiliate.type";

const affiliateApi = baseApi1.injectEndpoints({
    endpoints: (builder) => ({
        courseList: builder.query<CourseListResponse, { search?: string; page?: number }>({
            query: ({ search = "", page = 1 } = {}) => ({
                url: `/affiliates/affiliate/courses/`,
                method: "GET",
                params: {
                    ...(search ? { search } : {}),
                    page,
                },
            }),
        }),

        generateCourseReferralLink: builder.mutation<GenerateReferralResponse, number>({
            query: (courseId) => ({
                url: `/affiliates/generate-course-referral-link/${courseId}/`,
                method: "POST",
            }),
        }),

        // sales history*********************************************************************************
        salesHistory: builder.query<AffiliateDashboardResponse, AffiliateDashboardQueryParams | void>({
            query: (params) => {
                return {
                    url: `/affiliates/affiliate/dashboard/`,
                    method: "GET"
                    ,
                    params: params?.search ? { search: params.search } : undefined,
                }
            },
        }),

        // commission wallet**********************************************************************************
        commissionWallet: builder.query<AffiliateWalletResponse, AffiliateDashboardQueryParams | void>({
            query: (params) => {
                return {
                    url: `/affiliates/affiliate/wallet/`,
                    method: "GET"
                    ,
                    params: params?.search ? { search: params.search } : undefined,
                }
            },
        }),

        // profile settings************************************************************************
        getProfile: builder.query<AffiliateProfileResponse, void>({
            query: () => {
                return {
                    url: `/affiliates/affiliate/profile/`,
                    method: "GET"
                }
            },
            providesTags: ["affiliate-profile"]
        }),
        updateProfile: builder.mutation<AffiliateProfileResponse, FormData>({
            query: (data) => {
                return {
                    url: `/affiliates/affiliate/profile/`,
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ["affiliate-profile"]
        }),



        // withdrawal requests************************************************************************
        stripeConnect: builder.mutation<StripeConnectResponse, void>({
            query: () => {
                return {
                    url: `/payments/affiliate/stripe/connect/`,
                    method: "POST"
                }
            },
        }),
        stripeDashboard: builder.mutation<StripeDashboardResponse, void>({
            query: () => {
                return {
                    url: `/payments/affiliate/stripe/dashboard-link/`,
                    method: "POST"
                }
            },
        }),
        withdrawalRequest: builder.mutation<WithdrawalRequestResponse, WithdrawalRequestPayload>({
            query: (data) => {
                return {
                    url: `/payments/affiliate/withdraw/request/`,
                    method: "POST",
                    body: data
                }
            },
        }),
        withdrawalHistory: builder.query<WithdrawalHistoryResponse, WithdrawalHistoryQueryParams | void>({
            query: (params) => {
                return {
                    url: `/affiliates/affiliate/withdrawal-requests-list/`,
                    method: "GET",
                    params: {
                        page: params?.page ?? 1,
                        page_size: params?.page_size ?? 10,
                    }
                }
            },
        }),


    }),
});



export const {
    useCourseListQuery,
    useGenerateCourseReferralLinkMutation,
    useSalesHistoryQuery,
    useCommissionWalletQuery,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useStripeConnectMutation,
    useStripeDashboardMutation,
    useWithdrawalRequestMutation,
    useWithdrawalHistoryQuery
} = affiliateApi;
