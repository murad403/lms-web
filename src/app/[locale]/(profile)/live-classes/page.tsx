"use client";
import { useState } from "react";
import { Video, Calendar as CalendarIcon, Clock, User, ExternalLink } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { upcomingLiveClasses, pastSessions } from "@/lib/profile";
import { Badge } from "@/components/ui/badge";

const LiveClassesPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-title">Live Classes</h2>
        <p className="text-xs sm:text-sm text-description mt-1">
          Attend live sessions and access recordings
        </p>
      </div>

      {/* Upcoming Live Classes */}
      <div className="bg-white rounded-xl border border-border-light p-4 sm:p-6">
        <h3 className="text-base font-bold text-title mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-main" />
          Upcoming Live Classes
        </h3>
        <div className="space-y-3">
          {upcomingLiveClasses.map((cls) => (
            <div
              key={cls.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg"
            >
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-title">{cls.title}</h4>
                <p className="text-xs text-description mt-0.5">{cls.courseName}</p>
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
                className="px-4 py-2 bg-[#1B2E5A] text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#1B2E5A]/90 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                Join Now
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl border border-border-light p-4 sm:p-6">
        <h3 className="text-base font-bold text-title mb-4">Live Classes</h3>
        <div className="flex justify-start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
        </div>
      </div>

      {/* Past Sessions */}
      <div className="bg-white rounded-xl border border-border-light p-4 sm:p-6">
        <h3 className="text-base font-bold text-title mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-description" />
          Past Sessions
        </h3>
        <div className="space-y-3">
          {pastSessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-gray-50 last:border-b-0"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-title">{session.title}</h4>
                  <Badge
                    variant={session.status === "Attended" ? "default" : "destructive"}
                    className={`text-[10px] ${
                      session.status === "Attended"
                        ? "bg-green-50 text-green-600 hover:bg-green-100"
                        : "bg-red-50 text-red-500 hover:bg-red-100"
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
  );
};

export default LiveClassesPage;
