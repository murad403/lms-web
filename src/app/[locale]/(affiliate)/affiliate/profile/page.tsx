"use client";

import Image from "next/image";
import { Star, Users, CirclePlay } from "lucide-react";
import ProfileAbout from "@/components/reusable/for-dashboard/ProfileAbout";
import ProfileTabs from "@/components/reusable/for-dashboard/ProfileTabs";
import { instructorCourses, instructorProfile } from "@/lib/instructor";

const affiliateProfile = {
  ...instructorProfile,
  firstName: "John",
  lastName: "Doe",
  avatar: "/home/banner.jpg",
  title: "Affiliate Partner",
  bio: "Helping learners discover the right courses and grow with trusted learning paths.",
};

const publicReviews = [
  {
    id: 1,
    name: "Guy Hawkins",
    avatar: "/home/banner.jpg",
    timeAgo: "1 week ago",
    rating: 5,
    comment:
      "Great recommendations and clear course guidance. Found exactly what I needed.",
  },
  {
    id: 2,
    name: "Dianna Russell",
    avatar: "/home/banner.jpg",
    timeAgo: "3 days ago",
    rating: 5,
    comment:
      "Very helpful profile and trusted reviews. The affiliate suggestions saved me time.",
  },
];

const AffiliateProfilePage = () => {
  const publishedCourses = instructorCourses.filter((c) => c.status === "Published");

  return (
    <div>
      <div className="bg-white container mx-auto">
        <div className="mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
              <Image
                src={affiliateProfile.avatar}
                alt={`${affiliateProfile.firstName} ${affiliateProfile.lastName}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-title">
                {affiliateProfile.firstName} {affiliateProfile.lastName}
              </h1>
              <p className="text-sm text-description mt-1">{affiliateProfile.title}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-title">4.9</span>
                  <span className="text-xs text-description">(2,145 reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-description" />
                  <span className="text-sm text-description">18,220 referrals</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CirclePlay className="w-4 h-4 text-main" />
                  <span className="text-sm text-description">24 promoted courses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 space-y-8">
        <ProfileAbout />
        <ProfileTabs
          profile={affiliateProfile}
          publishedCourses={publishedCourses}
          publicReviews={publicReviews}
        />
      </div>
    </div>
  );
};

export default AffiliateProfilePage;
