import baseApi1 from "@/redux/api/baseApi";
import {
    AffiliateDashboardQueryParams,
    AffiliateDashboardResponse,
    AffiliateProfileResponse,
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

    }),
});



export const {
    useCourseListQuery,
    useGenerateCourseReferralLinkMutation,
    useSalesHistoryQuery,
    useCommissionWalletQuery,
    useGetProfileQuery,
    useUpdateProfileMutation
} = affiliateApi;
