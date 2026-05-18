"use client";
import { useState, useEffect } from "react";
import ProfileAbout from "@/components/reusable/for-dashboard/ProfileAbout";
import ProfileTabs from "@/components/reusable/for-dashboard/ProfileTabs";
import Image from "next/image";
import { Star, Users, CirclePlay } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  useGetWhiteLabelQuery,
  useGetOrganizationCoursesQuery,
  useGetOrganizationReviewsQuery,
} from "@/redux/features/organization/organization.api";
import { resolveImageUrl } from "@/utils/image";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const t = useTranslations("OrganizationProfile");
  
  // Pagination & Review state
  const [currentPage, setCurrentPage] = useState(1);

  // Queries
  const { data: whiteLabelData, isLoading: isWhiteLabelLoading } = useGetWhiteLabelQuery();
  const profile = whiteLabelData?.data;

  const { data: coursesData, isLoading: isCoursesLoading } = useGetOrganizationCoursesQuery();
  const { data: reviewsData, isLoading: isReviewsLoading } = useGetOrganizationReviewsQuery({
    page: currentPage,
    page_size: 5,
  });

  const [bannerSrc, setBannerSrc] = useState("/home/user1.png");
  const [avatarSrc, setAvatarSrc] = useState("/home/user1.png");

  // Initialize and update local preview state with API data
  useEffect(() => {
    if (profile?.banner) {
      setBannerSrc(resolveImageUrl(profile.banner));
    } else {
      setBannerSrc("/home/user1.png");
    }
    if (profile?.photo) {
      setAvatarSrc(resolveImageUrl(profile.photo));
    } else {
      setAvatarSrc("/home/user1.png");
    }
  }, [profile]);

  // Parse course data returned from API to match ProfileTabs expectations (synchronized with my-courses page schema)
  const publishedCourses = (coursesData?.data || [])
    .map((course: any) => {
      const status: "Published" | "Draft" | "Under Review" =
        course.status === "published" || course.status === "accepted"
          ? "Published"
          : course.status === "draft"
            ? "Draft"
            : "Under Review";

      return {
        id: course.id,
        title: course.title,
        image: resolveImageUrl(course.advance_info?.thumbnail) || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        category: course.Category || "N/A",
        rating: Number(course.rating) || 0,
        reviews: String(course.reviews_count || 0),
        students: String(course.reviews_count || 0),
        price: Number(course.price) || 0,
        status,
      };
    });

  // Parse review data returned from API to match ProfileTabs expectations
  const formattedReviews = (reviewsData?.data || []).map((review: any) => {
    const date = new Date(review.created_at);
    const timeAgo = isNaN(date.getTime()) ? "recently" : date.toLocaleDateString();
    return {
      id: review.id,
      name: review.reviewer_name || "Anonymous",
      avatar: "", // Will render solid colored initials badge inside ProfileTabs
      timeAgo: timeAgo,
      rating: review.rating || 5,
      comment: review.comment || "",
    };
  });

  // Map the organization profile properties to feed ProfileTabs component
  const instructorMappedProfile = {
    id: String(profile?.id || ""),
    firstName: profile?.name || t("schoolName"),
    lastName: "",
    title: "Organization Profile",
    bio: profile?.bio || "",
    avatar: avatarSrc,
    rating: reviewsData?.average_rating || 5.0,
    reviewCount: reviewsData?.total_reviews || 0,
    studentCount: reviewsData?.total_enrolled_students || 0,
    courseCount: coursesData?.total || 0,
    email: "",
    phone: profile?.phone || "",
    socialLinks: {},
  };

  return (
    <div>
      <div className="container mx-auto space-y-8">
        {/* Profile Header */}
        <div>
          {/* Banner with premium, taller height configuration */}
          <div className="relative w-full h-64 sm:h-80 lg:h-[380px] rounded-none overflow-hidden bg-gray-100">
            {isWhiteLabelLoading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <Image
                src={bannerSrc}
                alt="Organization Banner"
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Avatar + Info */}
          <div className="px-4 sm:px-6">
            {/* Avatar overlapping banner */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md -mt-14 sm:-mt-16 bg-white">
              {isWhiteLabelLoading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <Image
                  src={avatarSrc}
                  alt="Organization Avatar"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Name, bio, stats */}
            <div className="mt-4 space-y-2">
              <h1 className="text-2xl font-bold text-title">
                {isWhiteLabelLoading ? (
                  <Skeleton className="h-8 w-64" />
                ) : (
                  profile?.name || t("schoolName")
                )}
              </h1>
              {isWhiteLabelLoading ? (
                <div className="space-y-1.5 py-1">
                  <Skeleton className="h-4 w-96 max-w-full" />
                  <Skeleton className="h-4 w-72 max-w-full" />
                </div>
              ) : profile?.bio ? (
                <p className="text-sm text-description max-w-md leading-relaxed">
                  {profile.bio.slice(0, 140)}
                </p>
              ) : null}
              
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {isWhiteLabelLoading || isReviewsLoading ? (
                    <Skeleton className="h-4 w-16" />
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-title">
                        {(reviewsData?.average_rating || 5.0).toFixed(1)}
                      </span>
                      <span className="text-sm text-description">
                        ({reviewsData?.total_reviews || 0} {t("review")})
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-description" />
                  {isWhiteLabelLoading || isReviewsLoading ? (
                    <Skeleton className="h-4 w-16" />
                  ) : (
                    <>
                      <span className="text-sm font-bold text-title">
                        {reviewsData?.total_enrolled_students || 0}
                      </span>
                      <span className="text-sm text-description">{t("students")}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <CirclePlay className="w-4 h-4 text-main" />
                  {isWhiteLabelLoading || isCoursesLoading ? (
                    <Skeleton className="h-4 w-16" />
                  ) : (
                    <>
                      <span className="text-sm font-bold text-title">
                        {coursesData?.total || 0}
                      </span>
                      <span className="text-sm text-description">{t("courses")}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Biography Block */}
        <ProfileAbout bio={isWhiteLabelLoading ? undefined : profile?.bio} />

        {/* Profile Tabs (Courses & Reviews) with pagination enabled */}
        <ProfileTabs
          profile={instructorMappedProfile}
          publishedCourses={publishedCourses}
          publicReviews={formattedReviews}
          currentPage={currentPage}
          totalPages={reviewsData?.total_pages || 1}
          onPageChange={(page) => setCurrentPage(page)}
          isCoursesLoading={isWhiteLabelLoading || isCoursesLoading}
          isReviewsLoading={isWhiteLabelLoading || isReviewsLoading}
        />
      </div>
    </div>
  );
};

export default Page;
