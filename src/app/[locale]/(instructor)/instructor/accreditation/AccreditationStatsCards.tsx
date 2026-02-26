"use client";
import { TAccreditationStats } from "@/lib/instructor";
import { Award, BookOpen, Clock } from "lucide-react";
import { SlBadge } from "react-icons/sl";

type Props = {
    stats: TAccreditationStats;
};

const AccreditationStatsCards = ({ stats }: Props) => {
    const cards = [
        {
            label: "Approved Courses",
            value: stats.approvedCourses,
            icon: BookOpen,
            color: "green-600",
            border: "border-green-600",
            bg: "bg-green-50",
            title: "Accredited courses"
        },
        {
            label: "Pending Review",
            value: stats.pendingReview,
            icon: Clock,
            color: "yellow-600",
            border: "border-yellow-600",
            bg: "bg-yellow-50",
            title: "Awaiting approval"
        },
        {
            label: "Certificates Issued",
            value: stats.certificatesIssued.toLocaleString(),
            icon: Award,
            color: "blue-600",
            border: "border-blue-400",
            bg: "bg-blue-50",
        },
        {
            label: "Active Certificates",
            value: stats.activeCertificates.toLocaleString(),
            icon: SlBadge,
            color: "purple-600",
            border: "border-purple-600",
            bg: "bg-purple-50",
            title: "Valid certificates"
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className={`bg-white p-5 border-l-4 ${card.border} rounded-xl`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-base font-medium text-description">{card.label}</p>
                            <p className="text-2xl font-bold text-title mt-1">{card.value}</p>
                            <p className="text-xs text-description mt-1">{card.title}</p>
                        </div>
                        <div className={`${card.bg} p-3 rounded-lg`}>
                            <card.icon className={`w-5 h-5 text-${card.color}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccreditationStatsCards;
