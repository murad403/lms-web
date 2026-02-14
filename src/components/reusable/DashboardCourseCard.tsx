"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type DashboardCourseCardProps = {
    course: {
        id: number;
        title: string;
        image: string;
        lessonNumber?: number;
        lessonTitle?: string;
        progress?: number;
    };
};

const DashboardCourseCard = ({ course }: DashboardCourseCardProps) => {
    const t = useTranslations("DashboardCourseCard");
    return (
        <div className="bg-white rounded-md overflow-hidden border border-border-light hover:shadow-md transition-shadow">
            <div className="relative h-40 sm:h-60 w-full">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-3 sm:p-4">
                <p className="text-[10px] sm:text-sm text-description mb-1 truncate">
                    {course.title}
                </p>
                <p className="text-sm font-semibold text-title pb-3 mb-3 line-clamp-1 border-b border-border-light">
                    {course.lessonNumber}. {course.lessonTitle}
                </p>
                <div className="flex items-center justify-between">
                    <Link
                        href={`/course-player/${course.id}`}
                        className={`block text-center py-3 px-5 rounded text-xs sm:text-sm font-semibold transition-colors ${course.progress && course.progress > 0
                            ? "bg-white border border-main text-main hover:bg-main/5"
                            : "bg-main text-white hover:bg-main/90"
                            }`}
                    >
                        {t("watchLecture")}
                    </Link>
                    {course.progress !== undefined && course.progress > 0 && (
                        <p className="text-sm text-green-500 mt-2 text-center font-medium">
                            {course.progress}% {t("completed")}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardCourseCard;
