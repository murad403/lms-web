import Image from "next/image";

const platformCards = [
    {
        title: "Become a Trainer",
        description: "Create, publish, and sell online",
        buttonText: "Start Teaching",
        image: "/home/cover1.png",
    },
    {
        title: "Are you a school?",
        description: "Publish your catalog and sell online.",
        buttonText: "Get Accredited Now",
        image: "/home/cover2.png",
    },
];

const JoinOurPlatform = () => {
    return (
        <div className="py-16 md:py-20 bg-linear-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-10 md:mb-24">
                    <h2 className="text-2xl md:text-4xl font-bold text-header mb-3">
                        Join Our Platform
                    </h2>
                    <p className="text-description text-base md:text-lg">
                        Opportunities for trainers, schools, and partners
                    </p>
                </div>

                {/* Top Two Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {platformCards.map((card, index) => (
                        <div
                            key={index}
                            className="relative h-70 md:h-75 rounded-xl overflow-hidden group"
                        >
                            {/* Background Image */}
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover"
                            />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-white text-sm md:text-base mb-4">
                                    {card.description}
                                </p>
                                <div>
                                    <button className="px-5 py-2.5 bg-main text-white rounded-lg text-sm font-semibold hover:bg-white hover:text-main transition-colors">
                                        {card.buttonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Full-Width Card */}
                <div>
                    <div className="relative h-55 md:h-62 rounded-xl overflow-hidden">
                        {/* Background Image */}
                        <Image
                            src="/home/cover3.png"
                            alt="Become a Partner"
                            fill
                            className="object-cover"
                        />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                Become a territorial orientation center
                            </h3>
                            <p className="text-white text-sm md:text-base mb-4">
                                Be the reference point in your area by collaborating with institutions and trainers
                            </p>
                            <div>
                                <button className="px-5 py-2.5 bg-main text-white rounded-lg text-sm font-semibold hover:bg-white hover:text-main transition-colors">
                                    Become a Partner
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinOurPlatform;
