"use client";

import { useState, useEffect } from "react";
import { Search, ShieldAlert } from "lucide-react";
import Pagination from "@/components/reusable/Pagination";
import { useTranslations } from "next-intl";
import { useGetMentorCoursesQuery } from "@/redux/features/mentor/mentor.api";
import { MentorCourseContract } from "@/redux/features/mentor/mentor.type";
import { useCourseCategoriesQuery } from "@/redux/features/create-course/createCourse.api";
import { Skeleton } from "@/components/ui/skeleton";
import MentorCourseCard from "./MentorCourseCard";


// Skeleton Card for query states
const MentorCourseCardSkeleton = () => {
  return (
    <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-sm p-4 space-y-4 flex flex-col">
      <Skeleton className="h-32 w-full rounded-lg" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-light">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
      <div className="pt-3 border-t border-border-light space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
};

const MyCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations("InstructorMyCourses");

  // Debounce search input (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: categoryData } = useCourseCategoriesQuery();
  const categories = categoryData?.data || [];

  // Map category ID to Name to pass name string filter if category is selected
  const selectedCatObj = categories.find((c) => String(c.id) === selectedCategory);
  const categoryParam = selectedCatObj ? selectedCatObj.name : undefined;

  // Retrieve mentor courses matching query criteria
  const { data: mentorCoursesData, isLoading: isCoursesLoading, isFetching: isCoursesFetching } = useGetMentorCoursesQuery({
    page: currentPage,
    page_size: 8,
    ...(debouncedSearch.trim() && { search: debouncedSearch.trim() }),
    ...(categoryParam && { category: categoryParam }),
  });

  const courses: MentorCourseContract[] = mentorCoursesData?.data || [];
  const totalPages = mentorCoursesData?.total_pages || 1;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col justify-between sm:flex-row gap-3">
        <div className="w-full sm:w-1/2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder") || "Search course..."}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-main focus:border-main bg-white"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-3 bg-white border border-gray-200 text-sm text-description focus:outline-none focus:ring-1 focus:ring-main"
        >
          <option value="all">{t("allCategory") || "All Category"}</option>
          {categories.map((category) => (
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Course Grid Layout: 1 row 4 cards on desktop (grid-cols-4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isCoursesLoading || isCoursesFetching ? (
          Array.from({ length: 8 }).map((_, index) => (
            <MentorCourseCardSkeleton key={`mentor-skeleton-${index}`} />
          ))
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <MentorCourseCard
              key={course.id}
              course={course}
            />
          ))
        ) : (
          <div className="col-span-full bg-white border border-border-light rounded-xl p-12 text-center flex flex-col items-center justify-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#EBEBFF] flex items-center justify-center mb-4 text-main shrink-0">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-title">{t("noCoursesFound") || "No Contracts Found"}</h3>
            <p className="text-sm text-description mt-2">
              There are no active course contracts affiliated with your profile at this moment.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MyCoursesPage;