'use client';

import React from 'react';
import { ChevronUp, Check } from 'lucide-react';
import { BsStarFill } from 'react-icons/bs';
import { useTranslations } from "next-intl";

const ratingOptions = [
    { tKey: 'fiveStar', value: '5', count: 1580 },
    { tKey: 'fourStar', value: '4', count: 1020 },
    { tKey: 'threeStar', value: '3', count: 1045 },
    { tKey: 'twoStar', value: '2', count: 990 },
    { tKey: 'oneStar', value: '1', count: 870 },
];

const courseLevelOptions = [
    { tKey: 'allLevel', value: 'all' },
    { tKey: 'beginner', value: 'beginner' },
    { tKey: 'intermediate', value: 'intermediate' },
    { tKey: 'expert', value: 'expert' },
];

const durationOptions = [
    { tKey: 'sixToTwelveMonths', value: '6-12-months', count: 1100 },
    { tKey: 'threeToSixMonths', value: '3-6-months', count: 990 },
    { tKey: 'oneToThreeMonths', value: '1-3-months', count: 870 },
    { tKey: 'oneToFourWeeks', value: '1-4-weeks', count: 455 },
    { tKey: 'oneToSevenDays', value: '1-7-days', count: 300 },
];

// Custom square checkbox
const SquareCheck = ({ checked }: { checked: boolean }) => (
    <div
        className={`size-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${checked ? 'bg-main border-main' : 'border-gray-300 bg-white'
            }`}
    >
        {checked && <Check className="size-3.5 text-white" strokeWidth={3} />}
    </div>
);

export interface FilterState {
    category: string;
    rating: string;
    courseLevel: string;
    priceMin: string;
    priceMax: string;
    priceType: string;
    duration: string;
}

interface CourseFilterSidebarProps {
    filters: FilterState;
    onFilterChange: (field: keyof FilterState, value: string) => void;
    categoryOptions?: Array<{
        label: string;
        value: string;
    }>;
}

