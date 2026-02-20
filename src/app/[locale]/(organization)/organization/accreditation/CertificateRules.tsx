"use client";
import React from "react";
import { CheckSquare } from "lucide-react";

const CertificateRules = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Attendance Requirements (left) */}
            <div className="border border-border-light rounded-md p-6 space-y-5">
                <div>
                    <h3 className="text-base font-semibold text-title">Attendance Requirements</h3>
                    <p className="text-sm text-description mt-1">Minimum attendance for certification eligibility</p>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-description">Minimum Attendance</span>
                        <span className="text-sm font-semibold text-title">70%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full">
                        <div className="h-2.5 bg-[#042F54] rounded-full" style={{ width: "70%" }} />
                    </div>
                </div>

                {/* Validation Rules */}
                <div>
                    <h4 className="text-sm font-semibold text-title mb-3">Validation Rules</h4>
                    <div className="space-y-3">
                        {["Must attend live sessions", "Complete all assignments", "Pass mid-term assessment"].map((rule, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckSquare className="w-5 h-5 text-[#042F54] shrink-0" />
                                <span className="text-sm text-description">{rule}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Card 2: Attendance Requirements (right) */}
            <div className="border border-border-light rounded-md p-6 space-y-5">
                <div>
                    <h3 className="text-base font-semibold text-title">Attendance Requirements</h3>
                    <p className="text-sm text-description mt-1">Examination and assessment criteria</p>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-description">Minimum Attendance</span>
                        <span className="text-sm font-semibold text-title">70%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full">
                        <div className="h-2.5 bg-[#042F54] rounded-full" style={{ width: "70%" }} />
                    </div>
                </div>

                {/* Validation Rules */}
                <div>
                    <h4 className="text-sm font-semibold text-title mb-3">Validation Rules</h4>
                    <div className="space-y-3">
                        {["Final exam mandatory", "Practical assessment required", "Proctored exam environment"].map((rule, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckSquare className="w-5 h-5 text-[#042F54] shrink-0" />
                                <span className="text-sm text-description">{rule}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Card 3: Certificate Validity */}
            <div className="border border-border-light rounded-md p-6 space-y-5">
                <div>
                    <h3 className="text-base font-semibold text-title">Certificate Validity</h3>
                    <p className="text-sm text-description mt-1">Expiration and renewal policies</p>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-description">Minimum Attendance</span>
                        <span className="text-sm font-semibold text-title">70%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full">
                        <div className="h-2.5 bg-[#042F54] rounded-full" style={{ width: "70%" }} />
                    </div>
                </div>

                {/* Key-Value Pairs */}
                <div className="space-y-3">
                    {[
                        { label: "Validity Period", value: "24 months" },
                        { label: "Exclusions", value: "Non-transferable" },
                        { label: "Coverage Limits", value: "Single program" },
                        { label: "Claim Process", value: "Online portal" },
                        { label: "Premium Payment", value: "Per certificate" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className="text-sm text-description">{item.label}</span>
                            <span className="text-sm font-medium text-title">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Card 4: Compliance Checklist */}
            <div className="border border-border-light rounded-md p-6 space-y-5">
                <div>
                    <h3 className="text-base font-semibold text-title">Compliance Checklist</h3>
                    <p className="text-sm text-description mt-1">Requirements for accreditation approval</p>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-description">Minimum Attendance</span>
                        <span className="text-sm font-semibold text-title">70%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full">
                        <div className="h-2.5 bg-[#042F54] rounded-full" style={{ width: "70%" }} />
                    </div>
                </div>

                {/* Checklist */}
                <div className="space-y-3">
                    {[
                        "Course syllabus reviewed",
                        "Learning objectives defined",
                        "Assessment methods validated",
                        "Instructor credentials verified",
                        "Content quality approved",
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <CheckSquare className="w-5 h-5 text-[#042F54] shrink-0" />
                            <span className="text-sm text-description">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CertificateRules;
