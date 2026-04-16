'use client';
import React, { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { Star, Lock, Clock, FileText, Award, Globe, Smartphone, ChevronDown, ChevronRight, FolderOpen } from 'lucide-react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdSlowMotionVideo } from 'react-icons/md';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useCourseDetailsQuery } from '@/redux/features/landing/landing.api';
import { resolveImageUrl } from '@/utils/image';

const CourseDetails = () => {
    const params = useParams<{ id: string }>();
    const courseId = Number(params?.id);
    const { data } = useCourseDetailsQuery(courseId, { skip: !courseId || Number.isNaN(courseId) });
    const router = useRouter();


    const t = useTranslations("CourseDetail");
    const [expandedSections, setExpandedSections] = useState<number[]>([1]);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const apiCourse = data?.data;

    const courseImage = resolveImageUrl(apiCourse?.advance_info?.thumbnail);
    const courseTrailerVideo = resolveImageUrl(apiCourse?.advance_info?.trailer_video) as string;
    const learningPoints = (apiCourse?.outcomes || [])
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((item) => item.text);
    const courseContent = (apiCourse?.sections || [])
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((section) => ({
            id: section.id,
            title: section.name,
            lectures: section.lectures.length,
            duration: `${section.lectures.length} items`,
            items: section.lectures
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((lecture) => ({
                    id: lecture.id,
                    title: lecture.name,
                    duration: lecture.video_file ? 'Video' : '-',
                    type: lecture.video_file ? 'video' : 'file',
                })),
        }));
    const includes = [
        { icon: Clock, text: `${apiCourse?.duration || '0 days'} on demand video` },
        { icon: FileText, text: `${apiCourse?.lectures || 0} Lectures` },
        { icon: Award, text: 'Certificate on form completion' },
        { icon: Smartphone, text: 'Access on mobile and tv' },
    ];
    const requirements = (apiCourse?.requirements || [])
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((item) => item.text);

    const toggleSection = (sectionId: number) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-0 mt-4 sm:mt-6 lg:mt-8">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Main Content */}
                <div className="flex-1">
                    {/* Hero Video */}
                    <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-150 bg-gray-200 rounded-md overflow-hidden mb-4 sm:mb-6">
                        <video
                            className="w-full h-full object-cover"
                            controls
                            poster={courseImage}
                            preload="metadata"
                        >
                            <source src={courseTrailerVideo} type="video/mp4" />
                            {t("browserNotSupported")}
                        </video>
                    </div>

                    {/* Course Title & Tags */}
                    <div className='flex flex-col md:flex-row justify-between gap-3 sm:gap-5'>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-2 sm:mb-3">
                            {apiCourse?.title || ''}
                        </h1>
                        <div className='flex items-center shrink-0'>
                            <h2 className='bg-[#E7E9EB] text-title py-2 sm:py-2.5 px-3 sm:px-5 font-semibold text-base sm:text-xl'>${Number.parseFloat(apiCourse?.price || '0') || 0}</h2>
                            <button onClick={() => router.push("/checkout")} className='bg-main text-white py-2 sm:py-2.5 px-3 sm:px-5 hover:bg-main/90 cursor-pointer font-semibold text-base sm:text-xl'>Buy Now</button>
                        </div>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1">
                            <span className="text-sm sm:text-base text-yellow-500 font-semibold">{Number(apiCourse?.rating || 0)}</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="size-3 sm:size-4 text-yellow-400 fill-yellow-400"
                                    />
                                ))}
                            </div>
                        </div>
                        <span className="text-xs sm:text-sm text-description">({apiCourse?.reviews_count ?? 0} Reviews)</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">

                        <span
                            className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#FFF2E5] text-[10px] sm:text-xs font-semibold text-[#65390C] rounded"
                        >
                            {apiCourse?.Category}
                        </span>
                        <span
                            className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#FFF2E5] text-[10px] sm:text-xs font-semibold text-[#65390C] rounded"
                        >
                            {apiCourse?.level}
                        </span>

                    </div>

                    {/* Description */}
                    <div className="mb-6 sm:mb-8 grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div className='col-span-1 lg:col-span-3'>
                            <h2 className="text-xl sm:text-2xl font-bold text-header mb-2 sm:mb-3">{t("description")}</h2>
                            <div className="text-sm sm:text-base text-description leading-relaxed">
                                {(() => {
                                    const text = apiCourse?.description || apiCourse?.advance_info?.description || '';
                                    return showFullDescription ? text : `${text.substring(0, 1000)}...`;
                                })()}
                                <button
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                    className="text-main font-semibold ml-2 hover:underline text-sm sm:text-base cursor-pointer"
                                >
                                    {showFullDescription ? t('readLess') : t('readMore')}
                                </button>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-white">
                            <div className="mb-6">
                                <h3 className="font-bold text-header mb-3">{t("thisCourseIncludes")}</h3>
                                <div className="space-y-3">
                                    {includes.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <item.icon className="size-5 text-gray-600" />
                                            <span className="text-sm text-description">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Globe className="size-4 sm:size-5 text-gray-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-description">{t("language")}</p>
                                        <p className="text-xs sm:text-sm font-semibold text-header">{apiCourse?.language || 'English'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Award className="size-4 sm:size-5 text-gray-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-description">{t("certificateOnCompletion")}</p>
                                        <p className="text-xs sm:text-sm font-semibold text-header">Yes</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* What you will learn */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-header mb-3 sm:mb-4">
                            {t("whatYouWillLearn")}
                        </h2>
                        <div className="space-y-2 sm:space-y-3">
                            {learningPoints.map((point, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <FaArrowRightLong className="size-4 sm:size-5 text-main shrink-0 mt-0.5" />
                                    <span className="text-description text-xs sm:text-sm">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Discover Related Topics */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-header mb-3 sm:mb-4">
                            {t("discoverRelatedTopics")}
                        </h2>
                        <div className="space-y-2 md:space-y-3">
                            {apiCourse?.related_courses.map((topic) => (
                                <Link href={`/course/${topic?.id}`} key={topic?.id} className="flex items-start gap-2">
                                    <FaArrowRightLong className="size-4 sm:size-5 text-main shrink-0 mt-0.5" />
                                    <span className="text-description text-xs sm:text-sm">{topic?.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Course Content */}
                    <div className="mb-6 sm:mb-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-header">{t("courseContent")}</h2>
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-description">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <FolderOpen size={16} className='text-main sm:w-5 sm:h-5' />
                                    <span>{courseContent.length} {t("sections")}</span>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <MdSlowMotionVideo size={16} className='text-[#564FFD] sm:w-5 sm:h-5' />
                                    <span>{courseContent.reduce((total, section) => total + section.lectures, 0)} {t("lectures")}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg divide-y">
                            {courseContent.map((section) => (
                                <div key={section.id}>
                                    {/* Section Header */}
                                    <button
                                        onClick={() => toggleSection(section.id)}
                                        className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition"
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                            {expandedSections.includes(section.id) ? (
                                                <ChevronDown className="size-4 sm:size-5 shrink-0" />
                                            ) : (
                                                <ChevronRight className="size-4 sm:size-5 shrink-0" />
                                            )}
                                            <span className="font-semibold text-sm sm:text-base text-header text-left">
                                                {section.title}
                                            </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-description shrink-0 ml-2">
                                            <span className="whitespace-nowrap">{section.lectures} {t("lectures")}</span>
                                        </div>
                                    </button>

                                    {/* Section Items */}
                                    {expandedSections.includes(section.id) && section.items.length > 0 && (
                                        <div className="bg-gray-50">
                                            {section.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200"
                                                >
                                                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                                        {false ? (
                                                            <FileText className="size-3 sm:size-4 text-gray-400 shrink-0" />
                                                        ) : (
                                                            <Lock className="size-3 sm:size-4 text-gray-400 shrink-0" />
                                                        )}
                                                        <span className="text-xs sm:text-sm text-description truncate">{item.title}</span>
                                                    </div>
                                                    <span className="text-xs sm:text-sm text-description shrink-0 ml-2">{item.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-header mb-3 sm:mb-4">{t("requirements")}</h2>
                        <ul className="space-y-2 md:space-y-3">
                            {requirements.map((req, index) => (
                                <li key={index} className="flex items-start gap-2 text-description">
                                    <FaArrowRightLong className="text-main size-4 sm:size-5 shrink-0 mt-0.5" />
                                    <span className="text-xs sm:text-sm">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
