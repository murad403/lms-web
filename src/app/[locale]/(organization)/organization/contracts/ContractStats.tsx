"use client";
import { AlertCircle, CheckCircle, Users } from 'lucide-react';
import React from 'react'
import { useTranslations } from 'next-intl';
import { useContractStatsQuery } from '@/redux/features/organization/organization.api';
import { Skeleton } from '@/components/ui/skeleton';

const ContractStats = () => {
    const t = useTranslations("OrganizationContracts");
    const { data: statsData, isLoading } = useContractStatsQuery();

    const summary = statsData?.data?.summary || {
        total_members: 0,
        active_members: 0,
        suspended_members: 0
    };

    const stats = [
        { labelKey: "totalMembers", value: summary.total_members, icon: Users, color: "bg-blue-50 text-blue-600" },
        { labelKey: "active", value: summary.active_members, icon: CheckCircle, color: "bg-green-50 text-green-600" },
        { labelKey: "suspended", value: summary.suspended_members, icon: AlertCircle, color: "bg-yellow-50 text-yellow-700" },
    ];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white p-5 flex items-center gap-4">
                        <Skeleton className="w-12 h-12" />
                        <div>
                            <Skeleton className="h-8 w-12 mb-2" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.labelKey} className="bg-white p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center ${stat.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-title">{String(stat.value).padStart(2, "0")}</p>
                            <p className="text-sm text-description">{t(stat.labelKey)}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ContractStats
