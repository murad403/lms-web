import { Check, X } from 'lucide-react'
import Image from 'next/image'
import image1 from "@/assets/for-school/image1.png"
import image2 from "@/assets/for-school/image2.png"
import image3 from "@/assets/for-school/image3.png"

const SchoolSolutions = () => {
    return (
        <section>
            <div className="container mx-auto max-w-7xl">
                <div className="space-y-10">
                    {/* Left Side - Who This Opportunity Is For */}
                    <div className="p-5 md:p-6 flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-bold text-main mb-4">
                                Who This Solution Is For
                            </h2>

                            <p className="text-description mb-4 text-xl">This platform is ideal for</p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                                    <span className="text-description">Accredited training providers</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                                    <span className="text-description">Professional academies</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                                    <span className="text-description">Training schools and institutes</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                                    <span className="text-description">Public and private educational institutions</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                                    <span className="text-description">Certified training organizations</span>
                                </div>
                            </div>
                            <p className="text-main text-xl font-semibold mt-3">
                                If you offer quality training, we help you sell it online.
                            </p>
                        </div>
                        <Image src={image2} alt="Opportunity Illustration" width={463} height={370} />
                    </div>

                    {/* section 2 */}
                    <div className="p-5 md:p-6 flex flex-col-reverse md:flex-row justify-between items-center">


                        <Image src={image3} alt="Opportunity Illustration" width={463} height={370} />

                        <div>
                            <h2 className="text-2xl md:text-4xl font-bold text-main mb-6">
                                What You DON&apos;T Have to Do
                            </h2>

                            <div className="space-y-3 text-[17px]">
                                <div className="flex items-start gap-3">
                                    <X className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                                    <span className="text-description">Build or manage a website</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <X className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                                    <span className="text-description">Handle payments and invoicing</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <X className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                                    <span className="text-description">Run advertising campaigns</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <X className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                                    <span className="text-description">Deal with technical infrastructure</span>
                                </div>
                            </div>

                            <p className="text-main text-xl font-semibold mt-6">
                                We take care of everything except delivering the training.
                            </p>
                        </div>
                    </div>

                    {/* section 3 */}
                    <div className="p-5 md:p-6 flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-bold text-main mb-4">
                                Dedicated Support
                            </h2>

                            <p className="text-description mb-4 text-xl">You are never alone. Our team supports <br /> your institution at every stage:</p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                                    <span className="text-description">Onboarding and setup</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                                    <span className="text-description">Course upload and optimization</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                                    <span className="text-description">Certification process</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                                    <span className="text-description">Platform usage and reporting</span>
                                </div>
                            </div>
                        </div>
                        <Image src={image1} alt="Opportunity Illustration" width={463} height={370} />
                    </div>
                </div>

            </div>
        </section >
    )
}

export default SchoolSolutions
