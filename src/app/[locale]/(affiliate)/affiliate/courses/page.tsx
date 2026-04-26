"use client";
import { CourseCard } from "@/app/[locale]/(affiliate)/affiliate/courses/CourseCard";
import { ReferralModal } from "@/app/[locale]/(affiliate)/affiliate/courses/ReferralModal";
import { CourseSearchFilter } from "@/components/affiliate/course/Coursesearchfilter";
import Pagination from "@/components/reusable/Pagination";
import { useCourseListQuery, useGenerateCourseReferralLinkMutation } from "@/redux/features/affiliate/affiliate.api";
import { GenerateReferralResponse } from "@/redux/features/affiliate/affiliate.type";
import React, { useState } from "react";

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
              <div key={i} className="h-80 bg-gray-100 rounded-sm animate-pulse" />
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