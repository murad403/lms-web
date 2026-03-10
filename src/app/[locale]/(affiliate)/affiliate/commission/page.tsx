"use client";

import { PaymentProgressCard } from "@/components/commission/PaymentProgress";
import { RecentTransactionsCard } from "@/components/commission/RecentTransection";
import { WalletCard } from "@/components/commission/WalletCard";
import {
  CreditCard,
  Wallet,
  DollarSign
} from "lucide-react";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("AffiliateCommission");

  const demoWalletData = [
    {
      label: t("totalEarned"),
      amount: 213.75,
      icon: CreditCard,
      iconClassName: "text-green-500",
      iconBgClassName: "bg-green-50",
    },
    {
      label: t("pendingPayment"),
      amount: 1240.5,
      icon: Wallet,
      iconClassName: "text-amber-500",
      iconBgClassName: "bg-amber-50",
    },
    {
      label: t("totalPaid"),
      amount: 75.25,
      icon: DollarSign,
      iconClassName: "text-purple-500",
      iconBgClassName: "bg-purple-50",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{t("commissionWallet")}</h1>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {demoWalletData.map((item, idx) => (
          <div key={idx} className="w-full">
            <WalletCard
              label={item.label}
              amount={item.amount}
              icon={item.icon}
              iconClassName={item.iconClassName}
              iconBgClassName={item.iconBgClassName}
              className="w-full"
            />
          </div>
        ))}
      </div>
      <div>
        <PaymentProgressCard
          title={t("paymentProgress")}
          label={t("paidVsTotalEarned")}
          percent={92.5}
          className="w-full"
        />
      </div>
      <div>
        <RecentTransactionsCard
          title={t("recentTransactions")}
          currency="€"
          className="w-full"
          transactions={[
            {
              orderId: "ORD-8821",
              course: "Advanced React",
              date: "2/10/2026",
              amount: 44.85,
              status: "Paid",
            },
            {
              orderId: "ORD-8820",
              course: "TypeScript Mastery",
              date: "2/9/2026",
              amount: 29.85,
              status: "Approved",
            },
            {
              orderId: "ORD-8819",
              course: "Node.js Guide",
              date: "2/8/2026",
              amount: 37.35,
              status: "Pending",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Page;
