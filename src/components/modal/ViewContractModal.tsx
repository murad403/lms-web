"use client";
import { X } from "lucide-react";
import { contracts, TInstructorMember } from "@/lib/organization";
import Image from "next/image";

const contractStatusColors: Record<string, string> = {
    Active: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Expired: "bg-red-50 text-red-700",
};

type Props = {
    show: boolean;
    instructor: TInstructorMember | null;
    onClose: () => void;
};

const ViewContractModal = ({ show, instructor, onClose }: Props) => {
    if (!show || !instructor) return null;

    const contract = contracts.find((c) => c.instructor === instructor.name);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-md">
                <div className="flex items-center justify-between p-6 border-b border-border-light">
                    <h2 className="text-lg font-semibold text-title">View Contract</h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-description" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    {/* Instructor Info */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image src={instructor.avatar} alt={instructor.name} fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-title">{instructor.name}</p>
                            <p className="text-xs text-description">{instructor.email}</p>
                        </div>
                    </div>

                    {contract ? (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-border-light">
                                <span className="text-sm text-description">Contract ID</span>
                                <span className="text-sm font-medium text-title">{contract.id}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-border-light">
                                <span className="text-sm text-description">Course</span>
                                <span className="text-sm font-medium text-title">{contract.course}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-border-light">
                                <span className="text-sm text-description">Revenue Share</span>
                                <span className="text-sm font-medium text-title">{contract.revenueShare}%</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-border-light">
                                <span className="text-sm text-description">Signed Date</span>
                                <span className="text-sm font-medium text-title">{contract.signedDate}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-border-light">
                                <span className="text-sm text-description">Expiry Date</span>
                                <span className="text-sm font-medium text-title">{contract.expiry}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-description">Status</span>
                                <span className={`px-3 py-1 text-xs font-medium ${contractStatusColors[contract.status]}`}>
                                    {contract.status}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-description text-center py-4">No contract found for this instructor.</p>
                    )}

                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full px-4 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewContractModal;
