"use client";

import { CourseCard } from "@/components/affiliate/course/CourseCard";
import { CourseSearchFilter } from "@/components/affiliate/course/Coursesearchfilter";
import Pagination from "@/components/reusable/Pagination";
import React, { useState } from "react";

const demoCourses = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Convex_lens_%28magnifying_glass%29_and_upside-down_image.jpg/500px-Convex_lens_%28magnifying_glass%29_and_upside-down_image.jpg",
    category: "DEVELOPMENT",
    title: "Premiere Pro CC for Beginners: Video Editing in Premiere",
    rating: 4.9,
    students: 982941,
    price: 24.0,
    currency: "$",
    affiliateUrl: "https://example.com/affiliate/1",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Convex_lens_%28magnifying_glass%29_and_upside-down_image.jpg/500px-Convex_lens_%28magnifying_glass%29_and_upside-down_image.jpg",
    category: "DESIGN",
    title: "Mastering Photoshop: From Beginner to Pro",
    rating: 4.8,
    students: 543210,
    price: 30.0,
    currency: "$",
    affiliateUrl: "https://example.com/affiliate/2",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Convex_lens_%28magnifying_glass%29_and_upside-down_image.jpg/500px-Convex_lens_%28magnifying_glass%29_and_upside-down_image.jpg",
    category: "MARKETING",
    title: "SEO Fundamentals: Rank Higher in Google",
    rating: 4.7,
    students: 120000,
    price: 19.0,
    currency: "$",
    affiliateUrl: "https://example.com/affiliate/3",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Convex_lens_%28magnifying_glass%29_and_upside-down_image.jpg/500px-Convex_lens_%28magnifying_glass%29_and_upside-down_image.jpg",
    category: "BUSINESS",
    title: "Business Strategy: Grow Your Startup",
    rating: 4.9,
    students: 87654,
    price: 40.0,
    currency: "$",
    affiliateUrl: "https://example.com/affiliate/4",
  },
];

const Page = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-[95vh] flex flex-col space-y-6 sm:space-y-8">
      <CourseSearchFilter
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        className="w-full"
      />
      {/* Responsive grid */}
      <div className="flex-1">
        <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {demoCourses.map((course, idx) => (
            <CourseCard
              key={idx}
              image={course.image}
              category={course.category}
              title={course.title}
              rating={course.rating}
              students={course.students}
              price={course.price}
              currency={course.currency}
              affiliateUrl={course.affiliateUrl}
              className="w-full"
            />
          ))}
        </div>
      </div>

      <div className="">
        <Pagination
          totalPages={3}
          maxVisiblePages={4}
          currentPage={1}
          onPageChange={() => {}}
        ></Pagination>
      </div>
    </div>
  );
};

export default Page;
