"use client";
import { useState } from "react";
import { FileText, CheckCircle, Clock, AlertCircle, MoreVertical, Plus, Search, X, Download } from "lucide-react";
import { contractStats, contracts, TContract } from "@/lib/organization";
import Image from "next/image";
import { useForm } from "react-hook-form";

type Tab = "list" | "revenue";

type AddContractForm = {
  user: string;
  role: string;
  expiryDate: string;
  contractFile: FileList | null;
  revenueSplit: string;
};

const statusColors: Record<string, string> = {
  Active: "bg-green-50 text-green-700",
  Pending: "bg-yellow-50 text-yellow-700",
  Expired: "bg-red-50 text-red-700",
};

const ContractsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("list");
  const [openAction, setOpenAction] = useState<string | null>(null);
  const [showAddContract, setShowAddContract] = useState(false);
  const [showContractDetails, setShowContractDetails] = useState(false);
  const [selectedContract, setSelectedContract] = useState<TContract | null>(null);

  const form = useForm<AddContractForm>();

  const stats = [
    { label: "Total Contracts", value: contractStats.totalContracts, icon: FileText, color: "bg-blue-50 text-blue-600" },
    { label: "Active", value: contractStats.activeContracts, icon: CheckCircle, color: "bg-green-50 text-green-600" },
    { label: "Pending", value: contractStats.pendingContracts, icon: Clock, color: "bg-yellow-50 text-yellow-600" },
    { label: "Expired", value: contractStats.expiredContracts, icon: AlertCircle, color: "bg-red-50 text-red-600" },
  ];

  const tabs: { key: Tab; label: string }[] = [
    { key: "list", label: "Contracts List" },
    { key: "revenue", label: "Revenue Split" },
  ];

  const handleAddContract = (data: AddContractForm) => {
    console.log("Add Contract:", data);
    setShowAddContract(false);
    form.reset();
  };

  const viewContractDetails = (contract: TContract) => {
    setSelectedContract(contract);
    setShowContractDetails(true);
    setOpenAction(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-title">Contracts</h1>
          <p className="text-sm text-description mt-1">Manage instructor contracts and revenue splits</p>
        </div>
        <button
          onClick={() => setShowAddContract(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Contract
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-5 flex items-center gap-4">
              <div className={`w-12 h-12 flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-title">{String(stat.value).padStart(2, "0")}</p>
                <p className="text-sm text-description">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white">
        <div className="border-b border-border-light flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.key
                  ? "text-main border-b-2 border-main"
                  : "text-description hover:text-title"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Contracts List Tab */}
          {activeTab === "list" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description" />
                  <input
                    type="text"
                    placeholder="Search contracts..."
                    className="pl-10 pr-4 py-2 text-sm border border-border-light focus:outline-none focus:border-main w-64"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-light">
                      <th className="text-left py-3 px-4 font-medium text-description">Instructor</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Course</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Revenue Share</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Expiry</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((contract) => (
                      <tr key={contract.id} className="border-b border-border-light last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image src={contract.avatar} alt={contract.instructor} fill className="object-cover" />
                            </div>
                            <span className="text-title font-medium">{contract.instructor}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-description">{contract.course}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-main rounded-full"
                                style={{ width: `${contract.revenueShare}%` }}
                              />
                            </div>
                            <span className="text-xs text-description">{contract.revenueShare}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-description">{contract.expiry}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 text-xs font-medium ${statusColors[contract.status]}`}>
                            {contract.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <button
                              onClick={() => setOpenAction(openAction === contract.id ? null : contract.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <MoreVertical className="w-4 h-4 text-description" />
                            </button>
                            {openAction === contract.id && (
                              <div className="absolute right-0 top-8 bg-white shadow-lg border border-border-light rounded z-10 w-44">
                                <button
                                  onClick={() => viewContractDetails(contract)}
                                  className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50"
                                >
                                  View Details
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">Edit Contract</button>
                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Terminate</button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Revenue Split Tab */}
          {activeTab === "revenue" && (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-light">
                      <th className="text-left py-3 px-4 font-medium text-description">Instructor</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Split Percentage</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Revenue Share</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Expiry</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((contract) => (
                      <tr key={contract.id} className="border-b border-border-light last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image src={contract.avatar} alt={contract.instructor} fill className="object-cover" />
                            </div>
                            <span className="text-title font-medium">{contract.instructor}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-title font-medium">{contract.splitPercentage}%</span>
                          <span className="text-description"> / {100 - contract.splitPercentage}%</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-main rounded-full"
                                style={{ width: `${contract.revenueShare}%` }}
                              />
                            </div>
                            <span className="text-xs text-description">{contract.revenueShare}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-description">{contract.expiry}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 text-xs font-medium ${statusColors[contract.status]}`}>
                            {contract.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => viewContractDetails(contract)}
                            className="text-sm text-main hover:text-main/80"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Contract Modal */}
      {showAddContract && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border-light">
              <h2 className="text-lg font-semibold text-title">Add Contract</h2>
              <button onClick={() => { setShowAddContract(false); form.reset(); }}>
                <X className="w-5 h-5 text-description" />
              </button>
            </div>
            <form onSubmit={form.handleSubmit(handleAddContract)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-title mb-1">Select User</label>
                <select
                  {...form.register("user", { required: true })}
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main bg-white"
                >
                  <option value="">Select instructor</option>
                  <option value="sarah">Sarah Johnson</option>
                  <option value="michael">Michael Chen</option>
                  <option value="emily">Emily Davis</option>
                  <option value="james">James Wilson</option>
                  <option value="lisa">Lisa Anderson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-title mb-1">Select Role</label>
                <select
                  {...form.register("role", { required: true })}
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main bg-white"
                >
                  <option value="">Select role</option>
                  <option value="Lead Instructor">Lead Instructor</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Assistant">Assistant</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-title mb-1">Contract Expiry Date</label>
                <input
                  {...form.register("expiryDate", { required: true })}
                  type="date"
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-title mb-1">Upload Contract</label>
                <div className="border-2 border-dashed border-border-light p-6 text-center">
                  <input
                    type="file"
                    {...form.register("contractFile")}
                    className="hidden"
                    id="contractFile"
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="contractFile" className="cursor-pointer">
                    <FileText className="w-8 h-8 text-description mx-auto mb-2" />
                    <p className="text-sm text-description">Click to upload or drag and drop</p>
                    <p className="text-xs text-description mt-1">PDF, DOC up to 10MB</p>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-title mb-1">Revenue Split %</label>
                <input
                  {...form.register("revenueSplit", { required: true })}
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main"
                  placeholder="e.g. 70"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowAddContract(false); form.reset(); }}
                  className="flex-1 px-4 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90"
                >
                  Add Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contract Details Modal */}
      {showContractDetails && selectedContract && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border-light">
              <h2 className="text-lg font-semibold text-title">Contract Details</h2>
              <button onClick={() => { setShowContractDetails(false); setSelectedContract(null); }}>
                <X className="w-5 h-5 text-description" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* Instructor Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src={selectedContract.avatar} alt={selectedContract.instructor} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-base font-semibold text-title">{selectedContract.instructor}</p>
                  <p className="text-sm text-description">{selectedContract.course}</p>
                </div>
                <span className={`ml-auto px-3 py-1 text-xs font-medium ${statusColors[selectedContract.status]}`}>
                  {selectedContract.status}
                </span>
              </div>

              {/* Contract Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50">
                  <p className="text-xs text-description">Revenue Share</p>
                  <p className="text-lg font-bold text-title">{selectedContract.revenueShare}%</p>
                </div>
                <div className="p-3 bg-gray-50">
                  <p className="text-xs text-description">Split</p>
                  <p className="text-lg font-bold text-title">{selectedContract.splitPercentage}/{100 - selectedContract.splitPercentage}</p>
                </div>
                <div className="p-3 bg-gray-50">
                  <p className="text-xs text-description">Signed Date</p>
                  <p className="text-sm font-medium text-title">{selectedContract.signedDate}</p>
                </div>
                <div className="p-3 bg-gray-50">
                  <p className="text-xs text-description">Expiry Date</p>
                  <p className="text-sm font-medium text-title">{selectedContract.expiry}</p>
                </div>
              </div>

              {/* Revenue Summary */}
              <div className="border border-border-light p-4">
                <h4 className="text-sm font-semibold text-title mb-3">Revenue Summary</h4>
                <div className="flex justify-between items-center py-2 border-b border-border-light">
                  <span className="text-sm text-description">Total Revenue</span>
                  <span className="text-sm font-medium text-title">$12,450.00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-description">Instructor Earnings</span>
                  <span className="text-sm font-medium text-title">${(12450 * selectedContract.revenueShare / 100).toFixed(2)}</span>
                </div>
              </div>

              {/* Terms */}
              <div className="border border-border-light p-4">
                <h4 className="text-sm font-semibold text-title mb-2">Terms & Conditions</h4>
                <p className="text-sm text-description leading-relaxed">
                  This contract establishes a revenue-sharing agreement between the organization and the instructor.
                  The instructor will receive {selectedContract.revenueShare}% of all course revenue. The contract
                  is valid until {selectedContract.expiry} and may be renewed upon mutual agreement.
                  Early termination requires 30 days written notice from either party.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowContractDetails(false); setSelectedContract(null); }}
                  className="flex-1 px-4 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractsPage;
