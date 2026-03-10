"use client"
import InstructorEarningStats from '@/components/reusable/for-dashboard/InstructorEarningStats'
import PaymentCards from '@/components/reusable/for-dashboard/PaymentCards'
import RevenueChart from '@/components/reusable/for-dashboard/RevenueChart'
import WithdrawHistory from '@/components/reusable/for-dashboard/WithdrawHistory'
import WithdrawSection from '@/components/reusable/for-dashboard/WithdrawSection'
import { revenueData } from '@/lib/instructor'
import { useTranslations } from 'next-intl'


const EarningsPage = () => {
  const t = useTranslations("InstructorEarnings");
  return (
    <div className="space-y-6">
      {/* Stats */}
      <InstructorEarningStats />

      {/* Statistics + Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart pathColor="#23BD33" strokeColor="#23BD33" title={t("statistic")} data={revenueData} />
        </div>

        {/* Cards */}
        <PaymentCards />
      </div>

      {/* Withdraw + Withdrawal History */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Withdraw Section */}
        <WithdrawSection />

        {/* Withdrawal History */}
        <WithdrawHistory />
      </div>
    </div>
  )
}

export default EarningsPage;
