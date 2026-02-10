import React from 'react'
import { getTranslations } from "next-intl/server";

const SchoolHowItsWorks = async () => {
    const t = await getTranslations("ForSchool");
    return (
  
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <h2 className="text-xl md:text-3xl font-bold text-center text-main ">
                    {t("howItWorksTitle")}
                </h2>
                <p className='text-description text-lg md:text-xl text-center mt-2 mb-12'>Perfect for established training organizations</p>

                {/* Steps Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                    
                    {/* Step 1 */}
                    <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                            {t("step1Title")}
                        </h3>
                        <p className="text-gray-600 mb-3">
                            {t("step1Desc")}
                        </p>
                        <p className="text-gray-600">
                            Simple and free registration.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                            {t("step2Title")}
                        </h3>
                        <p className="text-gray-600 mb-3">
                            {t("step2Desc")}
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-600 mb-3">
                            <div>• Videos</div>
                            <div>• Learning modules</div>
                            <div>• Documents</div>
                            <div>• Assessments</div>
                        </div>
                        <p className="text-gray-600">
                            You stay in full control of your content.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                            {t("step3Title")}
                        </h3>
                        <p className="text-gray-600 mb-3">
                            {t("step3Desc")}
                        </p>
                        <p className="text-gray-600">
                            Certified courses gain higher credibility and value.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                            {t("step4Title")}
                        </h3>
                        <p className="text-gray-600 mb-3">
                            {t("step4Desc")}
                        </p>
                        <ul className="text-gray-600 space-y-1 mb-3">
                            <li>• Published on the platform</li>
                            <li>• Promoted through our channels</li>
                            <li>• Listed in the most relevant categories</li>
                        </ul>
                        <p className="text-gray-600">
                            We handle marketing and visibility.
                        </p>
                    </div>

                    {/* Step 5 */}
                    <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                            5. Sales and Revenue
                        </h3>
                        <p className="text-gray-600 mb-3">
                            Your courses are sold online and you start earning
                        </p>
                        <ul className="text-gray-600 space-y-1 mb-3">
                            <li>• Track sales performance</li>
                            <li>• Manage enrollments</li>
                            <li>• Receive payments according to agreed terms</li>
                        </ul>
                        <p className="text-gray-600">
                            You focus on training, we manage the commercial process
                        </p>
                    </div>

                </div>
            </div>
     
    )
}

export default SchoolHowItsWorks
