import Image from 'next/image'
import banner from "@/assets/banner/school.png";
import { getTranslations } from "next-intl/server";
import SignUpGuardLink from '@/components/reusable/SignUpGuardLink';

const SchoolBanner = async () => {
    const t = await getTranslations("ForSchool");
    return (
        <div className="relative w-full h-60 sm:h-80 md:h-96 lg:h-100 overflow-hidden">
            {/* Background Image */}
            <Image
                src={banner}
                alt="Banner"
                fill
                className="object-center"
                priority
            />

            {/* Content */}
            <div className="relative z-10 container mx-auto flex flex-col justify-center h-full px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0">
                <h1 className="text-4xl md:text-5xl font-bold text-navy-blue leading-tight ">
                    {t("bannerTitle")}
                </h1>

                <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-header font-semibold">
                    {t("bannerDescription")}
                </p>
                <div className=" mt-4 flex items-center">
                    <SignUpGuardLink href={"/auth/organization-sign-up"} className="py-3 md:py-4 px-6 border-2 text-xs sm:text-sm font-medium text-white bg-main hover:bg-main/90 transition-colors cursor-pointer">
                        {t("getAccredited")}
                    </SignUpGuardLink>
                </div>

            </div>
        </div>
    )
}

export default SchoolBanner
