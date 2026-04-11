"use client";
import Image from "next/image";
import { Pencil, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useGetStudentProfileQuery } from "@/redux/features/student/student.api";
import { resolveImageUrl, shouldBypassImageOptimization } from "@/utils/image";

const ProfileHeader = () => {
    const { data } = useGetStudentProfileQuery();

    const profile = data?.data;
    const fullNameParts = (profile?.user?.name || "").trim().split(/\s+/).filter(Boolean);
    const firstName = profile?.first_name || fullNameParts[0] || "";
    const lastName = profile?.last_name || fullNameParts.slice(1).join(" ") || "";
    const fullName = `${firstName} ${lastName}`.trim() || "Profile";
    const profileTitle = profile?.title?.trim() || "";
    const resolvedAvatar = resolveImageUrl(profile?.user?.avatar);
    const avatarSrc = resolvedAvatar && resolvedAvatar.trim() ? resolvedAvatar : null;

    return (
        <div className="bg-white rounded-md border border-[#C8E0FA] p-4 sm:p-6 md:p-8 mb-6">
            <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 border-2 border-gray-200">
                    {avatarSrc ? (
                        <Image
                            src={avatarSrc}
                            alt={fullName || "Profile"}
                            fill
                            className="object-cover"
                            unoptimized={shouldBypassImageOptimization(avatarSrc)}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <User className="w-8 h-8 text-gray-400" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-title truncate">
                            {fullName}
                        </h2>
                        <Link href={"/settings"} className="p-1 hover:bg-gray-100 rounded-full transition-colors shrink-0">
                            <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-description" />
                        </Link>
                    </div>
                    <p className="text-xs sm:text-sm text-description mt-0.5">
                        {profileTitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
