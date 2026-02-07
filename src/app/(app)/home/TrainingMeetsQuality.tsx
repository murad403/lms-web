import Image from "next/image";

const TrainingMeetsQuality = () => {
    return (
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden bg-main">
            {/* Background Image */}
            <Image
                src="/home/bg.jpg"
                alt="Training Meets Quality"
                fill
                className="object-cover opacity-30"
            />

            {/* Person Image - positioned right */}
            <div className="absolute right-[10%] md:right-[15%] bottom-0 hidden sm:block w-48 md:w-64 lg:w-80 h-full">
                <Image
                    src="/home/user2.jpg"
                    alt="Student"
                    fill
                    className="object-contain object-bottom"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center h-full">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                    Where Training
                    <br />
                    Meets Quality
                </h2>
                <p className="text-white/80 text-base md:text-lg mb-6 max-w-sm">
                    From training to employment,
                    <br />
                    on a single platform.
                </p>
                <div>
                    <button className="px-8 py-3 bg-white text-main rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
                        Join Us
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrainingMeetsQuality;
