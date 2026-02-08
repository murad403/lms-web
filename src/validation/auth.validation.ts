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
