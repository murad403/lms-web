import baseApi1 from "@/redux/api/baseApi";

const affiliateApi = baseApi1.injectEndpoints({
    endpoints: (builder) => ({
        dashboard: builder.query({
            query: () => {
                return {
                    url: "/instructors/dashboard/",
                    method: "GET"
                }
            },
        }),
    }),
});



export const {

} = affiliateApi;
