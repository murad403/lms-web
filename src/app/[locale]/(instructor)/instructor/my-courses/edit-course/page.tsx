"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Layers, FileText, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "@/i18n/navigation";
import BasicInfoTab from "../../../../../../components/reusable/edit-course/EditBasicInfoTab";
import AdvanceInfoTab from "../../../../../../components/reusable/edit-course/EditAdvanceInfoTab";
import CurriculumTab from "../../../../../../components/reusable/edit-course/EditCurriCulumTab";
import { TCourseLecture, TCourseSection } from "@/lib/instructor";
import { useCourseDetailsQuery } from "@/redux/features/landing/landing.api";
import type { LandingCourseLecture, LandingCourseSection } from "@/redux/features/landing/landing.type";
import { useCourseCategoriesQuery, useGetCourseAdvanceInfoQuery, useGetCourseBasicInfoQuery, useUpdateCourseAdvanceInfoMutation, useUpdateCourseBasicInfoMutation } from "@/redux/features/create-course/createCourse.api";
import type { BasicCourseInfoPayload } from "@/redux/features/create-course/createCourse.type";
import { basicInfoSchema } from "../../../../../../components/reusable/edit-course/EditBasicInfoTab";
import { advanceInfoSchema } from "../../../../../../components/reusable/edit-course/EditAdvanceInfoTab";



const courseFormSchema = basicInfoSchema.merge(advanceInfoSchema);
type CourseFormData = z.infer<typeof courseFormSchema>;

const tabMeta = [
    { id: 0, labelKey: "basicInformation", icon: Layers },
    { id: 1, labelKey: "advanceInformation", icon: FileText },
    { id: 2, labelKey: "curriculum", icon: Play },
];

const mapSections = (sections: LandingCourseSection[] = []): TCourseSection[] => {
    return sections
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((section: LandingCourseSection) => ({
            id: section.id,
            title: section.name,
            order: section.order,
            lectures: section.lectures
                .slice()
                .sort((a: LandingCourseLecture, b: LandingCourseLecture) => a.order - b.order)
                .map((lecture: LandingCourseLecture): TCourseLecture => ({
                    id: lecture.id,
                    title: lecture.name,
                    type: lecture.video_file ? "video" : "document",
                    description: lecture.description || "",
                    lectureNotes: "",
                    videoFileUrl: lecture.video_file || undefined,
                    lectureAttachmentUrl: lecture.LectureAttachment || undefined,
                    lectureNoteFileUrl: lecture.LectureNoteFile || undefined,
                })),
        }));
};

type CourseTextItem = {
    text: string;
    order: number;
};

const EditCourseSkeleton = () => (
    <div className="space-y-6">
        <div className="bg-white rounded-lg border border-border-light p-4">
            <div className="flex items-center gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center flex-1">
                        <div className="flex items-center gap-2 flex-1">
                            <Skeleton className="w-5 h-5 rounded-full" />
                            <Skeleton className="h-4 w-20 hidden sm:block" />
                        </div>
                        {index < 3 && <Skeleton className="flex-1 h-px mx-2 sm:mx-4" />}
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-white rounded-lg border border-border-light p-4 sm:p-6 space-y-6">
            <div className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-px w-full" />
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-11 w-3/4" />
            </div>
            <div className="space-y-3">
                <Skeleton className="h-6 w-56" />
                <Skeleton className="h-40 w-full" />
            </div>
        </div>
    </div>
);

type EditCourseFormProps = {
    courseId: number;
    categories: Awaited<ReturnType<typeof useCourseCategoriesQuery>>["data"]["data"];
    courseDetails: NonNullable<Awaited<ReturnType<typeof useCourseDetailsQuery>>["data"]>["data"];
    basicInfo: NonNullable<Awaited<ReturnType<typeof useGetCourseBasicInfoQuery>>["data"]>["data"];
    advanceInfo?: NonNullable<Awaited<ReturnType<typeof useGetCourseAdvanceInfoQuery>>["data"]>["data"];
};

