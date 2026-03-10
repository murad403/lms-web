"use client";
import { CommissionWalletCard } from "@/components/affiliate/dashboard/Commissionwalletcard";
import {
  SaleRecord,
  SalesHistoryTable,
} from "@/components/affiliate/dashboard/Saleshistorytable";
import { AffiliateStatCard } from "@/components/affiliate/dashboard/StateCard";
import {
  MousePointerClick,
  BookOpen,
  Link2,
  CreditCard,
} from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

const salesData: SaleRecord[] = [
  {
    orderId: "ORD-8821",
    course: "Advanced React Development",
    customer: "Sarah Johnson",
    price: 299.0,
    commissionPercent: 15,
    commissionAmount: 44.85,
    status: "Paid",
    date: "Feb 10, 2026",
  },
  {
    orderId: "ORD-8820",
    course: "TypeScript Mastery",
    customer: "Michael Chen",
    price: 199.0,
    commissionPercent: 15,
    commissionAmount: 29.85,
    status: "Approved",
    date: "Feb 9, 2026",
  },
  {
    orderId: "ORD-8819",
    course: "Node.js Complete Guide",
    customer: "Emma Wilson",
    price: 249.0,
    commissionPercent: 15,
    commissionAmount: 37.35,
    status: "Pending",
    date: "Feb 8, 2026",
  },
  {
    orderId: "ORD-8818",
    course: "Full Stack Web Development",
    customer: "James Brown",
    price: 399.0,
    commissionPercent: 15,
    commissionAmount: 59.85,
    status: "Paid",
    date: "Feb 7, 2026",
  },
  {
    orderId: "ORD-8817",
    course: "Python for Data Science",
    customer: "Olivia Martinez",
    price: 279.0,
    commissionPercent: 15,
    commissionAmount: 41.85,
    status: "Approved",
    date: "Feb 6, 2026",
  },
  {
    orderId: "ORD-8816",
    course: "UI/UX Design Fundamentals",
    customer: "Liam Thompson",
    price: 179.0,
    commissionPercent: 15,
    commissionAmount: 26.85,
    status: "Paid",
    date: "Feb 5, 2026",
  },
  {
    orderId: "ORD-8815",
    course: "GraphQL for Beginners",
    customer: "Sophia Davis",
    price: 149.0,
    commissionPercent: 15,
    commissionAmount: 22.35,
    status: "Pending",
    date: "Feb 4, 2026",
  },
  {
    orderId: "ORD-8814",
    course: "Docker & Kubernetes",
    customer: "Noah Garcia",
    price: 329.0,
    commissionPercent: 15,
    commissionAmount: 49.35,
    status: "Approved",
    date: "Feb 3, 2026",
  },
  {
    orderId: "ORD-8813",
    course: "Machine Learning A-Z",
    customer: "Isabella Lee",
    price: 449.0,
    commissionPercent: 15,
    commissionAmount: 67.35,
    status: "Paid",
    date: "Feb 2, 2026",
  },
  {
    orderId: "ORD-8812",
    course: "AWS Cloud Practitioner",
    customer: "Ethan White",
    price: 219.0,
    commissionPercent: 15,
    commissionAmount: 32.85,
    status: "Paid",
    date: "Feb 1, 2026",
  },
];

const Page = () => {
  const t = useTranslations("AffiliateDashboard");

  const demoData = [
    {
      title: t("totalClicksSales"),
      value: "3,247",
      change: 12.5,
      icon: MousePointerClick,
      iconClassName: "text-orange-500",
      iconBgClassName: "bg-orange-50",
    },
    {
      title: t("totalSales"),
      value: "1,245",
      change: 8.2,
      icon: BookOpen,
      iconClassName: "text-blue-500",
      iconBgClassName: "bg-blue-50",
    },
    {
      title: t("totalEarned"),
      value: "512",
      change: -4.3,
      icon: Link2,
      iconClassName: "text-green-500",
      iconBgClassName: "bg-green-50",
    },
    {
      title: t("pendingCommissions"),
      value: "$12,450",
      change: 15.7,
      icon: CreditCard,
      iconClassName: "text-purple-500",
      iconBgClassName: "bg-purple-50",
    },
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

      <div>
        <CommissionWalletCard
          title={t("salesCommissionWallet")}
          totalEarned={2845.5}
          totalPayable={213.75}
          totalPaid={2631.75}
          currency="€"
          className="w-full"
        />
      </div>
      <div>
        <SalesHistoryTable data={salesData} currency="€" className="w-full" />
      </div>
    </div>
  );
};

export default Page;
