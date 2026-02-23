"use client";
import { useTranslations } from "next-intl";
import LearningProgressStats from "./LearningProgressStats";
import ExamsAndAssessments from "./ExamsAndAssessments";
import LessonTracking from "./LessonTracking";

const LearningProgressPage = () => {

    const t = useTranslations("LearningProgress");

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-title">{t("title")}</h2>
                <p className="text-xs sm:text-sm text-description mt-1">
                    {t("description")}
                </p>
            </div>

            {/* Stats */}
            <LearningProgressStats />

            {/* Exams & Assessments */}
            <ExamsAndAssessments />

            {/* Lesson Tracking */}
            <LessonTracking />
        </div>
    );
};

export default LearningProgressPage;
