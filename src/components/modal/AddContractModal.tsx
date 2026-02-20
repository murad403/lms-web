"use client";
import { Upload, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export type AddContractForm = {
    user: string;
    role: string;
    expiryDate: string;
    contractFile: FileList | null;
    revenueSplit: string;
};

type Props = {
    show: boolean;
    onClose: () => void;
    form: UseFormReturn<AddContractForm>;
    onSubmit: (data: AddContractForm) => void;
};

const AddContractModal = ({ show, onClose, form, onSubmit }: Props) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-md">
                <div className="flex items-center justify-between p-6 border-b border-border-light">
                    <h2 className="text-lg font-semibold text-title">Add Contract</h2>
                    <button onClick={() => { onClose(); form.reset(); }}>
                        <X className="w-5 h-5 text-description" />
                    </button>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
                    {/* Select User */}
                    <div className="flex items-center gap-4">
                        <label className="w-36 shrink-0 text-sm font-medium text-title">Select User</label>
                        <select
                            {...form.register("user", { required: true })}
                            className="flex-1 px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main bg-white rounded-md"
                        >
                            <option value="">Select instructor</option>
                            <option value="sarah">Sarah Johnson</option>
                            <option value="michael">Michael Chen</option>
                            <option value="emily">Emily Davis</option>
                            <option value="james">James Wilson</option>
                            <option value="lisa">Lisa Anderson</option>
                        </select>
                    </div>

                    {/* Select Role */}
                    <div className="flex items-center gap-4">
                        <label className="w-36 shrink-0 text-sm font-medium text-title">Select Role</label>
                        <select
                            {...form.register("role", { required: true })}
                            className="flex-1 px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main bg-white rounded-md"
                        >
                            <option value="">Select role</option>
                            <option value="Lead Instructor">Lead Instructor</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Assistant">Assistant</option>
                        </select>
                    </div>

                    {/* Contract Expiry Date */}
                    <div className="flex items-center gap-4">
                        <label className="w-36 shrink-0 text-sm font-medium text-title">Contract Expiry Date</label>
                        <input
                            {...form.register("expiryDate", { required: true })}
                            type="date"
                            className="flex-1 px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main"
                        />
                    </div>

                    {/* Upload Contract */}
                    <div className="flex items-center gap-4">
                        <label className="w-36 shrink-0 text-sm font-medium text-title">Upload Contract</label>
                        <div className="flex-1 relative">
                            <input
                                type="file"
                                {...form.register("contractFile")}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept=".pdf,.doc,.docx"
                            />
                            <div className="flex items-center justify-between px-4 py-3 text-sm border border-border-light rounded-md text-description bg-white">
                                <span>Upload Contract</span>
                                <Upload className="w-4 h-4 text-description" />
                            </div>
                        </div>
                    </div>

                    {/* Revenue Split % */}
                    <div className="flex items-center gap-4">
                        <label className="w-36 shrink-0 text-sm font-medium text-title">Revenue Split %</label>
                        <select
                            {...form.register("revenueSplit", { required: true })}
                            className="flex-1 px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main bg-white rounded-md"
                        >
                            <option value="">Select split</option>
                            <option value="10">10%</option>
                            <option value="20">20%</option>
                            <option value="30">30%</option>
                            <option value="40">40%</option>
                            <option value="50">50%</option>
                            <option value="60">60%</option>
                            <option value="70">70%</option>
                            <option value="80">80%</option>
                            <option value="90">90%</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2 justify-end">
                        <button
                            type="button"
                            onClick={() => { onClose(); form.reset(); }}
                            className="px-6 py-3 text-sm border border-border-light text-description hover:bg-gray-50 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 rounded-md py-3 text-sm bg-main text-white font-medium hover:bg-main/90"
                        >
                            Add Contract
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContractModal;

