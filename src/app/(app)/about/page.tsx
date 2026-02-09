import FooterNavigationBanner from '@/components/reusable/FooterNavigationBanner';
import CTABanner from '@/components/reusable/CTABanner';
import { Target, Eye, Users, GraduationCap, Building2 } from 'lucide-react';

type AudienceCard = {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
};

const audienceCards: AudienceCard[] = [
    {
        id: 1,
        title: "For Learners",
        description:
            "We provide access to professional courses, interactive training, and EU-recognized certifications to advance your career.",
        icon: Users,
    },
    {
        id: 2,
        title: "For Trainers",
        description:
            "We offer trainers tools, courses, and resources to create, deliver and manage training with maximum impact on professionals.",
        icon: GraduationCap,
    },
    {
        id: 3,
        title: "For Institutions",
        description:
            "We help schools, universities, and businesses enhance their offerings by integrating top-tier training into their programs.",
        icon: Building2,
    },
];


const AboutPage = () => {
    return (
        <div>
            <FooterNavigationBanner
                title="About Us"
                description={
                    <>
                        Form-Cert is the leading EU-grade professional training and certification <br /> platform,
                        connecting learners, trainers, and institutions.
                    </>
                }
            />

            {/* Who We Are Section */}
            <section className="py-14 max-w-7xl container mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                <div className="mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header mb-6">Who We Are</h2>
                    <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4">
                        Form-Cert is a comprehensive training and certification platform designed to meet the professional development needs of <br /> individuals, organizations, and institutions across the European Union.
                    </p>
                    <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                        We bridge the gap between quality education and professional advancement by offering <br /> EU-recognized certifications, expert-led courses, and flexible learning pathways.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mx-auto">
                    {/* Our Mission */}
                    <div className="bg-[#EFF6FF] rounded-md p-8">

                        <Target className="size-8 text-main mb-3" />

                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-header mb-3">Our Mission</h3>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed">
                            To provide accessible, high quality professional training that empowers learners to
                            advance their careers, support trainers to share their expertise, and enables institutions
                            to develop their teams.
                        </p>
                    </div>

                    {/* Our Vision */}
                    <div className="bg-[#EFF6FF] rounded-md p-8">

                        <Eye className="size-8 text-main mb-3" />

                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-header mb-3">Our Vision</h3>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed">
                            To become the most trusted platform for professional development in Europe, where quality
                            meets accessibility and where learners everywhere can access world-class training and
                            credible certifications.
                        </p>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-14">
                <div className="container max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header mb-12">What We Do</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {
                            audienceCards.map((card) => (
                                <div key={card.id} className="rounded-md border border-gray-100 p-8 text-center">

                                    <card.icon className="size-8 text-main mb-3" />

                                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-header mb-3">{card.title}</h3>
                                    <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed">{card.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* Trust, Quality, Certifications Section */}
            <section className="py-14 container max-w-7xl bg-[#F9FAFB] rounded-md mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header mb-6 text-center">Trust, Quality, Certifications</h2>
                    <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4">
                        All certifications on Form-Cert meet rigorous EU standards and are recognized by employers and institutions across Europe. We partner only with accredited trainers and organizations to ensure the highest quality of education.
                    </p>
                    <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                        Our platform is built on transparency, trust, and commitment to professional excellence. Every course, every certification, and every partnership is designed with your success in mind.
                    </p>
                </div>
            </section>

            {/* CTA Banner */}
            <section className='pt-14'>
                <CTABanner
                    title="Ready to Get Started?"
                    buttonText="Contact Us"
                    route="/contacts"
                />
            </section>
        </div>
    );
};

export default AboutPage;
