import { Check, X } from 'lucide-react'
import { getTranslations } from "next-intl/server";
import Image from 'next/image'
import image1 from "@/assets/for-school/image1.png"
import image2 from "@/assets/for-school/image2.png"
import image3 from "@/assets/for-school/image3.png"

const SchoolSolutions = async () => {
    const t = await getTranslations("ForSchool");
    return (
        <div className="container mx-auto max-w-7xl">
            <div className="space-y-10">
                {/* Left Side - Who This Opportunity Is For */}
                <div className="p-5 md:p-6 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-navy-blue mb-4">
                            {t("solutionsTitle")}
                        </h2>

                        <p className="text-description mb-4 text-lg">{t("solutionsIdealFor")}</p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("accreditedProviders")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("professionalAcademies")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("trainingSchools")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("publicPrivateInstitutions")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("certifiedOrganizations")}</span>
                            </div>
                        </div>
                        <p className="text-navy-blue text-xl font-semibold mt-3">
                            {t("solutionsSubDesc")}
                        </p>
                    </div>
                    <Image src={image2} alt="Opportunity Illustration" width={463} height={370} />
                </div>

                {/* section 2 */}
                <div className="p-5 md:p-6 flex flex-col-reverse md:flex-row justify-between items-center">


                    <Image src={image3} alt="Opportunity Illustration" width={463} height={370} />

                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-navy-blue mb-6">
                            {t("whatYouDontDoTitle")}
                        </h2>

                        <div className="space-y-3 text-[17px]">
                            <div className="flex items-start gap-3">
                                <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                                <span className="text-description text-base">{t("dontItem1")}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                                <span className="text-description text-base">{t("dontItem2")}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                                <span className="text-description text-base">{t("dontItem3")}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                                <span className="text-description text-base">{t("dontItem4")}</span>
                            </div>
                        </div>

                        <p className="text-navy-blue text-xl font-semibold mt-6">
                            {t("dontSubDesc")}
                        </p>
                    </div>
                </div>

                {/* section 3 */}
                <div className="p-5 md:p-6 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-navy-blue mb-4">
                            {t("dedicatedSupportTitle")}
                        </h2>

                        <p className="text-description mb-4 text-xl">{t("dedicatedSupportIntro")}</p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("supportItem1")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("supportItem2")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("supportItem3")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description text-base">{t("supportItem4")}</span>
                            </div>
                        </div>
                    </div>
                    <Image src={image1} alt="Opportunity Illustration" width={463} height={370} />
                </div>
            </div>

        </div>

    )
}

export default SchoolSolutions
