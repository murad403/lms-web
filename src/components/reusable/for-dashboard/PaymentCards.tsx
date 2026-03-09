"use client"
import { paymentCards } from '@/lib/instructor'
import { ArrowLeft, ArrowRight, CirclePlus, X } from 'lucide-react'
import { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

type PaymentCardForm = {
    name: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
};

const PaymentCards = () => {
    const [cardView, setCardView] = useState(0);
    const { register, handleSubmit, reset } = useForm<PaymentCardForm>();
    const [showAddCard, setShowAddCard] = useState(false);
    const t = useTranslations("InstructorEarnings");
    const onAddCard = (data: PaymentCardForm) => {
        // TODO: API call to add card
        console.log("Adding card:", data);
        reset();
        setShowAddCard(false);
    };
    return (
        <div>
            <div className="bg-white p-5 h-full">
                <h3 className="text-base sm:text-lg font-semibold text-title mb-6 sm:mb-6 pb-3 sm:pb-4 border-b border-border-light">{t("cards")}</h3>
                {/* Card Display */}
                {paymentCards[cardView] && (
                    <div className="bg-linear-to-br from-[#1B2E5A] to-[#0F1B35] p-5 text-white mb-4 relative">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-4xl font-bold uppercase">{paymentCards[cardView].type}</span>
                        </div>
                        <p className="text-xl tracking-wider font-mono mb-4">
                            {paymentCards[cardView].type === "visa" ? "4855" : "3855"} **** **** ****
                        </p>
                        <div className="flex justify-between text-sm">
                            <div>
                                <p className="text-base text-gray-300 uppercase">{t("expires")}</p>
                                <p className='text-base font-semibold'>{paymentCards[cardView].expiry}</p>
                            </div>
                            <div>
                                <p className="text-base text-gray-300 uppercase">{t("cardHolder")}</p>
                                <p className='text-base font-semibold'>{paymentCards[cardView].holderName}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Card Navigation */}
                <div className="flex items-center justify-end gap-4 my-6">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCardView(prev => prev > 0 ? prev - 1 : paymentCards.length - 1)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Previous card"
                        >
                            <ArrowLeft />
                        </button>
                        <button
                            onClick={() => setCardView(prev => prev < paymentCards.length - 1 ? prev + 1 : 0)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Next card"
                        >
                           <ArrowRight />
                        </button>
                    </div>
                </div>

                {/* Add Card Button */}
                <button
                    onClick={() => setShowAddCard(true)}
                    className="w-full flex items-center justify-center gap-2 py-10 border-2 border-dashed border-gray-300 rounded-lg text-sm text-description hover:border-main hover:text-main transition-colors"
                >
                    <CirclePlus className="size-7 text-[#4F9BEF]" />
                    <span className='text-title font-medium text-base'>{t("addNewCard")}</span>
                </button>
            </div>
            <AlertDialog open={showAddCard} onOpenChange={setShowAddCard}>
                <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                        <div className="flex items-center justify-between">
                            <AlertDialogTitle className="text-lg font-bold text-title">{t("newPaymentCard")}</AlertDialogTitle>
                            <button onClick={() => setShowAddCard(false)} className="p-1 hover:bg-gray-100 rounded">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </AlertDialogHeader>
                    <form onSubmit={handleSubmit(onAddCard)} className="space-y-4 mt-2">
                        <div>
                            <label className="text-sm font-medium text-title mb-1 block">{t("name")}</label>
                            <input
                                {...register("name")}
                                placeholder={t("nameOnCard")}
                                className="w-full px-3 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-main"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-title mb-1 block">{t("cardNumber")}</label>
                            <input
                                {...register("cardNumber")}
                                placeholder={t("cardNumberPlaceholder")}
                                className="w-full px-3 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-main"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-title mb-1 block">{t("mmYy")}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input {...register("expiryMonth")} placeholder="MM" className="w-full px-3 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-main" />
                                    <input {...register("expiryYear")} placeholder="YY" className="w-full px-3 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-main" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-title mb-1 block">{t("cvc")}</label>
                                <input {...register("cvc")} placeholder={t("securityCode")} className="w-full px-3 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-main" />
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowAddCard(false)}
                                className="flex-1 py-2.5 border border-gray-300 text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                {t("cancel")}
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-2.5 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors"
                            >
                                {t("addPaymentCard")}
                            </button>
                        </div>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default PaymentCards;
