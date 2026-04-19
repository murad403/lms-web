"use client"
import { useTranslations } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { LessonTrackingItem } from "@/redux/features/student/student.type";

type LessonTrackingProps = {
    data: LessonTrackingItem[];
    isLoading?: boolean;
};

const LessonTracking = ({ data, isLoading }: LessonTrackingProps) => {
    const [courseFilter, setCourseFilter] = useState("all");
    const [completionFilter, setCompletionFilter] = useState("all");
    const t = useTranslations("LearningProgress");

    const filteredLessons =
        data.filter((lesson) => {
            const matchesCourse = courseFilter === "all" || lesson.course_name === courseFilter;
            const matchesStatus =
                completionFilter === "all" ||
                lesson.is_completed.toString() === completionFilter;

            return matchesCourse && matchesStatus;
        });

    const uniqueCourses = [...new Set(data.map((lesson) => lesson.course_name))];

    const formatDate = (value: string | null) => {
        if (!value) return "-";
        return new Intl.DateTimeFormat(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(value));
    };

    return (
        <div className="bg-white rounded-md border border-border-light p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="text-base sm:text-lg font-bold text-title">
                    {t("lessonTracking")}
                </h3>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Select value={courseFilter} onValueChange={setCourseFilter}>
                        <SelectTrigger className="w-full sm:w-52">
                            <SelectValue placeholder={t("courseName")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("allCourses")}</SelectItem>
                            {uniqueCourses.map((courseName) => (
                                <SelectItem key={courseName} value={courseName}>
                                    {courseName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={completionFilter} onValueChange={setCompletionFilter}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder={t("status")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("allStatuses")}</SelectItem>
                            <SelectItem value="true">{t("completed")}</SelectItem>
                            <SelectItem value="false">{t("inProgress")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                {t("courseName")}
                            </th>
                            <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                {t("module")}
                            </th>
                            <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                {t("lesson")}
                            </th>
                            <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                {t("status")}
                            </th>
                            <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                {t("date")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="border-b border-gray-50">
                                    <td className="py-3 px-2"><Skeleton className="h-4 w-28" /></td>
                                    <td className="py-3 px-2"><Skeleton className="h-4 w-32" /></td>
                                    <td className="py-3 px-2"><Skeleton className="h-4 w-48" /></td>
                                    <td className="py-3 px-2"><Skeleton className="h-6 w-20 rounded-full" /></td>
                                    <td className="py-3 px-2"><Skeleton className="h-4 w-24" /></td>
                                </tr>
                            ))
                        ) : filteredLessons.length > 0 ? filteredLessons.map((lesson) => (
                            <tr key={lesson.id} className="border-b border-gray-50">
                                <td className="py-3 px-2 text-sm text-title">
                                    {lesson.course_name}
                                </td>
                                <td className="py-3 px-2 text-sm text-title">
                                    {lesson.model_name}
                                </td>
                                <td className="py-3 px-2 text-sm text-title">
                                    {lesson.lesson_name}
                                </td>
                                <td className="py-3 px-2">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${lesson.is_completed
                                            ? "bg-green-500 text-white"
                                            : "bg-yellow-50 text-yellow-600"
                                            }`}
                                    >
                                        {lesson.is_completed ? t("completed") : t("inProgress")}
                                    </span>
                                </td>
                                <td className="py-3 px-2 text-sm text-description">
                                    {formatDate(lesson.completed_at)}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td className="py-6 px-2 text-sm text-description" colSpan={5}>
                                    {t("noLessons")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LessonTracking
