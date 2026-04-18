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

export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    user_id: string;
    expires_at: number;
  };
};

export type VerifyForgotPasswordPayload = {
  user_id: string;
  code: string;
};

export type VerifyForgotPasswordResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    secret_key: string;
    user_id: string;
  };
};

export type ResetPasswordPayload = {
  secret_key: string;
  user_id: string;
  new_password: string;
  confirm_password: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  status: number;
  message: string;
};

export type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export type ChangePasswordResponse = {
  success: boolean;
  status: number;
  message: string;
};