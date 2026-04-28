/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCourseAccreditationQuery } from "@/redux/features/instructor/instructor.api";
import { useCourseDetailsQuery } from "@/redux/features/landing/landing.api";
import Pagination from "@/components/reusable/Pagination";
import { CourseAccreditationCourse } from "@/redux/features/instructor/instructor.type";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveImageUrl } from "@/utils/image";

const statusColors: Record<string, string> = {
    Approved: "bg-green-100 text-green-700",
    approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    pending: "bg-yellow-100 text-yellow-700",
    "Needs Revision": "bg-orange-100 text-orange-700",
    "needs-revision": "bg-orange-100 text-orange-700",
    Rejected: "bg-red-100 text-red-700",
    rejected: "bg-red-100 text-red-700",
    draft: "bg-gray-100 text-gray-700",
    published: "bg-blue-100 text-blue-700",
    accepted: "bg-green-100 text-green-700",
};

const SubmissionsTab = () => {
    const t = useTranslations("InstructorAccreditation");
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [viewItem, setViewItem] = useState<CourseAccreditationCourse | null>(null);

    const queryParams: any = {
        page: currentPage,
        page_size: 10,
    };

    if (filter !== "all") {
        queryParams.status = filter;
    }

    const { data: accreditationData, isLoading: isLoadingAccreditation } =
        useCourseAccreditationQuery(queryParams);

    const { data: courseDetailsData, isLoading: isLoadingDetails } =
        useCourseDetailsQuery(viewItem?.id || 0, {
            skip: !viewItem,
        });

    const courses = accreditationData?.data?.results || [];
    const totalPages = accreditationData?.data?.total_pages || 1;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Table loading skeleton
    const renderTableSkeleton = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-border-light">
                        <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                            {t("submissionId")}
                        </th>
                        <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                            {t("course")}
                        </th>
                        <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                            {t("submitted")}
                        </th>
                        <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                            {t("status")}
                        </th>
                        <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                            {t("action")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(5)].map((_, index) => (
                        <tr key={`skeleton-${index}`} className="border-b border-border-light">
                            <td className="py-3.5 px-4">
                                <Skeleton className="h-4 w-12" />
                            </td>
                            <td className="py-3.5 px-4">
                                <Skeleton className="h-4 w-40" />
                            </td>
                            <td className="py-3.5 px-4">
                                <Skeleton className="h-4 w-32" />
                            </td>
                            <td className="py-3.5 px-4">
                                <Skeleton className="h-6 w-24 rounded-sm" />
                            </td>
                            <td className="py-3.5 px-4">
                                <Skeleton className="h-8 w-20 rounded-md" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // Modal loading skeleton
    const renderModalSkeleton = () => (
        <>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="w-full h-60 rounded-lg mb-4" />
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-4 w-40 mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="border border-border-light rounded-md p-3">
                        <Skeleton className="h-3 w-12 mb-2" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                ))}
            </div>
        </>
    );

    return (
        <div className="bg-white p-5 rounded-md">
            {/* Filter */}
            <div className="flex items-center justify-end mb-4">
                <select
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border border-border-light rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                >
                    <option value="all">{t("allStatus")}</option>
                    <option value="approved">{t("approved")}</option>
                    <option value="published">{t("published")}</option>
                    <option value="pending">{t("pending")}</option>
                    <option value="rejected">{t("rejected")}</option>
                    <option value="draft">Draft</option>
                    <option value="accepted">Accepted</option>
                </select>
            </div>

            {/* Table */}
            {isLoadingAccreditation ? (
                renderTableSkeleton()
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border-light">
                                    <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                                        {t("submissionId")}
                                    </th>
                                    <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                                        {t("course")}
                                    </th>
                                    <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                                        {t("submitted")}
                                    </th>
                                    <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                                        {t("status")}
                                    </th>
                                    <th className="py-3 px-4 text-sm font-semibold text-title uppercase">
                                        {t("action")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length > 0 ? (
                                    courses.map((course) => (
                                        <tr
                                            key={course.id}
                                            className="border-b border-border-light last:border-0"
                                        >
                                            <td className="py-3.5 px-4 text-sm font-medium text-title">
                                                {course.id}
                                            </td>
                                            <td className="py-3.5 px-4 text-sm text-title text-nowrap">
                                                {course.title}
                                            </td>
                                            <td className="py-3.5 px-4 text-sm text-description">
                                                {new Date(course.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span
                                                    className={`text-xs font-medium px-2.5 py-1.5 rounded-sm text-nowrap capitalize ${statusColors[course.status] || "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {course.status}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <button
                                                    onClick={() => setViewItem(course)}
                                                    className="p-1.5 px-2.5 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1 bg-[#ECF9FF] cursor-pointer"
                                                >
                                                    <Eye className="w-4 h-4 text-description" />
                                                    {t("view")}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="py-8 px-4 text-center text-description"
                                        >
                                            {t("noCoursesFound")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>


                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>

                </>
            )}

            {/* Course Details Modal */}
            <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-title">
                            {courseDetailsData?.data?.title || "Course Details"}
                        </DialogTitle>
                        {!isLoadingDetails && courseDetailsData?.data?.instructor && (
                            <p className="text-sm text-description mt-1">
                                By {courseDetailsData?.data?.instructor?.name} •{" "}
                                {courseDetailsData?.data?.Category}
                            </p>
                        )}
                    </DialogHeader>

                    {isLoadingDetails ? (
                        <div className="space-y-4 mt-4">
                            {renderModalSkeleton()}
                        </div>
                    ) : (
                        <>

                            {courseDetailsData?.data && (
                                <div className="space-y-4 mt-4">
                                    {/* Course Image */}
                                    {courseDetailsData.data.advance_info?.thumbnail && (
                                        <div className="relative w-full h-40 sm:h-60 rounded-lg overflow-hidden">
                                            <Image
                                                src={resolveImageUrl(courseDetailsData.data.advance_info.thumbnail)}
                                                fill
                                                className="object-cover h-full"
                                                alt={courseDetailsData.data.title}
                                            />
                                        </div>
                                    )}

                                    {/* Course Info */}
                                    <div>
                                        <div className="flex items-start justify-between mb-2">
                                            <span className="inline-block text-xs font-medium text-[#342F98] bg-[#EBEBFF] px-2.5 py-1 rounded-sm uppercase">
                                                {courseDetailsData.data.Category}
                                            </span>
                                            <span className="text-xl font-bold text-main">
                                                ${courseDetailsData.data.price}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-medium text-title mb-2">
                                            {courseDetailsData.data.title}
                                        </h4>
                                        <div className="flex items-center justify-between gap-3 text-sm text-description mb-4 border border-border-light p-2">
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-500">★</span>
                                                <span className="font-medium text-title">
                                                    {courseDetailsData.data.rating || 0}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-medium text-main">
                                            {t("overview")}
                                        </h3>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
                                        <div className="border border-border-light rounded-md p-3">
                                            <p className="text-xs text-description mb-1">
                                                {t("category")}
                                            </p>
                                            <p className="text-sm font-medium text-title">
                                                {courseDetailsData.data.Category}
                                            </p>
                                        </div>
                                        <div className="border border-border-light rounded-md p-3">
                                            <p className="text-xs text-description mb-1">
                                                {t("created")}
                                            </p>
                                            <p className="text-sm font-medium text-title">
                                                {new Date(
                                                    courseDetailsData.data.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="border border-border-light rounded-md p-3">
                                            <p className="text-xs text-description mb-1">
                                                {t("level")}
                                            </p>
                                            <p className="text-sm font-medium text-title">
                                                {courseDetailsData.data.level}
                                            </p>
                                        </div>
                                        <div className="border border-border-light rounded-md p-3">
                                            <p className="text-xs text-description mb-1">
                                                {t("status")}
                                            </p>
                                            <p className="text-sm font-medium text-title bg-green-500 inline py-1 px-2 rounded-sm">
                                                {courseDetailsData.data.status}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {courseDetailsData.data.advance_info?.description && (
                                        <div className="pt-4 border-t border-border-light">
                                            <h4 className="font-semibold text-title mb-2">
                                                Description
                                            </h4>
                                            <p className="text-sm text-description">
                                                {courseDetailsData.data.advance_info.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SubmissionsTab;
