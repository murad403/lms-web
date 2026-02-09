import Image from 'next/image'
import cover1 from "../../../../public/home/cover1.png"
import cover2 from "../../../../public/home/cover2.png"
import cover3 from "../../../../public/home/cover3.png"
import user from "../../../../public/home/user1.png"
import Link from 'next/link'


const JoinOurPlatform = () => {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center md:mb-28 mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        Join Our Platform
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Opportunities for trainers, schools, and partners
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Become a Trainer Card */}
                    <div className="relative h-85 rounded-2xl shadow-lg">
                        <Image
                            src={cover1}
                            alt="Become a Trainer"
                            fill
                            className="object-cover brightness-100 group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                        />
                        <Image src={user} alt="User" className='md:block hidden absolute right-0 bottom-2 scale-102' width={400}
                         height={390}/>
                        <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Become a Trainer</h3>
                                <p className="text-gray-200 mb-4">
                                    Create, publish, and sell online
                                </p>
                                <Link href={"/for-trainers"} className="px-8 py-3 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors">
                                    Start Teaching
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Are you a school Card */}
                    <div className="relative h-85 rounded-2xl shadow-lg">
                        <Image
                            src={cover2}
                            alt="Are you a school"
                            fill
                            className="object-cover brightness-100 group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                        />

                        <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Are you a school?</h3>
                                <p className="text-gray-200 mb-4">
                                    Publish your catalog and sell online.
                                </p>
                                <Link href={"/for-school"} className="px-8 py-3 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors">
                                    Get Accredited Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Become a territorial orientation center Card - Full Width */}
                <div className="relative h-85 rounded-2xl overflow-hidden group shadow-lg">
                    <Image
                        src={cover3}
                        alt="Become a territorial orientation center"
                        fill
                        className="object-cover brightness-100 group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">
                                Become a territorial orientation center
                            </h3>
                            <p className="text-gray-200 mb-4">
                                Be the reference point in your area by collaborating with institutions and trainers
                            </p>
                            <Link href={"/partners"} className="px-8 py-3 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors">
                                Become a Partner
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default JoinOurPlatform
