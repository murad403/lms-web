import { userProfile } from "@/lib/profile";
import { getTranslations } from "next-intl/server";

const MyProfilePage = async () => {
    const profile = userProfile;
    const t = await getTranslations("ProfilePage");

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-title mb-6 border-b border-border-light pb-6">{t("title")}</h2>

            <div className="bg-white rounded-xl p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("firstName")}</p>
                        <p className="text-sm text-description">{profile.firstName}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("lastName")}</p>
                        <p className="text-sm text-description">{profile.lastName}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("registrationDate")}</p>
                        <p className="text-sm text-description">{profile.registrationDate}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("userName")}</p>
                        <p className="text-sm text-description">{profile.username}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("phoneNumber")}</p>
                        <p className="text-sm text-description">{profile.phone}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("email")}</p>
                        <p className="text-sm text-description">{profile.email}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("gender")}</p>
                        <p className="text-sm text-description">{profile.gender}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("dateOfBirth")}</p>
                        <p className="text-sm text-description">{profile.dateOfBirth}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">{t("age")}</p>
                        <p className="text-sm text-description">{profile.age}</p>
                    </div>
                </div>

                {/* Bio */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                    <p className="text-base font-semibold text-title mb-1">{t("bio")}</p>
                    <p className="text-sm text-description leading-relaxed">{profile.bio}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;
