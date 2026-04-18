"use client";
import Image from "next/image";
import { Mail, Phone, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetInstructorProfileQuery } from "@/redux/features/instructor/instructor.api";
import { resolveImageUrl, shouldBypassImageOptimization } from "@/utils/image";

const InstructorProfilePage = () => {
    const { data: profileResponse, isLoading } = useGetInstructorProfileQuery();
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
    const avatar = resolveImageUrl(profile?.user?.avatar);

    return (
        <div>
            <div className="bg-white container mx-auto">
                <div className="mx-auto px-4 py-10">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-md overflow-hidden border border-border-light shadow-md shrink-0 bg-gray-50">
                            {avatar ? (
                                <Image
                                    src={avatar}
                                    alt={profile?.user?.name || "Instructor"}
                                    fill
                                    className="object-cover"
                                    unoptimized={shouldBypassImageOptimization(avatar)}
                                />
                            ) : null}
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold text-title">
                                {profile?.user?.name || "Instructor"}
                            </h1>
                            <p className="text-sm text-description mt-1">{profile?.title || "Instructor"}</p>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4 text-sm text-description">
                                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 border border-border-light">
                                    <Mail className="w-4 h-4" />
                                    {profile?.user?.email || "-"}
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 border border-border-light">
                                    <Phone className="w-4 h-4" />
                                    {profile?.user?.phone || "-"}
                                </span>
                                {profile?.website ? (
                                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 border border-border-light">
                                        <Globe className="w-4 h-4" />
                                        {profile.website}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-8 space-y-8">
                <div className="bg-white p-6 rounded-lg border border-border-light">
                    <h2 className="text-sm font-bold text-title mb-3 uppercase tracking-widest">
                        {t("aboutMe")}
                    </h2>
                    <div className="text-sm text-description leading-relaxed whitespace-pre-line">
                        {profile?.biography || ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorProfilePage;