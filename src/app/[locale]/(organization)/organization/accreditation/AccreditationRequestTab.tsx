"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Search, ChevronDown, Eye } from "lucide-react";
import { accreditationSubmissions, TAccreditationSubmission } from "@/lib/instructor";
import ReviewCourseModal from "@/components/modal/ReviewCourseModal";
import { useTranslations } from "next-intl";

const statusColors: Record<string, string> = {
    Approved: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    "Needs Revision": "bg-orange-50 text-orange-700",
    Rejected: "bg-red-50 text-red-700",
};

const AccreditationRequestTab = () => {
    const t = useTranslations("OrganizationAccreditation");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<TAccreditationSubmission | null>(null);

    const statuses = [
        { value: "All Status", labelKey: "allStatus" as const },
        { value: "Approved", labelKey: "approved" as const },
        { value: "Pending", labelKey: "pending" as const },
        { value: "Needs Revision", labelKey: "needsRevision" as const },
        { value: "Rejected", labelKey: "rejected" as const },
    ];

    const filtered = accreditationSubmissions.filter((s) => {
        const matchSearch =
            s.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = statusFilter === "All Status" || s.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div>
            {selectedSubmission && (
                <ReviewCourseModal
                    submission={selectedSubmission}
                    onClose={() => setSelectedSubmission(null)}
                />
            )}
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description" />
                    <input
                        type="text"
                        placeholder={t("searchPlaceholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-sm border border-border-light rounded-md focus:outline-none focus:border-main bg-white text-title placeholder:text-description"
                    />
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm border border-border-light rounded-lg text-description bg-white min-w-36"
                    >
                        {statuses.find(s => s.value === statusFilter) ? t(statuses.find(s => s.value === statusFilter)!.labelKey) : statusFilter}
                        <ChevronDown className="w-4 h-4 ml-auto" />
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 top-11 bg-white shadow-lg border border-border-light rounded-lg z-10 w-44">
                            {statuses.map((s) => (
                                <button
                                    key={s.value}
                                    onClick={() => {
                                        setStatusFilter(s.value);
                                        setShowDropdown(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${statusFilter === s.value ? "text-main font-medium" : "text-title"}`}
                                >
                                    {t(s.labelKey)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white p-5 rounded-md border border-border-light">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border-light">
                            <th className="text-left py-3 px-4 font-medium text-title">{t("course")}</th>
                            <th className="text-left py-3 px-4 font-medium text-title">{t("instructor")}</th>
                            <th className="text-left py-3 px-4 font-medium text-title">{t("accreditationCourse")}</th>
                            <th className="text-left py-3 px-4 font-medium text-title">{t("submitted")}</th>
                            <th className="text-left py-3 px-4 font-medium text-title">{t("status")}</th>
                            <th className="text-left py-3 px-4 font-medium text-title">{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((submission) => (
                            <tr key={submission.id} className="border-b border-border-light last:border-0">
                                {/* Course with avatar */}
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                                            <Image src={submission.avatar} alt={submission.course} fill className="object-cover" />
                                        </div>
                                        <span className="text-title font-medium whitespace-nowrap">{submission.course}</span>
                                    </div>
                                </td>
                                {/* Instructor */}
                                <td className="py-3 px-4 text-description whitespace-nowrap">{submission.instructor}</td>
                                {/* Accreditation Course */}
                                <td className="py-3 px-4 text-description whitespace-nowrap">{submission.accreditationCourse}</td>
                                {/* Submitted */}
                                <td className="py-3 px-4 text-teal-600 whitespace-nowrap">{submission.submitted}</td>
                                {/* Status */}
                                <td className="py-3 px-4">
                                    <span className={`px-3 py-1 rounded-sm text-xs font-medium text-nowrap ${statusColors[submission.status]}`}>
                                        {submission.status}
                                    </span>
                                </td>
                                {/* Actions */}
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => setSelectedSubmission(submission)}
                                        className="flex items-center gap-1.5 text-main hover:text-main/80 text-sm font-medium"
                                    >
                                        <Eye className="w-4 h-4" />
                                        {t("review")}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-12 text-description text-sm">
                        {t("noRequests")}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccreditationRequestTab;
