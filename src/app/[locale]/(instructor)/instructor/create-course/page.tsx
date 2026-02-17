"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import BasicInfoTab from "@/components/instructor/create-course/BasicInfoTab";
import AdvanceInfoTab from "@/components/instructor/create-course/AdvanceInfoTab";
import CurriculumTab from "@/components/instructor/create-course/CurriculumTab";
import { TBasicInfoForm, TCourseSection } from "@/lib/instructor";

const tabs = [
    { id: 0, label: "Basic Information" },
    { id: 1, label: "Advance Information" },
    { id: 2, label: "Curriculum" },
    { id: 3, label: "Publish Course" },
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

    // Basic info form
    const {
        register: registerBasic,
        handleSubmit: handleBasicSubmit,
        setValue: setBasicValue,
    } = useForm<TBasicInfoForm>({
        defaultValues: {
            title: isEdit ? "Premiere Pro CC for Beginners" : "",
            category: isEdit ? "development" : "",
            level: isEdit ? "beginner" : "",
            language: isEdit ? "english" : "",
            price: isEdit ? "57.00" : "",
            discount: isEdit ? "10" : "",
            thumbnail: null,
            trailer: null,
        },
    });

    // Advance info state
    const [description, setDescription] = useState(
        isEdit
            ? "This comprehensive course covers everything you need to know about video editing with Adobe Premiere Pro CC."
            : ""
    );
    const [requirements, setRequirements] = useState<string[]>(
        isEdit
            ? [
                  "Basic computer skills",
                  "Adobe Premiere Pro CC installed",
                  "At least 8GB RAM",
                  "Dedicated graphics card recommended",
              ]
            : []
    );
    const [whatYouWillTeach, setWhatYouWillTeach] = useState<string[]>(
        isEdit
            ? [
                  "Professional video editing techniques",
                  "Color correction and grading",
                  "Audio editing and mixing",
                  "Export settings for different platforms",
              ]
            : []
    );

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

    const handlePublish = () => {
        // TODO: API call to create/update course
        console.log("Publishing course...");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-title">
                    {isEdit ? "Edit Course" : "Create New Course"}
                </h2>
            </div>

            {/* Step indicator */}
            <div className="bg-white rounded-lg border border-border-light p-4">
                <div className="flex items-center justify-between">
                    {tabs.map((tab, i) => (
                        <div key={tab.id} className="flex items-center flex-1">
                            <button
                                onClick={() => setActiveTab(i)}
                                className="flex items-center gap-2"
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors ${
                                        i < activeTab
                                            ? "bg-green-500 text-white"
                                            : i === activeTab
                                            ? "bg-main text-white"
                                            : "bg-gray-200 text-description"
                                    }`}
                                >
                                    {i < activeTab ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        i + 1
                                    )}
                                </div>
                                <span
                                    className={`text-sm font-medium hidden sm:block ${
                                        i === activeTab
                                            ? "text-title"
                                            : "text-description"
                                    }`}
                                >
                                    {tab.label}
                                </span>
                            </button>
                            {i < tabs.length - 1 && (
                                <div
                                    className={`flex-1 h-px mx-3 ${
                                        i < activeTab ? "bg-green-500" : "bg-gray-200"
                                    }`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tab content */}
            <div className="bg-white rounded-lg border border-border-light p-4 sm:p-6">
                {activeTab === 0 && (
                    <BasicInfoTab
                        register={registerBasic}
                        setValue={setBasicValue}
                    />
                )}

                {activeTab === 1 && (
                    <AdvanceInfoTab
                        description={description}
                        setDescription={setDescription}
                        requirements={requirements}
                        setRequirements={setRequirements}
                        whatYouWillTeach={whatYouWillTeach}
                        setWhatYouWillTeach={setWhatYouWillTeach}
                    />
                )}

                {activeTab === 2 && (
                    <CurriculumTab
                        sections={sections}
                        setSections={setSections}
                    />
                )}

                {activeTab === 3 && (
                    <div className="text-center py-12 space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-title">
                            Ready to Publish
                        </h3>
                        <p className="text-sm text-description max-w-md mx-auto">
                            Review all your course details before publishing. Once published,
                            your course will be available for students to enroll.
                        </p>
                        <button
                            onClick={handlePublish}
                            className="px-8 py-3 bg-main text-white rounded-lg text-sm font-semibold hover:bg-main/90 transition-colors"
                        >
                            {isEdit ? "Update Course" : "Publish Course"}
                        </button>
                    </div>
                )}

                {/* Navigation */}
                {activeTab < 3 && (
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-light">
                        <button
                            type="button"
                            onClick={goPrev}
                            disabled={activeTab === 0}
                            className="px-5 py-2.5 border border-border-light rounded-lg text-sm font-medium text-title hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={goNext}
                            className="px-5 py-2.5 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition-colors"
                        >
                            Save & Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateCoursePage;
