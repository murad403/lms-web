/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { SlBadge } from "react-icons/sl";
import { useTranslations } from "next-intl";
import { useCertificateListQuery } from "@/redux/features/instructor/instructor.api";
import Pagination from "@/components/reusable/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

const CertificatesTab = () => {
    const t = useTranslations("InstructorAccreditation");
    const [currentPage, setCurrentPage] = useState(1);

    const { data: certificateData, isLoading } = useCertificateListQuery({
        page: currentPage,
        page_size: 10,
    });

    const certificates = certificateData?.data || [];
    const totalPages = certificateData?.total_pages || 1;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // Loading skeleton
    const renderLoadingSkeleton = () => (
        <div className="mt-6 space-y-4">
            {[...Array(3)].map((_, index) => (
                <div
                    key={`cert-skeleton-${index}`}
                    className="p-4 border border-border-light rounded-md"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <Skeleton className="w-11 h-11 rounded-md shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <Skeleton className="h-4 w-48 mb-2" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-20 rounded-full shrink-0" />
                        </div>
                        <div className="border-t border-border-light pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i}>
                                    <Skeleton className="h-3 w-16 mb-1" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="overflow-x-auto bg-white rounded-md p-5">
            <div>
                <h2 className="text-lg font-semibold text-title">
                    {t("activeCertificates")}
                </h2>
                <p className="text-sm text-description">{t("certificatesDesc")}</p>
            </div>

            {/* Loading State */}
            {isLoading && renderLoadingSkeleton()}

            {!isLoading && (
                <>
                    <div className="mt-6 space-y-4">
                        {certificates.length > 0 ? (
                            certificates.map((cert: any) => (
                                <div
                                    key={cert.id}
                                    className="p-4 border border-border-light rounded-md"
                                >
                                    {/* Top Row: Icon + Title + Badge */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="bg-[#ECF9FF] p-2.5 rounded-md shrink-0">
                                                <SlBadge className="text-main size-6" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-medium text-title truncate">
                                                    {cert.title}
                                                </h3>
                                                {cert.subtitle && (
                                                    <p className="text-sm text-description truncate">
                                                        {cert.subtitle}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#C4EBFF] text-main capitalize shrink-0">
                                            {cert.status}
                                        </span>
                                    </div>

                                    {/* Bottom Row: Metadata */}
                                    <div className="mt-3 pt-3 border-t border-border-light grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        <div>
                                            <p className="text-xs text-description uppercase tracking-wide mb-0.5">
                                                Certificate ID
                                            </p>
                                            <p className="text-sm font-medium text-title">
                                                {cert.certificated_id}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-description uppercase tracking-wide mb-0.5">
                                                Topic
                                            </p>
                                            <p className="text-sm font-medium text-title">
                                                {cert.topic || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-description uppercase tracking-wide mb-0.5">
                                                Language
                                            </p>
                                            <p className="text-sm font-medium text-title">
                                                {cert.language?.toUpperCase() || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-description uppercase tracking-wide mb-0.5">
                                                {t("issued")}
                                            </p>
                                            <p className="text-sm font-medium text-title">
                                                {formatDate(cert.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-description">
                                {t("noCoursesFound")}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-6">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CertificatesTab;