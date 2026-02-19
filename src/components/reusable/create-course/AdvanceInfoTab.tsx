/* eslint-disable react-hooks/incompatible-library */
"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Upload, Image as ImageIcon, CirclePlay } from "lucide-react";
import Image from "next/image";

const MAX_ITEMS = 8;
const ITEM_MAX_LENGTH = 120;

const advanceInfoSchema = z.object({
    description: z.string().optional(),
    whatYouWillTeach: z.array(z.object({
        value: z.string().max(ITEM_MAX_LENGTH),
    })),
    requirements: z.array(z.object({
        value: z.string().max(ITEM_MAX_LENGTH),
    })),
});

export type AdvanceInfoFormData = z.infer<typeof advanceInfoSchema>;

type Props = {
    onNext: (data: AdvanceInfoFormData, thumbnail: File | null, trailer: File | null) => void;
    onPrev: () => void;
    defaultValues?: Partial<AdvanceInfoFormData>;
};

const AdvanceInfoTab = ({ onNext, onPrev, defaultValues }: Props) => {
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [trailerPreview, setTrailerPreview] = useState<string | null>(null);
    const [trailerFile, setTrailerFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        control,
        watch,
    } = useForm<AdvanceInfoFormData>({
        resolver: zodResolver(advanceInfoSchema),
        defaultValues: {
            description: "",
            whatYouWillTeach: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
            requirements: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
            ...defaultValues,
        },
    });

    const {
        fields: teachFields,
        append: appendTeach,
    } = useFieldArray({ control, name: "whatYouWillTeach" });

    const {
        fields: reqFields,
        append: appendReq,
    } = useFieldArray({ control, name: "requirements" });

    const watchTeach = watch("whatYouWillTeach");
    const watchReq = watch("requirements");

    const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setThumbnailFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setThumbnailPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleTrailer = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setTrailerFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setTrailerPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const onSubmit = (data: AdvanceInfoFormData) => {
        onNext(data, thumbnailFile, trailerFile);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-xl font-bold text-title">Advance Informations</h3>

            {/* Thumbnail & Trailer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Thumbnail */}
                <div>
                    <label className="text-sm font-medium text-title mb-3 block">
                        Course Thumbnail
                    </label>
                    <div className="flex gap-4">
                        <div className="w-32 h-28 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden shrink-0">
                            {thumbnailPreview ? (
                                <Image
                                    src={thumbnailPreview}
                                    alt="Thumbnail"
                                    width={112}
                                    height={112}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <ImageIcon className="size-20 text-gray-300" />
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-description mb-2">
                                Upload your course Thumbnail here. <span className="text-title font-medium">Important guidelines:</span> 1200×800 pixels or 12:8 Ratio. Supported format: <span className="text-title">.jpg, .jpeg,</span> or <span className="text-title">.png</span>
                            </p>
                            <label className="inline-flex items-center gap-2 px-4 py-3 bg-[#EDF5FD] text-main rounded-md text-sm font-medium hover:bg-main/5 transition-colors cursor-pointer">
                                <span>Upload Image</span>
                                <Upload className="w-4 h-4" />
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg"
                                    onChange={handleThumbnail}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Course Trailer */}
                <div>
                    <label className="text-sm font-medium text-title mb-3 block">
                        Course Trailer
                    </label>
                    <div className="flex gap-4">
                        <div className="w-32 h-28 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden shrink-0">
                            {trailerPreview ? (
                                <video
                                    src={trailerPreview}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-main/10 flex items-center justify-center">
                                    <CirclePlay className="size-12 text-[#B7BAC7]" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-description mb-2">
                                Students who watch a well-made promo video are 5X more likely to enroll in your course.
                            </p>
                            <label className="inline-flex items-center gap-2 px-4 py-3 bg-[#EDF5FD] rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors cursor-pointer">
                                <span>Upload Video</span>
                                <Upload className="w-4 h-4" />
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleTrailer}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Description */}
            <div>
                <label className="text-sm font-medium text-title mb-1.5 block">
                    Course Descriptions
                </label>
                <div className="border border-border-light rounded-md overflow-hidden">
                    <textarea
                        {...register("description")}
                        rows={6}
                        placeholder="Enter you course descriptions"
                        className="w-full px-3 py-3.5 text-sm focus:outline-none resize-none"
                    />
                    
                </div>
            </div>

            {/* What you will teach */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-base font-medium text-title">
                        What you will teach in this course ({teachFields.length}/{MAX_ITEMS})
                    </label>
                    {teachFields.length < MAX_ITEMS && (
                        <button
                            type="button"
                            onClick={() => appendTeach({ value: "" })}
                            className="flex items-center gap-1 text-sm text-main font-medium hover:text-main/80"
                        >
                            <Plus className="w-4 h-4" />
                            Add new
                        </button>
                    )}
                </div>

                <div className="space-y-3">
                    {teachFields.map((field, index) => (
                        <div key={field.id}>
                            <span className="text-xs text-description mb-1 block">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="relative">
                                <input
                                    {...register(`whatYouWillTeach.${index}.value`)}
                                    maxLength={ITEM_MAX_LENGTH}
                                    placeholder="What you will teach in this course..."
                                    className="w-full border border-border-light rounded-md px-3 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-16"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-description">
                                    {watchTeach?.[index]?.value?.length || 0}/{ITEM_MAX_LENGTH}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Course requirements */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-base font-medium text-title">
                        Course requirements ({reqFields.length}/{MAX_ITEMS})
                    </label>
                    {reqFields.length < MAX_ITEMS && (
                        <button
                            type="button"
                            onClick={() => appendReq({ value: "" })}
                            className="flex items-center gap-1 text-sm text-main font-medium hover:text-main/80"
                        >
                            <Plus className="w-4 h-4" />
                            Add new
                        </button>
                    )}
                </div>

                <div className="space-y-3">
                    {reqFields.map((field, index) => (
                        <div key={field.id}>
                            <span className="text-xs text-description mb-1 block">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="relative">
                                <input
                                    {...register(`requirements.${index}.value`)}
                                    maxLength={ITEM_MAX_LENGTH}
                                    placeholder="What is you course requirements..."
                                    className="w-full border border-border-light rounded-md px-3 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-16"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-description">
                                    {watchReq?.[index]?.value?.length || 0}/{ITEM_MAX_LENGTH}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-border-light">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-5 py-3.5 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="px-5 py-3.5 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                >
                    Save & Next
                </button>
            </div>
        </form>
    );
};

export default AdvanceInfoTab;
