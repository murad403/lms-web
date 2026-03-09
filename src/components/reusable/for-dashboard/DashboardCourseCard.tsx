"use client";
import { useState } from "react";
import Image from "next/image";
import { Star, Users, MoreHorizontal } from "lucide-react";
import { TInstructorCourse } from "@/lib/instructor";
import CourseActionsModal from "@/components/modal/CourseActionsModal";
import { useTranslations } from "next-intl";

type DashboardCourseCardProps = {
  course: TInstructorCourse;
  onDelete: (id: number) => void;
  path: string;
};

const DashboardCourseCard = ({ course, onDelete, path }: DashboardCourseCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const t = useTranslations("InstructorMyCourses");

  return (
    <div className="bg-white overflow-hidden group relative">
      {/* Image */}
      <div className="relative h-65 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xs bg-[#EBEBFF] inline-block p-1 rounded-xs font-medium text-[#342F98] uppercase tracking-wider mb-1">
          {course.category}
        </h3>
        <h3 className="text-base font-semibold text-title line-clamp-2 mb-3 min-h-10">
          {course.title}
        </h3>
        <div className="flex items-center gap-3 text-xs border-y border-border-light py-4 justify-between text-description mb-3">
          <div className="flex items-center gap-1">
            <Star className="size-5 text-orange-400 fill-orange-400" />
            <span className="font-medium text-title text-sm">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="size-5 text-[#564FFD]" />
            <span className="text-sm">{course.students} {t("students")}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-title">${course.price.toFixed(2)}</p>
          <button
            onClick={() => setShowModal(true)}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Course Actions Modal */}
      <CourseActionsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        courseId={course.id}
        onDelete={onDelete}
        path={path}
      />
    </div>
  );
};

export default DashboardCourseCard;
