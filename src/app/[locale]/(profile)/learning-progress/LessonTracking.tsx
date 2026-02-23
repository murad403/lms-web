"use client"
import { lessonTracking } from '@/lib/profile';
import { useTranslations } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';

const LessonTracking = () => {
     const [moduleFilter, setModuleFilter] = useState("all");
    const t = useTranslations("LearningProgress");
    const filteredLessons =
        moduleFilter === "all"
            ? lessonTracking
            : lessonTracking.filter((l) => l.module === moduleFilter);

    const uniqueModules = [...new Set(lessonTracking.map((l) => l.module))];
    return (
        <div className="bg-white rounded-md border border-border-light p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="text-base sm:text-lg font-bold text-title">
                    {t("lessonTracking")}
                </h3>
                <Select value={moduleFilter} onValueChange={setModuleFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder={t("allCategories")} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">{t("allCategories")}</SelectItem>
                        {uniqueModules.map((mod) => (
                            <SelectItem key={mod} value={mod}>
                                {mod}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                {t("module")}
                            </th>
                            <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                {t("lesson")}
                            </th>
                            <th className="text-left py-3 px-2 font-semibold text-main text-base">
                                {t("watchTime")}
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
                        {filteredLessons.map((lesson) => (
                            <tr key={lesson.id} className="border-b border-gray-50">
                                <td className="py-3 px-2 text-sm text-title">
                                    {lesson.module}
                                </td>
                                <td className="py-3 px-2 text-sm text-title">
                                    {lesson.lesson}
                                </td>
                                <td className="py-3 px-2 text-sm text-description">
                                    {lesson.watchTime}
                                </td>
                                <td className="py-3 px-2">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${lesson.status === "Completed"
                                            ? "bg-green-500 text-white"
                                            : lesson.status === "In Progress"
                                                ? "bg-yellow-50 text-yellow-600"
                                                : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {lesson.status}
                                    </span>
                                </td>
                                <td className="py-3 px-2 text-sm text-description">
                                    {lesson.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LessonTracking
