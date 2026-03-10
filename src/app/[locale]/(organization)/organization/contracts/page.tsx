"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import ContractStats from "./ContractStats";
import ContractList from "./ContractList";
import RevenueSplit from "./RevenueSplit";
import AddContractModal, { AddContractForm } from "@/components/modal/AddContractModal";
import { useTranslations } from "next-intl";

type Tab = "list" | "revenue";

const ContractsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("list");
  const [showAddContract, setShowAddContract] = useState(false);

  const form = useForm<AddContractForm>();
  const t = useTranslations("OrganizationContracts");

  const tabs: { key: Tab; labelKey: string }[] = [
    { key: "list", labelKey: "contractsList" },
    { key: "revenue", labelKey: "revenueSplit" },
  ];

  const handleAddContract = (data: AddContractForm) => {
    console.log("Add Contract:", data);
    setShowAddContract(false);
    form.reset();
  };

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
          className="flex items-center gap-2 px-4 py-2.5 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors w-full sm:w-auto justify-center sm:justify-start"
        >
          <Plus className="w-4 h-4" /> {t("addContract")}
        </button>
      </div>

      {/* Stats */}
      <ContractStats />

      {/* Tabs */}
      <div >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
          <div className="flex gap-1 bg-[#E7ECF4] px-3 py-2 rounded-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.key
                  ? "bg-white text-main"
                  : "text-description hover:bg-gray-100"
                  }`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {/* Contracts List Tab */}
          {activeTab === "list" && (
            <ContractList />
          )}

          {/* Revenue Split Tab */}
          {activeTab === "revenue" && (
            <RevenueSplit />
          )}
        </div>
      </div>

      <AddContractModal
        show={showAddContract}
        onClose={() => setShowAddContract(false)}
        form={form}
        onSubmit={handleAddContract}
      />
    </div>
  );
};

export default ContractsPage;
