"use client";
import { PaymentMethodCard } from "@/components/affiliate/payment-status/Paymentmethodcard";
import { PayoutHistoryCard } from "@/components/affiliate/payment-status/Payouthistorycard";
import { Building2 } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      <div>
        <PaymentMethodCard
          methodName="Bank Transfer (IBAN)"
          accountNumber="DE89 3704 0044 0532 0130 00"
          note="Payments are processed monthly on the 1st"
          icon={Building2}
          className="w-full"
        />
      </div>
      <div>
        <PayoutHistoryCard
          title="Payout History"
          currency="€"
          className="w-full"
          payouts={[
            {
              payoutId: "PAY-2026-02-001",
              date: "February 1, 2026",
              method: "Bank Transfer (IBAN)",
              amount: 845.5,
              status: "Paid",
            },
            {
              payoutId: "PAY-2026-01-001",
              date: "January 1, 2026",
              method: "Bank Transfer (IBAN)",
              amount: 1125.75,
              status: "Paid",
            },
            {
              payoutId: "PAY-2025-12-001",
              date: "December 1, 2025",
              method: "Bank Transfer (IBAN)",
              amount: 660.5,
              status: "Pending",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default page;
