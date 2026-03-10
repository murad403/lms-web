"use client";
import { accreditationStats } from '@/lib/instructor';
import { Award, CircleCheck, Clock4, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';


const AccreditationStats = () => {
    const t = useTranslations("OrganizationAccreditation");
    const stats = [
        { labelKey: "totalRequests" as const, value: accreditationStats.approvedCourses, icon: ShieldCheck, color: "bg-green-50 text-green-600" },
        { labelKey: "approved" as const, value: accreditationStats.pendingReview, icon: CircleCheck, color: "bg-yellow-50 text-yellow-600" },
        { labelKey: "pending" as const, value: accreditationStats.certificatesIssued.toLocaleString(), icon: Clock4, color: "bg-blue-50 text-blue-600" },
        { labelKey: "certificatesIssued" as const, value: accreditationStats.activeCertificates.toLocaleString(), icon: Award, color: "bg-purple-50 text-purple-600" },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.labelKey} className="bg-white p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center ${stat.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-title">{stat.value}</p>
                            <p className="text-sm text-description">{t(stat.labelKey)}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default AccreditationStats
