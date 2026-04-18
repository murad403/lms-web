import baseApi1 from "@/redux/api/baseApi";
import { InstructorDashboardResponse } from "./instructor.type";

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
    }),
});



export const { useDashboardQuery } = instructorApi;
