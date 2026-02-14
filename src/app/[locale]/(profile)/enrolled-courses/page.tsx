"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnrolledCourseCard from "@/components/reusable/EnrolledCourseCard";
import Pagination from "@/components/reusable/Pagination";
import { enrolledCourses } from "@/lib/profile";
import { useTranslations } from "next-intl";

const ITEMS_PER_PAGE = 6;

const EnrolledCoursesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState("enrolled");
    const t = useTranslations("EnrolledCoursesPage");

    const filteredCourses = enrolledCourses; // TODO: filter by tab when API is integrated
    const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-title">{t("title")}</h2>
                <Tabs
                    value={activeTab}
                    onValueChange={(val) => {
                        setActiveTab(val);
                        setCurrentPage(1);
                    }}
                >
                    <TabsList className="bg-white space-x-4">
                        <TabsTrigger
                            value="enrolled"
                            className="text-base rounded-2xl py-5 px-4 bg-[#F4F6F9] text-title data-[state=active]:bg-main data-[state=active]:text-white"
                        >
                            {t("enrolled")} (09)
                        </TabsTrigger>
                        <TabsTrigger
                            value="active"
                            className="text-base rounded-2xl py-5 px-4 bg-[#F4F6F9] text-title data-[state=active]:bg-main data-[state=active]:text-white"
                        >
                            {t("active")} (06)
                        </TabsTrigger>
                        <TabsTrigger
                            value="completed"
                            className="text-base rounded-2xl py-5 px-4 bg-[#F4F6F9] text-title data-[state=active]:bg-main data-[state=active]:text-white"
                        >
                            {t("completed")} (03)
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedCourses.map((course) => (
                    <EnrolledCourseCard key={course.id} course={course} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default EnrolledCoursesPage;
