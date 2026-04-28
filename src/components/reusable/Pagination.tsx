'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages = 5,
}) => {
    const t = useTranslations("Common");

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Calculate start and end of visible range
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're near the start
            if (currentPage <= 3) {
                end = Math.min(maxVisiblePages - 1, totalPages - 1);
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                start = Math.max(2, totalPages - maxVisiblePages + 2);
            }

            // Add ellipsis if needed at start
            if (start > 2) {
                pages.push('...');
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Add ellipsis if needed at end
            if (end < totalPages - 1) {
                pages.push('...');
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number | string) => {
        if (typeof page === 'number') {
            onPageChange(page);
        }
    };

    // if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-10">
            {/* Previous Button */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`
          flex items-center justify-center
          w-8 h-8 sm:w-10 sm:h-10
          rounded-full
          transition-all duration-200
          ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-main hover:text-white'
                    }
        `}
                aria-label={t("previous")}
            >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 sm:gap-2">
                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 text-sm sm:text-base"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNumber = page as number;
                    const isActive = pageNumber === currentPage;

                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageClick(pageNumber)}
                            className={`
                w-8 h-8 sm:w-10 sm:h-10
                rounded-full
                text-sm sm:text-base
                font-medium
                transition-all duration-200
                ${isActive
                                    ? 'bg-main text-white shadow-md scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                }
              `}
                            aria-label={`Page ${pageNumber}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {String(pageNumber).padStart(2, '0')}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`
          flex items-center justify-center
          w-8 h-8 sm:w-10 sm:h-10
          rounded-full
          transition-all duration-200
          ${currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-main hover:text-white'
                    }
        `}
                aria-label={t("next")}
            >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
        </div>
    );
};

export default Pagination;
