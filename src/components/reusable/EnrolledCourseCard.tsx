"use client";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { TEnrolledCourse } from "@/lib/profile";

type EnrolledCourseCardProps = {
  course: TEnrolledCourse;
};

const EnrolledCourseCard = ({ course }: EnrolledCourseCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow w-full">
      {/* Image */}
      <div className="relative h-44 sm:h-48 w-full">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
        <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Instructor & Category */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={course.instructorAvatar}
                alt={course.instructor}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs text-description">{course.instructor}</span>
          </div>
          <span className="text-[10px] sm:text-xs bg-blue-50 text-main px-2 py-0.5 rounded font-medium">
            {course.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-title mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-semibold text-title">
            {course.rating}{" "}
            <span className="text-gray-400 font-normal">({course.reviews})</span>
          </span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-[#042F54]">${course.price}</span>
          <Link
            href={`/course/${course.id}`}
            className="px-4 py-1.5 bg-main text-white rounded text-xs font-semibold hover:bg-main/90 transition-colors flex items-center gap-1"
          >
            View Course <span>›</span>
          </Link>
        </div>

        {/* Progress */}
        <div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-main h-1.5 rounded-full transition-all"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <p className="text-xs text-success mt-1 font-medium">{course.progress}% Completed</p>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
