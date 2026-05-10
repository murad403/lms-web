"use client";
import { BookOpen, Clock, UserCheck, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useOrganizationInstructorInvitationDashboardQuery } from '@/redux/features/organization/organization.api';
import { Skeleton } from '@/components/ui/skeleton';

const InstructorStats = () => {
    const t = useTranslations("OrganizationInstructors");
    const { data, isLoading } = useOrganizationInstructorInvitationDashboardQuery();
    const statsData = data?.data?.stats;

    const stats = [
        { labelKey: "totalInstructors", value: statsData?.total_instructors ?? 0, icon: Users, color: "bg-blue-50 text-blue-600" },
        { labelKey: "active", value: statsData?.active_instructors ?? 0, icon: UserCheck, color: "bg-green-50 text-green-600" },
        { labelKey: "pending", value: statsData?.pending_invitations ?? 0, icon: Clock, color: "bg-yellow-50 text-yellow-600" },
        { labelKey: "totalCourses", value: statsData?.total_courses ?? 0, icon: BookOpen, color: "bg-purple-50 text-purple-600" },
    ];

    if (isLoading && !statsData) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white p-5 flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-none shrink-0" />
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-7 w-10" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

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
                            <p className="text-2xl font-bold text-title">{String(stat.value).padStart(2, "0")}</p>
                            <p className="text-sm text-description">{t(stat.labelKey)}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default InstructorStats
