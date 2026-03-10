"use client";
import React from "react";
import { CheckSquare } from "lucide-react";
import { useTranslations } from "next-intl";

const CertificateRules = () => {
    const t = useTranslations("OrganizationAccreditation");
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Attendance Requirements (left) */}
            <div className="border border-border-light rounded-md p-6 space-y-5">
                <div>
                    <h3 className="text-base font-semibold text-title">{t("attendanceRequirements")}</h3>
                    <p className="text-sm text-description mt-1">{t("minAttendanceDesc")}</p>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-description">{t("minimumAttendance")}</span>
                        <span className="text-sm font-semibold text-title">70%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full">
                        <div className="h-2.5 bg-[#042F54] rounded-full" style={{ width: "70%" }} />
                    </div>
                </div>

                {/* Validation Rules */}
                <div>
                    <h4 className="text-sm font-semibold text-title mb-3">{t("validationRules")}</h4>
                    <div className="space-y-3">
                        {(["mustAttendLive", "completeAssignments", "passMidterm"] as const).map((ruleKey, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckSquare className="w-5 h-5 text-[#042F54] shrink-0" />
                                <span className="text-sm text-description">{t(ruleKey)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Card 2: Attendance Requirements (right) */}
            <div className="border border-border-light rounded-md p-6 space-y-5">
                <div>
                    <h3 className="text-base font-semibold text-title">{t("attendanceRequirements")}</h3>
                    <p className="text-sm text-description mt-1">{t("examinationDesc")}</p>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-description">{t("minimumAttendance")}</span>
                        <span className="text-sm font-semibold text-title">70%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full">
                        <div className="h-2.5 bg-[#042F54] rounded-full" style={{ width: "70%" }} />
                    </div>
                </div>

                {/* Validation Rules */}
                <div>
                    <h4 className="text-sm font-semibold text-title mb-3">{t("validationRules")}</h4>
                    <div className="space-y-3">
                        {(["finalExamMandatory", "practicalAssessment", "proctoredExam"] as const).map((ruleKey, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckSquare className="w-5 h-5 text-[#042F54] shrink-0" />
                                <span className="text-sm text-description">{t(ruleKey)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Card 3: Certificate Validity */}
            <div className="border border-border-light rounded-md p-6 space-y-5">
                <div>
                    <h3 className="text-base font-semibold text-title">{t("certificateValidity")}</h3>
                    <p className="text-sm text-description mt-1">{t("expirationDesc")}</p>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-description">{t("minimumAttendance")}</span>
                        <span className="text-sm font-semibold text-title">70%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full">
                        <div className="h-2.5 bg-[#042F54] rounded-full" style={{ width: "70%" }} />
                    </div>
                </div>

                {/* Key-Value Pairs */}
                <div className="space-y-3">
                    {([
                        { labelKey: "validityPeriod", valueKey: "months24" },
                        { labelKey: "exclusions", valueKey: "nonTransferable" },
                        { labelKey: "coverageLimits", valueKey: "singleProgram" },
                        { labelKey: "claimProcess", valueKey: "onlinePortal" },
                        { labelKey: "premiumPayment", valueKey: "perCertificate" },
                    ] as const).map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className="text-sm text-description">{t(item.labelKey)}</span>
                            <span className="text-sm font-medium text-title">{t(item.valueKey)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Card 4: Compliance Checklist */}
            <div className="border border-border-light rounded-md p-6 space-y-5">
                <div>
                    <h3 className="text-base font-semibold text-title">{t("complianceChecklist")}</h3>
                    <p className="text-sm text-description mt-1">{t("complianceDesc")}</p>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-description">{t("minimumAttendance")}</span>
                        <span className="text-sm font-semibold text-title">70%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full">
                        <div className="h-2.5 bg-[#042F54] rounded-full" style={{ width: "70%" }} />
                    </div>
                </div>

                {/* Checklist */}
                <div className="space-y-3">
                    {(["courseSyllabusReviewed", "learningObjectivesDefined", "assessmentMethodsValidated", "instructorCredentialsVerified", "contentQualityApproved"] as const).map((itemKey, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <CheckSquare className="w-5 h-5 text-[#042F54] shrink-0" />
                            <span className="text-sm text-description">{t(itemKey)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CertificateRules;
