"use client";
import { useState } from "react";
import { Search, CheckCircle, XCircle, X, Star } from "lucide-react";
import { attendanceRecords, TAttendanceRecord } from "@/lib/organization";
import Image from "next/image";
import { useForm } from "react-hook-form";

type ReviewForm = {
  rating: number;
  comment: string;
};

const statusColors: Record<string, string> = {
  Present: "bg-green-50 text-green-700",
  Absent: "bg-red-50 text-red-700",
};

const AttendanceTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<TAttendanceRecord | null>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const { register, handleSubmit, reset } = useForm<ReviewForm>();

  const filteredRecords = attendanceRecords.filter(
    (r) =>
      searchQuery === "" ||
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openReviewModal = (student: TAttendanceRecord) => {
    setSelectedStudent(student);
    setSelectedRating(0);
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (data: ReviewForm) => {
    console.log("Review:", selectedStudent?.id, { ...data, rating: selectedRating });
    setShowReviewModal(false);
    setSelectedStudent(null);
    setSelectedRating(0);
    reset();
  };

  return (
    <div className="bg-white mt-6">
      <div className="p-6 border-b border-border-light flex items-center justify-between">
        <h3 className="text-base font-semibold text-title">Attendance Log</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 text-sm border border-border-light focus:outline-none focus:border-main w-56"
          />
        </div>
      </div>

      <div className="p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-light">
              <th className="text-left py-3 px-3 font-medium text-description">Student Name</th>
              <th className="text-left py-3 px-3 font-medium text-description">Course</th>
              <th className="text-left py-3 px-3 font-medium text-description">Instructor</th>
              <th className="text-left py-3 px-3 font-medium text-description">Attendance</th>
              <th className="text-left py-3 px-3 font-medium text-description">Login Time</th>
              <th className="text-left py-3 px-3 font-medium text-description">Logout Time</th>
              <th className="text-left py-3 px-3 font-medium text-description">Session Duration</th>
              <th className="text-left py-3 px-3 font-medium text-description">Status</th>
              <th className="text-left py-3 px-3 font-medium text-description">Review</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} className="border-b border-border-light last:border-0">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image src={record.avatar} alt={record.studentName} fill className="object-cover" />
                    </div>
                    <span className="text-title font-medium">{record.studentName}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-description max-w-37.5 truncate">{record.course}</td>
                <td className="py-3 px-3 text-description">{record.instructor}</td>
                <td className="py-3 px-3">
                  {record.attendance ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </td>
                <td className="py-3 px-3 text-description">{record.loginTime}</td>
                <td className="py-3 px-3 text-description">{record.logoutTime}</td>
                <td className="py-3 px-3 text-description">{record.sessionDuration}</td>
                <td className="py-3 px-3">
                  <span className={`px-3 py-1 text-xs font-medium ${statusColors[record.status]}`}>
                    {record.status}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <button
                    onClick={() => openReviewModal(record)}
                    className="text-sm text-main hover:text-main/80 font-medium"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border-light">
              <h2 className="text-lg font-semibold text-title">Write Review</h2>
              <button onClick={() => { setShowReviewModal(false); setSelectedStudent(null); reset(); }}>
                <X className="w-5 h-5 text-description" />
              </button>
            </div>

            <form onSubmit={handleSubmit(handleReviewSubmit)} className="p-6 space-y-4">
              {/* Student Info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={selectedStudent.avatar} alt={selectedStudent.studentName} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-title">{selectedStudent.studentName}</p>
                  <p className="text-xs text-description">{selectedStudent.course}</p>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-title mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setSelectedRating(star)}
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= (hoverRating || selectedRating)
                            ? "text-orange-400 fill-orange-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-title mb-1">Comment</label>
                <textarea
                  {...register("comment")}
                  rows={4}
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main resize-none"
                  placeholder="Write your review..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowReviewModal(false); setSelectedStudent(null); reset(); }}
                  className="flex-1 px-4 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
