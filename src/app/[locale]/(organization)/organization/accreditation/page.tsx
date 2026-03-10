"use client";
import { useState } from "react";
import AccreditationStats from "./AccreditationStats";
import AccreditationRequestTab from "./AccreditationRequestTab";
import CertificateRules from "./CertificateRules";
import AuditLogs from "./AuditLogs";
import { useTranslations } from "next-intl";

type Tab = "requests" | "rules" | "audit";

const AccreditationPage = () => {
  const t = useTranslations("OrganizationAccreditation");
  const [activeTab, setActiveTab] = useState<Tab>("requests");

  const tabs: { key: Tab; labelKey: "accreditationRequests" | "certificateRules" | "auditLogs" }[] = [
    { key: "requests", labelKey: "accreditationRequests" },
    { key: "rules", labelKey: "certificateRules" },
    { key: "audit", labelKey: "auditLogs" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-title">{t("title")}</h1>
        <p className="text-sm text-description mt-1">{t("description")}</p>
      </div>

      {/* Stats */}
      <AccreditationStats />

      {/* Tabs */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
          <div className="flex gap-1 bg-[#E7ECF4] px-3 py-2 rounded-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.key
                  ? "bg-white text-main"
                  : "text-description hover:bg-gray-100"
                  }`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {/* Accreditation Requests Tab */}
          {activeTab === "requests" && (
            <AccreditationRequestTab />
          )}

          {/* Exam & Certificate Rules Tab */}
          {activeTab === "rules" && (
            <CertificateRules />
          )}

          {/* Audit Logs Tab */}
          {activeTab === "audit" && (
            <AuditLogs />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccreditationPage;
