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
import CurriculumTab from "../../../../../components/reusable/create-course/CurriculumTab";
import { useTranslations } from "next-intl";
import { useAddCourseAdvanceInfoMutation, useAddCourseBasicInfoMutation, useCourseCategoriesQuery, usePublishCourseMutation, useUpdateCourseAdvanceInfoMutation, useUpdateCourseBasicInfoMutation } from "@/redux/features/instructor/instructor.api";
import type { BasicCourseInfoPayload } from "@/redux/features/create-course/createCourse.type";
import { toast } from "sonner";

const courseFormSchema = basicInfoSchema.merge(advanceInfoSchema);
type CourseFormData = z.infer<typeof courseFormSchema>;

const tabMeta = [
    { id: 0, labelKey: "basicInformation", icon: Layers },
    { id: 1, labelKey: "advanceInformation", icon: FileText },
    { id: 2, labelKey: "curriculum", icon: Play },
    { id: 3, labelKey: "publishCourse", icon: Globe },
];

const CreateCoursePage = () => {
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const [activeTab, setActiveTab] = useState(0);
    const t = useTranslations("InstructorCreateCourse");
    const [courseId, setCourseId] = useState<number | null>(editId ? Number(editId) : null);
    const [advanceInfoId, setAdvanceInfoId] = useState<number | null>(null);
    const { data: categoriesResponse } = useCourseCategoriesQuery();
    const [addCourseBasicInfo] = useAddCourseBasicInfoMutation();
    const [updateCourseBasicInfo] = useUpdateCourseBasicInfoMutation();
    const [addCourseAdvanceInfo] = useAddCourseAdvanceInfoMutation();
    const [updateCourseAdvanceInfo] = useUpdateCourseAdvanceInfoMutation();
    const [publishCourse] = usePublishCourseMutation();



    const tabs = tabMeta.map(tab => ({ ...tab, label: t(tab.labelKey) }));
    const categories = categoriesResponse?.data || [];

    // React Hook Form
    const methods = useForm<CourseFormData>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: zodResolver(courseFormSchema),
        defaultValues: {
            title: "",
            subtitle: "",
            category: "",
            topic: "",
            language: "",
            level: "",
            price: "",
            couponCode: "",
            discountPrice: "",
            expiryPeriod: "",
            description: "",
            whatYouWillTeach: [],
            requirements: [],
        },
    });

    // File state (managed outside form)
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [trailer, setTrailer] = useState<File | null>(null);

    // Curriculum state
    const [sections, setSections] = useState<TCourseSection[]>([]);

    const getPersistedAdvanceInfoId = (id: number) => {
        if (typeof window === "undefined") return null;
        const storedValue = window.localStorage.getItem(`create-course-advance-info-${id}`);
        const parsedValue = storedValue ? Number(storedValue) : null;
        return parsedValue && Number.isFinite(parsedValue) ? parsedValue : null;
    };

    const getErrorStatus = (error: unknown): number | string | null => {
        if (!error || typeof error !== "object") return null;
        if ("status" in error) {
            const status = (error as { status?: number | string }).status;
            return status ?? null;
        }
        if ("originalStatus" in error) {
            const status = (error as { originalStatus?: number | string }).originalStatus;
            return status ?? null;
        }
        return null;
    };

    const saveBasicInfo = async () => {
        const values = methods.getValues();

        const payload: BasicCourseInfoPayload = {
            title: values.title,
            subtitle: values.subtitle || undefined,
            category: Number(values.category),
            topic: values.topic || undefined,
            language: values.language as BasicCourseInfoPayload["language"],
            level: values.level as BasicCourseInfoPayload["level"],
            price: values.price ? Number(values.price) : undefined,
            discount_price: values.discountPrice ? Number(values.discountPrice) : undefined,
            coupon_code: values.couponCode || undefined,
            expiry_type: (values.expiryPeriod as BasicCourseInfoPayload["expiry_type"]) || undefined,
        };

        try {
            const response = courseId
                ? await updateCourseBasicInfo({ courseId, data: payload }).unwrap()
                : await addCourseBasicInfo(payload).unwrap();

            setCourseId(response.data.id);
            setActiveTab(1);
            return true;
        } catch (error) {
            console.error("Failed to save basic info:", error);
            toast.error("Failed to save basic information");
            return false;
        }
    };

    const saveAdvanceInfo = async (): Promise<boolean> => {
        if (!courseId) {
            toast.error("Please save basic information first");
            setActiveTab(0);
            return false;
        }

        const storedAdvanceInfoId = getPersistedAdvanceInfoId(courseId);
        const effectiveAdvanceInfoId = advanceInfoId ?? storedAdvanceInfoId;

        const values = methods.getValues();
        const outcomes = values.whatYouWillTeach
            .map((item, index) => ({ text: item.value.trim(), order: index + 1 }))
            .filter((item) => item.text);

        const requirements = values.requirements
            .map((item, index) => ({ text: item.value.trim(), order: index + 1 }))
            .filter((item) => item.text);

        const formData = new FormData();
        formData.append("description", values.description || "");
        formData.append("outcomes", JSON.stringify(outcomes));
        formData.append("requirements", JSON.stringify(requirements));

        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }
        if (trailer) {
            formData.append("trailer_video", trailer);
        }

        try {
            let response;

            if (effectiveAdvanceInfoId) {
                try {
                    response = await updateCourseAdvanceInfo({ advanceInfoId: effectiveAdvanceInfoId, data: formData }).unwrap();
                } catch (patchError) {
                    const patchStatus = getErrorStatus(patchError);
                    if (patchStatus === 404) {
                        response = await addCourseAdvanceInfo({ courseId, data: formData }).unwrap();
                    } else {
                        throw patchError;
                    }
                }
            } else {
                response = await addCourseAdvanceInfo({ courseId, data: formData }).unwrap();
            }

            setAdvanceInfoId(response.data.id);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(`create-course-advance-info-${courseId}`, String(response.data.id));
            }
            setActiveTab(2);
            toast.success("Advanced information saved successfully");
            return true;
        } catch (error) {
            console.error("Failed to save advance info:", error);
            const status = getErrorStatus(error);
            if (status === 413 || status === "FETCH_ERROR") {
                toast.error("Upload failed. File is too large or server error response is blocked by CORS.");
            } else {
                toast.error("Failed to save advanced information");
            }
            return false;
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

        if (!courseId) {
            toast.error("Please save basic information first");
            setActiveTab(0);
            return false;
        }

        try {
            await publishCourse(courseId).unwrap();
            toast.success("Course submitted for review successfully");
            return true;
        } catch (error) {
            console.error("Error submitting course for review:", error);
            toast.error("Failed to submit course for review");
            return false;
        }
    };

    const handleCurriculumNext = async (): Promise<boolean> => {
        if (sections.length === 0) {
            toast.error("Please add at least one section");
            return false;
        }
        setActiveTab(3);
        return true;
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
                            onNext={saveBasicInfo}
                            onCancel={() => window.history.back()}
                            categories={categories}
                        />
                    )}

                    {activeTab === 1 && (
                        <AdvanceInfoTab
                            onNext={saveAdvanceInfo}
                            onPrev={goPrev}
                            onThumbnailChange={setThumbnail}
                            onTrailerChange={setTrailer}
                        />
                    )}

                    {activeTab === 2 && (
                        <CurriculumTab
                            sections={sections}
                            setSections={setSections}
                            onNext={handleCurriculumNext}
                            onPrev={goPrev}
                            courseId={courseId}
                        />
                    )}

                    {activeTab === 3 && (
                        <PublishCourseTab
                            onPrev={goPrev}
                            onSubmit={handlePublish}
                            courseId={courseId}
                        />
                    )}
                </div>
            </div>
        </FormProvider>
    );
};

export default CreateCoursePage;
