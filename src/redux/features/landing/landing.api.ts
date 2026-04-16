import baseApi from "@/redux/api/baseApi";


const landingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        homeCourses: builder.query({
            query: () => ({
                url: "/courses/home/courses/",
                method: "GET"
            }),
        }),
    }),
});



export const { useHomeCoursesQuery } = landingApi;
