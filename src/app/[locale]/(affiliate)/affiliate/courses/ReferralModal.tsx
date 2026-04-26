"use client";

import { useState } from "react";
import { X, Copy, Check, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface ReferralModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
    referralCode: string;
    referralUrl: string;
}

export function ReferralModal({
    isOpen,
    onClose,
    courseTitle,
    referralCode,
    referralUrl,
}: ReferralModalProps) {
    const [copiedCode, setCopiedCode] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState(false);
    const t = useTranslations("AffiliateCourses");

    if (!isOpen) return null;

    const handleCopyCode = async () => {
        await navigator.clipboard.writeText(referralCode);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    const handleCopyUrl = async () => {
        await navigator.clipboard.writeText(referralUrl);
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 flex flex-col gap-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">{t("referralLinkGenerated")}</h2>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{courseTitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="border-t border-gray-100" />

                {/* Referral Code */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {t("referralCode")}
                    </label>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
                        <span className="flex-1 text-sm font-mono text-gray-800 truncate">{referralCode}</span>
                        <button
                            onClick={handleCopyCode}
                            className="shrink-0 flex items-center cursor-pointer gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-md text-xs font-semibold text-gray-700 transition-colors"
                        >
                            {copiedCode ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                            {copiedCode ? t("copied") : t("copy")}
                        </button>
                    </div>
                </div>

                {/* Referral URL */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {t("referralUrl")}
                    </label>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
                        <span className="flex-1 text-sm text-gray-800 truncate">{referralUrl}</span>
                        <button
                            onClick={handleCopyUrl}
                            className="shrink-0 flex items-center cursor-pointer gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-md text-xs font-semibold text-gray-700 transition-colors"
                        >
                            {copiedUrl ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                            {copiedUrl ? t("copied") : t("copy")}
                        </button>
                    </div>
                </div>

                <Link
                    href={referralUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-semibold transition-colors"
                >
                    <ExternalLink className="w-4 h-4" />
                    {t("openReferralLink")}
                </Link>
            </div>
        </div>
    );
}