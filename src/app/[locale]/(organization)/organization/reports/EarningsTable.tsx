"use client";
import { useTranslations } from 'next-intl';
import { useGetRecentActivityQuery } from '@/redux/features/organization/organization.api';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

const EarningsTable = () => {
  const t = useTranslations("OrganizationReports");
  const { data, isLoading } = useGetRecentActivityQuery();
  const recentCommissions = data?.data?.recent_commissions?.data || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-border-light p-6 space-y-4">
        <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
        </div>
        <div className="space-y-3">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-border-light">
      <div className="p-5 flex items-center justify-between border-b border-border-light">
        <div>
            <h3 className="text-lg font-bold text-title">{t("earnings")}</h3>
            <p className="text-xs text-description mt-0.5">Recent payout distributions</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="text-left px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">{t("orderId")}</th>
              <th className="text-left px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">{t("date")}</th>
              <th className="text-left px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">{t("course")}</th>
              <th className="text-right px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">{t("amount")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {recentCommissions.length > 0 ? (
                recentCommissions.map((commission) => (
                    <tr key={commission.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-main font-bold text-xs bg-main/5 px-2 py-1 rounded">COM-{commission.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-description text-xs font-medium">
                            {format(new Date(commission.created_at), 'dd MMM yyyy')}
                        </td>
                        <td className="px-6 py-4 text-title font-medium">
                            <div className="flex flex-col">
                                <span className="truncate max-w-[200px]">{commission.course_title}</span>
                                <span className="text-[10px] text-description font-normal">Student: {commission.user_name}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                            <div className="flex flex-col items-end">
                                <span className="text-title font-bold">${parseFloat(commission.organization_received).toFixed(2)}</span>
                                <span className="text-[10px] text-green-500 font-bold uppercase">Success</span>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-description">
                        No recent earnings found
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EarningsTable;
