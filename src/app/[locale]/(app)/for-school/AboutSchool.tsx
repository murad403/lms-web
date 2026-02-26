import { Check } from "lucide-react"
import { getTranslations } from "next-intl/server";
import Image from "next/image"
import image1 from "@/assets/for-school/whychooseus.png";


const AboutSchool = async () => {
    const t = await getTranslations("ForSchool");
    return (
        <div className="container mx-auto max-w-7xl">

            {/* Do You Want to Teach */}
            <div className="border border-gray-100 rounded-md p-5 md:p-12 mb-8">
                <h2 className="text-2xl lg:text-4xl font-bold text-navy-blue mb-4">
                    {t("aboutTitle")}
                </h2>
                <p className="text-description text-base md:text-lg leading-relaxed mb-4">
                    {t("aboutDesc")}
                </p>
                <p className="text-navy-blue text-base md:text-lg font-semibold">
                    {t("aboutSubDesc")}
                </p>
            </div>


            <div className="mb-8 md:mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-md p-4 md:p-10">

                    {/* Left Content */}
                    <div>
                        <h2 className="text-2xl lg:text-4xl font-bold text-navy-blue mb-6">
                            {t("whyChooseTitle")}
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("fullDigitalCatalog")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("registrationTracking")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("certificationIssuance")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("integratedPayments")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("analyticsInsights")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("brandedExperience")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <Image src={image1} alt="Ongoing Support Illustration" width={463} height={370} />

                </div>
            </div>

        </div>
    )
}

export default AboutSchool
