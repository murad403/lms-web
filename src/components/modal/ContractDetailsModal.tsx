"use client";
import { Download, X } from "lucide-react";
import { TContract } from "@/lib/organization";
import Image from "next/image";

const statusColors: Record<string, string> = {
    Active: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Expired: "bg-red-50 text-red-700",
};

type Props = {
    show: boolean;
    contract: TContract | null;
    onClose: () => void;
};

const ContractDetailsModal = ({ show, contract, onClose }: Props) => {
    if (!show || !contract) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-border-light">
                    <h2 className="text-lg font-semibold text-title">Contract Details</h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-description" />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    {/* Instructor Info */}
                    <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image src={contract.avatar} alt={contract.instructor} fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-title">{contract.instructor}</p>
                            <p className="text-sm text-description">{contract.course}</p>
                        </div>
                        <span className={`ml-auto px-3 py-1 text-xs font-medium ${statusColors[contract.status]}`}>
                            {contract.status}
                        </span>
                    </div>

                    {/* Contract Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50">
                            <p className="text-xs text-description">Revenue Share</p>
                            <p className="text-lg font-bold text-title">{contract.revenueShare}%</p>
                        </div>
                        <div className="p-3 bg-gray-50">
                            <p className="text-xs text-description">Split</p>
                            <p className="text-lg font-bold text-title">{contract.splitPercentage}/{100 - contract.splitPercentage}</p>
                        </div>
                        <div className="p-3 bg-gray-50">
                            <p className="text-xs text-description">Signed Date</p>
                            <p className="text-sm font-medium text-title">{contract.signedDate}</p>
                        </div>
                        <div className="p-3 bg-gray-50">
                            <p className="text-xs text-description">Expiry Date</p>
                            <p className="text-sm font-medium text-title">{contract.expiry}</p>
                        </div>
                    </div>

                    {/* Revenue Summary */}
                    <div className="border border-border-light p-4">
                        <h4 className="text-sm font-semibold text-title mb-3">Revenue Summary</h4>
                        <div className="flex justify-between items-center py-2 border-b border-border-light">
                            <span className="text-sm text-description">Total Revenue</span>
                            <span className="text-sm font-medium text-title">$12,450.00</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-description">Instructor Earnings</span>
                            <span className="text-sm font-medium text-title">${(12450 * contract.revenueShare / 100).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="border border-border-light p-4">
                        <h4 className="text-sm font-semibold text-title mb-2">Terms & Conditions</h4>
                        <p className="text-sm text-description leading-relaxed">
                            This contract establishes a revenue-sharing agreement between the organization and the instructor.
                            The instructor will receive {contract.revenueShare}% of all course revenue. The contract
                            is valid until {contract.expiry} and may be renewed upon mutual agreement.
                            Early termination requires 30 days written notice from either party.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50"
                        >
                            Close
                        </button>
                        <button className="flex-1 px-4 py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90 flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractDetailsModal;
