import Image from "next/image";

const Certificate = () => {
    return (
        <div className="py-16 md:py-28 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-5xl mx-auto">
                    {/* Left Content */}
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-4xl font-bold text-header leading-tight mb-4">
                            Valid and Recognized
                            <br />
                            Certifications
                        </h2>
                        <p className="text-description text-base md:text-lg mb-8">
                            Choose the right certifications for you.
                        </p>
                        <button className="px-8 py-3 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors">
                            Explore Certifications
                        </button>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 w-full">
                        <div className="relative md:w-138 h-64 sm:h-72 md:h-80 lg:h-96">
                            <Image
                                src="/home/certificate.jpg"
                                alt="Certificate"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certificate;
