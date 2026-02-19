"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Layers, FileText, Play, Globe } from "lucide-react";
import BasicInfoTab, { BasicInfoFormData } from "@/components/modal/create-course/BasicInfoTab";
import AdvanceInfoTab, { AdvanceInfoFormData } from "@/components/modal/create-course/AdvanceInfoTab";
import PublishCourseTab from "@/components/modal/create-course/PublishCourseTab";
import { TCourseSection } from "@/lib/instructor";
import CurriculumTab from "@/components/modal/create-course/CurriculumTab";

const tabs = [
    { id: 0, label: "Basic Information", icon: Layers },
    { id: 1, label: "Advance Information", icon: FileText },
    { id: 2, label: "Curriculum", icon: Play },
    { id: 3, label: "Publish Course", icon: Globe },
];

const defaultSections: TCourseSection[] = [
    {
        id: "section-1",
        title: "Section 1: Getting Started",
        lectures: [
            { id: "lecture-1", title: "Introduction", type: "video", duration: "5:00" },
            { id: "lecture-2", title: "Course Overview", type: "video", duration: "10:00" },
        ],
    },
];

const CreateCoursePage = () => {
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const isEdit = !!editId;

    const [activeTab, setActiveTab] = useState(0);
    
    // Form data storage
    const [basicInfo, setBasicInfo] = useState<BasicInfoFormData | null>(null);
    const [advanceInfo, setAdvanceInfo] = useState<AdvanceInfoFormData | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [trailer, setTrailer] = useState<File | null>(null);

    // Curriculum state
    const [sections, setSections] = useState<TCourseSection[]>(
        isEdit ? defaultSections : []
    );

    const goNext = () => {
        if (activeTab < tabs.length - 1) {
            setActiveTab(activeTab + 1);
        }
    };

    const goPrev = () => {
        if (activeTab > 0) {
            setActiveTab(activeTab - 1);
        }
    };

    const handleBasicSubmit = (data: BasicInfoFormData) => {
        setBasicInfo(data);
        goNext();
    };

    const handleAdvanceSubmit = (data: AdvanceInfoFormData, thumb: File | null, trail: File | null) => {
        setAdvanceInfo(data);
        setThumbnail(thumb);
        setTrailer(trail);
        goNext();
    };

    const handlePublish = () => {
        // TODO: API call to create/update course
        console.log("Publishing course...", { basicInfo, advanceInfo, sections });
    };

    return (
        <div className="space-y-6">
            {/* Step indicator */}
            <div className="bg-white rounded-lg border border-border-light p-4">
                <div className="flex items-center justify-between">
                    {tabs.map((tab, i) => {
                        const Icon = tab.icon;
                        const isCompleted = i < activeTab;
                        const isActive = i === activeTab;
                        
                        return (
                            <div key={tab.id} className="flex items-center flex-1">
                                <button
                                    onClick={() => i <= activeTab && setActiveTab(i)}
                                    className={`flex items-center gap-2 ${i <= activeTab ? 'cursor-pointer' : 'cursor-default'}`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-main' : isCompleted ? 'text-green-500' : 'text-description'}`} />
                                    <span className={`text-sm font-medium hidden sm:block ${isActive ? 'text-main' : isCompleted ? 'text-title' : 'text-description'}`}>
                                        {tab.label}
                                    </span>
                                    {isCompleted && (
                                        <div className="flex items-center text-green-500">
                                            <Check className="w-4 h-4" />
                                            <Check className="w-4 h-4 -ml-2" />
                                        </div>
                                    )}
                                </button>
                                {i < tabs.length - 1 && (
                                    <div className={`flex-1 h-px mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tab content */}
            <div className="bg-white rounded-lg border border-border-light p-4 sm:p-6">
                {activeTab === 0 && (
                    <BasicInfoTab
                        onNext={handleBasicSubmit}
                        onCancel={() => window.history.back()}
                        defaultValues={basicInfo || undefined}
                    />
                )}

                {activeTab === 1 && (
                    <AdvanceInfoTab
                        onNext={handleAdvanceSubmit}
                        onPrev={goPrev}
                        defaultValues={advanceInfo || undefined}
                    />
                )}

                {activeTab === 2 && (
                    <CurriculumTab
                        sections={sections}
                        setSections={setSections}
                        onNext={goNext}
                        onPrev={goPrev}
                    />
                )}

                {activeTab === 3 && (
                    <PublishCourseTab
                        onPrev={goPrev}
                        onSubmit={handlePublish}
                    />
                )}
            </div>
        </div>
    );
};

export default CreateCoursePage;
