"use client";

import { TAccreditationStats } from "@/lib/instructor";
import { Award, Clock, FileCheck, Shield } from "lucide-react";

type Props = {
    stats: TAccreditationStats;
};

const AccreditationStatsCards = ({ stats }: Props) => {
    const cards = [
        {
            label: "Approved Courses",
            value: stats.approvedCourses,
            icon: FileCheck,
            color: "text-green-600",
            bg: "bg-green-50",
        },
        {
            label: "Pending Review",
            value: stats.pendingReview,
            icon: Clock,
            color: "text-yellow-600",
            bg: "bg-yellow-50",
        },
        {
            label: "Certificates Issued",
            value: stats.certificatesIssued.toLocaleString(),
            icon: Award,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            label: "Active Certificates",
            value: stats.activeCertificates.toLocaleString(),
            icon: Shield,
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className="bg-white rounded-lg border border-border-light p-5"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-description">{card.label}</p>
                            <p className="text-2xl font-bold text-title mt-1">{card.value}</p>
                        </div>
                        <div className={`${card.bg} p-3 rounded-lg`}>
                            <card.icon className={`w-5 h-5 ${card.color}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccreditationStatsCards;
