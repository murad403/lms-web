"use client";
import { useGetStudentProfileQuery } from "@/redux/features/student/student.api";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";

const MyProfilePage = () => {
    const t = useTranslations("ProfilePage");
    const { data, isLoading } = useGetStudentProfileQuery();
    const profile = data?.data;
    const fullNameParts = (profile?.user?.name || "").trim().split(/\s+/).filter(Boolean);
    const fallbackFirstName = fullNameParts[0] || "-";
    const fallbackLastName = fullNameParts.slice(1).join(" ") || "-";

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-title mb-6 border-b border-border-light pb-6">{t("title")}</h2>

            {isLoading ? (
                <div className="bg-white rounded-xl p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <Skeleton key={index} className="h-10 w-full" />
                        ))}
                    </div>
                </div>
            ) : <div className="bg-white rounded-xl p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("firstName")}</p>
                        <p className="text-sm text-description">{profile?.first_name || fallbackFirstName}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("lastName")}</p>
                        <p className="text-sm text-description">{profile?.last_name || fallbackLastName}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("registrationDate")}</p>
                        <p className="text-sm text-description">{profile?.created_at ? new Date(profile.created_at).toLocaleString() : "-"}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("userName")}</p>
                        <p className="text-sm text-description">{profile?.user?.name || "-"}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("phoneNumber")}</p>
                        <p className="text-sm text-description">{profile?.user?.phone || "-"}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("email")}</p>
                        <p className="text-sm text-description">{profile?.user?.email || "-"}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("gender")}</p>
                        <p className="text-sm text-description">{profile?.gender || "-"}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("dateOfBirth")}</p>
                        <p className="text-sm text-description">{profile?.date_of_birth || "-"}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("age")}</p>
                        <p className="text-sm text-description">{profile?.age ?? "-"}</p>
                    </div>
                </div>

                {/* Bio */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                    <p className="text-base font-semibold text-title mb-1">{t("bio")}</p>
                    <p className="text-sm text-description leading-relaxed">{profile?.bio || "-"}</p>
                </div>
            </div>}

            {!isLoading && !profile && (
                <p className="text-sm text-description">No profile data found.</p>
            )}


        </div>
    );
};

export default MyProfilePage;
