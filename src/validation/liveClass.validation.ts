import { z } from "zod";

export const liveClassSchema = z.object({
    course_id: z.number().min(1, "Please select a course"),
    title: z
        .string()
        .min(1, "Live class title is required")
        .max(80, "Title must be less than 80 characters"),
    topic: z
        .string()
        .min(1, "Live class topic is required")
        .max(500, "Topic must be less than 500 characters"),
    scheduled_date: z.string().min(1, "Date is required"),
    scheduled_time: z.string().min(1, "Time is required"),
    duration_minutes: z.number().min(1, "Duration is required"),
    platform: z.string().min(1, "Please select a platform"),
    class_link: z.string().url("Please enter a valid URL").min(1, "Live class link is required"),
});

export type LiveClassFormData = z.infer<typeof liveClassSchema>;
