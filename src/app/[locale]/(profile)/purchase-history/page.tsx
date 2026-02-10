"use client";
import { CreditCard, ShoppingCart } from "lucide-react";
import PurchaseItemCard from "@/components/reusable/PurchaseItemCard";
import { purchaseHistory } from "@/lib/profile";

const PurchaseHistoryPage = () => {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold text-title mb-6">
        Purchase History
      </h2>

      <div className="space-y-6">
        {purchaseHistory.map((group) => (
          <div
            key={group.id}
            className="bg-white rounded-xl border border-border-light overflow-hidden"
          >
            {/* Group Header */}
            <div className="px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-title">{group.date}</h4>
                <div className="flex items-center gap-3 text-xs text-description flex-wrap">
                  <span className="flex items-center gap-1">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {group.courses} Courses
                  </span>
                  <span className="font-bold text-main">
                    ${group.totalPrice.toFixed(2)} USD
                  </span>
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" />
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
