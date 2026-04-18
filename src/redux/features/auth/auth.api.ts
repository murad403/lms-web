import baseApi from "@/redux/api/baseApi";
import { ChangePasswordPayload, ChangePasswordResponse, ForgotPasswordPayload, ForgotPasswordResponse, ResendVerificationPayload, ResendVerificationResponse, ResetPasswordPayload, ResetPasswordResponse, SignInPayload, SignInResponse, SignUpPayload, SignUpResponse, VerifyEmailPayload, VerifyEmailResponse, VerifyForgotPasswordPayload, VerifyForgotPasswordResponse } from "./auth.type";


const authApi = baseApi.injectEndpoints({
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
    resendVerificationCode: builder.mutation<ResendVerificationResponse, ResendVerificationPayload>({
      query: (data) => ({
        url: "/users/resend-verification/",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordPayload>({
      query: (data) => ({
        url: "/users/forgot-password/",
        method: "POST",
        body: data,
      }),
    }),
    verifyForgotPassword: builder.mutation<VerifyForgotPasswordResponse, VerifyForgotPasswordPayload>({
      query: (data) => ({
        url: "/users/verify-reset-code/",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordPayload>({
      query: (data) => ({
        url: "/users/reset-password/",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordPayload>({
      query: (data) => ({
        url: "/students/password-reset/",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useVerifyEmailMutation, useResendVerificationCodeMutation, useForgotPasswordMutation, useVerifyForgotPasswordMutation, useResetPasswordMutation, useChangePasswordMutation } = authApi;
