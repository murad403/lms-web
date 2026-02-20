"use client";
import { X } from "lucide-react";
import { TContract } from "@/lib/organization";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type EditContractForm = {
    revenueSplit: string;
    expiryDate: string;
    status: string;
};

type Props = {
    show: boolean;
    contract: TContract | null;
    onClose: () => void;
    onSave: (data: EditContractForm) => void;
};

const EditContractModal = ({ show, contract, onClose, onSave }: Props) => {
    const form = useForm<EditContractForm>();

    useEffect(() => {
        if (contract) {
            form.setValue("revenueSplit", String(contract.revenueShare));
            form.setValue("expiryDate", "");
            form.setValue("status", contract.status);
        }
    }, [contract, form]);

    if (!show || !contract) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full rounded-md max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-border-light">
                    <h2 className="text-lg font-semibold text-title">Edit Contract</h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-description" />
                    </button>
                </div>
                <form onSubmit={form.handleSubmit(onSave)} className="p-6 space-y-4">
                    {/* Instructor Info */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image src={contract.avatar} alt={contract.instructor} fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-title">{contract.instructor}</p>
                            <p className="text-xs text-description">{contract.course}</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-title mb-1">Revenue Split %</label>
                        <input
                            {...form.register("revenueSplit", { required: true })}
                            type="number"
                            min="0"
                            max="100"
                            className="w-full rounded-md px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main"
                            placeholder="e.g. 70"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-title mb-1">Contract Expiry Date</label>
                        <input
                            {...form.register("expiryDate", { required: true })}
                            type="date"
                            className="w-full rounded-md px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-title mb-1">Status</label>
                        <select
                            {...form.register("status", { required: true })}
                            className="w-full rounded-md px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main bg-white"
                        >
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Expired">Expired</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 rounded-md py-3 text-sm border border-border-light text-description hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 rounded-md py-3 text-sm bg-main text-white font-medium hover:bg-main/90"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContractModal;
