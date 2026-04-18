"use client";
import { CreditCard, ShoppingCart } from "lucide-react";
import PurchaseItemCard from "@/components/card/PurchaseItemCard";
import { type TPurchaseGroup } from "@/lib/profile";
import { usePurchaseHistoryQuery } from "@/redux/features/student/student.api";
import { type StudentPurchaseHistoryItem } from "@/redux/features/student/student.type";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const formatGroupDate = (value: string) => {
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) return value;
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
};

const PurchaseHistoryPage = () => {
    const t = useTranslations("PurchaseHistoryPage");
    const { data, isLoading } = usePurchaseHistoryQuery({ page: 1 });

    const groupedPurchases = useMemo<TPurchaseGroup[]>(() => {
        const groups = new Map<string, TPurchaseGroup>();

        (data?.data ?? []).forEach((item: StudentPurchaseHistoryItem) => {
            const groupDate = formatGroupDate(item.enrolled_at);

            if (!groups.has(groupDate)) {
                groups.set(groupDate, {
                    id: groupDate,
                    date: groupDate,
                    courses: 0,
                    totalPrice: 0,
                    paymentMethod: "N/A",
                    items: [],
                });
            }

            const currentGroup = groups.get(groupDate)!;
            const numericPrice = Number.parseFloat(item.course_price) || 0;

            currentGroup.courses += 1;
            currentGroup.totalPrice += numericPrice;
            currentGroup.items.push({
                id: String(item.id),
                title: item.course_title,
                image: item.course_thumbnail,
                instructor: item.instructor,
                price: numericPrice,
                rating: 5,
            });
        });

        return Array.from(groups.values());
    }, [data]);

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-title mb-6">
                {t("title")}
            </h2>

            {isLoading && (
                <div className="space-y-4 mb-6">
                    {Array.from({ length: 1 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-md border border-border-light overflow-hidden"
                        >
                            <div className="px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50 space-y-2">
                                <Skeleton className="h-6 w-32" />
                                <div className="flex items-center gap-3 flex-wrap">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>

                            <div className="px-4 sm:px-6 py-3 space-y-3">
                                {Array.from({ length: 2 }).map((__, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 py-3 border-b border-gray-50 last:border-b-0"
                                    >
                                        <Skeleton className="w-full sm:w-32 h-25 rounded-md shrink-0" />
                                        <div className="flex-1 min-w-0 space-y-2 w-full">
                                            <Skeleton className="h-4 w-16" />
                                            <Skeleton className="h-5 w-4/5" />
                                            <Skeleton className="h-4 w-40" />
                                            <Skeleton className="h-5 w-20" />
                                        </div>
                                        <Skeleton className="hidden md:block h-4 w-24" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && groupedPurchases.length === 0 && (
                <p className="text-sm text-description">No purchase history found.</p>
            )}

            <div className="space-y-6">
                {groupedPurchases.map((group) => (
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
