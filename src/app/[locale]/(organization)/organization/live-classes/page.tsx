"use client"
import LiveClassModal from '@/components/modal/LiveClassModal';
import LiveClassPastSessions from '@/components/reusable/for-dashboard/LiveClassPastSessions';
import LiveClassStats from '@/components/reusable/for-dashboard/LiveClassStats'
import LiveClassUpcomingAndCalendar from '@/components/reusable/for-dashboard/UpcomingLiveClass';
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

const LiveClassPage = () => {
  const t = useTranslations("InstructorLiveClasses");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowDate, setIsShowDate] = useState(true);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <LiveClassStats />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-title">{t("liveClasses")}</h2>
          <p className="text-sm sm:text-base text-description">{t("attendLiveDesc")}</p>
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
          <button
            onClick={() => {setIsModalOpen(true); setIsShowDate(true);}}
            className="px-5 py-3 bg-[#FFFFFF] text-main text-sm font-semibold hover:bg-[#FFFFFF]/90 transition-colors w-full sm:w-auto"
          >
            {t("scheduleLiveClass")}
          </button>
          <button
            onClick={() => {setIsModalOpen(true); setIsShowDate(false);}}
            className="px-5 py-3 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors w-full sm:w-auto"
          >
            {t("hostLiveClass")}
          </button>
        </div>
      </div>

      {/* Upcoming + Calendar */}
      <LiveClassUpcomingAndCalendar />

      {/* Past Sessions */}
      <LiveClassPastSessions />

      {/* Live Class Modal */}
      <LiveClassModal isShowDate={isShowDate} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  )
}

export default LiveClassPage;
