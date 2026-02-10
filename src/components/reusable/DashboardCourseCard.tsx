"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { Link } from "@/i18n/navigation";

type DashboardCourseCardProps = {
  course: {
    id: number;
    title: string;
    image: string;
    lessonNumber?: number;
    lessonTitle?: string;
    progress?: number;
  };
};

const DashboardCourseCard = ({ course }: DashboardCourseCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <div className="relative h-36 sm:h-40 w-full">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-[10px] sm:text-xs text-description mb-1 truncate">
          {course.title}
        </p>
        <p className="text-xs sm:text-sm font-semibold text-title mb-3 line-clamp-1">
          {course.lessonNumber}. {course.lessonTitle}
        </p>
        <Link
          href={`/course/${course.id}`}
          className={`block text-center py-2 rounded text-xs sm:text-sm font-semibold transition-colors ${
            course.progress && course.progress > 0
              ? "bg-white border border-main text-main hover:bg-main/5"
              : "bg-main text-white hover:bg-main/90"
          }`}
        >
          Watch Lecture
        </Link>
        {course.progress !== undefined && course.progress > 0 && (
          <p className="text-xs text-main mt-2 text-center font-medium">
            {course.progress}% Completed
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardCourseCard;
