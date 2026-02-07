import Image from "next/image";
import user from "../../../../public/home/user2.png";

const TrainingMeetsQuality = () => {
    return (
        <div className="relative w-full py-10 bg-main">
            
           
                <Image
                    src={user}
                    alt="Student"
                    fill
                    className="object-contain object-bottom scale-105 absolute right-0 bottom-7"
                />
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
                    <button className="px-12 py-3 bg-white text-main rounded-md text-[15px] font-semibold hover:bg-gray-100 transition-colors">
                        Join Us
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrainingMeetsQuality;
