"use client";
import { useState } from "react";
import { Video, Calendar as CalendarIcon, Clock, User, ExternalLink, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { liveClassStats, instructorLiveClasses, instructorPastClasses } from "@/lib/instructor";
import LiveClassModal from "@/components/modal/LiveClassModal";


const LiveClassesPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 flex items-center justify-center">
            <Video className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-title">{liveClassStats.totalClasses}</p>
            <p className="text-sm text-description">Live Classes</p>
          </div>
        </div>
        <div className="bg-white p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 flex items-center justify-center">
            <CalendarIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-title">{liveClassStats.upcomingClasses.toString().padStart(2, "0")}</p>
            <p className="text-sm text-description">Upcoming Live Classes</p>
          </div>
        </div>
        <div className="bg-white p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 flex items-center justify-center">
            <Users className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-title">{liveClassStats.studentsEnrolled.toLocaleString()}</p>
            <p className="text-sm text-description">Students enrolled</p>
          </div>
        </div>
      </div>

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Live Classes */}
        <div className="col-span-2 p-5">
          <h3 className="text-base font-bold text-main mb-4 flex items-center gap-2">
            <Video className="w-5 h-5 text-main" />
            Upcoming Live Classes
          </h3>
          <div className="space-y-3">
            {instructorLiveClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-md"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-semibold text-title">{cls.title}</h4>
                  <p className="text-sm text-description mt-0.5">{cls.courseName}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-description">
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
                  className="px-4 py-2.5 bg-[#1B2E5A] text-white rounded-md text-sm font-medium hover:bg-[#1B2E5A]/90 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Class
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="p-5">
          <h3 className="text-base font-bold text-main mb-4">Live Classes Schedule</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </div>

      {/* Past Sessions */}
      <div>
        <h3 className="text-xl font-bold text-title mb-4">Past Sessions</h3>
        <div className="rounded-md border border-border-light p-5">
          <h4 className="text-base font-bold text-title mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-description" />
            Past Live Classes
          </h4>
          <div className="space-y-3">
            {instructorPastClasses.map((session) => (
              <div
                key={session.id}
                className="flex flex-col bg-white sm:flex-row sm:items-center justify-between gap-2 p-4 border border-border-light rounded-md"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base font-medium text-title">{session.title}</h4>
                    <Badge
                      className={`text-xs ${session.status === "Attended"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                        }`}
                    >
                      {session.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-description mt-0.5">{session.courseName}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-description">
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

      {/* Live Class Modal */}
      <LiveClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LiveClassesPage;
