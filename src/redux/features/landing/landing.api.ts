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
        getNotifications: builder.query({
            query: () => {
                return {
                    url: `/notifications/notifications/`,
                    method: "GET",
                }
            }
        }),
        markAsRead: builder.query({
            query: (id) => {
                return {
                    url: `/notifications/notifications/${id}/`,
                    method: "GET",
                }
            }
        }),
        sendContactMessage: builder.mutation<any, { name: string; email: string; subject: string; message: string }>({
            query: (data) => {
                return {
                    url: `/organizations/sent/messages/contractus/`,
                    method: "POST",
                    body: data,
                }
            }
        }),
    }),
});



export const { useHomeCoursesQuery, useCourseDetailsQuery, useCoursesQuery, useCategoriesQuery, useGetNotificationsQuery, useSendContactMessageMutation } = landingApi;
