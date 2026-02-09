import { Check } from "lucide-react"
import image1 from "@/assets/partnership/image1.png";
import Image from "next/image";

const AboutPartner = () => {
    return (
        <div className="container mx-auto max-w-7xl">
            {/* Do You Want to Teach */}
            <div className="border border-gray-100 rounded-md p-5 md:p-12 mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-main mb-4">
                    Become an Accredited Guidance Center
                </h2>
                <p className="text-description md:text-xl text-lg leading-relaxed mb-4">
                    Join our professional training network and become the reference point for those seeking certified, high-quality education
                </p>
                <p className="text-main md:text-xl text-lg font-semibold">
                    You create the courses. We certify, publish, promote, and sell them
                </p>
            </div>


            <div className="border border-gray-100 rounded-md mb-8 md:mb-12 p-5 md:p-12">
                <div>
                    <h2 className="text-xl md:text-3xl  font-bold text-main mb-4">
                        What Is a Local Guidance Center
                    </h2>
                    <h4 className='text-main mb-4 text-xl font-semibold'>A Local Guidance Center is an official partner of the platform that operates <br /> locally to:</h4>
                    <div className="space-y-2 text-description text-lg mb-5 ">
                        <p>• guide students, professionals, and companies</p>
                        <p>• promote recognized courses and certifications</p>
                        <p>• facilitate access to high-quality education</p>
                        <p>• connect the territory with schools, institutions, and trainers</p>
                    </div>
                    <h4 className='text-main mb-4 text-xl font-semibold'>You are the point of contact between education and people.</h4>
                </div>

            </div>


            <div className="border border-gray-100 rounded-md mb-8 md:mb-12 p-5 md:p-12">
                <div>
                    <h2 className="text-xl md:text-3xl font-bold text-main mb-4">
                        Your Affiliate Code
                    </h2>
                    <h4 className='text-main mb-4 text-xl font-semibold'>Once accredited as a Local Guidance Center, you will be assigned a personal and <br /> unique affiliate code.</h4>
                    <div className="space-y-2 text-description text-lg mb-5">
                        <p>• The code must be indicated in every course referral or purchase</p>
                        <p>• Each course purchased using your code is automatically tracked</p>
                        <p>• The system recognizes your guidance activity</p>
                        <p>The code is the tool that certifies your contribution and guarantees your earnings.</p>
                    </div>
                    <h4 className='text-main mb-4 text-xl font-semibold'>The code is the tool that certifies your contribution and guarantees your earnings.</h4>
                </div>

            </div>


            <div className=" rounded-lg mb-8 md:mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-md p-4 md:p-10">

                    {/* Left Content */}
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-main mb-6">
                            Why Become an Affiliate
                        </h2>
                        <h4 className='text-main mb-4 text-xl font-semibold'>Becoming a Local Guidance Center allows you to</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Operate with a recognized and qualified role in your territory</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Collaborate with accredited schools, institutions, and trainers</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">No technical skills required</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Promote a ready-to-use, certified, and constantly updated course catalo</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Earn commissions on every course sold through your code</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="text-green-500 w-5 h-5 shrink-0" />
                                <span className="text-description">Increase visibility, authority, and professional opportunities</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <Image src={image1} alt="Ongoing Support Illustration" width={463} height={370} />

                </div>
            </div>


            <div className="border border-gray-100 rounded-md mb-8 md:mb-12 p-5 md:p-12">
                <div>
                    <h2 className="text-xl md:text-3xl font-bold text-main mb-4">
                       What You Can Do as a Local <br /> Guidance Center
                    </h2>
                    <div className="space-y-2 text-description text-lg mb-5">
                        <p>• Promote Courses and Certifications</p>
                        <p>• Use the catalog available on the platform.</p>
                        <p>• Guide Students and Professionals</p>
                        <p>• Help people choose the most suitable learning path.</p>
                        <p>• Sell Courses Using Your Affiliate Code</p>
                        <p>• Each tracked sale generates a percentage-based earning.</p>
                        <p>• Collaborate with Schools and Training Institutions</p>
                        <p>• Become their territorial point of reference</p>
                        <p>• Build a Local Network</p>
                        <p>• Companies, citizens, institutions, and professionals.</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AboutPartner
