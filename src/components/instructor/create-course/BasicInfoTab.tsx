/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const TITLE_MAX = 80;
const SUBTITLE_MAX = 120;

const basicInfoSchema = z.object({
    title: z.string().min(1, "Title is required").max(TITLE_MAX),
    subtitle: z.string().max(SUBTITLE_MAX).optional(),
    category: z.string().min(1, "Category is required"),
    subCategory: z.string().optional(),
    topic: z.string().optional(),
    language: z.string().min(1, "Language is required"),
    level: z.string().min(1, "Level is required"),
    price: z.string().optional(),
    couponCode: z.string().optional(),
    discountPrice: z.string().optional(),
    expiryPeriod: z.string().optional(),
});

export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

const categoryOptions = [
    { value: "development", label: "Development" },
    { value: "business", label: "Business" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "it-software", label: "IT & Software" },
    { value: "photography", label: "Photography" },
    { value: "music", label: "Music" },
];

const subCategoryOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "data-science", label: "Data Science" },
    { value: "game-development", label: "Game Development" },
    { value: "programming", label: "Programming Languages" },
];

const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "bangla", label: "Bangla" },
];

const levelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "all-levels", label: "All Levels" },
];

const expiryOptions = [
    { value: "limited", label: "Limited Time" },
    { value: "1-week", label: "1 Week" },
    { value: "1-month", label: "1 Month" },
    { value: "3-months", label: "3 Months" },
    { value: "unlimited", label: "Unlimited" },
];

type Props = {
    onNext: (data: BasicInfoFormData) => void;
    onCancel: () => void;
    defaultValues?: Partial<BasicInfoFormData>;
};

const BasicInfoTab = ({ onNext, onCancel, defaultValues }: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<BasicInfoFormData>({
        resolver: zodResolver(basicInfoSchema),
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
            ...defaultValues,
        },
    });

    const titleValue = watch("title") || "";
    const subtitleValue = watch("subtitle") || "";

    const generateCouponCode = () => {
        const code = "ABCUPON" + Math.random().toString(36).substring(2, 6).toUpperCase();
        setValue("couponCode", code);
    };

    return (
        <form onSubmit={handleSubmit(onNext)} className="space-y-6">
            <h3 className="text-xl font-bold text-title">Basic Information</h3>
            <div className="border-b border-border-light" />

            {/* Title */}
            <div>
                <label className="text-sm font-medium text-title mb-1.5 block">
                    Tittle
                </label>
                <div className="relative">
                    <input
                        {...register("title")}
                        maxLength={TITLE_MAX}
                        placeholder="You course tittle"
                        className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-description">
                        {titleValue.length}/{TITLE_MAX}
                    </span>
                </div>
                {errors.title && (
                    <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
                )}
            </div>

            {/* Subtitle */}
            <div>
                <label className="text-sm font-medium text-title mb-1.5 block">
                    Subtittle
                </label>
                <div className="relative">
                    <input
                        {...register("subtitle")}
                        maxLength={SUBTITLE_MAX}
                        placeholder="You course subtittle"
                        className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-description">
                        {subtitleValue.length}/{SUBTITLE_MAX}
                    </span>
                </div>
            </div>

            {/* Category & Sub-category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Course Category
                    </label>
                    <select
                        {...register("category")}
                        className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white text-description"
                    >
                        <option value="">Course Category</option>
                        {categoryOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
                    )}
                </div>
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Course Sub-category
                    </label>
                    <select
                        {...register("subCategory")}
                        className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white text-description"
                    >
                        <option value="">Course Sub-category</option>
                        {subCategoryOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Course Topic */}
            <div>
                <label className="text-sm font-medium text-title mb-1.5 block">
                    Course Topic
                </label>
                <input
                    {...register("topic")}
                    placeholder="What is primarily taught in your course?"
                    className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                />
            </div>

            {/* Language & Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Course Language
                    </label>
                    <select
                        {...register("language")}
                        className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white text-description"
                    >
                        <option value="">Select...</option>
                        {languageOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors.language && (
                        <p className="text-xs text-red-500 mt-1">{errors.language.message}</p>
                    )}
                </div>
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Course Level
                    </label>
                    <select
                        {...register("level")}
                        className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white text-description"
                    >
                        <option value="">Select...</option>
                        {levelOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors.level && (
                        <p className="text-xs text-red-500 mt-1">{errors.level.message}</p>
                    )}
                </div>
            </div>

            {/* Price, Coupon, Discount, Expiry */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Course Price
                    </label>
                    <input
                        {...register("price")}
                        placeholder="$00.00"
                        type="number"
                        className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Create Coupon Code
                    </label>
                    <div className="flex">
                        <input
                            {...register("couponCode")}
                            placeholder="ABCUPON"
                            className="flex-1 border border-border-light rounded-l-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                        />
                        <button
                            type="button"
                            onClick={generateCouponCode}
                            className="p-3 bg-main text-white text-sm font-medium rounded-r-md hover:bg-main/90 transition-colors whitespace-nowrap"
                        >
                            Generate Code
                        </button>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Discount Price ($)
                    </label>
                    <input
                        {...register("discountPrice")}
                        placeholder="$00.00"
                        type="number"
                        className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        Expiry Period
                    </label>
                    <select
                        {...register("expiryPeriod")}
                        className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white text-description"
                    >
                        {expiryOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-border-light">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-3 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-5 py-3 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                >
                    Save & Next
                </button>
            </div>
        </form>
    );
};

export default BasicInfoTab;
