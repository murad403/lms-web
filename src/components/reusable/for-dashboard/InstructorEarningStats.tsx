import { ArrowDownCircle, CreditCard, DollarSign, Wallet } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Skeleton } from '@/components/ui/skeleton'
import { formatAmount } from '@/utils/formatter'

type InstructorEarningStatsProps = {
  totalRevenue?: string | number
  currentBalance?: string | number
  totalWithdrawals?: string | number
  todayRevenue?: string | number
  isLoading?: boolean
  currency?: string
}

const toAmountNumber = (value?: string | number) => {
  const parsed = typeof value === 'string' ? Number(value) : value
  return Number.isFinite(parsed) ? Number(parsed) : 0
}

const EarningStats = ({
  totalRevenue = 0,
  currentBalance = 0,
  totalWithdrawals = 0,
  todayRevenue = 0,
  isLoading = false,
  currency = '$',
}: InstructorEarningStatsProps) => {
  const t = useTranslations("InstructorEarnings");

  const stats = [
    {
      key: 'total-revenue',
      value: toAmountNumber(totalRevenue),
      label: t('totalRevenue'),
      icon: <DollarSign className="w-6 h-6 text-blue-600" />,
      iconClass: 'bg-blue-50',
    },
    {
      key: 'current-balance',
      value: toAmountNumber(currentBalance),
      label: t('currentBalance'),
      icon: <Wallet className="w-6 h-6 text-green-600" />,
      iconClass: 'bg-green-50',
    },
    {
      key: 'total-withdrawals',
      value: toAmountNumber(totalWithdrawals),
      label: t('totalWithdrawals'),
      icon: <ArrowDownCircle className="w-6 h-6 text-orange-600" />,
      iconClass: 'bg-orange-50',
    },
    {
      key: 'today-revenue',
      value: toAmountNumber(todayRevenue),
      label: t('todayRevenue'),
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      iconClass: 'bg-purple-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div key={item.key} className="bg-white p-5 flex items-center gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-28" />
                <Skeleton className="h-4 w-24" />
              </div>
            </>
          ) : (
            <>
              <div className={`w-12 h-12 ${item.iconClass} flex items-center justify-center`}>
                {item.icon}
              </div>
              <div>
                <p className="text-xl font-bold text-title">{formatAmount(item.value, currency)}</p>
                <p className="text-sm text-description">{item.label}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default EarningStats;
