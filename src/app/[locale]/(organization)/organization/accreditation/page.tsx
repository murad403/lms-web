"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import AccreditationStatsCards from "@/components/reusable/for-dashboard/AccreditationStatsCards";
import SubmissionsTab from "@/components/reusable/for-dashboard/SubmissionsTab";
import CertificatesTab from "@/components/reusable/for-dashboard/CertificatesTab";
import SignatureModal from "@/components/modal/SignatureModal";
import { useTranslations } from "next-intl";
import CertificateRules from "./CertificateRules";


type Tab = "requests" | "rules" | "certificates";

const AccreditationPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("requests");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const t = useTranslations("InstructorAccreditation");

  const tabs: { key: Tab; labelKey: "accreditationRequests" | "certificates" | "certificateRules" }[] = [
    { key: "requests", labelKey: "accreditationRequests" },
    { key: "certificates", labelKey: "certificates" },
    { key: "rules", labelKey: "certificateRules" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-title">{t("title")}</h1>
        <p className="text-sm text-description mt-1">{t("description")}</p>
      </div>

      {/* Stats */}
      <AccreditationStatsCards />

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
        <div className="flex gap-1 bg-[#E7ECF4] px-3 py-2 rounded-md">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.key
                ? "bg-white text-main shadow-sm"
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

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "requests" && <SubmissionsTab />}
        {activeTab === "certificates" && <CertificatesTab />}
        {activeTab === "rules" && <CertificateRules />}
      </div>

      <SignatureModal
        open={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
      />
    </div>
  );
};

export default AccreditationPage;
