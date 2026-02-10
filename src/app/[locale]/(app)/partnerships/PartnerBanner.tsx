import Image from 'next/image'
import { Link } from "@/i18n/navigation"
import banner from "@/assets/banner/partner.png"
import { getTranslations } from "next-intl/server";

const PartnerBanner = async () => {
    const t = await getTranslations("Partnerships");
    return (
        <div className="relative w-full h-60 sm:h-80 md:h-96 lg:h-110 overflow-hidden">
            {/* Background Image */}
            <Image
                src={banner}
                alt="Banner"
                fill
                className="object-center"
                priority
            />

            {/* Content */}
            <div className="relative z-10 container mx-auto flex flex-col justify-center h-full px-3 sm:px-4 md:px-6 lg:px-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-main leading-tight ">
                    {t("bannerTitle")}
                </h1>

                <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-header">
                    {t("bannerDescription")}
                </p>
                <div className=" mt-4 flex items-center">
                    <Link href={"/auth/partner-sign-up"} className="py-4 px-6 border-2 text-xs sm:text-sm font-medium text-white bg-main hover:bg-main/90 transition-colors cursor-pointer">
                        {t("joinNetwork")}
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default PartnerBanner
