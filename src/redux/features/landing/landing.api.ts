import baseApi from "@/redux/api/baseApi";
import { HomeCoursesResponse } from "./landing.type";


const landingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        homeCourses: builder.query<HomeCoursesResponse, void>({
            query: () => ({
                url: "/courses/home/courses/",
                method: "GET"
            }),
        }),
    }),
});



export const { useHomeCoursesQuery } = landingApi;
