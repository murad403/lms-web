"use client";
import Image from "next/image";
import { Star, Users, CirclePlay } from "lucide-react";
import { instructorProfile, instructorCourses } from "@/lib/instructor";
import ProfileAbout from "@/components/reusable/for-dashboard/ProfileAbout";
import ProfileTabs from "@/components/reusable/for-dashboard/ProfileTabs";

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
    const profile = instructorProfile;
    const publishedCourses = instructorCourses.filter((c) => c.status === "Published");

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
                <ProfileTabs profile={profile} publishedCourses={publishedCourses} publicReviews={publicReviews} />
            </div>
        </div>
    );
};

export default InstructorProfilePage;