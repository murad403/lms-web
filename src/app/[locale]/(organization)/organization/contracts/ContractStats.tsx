import { contractStats } from '@/lib/organization';
import { AlertCircle, CheckCircle, ShieldCheck, Users } from 'lucide-react';
import React from 'react'

const ContractStats = () => {
    const stats = [
    { label: "Total Members", value: contractStats.totalContracts, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Active", value: contractStats.activeContracts, icon: CheckCircle, color: "bg-green-50 text-green-600" },
    { label: "Suspended", value: contractStats.pendingContracts, icon: AlertCircle, color: "bg-yellow-50 text-yellow-600" },
    { label: "Admins", value: contractStats.expiredContracts, icon: ShieldCheck , color: "bg-red-50 text-red-600" },
  ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.label} className="bg-white p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center ${stat.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-title">{String(stat.value).padStart(2, "0")}</p>
                            <p className="text-sm text-description">{stat.label}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ContractStats
