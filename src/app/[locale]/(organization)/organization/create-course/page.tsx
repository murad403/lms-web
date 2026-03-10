"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Layers, FileText, Play, Globe } from "lucide-react";
import BasicInfoTab, { basicInfoSchema } from "@/components/reusable/create-course/BasicInfoTab";
import AdvanceInfoTab, { advanceInfoSchema } from "@/components/reusable/create-course/AdvanceInfoTab";
import PublishCourseTab from "@/components/reusable/create-course/PublishCourseTab";
import { TCourseSection } from "@/lib/instructor";
import CurriculumTab from "@/components/reusable/create-course/CurriculumTab";
import { useTranslations } from "next-intl";

const courseFormSchema = basicInfoSchema.merge(advanceInfoSchema);
type CourseFormData = z.infer<typeof courseFormSchema>;

const tabs = [
    { id: 0, labelKey: "basicInformation" as const, icon: Layers },
    { id: 1, labelKey: "advanceInformation" as const, icon: FileText },
    { id: 2, labelKey: "curriculum" as const, icon: Play },
    { id: 3, labelKey: "publishCourse" as const, icon: Globe },
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
    const t = useTranslations("InstructorCreateCourse");
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const isEdit = !!editId;

    const [activeTab, setActiveTab] = useState(0);
    
    // React Hook Form
    const methods = useForm<CourseFormData>({
        resolver: zodResolver(courseFormSchema),
        defaultValues: {
            title: "",
            subtitle: "",
            category: "",
            subCategory: "",
            topic: "",
            language: "",
            level: "",
            price: "",
            couponCode: "",
            discountPrice: "",
            expiryPeriod: "limited",
            description: "",
            whatYouWillTeach: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
            requirements: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
        },
    });

    // File state (managed outside form)
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

    const handlePublish = async (): Promise<boolean> => {
        // Validate all form fields
        const isValid = await methods.trigger();
        if (!isValid) {
            const { errors } = methods.formState;
            if (errors.title || errors.category || errors.language || errors.level) {
                setActiveTab(0);
                return false;
            }
            if (errors.description || errors.whatYouWillTeach || errors.requirements) {
                setActiveTab(1);
                return false;
            }
            return false;
        }

        if (sections.length === 0) {
            setActiveTab(2);
            return false;
        }

        try {
            const values = methods.getValues();
            const formData = new FormData();

            // Basic Info
            formData.append("title", values.title);
            if (values.subtitle) formData.append("subtitle", values.subtitle);
            formData.append("category", values.category);
            if (values.subCategory) formData.append("subCategory", values.subCategory);
            if (values.topic) formData.append("topic", values.topic);
            formData.append("language", values.language);
            formData.append("level", values.level);
            if (values.price) formData.append("price", values.price);
            if (values.couponCode) formData.append("couponCode", values.couponCode);
            if (values.discountPrice) formData.append("discountPrice", values.discountPrice);
            if (values.expiryPeriod) formData.append("expiryPeriod", values.expiryPeriod);

            // Advance Info
            if (values.description) formData.append("description", values.description);
            formData.append("whatYouWillTeach", JSON.stringify(
                values.whatYouWillTeach.map(item => item.value).filter(Boolean)
            ));
            formData.append("requirements", JSON.stringify(
                values.requirements.map(item => item.value).filter(Boolean)
            ));

            // Files
            if (thumbnail) formData.append("thumbnail", thumbnail);
            if (trailer) formData.append("trailer", trailer);

            // Curriculum
            formData.append("sections", JSON.stringify(sections));

            // Edit mode
            if (isEdit && editId) {
                formData.append("courseId", editId);
            }

            // TODO: Replace with your actual API endpoint
            // const response = await fetch("/api/courses", {
            //     method: isEdit ? "PUT" : "POST",
            //     body: formData,
            // });
            // if (!response.ok) throw new Error("Failed to submit course");

            console.log("Course data ready for API:", {
                values,
                thumbnail: thumbnail?.name,
                trailer: trailer?.name,
                sections,
                isEdit,
                editId,
            });

            return true;
        } catch (error) {
            console.error("Error submitting course:", error);
            return false;
        }
    };

    return (
        <FormProvider {...methods}>
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
                                        {t(tab.labelKey)}
                                    </span>
                                    {isCompleted && (
                                        <div className="flex items-center text-green-500">
                                            <Check className="w-4 h-4" />
                                            <Check className="w-4 h-4 -ml-2" />
                                        </div>
                                    )}
                                </button>
                                {i < tabs.length - 1 && (
                                    <div className={`flex-1 h-px mx-2 sm:mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
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
                        onNext={goNext}
                        onCancel={() => window.history.back()}
                    />
                )}

                {activeTab === 1 && (
                    <AdvanceInfoTab
                        onNext={goNext}
                        onPrev={goPrev}
                        onThumbnailChange={setThumbnail}
                        onTrailerChange={setTrailer}
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
        </FormProvider>
    );
};

export default CreateCoursePage;
