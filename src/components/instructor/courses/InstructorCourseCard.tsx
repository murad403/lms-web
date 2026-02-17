"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Star, Users, MoreHorizontal, Eye, Pencil, Award, Trash2 } from "lucide-react";
import { TInstructorCourse } from "@/lib/instructor";
import { Link } from "@/i18n/navigation";

type InstructorCourseCardProps = {
  course: TInstructorCourse;
  onDelete: (id: number) => void;
};

const InstructorCourseCard = ({ course, onDelete }: InstructorCourseCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-lg border border-border-light overflow-hidden group">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-main text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
          {course.category}
        </span>

        {/* 3-dot menu */}
        <div className="absolute top-3 right-3" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
              <Link
                href={`/instructor/my-courses/${course.id}`}
                className="flex items-center gap-2 px-3 py-2 text-sm text-title hover:bg-gray-50 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Eye className="w-4 h-4" />
                View Details
              </Link>
              <Link
                href={`/instructor/create-course?edit=${course.id}`}
                className="flex items-center gap-2 px-3 py-2 text-sm text-title hover:bg-gray-50 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Pencil className="w-4 h-4" />
                Edit Course
              </Link>
              <Link
                href="/instructor/accreditation"
                className="flex items-center gap-2 px-3 py-2 text-sm text-title hover:bg-gray-50 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Award className="w-4 h-4" />
                Request Accreditation
              </Link>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onDelete(course.id);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <Trash2 className="w-4 h-4" />
                Delete Course
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-title line-clamp-2 mb-3 min-h-[40px]">
          {course.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-description mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span className="font-medium text-title">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{course.students} students</span>
          </div>
        </div>
        <p className="text-lg font-bold text-title">${course.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default InstructorCourseCard;
