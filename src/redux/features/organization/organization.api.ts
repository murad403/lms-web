import baseApi from "@/redux/api/baseApi";
import { OrganizationDashboardResponse } from "./organization.type";

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
    }),
});

export const {
    useGetOrganizationDashboardQuery
} = organizationApi;
