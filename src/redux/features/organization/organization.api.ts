import baseApi from "@/redux/api/baseApi";
import { OrganizationCoursesQueryParams, OrganizationCoursesResponse, OrganizationDashboardResponse } from "./organization.type";

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
                // console.log(params)
                return {
                    url: `/organizations/my-courses/`,
                    method: "GET",
                    params: params || undefined
                }
            }
        }),
    }),
});

export const {
    useGetOrganizationDashboardQuery,
    useGetOrganizationCoursesQuery
} = organizationApi;
