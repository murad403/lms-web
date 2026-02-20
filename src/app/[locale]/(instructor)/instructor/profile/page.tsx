"use client";
import { useState } from "react";
import Image from "next/image";
import { Star, Users, ChevronDown, ArrowRight, CirclePlay } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { instructorProfile, instructorCourses } from "@/lib/instructor";
import ProfileAbout from "@/components/reusable/for-dashboard/ProfileAbout";

const publicReviews = [
    {
        id: 1,
        name: "Guy Hawkins",
        avatar: "/home/banner.jpg",
        timeAgo: "1 week ago",
        rating: 5,
        comment:
            "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.",
    },
    {
        id: 2,
        name: "Dianna Russell",
        avatar: "/home/banner.jpg",
        timeAgo: "30 mins ago",
        rating: 5,
        comment:
            "This course is just amazing! has great course content, the best practices, and a lot of real-world knowledge. I love the way of giving examples, the best tips by the instructor which are pretty interesting, fun and knowledgeable.",
    },
    {
        id: 3,
        name: "Bessie Cooper",
        avatar: "/home/banner.jpg",
        timeAgo: "2 hours ago",
        rating: 5,
        comment:
            "Webflow course was good, it covers design section, and to build responsive web pages, blog, and some more tricks and tips about webflow. I enjoyed the course and it helped me. Thank you Vako.",
    },
    {
        id: 4,
        name: "Eleanor Pena",
        avatar: "/home/banner.jpg",
        timeAgo: "1 day ago",
        rating: 5,
        comment:
            "I appreciate the precise short videos because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design. These were my best 6 months of training. Thanks, Vako.",
    },
    {
        id: 5,
        name: "Ralph Edwards",
        avatar: "/home/banner.jpg",
        timeAgo: "2 days ago",
        rating: 5,
        comment:
            "GREAT Course! Instructor was very descriptive and professional. I learned a TON that is going to apply immediately to real life work. Thanks so much, cant wait for the next one!",
    },
    {
        id: 6,
        name: "Arlene McCoy",
        avatar: "/home/banner.jpg",
        timeAgo: "1 week ago",
        rating: 5,
        comment:
            "This should be one of the best courses I ever made about UX/UI in Udemy. Highly recommend to those who is new to UX/UI and want to become UX/UI freelancer!",
    },
];

const InstructorProfilePage = () => {
    const [activeTab, setActiveTab] = useState("courses");
    const [ratingFilter, setRatingFilter] = useState("5 Star Rating");
    const [showAllReviews, setShowAllReviews] = useState(false);
    const profile = instructorProfile;
    const publishedCourses = instructorCourses.filter((c) => c.status === "Published");
    const visibleReviews = showAllReviews ? publicReviews : publicReviews.slice(0, 4);

    return (
        <div>
            {/* Profile Header */}
            <div className="bg-white container mx-auto">
                <div className=" mx-auto px-4 py-10">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
                            <Image
                                src={profile.avatar}
                                alt={`${profile.firstName} ${profile.lastName}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold text-title">
                                {profile.firstName} {profile.lastName}
                            </h1>
                            <p className="text-sm text-description mt-1">{profile.title}</p>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold text-title">4.8</span>
                                    <span className="text-xs text-description">
                                        ({(134633).toLocaleString()} reviews)
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4 text-description" />
                                    <span className="text-sm text-description">430,117 students</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CirclePlay className="w-4 h-4 text-main" />
                                    <span className="text-sm text-description">7 courses</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="container mx-auto py-8 space-y-8">
                {/* About Me */}
                <ProfileAbout/>

                {/* Tabs */}
                <div>
                    <div className="flex border-b border-border-light bg-white">
                        {["courses", "reviews"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 text-sm font-semibold capitalize transition-colors border-b-4 -mb-px ${activeTab === tab
                                    ? "border-main text-main"
                                    : "border-transparent text-description hover:text-title"
                                    }`}
                            >
                                {tab === "courses" ? "Courses" : "Review"}
                            </button>
                        ))}
                    </div>

                    {/* Courses Tab */}
                    {activeTab === "courses" && (
                        <div className="mt-6 space-y-4">
                            <h3 className="text-lg font-bold text-title">
                                {profile.firstName} Courses ({publishedCourses.length.toString().padStart(2, "0")})
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {publishedCourses.map((course) => (
                                    <Link
                                        key={course.id}
                                        href={`/course/${course.id}`}
                                        className="bg-white border border-border-light overflow-hidden hover:shadow-md transition-shadow block"
                                    >
                                        <div className="relative h-50 w-full">
                                            <Image
                                                src={course.image}
                                                alt={course.title}
                                                fill
                                                className="object-cover"
                                            />

                                        </div>
                                        <div className="p-3 space-y-1.5">
                                            <div className="flex justify-between items-center">

                                                <div className="bg-[#EBEBFF] text-xs font-semibold text-main uppercase px-2 py-0.5 rounded">
                                                    {course.category}
                                                </div>
                                                <div className="  text-lg font-bold text-title">
                                                    ${course.price}
                                                </div>
                                            </div>
                                            <h4 className="text-base font-semibold text-title line-clamp-2 leading-snug">
                                                {course.title}
                                            </h4>
                                            <div className="flex items-center justify-between text-sm text-description">
                                                <div className="flex items-center gap-1">
                                                    <Star className="size-4 text-yellow-400 fill-yellow-400" />
                                                    <span className="font-medium text-title">{course.rating}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-3.5 h-3.5" />
                                                    <span>{course.students} students</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reviews Tab */}
                    {activeTab === "reviews" && (
                        <div className="mt-6 space-y-5">
                            <div className="flex items-center justify-between flex-wrap gap-3">
                                <h3 className="text-xl font-bold text-title">Students Feedback</h3>
                                <div className="relative">
                                    <select
                                        value={ratingFilter}
                                        onChange={(e) => setRatingFilter(e.target.value)}
                                        className="appearance-none border border-border-light rounded text-sm text-description px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-main bg-white"
                                    >
                                        <option>5 Star Rating</option>
                                        <option>4 Star Rating</option>
                                        <option>3 Star Rating</option>
                                        <option>2 Star Rating</option>
                                        <option>1 Star Rating</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-description absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-5">
                                {visibleReviews.map((review) => (
                                    <div key={review.id} className="flex gap-3">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                                            <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-sm font-semibold text-title">{review.name}</span>
                                                <span className="text-xs text-description"> {review.timeAgo}</span>
                                            </div>
                                            <div className="flex items-center gap-0.5 mt-1">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star
                                                        key={s}
                                                        className={`w-3.5 h-3.5 ${s <= review.rating
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-300 fill-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm text-description mt-1.5 leading-relaxed">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {!showAllReviews && publicReviews.length > 4 && (
                                <div className="flex justify-center pt-2">
                                    <button
                                        onClick={() => setShowAllReviews(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 border border-border-light rounded text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                                    >
                                        Load More
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstructorProfilePage;