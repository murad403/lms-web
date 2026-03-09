"use client"
import { Calendar } from '@/components/ui/calendar'
import { instructorLiveClasses } from '@/lib/instructor'
import { CalendarIcon, Clock, ExternalLink, User, Video } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

const LiveClassUpcomingAndCalendar = () => {

    const [date, setDate] = useState<Date | undefined>(new Date());
    const t = useTranslations("InstructorLiveClasses");


    return (
        < div className="grid grid-cols-1 xl:grid-cols-3 gap-6" >
            {/* Upcoming Live Classes */}
            <div className="xl:col-span-2" >
                <h3 className="text-base font-bold text-main mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5 text-main" />
                    {t("upcomingLiveClasses")}
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
                                {t("liveClass")}
                            </a>
                        </div>
                    ))}
                </div>
            </div >

            {/* Calendar */}
            < div className="" >
                <h3 className="text-base font-bold text-main mb-4">{t("liveClassesSchedule")}</h3>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
            </ div>
        </div >
    )
}

export default LiveClassUpcomingAndCalendar
