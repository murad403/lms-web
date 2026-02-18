"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Check, MoreHorizontal, X } from "lucide-react";
import { earningStats, paymentCards, withdrawalHistory, statisticData } from "@/lib/instructor";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import InstructorEarningStats from "./InstructorEarningStats";

type PaymentCardForm = {
  name: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
};



const EarningsPage = () => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [revenueFilter, setRevenueFilter] = useState("Revenue");
  const [cardView, setCardView] = useState(0);

  const { register, handleSubmit, reset } = useForm<PaymentCardForm>();

  const maxStat = Math.max(...statisticData.map((d) => d.value));

  const onAddCard = (data: PaymentCardForm) => {
    // TODO: API call to add card
    console.log("Adding card:", data);
    reset();
    setShowAddCard(false);
  };

  const statusColor: Record<string, string> = {
    Pending: "text-orange-500",
    Completed: "text-green-600",
    Cancelled: "text-red-500",
    "Cancel Withdraw": "text-red-500",
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <InstructorEarningStats/>

      {/* Statistics + Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
        {/* Statistics Chart */}
        <div className="bg-white rounded-lg border border-border-light p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-title">Statistics</h3>
            <select
              value={revenueFilter}
              onChange={(e) => setRevenueFilter(e.target.value)}
              className="text-sm text-description border border-gray-200 rounded-md px-2 py-1"
            >
              <option>Revenue</option>
              <option>Sales</option>
            </select>
          </div>
          <div className="relative h-48">
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-description w-8">
              <span>5m</span>
              <span>4m</span>
              <span>3m</span>
              <span>2m</span>
              <span>1m</span>
              <span>0</span>
            </div>
            <div className="ml-10 h-full relative">
              <svg className="w-full h-[calc(100%-24px)]" viewBox="0 0 300 150" preserveAspectRatio="none">
                {[0, 30, 60, 90, 120, 150].map((y) => (
                  <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#f0f0f0" strokeWidth="0.5" />
                ))}
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path
                  d={`M${statisticData.map((d, i) => {
                    const x = (i / (statisticData.length - 1)) * 300;
                    const y = 150 - (d.value / maxStat) * 150;
                    return `${x},${y}`;
                  }).join(" L")} L300,150 L0,150 Z`}
                  fill="url(#areaGradient)"
                />
                <polyline
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="2"
                  points={statisticData.map((d, i) => {
                    const x = (i / (statisticData.length - 1)) * 300;
                    const y = 150 - (d.value / maxStat) * 150;
                    return `${x},${y}`;
                  }).join(" ")}
                />
              </svg>
              <div className="flex justify-between text-xs text-description mt-1">
                {statisticData.map((d) => (
                  <span key={d.label}>{d.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="bg-white rounded-lg border border-border-light p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-title">Cards</h3>
            <select className="text-sm text-description border border-gray-200 rounded-md px-2 py-1">
              <option>Revenue</option>
            </select>
          </div>

          {/* Card Display */}
          {paymentCards[cardView] && (
            <div className="bg-gradient-to-br from-[#1B2E5A] to-[#0F1B35] rounded-xl p-5 text-white mb-4 relative">
              <button className="absolute top-3 right-3">
                <MoreHorizontal className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-lg font-bold uppercase">{paymentCards[cardView].type}</span>
              </div>
              <p className="text-lg tracking-wider font-mono mb-4">
                {paymentCards[cardView].type === "visa" ? "4855" : "3855"} **** **** ****
              </p>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-[10px] text-gray-300 uppercase">Expires</p>
                  <p>{paymentCards[cardView].expiry}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-300 uppercase">Card Holder</p>
                  <p>{paymentCards[cardView].holderName}</p>
                </div>
              </div>
            </div>
          )}

          {/* Card Navigation */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {paymentCards.map((_, i) => (
              <button
                key={i}
                onClick={() => setCardView(i)}
                className={`w-2 h-2 rounded-full ${cardView === i ? "bg-main" : "bg-gray-300"}`}
              />
            ))}
          </div>

          {/* Add Card Button */}
          <button
            onClick={() => setShowAddCard(true)}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-description hover:border-main hover:text-main transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add new card
          </button>
        </div>
      </div>

      {/* Withdraw + Withdrawal History */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6">
        {/* Withdraw Section */}
        <div className="bg-white rounded-lg border border-border-light p-5">
          <h3 className="text-base font-bold text-title mb-4">Withdraw your money</h3>
          {/* Payment Methods */}
          <div className="space-y-3 mb-4">
            {paymentCards.map((card) => (
              <div key={card.id} className="flex items-center gap-3 p-3 border border-border-light rounded-md">
                <div className={`w-12 h-8 rounded flex items-center justify-center text-white text-[10px] font-bold ${card.type === "visa" ? "bg-blue-600" : "bg-orange-500"}`}>
                  {card.type.toUpperCase()}
                </div>
                <div className="flex-1 text-sm">
                  <span className="font-medium">{card.lastFour} **** **** ****</span>
                  <span className="text-description ml-2">{card.expiry}</span>
                </div>
                <span className="text-sm text-description">{card.holderName}</span>
                {card.isDefault && <Check className="w-5 h-5 text-green-500" />}
              </div>
            ))}
          </div>
          <p className="text-xs text-description mb-4">
            You will be redirected to the PayPal site after reviewing your order.
          </p>
          <p className="text-2xl font-bold text-title mb-4">
            ${earningStats.currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-description mb-2">Current Balance</p>
          <button className="w-full py-3 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors">
            Withdraw Money
          </button>
        </div>

        {/* Withdrawal History */}
        <div className="bg-white rounded-lg border border-border-light p-5">
          <h3 className="text-base font-bold text-title mb-4">Withdraw History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-description uppercase">Date</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-description uppercase">Method</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-description uppercase">Amount</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-description uppercase">Provider</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-description uppercase">Status</th>
                  <th className="py-3 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {withdrawalHistory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-3 px-2 text-description text-xs">{item.date}</td>
                    <td className="py-3 px-2 text-title">{item.method}</td>
                    <td className="py-3 px-2 text-title">{item.amount}</td>
                    <td className="py-3 px-2 text-title">{item.provider}</td>
                    <td className="py-3 px-2">
                      <span className={`font-medium ${statusColor[item.status] || "text-gray-600"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Payment Card Modal */}
      <AlertDialog open={showAddCard} onOpenChange={setShowAddCard}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center justify-between">
              <AlertDialogTitle className="text-lg font-bold text-title">New Payment Card</AlertDialogTitle>
              <button onClick={() => setShowAddCard(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(onAddCard)} className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-title mb-1 block">Name</label>
              <input
                {...register("name")}
                placeholder="Name on card"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-title mb-1 block">Card Number</label>
              <input
                {...register("cardNumber")}
                placeholder="Card number"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-title mb-1 block">MM / YY</label>
                <div className="grid grid-cols-2 gap-2">
                  <input {...register("expiryMonth")} placeholder="MM" className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main" />
                  <input {...register("expiryYear")} placeholder="YY" className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-title mb-1 block">CVC</label>
                <input {...register("cvc")} placeholder="Security Code" className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddCard(false)}
                className="flex-1 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors"
              >
                Add Payment Card
              </button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EarningsPage;
