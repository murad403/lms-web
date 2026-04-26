import baseApi1 from "@/redux/api/baseApi";
import {
    AffiliateDashboardQueryParams,
    AffiliateDashboardResponse,
    AffiliateWalletResponse,
} from "./affiliate.type";

const affiliateApi = baseApi1.injectEndpoints({
    endpoints: (builder) => ({
        courseList: builder.query({
            query: () => {
                return {
                    url: `/affiliates/affiliate/courses/`,
                    method: "GET"
                }
            },
        }),
        generateCourseReferralLink: builder.mutation({
            query: (courseId) => {
                return {
                    url: `/affiliates/generate-course-referral-link/${courseId}/`,
                    method: "POST"
                }
            },
        }),
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
    }),
});



export const {
    useCourseListQuery,
    useGenerateCourseReferralLinkMutation,
    useSalesHistoryQuery,
    useCommissionWalletQuery
} = affiliateApi;
