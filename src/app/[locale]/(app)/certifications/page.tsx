import Image from 'next/image'
import banner from "@/assets/banner/categories.png";
import { getTranslations } from "next-intl/server";
import { certificationAreas } from "@/lib/certifications";


const page = async () => {
    const t = await getTranslations("Certifications");
    return (
        <div>
            {/* banner */}
            <div className="relative w-full h-60 sm:h-80 md:h-96 lg:h-100 overflow-hidden">
                {/* Background Image */}
                <Image
                    src={banner}
                    alt="Banner"
                    fill
                    className="object-center"
                    priority
                />

                {/* Content */}
                <div className="relative z-10 container mx-auto flex flex-col justify-center h-full px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-main leading-tight ">
                        {t("title")}
                    </h1>

                    <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-header">
                        {t("description")}
                    </p>
                </div>
            </div>

            {/* certifications */}
            <div className="px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {certificationAreas.map((area) => (
                        <div key={area.id} className="rounded-md overflow-hidden shadow-sm h-fit">
                            <div className={`${area.headingColor} p-4 md:p-5 h-full`}>
                                <h3 className="font-bold text-base md:text-lg text-white">
                                    {t(`area${area.id}Title`)}
                                </h3>
                            </div>
                            <div className={`p-4 md:p-5 text-sm md:text-base space-y-1.5 text-description ${area.descriptionColor}`}>
                                {Array.from({ length: area.certCount }, (_, i) => (
                                    <p key={i}>• {t(`area${area.id}Cert${i + 1}`)}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page



