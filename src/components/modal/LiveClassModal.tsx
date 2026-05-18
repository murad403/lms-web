/* eslint-disable react-hooks/incompatible-library */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Video, Tag, Calendar as CalendarIcon, Clock, Link as LinkIcon, ChevronDown } from "lucide-react";
import { liveClassSchema, LiveClassFormData } from "@/validation/liveClass.validation";
import { useTranslations } from "next-intl";
import { useCourseInfoQuery, useCreateLiveClassMutation } from "@/redux/features/instructor/instructor.api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type LiveClassModalProps = {
    isOpen: boolean;
    onClose: () => void;
    isShowDate: boolean;
};

const LiveClassModal = ({ isOpen, onClose, isShowDate }: LiveClassModalProps) => {
    const t = useTranslations("InstructorLiveClassModal");
    const { data: courseInfoResponse, isLoading: isCourseInfoLoading } = useCourseInfoQuery();
    const [createLiveClass, { isLoading: isCreateLiveClassLoading }] = useCreateLiveClassMutation();

    const { register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm<LiveClassFormData>({
        resolver: zodResolver(liveClassSchema),
        defaultValues: {
            course_id: 0,
            title: "",
            topic: "",
            scheduled_date: "",
            scheduled_time: "",
            duration_minutes: 60,
            platform: "",
            class_link: "",
        },
    });

    void isShowDate;

    const title = watch("title");
    const platform = watch("platform");

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (data: LiveClassFormData) => {
        try {
            const payload = {
                title: data.title,
                topic: data.topic,
                scheduled_date: data.scheduled_date,
                scheduled_time: data.scheduled_time.length === 5 ? `${data.scheduled_time}:00` : data.scheduled_time,
                duration_minutes: Number(data.duration_minutes),
                platform: data.platform,
                class_link: data.class_link,
                is_recorded: true,
            };

            const response = await createLiveClass({
                courseId: Number(data.course_id),
                data: payload,
            }).unwrap();

            toast.success(response.message || "Live class scheduled successfully.");
            reset();
            onClose();
        } catch (error) {
            const message =
                typeof error === "object" &&
                error !== null &&
                "data" in error &&
                typeof (error as { data?: { message?: string } }).data?.message === "string"
                    ? (error as { data?: { message?: string } }).data?.message
                    : "Failed to schedule live class.";

            toast.error(message);
        }
    };

    const handlePlatform = (platformValue: string) => {
        setValue("platform", platformValue);
        if (platformValue === "google_meet") {
            window.open("https://meet.google.com/new", "_blank");
        } else if (platformValue === "zoom") {
            window.open("https://zoom.us/start/videomeeting", "_blank");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="pb-4 border-b border-border-light">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
                            <Video className="w-4 h-4 text-blue-600" />
                        </div>
                        <DialogTitle className="text-lg font-bold text-title">
                            {t("liveClass")}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6 pt-4">
                    {/* Live Class Title */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">
                            {t("liveClassTitle")}
                        </label>
                        <div className="relative">
                            <Video className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t("courseTitlePlaceholder")}
                                {...register("title")}
                                maxLength={80}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            {errors.title && (
                                <p className="text-red-500 text-xs">{errors.title.message}</p>
                            )}
                            <p className="text-xs text-description ml-auto">{title?.length || 0}/80</p>
                        </div>
                    </div>

                    {/* Course */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">
                            {t("courseName")}
                        </label>
                        {isCourseInfoLoading ? (
                            <Skeleton className="h-12 w-full" />
                        ) : (
                            <div className="relative">
                                <select
                                    {...register("course_id", { valueAsNumber: true })}
                                    className="w-full appearance-none px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition bg-white"
                                >
                                    <option value={0}>Select course</option>
                                    {courseInfoResponse?.data?.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                            </div>
                        )}
                        {errors.course_id && (
                            <p className="text-red-500 text-xs mt-1">{errors.course_id.message}</p>
                        )}
                    </div>

                    {/* Live Class Topic */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">
                            {t("liveClassTopic")}
                        </label>
                        <div className="relative">
                            <Tag className="absolute left-4 top-4 size-5 text-gray-400" />
                            <textarea
                                placeholder={t("topicPlaceholder")}
                                {...register("topic")}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400 min-h-20 resize-none"
                            />
                        </div>
                        {errors.topic && (
                            <p className="text-red-500 text-xs mt-1">{errors.topic.message}</p>
                        )}
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-header mb-2">
                                {t("selectDate")}
                            </label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type="date"
                                    {...register("scheduled_date")}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition"
                                />
                            </div>
                            {errors.scheduled_date && (
                                <p className="text-red-500 text-xs mt-1">{errors.scheduled_date.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-header mb-2">
                                {t("selectTime")}
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type="time"
                                    {...register("scheduled_time")}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition"
                                />
                            </div>
                            {errors.scheduled_time && (
                                <p className="text-red-500 text-xs mt-1">{errors.scheduled_time.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">
                            Duration (minutes)
                        </label>
                        <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="number"
                                min={1}
                                {...register("duration_minutes", { valueAsNumber: true })}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition"
                            />
                        </div>
                        {errors.duration_minutes && (
                            <p className="text-red-500 text-xs mt-1">{errors.duration_minutes.message}</p>
                        )}
                    </div>

                    {/* Choose Live Class platform */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-3">
                            {t("choosePlatform")}
                        </label>
                        <div className="flex gap-4">
                            <div className="flex items-center flex-1">
                                <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 flex-1">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span className="text-sm font-medium">Google Meet</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handlePlatform("google_meet")}
                                    className={`px-5 py-2.5 text-sm font-semibold ${platform === "google_meet"
                                        ? "bg-main text-white hover:bg-main/90"
                                        : "bg-gray-100 text-title hover:bg-gray-200"
                                        }`}
                                >
                                    {t("host")}
                                </button>
                            </div>
                            <div className="flex items-center flex-1">
                                <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 flex-1">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#2D8CFF" d="M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5v-9zm9 .75v7.5l6-3.75-6-3.75z" />
                                    </svg>
                                    <span className="text-sm font-medium">Zoom</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handlePlatform("zoom")}
                                    className={`px-5 py-2.5 text-sm font-semibold ${platform === "zoom"
                                        ? "bg-main text-white hover:bg-main/90"
                                        : "bg-gray-100 text-title hover:bg-gray-200"
                                        }`}
                                >
                                    {t("host")}
                                </button>
                            </div>
                        </div>
                        {errors.platform && (
                            <p className="text-red-500 text-xs mt-2">{errors.platform.message}</p>
                        )}
                    </div>

                    {/* Live Class Link */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">
                            {t("liveClassLink")}
                        </label>
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t("meetingLinkPlaceholder")}
                                {...register("class_link")}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                            />
                        </div>
                        {errors.class_link && (
                            <p className="text-red-500 text-xs mt-1">{errors.class_link.message}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-3 border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition"
                        >
                            {t("cancelBtn")}
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || isCreateLiveClassLoading}
                            className="px-6 py-3 bg-main text-white text-sm font-semibold hover:bg-main/90 transition disabled:opacity-50 cursor-pointer"
                        >
                            {isSubmitting || isCreateLiveClassLoading ? t("saving") : t("createLiveClass")}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LiveClassModal;
