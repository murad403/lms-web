"use client";
import { X } from "lucide-react";
import Image from "next/image";

type Props = {
    show: boolean;
    onClose: () => void;
    logoPreview: string | null;
    bannerPreview: string | null;
    organizationName: string;
    biography: string;
    phone: string;
    username: string;
};

const WhiteLabelPreviewModal = ({ show, onClose, logoPreview, bannerPreview, organizationName, biography, phone, username }: Props) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-4 border-b border-border-light flex items-center justify-between">
                    <h2 className="text-lg font-bold text-title">Branding Preview</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1">
                    {/* Banner Section */}
                    <div className="relative w-full h-40 bg-gray-100">
                        {bannerPreview ? (
                            <Image src={bannerPreview} alt="Banner preview" fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-sm text-gray-400">No banner uploaded</span>
                            </div>
                        )}

                        {/* Profile Photo Overlay */}
                        <div className="absolute -bottom-10 left-8">
                            <div className="relative w-24 h-24 rounded-lg border-4 border-white bg-gray-50 overflow-hidden shadow-md">
                                {logoPreview ? (
                                    <Image src={logoPreview} alt="Logo preview" fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-[10px] text-gray-400">No logo</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 pt-12">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-title">{organizationName || "Organization Name"}</h3>
                            <p className="text-sm text-description mt-1">@{username || "username"}</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Phone Number</label>
                                <div className="text-sm text-title">{phone || "Not specified"}</div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Biography</label>
                                <div className="text-sm text-description leading-relaxed whitespace-pre-wrap">
                                    {biography || "No biography provided."}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-border-light flex justify-end bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors"
                    >
                        Close Preview
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhiteLabelPreviewModal;