const CourseFilterSidebar = ({ filters, onFilterChange, categoryOptions = [] }: CourseFilterSidebarProps) => {
    const t = useTranslations("Courses");
    const [openSections, setOpenSections] = React.useState({
        category: true,
        rating: true,
        courseLevel: true,
        price: true,
        duration: true,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    // Single-select toggle: click same → uncheck, click different → select
    const handleSelect = (field: keyof FilterState, value: string) => {
        onFilterChange(field, filters[field] === value ? '' : value);
    };
    // console.log(categoryOptions)
    return (
        <div className="space-y-6">
            {/* CATEGORY */}
            <div className="border border-gray-100 p-4 rounded-md">
                <button
                    type="button"
                    onClick={() => toggleSection('category')}
                    className="flex items-center justify-between w-full text-[15px] sm:text-[17px] font-bold text-header uppercase tracking-wide mb-3"
                >
                    {t("category")}
                    <ChevronUp
                        className={`size-4 transition-transform ${openSections.category ? '' : 'rotate-180'}`}
                    />
                </button>
                {openSections.category && (
                    <div className="space-y-1 max-h-72 overflow-y-auto">
                        {categoryOptions.map((cat) => {
                            const isActive = filters.category === cat.value;
                            return (
                                <button
                                    type="button"
                                    key={cat.value}
                                    onClick={() => handleSelect('category', cat.value)}
                                    className={`flex items-center justify-between w-full text-xs sm:text-sm py-1.5 px-2 rounded-md transition-colors ${isActive
                                            ? 'bg-main/10 text-main font-semibold'
                                            : 'text-description hover:text-header hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <SquareCheck checked={isActive} />
                                        <span className="line-clamp-2 leading-tight text-left">{cat.label}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* RATING */}
            <div className="border border-gray-100 p-4 rounded-md">
                <button
                    type="button"
                    onClick={() => toggleSection('rating')}
                    className="flex items-center justify-between w-full text-[15px] sm:text-[17px] font-bold text-header uppercase tracking-wide mb-3"
                >
                    {t("rating")}
                    <ChevronUp
                        className={`size-4 transition-transform ${openSections.rating ? '' : 'rotate-180'}`}
                    />
                </button>
                {openSections.rating && (
                    <div className="space-y-1">
                        {ratingOptions.map((opt) => {
                            const isActive = filters.rating === opt.value;
                            return (
                                <button
                                    type="button"
                                    key={opt.value}
                                    onClick={() => handleSelect('rating', opt.value)}
                                    className={`flex items-center justify-between w-full text-xs sm:text-sm py-1.5 px-2 rounded-md transition-colors ${isActive
                                            ? 'bg-main/10 text-main font-semibold'
                                            : 'text-description hover:text-header hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <SquareCheck checked={isActive} />
                                        <span className="flex items-center gap-1">
                                            <BsStarFill size={16} className="text-yellow-500" />
                                            <span>{t(opt.tKey as Parameters<typeof t>[0])}</span>
                                        </span>
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-400 shrink-0">{opt.count}</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* COURSE LEVEL */}
            <div className="border border-gray-100 p-4 rounded-md">
                <button
                    type="button"
                    onClick={() => toggleSection('courseLevel')}
                    className="flex items-center justify-between w-full text-[15px] sm:text-[17px] font-bold text-header uppercase tracking-wide mb-3"
                >
                    {t("level")}
                    <ChevronUp
                        className={`size-4 transition-transform ${openSections.courseLevel ? '' : 'rotate-180'}`}
                    />
                </button>
                {openSections.courseLevel && (
                    <div className="space-y-1">
                        {courseLevelOptions.map((opt) => {
                            const isActive = filters.courseLevel === opt.value;
                            return (
                                <button
                                    type="button"
                                    key={opt.value}
                                    onClick={() => handleSelect('courseLevel', opt.value)}
                                    className={`flex items-center gap-2 w-full text-xs sm:text-sm py-1.5 px-2 rounded-md transition-colors ${isActive
                                            ? 'bg-main/10 text-main font-semibold'
                                            : 'text-description hover:text-header hover:bg-gray-50'
                                        }`}
                                >
                                    <SquareCheck checked={isActive} />
                                    <span>{t(opt.tKey as Parameters<typeof t>[0])}</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* PRICE */}
            <div className="border border-gray-100 p-4 rounded-md">
                <button
                    type="button"
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full text-[15px] sm:text-[17px] font-bold text-header uppercase tracking-wide mb-3"
                >
                    {t("price")}
                    <ChevronUp
                        className={`size-4 transition-transform ${openSections.price ? '' : 'rotate-180'}`}
                    />
                </button>
                {openSections.price && (
                    <div className="space-y-3">
                        {/* Min / Max inputs */}
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.priceMin}
                                    onChange={(e) => onFilterChange('priceMin', e.target.value)}
                                    className="w-full pl-7 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main"
                                />
                            </div>
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.priceMax}
                                    onChange={(e) => onFilterChange('priceMax', e.target.value)}
                                    className="w-full pl-7 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main"
                                />
                            </div>
                        </div>

                        {/* Paid / Free */}
                        <div className="space-y-1">
                            {(['paid'] as const).map((type) => {
                                const isActive = filters.priceType === type;
                                return (
                                    <button
                                        type="button"
                                        key={type}
                                        onClick={() => handleSelect('priceType', type)}
                                        className={`flex items-center justify-between w-full text-xs sm:text-sm py-1.5 px-2 rounded-md transition-colors ${isActive
                                                ? 'bg-main/10 text-main font-semibold'
                                                : 'text-description hover:text-header hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <SquareCheck checked={isActive} />
                                            <span className="capitalize">{type}</span>
                                        </div>
                                        <span className="text-xs sm:text-sm text-gray-400 shrink-0">
                                            {type === 'paid' ? '1044' : '356'}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* DURATION */}
            <div className="border border-gray-100 p-4 rounded-md">
                <button
                    type="button"
                    onClick={() => toggleSection('duration')}
                    className="flex items-center justify-between w-full text-[15px] sm:text-[17px] font-bold text-header uppercase tracking-wide mb-3"
                >
                    {t("duration")}
                    <ChevronUp
                        className={`size-4 transition-transform ${openSections.duration ? '' : 'rotate-180'}`}
                    />
                </button>
                {openSections.duration && (
                    <div className="space-y-1">
                        {durationOptions.map((opt) => {
                            const isActive = filters.duration === opt.value;
                            return (
                                <button
                                    type="button"
                                    key={opt.value}
                                    onClick={() => handleSelect('duration', opt.value)}
                                    className={`flex items-center justify-between w-full text-xs sm:text-sm py-1.5 px-2 rounded-md transition-colors ${isActive
                                            ? 'bg-main/10 text-main font-semibold'
                                            : 'text-description hover:text-header hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <SquareCheck checked={isActive} />
                                        <span>{t(opt.tKey as Parameters<typeof t>[0])}</span>
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-400 shrink-0">{opt.count}</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseFilterSidebar;
