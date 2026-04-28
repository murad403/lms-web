"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import DeleteCourseModal from "@/components/modal/DeleteCourseModal";
import Pagination from "@/components/reusable/Pagination";
import { TInstructorCourse } from "@/lib/instructor";
import DashboardCourseCard, { DashboardCourseCardSkeleton } from "@/components/reusable/for-dashboard/DashboardCourseCard";
import { useTranslations } from "next-intl";
import { useCourseCategoriesQuery, useMyCoursesQuery } from "@/redux/features/instructor/instructor.api";
import { resolveImageUrl } from "@/utils/image";

const MyCoursesPage = () => {
    const path = "/instructor";
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; courseId: number | null; courseName: string }>({
        open: false,
        courseId: null,
        courseName: "",
    });
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

    const { data: myCoursesData, isLoading: isCoursesLoading, isFetching: isCoursesFetching } = useMyCoursesQuery({
        page: currentPage,
        page_size: 10,
        ...(debouncedSearch.trim() && { search: debouncedSearch.trim() }),
        ...(selectedCategory !== "all" && { category: Number(selectedCategory) }),
    });

    const categories = categoryData?.data || [];
    const courses: TInstructorCourse[] = (myCoursesData?.data || []).map((course) => ({
        id: course.id,
        title: course.title,
        image:
            resolveImageUrl(course.advance_info?.thumbnail) ||
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        category: course.Category || "N/A",
        rating: Number(course.rating) || 0,
        reviews: String(course.reviews_count || 0),
        students: String(course.reviews_count || 0),
        price: Number(course.price) || 0,
        status:
            course.status === "published" || course.status === "accepted"
                ? "Published"
                : course.status === "draft"
                    ? "Draft"
                    : "Under Review",
    }));

    const totalPages = myCoursesData?.total_pages || 1;

    const handleDelete = (id: number) => {
        const course = courses.find((c) => c.id === id);
        setDeleteModal({ open: true, courseId: id, courseName: course?.title || "" });
    };

    const confirmDelete = () => {
        // TODO: API call to delete course
        console.log("Deleting course:", deleteModal.courseId);
        setDeleteModal({ open: false, courseId: null, courseName: "" });
    };

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
                        placeholder={t("searchPlaceholder")}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-main bg-white"
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="px-4 py-3 bg-white text-sm text-description focus:outline-none focus:border-main"
                >
                    <option value="all">{t("allCategory")}</option>
                    {categories.map((category) => (
                        <option key={category.id} value={String(category.id)}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {isCoursesLoading || isCoursesFetching ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <DashboardCourseCardSkeleton key={`course-skeleton-${index}`} />
                    ))
                ) : courses.length > 0 ? (
                    courses.map((course) => (
                        <DashboardCourseCard
                            path={path}
                            key={course.id}
                            course={course}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-description">
                        {t("noCoursesFound")}
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

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