"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "@/components/card/CourseCard";
import { TCourse } from "@/lib/courses";
import { useTranslations } from "next-intl";
import { LandingCourse } from "@/redux/features/landing/landing.type";
import { useHomeLandingData } from "./HomeLandingDataProvider";
import { Skeleton } from "@/components/ui/skeleton";

const  Courses = () => {
    const t = useTranslations("Home");
    const { homeData, isLoading } = useHomeLandingData();
    const trendingRef = useRef<HTMLDivElement>(null);
    const featuredRef = useRef<HTMLDivElement>(null);
    const mostRequestedRef = useRef<HTMLDivElement>(null);

    const mapApiCourseToCardCourse = (course: LandingCourse): TCourse => ({
        id: course.id,
        title: course.title,
        category: course.Category || course.topic || "CATEGORY",
        rating: Number(course.rating || 0),
        reviews: `${course.lectures || 0} Lectures`,
        price: Number.parseFloat(course.price || "0") || 0,
        image: course.advance_info?.thumbnail || "/courses/Course Images.png",
        is_wishlisted: course.is_wishlisted
    });

    const trendingCourses = (homeData?.trending_courses || []).map(mapApiCourseToCardCourse);
    const featuredCourses = (homeData?.featured_courses || []).map(mapApiCourseToCardCourse);
    const mostRequestedCourses = (homeData?.most_requested_courses || []).map(mapApiCourseToCardCourse);

    const renderCourseSkeletons = () => (
        Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-72 lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] shrink-0 rounded-lg border border-gray-200 p-4">
                <Skeleton className="h-60 md:h-70 w-full rounded-md" />
                <Skeleton className="mt-4 h-5 w-3/4" />
                <Skeleton className="mt-3 h-4 w-1/2" />
                <div className="mt-5 flex items-center justify-between">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-9 w-24" />
                </div>
            </div>
        ))
    );

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
        <div className="px-4 md:px-5 lg:px-6 xl:px-8 2xl:px-0">
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
                            {isLoading ? renderCourseSkeletons() : trendingCourses.map((course) => (
                                <div key={course.id} className="w-72 lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] shrink-0">
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
                            {isLoading ? renderCourseSkeletons() : featuredCourses.map((course) => (
                                <div key={course.id} className="w-72 lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] shrink-0">
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
                            {isLoading ? renderCourseSkeletons() : mostRequestedCourses.map((course) => (
                                <div key={course.id} className="w-72 lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] shrink-0">
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
