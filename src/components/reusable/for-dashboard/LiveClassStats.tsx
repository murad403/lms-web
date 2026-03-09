import { liveClassStats } from '@/lib/instructor'
import { CalendarIcon, Users, Video } from 'lucide-react'
import React from 'react'
import { useTranslations } from 'next-intl'

const LiveClassStats = () => {
    const t = useTranslations("InstructorLiveClasses");
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center">
                    <Video className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-title">{liveClassStats.totalClasses}</p>
                    <p className="text-sm text-description">{t("liveClasses")}</p>
                </div>
            </div>
            <div className="bg-white p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 flex items-center justify-center">
                    <CalendarIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-title">{liveClassStats.upcomingClasses.toString().padStart(2, "0")}</p>
                    <p className="text-sm text-description">{t("upcomingLiveClasses")}</p>
                </div>
            </div>
            <div className="bg-white p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 flex items-center justify-center">
                    <Users className="w-6 h-6 text-red-600" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-title">{liveClassStats.studentsEnrolled.toLocaleString()}</p>
                    <p className="text-sm text-description">{t("studentsEnrolled")}</p>
                </div>
            </div>
        </div>
    )
}

export default LiveClassStats
