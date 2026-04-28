"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Check, Loader2, BadgeCheck, BookOpen, Globe, Layers3, FileText, Tag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCourseOverviewQuery } from "@/redux/features/instructor/instructor.api";
import { resolveImageUrl } from "@/utils/image";


type Props = {
    onPrev: () => void;
    onSubmit: () => Promise<boolean>;
    courseId: number | null;
};

const PublishCourseTab = ({ onPrev, onSubmit, courseId }: Props) => {
    const t = useTranslations("InstructorCreateCourse");
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: overviewResponse, isLoading } = useCourseOverviewQuery(courseId as number, {
        skip: !courseId,
    });
    const overview = overviewResponse?.data;

    const handleSubmitForReview = async () => {
        setIsSubmitting(true);
        try {
            const success = await onSubmit();
            if (success) {
                setShowSuccess(true);
            }
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header with Save buttons */}

            <h3 className="text-xl font-bold text-title">{t("publishCourse")}</h3>

            <div className="border-b border-border-light" />
            {isLoading ? (
                <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
                    <div className="space-y-4 rounded-xl border border-border-light bg-white p-4 sm:p-5">
                        <Skeleton className="h-6 w-52" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-40 w-full" />
                        <div className="grid grid-cols-2 gap-3">
                            <Skeleton className="h-20" />
                            <Skeleton className="h-20" />
                            <Skeleton className="h-20" />
                            <Skeleton className="h-20" />
                        </div>
                    </div>
                    <div className="space-y-4 rounded-xl border border-border-light bg-white p-4 sm:p-5">
                        <Skeleton className="h-52 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            ) : overview ? (
                <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
                    <div className="space-y-4 rounded-xl border border-border-light bg-white p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-description">{t("publishCourse")}</p>
                                <h4 className="mt-1 text-2xl font-bold text-title">{overview.title}</h4>
                            </div>
                            <Badge variant="secondary" className="gap-1 px-3 py-1 text-xs">
                                <BadgeCheck className="size-3.5" />
                                {overview.level}
                            </Badge>
                        </div>

                        <p className="text-sm leading-6 text-description">{overview.description}</p>

                        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                            <div className="overflow-hidden rounded-xl border border-border-light bg-[#F8FAFF]">
                                {overview.thumbnail ? (
                                    <Image
                                        src={resolveImageUrl(overview.thumbnail)}
                                        alt={overview.title}
                                        width={1200}
                                        height={700}
                                        className="h-56 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-56 items-center justify-center text-sm text-description">
                                        No thumbnail available
                                    </div>
                                )}
                                <div className="border-t border-border-light p-4">
                                    <div className="flex items-center gap-2 text-sm text-description">
                                        <Tag className="size-4 text-main" />
                                        {overview.category_name}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 rounded-xl border border-border-light p-4">
                                <div className="flex items-center gap-2 text-sm text-title">
                                    <Globe className="size-4 text-main" />
                                    Language: <span className="font-semibold text-main">{overview.language}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-title">
                                    <Layers3 className="size-4 text-main" />
                                    Level: <span className="font-semibold text-main">{overview.level}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-title">
                                    <BookOpen className="size-4 text-main" />
                                    Category: <span className="font-semibold text-main">{overview.category_name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-title">
                                    <FileText className="size-4 text-main" />
                                    Course ID: <span className="font-semibold text-main">{overview.id}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="rounded-lg bg-[#F8FAFF] p-3">
                                        <p className="text-xs text-description">Price</p>
                                        <p className="text-lg font-bold text-title">${overview.price}</p>
                                    </div>
                                    <div className="rounded-lg bg-[#F8FAFF] p-3">
                                        <p className="text-xs text-description">Discount</p>
                                        <p className="text-lg font-bold text-title">${overview.discount_price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 rounded-xl border border-border-light bg-white p-4 sm:p-5">
                        <div>
                            <p className="text-sm font-semibold text-title">Trailer Video</p>
                            <p className="mt-1 text-sm text-description">Preview the uploaded trailer before submitting.</p>
                        </div>

                        {overview.thumbnail_video ? (
                            <video
                                controls
                                className="aspect-video w-full rounded-xl border border-border-light bg-black"
                                src={resolveImageUrl(overview.thumbnail_video)}
                            />
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-border-light bg-[#F8FAFF] text-sm text-description">
                                No trailer video uploaded
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-border-light bg-white p-6 text-sm text-description">
                    Save the basic information first to load the course overview here.
                </div>
            )}



            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-border-light">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-5 py-3 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                >
                    {t("prevStep")}
                </button>
                <button
                    type="button"
                    onClick={handleSubmitForReview}
                    disabled={isSubmitting}
                    className="px-5 py-3 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSubmitting ? t("submitting") : t("submitForReview")}
                </button>
            </div>

            {/* Success Modal */}
            <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent className="sm:max-w-md text-center">
                    <div className="flex flex-col items-center py-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-title text-center">
                                {t("coursePublished")}
                            </DialogTitle>
                        </DialogHeader>
                        <p className="text-sm text-description mt-2">
                            {t("coursePublishedDesc")}
                        </p>
                        <div className="flex items-center gap-3 mt-6">
                            <Link href={"/instructor/profile"}
                                onClick={() => setShowSuccess(false)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                {t("goBackToProfile")}
                            </Link>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                <Link href={"/instructor/dashboard"}>
                                    {t("continue")}
                                </Link>
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PublishCourseTab;
