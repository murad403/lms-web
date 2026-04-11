"use client";
import { useState } from "react";
import EnrolledCourseCard from "@/components/card/EnrolledCourseCard";
import Pagination from "@/components/reusable/Pagination";
import { useTranslations } from "next-intl";
import { useGetEnrolledCoursesQuery } from "@/redux/features/student/student.api";

const EnrolledCoursesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const t = useTranslations("EnrolledCoursesPage");

    const { data: enrolledCoursesData, isLoading } = useGetEnrolledCoursesQuery({
        page: currentPage,
    });

    const paginatedCourses = enrolledCoursesData?.data || [];
    const totalPages = enrolledCoursesData?.total_pages || 1;

    return (
        <div>
            <div className="flex items-center mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-title">{t("title")}</h2>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-500">Loading...</div>
                </div>
            ) : paginatedCourses.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {paginatedCourses.map((course) => (
                            <EnrolledCourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-500">No courses found</div>
                </div>
            )}
        </div>
    );
};

export default EnrolledCoursesPage;
