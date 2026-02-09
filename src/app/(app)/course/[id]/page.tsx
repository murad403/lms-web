'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Lock, Clock, FileText, Award, Globe, Smartphone, ChevronDown, ChevronRight, FolderOpen } from 'lucide-react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdSlowMotionVideo } from 'react-icons/md';


// Mock data (in real app, fetch based on id param)
const courseData = {
    id: 1,
    title: 'Advanced Digital Marketing',
    rating: 5.0,
    reviews: '1k+ Reviews',
    price: 149.99,
    image: '/courses/Course Images (2).png',
    isPurchased: false, // Change to true to see unlocked content
    tags: ['CROSS MARKETING', 'COURSE MARKETING', 'COURSES'],
    description: `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.

Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.

Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a work written by Cicero in 45 BC. The corruption of 'dolor' is an early occurrence of the common mistranscription 'dolorem' in the Ciceronic text. The purpose of dummy text is to fill visual content in a page to test readability.`,
    learningPoints: [
        'Lorem ipsum dolor sit amet',
        'Understand the fundamentals of digital marketing',
        'Learn advanced SEO strategies',
        'Master social media marketing',
        'Create effective marketing campaigns',
        'Analyze marketing data and metrics',
    ],
    relatedTopics: ['SEO & SEM', 'Social Media Marketing', 'Email Marketing', 'Content Marketing'],
    courseContent: [
        {
            id: 1,
            title: 'Getting Started',
            lectures: 6,
            duration: '45m',
            items: [
                { id: 1, title: 'What is Javascript', duration: '5m', type: 'video' },
                { id: 2, title: 'Javascript Syntax', duration: '8m', type: 'video' },
                { id: 3, title: 'Quiz 1', duration: '10m', type: 'quiz' },
            ],
        },
        {
            id: 2,
            title: 'Section 2 of Marketing',
            lectures: 23,
            duration: '3h',
            items: [
                { id: 1, title: 'Module Assignment', duration: '25m', type: 'assignment' },
                { id: 2, title: 'Javascript Essentials', duration: '45m', type: 'video' },
            ],
        },
        {
            id: 3,
            title: 'Secrets of Digital Media Leadership',
            lectures: 20,
            duration: '4h 30m',
            items: [],
        },
        {
            id: 4,
            title: 'Facebook KPI Dashboard Visualize Data in Real Time',
            lectures: 20,
            duration: '4h 30m',
            items: [],
        },
    ],
    includes: [
        { icon: Clock, text: '5 hours on demand video' },
        { icon: FileText, text: '20 Articles' },
        { icon: Award, text: 'Certificate on form completion' },
        { icon: Smartphone, text: 'Access on mobile and tv' },
    ],
    language: 'English',
    subtitles: 'English',
    certificate: 'Yes',
    requirements: [
        'No prior knowledge required',
        'Basic understanding of computer',
        'Must be 18 years or older',
    ],
    details: `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking.`,
    effectiveness: `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.`,
    targetAudience: [
        'Anyone who wants to learn digital marketing',
        'Professionals looking to expand their skills',
        'Students interested in marketing careers',
        'Entrepreneurs wanting to promote their business',
    ],
};

