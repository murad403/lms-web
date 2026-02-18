import { withdrawalHistory } from '@/lib/instructor'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

const WithdrawHistory = () => {
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    
    const statusColor: Record<string, string> = {
        Pending: "text-orange-500",
        Completed: "text-green-600",
        Cancelled: "text-red-500",
        "Cancel Withdraw": "text-red-500",
    };

    const handleCancelWithdraw = (id: number) => {
        // TODO: API call to cancel withdrawal
        console.log("Cancelling withdrawal:", id);
        setOpenMenuId(null);
    };

    return (
        <div className="bg-white md:col-span-2 p-5">
            <h3 className="text-base sm:text-lg font-semibold text-title mb-2">Withdraw History</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 bg-light-bg">
                            <th className="text-left py-3 px-2 text-sm font-semibold text-title uppercase">Date</th>
                            <th className="text-left py-3 px-2 text-sm font-semibold text-title uppercase">Method</th>
                            <th className="text-left py-3 px-2 text-sm font-semibold text-title uppercase">Amount</th>
                            <th className="text-left py-3 px-2 text-sm font-semibold text-title uppercase">Provider</th>
                            <th className="text-left py-3 px-2 text-sm font-semibold text-title uppercase">Status</th>
                            <th className="py-3 px-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawalHistory.map((item) => (
                            <tr key={item.id} className="border-b border-gray-100">
                                <td className="py-3 px-2 text-description text-xs">{item.date}</td>
                                <td className="py-3 px-2 text-title">{item.method}</td>
                                <td className="py-3 px-2 text-title">${item.amount}</td>
                                <td className="py-3 px-2 text-title">{item.provider}</td>
                                <td className="py-3 px-2">
                                    <span className={`font-medium ${statusColor[item.status] || "text-gray-600"}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-3 px-2">
                                    <div className="relative">
                                        <button 
                                            onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                        </button>
                                        {openMenuId === item.id && (
                                            <>
                                                <div 
                                                    className="fixed inset-0 z-10" 
                                                    onClick={() => setOpenMenuId(null)}
                                                />
                                                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-[160px]">
                                                    <button
                                                        onClick={() => handleCancelWithdraw(item.id)}
                                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                        disabled={item.status !== "Pending"}
                                                    >
                                                        Cancel Withdraw
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WithdrawHistory
