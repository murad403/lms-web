import baseApi from "@/redux/api/baseApi";
import { MentorLiveClassesResponse } from "./mentor.type";

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
        })
    }),
});

export const {
    useGetMentorCoursesQuery,
    useGetMentorLiveClassesQuery
} = mentorApi;
