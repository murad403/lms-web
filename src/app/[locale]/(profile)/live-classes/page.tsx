"use client";
import { useState } from "react";
import { Video, Calendar as CalendarIcon, Clock, User, ExternalLink } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { upcomingLiveClasses, pastSessions } from "@/lib/profile";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

const LiveClassesPage = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const t = useTranslations("LiveClasses");

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-title">{t("title")}</h2>
                <p className="text-xs sm:text-sm text-description mt-1">
                    {t("description")}
                </p>
            </div>

            {/* Upcoming Live Classes */}
            <div className="bg-white rounded-md border border-border-light p-4 sm:p-6">
                <h3 className="text-base font-bold text-title mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5 text-main" />
                    {t("upcomingLiveClasses")}
                </h3>
                <div className="space-y-3">
                    {upcomingLiveClasses.map((cls) => (
                        <div
                            key={cls.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-md"
                        >
                            <div className="min-w-0 flex-1">
                                <h4 className="text-lg font-medium text-main">{cls.title}</h4>
                                <p className="text-sm text-description mt-0.5">{cls.courseName}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-description">
                                    <span className="flex items-center gap-1">
                                        <User className="w-3.5 h-3.5" />
                                        {cls.instructor}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CalendarIcon className="w-3.5 h-3.5" />
                                        {cls.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {cls.time}
                                    </span>
                                </div>
                            </div>
                            <a
                                href={cls.meetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-3 bg-[#1B2E5A] text-white rounded-md text-xs sm:text-sm font-medium hover:bg-[#1B2E5A]/90 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                            >
                                <ExternalLink className="size-4" />
                                {t("joinNow")}
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-md border border-border-light p-4 sm:p-6">
                <h3 className="text-lg font-bold text-title mb-4">{t("title")}</h3>
                <div className="flex justify-start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
                </div>
            </div>

            {/* Past Sessions */}
            <div className="bg-white rounded-md border border-border-light p-4 sm:p-6">
                <h3 className="text-lg font-bold text-title mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-description" />
                    {t("pastSessions")}
                </h3>
                <div className="space-y-3">
                    {pastSessions.map((session) => (
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
                                <p className="text-xs text-description mt-0.5">{session.courseName}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-description">
                                    <span className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {session.instructor}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CalendarIcon className="w-3 h-3" />
                                        {session.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {session.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveClassesPage;
