import { z } from "zod";

export const liveClassSchema = z.object({
    title: z
        .string()
        .min(1, "Live class title is required")
        .max(80, "Title must be less than 80 characters"),
    instructor: z
        .string()
        .min(1, "Instructor name is required")
        .max(120, "Instructor name must be less than 120 characters"),
    category: z.string().min(1, "Course category is required"),
    subCategory: z.string().min(1, "Course sub-category is required"),
    topic: z
        .string()
        .min(1, "Live class topic is required")
        .max(500, "Topic must be less than 500 characters"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    platform: z.string().min(1, "Please select a platform"),
    link: z.string().url("Please enter a valid URL").min(1, "Live class link is required"),
});

export type LiveClassFormData = z.infer<typeof liveClassSchema>;
