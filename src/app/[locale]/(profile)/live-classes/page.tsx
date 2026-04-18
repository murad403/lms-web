"use client";
import { useTranslations } from "next-intl";
import PastSessions from "./PastSessions";
import UpcomingLiveClasses from "./UpcomingLiveClasses";
import { useUpcomingLiveClassQuery } from "@/redux/features/student/student.api";
import { Skeleton } from "@/components/ui/skeleton";

const LiveClassesPage = () => {
    const t = useTranslations("LiveClasses");
    const { data: liveClassData, isLoading } = useUpcomingLiveClassQuery();

    const upcomingLiveClasses = liveClassData?.data?.upcoming_live_classes ?? [];
    const pastLiveClasses = liveClassData?.data?.past_live_classes ?? [];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-title">{t("title")}</h2>
                <p className="text-xs sm:text-sm text-description mt-1">
                    {t("description")}
                </p>
            </div>

            {isLoading && (
                <div className="space-y-4">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
            )}

            {!isLoading && upcomingLiveClasses.length === 0 && pastLiveClasses.length === 0 && (
                <p className="text-sm text-description">No live classes found.</p>
            )}

            {/* Upcoming Live Classes */}
            <UpcomingLiveClasses classes={upcomingLiveClasses} />

            {/* Calendar */}
            {/* <div className="bg-white rounded-md border border-border-light p-4 sm:p-6">
                <h3 className="text-lg font-bold text-title mb-4">{t("title")}</h3>
                <div className="flex justify-start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
                </div>
            </div> */}

            {/* Past Sessions */}
            <PastSessions sessions={pastLiveClasses} />
        </div>
    );
};

export default LiveClassesPage;
