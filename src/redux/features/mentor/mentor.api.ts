import baseApi from "@/redux/api/baseApi";
import { CreateMentorLiveClassRequest, CreateMentorLiveClassResponse, MentorCoursesResponse, MentorLiveClassesResponse, MentorEarningsResponse } from "./mentor.type";

const mentorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMentorCourses: builder.query({
            query: (params) => ({
                url: "/organizations/instructor/contracts/courses/",
                method: "GET",
                params: params || undefined,
            })
        }),
        getMentorLiveClasses: builder.query<MentorLiveClassesResponse, void>({
            query: () => ({
                url: `/courses/live-classes/deshboard/`,
                method: "GET"
            }),
            providesTags: ["mentor-live-classes"]
        }),
        getMentorCourseList: builder.query<MentorCoursesResponse, void>({
            query: () => ({
                url: `/organizations/instructor/contracts/courses/`,
                method: "GET"
            })
        }),
        getMentorEarnings: builder.query<MentorEarningsResponse, void>({
            query: () => ({
                url: `/organizations/instructor/earnings/chart/`,
                method: "GET"
            })
        }),
        createMentorLiveClass: builder.mutation<CreateMentorLiveClassResponse, CreateMentorLiveClassRequest>({
            query: ({ courseId, data }) => ({
                url: `/courses/courses/${courseId}/live-classes/`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["mentor-live-classes"]
        }),
    }),
});

export const {
    useGetMentorCoursesQuery,
    useGetMentorLiveClassesQuery,
    useGetMentorCourseListQuery,
    useCreateMentorLiveClassMutation,
    useGetMentorEarningsQuery,
} = mentorApi;
