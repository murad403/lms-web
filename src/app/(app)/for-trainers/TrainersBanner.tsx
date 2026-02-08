import Image from 'next/image'
import Link from 'next/link'
import banner from "@/assets/banner/trainers.png";

const TrainersBanner = () => {
    return (
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
            <div className="relative z-10 container mx-auto flex flex-col justify-center h-full px-3 md:px-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-main leading-tight ">
                    Become a trainer
                </h1>

                <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-header">
                    Create, publish and sell online
                </p>
                <div className=" mt-4 flex items-center">
                    <Link href={"/"} className="py-4 px-6 border-2 text-xs sm:text-sm font-medium text-white bg-main hover:bg-main/90 transition-colors cursor-pointer">
                        Start teaching
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default TrainersBanner
