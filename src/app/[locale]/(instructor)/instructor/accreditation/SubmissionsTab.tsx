"use client";
import { useState } from "react";
import { TAccreditationSubmission } from "@/lib/instructor";
import { Eye, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import course from "@/assets/partnership/image1.png"
import Image from "next/image";

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
        <div className="bg-white p-5 rounded-md">
            {/* Filter */}
            <div className="flex items-center justify-end mb-4">

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-border-light rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main"
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
                            <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                                Submission ID
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                                Course
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                                Submitted
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                                Certificate Type
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                                Status
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
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
                                        className={`text-xs font-medium px-2.5 py-1.5 rounded-sm ${statusColors[sub.status] || ""
                                            }`}
                                    >
                                        {sub.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4">
                                    <button
                                        onClick={() => setViewItem(sub)}
                                        className="p-1.5 px-2.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1 bg-[#ECF9FF]"
                                    >
                                        <Eye className="w-4 h-4 text-description" />
                                        view
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-title">Complete Web Development Bootcamp</DialogTitle>
                        <p className="text-sm text-description">By Dr. Sarah Chen • Tech Academy</p>
                    </DialogHeader>
                    {viewItem && (
                        <div className="space-y-4 mt-4">
                            {/* Course Image */}
                            <div className="relative w-full h-60 rounded-lg overflow-hidden">
                                <Image
                                    src={course}
                                    fill
                                    className="object-cover h-full"
                                    alt="course"
                                />
                            </div>

                            {/* Course Info */}
                            <div>
                                <div className="flex items-start justify-between mb-2">
                                    <span className="inline-block text-xs font-medium text-[#342F98] bg-[#EBEBFF] px-2.5 py-1 rounded-sm uppercase">
                                        DEVELOPMENTS
                                    </span>
                                    <span className="text-xl font-bold text-main">$57</span>
                                </div>
                                <h4 className="text-sm font-medium text-title mb-2">
                                    Machine Learning A-Z™: Hands-On Python & R In Data Science
                                </h4>
                                <div className="flex items-center justify-between gap-3 text-sm text-description mb-4 border border-border-light p-2">
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500">★</span>
                                        <span className="font-medium text-title">5.0</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="size-4 text-main" />
                                        <span className="font-medium">100 students</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-medium text-main">Overview</h3>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-4 gap-4 pt-2">
                                <div className="border border-border-light rounded-md p-3">
                                    <p className="text-xs text-description mb-1">Category</p>
                                    <p className="text-sm font-medium text-title">
                                        Development
                                    </p>
                                </div>
                                <div className="border border-border-light rounded-md p-3">
                                    <p className="text-xs text-description mb-1">Created</p>
                                    <p className="text-sm font-medium text-title">
                                        {viewItem.submitted}
                                    </p>
                                </div>
                                <div className="border border-border-light rounded-md p-3">
                                    <p className="text-xs text-description mb-1">Total Revenue</p>
                                    <p className="text-sm font-medium text-title">
                                        $124,500
                                    </p>
                                </div>
                                <div className="border border-border-light rounded-md p-3">
                                    <p className="text-xs text-description mb-1">Status</p>
                                    <p className="text-sm font-medium text-title bg-green-500 inline py-1 px-2 rounded-sm">
                                        {viewItem.status}
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SubmissionsTab;
