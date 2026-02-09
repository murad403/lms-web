'use client';

import React, { useRef, useEffect } from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';
import { CourseFilterFormData } from '../../../types/courseFilterTypes';

const sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Trending', value: 'trending' },
    { label: 'High Rated', value: 'high-rated' },
    { label: 'Newest', value: 'newest' },
];

interface CourseSortDropdownProps {
    register: UseFormRegister<CourseFilterFormData>;
    watch: UseFormWatch<CourseFilterFormData>;
    setValue: UseFormSetValue<CourseFilterFormData>;
}

const CourseSortDropdown = ({ watch, setValue }: CourseSortDropdownProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const sortBy = watch('sortBy');

    const currentLabel = sortOptions.find((o) => o.value === sortBy)?.label || 'Trending';

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-md text-sm text-header bg-white hover:border-gray-300 transition min-w-40 justify-between"
            >
                <span>{currentLabel}</span>
                <ChevronDown className={`size-4 text-description transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1">
                    {sortOptions.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                                setValue('sortBy', opt.value);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition ${sortBy === opt.value ? 'text-main font-semibold bg-main/5' : 'text-description hover:bg-gray-50 hover:text-header'}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseSortDropdown;
