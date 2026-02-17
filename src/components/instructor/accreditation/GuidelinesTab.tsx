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
        <div className="space-y-6">
            {/* Course Requirements */}
            <div>
                <h3 className="text-base font-semibold text-title mb-3">
                    Course Requirements
                </h3>
                <ul className="space-y-2.5">
                    {guidelines.courseRequirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-description">{req}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Review Process */}
            <div>
                <h3 className="text-base font-semibold text-title mb-3">
                    Review Process
                </h3>
                <ol className="space-y-2.5">
                    {guidelines.reviewProcess.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-main text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                {i + 1}
                            </span>
                            <span className="text-sm text-description">{step}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default GuidelinesTab;
