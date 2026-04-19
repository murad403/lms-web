import { Badge } from '@/components/ui/badge'
import { CalendarIcon, Clock, User } from 'lucide-react'
import React from 'react'
import { useTranslations } from 'next-intl'
import { InstructorLiveClassSession } from '@/redux/features/instructor/instructor.type'
import { Skeleton } from '@/components/ui/skeleton'

type LiveClassPastSessionsProps = {
    sessions?: InstructorLiveClassSession[];
    isLoading?: boolean;
};

const LiveClassPastSessions = ({ sessions, isLoading }: LiveClassPastSessionsProps) => {
    const t = useTranslations("InstructorLiveClasses");

    const pastSessions = sessions ?? [];

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
        const parsed = new Date(`1970-01-01T${value}`);
        if (Number.isNaN(parsed.getTime())) return value;
        return new Intl.DateTimeFormat(undefined, {
            hour: "numeric",
            minute: "2-digit",
        }).format(parsed);
    };

    return (

        <div>
            <h3 className="text-xl font-bold text-title mb-4">{t("pastSessions")}</h3>
            <div className="rounded-md border border-border-light p-5">
                <h4 className="text-base font-bold text-title mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-description" />
                    {t("pastLiveClasses")}
                </h4>
                <div className="space-y-3">
                    {isLoading ? Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col bg-white sm:flex-row sm:items-center justify-between gap-2 p-4 border border-border-light rounded-md"
                        >
                            <div className="min-w-0 w-full">
                                <div className="flex items-center gap-2 flex-wrap mb-2">
                                    <Skeleton className="h-5 w-64 max-w-full" />
                                    <Skeleton className="h-5 w-20" />
                                </div>
                                <Skeleton className="h-3 w-48 mb-2" />
                                <div className="flex flex-wrap items-center gap-3 mt-1">
                                    <Skeleton className="h-3 w-24" />
                                    <Skeleton className="h-3 w-24" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>
                        </div>
                    )) : pastSessions.length > 0 ? pastSessions.map((session) => (
                        <div
                            key={session.id}
                            className="flex flex-col bg-white sm:flex-row sm:items-center justify-between gap-2 p-4 border border-border-light rounded-md"
                        >
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="text-base font-medium text-title">{session.title}</h4>
                                    <Badge
                                        className={`text-xs bg-green-500 text-white ${!session.is_present ? 'bg-red-500' : ''}`}
                                    >
                                        {session.is_present ? 'Completed' : 'Missed'}
                                    </Badge>
                                </div>
                                <p className="text-xs text-description mt-0.5">{session.course_title}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-description">
                                    <span className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {session.instructor_name}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CalendarIcon className="w-3 h-3" />
                                        {formatDate(session.scheduled_date)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {formatTime(session.scheduled_time)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-sm text-description">No past live classes found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LiveClassPastSessions
