"use client"
import LiveClassModal from '@/components/modal/LiveClassModal';
import LiveClassPastSessions from '@/components/reusable/for-dashboard/LiveClassPastSessions';
import LiveClassStats from '@/components/reusable/for-dashboard/LiveClassStats'
import LiveClassUpcomingAndCalendar from '@/components/reusable/for-dashboard/LiveClassUpcomingAndCalender';
import React, { useState } from 'react'

const LiveClassPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowDate, setIsShowDate] = useState(true);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <LiveClassStats />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-title">Live Classes</h2>
          <p className="text-base text-description">Attend live sessions and access recordings</p>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={() => {setIsModalOpen(true); setIsShowDate(true);}}
            className="px-5 py-3 bg-[#FFFFFF] text-main text-sm font-semibold hover:bg-[#FFFFFF]/90 transition-colors"
          >
            Schedule Live Class
          </button>
          <button
            onClick={() => {setIsModalOpen(true); setIsShowDate(false);}}
            className="px-5 py-3 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors"
          >
            Host Live Class
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
