"use client";
import { CreditCard, ShoppingCart } from "lucide-react";
import PurchaseItemCard from "@/components/card/PurchaseItemCard";
import { purchaseHistory } from "@/lib/profile";
import { useTranslations } from "next-intl";

const PurchaseHistoryPage = () => {
    const t = useTranslations("PurchaseHistoryPage");
    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-title mb-6">
                {t("title")}
            </h2>

            <div className="space-y-6">
                {purchaseHistory.map((group) => (
                    <div
                        key={group.id}
                        className="bg-white rounded-md border border-border-light overflow-hidden"
                    >
                        {/* Group Header */}
                        <div className="px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50">
                            <div className="space-y-2">
                                <h4 className="text-lg font-medium text-title">{group.date}</h4>
                                <div className="flex items-center gap-3 text-sm text-description flex-wrap">
                                    <span className="flex items-center gap-2">
                                        <ShoppingCart className="w-3.5 h-3.5 text-[#564FFD]" />
                                        {group.courses} {t("courses")}
                                    </span>
                                    <span className="text-main">
                                        ${group.totalPrice.toFixed(2)} {t("usd")}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CreditCard className="w-3.5 h-3.5 text-[#23BD33]" />
                                        {group.paymentMethod}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="px-4 sm:px-6">
                            {group.items.map((item) => (
                                <PurchaseItemCard
                                    key={item.id}
                                    item={item}
                                    purchaseDate={group.date}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseHistoryPage;
