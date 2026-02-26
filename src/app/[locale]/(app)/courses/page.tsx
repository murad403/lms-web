'use client';

import React, { useState, useCallback } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import CourseCard from '@/components/card/CourseCard';
import Pagination from '@/components/reusable/Pagination';
import { trendingCourses } from '@/lib/courses';
import CourseSortDropdown from './CourseSortDropdown';
import CourseFilterSidebar, { type FilterState } from './CourseFilterSidebar';
import { useTranslations } from "next-intl";

const COURSES_PER_PAGE = 12;

const defaultFilters: FilterState = {
    category: '',
    rating: '',
    courseLevel: '',
    priceMin: '',
    priceMax: '',
    priceType: '',
    duration: '',
};

const CoursesPage = () => {
    const t = useTranslations("Courses");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<FilterState>(defaultFilters);
    const [searchValue, setSearchValue] = useState('');
    const [sortBy, setSortBy] = useState('relevance');

    const handleFilterChange = useCallback((field: keyof FilterState, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleClearFilters = () => {
        setFilters(defaultFilters);
    };

    const handleApplyFilters = () => {
        const allData = {
            ...filters,
            search: searchValue,
            sortBy: sortBy,
        };
        console.log('Applied Filters:', allData);
    };

    // For now using static data — will be replaced by API
    const courses = trendingCourses;
    const totalPages = Math.ceil(courses.length / COURSES_PER_PAGE);
    const paginatedCourses = courses.slice(
        (currentPage - 1) * COURSES_PER_PAGE,
        currentPage * COURSES_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="pt-10 container mx-auto px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-header mb-6">{t("title")}</h1>

                {/* Search + Filter Toggle + Sort */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Filter Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-md border text-sm font-medium transition shrink-0 ${
                            isFilterOpen
                                ? 'bg-main text-white border-main'
                                : 'bg-white text-header border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <SlidersHorizontal className="size-4" />
                        {t("filters")}
                    </button>

                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t("searchPlaceholder")}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                        />
                        {searchValue && (
                            <button
                                type="button"
                                onClick={() => setSearchValue('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="size-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <span className="text-sm text-description">{t("sortBy")}:</span>
                        <CourseSortDropdown sortBy={sortBy} onSortChange={setSortBy} />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex gap-4">
                {/* Filter Sidebar - Desktop */}
                {isFilterOpen && (
                    <aside className="w-90 shrink-0 hidden lg:block">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-header uppercase tracking-wide">{t("filters")}</h3>
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="text-xs text-main hover:underline cursor-pointer"
                                >
                                    {t("clearAll")}
                                </button>
                            </div>
                            <CourseFilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                            <button
                                type="button"
                                onClick={handleApplyFilters}
                                className="w-full mt-5 py-2.5 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition cursor-pointer"
                            >
                                {t("applyFilters")}
                            </button>
                        </div>
                    </aside>
                )}

                {/* Course Grid */}
                <div className="flex-1 min-w-0">
                    <div
                        className={`grid gap-4 ${
                            isFilterOpen
                                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                        }`}
                    >
                        {paginatedCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {paginatedCourses.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="text-lg font-semibold text-header mb-2">{t("noCourses")}</p>
                            <p className="text-sm text-description">{t("noCoursesHint")}</p>
                        </div>
                    )}

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setIsFilterOpen(false)} />
                    <div className="absolute left-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-header">{t("filters")}</h3>
                            <button
                                type="button"
                                onClick={() => setIsFilterOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                        <div className="p-5">
                            <CourseFilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                        </div>
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-5 flex gap-3">
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-header hover:bg-gray-50 transition"
                            >
                                {t("clearAll")}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    handleApplyFilters();
                                    setIsFilterOpen(false);
                                }}
                                className="flex-1 py-2.5 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition"
                            >
                                {t("applyFilters")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CoursesPage;
