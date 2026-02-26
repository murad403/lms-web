import image1 from "@/assets/for-school/image1.png"
import image2 from "@/assets/for-school/image2.png"
import image3 from "@/assets/for-school/image3.png"
import { Check, X } from "lucide-react"
import { getTranslations } from "next-intl/server";
import Image from "next/image"

const PartnershipOpportunity = async () => {
    const t = await getTranslations("Partnerships");
    return (
        <div className="container mx-auto max-w-7xl">
            <div className="space-y-10">
                {/* Left Side - Who This Opportunity Is For */}
                <div className="p-5 md:p-6 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-navy-blue mb-4">
                            {t("opportunityTitle")}
                        </h2>
                        <p className="text-description mb-4 text-base md:text-base">{t("affiliationIdealFor")}</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("oppItem1")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("oppItem2")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("oppItem3")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("oppItem4")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("oppItem5")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("oppItem6")}</span>
                            </div>
                        </div>
                        <p className="text-navy-blue text-base md:text-lg font-semibold mt-3">
                            {t("oppSubDesc")}
                        </p>
                    </div>
                    <Image src={image2} alt="Opportunity Illustration" width={463} height={370} />
                </div>

                {/* section 2 */}
                <div className="p-5 md:p-6 flex flex-col-reverse md:flex-row justify-between items-center">
                    <Image src={image3} alt="Opportunity Illustration" width={463} height={370} />

                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-navy-blue mb-6">
                            {t("partnerDontDoTitle")}
                        </h2>

                        <div className="space-y-3 text-base">
                            <div className="flex items-start gap-3">
                                <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                                <span className="text-description">{t("partnerDontItem1")}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                                <span className="text-description">{t("partnerDontItem2")}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                                <span className="text-description">{t("partnerDontItem3")}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                                <span className="text-description">{t("partnerDontItem4")}</span>
                            </div>
                        </div>

                        <p className="text-navy-blue text-base md:text-lg font-semibold mt-6">
                            {t("partnerDontSubDesc")}
                        </p>
                    </div>
                </div>

                {/* section 3 */}
                <div className="p-5 md:p-6 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-navy-blue mb-4">
                            {t("partnerDedicatedSupportTitle")}
                        </h2>

                        <p className="text-description mb-4 text-base md:text-lg">{t("partnerDedicatedSupportIntro")}</p>

                        <div className="space-y-4 text-base">
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">{t("partnerSupportItem1")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">{t("partnerSupportItem2")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">{t("partnerSupportItem3")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">{t("partnerSupportItem4")}</span>
                            </div>
                        </div>
                    </div>
                    <Image src={image1} alt="Opportunity Illustration" width={463} height={370} />
                </div>
            </div>

        </div>
    )
}

export default PartnershipOpportunity
