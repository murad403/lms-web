import { Check } from "lucide-react"
import { getTranslations } from "next-intl/server";
import image1 from "@/assets/partnership/image1.png";
import Image from "next/image";

const AboutPartner = async () => {
    const t = await getTranslations("Partnerships");
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


            <div className="border border-gray-100 rounded-md mb-8 md:mb-12 p-5 md:p-12">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-navy-blue mb-4">
                        {t("localGuidanceCenterTitle")}
                    </h2>
                    <h4 className='text-navy-blue mb-4 text-base md:text-lg font-semibold'>{t("localGuidanceCenterIntro")}</h4>
                    <div className="space-y-2 text-description text-base md:text-lg mb-5 ">
                        <p>• {t("localGuidanceItem1")}</p>
                        <p>• {t("localGuidanceItem2")}</p>
                        <p>• {t("localGuidanceItem3")}</p>
                        <p>• {t("localGuidanceItem4")}</p>
                    </div>
                    <h4 className='text-navy-blue mb-4 text-base md:text-lg font-semibold'>{t("localGuidanceCenterOutro")}</h4>
                </div>

            </div>


            <div className="border border-gray-100 rounded-md mb-8 md:mb-12 p-5 md:p-12">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-navy-blue mb-4">
                        {t("affiliateCodeTitle")}
                    </h2>
                    <h4 className='text-navy-blue mb-4 text-base md:text-lg font-semibold'>{t("affiliateCodeIntro")}</h4>
                    <div className="space-y-2 text-description text-base md:text-lg mb-5">
                        <p>• {t("affiliateItem1")}</p>
                        <p>• {t("affiliateItem2")}</p>
                        <p>• {t("affiliateItem3")}</p>
                    </div>
                    <h4 className='text-navy-blue mb-4 text-base md:text-lg font-semibold'>{t("affiliateOutro")}</h4>
                </div>

            </div>


            <div className=" rounded-lg mb-8 md:mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-md p-4 md:p-10">

                    {/* Left Content */}
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-navy-blue mb-6">
                            {t("whyBecomeAffiliateTitle")}
                        </h2>
                        <h4 className='text-navy-blue mb-4 text-base md:text-lg font-semibold'>{t("whyBecomeAffiliateIntro")}</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("localPresence")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("revenueSharing")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("brandRecognition")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("dedicatedSupport")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("marketingMaterials")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("exclusiveTerritory")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <Image src={image1} alt="Ongoing Support Illustration" width={463} height={370} />

                </div>
            </div>


            <div className="border border-gray-100 rounded-md mb-8 md:mb-12 p-5 md:p-12">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-navy-blue mb-4">
                       {t("whatCanDoTitle")}
                    </h2>
                    <div className="space-y-2 text-description text-base md:text-lg mb-5">
                        <p>• {t("canDoItem1")}</p>
                        <p>• {t("canDoItem2")}</p>
                        <p>• {t("canDoItem3")}</p>
                        <p>• {t("canDoItem4")}</p>
                        <p>• {t("canDoItem5")}</p>
                        <p>• {t("canDoItem6")}</p>
                        <p>• {t("canDoItem7")}</p>
                        <p>• {t("canDoItem8")}</p>
                        <p>• {t("canDoItem9")}</p>
                        <p>• {t("canDoItem10")}</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AboutPartner
