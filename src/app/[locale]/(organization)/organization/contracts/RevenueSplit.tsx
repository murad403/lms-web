"use client";
import { contracts, TContract } from '@/lib/organization'
import Image from 'next/image'
import { useState } from 'react'
import { Eye, Search, ChevronDown } from 'lucide-react'
import ContractDetailsModal from '@/components/modal/ContractDetailsModal'
import { useTranslations } from 'next-intl';

const statusColors: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Ongoing: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Expired: "bg-red-100 text-red-700",
};

const statusLabel: Record<string, string> = {
    Active: "Ongoing",
    Ongoing: "Ongoing",
    Pending: "Pending",
    Expired: "Expired",
};

const RevenueSplit = () => {
    const t = useTranslations("OrganizationContracts");
    const [showDetails, setShowDetails] = useState(false);
    const [selectedContract, setSelectedContract] = useState<TContract | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('All Roles');

    const handleView = (contract: TContract) => {
        setSelectedContract(contract);
        setShowDetails(true);
    };

    const filteredContracts = contracts.filter((c) =>
        c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.course.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
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
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="appearance-none pl-4 pr-9 py-2.5 text-sm border border-border-light rounded-md focus:outline-none focus:border-main bg-white text-title cursor-pointer"
                    >
                        <option>{t("allRoles")}</option>
                        <option>{t("instructors")}</option>
                        <option>{t("managers")}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description pointer-events-none" />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white p-4 border border-border-light rounded-md">
                <table className="w-full min-w-[700px] text-sm">
                    <thead>
                        <tr className="border-b border-border-light">
                            <th className="text-left py-3 px-4 font-medium text-description">{t("instructor")}</th>
                            <th className="text-left py-3 px-4 font-medium text-description">{t("splitPercentage")}</th>
                            <th className="text-left py-3 px-4 font-medium text-description">{t("revenueShare")}</th>
                            <th className="text-left py-3 px-4 font-medium text-description">{t("expiry")}</th>
                            <th className="text-left py-3 px-4 font-medium text-description">{t("status")}</th>
                            <th className="text-left py-3 px-4 font-medium text-description">{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContracts.map((contract) => (
                            <tr key={contract.id} className="border-b border-border-light last:border-0 hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                                            <Image src={contract.avatar} alt={contract.instructor} fill className="object-cover" />
                                        </div>
                                        <span className="text-title font-medium">{contract.instructor}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="text-title font-medium">{contract.splitPercentage}%</span>
                                    <span className="text-description"> / {100 - contract.splitPercentage}%</span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-slate-700 rounded-full"
                                                style={{ width: `${contract.revenueShare}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-description">{contract.revenueShare}%</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-description">{contract.expiry}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[contract.status] ?? "bg-gray-100 text-gray-600"}`}>
                                        {statusLabel[contract.status] ?? contract.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => handleView(contract)}
                                        className="p-1.5 rounded-md text-description hover:text-main hover:bg-gray-100 transition-colors"
                                        title="View Details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredContracts.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-description text-sm">
                                    {t("noContracts")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ContractDetailsModal
                show={showDetails}
                contract={selectedContract}
                onClose={() => { setShowDetails(false); setSelectedContract(null); }}
            />
        </>
    )
}

export default RevenueSplit
