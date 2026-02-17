"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AccreditationStatsCards from "@/components/instructor/accreditation/AccreditationStatsCards";
import SubmissionsTab from "@/components/instructor/accreditation/SubmissionsTab";
import CertificatesTab from "@/components/instructor/accreditation/CertificatesTab";
import GuidelinesTab from "@/components/instructor/accreditation/GuidelinesTab";
import RequestAccreditationModal from "@/components/instructor/accreditation/RequestAccreditationModal";
import {
    accreditationStats,
    accreditationSubmissions,
    activeCertificates,
    accreditationGuidelines,
} from "@/lib/instructor";

const tabs = [
    { id: "submissions", label: "Submissions" },
    { id: "certificates", label: "Certificates" },
    { id: "guidelines", label: "Guidelines" },
];

const AccreditationPage = () => {
    const [activeTab, setActiveTab] = useState("submissions");
    const [showRequestModal, setShowRequestModal] = useState(false);

    return (
        <div className="space-y-6">
            {/* Stats */}
            <AccreditationStatsCards stats={accreditationStats} />

            {/* Tab content card */}
            <div className="bg-white rounded-lg border border-border-light">
                {/* Tab header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-border-light">
                    <div className="flex gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? "bg-main text-white"
                                        : "text-description hover:bg-gray-100"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setShowRequestModal(true)}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Request Accreditation
                    </button>
                </div>

                {/* Tab body */}
                <div className="p-4">
                    {activeTab === "submissions" && (
                        <SubmissionsTab submissions={accreditationSubmissions} />
                    )}
                    {activeTab === "certificates" && (
                        <CertificatesTab certificates={activeCertificates} />
                    )}
                    {activeTab === "guidelines" && (
                        <GuidelinesTab guidelines={accreditationGuidelines} />
                    )}
                </div>
            </div>

            {/* Request Modal */}
            <RequestAccreditationModal
                open={showRequestModal}
                onClose={() => setShowRequestModal(false)}
            />
        </div>
    );
};

export default AccreditationPage;
