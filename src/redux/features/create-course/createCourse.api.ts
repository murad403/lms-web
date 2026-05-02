import baseApi1 from "@/redux/api/baseApi";
import { InstructorCategoryResponse } from "@/redux/features/instructor/instructor.type";
import { BasicCourseInfoResponse, BasicCourseInfoPayload, AdvanceCourseInfoResponse, SectionResponse, SectionPayload, LectureResponse, QuizResponse, QuizPayload, QuizUpdatePayload, CourseOverviewResponse, PublishCourseResponse } from "@/redux/features/create-course/createCourse.type";



const createCourseApi = baseApi1.injectEndpoints({
    endpoints: (builder) => ({
        courseCategories: builder.query<InstructorCategoryResponse, void>({
            query: () => ({
                url: "/courses/categories/",
                method: "GET",
            }),
        }),

        addCourseBasicInfo: builder.mutation<BasicCourseInfoResponse, BasicCourseInfoPayload>({
            query: (data) => ({
                url: `/courses/courses/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["create-course"],
        }),

        getCourseBasicInfo: builder.query<BasicCourseInfoResponse, number>({
            query: (courseId) => ({
                url: `/courses/courses/${courseId}/`,
                method: "GET",
            }),
            providesTags: ["create-course"],
        }),

        updateCourseBasicInfo: builder.mutation<BasicCourseInfoResponse, { courseId: number; data: BasicCourseInfoPayload }>({
            query: ({ courseId, data }) => ({
                url: `/courses/courses/${courseId}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["create-course"],
        }),

        addCourseAdvanceInfo: builder.mutation<AdvanceCourseInfoResponse, { courseId: number; data: FormData }>({
            query: ({ courseId, data }) => ({
                url: `/courses/courses/advance-info/${courseId}/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["create-course"],
        }),

        updateCourseAdvanceInfo: builder.mutation<AdvanceCourseInfoResponse, { advanceInfoId: number; data: FormData }>({
            query: ({ advanceInfoId, data }) => ({
                url: `/courses/courses/advance-info/${advanceInfoId}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["create-course"],
        }),

        getCourseAdvanceInfo: builder.query<AdvanceCourseInfoResponse, number>({
            query: (advanceInfoId) => ({
                url: `/courses/courses/advance-info/${advanceInfoId}/`,
                method: "GET",
            }),
            providesTags: ["create-course"],
        }),

        addCourseSection: builder.mutation<SectionResponse, { courseId: number; data: SectionPayload }>({
            query: ({ courseId, data }) => ({
                url: `/courses/courses/sections/${courseId}/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["create-course"],
        }),

        getCourseSection: builder.query<SectionResponse, { courseId: number; sectionId: number }>({
            query: ({ courseId, sectionId }) => ({
                url: `/courses/courses/${courseId}/sections/${sectionId}/`,
                method: "GET",
            }),
            providesTags: ["create-course"],
        }),

        updateCourseSection: builder.mutation<SectionResponse, { courseId: number; sectionId: number; data: SectionPayload }>({
            query: ({ courseId, sectionId, data }) => ({
                url: `/courses/courses/${courseId}/sections/${sectionId}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["create-course"],
        }),

        deleteCourseSection: builder.mutation({
            query: ({ courseId, sectionId }) => ({
                url: `/courses/courses/${courseId}/sections/${sectionId}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["create-course"],
        }),

        addCourseLecture: builder.mutation<LectureResponse, { sectionId: number; data: FormData }>({
            query: ({ sectionId, data }) => ({
                url: `/courses/sections/lectures/${sectionId}/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["create-course"],
        }),

        getCourseLecture: builder.query<LectureResponse, { sectionId: number; lectureId: number }>({
            query: ({ sectionId, lectureId }) => ({
                url: `/courses/sections/lectures/${sectionId}/${lectureId}/`,
                method: "GET",
            }),
            providesTags: ["create-course"],
        }),

        updateCourseLecture: builder.mutation<LectureResponse, { lectureId: number; sectionId: number; data: FormData }>({
            query: ({ lectureId, sectionId, data }) => ({
                url: `/courses/sections/lectures/${sectionId}/${lectureId}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["create-course"],
        }),

        deleteCourseLecture: builder.mutation({
            query: ({ lectureId, sectionId }) => ({
                url: `/courses/sections/lectures/${sectionId}/${lectureId}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["create-course"],
        }),

        addCourseQuiz: builder.mutation<QuizResponse, { sectionId: number; data: QuizPayload }>({
            query: ({ sectionId, data }) => ({
                url: `/courses/sections/quizzes/${sectionId}/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["create-course"],
        }),

        updateCourseQuiz: builder.mutation<QuizResponse, { sectionId: number; quizId: number; data: QuizUpdatePayload }>({
            query: ({ sectionId, quizId, data }) => ({
                url: `/courses/sections/quizzes/${sectionId}/${quizId}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["create-course"],
        }),

        getCourseQuiz: builder.query<QuizResponse, { sectionId: number; quizId: number }>({
            query: ({ sectionId, quizId }) => ({
                url: `/courses/sections/quizzes/${sectionId}/${quizId}/`,
                method: "GET",
            }),
            providesTags: ["create-course"],
        }),

        courseOverview: builder.query<CourseOverviewResponse, number>({
            query: (courseId) => ({
                url: `/courses/courses/${courseId}/overview/`,
                method: "GET",
            }),
            providesTags: ["create-course"],
        }),

        publishCourse: builder.mutation<PublishCourseResponse, number>({
            query: (courseId) => ({
                url: `/courses/courses/publish/${courseId}/`,
                method: "PATCH",
            }),
            invalidatesTags: ["create-course"],
        }),
    }),
});

export const {
    useCourseCategoriesQuery,
    useAddCourseBasicInfoMutation,
    useGetCourseBasicInfoQuery,
    useUpdateCourseBasicInfoMutation,
    useAddCourseAdvanceInfoMutation,
    useUpdateCourseAdvanceInfoMutation,
    useGetCourseAdvanceInfoQuery,
    useAddCourseSectionMutation,
    useGetCourseSectionQuery,
    useUpdateCourseSectionMutation,
    useDeleteCourseSectionMutation,
    useAddCourseLectureMutation,
    useGetCourseLectureQuery,
    useUpdateCourseLectureMutation,
    useDeleteCourseLectureMutation,
    useAddCourseQuizMutation,
    useUpdateCourseQuizMutation,
    useGetCourseQuizQuery,
    useCourseOverviewQuery,
    usePublishCourseMutation,
} = createCourseApi;