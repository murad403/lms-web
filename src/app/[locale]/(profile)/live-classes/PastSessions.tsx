import { Badge } from '@/components/ui/badge'
import { LiveClassItem } from '@/redux/features/student/student.type';
import { CalendarIcon, Clock, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Skeleton } from '@/components/ui/skeleton'

type PastSessionsProps = {
    sessions: LiveClassItem[];
    isLoading?: boolean;
};

const PastSessions = ({ sessions, isLoading = false }: PastSessionsProps) => {
    const t = useTranslations("LiveClasses");
    return (
        <div>
            <div className="bg-white rounded-md border border-border-light p-4 sm:p-6">
                <h3 className="text-lg font-bold text-title mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-description" />
                    {t("pastSessions")}
                </h3>
                <div className="space-y-3">
                    {isLoading &&
                        Array.from({ length: 2 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border border-border-light rounded-md p-4"
                            >
                                <div className="min-w-0 w-full space-y-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Skeleton className="h-5 w-44" />
                                        <Skeleton className="h-5 w-16 rounded-full" />
                                    </div>
                                    <Skeleton className="h-4 w-52" />
                                    <div className="flex flex-wrap items-center gap-3 mt-1">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                </div>
                            </div>
                        ))}

                    {!isLoading && sessions.map((session) => (
                        <div
                            key={session.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border border-border-light rounded-md p-4"
                        >
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="text-base font-medium text-main">{session.title}</h4>
                                    <Badge
                                        variant={session.status === "Attended" ? "default" : "destructive"}
                                        className={`text-[10px] ${session.status === "Attended"
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {session.status}
                                    </Badge>
                                </div>
                                <p className="text-xs text-description mt-0.5">{session.course_title}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-description">
                                    <span className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {session.instructor_name}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CalendarIcon className="w-3 h-3" />
                                        {session.scheduled_date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {session.scheduled_time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PastSessions
