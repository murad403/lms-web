import { Monitor, Building2, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const LearningMode = async () => {
    const t = await getTranslations("Home");

    const learningModes = [
        {
            icon: Monitor,
            title: t("onlineCourses"),
            buttonText: t("exploreOnline"),
        },
        {
            icon: Building2,
            title: t("inPersonCourses"),
            buttonText: t("findClasses"),
        },
        {
            icon: MapPin,
            title: t("coursesNearYou"),
            buttonText: t("searchNearby"),
        },
    ];

    return (
        <div>
            <div className="container mx-auto px-4 md:px-5 lg:px-6 xl:px-8 2xl:px-0">
                {/* Heading */}
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-2xl md:text-4xl font-bold text-header mb-3">
                        {t("chooseYourLearningMode")}
                    </h2>
                    <p className="text-description text-base md:text-lg">
                        {t("flexibleOptions")}
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {learningModes.map((mode, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                        >
                            <mode.icon className="size-12 text-main mb-6" strokeWidth={1.5} />
                            <h3 className="text-xl md:text-2xl font-bold text-header mb-5">
                                {mode.title}
                            </h3>
                            <Link href={`/categories/${mode?.title}`} className="px-5 py-2.5 bg-main text-white rounded-md text-xs sm:text-sm md:text-base font-semibold hover:bg-main/90 transition-colors">
                                {mode.buttonText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningMode;
