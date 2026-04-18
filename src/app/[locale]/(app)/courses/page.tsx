'use client';

import React, { useState, useCallback } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import CourseCard from '@/components/card/CourseCard';
import Pagination from '@/components/reusable/Pagination';
import CourseSortDropdown from './CourseSortDropdown';
import CourseFilterSidebar, { type FilterState } from './CourseFilterSidebar';
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useCategoriesQuery, useCoursesQuery } from '@/redux/features/landing/landing.api';

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

const SORT_TO_ORDERING: Record<string, string | undefined> = {
    relevance: undefined,
    trending: '-rating',
    'high-rated': '-rating',
    newest: '-id',
};

const getAreaOrder = (name: string) => {
    const match = name.trim().match(/area\s*(\d+)/i);
    if (!match) {
        return Number.MAX_SAFE_INTEGER;
    }

    return Number(match[1]);
};

const CoursesPage = () => {
    const t = useTranslations("Courses");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>(() => ({
        category: searchParams.get('category') || '',
        rating: searchParams.get('rating') || '',
        courseLevel: searchParams.get('level') || '',
        priceMin: searchParams.get('min_price') || '',
        priceMax: searchParams.get('max_price') || '',
        priceType: searchParams.get('price_type') || '',
        duration: searchParams.get('duration') || '',
    }));
    const [searchValue, setSearchValue] = useState(() => searchParams.get('search') || '');
    const [sortBy, setSortBy] = useState(() => searchParams.get('sortBy') || 'relevance');

    const pageFromQuery = Math.max(1, Number(searchParams.get('page') || '1') || 1);
    const querySortBy = searchParams.get('sortBy') || 'relevance';

    const { data: coursesData, isFetching: isCoursesLoading } = useCoursesQuery({
        page: pageFromQuery,
        page_size: COURSES_PER_PAGE,
        search: searchParams.get('search') || undefined,
        category: searchParams.get('category') || undefined,
        rating: searchParams.get('rating') || undefined,
        level: searchParams.get('level') || undefined,
        min_price: searchParams.get('min_price') || undefined,
        max_price: searchParams.get('max_price') || undefined,
        price_type: searchParams.get('price_type') || undefined,
        duration: searchParams.get('duration') || undefined,
        ordering: SORT_TO_ORDERING[querySortBy],
    });

    const { data: categoriesData } = useCategoriesQuery();

    const categoryOptions = (categoriesData?.data || [])
        .slice()
        .sort((a, b) => {
            const areaOrderA = getAreaOrder(a.name);
            const areaOrderB = getAreaOrder(b.name);

            if (areaOrderA !== areaOrderB) {
                return areaOrderA - areaOrderB;
            }

            return a.name.localeCompare(b.name);
        })
        .map((category) => ({
            label: category.name,
            value: category.name.trim().toLowerCase(),
        }));

    const courseItems = (coursesData?.data || []).map((course) => ({
        id: course.id,
        title: course.title,
        category: course.Category,
        rating: Number(course.rating || 0),
        reviews: `${course.reviews_count || 0} Reviews`,
        price: Number.parseFloat(course.price || '0'),
        image: course.advance_info?.thumbnail || '',
        is_wishlisted: Boolean(course.is_wishlisted),
    }));

    const handleFilterChange = useCallback((field: keyof FilterState, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    }, []);

    const updateQuery = useCallback((updates: Record<string, string | undefined>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (!value) {
                params.delete(key);
                return;
            }
            params.set(key, value);
        });

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
    }, [pathname, router, searchParams]);

    const handleClearFilters = () => {
        setFilters(defaultFilters);
        setSearchValue('');
        setSortBy('relevance');
        router.push(pathname);
    };

    const handleApplyFilters = () => {
        updateQuery({
            page: '1',
            search: searchValue || undefined,
            sortBy: sortBy === 'relevance' ? undefined : sortBy,
            category: filters.category || undefined,
            rating: filters.rating || undefined,
            level: filters.courseLevel || undefined,
            min_price: filters.priceMin || undefined,
            max_price: filters.priceMax || undefined,
            price_type: filters.priceType || undefined,
            duration: filters.duration || undefined,
        });
    };

    const handlePageChange = (page: number) => {
        updateQuery({ page: String(page) });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSortChange = (nextSort: string) => {
        setSortBy(nextSort);
        updateQuery({
            page: '1',
            sortBy: nextSort === 'relevance' ? undefined : nextSort,
        });
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleApplyFilters();
                                }
                            }}
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                        />
                        {searchValue && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchValue('');
                                    updateQuery({ page: '1', search: undefined });
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="size-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <span className="text-sm text-description">{t("sortBy")}:</span>
                        <CourseSortDropdown sortBy={sortBy} onSortChange={handleSortChange} />
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
                            <CourseFilterSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                categoryOptions={categoryOptions}
                            />
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
                        {courseItems.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    {isCoursesLoading && (
                        <div className="py-10 text-center text-description text-sm">Loading...</div>
                    )}

                    {/* Empty State */}
                    {!isCoursesLoading && courseItems.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="text-lg font-semibold text-header mb-2">{t("noCourses")}</p>
                            <p className="text-sm text-description">{t("noCoursesHint")}</p>
                        </div>
                    )}

                    {/* Pagination */}
                    <Pagination
                        currentPage={pageFromQuery}
                        totalPages={coursesData?.total_pages || 1}
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
                            <CourseFilterSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                categoryOptions={categoryOptions}
                            />
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