const CourseDetails = () => {
    const [expandedSections, setExpandedSections] = useState<number[]>([1]);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleSection = (sectionId: number) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-0 mt-4 sm:mt-6 lg:mt-8">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Main Content */}
                <div className="flex-1">
                    {/* Hero Video */}
                    <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-125 bg-gray-200 rounded-md overflow-hidden mb-4 sm:mb-6">
                        <video
                            className="w-full h-full object-cover"
                            controls
                            poster={courseData.image}
                            preload="metadata"
                        >
                            <source src="/videos/course-intro.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Course Title & Tags */}
                    <div className='flex flex-col md:flex-row justify-between gap-3 sm:gap-5'>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-2 sm:mb-3">
                            {courseData.title}
                        </h1>
                        <div className='flex items-center shrink-0'>
                            <h2 className='bg-[#E7E9EB] text-title py-2 sm:py-2.5 px-3 sm:px-5 font-semibold text-base sm:text-xl'>${courseData.price}</h2>
                            <button className='bg-main text-white py-2 sm:py-2.5 px-3 sm:px-5 hover:bg-main/90 cursor-pointer font-semibold text-base sm:text-xl'>${courseData.price}</button>
                        </div>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1">
                            <span className="text-sm sm:text-base text-yellow-500 font-semibold">{courseData.rating}</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="size-3 sm:size-4 text-yellow-400 fill-yellow-400"
                                    />
                                ))}
                            </div>
                        </div>
                        <span className="text-xs sm:text-sm text-description">({courseData.reviews})</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                        {courseData.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#FFF2E5] text-[10px] sm:text-xs font-semibold text-[#65390C] rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="mb-6 sm:mb-8 grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div className='col-span-1 lg:col-span-3'>
                            <h2 className="text-xl sm:text-2xl font-bold text-header mb-2 sm:mb-3">Description</h2>
                            <div className="text-sm sm:text-base text-description leading-relaxed">
                                {showFullDescription
                                    ? courseData.description
                                    : `${courseData.description.substring(0, 1500)}...`}
                                <button
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                    className="text-main font-semibold ml-2 hover:underline text-sm sm:text-base"
                                >
                                    {showFullDescription ? 'Read less' : 'Read more'}
                                </button>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-white">
                            <div className="mb-6">
                                <h3 className="font-bold text-header mb-3">This course includes</h3>
                                <div className="space-y-3">
                                    {courseData.includes.map((item, index) => (
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
                                        <p className="text-[10px] sm:text-xs text-description">Language</p>
                                        <p className="text-xs sm:text-sm font-semibold text-header">{courseData.language}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <FileText className="size-4 sm:size-5 text-gray-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-description">Subtitle</p>
                                        <p className="text-xs sm:text-sm font-semibold text-header">{courseData.subtitles}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Award className="size-4 sm:size-5 text-gray-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-description">Certificate on form completion</p>
                                        <p className="text-xs sm:text-sm font-semibold text-header">{courseData.certificate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* What you will learn */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-header mb-3 sm:mb-4">
                            What you will learn in this course
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                            {courseData.learningPoints.map((point, index) => (
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
                            Discover Related Topics
                        </h2>
                        <div className="space-y-1.5 sm:space-y-2">
                            {courseData.relatedTopics.map((topic, index) => (
                                <Link href={"/"} key={index} className="flex items-start gap-2">
                                    <FaArrowRightLong className="size-4 sm:size-5 text-main shrink-0 mt-0.5" />
                                    <span className="text-description text-xs sm:text-sm">{topic}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Course Content */}
                    <div className="mb-6 sm:mb-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-header">Course Content</h2>
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-description">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <FolderOpen size={16} className='text-main sm:w-5 sm:h-5'/>
                                    <span>15 Sections</span>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <MdSlowMotionVideo size={16} className='text-[#564FFD] sm:w-5 sm:h-5'/>
                                    <span>371 Lectures</span>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <Clock size={16} className='text-[#FD8E1F] sm:w-5 sm:h-5'/>
                                    <span>100h 30m</span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg divide-y">
                            {courseData.courseContent.map((section) => (
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
                                            <span className="whitespace-nowrap">{section.lectures} Lectures</span>
                                            <span className="whitespace-nowrap">{section.duration}</span>
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
                                                        {courseData.isPurchased ? (
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
                        <h2 className="text-xl sm:text-2xl font-bold text-header mb-3 sm:mb-4">Requirements</h2>
                        <ul className="space-y-1.5 sm:space-y-2">
                            {courseData.requirements.map((req, index) => (
                                <li key={index} className="flex items-start gap-2 text-description">
                                    <FaArrowRightLong className="text-main size-4 sm:size-5 shrink-0 mt-0.5"/>
                                    <span className="text-xs sm:text-sm">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Details */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-header mb-3 sm:mb-4">Details</h2>
                        <p className="text-xs sm:text-sm text-description leading-relaxed">{courseData.details}</p>
                    </div>

                    {/* Effectiveness */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-header mb-3 sm:mb-4">Effectiveness</h2>
                        <p className="text-xs sm:text-sm text-description leading-relaxed">{courseData.effectiveness}</p>
                    </div>

                    {/* Who This Course is For */}
                    <div className="mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-header mb-3 sm:mb-4">Who This Course is For</h2>
                        <ul className="space-y-1.5 sm:space-y-2">
                            {courseData.targetAudience.map((audience, index) => (
                                <li key={index} className="flex items-start gap-2 text-description">
                                    <span className="text-main mt-1 shrink-0">•</span>
                                    <span className="text-xs sm:text-sm">{audience}</span>
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
