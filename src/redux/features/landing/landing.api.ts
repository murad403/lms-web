import baseApi from "@/redux/api/baseApi";
import {
    CategoriesResponse,
    CourseDetailsResponse,
    CoursesQueryParams,
    CoursesResponse,
    HomeCoursesResponse,
} from "./landing.type";


const landingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        homeCourses: builder.query<HomeCoursesResponse, void>({
            query: () => ({
                url: "/courses/home/courses/",
                method: "GET"
            }),
            providesTags: ["courses"]
        }),
        courseDetails: builder.query<CourseDetailsResponse, number>({
            query: (id) => ({
                url: `/courses/courses-list/${id}/`,
                method: "GET"
            }),
            providesTags: ["courses"]
        }),

        courses: builder.query<CoursesResponse, CoursesQueryParams | void>({
            query: (params) => {
                return {
                    url: `/courses/home/courses/list/`,
                    method: "GET",
                    params: params || undefined,
                }
            },
            providesTags: ["courses"]
        }),
        categories: builder.query<CategoriesResponse, void>({
            query: () => {
                return {
                    url: `/courses/categories/`,
                    method: "GET",
                }
            }
        }),
    }),
});



export const { useHomeCoursesQuery, useCourseDetailsQuery, useCoursesQuery, useCategoriesQuery } = landingApi;
