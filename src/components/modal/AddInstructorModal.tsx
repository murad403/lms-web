"use client";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export type AddInstructorForm = {
    email: string;
};

type Props = {
    show: boolean;
    onClose: () => void;
    form: UseFormReturn<AddInstructorForm>;
    onSubmit: (data: AddInstructorForm) => void;
    isSubmitting?: boolean;
};

const AddInstructorModal = ({ show, onClose, form, onSubmit, isSubmitting = false }: Props) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-md">
                <div className="flex items-center justify-between p-6 border-b border-border-light">
                    <h2 className="text-lg font-semibold text-title">Add Instructor</h2>
                    <button onClick={() => { onClose(); form.reset(); }}>
                        <X className="w-5 h-5 text-description" />
                    </button>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-title mb-1">Email</label>
                        <input
                            {...form.register("email", { required: true })}
                            type="email"
                            className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main"
                            placeholder="Enter email address"
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => { onClose(); form.reset(); }}
                            className="flex-1 px-4 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90"
                        >
                            {isSubmitting ? "Submitting..." : "Add Instructor"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInstructorModal;
