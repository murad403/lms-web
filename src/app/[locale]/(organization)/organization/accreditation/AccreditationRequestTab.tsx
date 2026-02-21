"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Search, ChevronDown, Eye } from "lucide-react";
import { accreditationSubmissions, TAccreditationSubmission } from "@/lib/instructor";
import ReviewCourseModal from "@/components/modal/ReviewCourseModal";

const statusColors: Record<string, string> = {
    Approved: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    "Needs Revision": "bg-orange-50 text-orange-700",
    Rejected: "bg-red-50 text-red-700",
};

const AccreditationRequestTab = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<TAccreditationSubmission | null>(null);

    const statuses = ["All Status", "Approved", "Pending", "Needs Revision", "Rejected"];

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
                        placeholder="Search Courses ...."
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
                        {statusFilter}
                        <ChevronDown className="w-4 h-4 ml-auto" />
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 top-11 bg-white shadow-lg border border-border-light rounded-lg z-10 w-44">
                            {statuses.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => {
                                        setStatusFilter(s);
                                        setShowDropdown(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${statusFilter === s ? "text-main font-medium" : "text-title"}`}
                                >
                                    {s}
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
                            <th className="text-left py-3 px-4 font-medium text-title">Course</th>
                            <th className="text-left py-3 px-4 font-medium text-title">Instructor</th>
                            <th className="text-left py-3 px-4 font-medium text-title">Accreditation Course</th>
                            <th className="text-left py-3 px-4 font-medium text-title">Submitted</th>
                            <th className="text-left py-3 px-4 font-medium text-title">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-title">Actions</th>
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
                                        Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-12 text-description text-sm">
                        No accreditation requests found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccreditationRequestTab;
