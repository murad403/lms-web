"use client";

import { CheckCircle } from "lucide-react";

type Props = {
    guidelines: {
        courseRequirements: string[];
        reviewProcess: string[];
    };
};

const GuidelinesTab = ({ guidelines }: Props) => {
    return (
        <div className="space-y-6 bg-white rounded-md p-5">
            <div>
                <h3 className="text-lg font-semibold text-title">Accreditation Guidelines</h3>
                <p className="text-sm text-description">Requirements for course accreditation</p>
            </div>
            {/* Course Requirements */}
            <div>
                <h3 className="text-lg font-semibold text-title mb-3">
                    Course Requirements
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
                    Review Process
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
                Need help? Contact our accreditation team at accreditation@learnhub.com
            </p>
        </div>
    );
};

export default GuidelinesTab;
