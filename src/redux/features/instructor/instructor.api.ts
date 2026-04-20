import baseApi1 from "@/redux/api/baseApi";
import {
    AdvanceCourseInfoResponse,
    BasicCourseInfoPayload,
    BasicCourseInfoResponse,
    CourseInfoResponse,
    CreateLiveClassRequest,
    CreateLiveClassResponse,
    InstructorCategoryResponse,
    InstructorDashboardResponse,
    InstructorLiveClassesStatsResponse,
    InstructorProfileResponse,
    LectureResponse,
    PublishCourseResponse,
    QuizPayload,
    QuizResponse,
    SectionPayload,
    SectionResponse,
} from "./instructor.type";

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
        courseCategories: builder.query<InstructorCategoryResponse, void>({
            query: () => {
                return {
                    url: "/courses/categories/",
                    method: "GET"
                }
            }
        }),
        addCourseBasicInfo: builder.mutation<BasicCourseInfoResponse, BasicCourseInfoPayload>({
            query: (data) => {
                return {
                    url: `/courses/courses/`,
                    method: "POST",
                    body: data
                }
            }
        }),
        updateCourseBasicInfo: builder.mutation<BasicCourseInfoResponse, { courseId: number; data: BasicCourseInfoPayload }>({
            query: ({ courseId, data }) => {
                return {
                    url: `/courses/courses/${courseId}/`,
                    method: "PATCH",
                    body: data
                }
            }
        }),
        addCourseAdvanceInfo: builder.mutation<AdvanceCourseInfoResponse, { courseId: number; data: FormData }>({
            query: ({ courseId, data }) => {
                return {
                    url: `/courses/courses/advance-info/${courseId}/`,
                    method: "POST",
                    body: data
                }
            }
        }),
        updateCourseAdvanceInfo: builder.mutation<AdvanceCourseInfoResponse, { advanceInfoId: number; data: FormData }>({
            query: ({ advanceInfoId, data }) => {
                return {
                    url: `/courses/courses/advance-info/${advanceInfoId}/`,
                    method: "PATCH",
                    body: data
                }
            }
        }),
        addCourseSection: builder.mutation<SectionResponse, { courseId: number; data: SectionPayload }>({
            query: ({ courseId, data }) => {
                return {
                    url: `/courses/courses/sections/${courseId}/`,
                    method: "POST",
                    body: data
                }
            }
        }),
        updateCourseSection: builder.mutation<SectionResponse, { courseId: number; sectionId: number; data: SectionPayload }>({
            query: ({ courseId, sectionId, data }) => {
                return {
                    url: `/courses/courses/${courseId}/sections/${sectionId}/`,
                    method: "PATCH",
                    body: data
                }
            }
        }),
        deleteCourseSection: builder.mutation({
            query: ({ courseId, sectionId }) => {
                return {
                    url: `/courses/courses/${courseId}/sections/${sectionId}/`,
                    method: "DELETE"
                }
            }
        }),
        addCourseLecture: builder.mutation<LectureResponse, { sectionId: number; data: FormData }>({
            query: ({ sectionId, data }) => {
                return {
                    url: `/courses/sections/lectures/${sectionId}/`,
                    method: "POST",
                    body: data
                }
            }
        }),
        updateCourseLecture: builder.mutation<LectureResponse, { lectureId: number; sectionId: number; data: FormData }>({
            query: ({ lectureId, sectionId, data }) => {
                return {
                    url: `/courses/sections/lectures/${sectionId}/${lectureId}/`,
                    method: "PATCH",
                    body: data
                }
            }
        }),
        deleteCourseLecture: builder.mutation({
            query: ({ lectureId, sectionId }) => {
                return {
                    url: `/courses/sections/lectures/${sectionId}/${lectureId}/`,
                    method: "DELETE"
                }
            }
        }),
        addCourseQuiz: builder.mutation<QuizResponse, { sectionId: number; data: QuizPayload }>({
            query: ({ sectionId, data }) => {
                return {
                    url: `/courses/sections/quizzes/${sectionId}/`,
                    method: "POST",
                    body: data
                }
            }
        }),
        publishCourse: builder.mutation<PublishCourseResponse, number>({
            query: (courseId) => {
                return {
                    url: `/courses/courses/publish/${courseId}/`,
                    method: "PATCH"
                }
            }
        }),
    }),
});



export const {
    useDashboardQuery,
    useUpdateInstructorProfileMutation,
    useGetInstructorProfileQuery,
    useCreateLiveClassMutation,
    useCourseInfoQuery,
    useGetLiveClassesDashboardQuery,
    useCourseCategoriesQuery,
    useAddCourseBasicInfoMutation,
    useUpdateCourseBasicInfoMutation,
    useAddCourseAdvanceInfoMutation,
    useUpdateCourseAdvanceInfoMutation,
    useAddCourseSectionMutation,
    useUpdateCourseSectionMutation,
    useAddCourseLectureMutation,
    useUpdateCourseLectureMutation,
    useAddCourseQuizMutation,
    usePublishCourseMutation,
    useDeleteCourseSectionMutation,
    useDeleteCourseLectureMutation
} = instructorApi;
