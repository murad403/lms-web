import { Check } from "lucide-react"
import Image from "next/image"
import image1 from "@/assets/for-school/whychooseus.png";


const AboutSchool = () => {
    return (
        <div className="container mx-auto max-w-7xl">

            {/* Do You Want to Teach */}
            <div className="border border-gray-100 rounded-md p-5 md:p-12 mb-8">
                <h2 className="text-xl md:text-3xl font-semibold text-main mb-4">
                    The White-Label Solution for Quality Training Institutions
                </h2>
                <p className="text-description md:text-xl text-lg leading-relaxed mb-4">
                    A complete platform designed for schools, training centers, academies, and certified institutions that want to sell courses online with full autonomy.
                </p>
                <p className="text-main md:text-xl text-lg font-semibold">
                    You create the courses. We certify them, publish them, promote them, and sell them.
                </p>
            </div>


            <div className=" rounded-lg mb-8 md:mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-md p-4 md:p-10">

                    {/* Left Content */}
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-main mb-6">
                            Why Choose Our Platform
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Dedicated solution for schools and training institutions</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">White-label platform with your logo and brand identity</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">No technical skills required</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">No upfront costs</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Full autonomy in course management</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Official certifications and training credits</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Visibility on a structured and professional marketplace</span>
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