const EditCourseForm = ({ courseId, categories, courseDetails, basicInfo, advanceInfo }: EditCourseFormProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const [courseSections, setCourseSections] = useState<TCourseSection[]>(() => mapSections(courseDetails.sections || []));
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [trailer, setTrailer] = useState<File | null>(null);
    const router = useRouter();

    const t = useTranslations("InstructorCreateCourse");

    const [updateCourseBasicInfo] = useUpdateCourseBasicInfoMutation();
    const [updateCourseAdvanceInfo] = useUpdateCourseAdvanceInfoMutation();
    const tabs = useMemo(
        () => tabMeta.map((tab) => ({ ...tab, label: t(tab.labelKey) })),
        [t]
    );

    const methods = useForm<CourseFormData>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: zodResolver(courseFormSchema),
        defaultValues: {
            title: basicInfo.title ?? courseDetails.title ?? "",
            subtitle: basicInfo.subtitle ?? courseDetails.subtitle ?? "",
            category: String(basicInfo.category ?? ""),
            topic: basicInfo.topic ?? courseDetails.topic ?? "",
            language: basicInfo.language ?? courseDetails.language ?? "",
            level: basicInfo.level ?? courseDetails.level ?? "",
            price: String(basicInfo.price ?? courseDetails.price ?? ""),
            couponCode: basicInfo.coupon_code ?? courseDetails.coupon_code ?? "",
            discountPrice: String(basicInfo.discount_price ?? courseDetails.discount_price ?? ""),
            expiryPeriod: basicInfo.expiry_type ?? courseDetails.expiry_type ?? "",
            description: advanceInfo?.description ?? courseDetails.description ?? "",
            whatYouWillTeach: (advanceInfo?.outcomes ?? courseDetails.outcomes ?? [])
                .slice()
                .sort((a: CourseTextItem, b: CourseTextItem) => a.order - b.order)
                .map((item: CourseTextItem) => ({ value: item.text })),
            requirements: (advanceInfo?.requirements ?? courseDetails.requirements ?? [])
                .slice()
                .sort((a: CourseTextItem, b: CourseTextItem) => a.order - b.order)
                .map((item: CourseTextItem) => ({ value: item.text })),
        },
    });

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
            await updateCourseBasicInfo({ courseId, data: payload }).unwrap();
            setActiveTab(1);
            toast.success("Basic information updated successfully");
            return true;
        } catch (error) {
            console.error("Failed to update basic info:", error);
            toast.error("Failed to update basic information");
            return false;
        }
    };

    const saveAdvanceInfo = async (): Promise<boolean> => {
        const values = methods.getValues();
        const outcomes = values.whatYouWillTeach
            .map((item: { value: string }, index: number) => ({ text: item.value.trim(), order: index + 1 }))
            .filter((item: { text: string }) => item.text);

        const requirements = values.requirements
            .map((item: { value: string }, index: number) => ({ text: item.value.trim(), order: index + 1 }))
            .filter((item: { text: string }) => item.text);

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
            if (!advanceInfo?.id) {
                toast.error("Advance information record is missing");
                return false;
            }

            await updateCourseAdvanceInfo({ advanceInfoId: advanceInfo.id, data: formData }).unwrap();

            setActiveTab(2);
            toast.success("Advanced information updated successfully");
            return true;
        } catch (error) {
            console.error("Failed to update advance info:", error);
            toast.error("Failed to update advanced information");
            return false;
        }
    };

    const goPrev = () => {
        if (activeTab > 0) {
            setActiveTab(activeTab - 1);
        }
    };

    const handlePublish = async (): Promise<boolean> => {
        if (courseSections.length === 0) {
            setActiveTab(2);
            toast.error("Please add at least one section");
            return false;
        }

        try {
            router.push("/instructor/my-courses");
            toast.success("Course updated successfully");
            return true;
        } catch (error) {
            console.error("Error returning to my courses:", error);
            toast.error("Failed to finish update");
            return false;
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="space-y-6">
                <div className="bg-white rounded-lg border border-border-light p-4">
                    <div className="flex items-center justify-between">
                        {tabs.map((tab, index) => {
                            const Icon = tab.icon;
                            const isCompleted = index < activeTab;
                            const isActive = index === activeTab;

                            return (
                                <div key={tab.id} className="flex items-center flex-1">
                                    <button
                                        onClick={() => index <= activeTab && setActiveTab(index)}
                                        className={`flex items-center gap-2 ${index <= activeTab ? "cursor-pointer" : "cursor-default"}`}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? "text-main" : isCompleted ? "text-green-500" : "text-description"}`} />
                                        <span className={`text-sm font-medium hidden sm:block ${isActive ? "text-main" : isCompleted ? "text-title" : "text-description"}`}>
                                            {tab.label}
                                        </span>
                                        {isCompleted && (
                                            <div className="flex items-center text-green-500">
                                                <Check className="w-4 h-4" />
                                                <Check className="w-4 h-4 -ml-2" />
                                            </div>
                                        )}
                                    </button>
                                    {index < tabs.length - 1 && (
                                        <div className={`flex-1 h-px mx-2 sm:mx-4 ${isCompleted ? "bg-green-500" : "bg-gray-200"}`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

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
                            initialThumbnailPreview={(advanceInfo?.thumbnail || courseDetails.advance_info?.thumbnail) ?? null}
                            initialTrailerPreview={(advanceInfo?.trailer_video || courseDetails.advance_info?.trailer_video) ?? null}
                        />
                    )}

                    {activeTab === 2 && (
                        <CurriculumTab
                            sections={courseSections}
                            setSections={setCourseSections}
                            onNext={handlePublish}
                            onPrev={goPrev}
                            courseId={courseId}
                        />
                    )}


                </div>
            </div>
        </FormProvider>
    );
};

const EditCoursePage = () => {
    const searchParams = useSearchParams();
    const courseIdParam = searchParams.get("courseId");
    const courseId = courseIdParam ? Number(courseIdParam) : Number.NaN;
    const isValidCourseId = Number.isFinite(courseId) && courseId > 0;

    const { data: categoriesResponse } = useCourseCategoriesQuery();
    const { data: courseDetailsResponse, isLoading: isCourseDetailsLoading } = useCourseDetailsQuery(courseId, {
        skip: !isValidCourseId,
    });

    const advanceInfoId = courseDetailsResponse?.data?.advance_info?.id;

    const { data: basicInfoResponse, isLoading: isBasicInfoLoading } = useGetCourseBasicInfoQuery(courseId, {
        skip: !isValidCourseId,
    });

    const { data: advanceInfoResponse, isLoading: isAdvanceInfoLoading } = useGetCourseAdvanceInfoQuery(advanceInfoId ?? 0, {
        skip: !advanceInfoId,
    });

    const categories = categoriesResponse?.data || [];
    const courseDetails = courseDetailsResponse?.data;
    const basicInfo = basicInfoResponse?.data;
    const advanceInfo = advanceInfoResponse?.data;

    if (!isValidCourseId) {
        return (
            <div className="rounded-xl border border-dashed border-border-light bg-white p-6 text-sm text-description">
                Missing course id. Open the edit action from a course card.
            </div>
        );
    }

    if (isCourseDetailsLoading || isBasicInfoLoading || (advanceInfoId ? isAdvanceInfoLoading : false) || !courseDetails || !basicInfo) {
        return <EditCourseSkeleton />;
    }

    return (
        <EditCourseForm
            courseId={courseId}
            categories={categories}
            courseDetails={courseDetails}
            basicInfo={basicInfo}
            advanceInfo={advanceInfo}
        />
    );
};

export default EditCoursePage;
