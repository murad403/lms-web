"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useTranslations } from "next-intl";
import PastSessions from "./PastSessions";
import UpcomingLiveClasses from "./UpcomingLiveClasses";

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
            <UpcomingLiveClasses/>

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
            <PastSessions />
        </div>
    );
};

export default LiveClassesPage;
