"use client";
import Image from "next/image";
import { X, Star, Users } from "lucide-react";
import { TAccreditationSubmission } from "@/lib/instructor";

type Props = {
  submission: TAccreditationSubmission;
  onClose: () => void;
};


const courseStatusColor: Record<string, string> = {
  Published: "bg-[#042F54] text-white",
  Draft: "bg-gray-200 text-gray-700",
  "Under Review": "bg-yellow-100 text-yellow-700",
};

const ReviewCourseModal = ({ submission, onClose }: Props) => {


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-3">
          <div>
            <h2 className="text-base font-bold text-title leading-snug">{submission.course}</h2>
            <p className="text-sm text-description mt-0.5">
              By {submission.instructor} &bull; {submission.organization}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-description transition-colors shrink-0 ml-3"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Course Image */}
        <div className="relative w-full h-52 mx-auto overflow-hidden px-5">
          <div className="relative w-full h-full overflow-hidden">
            <Image src={submission.image} alt={submission.course} fill className="object-cover" />
          </div>
        </div>

        {/* Category + Price */}
        <div className="flex items-center justify-between px-5 pt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-main bg-blue-50 px-3 py-1 rounded-full">
            {submission.category}
          </span>
          <span className="text-lg font-bold text-title">${submission.price}</span>
        </div>

        {/* Course Name */}
        <div className="px-5 pt-2">
          <p className="text-sm font-semibold text-title leading-snug">{submission.course}</p>
        </div>

        {/* Rating + Students */}
        <div className="flex items-center gap-5 px-5 pt-2 pb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-title">{submission.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-description">
            <Users className="w-4 h-4" />
            <span className="text-sm">{submission.students.toLocaleString()} students</span>
          </div>
        </div>
        <h3 className="px-5 text-sm font-semibold text-title">Overview</h3>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 rounded-xl p-4">
          <div className="border border-border-light rounded-md p-3 space-y-2">
            <p className="text-xs text-description">Category</p>
            <p className="text-sm font-semibold text-title mt-0.5">{submission.category}</p>
          </div>
          <div className="border border-border-light rounded-md p-3 space-y-2">
            <p className="text-xs text-description">Created</p>
            <p className="text-sm font-semibold text-title mt-0.5">{submission.created}</p>
          </div>
          <div className="border border-border-light rounded-md p-3 space-y-2">
            <p className="text-xs text-description">Total Revenue</p>
            <p className="text-sm font-semibold text-title mt-0.5">{submission.totalRevenue}</p>
          </div>
          <div className="border border-border-light rounded-md p-3 space-y-2">
            <p className="text-xs text-description">Status</p>
            <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-md ${courseStatusColor[submission.courseStatus]}`}>
              {submission.courseStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCourseModal;
