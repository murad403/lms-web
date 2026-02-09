import { z } from "zod";

// Sign In Schema
export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

// Learner Sign Up Schema
const learnerFields = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  terms: z.boolean(),
});

export const learnerSignUpSchema = learnerFields.refine(
  (data) => data.password === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] }
);

export type LearnerSignUpFormData = z.infer<typeof learnerFields>;

// Trainer Sign Up Schema
const trainerFields = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  terms: z.boolean(),
});

export const trainerSignUpSchema = trainerFields.refine(
  (data) => data.password === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] }
);

export type TrainerSignUpFormData = z.infer<typeof trainerFields>;

// Organization Sign Up Schema
const organizationFields = z.object({
  contactPersonName: z.string().min(2, "Name must be at least 2 characters"),
  organizationName: z.string().min(2, "Organization name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  terms: z.boolean(),
});

export const organizationSignUpSchema = organizationFields.refine(
  (data) => data.password === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] }
);

export type OrganizationSignUpFormData = z.infer<typeof organizationFields>;

// Partner Sign Up Schema
const partnerFields = z.object({
  contactPersonName: z.string().min(2, "Name must be at least 2 characters"),
  organizationName: z.string().min(2, "Organization name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  terms: z.boolean(),
});

export const partnerSignUpSchema = partnerFields.refine(
  (data) => data.password === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] }
);

export type PartnerSignUpFormData = z.infer<typeof partnerFields>;

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Verify OTP Schema
export const verifyOtpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

// Reset Password Schema
const resetPasswordFields = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  terms: z.boolean(),
});

export const resetPasswordSchema = resetPasswordFields.refine(
  (data) => data.newPassword === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] }
);

export type ResetPasswordFormData = z.infer<typeof resetPasswordFields>;

// Contact Form Schema
export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
