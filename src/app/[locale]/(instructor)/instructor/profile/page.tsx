"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Users, BookOpen, Pencil, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { instructorProfile, instructorCourses } from "@/lib/instructor";
import InstructorCourseCard from "@/app/[locale]/(instructor)/instructor/my-courses/InstructorCourseCard";

const tabs = [
    { id: "about", label: "About Me" },
    { id: "courses", label: "Courses" },
    { id: "reviews", label: "Reviews" },
];

const InstructorProfilePage = () => {
    const [activeTab, setActiveTab] = useState("about");
    const profile = instructorProfile;
    const courses = instructorCourses.slice(0, 6);

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg border border-border-light p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-border-light shrink-0">
                        <Image
                            src={profile.avatar}
                            alt={`${profile.firstName} ${profile.lastName}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-bold text-title">
                                    {profile.firstName} {profile.lastName}
                                </h2>
                                <p className="text-sm text-description mt-0.5">
                                    {profile.title}
                                </p>
                            </div>
                            <Link
                                href="/instructor/settings"
                                className="flex items-center gap-1.5 px-3 py-2 border border-border-light rounded-lg text-xs font-medium text-description hover:bg-gray-50 transition-colors shrink-0"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                                Edit Profile
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-medium text-title">
                                    {profile.rating}
                                </span>
                                <span className="text-xs text-description">
                                    ({profile.reviewCount} reviews)
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users className="w-4 h-4 text-main" />
                                <span className="text-sm text-description">
                                    {profile.studentCount.toLocaleString()} students
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <BookOpen className="w-4 h-4 text-main" />
                                <span className="text-sm text-description">
                                    {profile.courseCount} courses
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-border-light">
                <div className="flex gap-1 p-3 border-b border-border-light">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === tab.id
                                    ? "bg-main text-white"
                                    : "text-description hover:bg-gray-100"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="p-4 sm:p-6">
                    {/* About Me */}
                    {activeTab === "about" && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-bold text-title">
                                    About Me
                                </h3>
                                <Link
                                    href="/instructor/settings"
                                    className="text-xs text-main hover:underline flex items-center gap-1"
                                >
                                    <Pencil className="w-3 h-3" />
                                    Edit Bio
                                </Link>
                            </div>
                            <div className="text-sm text-description leading-relaxed whitespace-pre-line">
                                {profile.bio}
                            </div>
                        </div>
                    )}

                    {/* Courses */}
                    {activeTab === "courses" && (
                        <div>
                            {courses.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {courses.map((course) => (
                                        <InstructorCourseCard
                                            key={course.id}
                                            course={course}
                                            onDelete={() => {}}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 space-y-3">
                                    <BookOpen className="w-12 h-12 text-description mx-auto" />
                                    <p className="text-sm text-description">
                                        You haven&apos;t created any courses yet.
                                    </p>
                                    <Link
                                        href="/instructor/create-course"
                                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Create Course
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Reviews */}
                    {activeTab === "reviews" && (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="flex gap-3 pb-4 border-b border-border-light last:border-0 last:pb-0"
                                >
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                                        <Image
                                            src="/home/banner.jpg"
                                            alt="Reviewer"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-semibold text-title">
                                                Student {i}
                                            </h4>
                                            <span className="text-xs text-description">
                                                2 days ago
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-0.5 mt-1">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star
                                                    key={s}
                                                    className={`w-3.5 h-3.5 ${
                                                        s <= 4
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-description mt-1.5">
                                            Great course! The instructor explains everything clearly. 
                                            I learned a lot and would recommend this to anyone interested in the topic.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstructorProfilePage;
