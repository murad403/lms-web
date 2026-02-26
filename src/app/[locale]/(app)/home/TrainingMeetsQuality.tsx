import Image from "next/image";
import user from "../../../../../public/home/user2.png";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const TrainingMeetsQuality = async () => {
    const t = await getTranslations("Home");
    return (
        <div className="relative w-full md:py-10 pt-10 bg-main">
            <div className="container mx-auto px-4 sm:px-4 md:px-6 lg:px-30 xl:px-24">
                {/* Desktop: Image positioned absolutely */}
                <Image
                    src={user}
                    alt="Student"
                    className="hidden md:block absolute xl:right-100 lg:right-40 bottom-1 scale-102"
                    width={350}
                    height={320}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center h-full">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                        {t("whereTraining1")}
                        <br />
                        {t("whereTraining2")}
                    </h2>
                    <p className="text-white/80 text-base md:text-lg mb-6 max-w-sm">
                        {t("fromTraining1")}
                        <br />
                        {t("fromTraining2")}
                    </p>
                    <div>
                        <Link href={"/contacts"} className="px-12 py-3 bg-white text-main rounded-md text-xs sm:text-sm md:text-base font-semibold hover:bg-gray-100 transition-colors">
                            {t("joinUs")}
                        </Link>
                    </div>
                </div>

                {/* Mobile and Tablet: Image on bottom */}
                <div className="md:hidden flex justify-center mt-6">
                    <Image
                        src={user}
                        alt="Student"
                        width={200}
                        height={200}
                        className="w-auto h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default TrainingMeetsQuality;
