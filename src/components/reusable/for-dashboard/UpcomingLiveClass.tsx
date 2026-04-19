"use client"
import { CalendarIcon, Clock, ExternalLink, User, Video } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Skeleton } from '@/components/ui/skeleton'
import { InstructorLiveClassSession } from '@/redux/features/instructor/instructor.type'

type UpcomingLiveClassesProps = {
    sessions?: InstructorLiveClassSession[];
    isLoading?: boolean;
};

const UpcomingLiveClasses = ({ sessions, isLoading }: UpcomingLiveClassesProps) => {
    const t = useTranslations("InstructorLiveClasses");
    const upcomingSessions = sessions ?? [];

    const formatDate = (value: string) => {
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return value;
        return new Intl.DateTimeFormat(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(parsed);
    };

    const formatTime = (value: string) => {
        if (!value) return "-";
        const date = new Date(`1970-01-01T${value}`);
        if (Number.isNaN(date.getTime())) return value;
        return new Intl.DateTimeFormat(undefined, {
            hour: "numeric",
            minute: "2-digit",
        }).format(date);
    };

    return (
        <div  className="rounded-md border border-border-light p-5">
            {/* Upcoming Live Classes */}
            <div className="xl:col-span-2" >
                <h3 className="text-base font-bold text-main mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5 text-main" />
                    {t("upcomingLiveClasses")}
                </h3>
                <div className="space-y-3">
                    {isLoading ? Array.from({ length: 2 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-md"
                        >
                            <div className="min-w-0 flex-1 space-y-2">
                                <Skeleton className="h-5 w-64 max-w-full" />
                                <Skeleton className="h-4 w-48 max-w-full" />
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                    <Skeleton className="h-3 w-24" />
                                    <Skeleton className="h-3 w-24" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>
                            <Skeleton className="h-10 w-28" />
                        </div>
                    )) : upcomingSessions.length > 0 ? upcomingSessions.map((cls) => (
                        <div
                            key={cls.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-md"
                        >
                            <div className="min-w-0 flex-1">
                                <h4 className="text-base font-semibold text-title">{cls.title}</h4>
                                <p className="text-sm text-description mt-0.5">{cls.course_title}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-description">
                                    <span className="flex items-center gap-1">
                                        <User className="w-3.5 h-3.5" />
                                        {cls.instructor_name}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CalendarIcon className="w-3.5 h-3.5" />
                                        {formatDate(cls.scheduled_date)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {formatTime(cls.scheduled_time)}
                                    </span>
                                </div>
                            </div>
                            <a
                                href={cls.class_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2.5 bg-[#1B2E5A] text-white rounded-md text-sm font-medium hover:bg-[#1B2E5A]/90 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                            >
                                <ExternalLink className="w-4 h-4" />
                                {t("liveClass")}
                            </a>
                        </div>
                    )) : (
                        <p className="text-sm text-description">No upcoming live classes found.</p>
                    )}
                </div>
            </div >
        </div >
    )
}

export default UpcomingLiveClasses
