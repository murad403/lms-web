import { getTranslations } from "next-intl/server";

type TCanDo = {
    id: number;
    title: string;
    description: string;
}

const PartnerShipHowItsWorks = async () => {
    const t = await getTranslations("Partnerships");

    const whatYouCanDo: TCanDo[] = [
        { id: 1, title: t("step1Title"), description: t("step1Desc") },
        { id: 2, title: t("step2Title"), description: t("step2Desc") },
        { id: 3, title: t("step3Title"), description: t("step3Desc") },
        { id: 4, title: t("step4Title"), description: t("step4Desc") },
    ];
    return (
        <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue text-center mb-12">
                {t("howItWorksTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-16">
                {
                    whatYouCanDo.map((item: TCanDo) =>
                        <div key={item?.id} className="flex gap-4">
                            <h1 className="text-5xl font-semibold text-gray-400">{item.id}</h1>
                            <div className="space-y-3">
                                <h3 className="text-xl md:text-2xl font-bold text-navy-blue">{item.title}</h3>
                                <p className="text-description text-base md:text-lg">{item.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PartnerShipHowItsWorks
