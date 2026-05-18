import { Link } from "@/i18n/navigation";
import { MentorCourseContract } from "@/redux/features/mentor/mentor.type";
import { ArrowRight, Building2, Calendar, DollarSign, Percent, Tag } from "lucide-react";
import Image from "next/image";
import { resolveImageUrl } from "@/utils/image";

const MentorCourseCard = ({ course }: { course: MentorCourseContract }) => {
  const formattedDate = course.expiry_date
    ? new Date(course.expiry_date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";

  return (
    <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
      {/* Header Banner Background / Course Thumbnail */}
      <div className="relative h-44 w-full bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden shrink-0 flex items-center justify-center">
        {course.course_thumbnail ? (
          <Image
            src={resolveImageUrl(course.course_thumbnail)}
            alt={course.course_title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-black/10" />
        )}
        
        {/* Category Badge (Top-Left) */}
        <div className="absolute top-3 left-3 shrink-0 z-10">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#0C2A66] px-3 py-1.5 rounded-full shadow-sm">
            <Tag className="w-3 h-3 shrink-0 text-main" />
            {course.course_category || "Web Development"}
          </span>
        </div>

        {/* Status Badge (Top-Right) */}
        <div className="absolute top-3 right-3 shrink-0 z-10">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${
            course.status?.toLowerCase() === "ongoing"
              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
              : "bg-amber-100 text-amber-800 border border-amber-200"
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              course.status?.toLowerCase() === "ongoing" ? "bg-emerald-500" : "bg-amber-500"
            }`} />
            {course.status || "Ongoing"}
          </span>
        </div>

        {/* Large Text Overlay representing course abbreviation (only if no thumbnail) */}
        {!course.course_thumbnail && (
          <div className="text-center text-white z-10 font-black text-2xl tracking-widest select-none drop-shadow-md uppercase opacity-85">
            {course.course_title?.slice(0, 3) || "LMS"}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Increased Title font size to text-lg */}
          <h3 className="text-lg font-bold text-title line-clamp-1 leading-snug group-hover:text-main transition-colors" title={course.course_title}>
            {course.course_title}
          </h3>
          
          {/* Increased organization font size to text-sm */}
          <div className="flex items-center gap-2 text-sm text-description mt-2">
            <Building2 className="w-4 h-4 text-description shrink-0" />
            <span className="truncate">{course.organization_name}</span>
          </div>

          {/* Pricing and Rev Share */}
          <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-border-light">
            <div className="space-y-1.5">
              <span className="text-xs uppercase font-bold text-description tracking-wider block">Course Price</span>
              {/* Increased Price font size to text-lg */}
              <div className="flex items-center text-lg font-extrabold text-title">
                <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{course.course_price}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <span className="text-xs uppercase font-bold text-description tracking-wider block">Rev Share</span>
              {/* Increased Share font size to text-lg */}
              <div className="flex items-center text-lg font-extrabold text-title gap-0.5">
                <span>{course.revenue_share}</span>
                <Percent className="w-4 h-4 text-main shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Expiry and CTA */}
        <div className="pt-4 border-t border-border-light space-y-4">
          {/* Increased expiry date font size to text-sm */}
          <div className="flex items-center gap-2 text-sm text-description">
            <Calendar className="w-4 h-4 text-description shrink-0" />
            <span>Expiry: {formattedDate}</span>
          </div>

          {/* Premium button CTA */}
          <Link
            href={`/mentor/my-courses/${course.course_id}`}
            className="w-full flex items-center justify-center gap-2 bg-[#EBEBFF] hover:bg-main text-main hover:text-white transition-all duration-300 font-bold py-3 px-4 rounded-xl text-sm tracking-wide shrink-0"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MentorCourseCard;