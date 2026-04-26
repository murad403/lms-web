"use client";
import { CourseCard } from "@/app/[locale]/(affiliate)/affiliate/courses/CourseCard";
import { ReferralModal } from "@/app/[locale]/(affiliate)/affiliate/courses/ReferralModal";
import { CourseSearchFilter } from "@/components/affiliate/course/Coursesearchfilter";
import Pagination from "@/components/reusable/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useCourseListQuery, useGenerateCourseReferralLinkMutation } from "@/redux/features/affiliate/affiliate.api";
import { GenerateReferralResponse } from "@/redux/features/affiliate/affiliate.type";
import React, { useState } from "react";

const CourseCardSkeleton = () => (
  <div className="bg-white rounded-sm border border-gray-100 overflow-hidden flex flex-col">
    <Skeleton className="h-48 w-full rounded-none" />

    <div className="flex flex-col gap-3 p-4 flex-1">
      <Skeleton className="h-5 w-20 rounded-none" />

      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <div className="border-t border-gray-100" />

      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-8" />
      </div>

      <div className="border-t border-gray-100" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>

    <div className="px-4 pb-4">
      <Skeleton className="h-11 w-full rounded-md" />
    </div>
  </div>
);

const Page = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [modalData, setModalData] = useState<GenerateReferralResponse["data"] | null>(null);

  const { data, isLoading } = useCourseListQuery({ search, page: currentPage });
  const [generateReferralLink] = useGenerateCourseReferralLinkMutation();

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleGenerateLink = async (courseId: number) => {
    setGeneratingId(courseId);
    try {
      const result = await generateReferralLink(courseId).unwrap();
      if (result.success) {
        setModalData(result.data);
      }
    } catch (error) {
      console.error("Failed to generate referral link", error);
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-[95vh] flex flex-col space-y-6 sm:space-y-8">
      <CourseSearchFilter
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={setCategory}
        className="w-full"
      />

      <div className="flex-1">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.data.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                image={course.course_thumbnail}
                category={course.category_name}
                title={course.title}
                price={parseFloat(course.price)}
                discountPrice={parseFloat(course.discount_price)}
                currency="$"
                className="w-full"
                onGenerateLink={handleGenerateLink}
                isGenerating={generatingId === course.id}
              />
            ))}
          </div>
        )}
      </div>

      {data && data.total_pages > 1 && (
        <Pagination
          totalPages={data.total_pages}
          maxVisiblePages={4}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Referral Modal */}
      <ReferralModal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        courseTitle={modalData?.course_title ?? ""}
        referralCode={modalData?.referral_code ?? ""}
        referralUrl={modalData?.referral_url ?? ""}
      />
    </div>
  );
};

export default Page;