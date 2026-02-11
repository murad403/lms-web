import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const Banner = async () => {
    const t = await getTranslations("Home");

    return (
        <div className="relative w-full h-60 sm:h-80 md:h-96 lg:h-200 xl:h-240 overflow-hidden">
            {/* Background Image */}
            <Image
                src="/home/banner.jpg"
                alt="Banner"
                fill
                className="object-center"
                priority
            />

            {/* Gradient Overlay - blue on left, transparent on right */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-700/85 via-blue-600/55 to-transparent" />

            {/* Content */}
            <div className="relative z-10 container mx-auto flex flex-col justify-center h-full px-3 sm:px-4 md:px-6 lg:px-0">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    {t("bannerTitle1")}
                    <br />
                    {t("bannerTitle2")}
                </h1>

                <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-white">
                    {t("bannerDescription")}
                </p>

                {/* Button with double border effect */}
                <div className="mt-6 sm:mt-7 inline-block max-w-fit">
                    <div className="p-1 border-2 border-white rounded-md">
                        <Link 
                            href="/categories" 
                            className="block px-6 sm:px-8 py-3 sm:py-4 bg-white text-main border-2 border-white rounded-md text-sm sm:text-base font-semibold hover:bg-white/95 transition-colors"
                        >
                            {t("browseMainCategories")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;