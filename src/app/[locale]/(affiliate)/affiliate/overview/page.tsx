"use client";
import { AffiliateReferralCard } from "@/components/affiliate/dashboard/Affiliatereferralcard";
import { CommissionWalletCard } from "@/components/affiliate/dashboard/Commissionwalletcard";
import { SaleRecord, SalesHistoryTable} from "@/components/affiliate/dashboard/Saleshistorytable";
import { AffiliateStatCard } from "@/components/affiliate/dashboard/StateCard";
import { MousePointer2, ShoppingCart, Euro, Clock} from "lucide-react";
import { useTranslations } from "next-intl";


const Page = () => {
  const t = useTranslations("AffiliateDashboard");

  const demoData = [
    {
      title: t("totalClicks"),
      value: "3,247",
      change: 12.5,
      icon: MousePointer2,
      iconClassName: "text-orange-500",
      iconBgClassName: "bg-orange-50",
    },
    {
      title: t("totalSales"),
      value: "1,245",
      change: 8.2,
      icon: ShoppingCart,
      iconClassName: "text-blue-500",
      iconBgClassName: "bg-blue-50",
    },
    {
      title: t("totalEarned"),
      value: "$512",
      change: -4.3,
      icon: Euro,
      iconClassName: "text-green-500",
      iconBgClassName: "bg-green-50",
    },
    {
      title: t("pendingCommissions"),
      value: "$12,450",
      change: 15.7,
      icon: Clock,
      iconClassName: "text-purple-500",
      iconBgClassName: "bg-purple-50",
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {demoData.map((item, idx) => (
          <div key={idx} className="w-full">
            <AffiliateStatCard
              title={item.title}
              value={item.value}
              change={item.change}
              icon={item.icon}
              className="w-full"
              iconClassName={item.iconClassName}
              iconBgClassName={item.iconBgClassName}
            />
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Page;
