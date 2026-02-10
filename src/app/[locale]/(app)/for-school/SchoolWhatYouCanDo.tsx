import { getTranslations } from "next-intl/server";

type TCanDo = {
    id: number;
    title: string;
    description: string;
}

const SchoolWhatYouCanDo = async () => {
    const t = await getTranslations("ForSchool");

    const whatYouCanDo: TCanDo[] = [
        { id: 1, title: t("publishCourses"), description: t("publishCoursesDesc") },
        { id: 2, title: t("manageCertificates"), description: t("manageCertificatesDesc") },
        { id: 3, title: t("trackProgress"), description: t("trackProgressDesc") },
        { id: 4, title: t("whatYouCanDo"), description: t("whatYouCanDoDesc") },
        { id: 5, title: t("analyticsInsights"), description: t("analyticsInsightsDesc") },
    ];
    return (
        <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-title text-center mb-10">
                {t("whatYouCanDo")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-16">
                {
                    whatYouCanDo.map((item: TCanDo) =>
                        <div key={item?.id} className="flex gap-4">
                            <h1 className="text-4xl font-semibold text-gray-400">{item.id}</h1>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-main">{item.title}</h3>
                                <p className="text-description text-xl">{item.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SchoolWhatYouCanDo
