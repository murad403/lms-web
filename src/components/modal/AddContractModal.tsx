"use client";
import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAddContractMutation, useCourseListQuery, useInstructorListQuery } from "@/redux/features/organization/organization.api";
import { toast } from "sonner";
import { useEffect } from "react";

export type AddContractForm = {
    instructor_id: number | string;
    course_id: number | string;
    expiry_date: string;
    revenue_share: number;
};

type Props = {
    show: boolean;
    onClose: () => void;
};

const AddContractModal = ({ show, onClose }: Props) => {
    const { data: instructorData, isLoading: isLoadingInstructors } = useInstructorListQuery(undefined, { skip: !show });
    const { data: courseData, isLoading: isLoadingCourses } = useCourseListQuery(undefined, { skip: !show });
    const [addContract, { isLoading: isSubmitting }] = useAddContractMutation();

    const form = useForm<AddContractForm>({
        defaultValues: {
            instructor_id: "",
            course_id: "",
            expiry_date: "",
            revenue_share: 0
        }
    });

    const onSubmit = async (data: AddContractForm) => {
        try {
            const res = await addContract({
                ...data,
                instructor_id: Number(data.instructor_id),
                course_id: Number(data.course_id),
                revenue_share: Number(data.revenue_share)
            }).unwrap();
            if (res.success) {
                toast.success(res.message || "Contract added successfully");
                onClose();
                form.reset();
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to add contract");
        }
    };

    useEffect(() => {
        if (!show) {
            form.reset();
        }
    }, [show, form]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-md shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-border-light">
                    <h2 className="text-lg font-semibold text-title">Add Contract</h2>
                    <button onClick={() => { onClose(); form.reset(); }} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                        <X className="w-5 h-5 text-description" />
                    </button>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
                    {/* Select Instructor */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-title">Select Instructor</label>
                        <select
                            {...form.register("instructor_id", { required: true })}
                            className="w-full px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main bg-white rounded-md cursor-pointer"
                            disabled={isLoadingInstructors}
                        >
                            <option value="">{isLoadingInstructors ? "Loading instructors..." : "Select instructor"}</option>
                            {instructorData?.data?.map((instructor) => (
                                <option key={instructor.id} value={instructor.id}>
                                    {instructor.user_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Select Course */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-title">Select Course</label>
                        <select
                            {...form.register("course_id", { required: true })}
                            className="w-full px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main bg-white rounded-md cursor-pointer"
                            disabled={isLoadingCourses}
                        >
                            <option value="">{isLoadingCourses ? "Loading courses..." : "Select course"}</option>
                            {courseData?.data?.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Contract Expiry Date */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-title">Contract Expiry Date</label>
                        <input
                            {...form.register("expiry_date", { required: true })}
                            type="date"
                            className="w-full px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main rounded-md cursor-pointer"
                        />
                    </div>

                    {/* Revenue Share % */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-title">Revenue Split %</label>
                        <input
                            {...form.register("revenue_share", { required: true, min: 0, max: 100 })}
                            type="number"
                            placeholder="Enter percentage (0-100)"
                            className="w-full px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main rounded-md"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4 justify-end">
                        <button
                            type="button"
                            onClick={() => { onClose(); form.reset(); }}
                            className="px-6 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50 rounded-md cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 rounded-md py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 min-w-[120px]"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Add Contract"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContractModal;
