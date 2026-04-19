import baseApi1 from "@/redux/api/baseApi";
import { CourseInfoResponse, CreateLiveClassRequest, CreateLiveClassResponse, InstructorDashboardResponse, InstructorLiveClassesStatsResponse, InstructorProfileResponse } from "./instructor.type";

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

        getLiveClassesDashboard: builder.query<InstructorLiveClassesStatsResponse, void>({
            query: () => {
                return {
                    url: "/courses/live-classes/stats/",
                    method: "GET"
                }
            },
            providesTags: ["instructor-live-classes"]
        }),
        courseInfo: builder.query<CourseInfoResponse, void>({
            query: () => {
                return {
                    url: "/courses/course/info/",
                    method: "GET"
                }
            }
        }),
        createLiveClass: builder.mutation<CreateLiveClassResponse, CreateLiveClassRequest>({
            query: ({ data, courseId }) => {
                return {
                    url: `/courses/live-classes/${courseId}/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["instructor-live-classes"]
        }),

    }),
});



export const { useDashboardQuery, useUpdateInstructorProfileMutation, useGetInstructorProfileQuery, useCreateLiveClassMutation, useCourseInfoQuery, useGetLiveClassesDashboardQuery } = instructorApi;
