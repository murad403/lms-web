import baseApi1 from "@/redux/api/baseApi";
import {
    InstructorDashboardResponse,
    InstructorProfileResponse,
} from "./instructor.type";

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
        getInstructorProfile: builder.query<InstructorProfileResponse, void>({
            query: () => {
                return {
                    url: "/instructors/profile/",
                    method: "GET"
                }
            },
            providesTags: ["instructor-profile"]
        }),
        updateInstructorProfile: builder.mutation<InstructorProfileResponse, FormData>({
            query: (data) => {
                return {
                    url: "/instructors/profile/",
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ["instructor-profile"]
        }),

        getLiveClassesDashboard: builder.query({
            query: () => {
                return {
                    url: "/courses/live-classes/stats/",
                    method: "GET"
                }
            },
        }),
        
        createLiveClass: builder.mutation({
            query: (data, courseId) => {
                return {
                    url: `/courses/live-classes/${courseId}/`,
                    method: "POST",
                    body: data
                }
            },
        }),

    }),
});



export const { useDashboardQuery, useUpdateInstructorProfileMutation, useGetInstructorProfileQuery, useCreateLiveClassMutation } = instructorApi;
