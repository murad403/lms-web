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
                        <h2 className="text-2xl md:text-4xl font-bold text-main mb-4">
                            {t("opportunityTitle")}
                        </h2>
                        <p className="text-description mb-4 text-xl">This affiliation is ideal for:</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Guidance and consulting centers</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Professional offices and firms</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Associations and local institutions</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Employment agencies</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Counseling and education professionals</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Organizations operating between education and employment</span>
                            </div>
                        </div>
                        <p className="text-main text-xl font-semibold mt-3">
                            If you help people make choices, you can turn it into value.
                        </p>
                    </div>
                    <Image src={image2} alt="Opportunity Illustration" width={463} height={370} />
                </div>

                {/* section 2 */}
                <div className="p-5 md:p-6 flex flex-col-reverse md:flex-row justify-between items-center">
                    <Image src={image3} alt="Opportunity Illustration" width={463} height={370} />

                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-main mb-6">
                            What You DON’T Have to Do
                        </h2>

                        <div className="space-y-3 text-[17px]">
                            <div className="flex items-start gap-3">
                                <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                                <span className="text-description">Create courses from scratch</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                                <span className="text-description">Manage a technological platform</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                                <span className="text-description">Handle payments and invoicing</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                                <span className="text-description">Manage tracking systems</span>
                            </div>
                        </div>

                        <p className="text-main text-xl font-semibold mt-6">
                            The affiliate system works fully automatically.
                        </p>
                    </div>
                </div>

                {/* section 3 */}
                <div className="p-5 md:p-6 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-main mb-4">
                            Dedicated Support
                        </h2>

                        <p className="text-description mb-4 text-xl">As an affiliated Center, you receive:</p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Continuous support</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Promotional materials</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Digital tools</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Assistance with the use of the affiliate code</span>
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
