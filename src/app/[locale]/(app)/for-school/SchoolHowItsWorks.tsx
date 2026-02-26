import React from 'react'
import { getTranslations } from "next-intl/server";

const SchoolHowItsWorks = async () => {
    const t = await getTranslations("ForSchool");
    return (
  
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <h2 className="text-2xl md:text-4xl font-bold text-center text-navy-blue">
                    {t("howItWorksTitle")}
                </h2>
                <p className='text-description text-lg text-center mt-2 mb-12'>{t("howItWorksSubTitle")}</p>

                {/* Steps Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                    
                    {/* Step 1 */}
                    <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200">
                        <h3 className="text-xl md:text-2xl font-bold text-navy-blue mb-4">
                            1. {t("step1Title")}
                        </h3>
                        <p className="text-gray-600 text-base mb-3">
                            {t("step1Desc")}
                        </p>
                        <p className="text-gray-600 text-base">
                            {t("step1SubDesc")}
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200">
                        <h3 className="text-xl md:text-2xl font-bold text-navy-blue mb-4">
                            2. {t("step2Title")}
                        </h3>
                        <p className="text-gray-600 text-base mb-3">
                            {t("step2Desc")}
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-600 text-base mb-3">
                            <div>• {t("step2Videos")}</div>
                            <div>• {t("step2LearningModules")}</div>
                            <div>• {t("step2Documents")}</div>
                            <div>• {t("step2Assessments")}</div>
                        </div>
                        <p className="text-gray-600 text-base">
                            {t("step2SubDesc")}
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200">
                        <h3 className="text-xl md:text-2xl font-bold text-navy-blue mb-4">
                            3. {t("step3Title")}
                        </h3>
                        <p className="text-gray-600 text-base mb-3">
                            {t("step3Desc")}
                        </p>
                        <p className="text-gray-600 text-base">
                            {t("step3SubDesc")}
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200">
                        <h3 className="text-xl md:text-2xl font-bold text-navy-blue mb-4">
                            4. {t("step4Title")}
                        </h3>
                        <p className="text-gray-600 text-base mb-3">
                            {t("step4Desc")}
                        </p>
                        <ul className="text-gray-600 text-base space-y-1 mb-3">
                            <li>• {t("step4Item1")}</li>
                            <li>• {t("step4Item2")}</li>
                            <li>• {t("step4Item3")}</li>
                        </ul>
                        <p className="text-gray-600 text-base">
                            {t("step4SubDesc")}
                        </p>
                    </div>

                    {/* Step 5 */}
                    <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200">
                        <h3 className="text-xl md:text-2xl font-bold text-navy-blue mb-4">
                            5. {t("step5Title")}
                        </h3>
                        <p className="text-gray-600 text-base mb-3">
                            {t("step5Desc")}
                        </p>
                        <ul className="text-gray-600 text-base space-y-1 mb-3">
                            <li>• {t("step5Item1")}</li>
                            <li>• {t("step5Item2")}</li>
                            <li>• {t("step5Item3")}</li>
                        </ul>
                        <p className="text-gray-600 text-base">
                            {t("step5SubDesc")}
                        </p>
                    </div>

                </div>
            </div>
     
    )
}

export default SchoolHowItsWorks
