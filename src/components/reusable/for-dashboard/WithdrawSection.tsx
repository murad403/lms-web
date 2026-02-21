import { earningStats, paymentCards } from '@/lib/instructor'
import { Check } from 'lucide-react'
import React, { useState } from 'react'

const WithdrawSection = () => {
    const [selectedCard, setSelectedCard] = useState(paymentCards.find(card => card.isDefault)?.id || paymentCards[0]?.id);
    
    return (
        <div className="bg-white p-5">
            <h3 className="text-base sm:text-lg font-semibold text-title mb-6 sm:mb-6 pb-3 sm:pb-4 border-b border-border-light">Withdraw your money</h3>
            {/* Payment Methods */}
            <p className='text-description text-sm mb-4'>Payment method:</p>
            <div className="space-y-3 mb-4">
                {paymentCards.map((card) => (
                    <button
                        key={card.id}
                        onClick={() => setSelectedCard(card.id)}
                        className={`w-full flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 p-3 border transition-colors ${
                            selectedCard === card.id 
                                ? 'border-main bg-blue-50' 
                                : 'border-border-light hover:border-gray-400'
                        }`}
                    >
                        <div className={`w-12 h-8 rounded flex items-center justify-center text-white text-[10px] font-bold shrink-0 ${card.type === "visa" ? "bg-blue-600" : "bg-orange-500"}`}>
                            {card.type.toUpperCase()}
                        </div>
                        <div className="flex-1 text-sm text-left">
                            <span className="font-medium">{card.lastFour} **** **** ****</span>
                            <span className="text-description ml-2">{card.expiry}</span>
                        </div>
                        <span className="text-sm text-description">{card.holderName}</span>
                        <div className={`p-1 rounded-full ${selectedCard === card.id ? 'bg-green-500' : 'bg-gray-200'}`}>
                            {selectedCard === card.id && <Check className="size-3 text-white" />}
                        </div>
                    </button>
                ))}
            </div>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <div>
                    <p className="text-2xl font-bold text-title mb-4">
                        ${earningStats.currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-description mb-2">Current Balance</p>
                </div>
                <button className="px-5 py-3 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors w-full sm:w-auto">
                    Withdraw Money
                </button>
            </div>
        </div>
    )
}

export default WithdrawSection
