"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "@/components/card/CourseCard";
import {
    trendingCourses,
    featuredCourses,
    mostRequestedCourses,
} from "@/lib/courses";
import { useTranslations } from "next-intl";

const Courses = () => {
    const t = useTranslations("Home");
    const trendingRef = useRef<HTMLDivElement>(null);
    const featuredRef = useRef<HTMLDivElement>(null);
    const mostRequestedRef = useRef<HTMLDivElement>(null);

    const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
        if (ref.current) {
            const scrollAmount = 300;
            ref.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };



    return (
        <div className="px-4 md:px-6 lg:px-16">
            <div className="container mx-auto">
                {/* Trending Courses Section */}
                <div className="mb-12">
                    <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header mb-4 md:mb-6">
                        {t("trendingCourses")}
                    </h2>
                    <div className="relative group">
                        {/* Left Arrow */}
                        <button
                            onClick={() => scroll(trendingRef, "left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg md:flex hidden items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* Courses Container */}
                        <div
                            ref={trendingRef}
                            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                        >
                            {trendingCourses.map((course) => (
                                <div key={course.id} className="w-72 lg:w-[calc(25%-18px)] shrink-0">
                                    <CourseCard course={course} />
                                </div>
                            ))}
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() => scroll(trendingRef, "right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg md:flex hidden  items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Featured Courses Section */}
                <div className="mb-12">
                    <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header mb-4 md:mb-6">
                        {t("featuredCourses")}
                    </h2>
                    <div className="relative group">
                        {/* Left Arrow */}
                        <button
                            onClick={() => scroll(featuredRef, "left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg md:flex hidden  items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* Courses Container */}
                        <div
                            ref={featuredRef}
                            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                        >
                            {featuredCourses.map((course) => (
                                <div key={course.id} className="w-72 lg:w-[calc(25%-18px)] shrink-0">
                                    <CourseCard course={course} />
                                </div>
                            ))}
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() => scroll(featuredRef, "right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg md:flex hidden  items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Most Requested Courses Section */}
                <div>
                    <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header mb-4 md:mb-6">
                        {t("mostRequestedCourses")}
                    </h2>
                    <div className="relative group">
                        {/* Left Arrow */}
                        <button
                            onClick={() => scroll(mostRequestedRef, "left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg md:flex hidden  items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* Courses Container */}
                        <div
                            ref={mostRequestedRef}
                            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                        >
                            {mostRequestedCourses.map((course) => (
                                <div key={course.id} className="w-72 lg:w-[calc(25%-18px)] shrink-0">
                                    <CourseCard course={course} />
                                </div>
                            ))}
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() => scroll(mostRequestedRef, "right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg md:flex hidden  items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;
