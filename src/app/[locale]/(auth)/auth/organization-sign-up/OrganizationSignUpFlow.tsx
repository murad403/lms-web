import React from 'react';
import { PiBuildingOffice } from 'react-icons/pi';
import { Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const OrganizationSignUpFlow = async () => {
    const t = await getTranslations('Auth');

    const features = [
        { titleKey: 'feature1Title', descKey: 'feature1Desc' },
        { titleKey: 'feature2Title', descKey: 'feature2Desc' },
        { titleKey: 'feature3Title', descKey: 'feature3Desc' },
    ];

    return (
        <div className="w-full lg:w-1/2 bg-main flex flex-col items-center justify-center px-8 sm:px-12 lg:px-16 py-12 text-white">
            <div className="max-w-md">
                <PiBuildingOffice className="size-16 mb-6" />

                <h2 className="text-3xl font-bold mb-4">{t('organizationPanelTitle')}</h2>
                <p className="text-white/70 mb-8 leading-relaxed">
                    {t('organizationPanelDesc')}
                </p>

                <div className="space-y-5">
                    {features.map((feature) => (
                        <div key={feature.titleKey} className="flex items-start gap-3">
                            <div className="size-6 rounded-full bg-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="size-4 text-white" strokeWidth={3} />
                            </div>
                            <div>
                                <h3 className="font-semibold">{t(feature.titleKey as Parameters<typeof t>[0])}</h3>
                                <p className="text-sm text-white/60">{t(feature.descKey as Parameters<typeof t>[0])}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrganizationSignUpFlow;
