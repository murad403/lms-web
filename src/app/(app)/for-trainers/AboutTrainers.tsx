
type TFeature = {
    title: string;
    description: string;
}
const features: TFeature[] = [
    {
        title: "No upfront costs",
        description:
            "Competitive revenue share on every course enrollment. Top instructors earn €50,000+ annually."
    },
    {
        title: "No technical skills required",
        description:
            "Access to over 500,000 active learners across Europe seeking quality training."
    },
    {
        title: "Full control over your content",
        description:
            "Establish yourself as an industry expert and grow your professional reputation."
    },
    {
        title: "Official certification opportunities",
        description:
            "Create and teach courses on your own schedule. Work from anywhere."
    },
    {
        title: "Continuous support from our team",
        description:
            "Comprehensive tools, resources, and dedicated support to help you succeed."
    },
    {
        title: "Visibility on a structured platform",
        description:
            "Enterprise-grade platform with all the features you need to deliver quality training."
    }
];


const AboutTrainers = () => {
    return (
        <div className="container mx-auto max-w-7xl">

            {/* Do You Want to Teach */}
            <div className="border border-gray-100 rounded-md p-5 md:p-12 mb-8">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-main mb-4">
                    Do You Want to Teach with Us?
                </h2>
                <p className="text-description text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4">
                    Turn your experience into a successful course, Become an instructor and start earning by selling courses with full autonomy. You create the content, we support you with everything else
                </p>
                <p className="text-main text-base sm:text-lg md:text-xl font-semibold">
                    You create the course, we certify it, publish it, promote it, and sell it.
                </p>
            </div>

            {/* Why Become an Instructor */}
            <div className="border border-gray-100 rounded-md p-5 md:p-12 mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-main mb-6">
                    Why Become an Instructor with us
                </h2>

                <ul className="text-description text-xs sm:text-sm md:text-base space-y-1 mb-8">
                    <li>• No upfront costs</li>
                    <li>• No technical skills required</li>
                    <li>• Full control over your content</li>
                    <li>• Continuous support from our team</li>
                    <li>• Official certification opportunities</li>
                    <li>• Visibility on a structured marketplace</li>
                </ul>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-3">
                    {
                        features.map((feature: TFeature, index: number) => (
                            <div key={index} className="border border-gray-100 rounded-md p-5">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-title mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-description text-xs sm:text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default AboutTrainers
