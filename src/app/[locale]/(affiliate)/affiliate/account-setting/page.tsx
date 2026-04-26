"use client";
import { ProfileInformationCard } from "@/app/[locale]/(affiliate)/affiliate/account-setting/Profileinformationcard";
import ChangePassword from "@/components/reusable/for-dashboard/ChangePassword";

const page = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      <div>
        <ProfileInformationCard className="w-full" />
      </div>

      <ChangePassword />
    </div>
  );
};

export default page;
