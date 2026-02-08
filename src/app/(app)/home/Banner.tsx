import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    return (

        <div className="relative w-full h-60 sm:h-80 md:h-96 lg:h-240 overflow-hidden">
            {/* Background Image */}
            <Image
                src="/home/banner.jpg"
                alt="Banner"
                fill
                className="object-center"
                priority
            />

            {/* Gradient Overlay - blue on left, transparent on right */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-700/85 via-blue-600/55 to-transparent" />

            {/* Content */}
            <div className="relative z-10 container mx-auto flex flex-col justify-center h-full px-3 md:px-0">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight ">
                    Learn, get
                    <br />
                    Certified,Grow.
                </h1>

                <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-white">
                    Value-driven training from industry experts.
                </p>

                <div className="mt-5 md:mt-8 md:border border-white rounded-md w-54 h-15 flex justify-center items-center">
                    <Link href={"/categories"} className=" m-1 py-3 px-6 border-2 rounded-md text-xs sm:text-sm font-medium text-main bg-white hover:text-blue-600 transition-colors cursor-pointer">
                        Browse Main Categories
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
