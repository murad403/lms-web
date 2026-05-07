/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetInstructorProfileDetailsQuery } from "@/redux/features/instructor/instructor.api";
import { resolveImageUrl, shouldBypassImageOptimization } from "@/utils/image";
import ProfileAbout from "@/components/reusable/for-dashboard/ProfileAbout";
import ProfileTabs from "@/components/reusable/for-dashboard/ProfileTabs";



const InstructorProfilePage = () => {
    const { data: profileResponse, isLoading } = useGetInstructorProfileDetailsQuery(undefined);
    const t = useTranslations("InstructorProfile");

    if (isLoading && !profileResponse) {
        return (
            <div className="container mx-auto py-8 space-y-8">
                <div className="bg-white px-4 py-10 rounded-lg border border-border-light">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <Skeleton className="h-28 w-28 rounded-md" />
                        <div className="flex-1 space-y-3 text-center sm:text-left">
                            <Skeleton className="h-8 w-56 mx-auto sm:mx-0" />
                            <Skeleton className="h-4 w-40 mx-auto sm:mx-0" />
                            <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-2">
                                <Skeleton className="h-8 w-32" />
                                <Skeleton className="h-8 w-32" />
                                <Skeleton className="h-8 w-32" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-border-light space-y-4">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-10/12" />
                </div>
            </div>
        );
    }

    const profile = profileResponse?.data;
    const displayName = profile?.user?.name || profile?.name;
    const email = profile?.user?.email || profile?.email;
    const phone = profile?.user?.phone || "-";
    const avatar = resolveImageUrl(profile?.user?.avatar || profile?.avatar);

    // Adapt API data shape for existing components without changing UI
    const adapterProfile = { firstName: displayName };
    const publishedCourses = (profile?.courses || []).map((c: any) => ({
        id: c.id,
        image: resolveImageUrl(c.thumbnail),
        title: c.title,
        category: typeof c.category === "string" ? c.category : String(c.category || ""),
        price: c.price || "0",
        rating: c.rating || 0,
        students: c.total_students || 0,
    }));

    const publicReviews = (profile?.reviews || []).map((r: any) => ({
        id: r.id,
        name: r.student_name,
        avatar: resolveImageUrl(r.student_avatar),
        timeAgo: new Date(r.created_at).toLocaleDateString(),
        rating: r.rating,
        comment: r.comment,
    }));

    return (
        <div>
            <div className="bg-white container mx-auto">
                <div className="mx-auto px-4 py-10">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-md overflow-hidden border border-border-light shadow-md shrink-0 bg-gray-50">
                            {avatar ? (
                                <Image
                                    src={resolveImageUrl(avatar)}
                                    alt={displayName || "Instructor"}
                                    fill
                                    className="object-cover"
                                    unoptimized={shouldBypassImageOptimization(avatar)}
                                />
                            ) : null}
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold text-title">
                                {displayName || "Instructor"}
                            </h1>
                            <p className="text-sm text-description mt-1">{profile?.title || "Instructor"}</p>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4 text-sm text-description">
                                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 border border-border-light">
                                    <Mail className="w-4 h-4" />
                                    {email || "-"}
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 border border-border-light">
                                    <Phone className="w-4 h-4" />
                                    {phone}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileAbout bio={profile?.biography} />
            <ProfileTabs
                profile={adapterProfile as any}
                publishedCourses={publishedCourses}
                publicReviews={publicReviews}
            />
        </div>
    );
};

export default InstructorProfilePage;