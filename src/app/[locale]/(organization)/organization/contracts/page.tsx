"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import ContractStats from "./ContractStats";
import ContractList from "./ContractList";
import AddContractModal from "@/components/modal/AddContractModal";
import { useTranslations } from "next-intl";

const ContractsPage = () => {
  const [showAddContract, setShowAddContract] = useState(false);
  const t = useTranslations("OrganizationContracts");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-title">{t("title")}</h1>
          <p className="text-sm text-description mt-1">{t("description")}</p>
        </div>
        <button
          onClick={() => setShowAddContract(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors w-full sm:w-auto justify-center sm:justify-start cursor-pointer"
        >
          <Plus className="w-4 h-4" /> {t("addContract")}
        </button>
      </div>

      {/* Stats */}
      <ContractStats />

      <ContractList />

      <AddContractModal
        show={showAddContract}
        onClose={() => setShowAddContract(false)}
      />
    </div>
  );
};

export default ContractsPage;
