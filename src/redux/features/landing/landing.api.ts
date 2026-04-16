import baseApi from "@/redux/api/baseApi";
import { HomeCoursesResponse } from "./landing.type";


const landingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        homeCourses: builder.query<HomeCoursesResponse, void>({
            query: () => ({
                url: "/courses/home/courses/",
                method: "GET"
            }),
            providesTags: ["courses"]
        }),
        courseDetails: builder.query({
            query: (id) => ({
                url: `/courses/courses-list/${id}/`,
                method: "GET"
            }),
            providesTags: ["courses"]
        }),
    }),
});



export const { useHomeCoursesQuery, useCourseDetailsQuery } = landingApi;
