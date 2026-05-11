"use client";
import { Eye, MoreVertical, Search, ShieldX, SquarePen, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import ContractDetailsModal from '@/components/modal/ContractDetailsModal'
import EditContractModal from '@/components/modal/EditContractModal'
import { useTranslations } from 'next-intl';
import { useContractListQuery } from '@/redux/features/organization/organization.api';
import Pagination from '@/components/reusable/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { resolveImageUrl } from '@/utils/image';
import Image from 'next/image';

const statusColors: Record<string, string> = {
    ongoing: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Expired: "bg-red-50 text-red-700",
};

const ContractList = () => {
    const t = useTranslations("OrganizationContracts");
    const [openAction, setOpenAction] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [showDetails, setShowDetails] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedContract, setSelectedContract] = useState<any>(null);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data: contractData, isLoading } = useContractListQuery({
        page: currentPage,
        page_size: 10,
        search: debouncedSearch
    });

    const contracts = contractData?.data || [];
    const totalPages = contractData?.total_pages || 1;

    const handleViewDetails = (contract: any) => {
        setSelectedContract(contract);
        setOpenAction(null);
        setShowDetails(true);
    };

    const handleEditContract = (contract: any) => {
        setSelectedContract(contract);
        setOpenAction(null);
        setShowEdit(true);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4 mt-6">
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
            </div>

            <div className="overflow-x-auto bg-white rounded-md p-4 pb-32 min-h-[450px]">
                <table className="w-full min-w-[700px] text-sm">
                    <thead>
                        <tr className="border-b border-border-light text-nowrap">
                            <th className="text-left py-3 px-4 font-medium text-title uppercase tracking-wider">{t("instructor")}</th>
                            <th className="text-left py-3 px-4 font-medium text-title uppercase tracking-wider">{t("course")}</th>
                            <th className="text-left py-3 px-4 font-medium text-title uppercase tracking-wider">{t("revenueShare")}</th>
                            <th className="text-left py-3 px-4 font-medium text-title uppercase tracking-wider">{t("expiry")}</th>
                            <th className="text-left py-3 px-4 font-medium text-title uppercase tracking-wider">{t("status")}</th>
                            <th className="text-left py-3 px-4 font-medium text-title uppercase tracking-wider">{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="border-b border-border-light">
                                    <td className="py-3 px-4"><Skeleton className="h-8 w-32" /></td>
                                    <td className="py-3 px-4"><Skeleton className="h-8 w-40" /></td>
                                    <td className="py-3 px-4"><Skeleton className="h-8 w-24" /></td>
                                    <td className="py-3 px-4"><Skeleton className="h-8 w-24" /></td>
                                    <td className="py-3 px-4"><Skeleton className="h-8 w-20" /></td>
                                    <td className="py-3 px-4"><Skeleton className="h-8 w-8" /></td>
                                </tr>
                            ))
                        ) : contracts.length > 0 ? (
                            contracts.map((contract) => (
                                <tr key={contract.id} className="border-b border-border-light last:border-0">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                                {
                                                    contract.instructor_avatar ?
                                                        <Image src={resolveImageUrl(contract.instructor_avatar)} alt={contract.instructor_name} width={500} height={500} className="object-contain w-full h-full" /> :
                                                        <User className="w-4 h-4 text-description" />
                                                }
                                            </div>
                                            <span className="text-title font-medium text-nowrap">{contract.instructor_name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-description text-nowrap">{contract.course_name}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-main rounded-full"
                                                    style={{ width: `${contract.revenue_share}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-description">{contract.revenue_share}%</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-description text-nowrap">{contract.expiry_date}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 text-xs font-medium capitalize rounded-sm text-nowrap ${statusColors[contract.status] || "bg-gray-50 text-gray-700"}`}>
                                            {contract.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="relative">
                                            <button
                                                onClick={() => setOpenAction(openAction === contract.id ? null : contract.id)}
                                                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                                            >
                                                <MoreVertical className="w-4 h-4 text-description" />
                                            </button>
                                            {openAction === contract.id && (
                                                <div className="absolute right-0 top-8 bg-white shadow-lg border border-border-light rounded z-10 w-44">
                                                    <button
                                                        onClick={() => handleViewDetails(contract)}
                                                        className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        {t("viewDetails")}
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditContract(contract)}
                                                        className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <SquarePen className="w-4 h-4" />
                                                        {t("editContract")}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-description">
                                    {t("noContracts")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-6">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            <ContractDetailsModal
                show={showDetails}
                contract={selectedContract}
                onClose={() => { setShowDetails(false); setSelectedContract(null); }}
            />

            <EditContractModal
                show={showEdit}
                contract={selectedContract}
                onClose={() => { setShowEdit(false); setSelectedContract(null); }}
            />
        </>
    )
}

export default ContractList
