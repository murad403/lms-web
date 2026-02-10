"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { TPurchaseItem } from "@/lib/profile";

type PurchaseItemCardProps = {
    item: TPurchaseItem;
    purchaseDate: string;
};

const PurchaseItemCard = ({ item, purchaseDate }: PurchaseItemCardProps) => {
    return (
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 py-3 border-b border-gray-50 last:border-b-0">
            {/* Image */}
            <div className="relative w-full sm:w-32 h-25 rounded-md overflow-hidden shrink-0">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-title">{item.rating}</span>
                </div>
                <h5 className="text-base font-semibold text-title line-clamp-2 mb-1">
                    {item.title}
                </h5>
                <p className="text-sm text-description">Course by: {item.instructor}</p>
                <p className="text-base font-medium text-main mt-1">${item.price.toFixed(2)}</p>
            </div>

            {/* Date & Meta */}
            <div className="text-right shrink-0 hidden md:block">
                <p className="text-xs text-description">{purchaseDate}</p>
            </div>
        </div>
    );
};

export default PurchaseItemCard;
