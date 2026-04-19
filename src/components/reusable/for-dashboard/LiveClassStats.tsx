import { CalendarIcon, Users, Video } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Skeleton } from '@/components/ui/skeleton';
import { InstructorLiveClassesStatsData } from '@/redux/features/instructor/instructor.type';

type LiveClassStatsProps = {
    data?: InstructorLiveClassesStatsData;
    isLoading?: boolean;
};

const LiveClassStats = ({ data, isLoading }: LiveClassStatsProps) => {
    const t = useTranslations("InstructorLiveClasses");

    const totalLiveClasses = data?.total_live_classes ?? 0;
    const upcomingLiveClasses = data?.upcoming_live_classes_count ?? 0;
    const studentsEnrolled = data?.students_enrolled ?? 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center">
                    <Video className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    {isLoading ? <Skeleton className="h-8 w-16 mb-1" /> : <p className="text-2xl font-bold text-title">{totalLiveClasses}</p>}
                    <p className="text-sm text-description">{t("liveClasses")}</p>
                </div>
            </div>
            <div className="bg-white p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 flex items-center justify-center">
                    <CalendarIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    {isLoading ? <Skeleton className="h-8 w-16 mb-1" /> : <p className="text-2xl font-bold text-title">{upcomingLiveClasses.toString().padStart(2, "0")}</p>}
                    <p className="text-sm text-description">{t("upcomingLiveClasses")}</p>
                </div>
            </div>
            <div className="bg-white p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 flex items-center justify-center">
                    <Users className="w-6 h-6 text-red-600" />
                </div>
                <div>
                    {isLoading ? <Skeleton className="h-8 w-16 mb-1" /> : <p className="text-2xl font-bold text-title">{studentsEnrolled.toLocaleString()}</p>}
                    <p className="text-sm text-description">{t("studentsEnrolled")}</p>
                </div>
            </div>
        </div>
    )
}

export default LiveClassStats
