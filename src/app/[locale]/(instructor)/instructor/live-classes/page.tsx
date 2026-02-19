"use client";
import { useState } from "react";
import LiveClassModal from "@/components/modal/LiveClassModal";
import LiveClassStats from "@/components/reusable/for-dashboard/LiveClassStats";
import LiveClassUpcomingAndCalendar from "@/components/reusable/for-dashboard/LiveClassUpcomingAndCalender";
import LiveClassPastSessions from "@/components/reusable/for-dashboard/LiveClassPastSessions";


const LiveClassPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <LiveClassStats />

      {/* Live Classes Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-title">Live Classes</h2>
          <p className="text-base text-description">Attend live sessions and access recordings</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors"
        >
          Schedule Live Class
        </button>
      </div>

      {/* Upcoming + Calendar */}
      <LiveClassUpcomingAndCalendar />

      {/* Past Sessions */}
      <LiveClassPastSessions />

      {/* Live Class Modal */}
      <LiveClassModal isShowDate={false} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LiveClassPage;
