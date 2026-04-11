"use client";
import { useRef, useState } from 'react'
import ProfileAbout from '@/components/reusable/for-dashboard/ProfileAbout'
import ProfileTabs from '@/components/reusable/for-dashboard/ProfileTabs'
import { instructorProfile, instructorCourses } from '@/lib/instructor'
import Image from 'next/image'
import { Star, Upload, Users, CirclePlay } from 'lucide-react'
import { useTranslations } from 'next-intl';

const publicReviews = [
  {
    id: 1,
    name: "Guy Hawkins",
    avatar: "/home/user1.png",
    timeAgo: "1 week ago",
    rating: 5,
    comment:
      "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.",
  },
  {
    id: 2,
    name: "Dianna Russell",
    avatar: "/home/user1.png",
    timeAgo: "30 mins ago",
    rating: 5,
    comment:
      "This course is just amazing! has great course content, the best practices, and a lot of real-world knowledge. I love the way of giving examples, the best tips by the instructor which are pretty interesting, fun and knowledgeable.",
  },
  {
    id: 3,
    name: "Bessie Cooper",
    avatar: "/home/user1.png",
    timeAgo: "2 hours ago",
    rating: 5,
    comment:
      "Webflow course was good, it covers design section, and to build responsive web pages, blog, and some more tricks and tips about webflow. I enjoyed the course and it helped me. Thank you Vako.",
  },
  {
    id: 4,
    name: "Eleanor Pena",
    avatar: "/home/user1.png",
    timeAgo: "1 day ago",
    rating: 5,
    comment:
      "I appreciate the precise short videos because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design. These were my best 6 months of training. Thanks, Vako.",
  },
  {
    id: 5,
    name: "Ralph Edwards",
    avatar: "/home/user1.png",
    timeAgo: "2 days ago",
    rating: 5,
    comment:
      "GREAT Course! Instructor was very descriptive and professional. I learned a TON that is going to apply immediately to real life work. Thanks so much, cant wait for the next one!",
  },
  {
    id: 6,
    name: "Arlene McCoy",
    avatar: "/home/user1.png",
    timeAgo: "1 week ago",
    rating: 5,
    comment:
      "This should be one of the best courses I ever made about UX/UI in Udemy. Highly recommend to those who is new to UX/UI and want to become UX/UI freelancer!",
  },
];

const Page = () => {
  const profile = instructorProfile;
  const publishedCourses = instructorCourses.filter((c) => c.status === "Published");
  const [bannerSrc, setBannerSrc] = useState("/home/user1.png");
  const [avatarSrc, setAvatarSrc] = useState(profile.avatar);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("OrganizationProfile");

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setBannerSrc(URL.createObjectURL(file));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarSrc(URL.createObjectURL(file));
  };

  return (
    <div>
      <div className="container mx-auto space-y-8">
        {/* Profile Header */}
        <div>
          {/* Banner */}
          <div className="relative w-full h-52 sm:h-64 rounded-none overflow-hidden">
            <Image
              src={bannerSrc}
              alt="Organization Banner"
              fill
              className="object-cover"
            />
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerChange}
            />
            <button
              onClick={() => bannerInputRef.current?.click()}
              className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 hover:bg-white text-sm font-medium text-title px-4 py-2 rounded shadow transition-colors"
            >
              <Upload className="w-4 h-4" />
              {t("uploadBanner")}
            </button>
          </div>

          {/* Avatar + Info */}
          <div className="px-4 sm:px-6">
            {/* Avatar overlapping banner */}
            <div
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md -mt-14 sm:-mt-16 cursor-pointer group"
              onClick={() => avatarInputRef.current?.click()}
            >
              <Image
                src={avatarSrc}
                alt="Organization Avatar"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* Name, bio, stats */}
            <div className="mt-4 space-y-2">
              <h1 className="text-2xl font-bold text-title">{t("schoolName")}</h1>
              <p className="text-sm text-description max-w-md leading-relaxed">
                {profile.bio.slice(0, 140)}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-title">5.0</span>
                  <span className="text-sm text-description">(500 {t("review")})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-description" />
                  <span className="text-sm font-bold text-title">500</span>
                  <span className="text-sm text-description">{t("students")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CirclePlay className="w-4 h-4 text-main" />
                  <span className="text-sm font-bold text-title">10</span>
                  <span className="text-sm text-description">{t("courses")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>



        <ProfileAbout />
        <ProfileTabs profile={profile} publishedCourses={publishedCourses} publicReviews={publicReviews} />
      </div>
    </div>
  )
}

export default Page
