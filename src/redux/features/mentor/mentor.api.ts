import baseApi from "@/redux/api/baseApi";

const mentorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMentorCourses: builder.query({
            query: (params) => ({
                url: "/organizations/instructor/contracts/courses/",
                method: "GET",
                params: params || undefined,
            })
        })
    }),
});

export const {
    useGetMentorCoursesQuery,
} = mentorApi;
