import { Link } from '@/i18n/navigation';
import { PiGraduationCap, PiUsersThree, PiBuildingOffice } from 'react-icons/pi';
import AuthBanner from '@/components/auth/AuthBanner';
import { Handshake } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const SignUp = async () => {
    const t = await getTranslations('Auth');

    const accountTypes = [
        {
            titleKey: 'learnerTitle',
            descKey: 'learnerDesc',
            icon: PiGraduationCap,
            href: '/auth/learner-sign-up',
        },
        {
            titleKey: 'trainerTitle',
            descKey: 'trainerDesc',
            icon: PiUsersThree,
            href: '/auth/trainer-sign-up',
        },
        {
            titleKey: 'institutionTitle',
            descKey: 'institutionDesc',
            icon: PiBuildingOffice,
            href: '/auth/organization-sign-up',
        },
        {
            titleKey: 'partnerTitle',
            descKey: 'partnerDesc',
            icon: Handshake,
            href: '/auth/affiliate-sign-up',
        },
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
                <div className='w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-2xl'>
                    <Link href="/" className="flex items-center gap-2 mb-10">
                        <PiGraduationCap className="size-10 text-main" />
                        <span className="text-3xl font-bold text-main">Form-Cert</span>
                    </Link>

                    <h1 className="text-3xl font-bold text-header mb-2">{t('createAccountTitle')}</h1>
                    <p className="text-description mb-8">
                        {t('createAccountSubtitle')}
                    </p>

                    <div className="space-y-4 max-w-lg">
                        {accountTypes.map((type) => (
                            <Link
                                key={type.href}
                                href={type.href}
                                className="flex items-center gap-4 p-5 border border-gray-200 rounded-xl hover:border-main/30 hover:shadow-md transition group"
                            >
                                <div className="size-12 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                                    <type.icon className="size-6 text-main" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-header group-hover:text-main transition">
                                        {t(type.titleKey as Parameters<typeof t>[0])}
                                    </h3>
                                    <p className="text-sm text-description mt-1">{t(type.descKey as Parameters<typeof t>[0])}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <p className="text-sm text-description mt-8 text-center">
                        {t('alreadyHaveAccount')}{' '}
                        <Link href="/auth/sign-in" className="text-main font-semibold hover:underline">
                            {t('signIn')}
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image */}
            <AuthBanner/>
        </div>
    );
};

export default SignUp;
