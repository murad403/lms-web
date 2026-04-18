"use client";
import { useState } from "react";
import EnrolledCourseCard from "@/components/card/EnrolledCourseCard";
import Pagination from "@/components/reusable/Pagination";
import { useTranslations } from "next-intl";
import { useGetEnrolledCoursesQuery } from "@/redux/features/student/student.api";
import { Skeleton } from "@/components/ui/skeleton";

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-md overflow-hidden border border-border-light w-full">
                            <Skeleton className="h-50 sm:h-60 w-full" />
                            <div className="p-3 sm:p-4 space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="size-8 rounded-full" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                    <Skeleton className="h-6 w-16 rounded-lg" />
                                </div>
                                <Skeleton className="h-5 w-5/6" />
                                <Skeleton className="h-4 w-24" />
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-9 w-28 rounded" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-1.5 w-full" />
                                    <Skeleton className="h-4 w-10" />
                                </div>
                                <Skeleton className="h-6 w-20 rounded-lg" />
                            </div>
                        </div>
                    ))}
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
