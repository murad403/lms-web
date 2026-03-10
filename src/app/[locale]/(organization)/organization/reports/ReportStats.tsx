"use client";
import { reportStats } from '@/lib/organization';
import { BookOpen, Building, DollarSign, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';


const ReportStats = () => {
    const t = useTranslations("OrganizationReports");
    const stats = [
        { labelKey: "totalRevenue", value: `$${(reportStats.totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: "bg-blue-50 text-blue-600", incrementKey: "fromLastPeriod" },
        { labelKey: "instructorPayouts", value: `$${(reportStats.instructorPayouts / 1000).toFixed(0)}K`, icon: TrendingUp, color: "bg-green-50 text-green-600", incrementKey: "ofTotalRevenue70" },
        { labelKey: "organizationShare", value: `$${(reportStats.organizationShare / 1000).toFixed(0)}K`, icon: Building, color: "bg-purple-50 text-purple-600", incrementKey: "ofTotalRevenue30" },
        { labelKey: "avgCoursePrice", value: `$${reportStats.avgCoursePrice}`, icon: BookOpen, color: "bg-orange-50 text-orange-600", incrementKey: "completionRate" },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.labelKey} className="bg-white p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center ${stat.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-description">{t(stat.labelKey)}</p>
                            <p className="text-2xl font-bold text-title">{stat.value}</p>
                            <p className="text-xs text-green-500 mt-0.5">{t(stat.incrementKey)}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ReportStats
