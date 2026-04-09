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

export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  accepted_terms: boolean;
  type: "instructor" | "affiliate" | "organization" | "learner";
  organization_name?: string;
  affiliate_type?: string;
  iban?: string;
  tax_id?: string;
  address?: string;
};

export type SignUpResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    id: string;
  };
};

export type VerifyEmailPayload = {
  user_id: string;
  code: string;
};

export type VerifyEmailResponse = {
  success: boolean;
  status: number;
  message: string;
};

export type ResendVerificationPayload = {
  email: string;
};

export type ResendVerificationResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    email: string;
    expires_at: number;
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
    signUp: builder.mutation<SignUpResponse, SignUpPayload>({
      query: (data) => ({
        url: "/users/register/",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailPayload>({
      query: (data) => ({
        url: "/users/verify-email/",
        method: "POST",
        body: data,
      }),
    }),
    resendVerificationCode: builder.mutation<
      ResendVerificationResponse,
      ResendVerificationPayload>({
      query: (data) => ({
        url: "/users/resend-verification/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useVerifyEmailMutation, useResendVerificationCodeMutation } = authApi;
