import baseApi1 from "@/redux/api/baseApi";

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    access_token: string;
    access_token_valid_till: number;
    refresh_token: string;
    role: string;
    user_id: string;
  };
};

const authApi = baseApi1.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInPayload>({
      query: (data) => ({
        url: "/users/login/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
export const useSingInMutation = useSignInMutation;
