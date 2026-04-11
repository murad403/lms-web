"use client";
import Image from "next/image";
import { Star, Heart, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { EnrolledCourse } from "@/redux/features/student/student.api";
import { resolveImageUrl } from "@/utils/image";
import defaultUserImage from "@/assets/partnership/user2.png";

type EnrolledCourseCardProps = {
    course: EnrolledCourse;
};

const EnrolledCourseCard = ({ course }: EnrolledCourseCardProps) => {
    const t = useTranslations("EnrolledCourseCard");

    return (
        <div className="bg-white rounded-md overflow-hidden border border-border-light hover:shadow-lg transition-shadow w-full">
            {/* Image */}
            <div className="relative h-50 sm:h-60 w-full">
                <Image
                    src={resolveImageUrl(course.course_thumbnail)}
                    alt={course.course_title}
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
                <div className="flex items-center justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2">
                        <div className="relative size-8 rounded-full overflow-hidden bg-gray-100">
                            <Image
                                src={course.instructor_profile ? resolveImageUrl(course.instructor_profile) : defaultUserImage}
                                alt={course.instructor}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-sm text-description font-medium line-clamp-1">{course.instructor}</p>
                    </div>
                    <span className="text-xs sm:text-sm bg-[#F4F6F9] text-title px-2 py-1 rounded-lg font-medium whitespace-nowrap">
                        {course.category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-title mb-2 line-clamp-2">
                    {course.course_title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-description">
                        {Number(course.ratings || 0).toFixed(1)}
                    </span>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-navy-blue">${parseFloat(course.course_price) || 0}</span>
                    <Link
                        href={`/course-player/${course.course}`}
                        className="px-4 py-2 bg-main text-white rounded text-sm font-semibold hover:bg-main/90 transition-colors flex items-center gap-1"
                    >
                        {t("viewCourse")}
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-4 mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                            className="bg-main h-1.5 rounded-full transition-all"
                            style={{ width: `${course.progress_percentage}%` }}
                        />
                    </div>
                    <p className="text-sm text-success font-medium text-nowrap">{course.progress_percentage}%</p>
                </div>

                {/* Status */}
                <div className="mt-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${course.is_completed
                        ? "bg-green-100 text-green-700"
                        : course.is_active
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                        {course.is_completed ? t("completed") : course.is_active ? "Active" : "Not Started"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EnrolledCourseCard;
