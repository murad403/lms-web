"use client";
import { Loader2, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCourseListQuery, useInstructorListQuery, useUpdateContractMutation } from "@/redux/features/organization/organization.api";
import { toast } from "sonner";

export type EditContractForm = {
    instructor_id: number | string;
    course_id: number | string;
    expiry_date: string;
    revenue_share: number;
};

type Props = {
    show: boolean;
    contract: any | null;
    onClose: () => void;
};

const EditContractModal = ({ show, contract, onClose }: Props) => {
    const { data: instructorData, isLoading: isLoadingInstructors } = useInstructorListQuery(undefined, { skip: !show });
    const { data: courseData, isLoading: isLoadingCourses } = useCourseListQuery(undefined, { skip: !show });
    const [updateContract, { isLoading: isSubmitting }] = useUpdateContractMutation();

    const form = useForm<EditContractForm>();

    useEffect(() => {
        if (show && contract && instructorData?.data && courseData?.data) {
            // Find IDs based on names from the list if IDs are not directly available
            const instructor = instructorData.data.find(i => i.user_name === contract.instructor_name);
            const course = courseData.data.find(c => c.title === contract.course_name);

            form.reset({
                instructor_id: instructor?.id || "",
                course_id: course?.id || "",
                expiry_date: contract.expiry_date || "",
                revenue_share: contract.revenue_share || 0
            });
        }
    }, [show, contract, instructorData, courseData, form]);

    if (!show || !contract) return null;

    const onSubmit = async (data: EditContractForm) => {
        try {
            const res = await updateContract({
                id: contract.id,
                data: {
                    instructor_id: Number(data.instructor_id),
                    course_id: Number(data.course_id),
                    expiry_date: data.expiry_date,
                    revenue_share: Number(data.revenue_share)
                }
            }).unwrap();
            if (res.success) {
                toast.success(res.message || "Contract updated successfully");
                onClose();
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update contract");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-md shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-border-light sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-semibold text-title">Edit Contract</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                        <X className="w-5 h-5 text-description" />
                    </button>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
                    {/* Select Instructor */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-title">Select Instructor</label>
                        <select
                            {...form.register("instructor_id", { required: true })}
                            className="w-full px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main bg-white rounded-md cursor-pointer disabled:opacity-50"
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
                            className="w-full px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main bg-white rounded-md cursor-pointer disabled:opacity-50"
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
                    <div className="flex gap-3 pt-4 justify-end sticky bottom-0 bg-white py-2 mt-auto border-t border-border-light">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50 rounded-md cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 rounded-md py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 min-w-[140px]"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Contract"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContractModal;
