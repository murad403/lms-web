import { CalendarIcon, Clock, ExternalLink, User, Video } from 'lucide-react'
import { useTranslations } from 'next-intl';
import { useJoinLiveClassMutation, type LiveClassItem } from '@/redux/features/student/student.api';

type UpcomingLiveClassesProps = {
    classes: LiveClassItem[];
};

const UpcomingLiveClasses = ({ classes }: UpcomingLiveClassesProps) => {
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
                {classes.map((cls) => (
                    <div
                        key={cls.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-md"
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
                            className="px-4 py-3 bg-[#1B2E5A] text-white rounded-md text-xs sm:text-sm font-medium hover:bg-[#1B2E5A]/90 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
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
