import baseApi from "@/redux/api/baseApi";


const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentDashboard: builder.query({
      query: () => ({
        url: "/students/dashboard/",
        method: "GET"
      }),
    }),
    getStudentProfile: builder.query({
      query: () => ({
        url: "/students/profile/",
        method: "GET"
      }),
    }),
    updateStudentProfile: builder.mutation({
      query: (data) => ({
        url: "/students/profile/",
        method: "PATCH",
        body: data
      }),
    }),
  }),
});



export const {  useGetStudentDashboardQuery, useGetStudentProfileQuery, useUpdateStudentProfileMutation } = studentApi;
