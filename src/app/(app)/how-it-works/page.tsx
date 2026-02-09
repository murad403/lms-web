import FooterNavigationBanner from '@/components/reusable/FooterNavigationBanner';
import CTABanner from '@/components/reusable/CTABanner';
import { Search, BookOpen, Award, UserCheck, FileText, Users, CheckCircle, BookCheck, GraduationCap } from 'lucide-react';

const learnerSteps = [
    {
        step: 'Browse & Discover',
        icon: Search,
        description:
            'Explore thousands of courses across multiple categories. Filter by certification type, learning mode, and more.',
    },
    {
        step: 'Enroll & Learn',
        icon: BookOpen,
        description:
            'Choose online or in-person courses. Learn at your own pace with expert instructors and comprehensive materials.',
    },
    {
        step: 'Get Certified',
        icon: Award,
        description:
            "Complete your course and earn EU-recognized certifications that employers value and trust.",
    },
];

const trainerSteps = [
    {
        step: 'Apply & Verify',
        icon: UserCheck,
        description:
            'Submit your credentials and expertise. Our team verifies your qualifications to ensure quality standards.',
    },
    {
        step: 'Create & Publish',
        icon: FileText,
        description:
            'Build your course content, set your pricing, and publish to thousands of potential learners.',
    },
    {
        step: 'Teach & Earn',
        icon: Users,
        description:
            'Share your expertise, engage with students, and earn income from your professional knowledge.',
    },
];

const schoolSteps = [
    {
        step: 'Get Accredited',
        icon: CheckCircle,
        description:
            'Apply for accreditation and verification. We ensure your institution meets EU quality standards.',
    },
    {
        step: 'Publish Catalog',
        icon: BookCheck,
        description:
            'Upload your complete course catalog and make it available to thousands of potential students.',
    },
    {
        step: 'Grow Your Reach',
        icon: GraduationCap,
        description:
            'Connect with learners across Europe, expand your institutional presence, and grow enrollments.',
    },
];

const HowItWorksPage = () => {
    return (
        <div>
            <FooterNavigationBanner
                title="How It Works"
                description={
                    <>
                        Discover how Form-Cert connects learners, trainers, and schools to create a <br />
                        meaningful and world-class training experience.
                    </>
                }
            />

            {/* For Learners Section */}
            <section className="py-16 container max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header text-center mb-12">For Learners</h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {learnerSteps.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="bg-[#DBEAFE] p-4 rounded-full w-fit mx-auto mb-4">
                                    <Icon className="size-8 text-main" />
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg font-medium text-main mb-2">Step {index + 1}</h3>
                                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-header mb-3">{item.step}</h4>
                                <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* For Trainers Section */}
            <section className=" max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                <div className="container py-16 mx-auto bg-[#F9FAFB] rounded-md">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header text-center mb-12">For Trainers</h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {trainerSteps.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="text-center p-8">
                                    <div className="bg-[#DBEAFE] p-4 rounded-full w-fit mx-auto mb-4">
                                        <Icon className="size-8 text-main" />
                                    </div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-main mb-2">Step {index + 1}</h3>
                                    <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-header mb-3">{item.step}</h4>
                                    <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* For Schools & Institutions Section */}
            <section className="py-16 container mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header text-center mb-12">For Schools & Institutions</h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {schoolSteps.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="bg-[#DBEAFE] p-4 rounded-full w-fit mx-auto mb-4">
                                    <Icon className="size-8 text-main" />
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg font-bold text-main mb-2">Step {index + 1}</h3>
                                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-header mb-3">{item.step}</h4>
                                <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA Banner */}
            <section className="pt-16">
                <CTABanner
                    title="Ready to Get Started?"
                    description="Join thousands of learners, trainers, and institutions on Form-Cert today."
                    buttonText="Get Started"
                    route="/auth/sign-up"
                />
            </section>
        </div>
    );
};

export default HowItWorksPage;
