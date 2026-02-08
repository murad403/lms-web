import Link from 'next/link';
import Image from 'next/image';
import { PiGraduationCap, PiUsersThree, PiBuildingOffice } from 'react-icons/pi';
import authImage from '@/assets/auth/auth.png';

const accountTypes = [
    {
        title: "I'm a Learner",
        description: 'Access courses, earn certifications, and advance your career',
        icon: PiGraduationCap,
        href: '/auth/learner-sign-up',
    },
    {
        title: "I'm a Trainer",
        description: 'Create courses, teach students, and earn income from your expertise',
        icon: PiUsersThree,
        href: '/auth/trainer-sign-up',
    },
    {
        title: "I'm an Institution",
        description: 'Offer courses, manage training programs, and expand your reach',
        icon: PiBuildingOffice,
        href: '/auth/organization-sign-up',
    },
];

const SignUp = () => {
    return (
        <div className="min-h-screen flex">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
                <div className='w-full md:w-1/2 px-5 md:px-0'>
                    <Link href="/" className="flex items-center gap-2 mb-10">
                        <PiGraduationCap className="size-10 text-main" />
                        <span className="text-3xl font-bold text-main">Form-Cert</span>
                    </Link>

                    <h1 className="text-3xl font-bold text-header mb-2">Create Your Account</h1>
                    <p className="text-description mb-8">
                        Choose the account type that best describes you
                    </p>

                    <div className="space-y-4 max-w-lg">
                        {accountTypes.map((type) => (
                            <Link
                                key={type.title}
                                href={type.href}
                                className="flex items-center gap-4 p-5 border border-gray-200 rounded-xl hover:border-main/30 hover:shadow-md transition group"
                            >
                                <div className="size-12 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                                    <type.icon className="size-6 text-main" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-header group-hover:text-main transition">
                                        {type.title}
                                    </h3>
                                    <p className="text-sm text-description mt-1">{type.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <p className="text-sm text-description mt-8 text-center">
                        Already have an account?{' '}
                        <Link href="/auth/sign-in" className="text-main font-semibold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:flex w-1/2 bg-main items-center justify-center p-12">
                <Image
                    src={authImage}
                    width={500}
                    height={500}
                    alt="Learning illustration"
                    className="max-w-full h-auto object-contain"
                    priority
                />
            </div>
        </div>
    );
};

export default SignUp;
