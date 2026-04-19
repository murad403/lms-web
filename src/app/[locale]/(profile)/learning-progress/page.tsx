"use client";
import { useTranslations } from "next-intl";
import { useLearningProgressQuery, useLessonTrackingQuery } from "@/redux/features/student/student.api";
import LearningProgressStats from "./LearningProgressStats";
import ExamsAndAssessments from "./ExamsAndAssessments";
import LessonTracking from "./LessonTracking";

const LearningProgressPage = () => {

    const t = useTranslations("LearningProgress");
    const { data: learningProgressResponse, isLoading: isLearningProgressLoading, isFetching: isLearningProgressFetching } = useLearningProgressQuery();
    const { data: lessonTrackingResponse, isLoading: isLessonTrackingLoading, isFetching: isLessonTrackingFetching } = useLessonTrackingQuery();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-title">{t("title")}</h2>
                <p className="text-xs sm:text-sm text-description mt-1">
                    {t("description")}
                </p>
            </div>

            {/* Stats */}
            <LearningProgressStats
                data={learningProgressResponse}
                isLoading={isLearningProgressLoading || isLearningProgressFetching}
            />

            {/* Exams & Assessments */}
            <ExamsAndAssessments
                data={learningProgressResponse?.data ?? []}
                isLoading={isLearningProgressLoading || isLearningProgressFetching}
            />

            {/* Lesson Tracking */}
            <LessonTracking
                data={lessonTrackingResponse?.data ?? []}
                isLoading={isLessonTrackingLoading || isLessonTrackingFetching}
            />
        </div>
    );
};

export default LearningProgressPage;
