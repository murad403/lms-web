import Image from "next/image";

const Banner = () => {
    return (
        <div className="">
            <div className="relative w-full h-60 sm:h-80 md:h-96 lg:h-148 overflow-hidden">
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
                <div className="relative z-10 container mx-auto flex flex-col justify-center h-full">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        Learn, get
                        <br />
                        Certified,Grow.
                    </h1>

                    <p className="mt-3 md:mt-4 text-xs sm:text-base md:text-lg text-white/90">
                        Value-driven training from industry experts.
                    </p>

                    <div className="mt-5 md:mt-8">
                        <button className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-white text-white rounded-md text-xs sm:text-sm font-medium hover:bg-white hover:text-blue-600 transition-colors cursor-pointer">
                            Browse Main Categories
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
