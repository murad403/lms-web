"use client";
import { X } from "lucide-react";
import Image from "next/image";

type Props = {
    show: boolean;
    onClose: () => void;
    logoPreview: string | null;
    organizationName: string;
    biography: string;
};

const WhiteLabelPreviewModal = ({ show, onClose, logoPreview, organizationName, biography }: Props) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-6">
                    {/* Logo preview */}
                    <div className="w-full bg-gray-50 border border-border-light rounded-lg flex flex-col items-center justify-center py-8 mb-6">
                        {logoPreview ? (
                            <div className="relative w-50 h-40">
                                <Image src={logoPreview} alt="Logo preview" fill className="object-cover" />
                            </div>
                        ) : (
                            <div className="w-28 h-28 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-xs text-gray-400">No logo</span>
                            </div>
                        )}
                        <p className="mt-3 text-base font-bold text-title tracking-widest uppercase">
                            {organizationName || "Organization Name"}
                        </p>
                    </div>

                    {/* Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-description mb-1">Organization name</label>
                            <div className="w-full px-4 py-2.5 text-sm border border-border-light rounded-md text-title bg-gray-50">
                                {organizationName || "Organization name"}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-description mb-1">Biography</label>
                            <div className="w-full px-4 py-2.5 text-sm border border-border-light rounded-md text-description bg-gray-50 min-h-20 leading-relaxed">
                                {biography || "Your tittle, proffesion or small biography"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhiteLabelPreviewModal;
