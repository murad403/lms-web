import { Award, Clock, FileText, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl';
import React from 'react'

const LearningProgressStats = () => {
    const t = useTranslations("LearningProgress");
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-white rounded-md border border-border-light p-3 sm:p-6 flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs text-description">{t("totalHours")}</p>
                    <p className="text-lg sm:text-xl font-bold text-title">45.5h</p>
                </div>
                <div className="bg-[#E5EAED] p-2 rounded-full">
                    <Clock className="size-6 text-main shrink-0" />
                </div>
            </div>
            <div className="bg-white rounded-md border border-border-light p-3 sm:p-4 flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs text-description">{t("completion")}</p>
                    <p className="text-lg sm:text-xl font-bold text-title">68%</p>
                </div>
                <div className="bg-[#E5EAED] p-2 rounded-full">
                    <TrendingUp className="size-6 text-success shrink-0" />
                </div>
            </div>
            <div className="bg-white rounded-md border border-border-light p-3 sm:p-4 flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs text-description">{t("examEligible")}</p>
                    <p className="text-lg sm:text-xl font-bold text-title">2 {t("courses")}</p>
                </div>
                <div className="bg-[#E5EAED] p-2 rounded-full">
                    <FileText className="size-6 text-main shrink-0" />
                </div>
            </div>
            <div className="bg-white rounded-md border border-border-light p-3 sm:p-4 flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs text-description">{t("certificateReady")}</p>
                    <p className="text-lg sm:text-xl font-bold text-title">2 {t("courses")}</p>
                </div>
                <div className="bg-[#E5EAED] p-2 rounded-full">
                    <Award className="size-6 text-yellow-500 shrink-0" />
                </div>
            </div>
        </div>
    )
}

export default LearningProgressStats
