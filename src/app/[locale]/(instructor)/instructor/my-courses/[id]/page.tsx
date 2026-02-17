"use client";
import Image from "next/image";
import {
  Star,
  BookOpen,
  MessageSquare,
  Users,
  Paperclip,
  Globe,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import RevenueChart from "@/app/[locale]/(instructor)/instructor/dashboard/RevenueChart";
import OverallRating from "@/app/[locale]/(instructor)/instructor/dashboard/OverallRating";
import CourseOverviewChart from "@/app/[locale]/(instructor)/instructor/dashboard/CourseOverviewChart";
import {
  instructorCourseDetail,
  revenueData,
  ratingBreakdown,
  courseOverviewData,
} from "@/lib/instructor";
import { Link } from "@/i18n/navigation";

const CourseDetailPage = () => {
  const course = instructorCourseDetail;

  const infoCards = [
    { icon: BookOpen, value: course.lectureCount.toLocaleString(), label: "Lectures", sub: course.lectureSize },
    { icon: MessageSquare, value: course.totalComments.toLocaleString(), label: "Total Comments", sub: "" },
    { icon: Users, value: course.studentsEnrolled.toLocaleString(), label: "Students enrolled", sub: "" },
    { icon: Paperclip, value: course.attachFiles.toString(), label: "Attach File", sub: course.attachSize },
    { icon: Globe, value: course.language, label: "Course Language", sub: "" },
    { icon: Clock, value: course.totalHours, label: "Hours", sub: "" },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-description">
        <Link href="/instructor/my-courses" className="hover:text-main">
          Course
        </Link>
        {" > "}
        <Link href="/instructor/my-courses" className="hover:text-main">
          My Courses
        </Link>
        {" > "}
        <span className="text-title font-medium">{course.title}</span>
      </div>

      {/* Course Header */}
      <div className="bg-white rounded-lg border border-border-light p-5">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Course Image */}
          <div className="relative w-full md:w-64 h-48 rounded-lg overflow-hidden shrink-0">
            <Image src={course.image} alt={course.title} fill className="object-cover" />
            <span className="absolute top-3 left-3 bg-main text-white text-[10px] font-bold px-2 py-0.5 rounded">
              DEVELOPMENT
            </span>
          </div>

          {/* Course Info */}
          <div className="flex-1">
            <p className="text-xs text-description">
              Published: {course.publishedDate} &nbsp; Last updated: {course.lastUpdated}
            </p>
            <h2 className="text-xl font-bold text-title mt-1">{course.title}</h2>
            <p className="text-sm text-description mt-1">{course.description}</p>

            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs text-description">Created by:</span>
              <div className="flex items-center gap-1">
                {course.creators.map((creator, i) => (
                  <span key={i} className="text-sm font-medium text-main">
                    {creator}{i < course.creators.length - 1 ? " • " : ""}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(course.rating) ? "text-orange-400 fill-orange-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm font-semibold text-title ml-1">{course.rating}</span>
              <span className="text-xs text-description ml-1">({course.ratingCount})</span>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <div>
                <span className="text-lg font-bold text-title">${course.price}</span>
                <span className="text-xs text-description ml-1">Course price</span>
              </div>
              <div>
                <span className="text-lg font-bold text-title">${course.totalRevenue.toLocaleString()}</span>
                <span className="text-xs text-description ml-1">USD dollar Revenue</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button className="px-5 py-2.5 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors">
                Withdraw Money
              </button>
              <button className="p-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {infoCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-border-light p-4 text-center">
              <Icon className="w-6 h-6 mx-auto text-main mb-2" />
              <p className="text-xl font-bold text-title">{card.value}</p>
              <p className="text-xs text-description">{card.label}</p>
              {card.sub && <p className="text-[10px] text-description">{card.sub}</p>}
            </div>
          );
        })}
      </div>

      {/* Overall Rating */}
      <div className="flex items-center justify-between bg-white rounded-lg border border-border-light p-5">
        <h3 className="text-base font-bold text-title">Overall Course Rating</h3>
        <select className="text-sm text-description border border-gray-200 rounded-md px-2 py-1">
          <option>This week</option>
        </select>
      </div>

      <OverallRating rating={course.rating} breakdown={ratingBreakdown} />

      {/* Revenue + Course Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <CourseOverviewChart data={courseOverviewData} />
      </div>
    </div>
  );
};

export default CourseDetailPage;
