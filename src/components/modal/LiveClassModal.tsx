/* eslint-disable react-hooks/incompatible-library */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Video, User, Tag, Calendar as CalendarIcon, Clock, Link as LinkIcon, ChevronDown } from "lucide-react";
import { liveClassSchema, LiveClassFormData } from "@/validation/liveClass.validation";

type LiveClassModalProps = {
    isOpen: boolean;
    onClose: () => void;
    isShowDate: boolean;
};

const LiveClassModal = ({ isOpen, onClose, isShowDate }: LiveClassModalProps) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LiveClassFormData>({
        resolver: zodResolver(liveClassSchema),
        defaultValues: {
            title: "",
            instructor: "",
            category: "",
            subCategory: "",
            topic: "",
            date: "",
            time: "",
            platform: "",
            link: "",
        },
    });

    const title = watch("title");
    const instructor = watch("instructor");
    const platform = watch("platform");

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = (data: LiveClassFormData) => {
        console.log(data);
        reset();
        onClose();
    };

    const handlePlatform = (platformValue: string) => {
        setValue("platform", platformValue);
        if (platformValue === "google-meet") {
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
                            Live Class
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6 pt-4">
                    {/* Live Class Title */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">
                            Live Class Title
                        </label>
                        <div className="relative">
                            <Video className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Your course title"
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

                    {/* Instructor */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">
                            Instructor
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Instructor name"
                                {...register("instructor")}
                                maxLength={120}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            {errors.instructor && (
                                <p className="text-red-500 text-xs">{errors.instructor.message}</p>
                            )}
                            <p className="text-xs text-description ml-auto">{instructor?.length || 0}/120</p>
                        </div>
                    </div>

                    {/* Category and Sub-category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-header mb-2">
                                Course Category
                            </label>
                            <div className="relative">
                                <select
                                    {...register("category")}
                                    className="w-full appearance-none px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition bg-white"
                                >
                                    <option value="">Course Category</option>
                                    <option value="programming">Programming</option>
                                    <option value="design">Design</option>
                                    <option value="business">Business</option>
                                    <option value="marketing">Marketing</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                            </div>
                            {errors.category && (
                                <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-header mb-2">
                                Course Sub-category
                            </label>
                            <div className="relative">
                                <select
                                    {...register("subCategory")}
                                    className="w-full appearance-none px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition bg-white"
                                >
                                    <option value="">Course Sub-category</option>
                                    <option value="web-dev">Web Development</option>
                                    <option value="mobile-dev">Mobile Development</option>
                                    <option value="ui-ux">UI/UX Design</option>
                                    <option value="graphic-design">Graphic Design</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                            </div>
                            {errors.subCategory && (
                                <p className="text-red-500 text-xs mt-1">{errors.subCategory.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Live Class Topic */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">
                            Live Class Topic
                        </label>
                        <div className="relative">
                            <Tag className="absolute left-4 top-4 size-5 text-gray-400" />
                            <textarea
                                placeholder="What is primarily taught in this live class?"
                                {...register("topic")}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400 min-h-20 resize-none"
                            />
                        </div>
                        {errors.topic && (
                            <p className="text-red-500 text-xs mt-1">{errors.topic.message}</p>
                        )}
                    </div>

                    {/* Date and Time */}
                    {
                        isShowDate &&
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-header mb-2">
                                    Select a date
                                </label>
                                <div className="relative">
                                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                    <input
                                        type="date"
                                        {...register("date")}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition"
                                    />
                                </div>
                                {errors.date && (
                                    <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-header mb-2">
                                    Select Time
                                </label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                    <input
                                        type="time"
                                        {...register("time")}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition"
                                    />
                                </div>
                                {errors.time && (
                                    <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
                                )}
                            </div>
                        </div>
                    }

                    {/* Choose Live Class platform */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-3">
                            Choose Live Class platform
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
                                    onClick={() => handlePlatform("google-meet")}
                                    className={`px-5 py-2.5 text-sm font-semibold ${platform === "google-meet"
                                        ? "bg-main text-white hover:bg-main/90"
                                        : "bg-gray-100 text-title hover:bg-gray-200"
                                        }`}
                                >
                                    Host
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
                                    Host
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
                            Live Class Link
                        </label>
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Live Class Link"
                                {...register("link")}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                            />
                        </div>
                        {errors.link && (
                            <p className="text-red-500 text-xs mt-1">{errors.link.message}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-3 border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-main text-white text-sm font-semibold hover:bg-main/90 transition disabled:opacity-50"
                        >
                            {isSubmitting ? "Saving..." : "Save & Confirm"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LiveClassModal;
