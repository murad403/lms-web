import Image from 'next/image'
import cover1 from "../../../../../public/home/cover1.png"
import cover2 from "../../../../../public/home/cover2.png"
import cover3 from "../../../../../public/home/cover3.png"
import user from "../../../../../public/home/user1.png"
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'


const JoinOurPlatform = async () => {
    const t = await getTranslations("Home");
    return (
        <section className="py-16 px-3 sm:px-4 md:px-6 lg:px-0">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center md:mb-28 mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                        {t("joinOurPlatform")}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                        {t("opportunities")}
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
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">{t("becomeTrainer")}</h3>
                                <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-4">
                                    {t("createPublish")}
                                </p>
                                <Link href={"/for-trainers"} className="px-8 py-3 bg-main text-white rounded-md text-xs sm:text-sm md:text-base font-semibold hover:bg-main/90 transition-colors">
                                    {t("startTeaching")}
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
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">{t("areYouSchool")}</h3>
                                <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-4">
                                    {t("publishCatalog")}
                                </p>
                                <Link href={"/for-school"} className="px-8 py-3 bg-main text-white rounded-md text-xs sm:text-sm md:text-base font-semibold hover:bg-main/90 transition-colors">
                                    {t("getAccreditedNow")}
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
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                                {t("becomeCenter")}
                            </h3>
                            <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-4">
                                {t("referencePoint")}
                            </p>
                            <Link href={"/partnerships"} className="px-8 py-3 bg-main text-white rounded-md text-xs sm:text-sm md:text-base font-semibold hover:bg-main/90 transition-colors">
                                {t("becomePartner")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default JoinOurPlatform
