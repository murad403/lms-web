"use client";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { userProfile } from "@/lib/profile";
import { Link } from "@/i18n/navigation";
import avatar from "@/assets/banner/avatar.png"

const ProfileHeader = () => {
    return (
        <div className="bg-white rounded-md border border-[#C8E0FA] p-4 sm:p-6 md:p-8 mb-6">
            <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 border-2 border-gray-200">
                    <Image
                        src={avatar}
                        alt={`${userProfile.firstName} ${userProfile.lastName}`}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-title truncate">
                            {userProfile.firstName} {userProfile.lastName}
                        </h2>
                        <Link href={"/settings"} className="p-1 hover:bg-gray-100 rounded-full transition-colors shrink-0">
                            <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-description" />
                        </Link>
                    </div>
                    <p className="text-xs sm:text-sm text-description mt-0.5">
                        {userProfile.title}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
