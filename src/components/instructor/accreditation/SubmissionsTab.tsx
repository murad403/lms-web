"use client";

import { useState } from "react";
import { TAccreditationSubmission } from "@/lib/instructor";
import { Eye } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type Props = {
    submissions: TAccreditationSubmission[];
};

const statusColors: Record<string, string> = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    "Needs Revision": "bg-orange-100 text-orange-700",
    Rejected: "bg-red-100 text-red-700",
};

const SubmissionsTab = ({ submissions }: Props) => {
    const [filter, setFilter] = useState("all");
    const [viewItem, setViewItem] = useState<TAccreditationSubmission | null>(null);

    const filtered =
        filter === "all"
            ? submissions
            : submissions.filter(
                  (s) => s.status.toLowerCase().replace(" ", "-") === filter
              );

    return (
        <div>
            {/* Filter */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-description">
                    Showing {filtered.length} of {submissions.length} submissions
                </p>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="needs-revision">Needs Revision</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border-light">
                            <th className="py-3 px-4 text-xs font-semibold text-description uppercase">
                                Submission ID
                            </th>
                            <th className="py-3 px-4 text-xs font-semibold text-description uppercase">
                                Course
                            </th>
                            <th className="py-3 px-4 text-xs font-semibold text-description uppercase">
                                Submitted
                            </th>
                            <th className="py-3 px-4 text-xs font-semibold text-description uppercase">
                                Certificate Type
                            </th>
                            <th className="py-3 px-4 text-xs font-semibold text-description uppercase">
                                Status
                            </th>
                            <th className="py-3 px-4 text-xs font-semibold text-description uppercase">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((sub) => (
                            <tr
                                key={sub.id}
                                className="border-b border-border-light last:border-0"
                            >
                                <td className="py-3.5 px-4 text-sm font-medium text-title">
                                    {sub.id}
                                </td>
                                <td className="py-3.5 px-4 text-sm text-title">
                                    {sub.course}
                                </td>
                                <td className="py-3.5 px-4 text-sm text-description">
                                    {sub.submitted}
                                </td>
                                <td className="py-3.5 px-4 text-sm text-description">
                                    {sub.certificateType}
                                </td>
                                <td className="py-3.5 px-4">
                                    <span
                                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                            statusColors[sub.status] || ""
                                        }`}
                                    >
                                        {sub.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4">
                                    <button
                                        onClick={() => setViewItem(sub)}
                                        className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                                    >
                                        <Eye className="w-4 h-4 text-description" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Submission Details</DialogTitle>
                    </DialogHeader>
                    {viewItem && (
                        <div className="space-y-4 mt-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-description">Submission ID</p>
                                    <p className="text-sm font-medium text-title mt-0.5">
                                        {viewItem.id}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-description">Status</p>
                                    <span
                                        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mt-0.5 ${
                                            statusColors[viewItem.status] || ""
                                        }`}
                                    >
                                        {viewItem.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-description">Course Name</p>
                                    <p className="text-sm font-medium text-title mt-0.5">
                                        {viewItem.course}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-description">Certificate Type</p>
                                    <p className="text-sm font-medium text-title mt-0.5">
                                        {viewItem.certificateType}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-description">Date Submitted</p>
                                    <p className="text-sm font-medium text-title mt-0.5">
                                        {viewItem.submitted}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setViewItem(null)}
                                    className="px-4 py-2 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SubmissionsTab;
