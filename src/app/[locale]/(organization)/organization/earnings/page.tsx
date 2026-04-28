"use client"
import InstructorEarningStats from '@/components/reusable/for-dashboard/InstructorEarningStats'
import RevenueChart from '@/components/reusable/for-dashboard/RevenueChart'
import WithdrawHistory from '@/components/reusable/for-dashboard/WithdrawHistory'
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

      </div>

      {/* Withdraw + Withdrawal History */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Withdrawal History */}
        <WithdrawHistory />
      </div>
    </div>
  )
}

export default EarningsPage;
