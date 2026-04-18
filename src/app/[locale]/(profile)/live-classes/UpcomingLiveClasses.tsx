import { CalendarIcon, Clock, ExternalLink, User, Video } from 'lucide-react'
import { useTranslations } from 'next-intl';
import { useJoinLiveClassMutation } from '@/redux/features/student/student.api';
import { type LiveClassItem } from '@/redux/features/student/student.type';
import { Skeleton } from '@/components/ui/skeleton';

type UpcomingLiveClassesProps = {
    classes: LiveClassItem[];
    isLoading?: boolean;
};

const UpcomingLiveClasses = ({ classes, isLoading = false }: UpcomingLiveClassesProps) => {
    const t = useTranslations("LiveClasses");
    const [joinLiveClass, { isLoading: isJoining }] = useJoinLiveClassMutation();

    const handleJoinNow = async (liveClassId: number) => {
        try {
            const res = await joinLiveClass(liveClassId).unwrap();
            const link = res?.data?.class_link;
            if (link) {
                window.open(link, "_blank", "noopener,noreferrer");
            }
        } catch {
            // Keep UI behavior unchanged if request fails.
        }
    };

    return (
        <div className="bg-white rounded-md border border-border-light p-4 sm:p-6">
            <h3 className="text-base font-bold text-title mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-main" />
                {t("upcomingLiveClasses")}
            </h3>
            <div className="space-y-3">
                {isLoading &&
                    Array.from({ length: 2 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 border border-border-light rounded-md"
                        >
                            <div className="min-w-0 flex-1 space-y-2">
                                <Skeleton className="h-6 w-44" />
                                <Skeleton className="h-4 w-56" />
                                <div className="flex flex-wrap items-center gap-3 pt-1">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>
                            <Skeleton className="h-11 w-28 rounded-md shrink-0" />
                        </div>
                    ))}

                {!isLoading && classes.length === 0 && (
                    <p className="text-sm text-description">No live class available.</p>
                )}

                {!isLoading && classes.map((cls) => (
                    <div
                        key={cls.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 border border-border-light rounded-md"
                    >
                        <div className="min-w-0 flex-1">
                            <h4 className="text-lg font-medium text-main">{cls.title}</h4>
                            <p className="text-sm text-description mt-0.5">{cls.course_title}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-description">
                                <span className="flex items-center gap-1">
                                    <User className="w-3.5 h-3.5" />
                                    {cls.instructor_name}
                                </span>
                                <span className="flex items-center gap-1">
                                    <CalendarIcon className="w-3.5 h-3.5" />
                                    {cls.scheduled_date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {cls.scheduled_time}
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleJoinNow(cls.id)}
                            disabled={isJoining}
                            className="px-4 py-3 bg-[#1B2E5A] cursor-pointer text-white rounded-md text-xs sm:text-sm font-medium hover:bg-[#1B2E5A]/90 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                        >
                            <ExternalLink className="size-4" />
                            {t("joinNow")}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UpcomingLiveClasses
