"use client";
import { contracts, TContract } from '@/lib/organization'
import Image from 'next/image'
import { useState } from 'react'
import ContractDetailsModal from '@/components/modal/ContractDetailsModal'

const statusColors: Record<string, string> = {
    Active: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Expired: "bg-red-50 text-red-700",
};

const RevenueSplit = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedContract, setSelectedContract] = useState<TContract | null>(null);

    const handleView = (contract: TContract) => {
        setSelectedContract(contract);
        setShowDetails(true);
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border-light">
                            <th className="text-left py-3 px-4 font-medium text-description">Instructor</th>
                            <th className="text-left py-3 px-4 font-medium text-description">Split Percentage</th>
                            <th className="text-left py-3 px-4 font-medium text-description">Revenue Share</th>
                            <th className="text-left py-3 px-4 font-medium text-description">Expiry</th>
                            <th className="text-left py-3 px-4 font-medium text-description">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-description">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map((contract) => (
                            <tr key={contract.id} className="border-b border-border-light last:border-0">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
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
                                    <button
                                        onClick={() => handleView(contract)}
                                        className="text-sm text-main hover:text-main/80"
                                    >
                                        View
                                    </button>
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
    </>
    )
}

export default RevenueSplit
