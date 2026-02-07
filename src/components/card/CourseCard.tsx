import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { TCourse } from "@/lib/courses";

type CourseCardProps = {
    course: TCourse;
};

const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow shrink-0 w-full">
            {/* Image Section */}
            <div className="relative h-44 w-full">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                />
                {/* Wishlist Heart Icon */}
                <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                    <Heart className="w-5 h-5 text-gray-700" />
                </button>
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-base font-semibold text-title mb-2 line-clamp-2 min-h-12">
                    {course.title}
                </h3>

                {/* Category and Rating on same line */}
                <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-description uppercase">
                        {course.category}
                    </p>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                        <span className="text-sm font-semibold text-title">
                            {course.rating}{" "}
                            <span className="text-gray-400 font-normal">
                                ({course.reviews})
                            </span>
                        </span>
                    </div>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-title">
                        ${course.price}
                    </span>
                    <button className="px-6 py-2 bg-main text-white rounded text-sm font-semibold hover:bg-main/90 transition-colors">
                        Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
