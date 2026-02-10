import { getTranslations } from "next-intl/server";

const TrainersHowItsWorks = async () => {
    const t = await getTranslations("ForTrainers");
    return (
        <div className="container mx-auto max-w-7xl">
            {/* Header */}
            <h2 className="text-xl md:text-3xl font-bold text-center text-main mb-12">
                {t("howItWorksTitle")}
            </h2>

            {/* Steps Grid */}
            <div className='space-y-3 md:space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6'>
                    {/* Step 1 */}
                    <div className="border border-gray-100 rounded-md p-5 md:p-6 shadow-sm">
                        <div className="flex flex-col gap-4">
                            <div className="bg-main text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0">
                                1
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {t("step1Title")}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t("step1Desc")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="border border-gray-100 rounded-md p-5 md:p-6 shadow-sm md:col-span-2">
                        <div className="flex flex-col gap-4">
                            <div className="bg-main text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0">
                                2
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {t("step2Title")}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-2">
                                    {t("step2Desc")}
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    You can create your course at your own pace and update it anytime
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6'>
                    {/* Step 3 */}
                    <div className="border border-gray-100 rounded-md p-5 md:p-6 shadow-sm">
                        <div className="flex flex-col gap-4">
                            <div className="bg-main text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0">
                                3
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {t("step3Title")}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-2">
                                    {t("step3Desc")}
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Certification increases the value and credibility of your course
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="border border-gray-100 rounded-md p-5 md:p-6 shadow-sm">
                        <div className="flex flex-col gap-4">
                            <div className="bg-main text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0">
                                4
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {t("step4Title")}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-2">
                                    {t("step4Desc")}
                                </p>
                                <ul className="text-gray-600 space-y-1">
                                    <li>• Track your sales</li>
                                    <li>• View performance results</li>
                                    <li>• Receive payments according to the agreed terms</li>
                                </ul>
                                <p className="text-gray-600 mt-2">
                                    You teach, we handle the commercial side
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TrainersHowItsWorks
