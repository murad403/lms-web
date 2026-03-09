"use client";

import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    guidelines: {
        courseRequirements: string[];
        reviewProcess: string[];
    };
};

const GuidelinesTab = ({ guidelines }: Props) => {
    const t = useTranslations("InstructorAccreditation");
    return (
        <div className="space-y-6 bg-white rounded-md p-5">
            <div>
                <h3 className="text-lg font-semibold text-title">{t("accreditationGuidelines")}</h3>
                <p className="text-sm text-description">{t("requirementsForAccreditation")}</p>
            </div>
            {/* Course Requirements */}
            <div>
                <h3 className="text-lg font-semibold text-title mb-3">
                    {t("courseRequirements")}
                </h3>
                <ul className="space-y-2.5">
                    {guidelines.courseRequirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle className="size-6 text-red-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-description">{req}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Review Process */}
            <div>
                <h3 className="text-lg font-semibold text-title mb-3">
                    {t("reviewProcess")}
                </h3>
                <ol className="space-y-2.5">
                    {guidelines.reviewProcess.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                            <span className="rounded-full text-title flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                                {i + 1}.
                            </span>
                            <span className="text-sm text-description">{step}</span>
                        </li>
                    ))}
                </ol>
            </div>

            <p className="text-base text-title font-medium bg-[#ECF9FF] p-4 rounded-md">
                {t("needHelp")}
            </p>
        </div>
    );
};

export default GuidelinesTab;
