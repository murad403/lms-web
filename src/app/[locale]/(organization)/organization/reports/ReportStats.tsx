import { reportStats } from '@/lib/organization';
import { BookOpen, Building, DollarSign, TrendingUp } from 'lucide-react';


const ReportStats = () => {
    const stats = [
        { label: "Total Revenue", value: `$${(reportStats.totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: "bg-blue-50 text-blue-600", increment: "+18% from last period" },
        { label: "Instructor Payouts", value: `$${(reportStats.instructorPayouts / 1000).toFixed(0)}K`, icon: TrendingUp, color: "bg-green-50 text-green-600", increment: "70% of total revenue" },
        { label: "Organization Share", value: `$${(reportStats.organizationShare / 1000).toFixed(0)}K`, icon: Building, color: "bg-purple-50 text-purple-600", increment: "30% of total revenue" },
        { label: "Avg Course Price", value: `$${reportStats.avgCoursePrice}`, icon: BookOpen, color: "bg-orange-50 text-orange-600", increment: "78% completion rate" },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.label} className="bg-white p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center ${stat.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-description">{stat.label}</p>
                            <p className="text-2xl font-bold text-title">{stat.value}</p>
                            <p className="text-xs text-green-500 mt-0.5">{stat.increment}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ReportStats
