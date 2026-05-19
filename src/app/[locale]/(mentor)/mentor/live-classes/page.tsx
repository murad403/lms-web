"use client";
import { useState } from "react";
import LiveClassModal from "@/components/modal/LiveClassModal";
import LiveClassStats from "@/components/reusable/for-dashboard/LiveClassStats";
import LiveClassPastSessions from "@/components/reusable/for-dashboard/LiveClassPastSessions";
import { useTranslations } from "next-intl";
import UpcomingLiveClasses from "@/components/reusable/for-dashboard/UpcomingLiveClass";
import { useGetMentorLiveClassesQuery } from "@/redux/features/mentor/mentor.api";
import { InstructorLiveClassesStatsData } from "@/redux/features/instructor/instructor.type";


const LiveClassPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("InstructorLiveClasses");
  const { data: liveClassStatsResponse, isLoading, isFetching } = useGetMentorLiveClassesQuery(undefined);
  const liveClassData = liveClassStatsResponse?.data;
  const isLiveClassLoading = isLoading || isFetching;

  // Map mentor live classes response to the shape expected by the reusable components
  const mappedData: InstructorLiveClassesStatsData | undefined = liveClassData ? {
    total_live_classes: liveClassData.total_live_classes,
    upcoming_live_classes_count: liveClassData.upcoming_live_classes_count,
    students_enrolled: liveClassData?.total_enrolled_students, // Default to 0 as it is not present in the mentor response data
    upcoming_sessions: liveClassData.upcoming_live_classes || [],
    past_sessions: liveClassData.past_live_classes || [],
  } : undefined;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <LiveClassStats
        data={mappedData}
        isLoading={isLiveClassLoading}
      />

      {/* Live Classes Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-title">{t("liveClasses")}</h2>
          <p className="text-sm sm:text-base text-description">{t("attendLiveDesc")}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors w-full sm:w-auto shrink-0 cursor-pointer"
        >
          {t("scheduleLiveClass")}
        </button>
      </div>

      <UpcomingLiveClasses
        sessions={mappedData?.upcoming_sessions}
        isLoading={isLiveClassLoading}
      />

      {/* Past Sessions */}
      <LiveClassPastSessions
        sessions={mappedData?.past_sessions}
        isLoading={isLiveClassLoading}
      />

      {/* Live Class Modal */}
      <LiveClassModal isShowDate={false} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} role="mentor" />
    </div>
  );
};

export default LiveClassPage;
