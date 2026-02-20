"use client";
import { contracts, TContract } from '@/lib/organization'
import { ChevronDown, Eye, MoreVertical, Search, ShieldX, SquarePen } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ContractDetailsModal from '@/components/modal/ContractDetailsModal'
import EditContractModal from '@/components/modal/EditContractModal'

const statusColors: Record<string, string> = {
    Active: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Expired: "bg-red-50 text-red-700",
};

const ContractList = () => {
    const [openAction, setOpenAction] = useState<string | null>(null);
    const [roleFilter, setRoleFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const [showDetails, setShowDetails] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedContract, setSelectedContract] = useState<TContract | null>(null);

    const filteredContracts = contracts.filter((c) => {
        const matchSearch = searchQuery === "" ||
            c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.course.toLowerCase().includes(searchQuery.toLowerCase());
        return matchSearch;
    });

    const handleViewDetails = (contract: TContract) => {
        setSelectedContract(contract);
        setOpenAction(null);
        setShowDetails(true);
    };

    const handleEditContract = (contract: TContract) => {
        setSelectedContract(contract);
        setOpenAction(null);
        setShowEdit(true);
    };

    return (
        <>
             <div className="flex items-center gap-3 mb-4">
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
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="appearance-none pl-4 pr-9 py-2.5 text-sm border border-border-light rounded-md focus:outline-none focus:border-main bg-white text-title cursor-pointer"
                    >
                        <option>All Roles</option>
                        <option>Instructors</option>
                        <option>Managers</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description pointer-events-none" />
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-md p-4">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border-light">
                            <th className="text-left py-3 px-4 font-medium text-title">Instructor</th>
                            <th className="text-left py-3 px-4 font-medium text-title">Course</th>
                            <th className="text-left py-3 px-4 font-medium text-title">Revenue Share</th>
                            <th className="text-left py-3 px-4 font-medium text-title">Expiry</th>
                            <th className="text-left py-3 px-4 font-medium text-title">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-title">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContracts.map((contract) => (
                            <tr key={contract.id} className="border-b border-border-light last:border-0">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                            <Image src={contract.avatar} alt={contract.instructor} fill className="object-cover" />
                                        </div>
                                        <span className="text-title font-medium">{contract.instructor}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-description">{contract.course}</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-main rounded-full"
                                                style={{ width: `${contract.revenueShare}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-description">{contract.revenueShare}%</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-description">{contract.expiry}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-3 py-1 text-xs font-medium ${statusColors[contract.status]}`}>
                                        {contract.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="relative">
                                        <button
                                            onClick={() => setOpenAction(openAction === contract.id ? null : contract.id)}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <MoreVertical className="w-4 h-4 text-description" />
                                        </button>
                                        {openAction === contract.id && (
                                            <div className="absolute right-0 top-8 bg-white shadow-lg border border-border-light rounded z-10 w-44">
                                                <button
                                                    onClick={() => handleViewDetails(contract)}
                                                    className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50"
                                                >
                                                    <Eye className="w-4 h-4 inline mr-2"/>
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={() => handleEditContract(contract)}
                                                    className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50"
                                                >
                                                    <SquarePen className="w-4 h-4 inline mr-2"/>
                                                    Edit Contract
                                                </button>
                                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                                                    <ShieldX className="w-4 h-4 inline mr-2" />
                                                    Terminate</button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
            onSave={(data) => { console.log("Save contract:", data); setShowEdit(false); setSelectedContract(null); }}
        />
    </>
    )
}

export default ContractList
