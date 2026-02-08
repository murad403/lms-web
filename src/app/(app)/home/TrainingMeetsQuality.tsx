import Image from "next/image";
import user from "../../../../public/home/user2.png";

const TrainingMeetsQuality = () => {
    return (
        <div className="relative w-full md:py-10 pt-10 bg-main">
            <div className="container mx-auto px-4 md:px-32">
                {/* Desktop: Image positioned absolutely */}
                <Image
                    src={user}
                    alt="Student"
                    className="hidden md:block absolute right-100 bottom-1 scale-102"
                    width={350}
                    height={320}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center h-full">
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
                        <button className="px-12 py-3 bg-white text-main rounded-md text-[15px] font-semibold hover:bg-gray-100 transition-colors">
                            Join Us
                        </button>
                    </div>
                </div>

                {/* Mobile and Tablet: Image on bottom */}
                <div className="md:hidden flex justify-center mt-6">
                    <Image
                        src={user}
                        alt="Student"
                        width={200}
                        height={200}
                        className="w-auto h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default TrainingMeetsQuality;
