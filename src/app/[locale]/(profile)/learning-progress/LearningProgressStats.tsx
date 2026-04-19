import { Award, FileText, TrendingUp, Clock } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton";
import { LearningProgressResponse } from "@/redux/features/student/student.type";
import { useTranslations } from 'next-intl';


type LearningProgressStatsProps = {
    data?: LearningProgressResponse;
    isLoading?: boolean;
};

const LearningProgressStats = ({ data, isLoading }: LearningProgressStatsProps) => {
    const t = useTranslations("LearningProgress");
    const averageCompletion = data?.average_completion_percentage ?? 0;
    const completedCourses = data?.total_completed_courses ?? 0;
    const certificatedCourses = data?.total_certificated_courses ?? 0;
    const completedQuizzes = data?.total_completed_quizzes ?? 0;
    // console.log(averageCompletion)

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-white rounded-md border border-border-light p-3 sm:p-6 flex items-center justify-between gap-3">
                {isLoading ? (
                    <>
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                    </>
                ) : (
                    <>
                        <div>
                            <p className="text-xs text-description">{t("averageCompletion")}</p>
                            <p className="text-lg sm:text-xl font-bold text-title">{averageCompletion.toFixed(2)}%</p>
                        </div>
                        <div className="bg-[#E5EAED] p-2 rounded-full">
                            <TrendingUp className="size-6 text-main shrink-0" />
                        </div>
                    </>
                )}
            </div>
            <div className="bg-white rounded-md border border-border-light p-3 sm:p-4 flex items-center justify-between gap-3">
                {isLoading ? (
                    <>
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-6 w-12" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                    </>
                ) : (
                    <>
                        <div>
                            <p className="text-xs text-description">{t("completedCourses")}</p>
                            <p className="text-lg sm:text-xl font-bold text-title">{completedCourses}</p>
                        </div>
                        <div className="bg-[#E5EAED] p-2 rounded-full">
                            <Clock className="size-6 text-success shrink-0" />
                        </div>
                    </>
                )}
            </div>
            <div className="bg-white rounded-md border border-border-light p-3 sm:p-4 flex items-center justify-between gap-3">
                {isLoading ? (
                    <>
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-6 w-12" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                    </>
                ) : (
                    <>
                        <div>
                            <p className="text-xs text-description">{t("certificateReady")}</p>
                            <p className="text-lg sm:text-xl font-bold text-title">{certificatedCourses} {t("courses")}</p>
                        </div>
                        <div className="bg-[#E5EAED] p-2 rounded-full">
                            <Award className="size-6 text-yellow-500 shrink-0" />
                        </div>
                    </>
                )}
            </div>
            <div className="bg-white rounded-md border border-border-light p-3 sm:p-4 flex items-center justify-between gap-3">
                {isLoading ? (
                    <>
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-6 w-12" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                    </>
                ) : (
                    <>
                        <div>
                            <p className="text-xs text-description">{t("completedQuizzes")}</p>
                            <p className="text-lg sm:text-xl font-bold text-title">{completedQuizzes}</p>
                        </div>
                        <div className="bg-[#E5EAED] p-2 rounded-full">
                            <FileText className="size-6 text-main shrink-0" />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default LearningProgressStats
