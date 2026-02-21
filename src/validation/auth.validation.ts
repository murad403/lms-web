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
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  organizationName: z.string().min(2, "Organization name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  affiliateType: z.string().min(1, "Please select an affiliate type"),
  taxId: z.string().optional(),
  iban: z.string().min(5, "IBAN is required"),
  address: z.string().min(3, "Address is required"),
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


export const photoAndBannerSchema = z.object({
  photo: z
    .any()
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Photo must be less than 5MB"
    )
    .refine(
      (file) => !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Photo must be JPG, PNG, or WEBP"
    ),
  banner: z
    .any()
    .optional()
    .refine(
      (file) => !file || file.size <= 10 * 1024 * 1024,
      "Banner must be less than 10MB"
    )
    .refine(
      (file) => !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Banner must be JPG, PNG, or WEBP"
    ),
});

export const accountSettingsSchema = z.object({
  schoolName: z.string().min(2, "School name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  phoneCode: z.string().min(1, "Country code is required"),
  phone: z
    .string()
    .min(6, "Phone number must be at least 6 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  title: z.string().max(50, "Title must be 50 characters or less").optional(),
  biography: z.string().optional(),
});