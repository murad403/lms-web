"use client";
import { PaymentDetailsCard } from "@/components/affiliate/account/PaymentDetailsCard";
import { ProfileInformationCard } from "@/components/affiliate/account/Profileinformationcard";
import React from "react";

const page = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      <div>
        <ProfileInformationCard
          initialName="John Doe"
          initialEmail="john.doe@email.com"
          onSave={async ({ name, email }) => {
            console.log(name, email);
          }}
          className="w-full"
        />
      </div>

      <div>
        <PaymentDetailsCard
          initialIban="DE89 3704 0044 0532 0130 00"
          initialTaxId="DE123456789"
          onSave={async ({ iban, taxId }) => {
            console.log(iban, taxId);
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default page;
