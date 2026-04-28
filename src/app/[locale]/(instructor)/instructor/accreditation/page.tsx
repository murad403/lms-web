"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import AccreditationStatsCards from "@/app/[locale]/(instructor)/instructor/accreditation/AccreditationStatsCards";
import SubmissionsTab from "@/app/[locale]/(instructor)/instructor/accreditation/SubmissionsTab";
import CertificatesTab from "@/app/[locale]/(instructor)/instructor/accreditation/CertificatesTab";
import GuidelinesTab from "@/app/[locale]/(instructor)/instructor/accreditation/GuidelinesTab";
import SignatureModal from "@/components/modal/SignatureModal";
import { accreditationGuidelines } from "@/lib/instructor";
import { useTranslations } from "next-intl";

const tabKeys = [
    { id: "submissions", labelKey: "submissions" },
    { id: "certificates", labelKey: "certificates" },
    { id: "guidelines", labelKey: "guidelines" },
];

const AccreditationPage = () => {
    const [activeTab, setActiveTab] = useState("submissions");
    const [showSignatureModal, setShowSignatureModal] = useState(false);
    const t = useTranslations("InstructorAccreditation");

    return (
        <div className="space-y-6">
            {/* Stats */}
            <AccreditationStatsCards />

            {/* Tab content card */}
            <div>
                {/* Tab header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
                    <div className="flex gap-1 bg-[#E7ECF4] px-3 py-2 rounded-md">
                        {tabKeys.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? "bg-white text-main"
                                        : "text-description hover:bg-gray-100"
                                }`}
                            >
                                {t(tab.labelKey)}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setShowSignatureModal(true)}
                        className="flex cursor-pointer items-center gap-1.5 px-4 py-2.5 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {t("createSignature")}
                    </button>
                </div>

                {/* Tab body */}
                <div className="mt-6">
                    {activeTab === "submissions" && (
                        <SubmissionsTab />
                    )}
                    {activeTab === "certificates" && (
                        <CertificatesTab />
                    )}
                    {activeTab === "guidelines" && (
                        <GuidelinesTab guidelines={accreditationGuidelines} />
                    )}
                </div>
            </div>

            <SignatureModal
                open={showSignatureModal}
                onClose={() => setShowSignatureModal(false)}
            />
        </div>
    );
};

export default AccreditationPage;
