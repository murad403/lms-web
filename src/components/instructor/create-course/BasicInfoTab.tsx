"use client";

import { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Upload, X, Image as ImageIcon, Film } from "lucide-react";
import Image from "next/image";
import {
    TBasicInfoForm,
    courseCategoryOptions,
    courseLevelOptions,
    courseLanguageOptions,
} from "@/lib/instructor";

type Props = {
    register: UseFormRegister<TBasicInfoForm>;
    setValue: UseFormSetValue<TBasicInfoForm>;
};

const BasicInfoTab = ({ register, setValue }: Props) => {
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [trailerName, setTrailerName] = useState<string | null>(null);

    const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setValue("thumbnail", file);
        const reader = new FileReader();
        reader.onload = (ev) => setThumbnailPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleTrailer = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setValue("trailer", file);
        setTrailerName(file.name);
    };

    return (
        <div className="space-y-5">
            {/* Course Title */}
            <div>
                <label className="text-sm font-medium text-title mb-1.5 block">
                    Course Title
                </label>
                <input
                    {...register("title", { required: true })}
                    placeholder="e.g., Complete Web Development Bootcamp"
                    className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                />
            </div>

            {/* Category & Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Category
                    </label>
                    <select
                        {...register("category", { required: true })}
                        className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                    >
                        <option value="">Select category</option>
                        {courseCategoryOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Level
                    </label>
                    <select
                        {...register("level", { required: true })}
                        className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                    >
                        <option value="">Select level</option>
                        {courseLevelOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Language */}
            <div>
                <label className="text-sm font-medium text-title mb-1.5 block">
                    Language
                </label>
                <select
                    {...register("language", { required: true })}
                    className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                >
                    <option value="">Select language</option>
                    {courseLanguageOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Price & Discount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Price ($)
                    </label>
                    <input
                        {...register("price", { required: true })}
                        type="number"
                        placeholder="0.00"
                        className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Discount (%)
                    </label>
                    <input
                        {...register("discount")}
                        type="number"
                        placeholder="0"
                        min={0}
                        max={100}
                        className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                    />
                </div>
            </div>

            {/* Thumbnail & Trailer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Thumbnail */}
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Course Thumbnail
                    </label>
                    {thumbnailPreview ? (
                        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border-light group">
                            <Image
                                src={thumbnailPreview}
                                alt="Thumbnail"
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setThumbnailPreview(null);
                                    setValue("thumbnail", null);
                                }}
                                className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border-light rounded-lg cursor-pointer hover:border-main transition-colors">
                            <ImageIcon className="w-8 h-8 text-description mb-2" />
                            <span className="text-sm text-description">
                                Upload Image
                            </span>
                            <span className="text-xs text-description mt-1">
                                JPG, PNG (Max 2MB)
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnail}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>

                {/* Trailer */}
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Course Trailer
                    </label>
                    {trailerName ? (
                        <div className="flex items-center gap-3 w-full h-40 border border-border-light rounded-lg p-4">
                            <Film className="w-8 h-8 text-main shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-title truncate">
                                    {trailerName}
                                </p>
                                <p className="text-xs text-description mt-1">
                                    Video uploaded
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setTrailerName(null);
                                    setValue("trailer", null);
                                }}
                                className="p-1.5 hover:bg-red-50 rounded-md transition-colors"
                            >
                                <X className="w-4 h-4 text-red-500" />
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border-light rounded-lg cursor-pointer hover:border-main transition-colors">
                            <Upload className="w-8 h-8 text-description mb-2" />
                            <span className="text-sm text-description">
                                Upload Video
                            </span>
                            <span className="text-xs text-description mt-1">
                                MP4, WebM (Max 100MB)
                            </span>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleTrailer}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BasicInfoTab;
