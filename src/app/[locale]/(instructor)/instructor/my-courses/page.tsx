"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import InstructorCourseCard from "@/components/instructor/courses/InstructorCourseCard";
import DeleteCourseModal from "@/components/instructor/courses/DeleteCourseModal";
import Pagination from "@/components/reusable/Pagination";
import { instructorCourses } from "@/lib/instructor";

const COURSES_PER_PAGE = 8;

const MyCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; courseId: number | null; courseName: string }>({
    open: false,
    courseId: null,
    courseName: "",
  });

  const filteredCourses = instructorCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Category" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  const handleDelete = (id: number) => {
    const course = instructorCourses.find((c) => c.id === id);
    setDeleteModal({ open: true, courseId: id, courseName: course?.title || "" });
  };

  const confirmDelete = () => {
    // TODO: API call to delete course
    console.log("Deleting course:", deleteModal.courseId);
    setDeleteModal({ open: false, courseId: null, courseName: "" });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in your courses..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-main"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg text-sm text-description focus:outline-none focus:border-main"
        >
          <option>All Category</option>
          <option>DEVELOPMENT</option>
          <option>DESIGN</option>
          <option>MARKETING</option>
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedCourses.map((course) => (
          <InstructorCourseCard
            key={course.id}
            course={course}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Delete Modal */}
      <DeleteCourseModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, courseId: null, courseName: "" })}
        onConfirm={confirmDelete}
        courseName={deleteModal.courseName}
      />
    </div>
  );
};

export default MyCoursesPage;
