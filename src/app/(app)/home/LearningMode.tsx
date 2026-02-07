import { Monitor, Building2, MapPin } from "lucide-react";

const learningModes = [
    {
        icon: Monitor,
        title: "Online Courses",
        buttonText: "Explore Online",
    },
    {
        icon: Building2,
        title: "In-Person Courses",
        buttonText: "Find Classes",
    },
    {
        icon: MapPin,
        title: "Courses Near You",
        buttonText: "Search Nearby",
    },
];

const LearningMode = () => {
    return (
        <div>
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-2xl md:text-4xl font-bold text-header mb-3">
                        Choose Your Learning Mode
                    </h2>
                    <p className="text-description text-base md:text-lg">
                        Flexible options to match your schedule
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {learningModes.map((mode, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                        >
                            <mode.icon className="size-12 text-main mb-6" strokeWidth={1.5} />
                            <h3 className="text-xl md:text-2xl font-bold text-header mb-5">
                                {mode.title}
                            </h3>
                            <button className="px-5 py-2.5 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors">
                                {mode.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningMode;
