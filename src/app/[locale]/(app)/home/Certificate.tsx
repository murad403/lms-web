import Image from "next/image";
import certificate from "../../../../../public/home/certificate.png";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const Certificate = async () => {
    const t = await getTranslations("Home");
    return (
        <div className="py-16 md:py-28 bg-gray-50">
            <div className="container mx-auto px-4 md:px-5 lg:px-6 xl:px-8 2xl:px-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between max-w-6xl mx-auto gap-10 sm:gap-0">
                    {/* Left Content */}
                    <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header leading-tight mb-4">
                            {t("validCertifications1")}
                            <br />
                            {t("validCertifications2")}
                        </h2>
                        <p className="text-description text-sm sm:text-base md:text-lg mb-8">
                            {t("chooseRight")}
                        </p>
                        <Link href={'/certifications'} className="px-8 py-3 bg-main text-white rounded-md text-xs sm:text-sm md:text-base font-semibold hover:bg-main/90 transition-colors">
                            {t("exploreCertifications")}
                        </Link>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 w-full">
                        <div className="relative md:w-138 h-64 sm:h-72 md:h-80 lg:h-96">
                            <Image
                                src={certificate}
                                alt="Certificate"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certificate;
