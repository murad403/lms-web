import Image from 'next/image'
import Link from 'next/link'
import banner from "@/assets/banner/partner.png"

const PartnerBanner = () => {
    return (
        <div className="relative w-full h-60 sm:h-80 md:h-96 lg:h-110 overflow-hidden">
            {/* Background Image */}
            <Image
                src={banner}
                alt="Banner"
                fill
                className="object-center"
                priority
            />

            {/* Content */}
            <div className="relative z-10 container mx-auto flex flex-col justify-center h-full px-3 md:px-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-main leading-tight ">
                    Do you want to become <br /> an exclusive Local <br /> Guidance Center?
                </h1>

                <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-header">
                    Be the reference point and earn by providing guidance, <br />
                    collaborating with institutions and trainers
                </p>
                <div className=" mt-4 flex items-center">
                    <Link href={"/auth/partner-sign-up"} className="py-4 px-6 border-2 text-xs sm:text-sm font-medium text-white bg-main hover:bg-main/90 transition-colors cursor-pointer">
                        GET STARTED
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default PartnerBanner
