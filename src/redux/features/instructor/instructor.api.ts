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


        // create course-------------------------------------------
        courseCategories: builder.query({
            query: () => {
                return {
                    url: "/courses/categories/",
                    method: "GET"
                }
            }
        }),
        addCourseBasicInfo: builder.mutation({
            query: (data) => {
                return {
                    url: `/courses/courses/`,
                    method: "POST",
                    body: data
                }
            }
        }),
        updateCourseBasicInfo: builder.mutation({
            query: (courseId, data) => {
                return {
                    url: `/courses/courses/${courseId}/`,
                    method: "PATCH",
                    body: data
                }
            }
        }),
        addCourseAdvanceInfo: builder.mutation({
            query: (courseId, data) => {
                return {
                    url: `/courses/courses/advance-info/${courseId}/`,
                    method: "POST",
                    body: data
                }
            }
        }),
        updateCourseAdvanceInfo: builder.mutation({
            query: (advanceInfoId, data) => {
                return {
                    url: `/courses/courses/advance-info/${advanceInfoId}/`,
                    method: "PATCH",
                    body: data
                }
            }
        }),
        addCourseSection: builder.mutation({
            query: (courseId, data) => {
                return {
                    url: `/courses/courses/sections/${courseId}/`,
                    method: "POST",
                    body: data
                }
            }
        }),
        updateCourseSection: builder.mutation({
            query: (courseId, sectionId, data) => {
                return {
                    url: `/courses/courses/${courseId}/sections/${sectionId}/`,
                    method: "PATCH",
                    body: data
                }
            }
        }),
        addCourseLecture: builder.mutation({
            query: (sectionId, data) => {
                return {
                    url: `/courses/sections/lectures/${sectionId}/`,
                    method: "POST",
                    body: data
                }
            }
        }),
        updateCourseLecture: builder.mutation({
            query: (lectureId, sectionId, data) => {
                return {
                    url: `/courses/sections/lectures/${sectionId}/${lectureId}/`,
                    method: "PATCH",
                    body: data
                }
            }
        }),
        addCourseQuiz: builder.mutation({
            query: (sectionId, data) => {
                return {
                    url: `/courses/sections/quizzes/${sectionId}/`,
                    method: "POST",
                    body: data
                }
            }
        }),
        publishCourse: builder.mutation({
            query: (courseId) => {
                return {
                    url: `/courses/courses/publish/${courseId}/`,
                    method: "PATCH"
                }
            }
        }),
    }),
});



export const { useDashboardQuery, useUpdateInstructorProfileMutation, useGetInstructorProfileQuery, useCreateLiveClassMutation, useCourseInfoQuery, useGetLiveClassesDashboardQuery } = instructorApi;
